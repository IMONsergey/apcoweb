import type { Locale } from './messages';

export type StopLocaleTransition = (finish?: boolean) => void;

const layoutSelector =
  'header .nav-group, header .nav-link, header .language, header .header-actions > a, .hero h1, .hero .lead, .hero-actions, main > :not(.hero), footer';
const layoutBoxes = () =>
  Array.from(document.querySelectorAll<HTMLElement>(layoutSelector)).flatMap((node) => {
    const rect = node.getBoundingClientRect();
    const ownsTransform = node
      .getAnimations()
      .some((animation) => animation.id === 'locale-layout');
    if (
      !rect.width ||
      !rect.height ||
      rect.bottom <= 0 ||
      rect.top >= innerHeight ||
      node.closest('[inert], [aria-hidden="true"]') ||
      (!ownsTransform && getComputedStyle(node).transform !== 'none')
    )
      return [];
    return [{ node, rect }];
  });

/** Fade real inline text in place; switch wording only while it is invisible. */
export function transitionLocaleText(
  commit: () => void,
  next: Locale,
  cancelPrevious: () => void,
): StopLocaleTransition {
  const visibleText = () =>
    Array.from(document.querySelectorAll<HTMLElement>('.locale-text')).filter((node) => {
      const rect = node.getBoundingClientRect();
      return (
        rect.width > 0 &&
        rect.height > 0 &&
        rect.bottom > 0 &&
        rect.top < innerHeight &&
        getComputedStyle(node).visibility === 'visible' &&
        !node.closest('[inert], [aria-hidden="true"], .sr-only')
      );
    });
  // Read the current fade before cancelling it, so a quick reversal never flashes to full opacity.
  const before = visibleText().map((node) => ({
    node,
    opacity: Number(getComputedStyle(node).opacity),
  }));
  const interruptedLayout = document
    .getAnimations()
    .some((animation) => animation.id === 'locale-layout')
    ? layoutBoxes()
    : [];
  cancelPrevious();
  if (!before.length || matchMedia('(prefers-reduced-motion: reduce)').matches || document.hidden) {
    commit();
    return () => undefined;
  }
  const root = document.documentElement;
  const scrollBehavior = root.style.scrollBehavior;
  root.style.scrollBehavior = 'auto';
  // Stop a queued smooth focus scroll before fading; do not let the menu move the viewport.
  window.scrollTo({ left: scrollX, top: scrollY, behavior: 'instant' });
  const scrollAnchoring = root.style.overflowAnchor;
  root.style.overflowAnchor = 'none';
  root.dataset.localeTransition = next;
  const animations: Animation[] = [];
  const layouts: { animation: Animation; node: HTMLElement; origin: string }[] = [];
  const clearLayouts = () => {
    layouts.splice(0).forEach(({ animation, node, origin }) => {
      animation.cancel();
      node.style.transformOrigin = origin;
    });
  };
  const morph = (boxes: ReturnType<typeof layoutBoxes>) => {
    for (const { node, rect: before } of boxes) {
      if (!node.isConnected) continue;
      const after = node.getBoundingClientRect();
      if (!after.width || !after.height) continue;
      const x = before.left - after.left,
        y = before.top - after.top;
      const sx = before.width / after.width,
        sy = before.height / after.height;
      if (
        Math.abs(x) < 0.5 &&
        Math.abs(y) < 0.5 &&
        Math.abs(sx - 1) < 0.002 &&
        Math.abs(sy - 1) < 0.002
      )
        continue;
      const origin = node.style.transformOrigin;
      node.style.transformOrigin = 'top left';
      const animation = node.animate(
        [
          { transform: `translate(${x}px, ${y}px) scale(${sx}, ${sy})` },
          { transform: 'translate(0px, 0px) scale(1, 1)' },
        ],
        { duration: 180, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', fill: 'both' },
      );
      animation.id = 'locale-layout';
      layouts.push({ animation, node, origin });
      animations.push(animation);
    }
  };
  let stopped = false;
  let committed = false;
  const commitInPlace = (withMorph = false) => {
    if (committed) return;
    committed = true;
    const position = { left: scrollX, top: scrollY };
    const boxes = withMorph ? layoutBoxes() : [];
    clearLayouts();
    commit();
    root.getBoundingClientRect();
    window.scrollTo({ ...position, behavior: 'instant' });
    morph(boxes);
  };
  const stop: StopLocaleTransition = (finish = true) => {
    if (stopped) return;
    stopped = true;
    if (finish) commitInPlace();
    animations.forEach((animation) => animation.cancel());
    clearLayouts();
    root.style.overflowAnchor = scrollAnchoring;
    root.style.scrollBehavior = scrollBehavior;
    delete root.dataset.localeTransition;
    window.removeEventListener('wheel', finishNow);
    window.removeEventListener('touchmove', finishNow);
    window.removeEventListener('resize', finishNow);
  };
  const finishNow = () => stop();
  const fade = (node: HTMLElement, from: number, to: number, duration: number) => {
    const animation = node.animate([{ opacity: from }, { opacity: to }], {
      duration,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      fill: 'both',
    });
    animation.id = to === 0 ? 'locale-text-out' : 'locale-text-in';
    animations.push(animation);
    return animation;
  };
  const finished = (group: Animation[]) =>
    Promise.all(group.map((animation) => animation.finished.catch(() => undefined)));
  window.addEventListener('wheel', finishNow, { passive: true });
  window.addEventListener('touchmove', finishNow, { passive: true });
  window.addEventListener('resize', finishNow);
  morph(interruptedLayout);

  if (root.lang === next) {
    // The user returned to the still-visible language before the other one committed.
    // Reveal that text from its current opacity rather than completing the cancelled swap.
    commitInPlace();
    void finished(before.map(({ node, opacity }) => fade(node, opacity, 1, 300))).then(() =>
      stop(),
    );
  } else {
    const outgoing = before.map(({ node, opacity }) => fade(node, opacity, 0, 140));
    const sample = next === 'ru' ? 'Русский English' : 'English';
    const family = next === 'ru' ? 'Inter' : 'Instrument Sans';
    const fonts = Promise.all([
      ...[400, 500, 600].map((weight) => document.fonts.load(`${weight} 20px "${family}"`, sample)),
      ...[400, 500].map((weight) => document.fonts.load(`${weight} 14px "IBM Plex Mono"`, sample)),
    ]).catch(() => undefined);
    void Promise.all([finished(outgoing), fonts]).then(() => {
      if (stopped) return;
      commitInPlace(true);
      const incoming = visibleText().map((node) => fade(node, 0, 1, 300));
      outgoing.forEach((animation) => animation.cancel());
      void finished(incoming).then(() => stop());
    });
  }
  return stop;
}
