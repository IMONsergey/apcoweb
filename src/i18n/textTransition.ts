import type { Locale } from './messages';

/** Text dissolves in place, with no movement, blur or overlapping translations. */
export function transitionLocaleText(commit: () => void, next: Locale) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || document.hidden) {
    commit();
    return () => undefined;
  }
  const before = Array.from(document.querySelectorAll<HTMLElement>('.locale-text')).flatMap(
    (node) => {
      const rect = node.getBoundingClientRect();
      const style = getComputedStyle(node);
      if (
        !rect.width ||
        !rect.height ||
        rect.bottom <= 0 ||
        rect.top >= innerHeight ||
        style.visibility !== 'visible' ||
        node.closest('[inert], [aria-hidden="true"], .sr-only')
      )
        return [];
      return [
        {
          node,
          rect,
          text: node.textContent,
          lang: document.documentElement.lang,
          font: style.font,
          fontFamily: style.fontFamily,
          fontSize: style.fontSize,
          fontWeight: style.fontWeight,
          lineHeight: style.lineHeight,
          textWrap: style.textWrap,
          letterSpacing: style.letterSpacing,
          textTransform: style.textTransform,
          textAlign: style.textAlign,
          whiteSpace: style.whiteSpace,
          color: style.color,
        },
      ];
    },
  );
  const root = document.documentElement;
  const scrollPosition = { left: scrollX, top: scrollY };
  const scrollAnchoring = root.style.overflowAnchor;
  // A longer translation must not move the viewport while outgoing text stays in place.
  root.style.overflowAnchor = 'none';
  commit();
  root.getBoundingClientRect();
  window.scrollTo({ ...scrollPosition, behavior: 'instant' });
  const ghosts: HTMLElement[] = [];
  const animations: Animation[] = [];
  // One shared timeline: quietly dissolve the old copy, then reveal the new one.
  // The zero-opacity handoff prevents differently wrapped languages doubling up.
  const handoff = 140 / 440;
  const timing = { duration: 440, easing: 'linear' };
  const easing = 'cubic-bezier(0.4, 0, 0.2, 1)';
  for (const snapshot of before) {
    const { node, rect, text, lang, ...typography } = snapshot;
    if (!node.isConnected || node.textContent === text) continue;
    const ghost = document.createElement('span');
    ghost.className = 'locale-text-ghost';
    ghost.setAttribute('aria-hidden', 'true');
    ghost.inert = true;
    ghost.lang = lang;
    ghost.textContent = text;
    Object.assign(ghost.style, typography, {
      left: `${rect.left}px`,
      top: `${rect.top}px`,
      width: `${rect.width}px`,
    });
    document.body.append(ghost);
    ghosts.push(ghost);
    animations.push(
      ghost.animate(
        [
          { opacity: 1, offset: 0, easing },
          { opacity: 0, offset: handoff },
          { opacity: 0, offset: 1 },
        ],
        { ...timing, fill: 'forwards' },
      ),
    );
    animations.push(
      node.animate(
        [
          { opacity: 0, offset: 0 },
          { opacity: 0, offset: handoff, easing },
          { opacity: 1, offset: 1 },
        ],
        { ...timing, fill: 'backwards' },
      ),
    );
  }
  if (animations.length) document.documentElement.dataset.localeTransition = next;
  let stopped = false;
  const stop = () => {
    if (stopped) return;
    stopped = true;
    animations.forEach((animation) => animation.cancel());
    ghosts.forEach((ghost) => ghost.remove());
    root.style.overflowAnchor = scrollAnchoring;
    delete document.documentElement.dataset.localeTransition;
    window.removeEventListener('wheel', stop);
    window.removeEventListener('touchmove', stop);
    window.removeEventListener('resize', stop);
  };
  // Translation/font reflow can deliver a queued scroll event after commit. Only an
  // intentional gesture cancels these outgoing copies; native reflow must not erase the swap.
  window.addEventListener('wheel', stop, { passive: true });
  window.addEventListener('touchmove', stop, { passive: true });
  window.addEventListener('resize', stop);
  void Promise.all(animations.map((animation) => animation.finished.catch(() => undefined))).then(
    stop,
  );
  return stop;
}
