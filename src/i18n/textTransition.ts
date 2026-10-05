import type { Locale } from './messages';

/** Only changed, visible text gets a visual outgoing copy. Real UI/state stays mounted. */
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
  commit();
  const ghosts: HTMLElement[] = [];
  const animations: Animation[] = [];
  const direction = next === 'ru' ? -1 : 1;
  for (const [index, snapshot] of before.entries()) {
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
    const timing = {
      duration: 360,
      delay: Math.min(index, 5) * 12,
      easing: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
    };
    animations.push(
      ghost.animate(
        [
          { opacity: 1, filter: 'blur(0px)', transform: 'translateY(0)' },
          { opacity: 0, filter: 'blur(3px)', transform: `translateY(${direction * 8}px)` },
        ],
        { ...timing, fill: 'forwards' },
      ),
    );
    animations.push(
      node.animate(
        [
          { opacity: 0, filter: 'blur(3px)' },
          { opacity: 1, filter: 'blur(0px)' },
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
