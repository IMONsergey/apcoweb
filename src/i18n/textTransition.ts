import type { Locale } from './messages';
import { warmLocaleFonts } from './localeLayout';

export type StopLocaleTransition = (finish?: boolean) => void;

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
  let stopped = false;
  let committed = false;
  const commitInPlace = () => {
    if (committed) return;
    committed = true;
    const position = { left: scrollX, top: scrollY };
    commit();
    root.getBoundingClientRect();
    window.scrollTo({ ...position, behavior: 'instant' });
  };
  const stop: StopLocaleTransition = (finish = true) => {
    if (stopped) return;
    stopped = true;
    if (finish) commitInPlace();
    animations.forEach((animation) => animation.cancel());
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

  if (root.lang === next) {
    // The user returned to the still-visible language before the other one committed.
    // Reveal that text from its current opacity rather than completing the cancelled swap.
    commitInPlace();
    void finished(before.map(({ node, opacity }) => fade(node, opacity, 1, 220))).then(() =>
      stop(),
    );
  } else {
    const outgoing = before.map(({ node, opacity }) => fade(node, opacity, 0, 100));
    const fonts = warmLocaleFonts();
    void Promise.all([finished(outgoing), fonts]).then(() => {
      if (stopped) return;
      commitInPlace();
      const incoming = visibleText().map((node) => fade(node, 0, 1, 220));
      outgoing.forEach((animation) => animation.cancel());
      void finished(incoming).then(() => stop());
    });
  }
  return stop;
}
