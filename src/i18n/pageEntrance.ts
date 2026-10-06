import { warmLocaleFonts } from './localeFonts';

/** Preserve the brief page wash independently of content layout and language. */
export function installPageEntrance() {
  const root = document.documentElement;
  let disposed = false;
  const reveal = () => root.removeAttribute('data-page-entering');
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) root.dataset.pageEntering = 'true';
  // A slow optional font must never hold the page behind a loading screen.
  const entryTimeout = window.setTimeout(reveal, 220);
  document.addEventListener('pointerdown', reveal, { once: true });
  document.addEventListener('keydown', reveal, { once: true });
  void warmLocaleFonts().then(() => {
    if (disposed) return;
    clearTimeout(entryTimeout);
    reveal();
  });
  return () => {
    disposed = true;
    clearTimeout(entryTimeout);
    reveal();
    document.removeEventListener('pointerdown', reveal);
    document.removeEventListener('keydown', reveal);
  };
}
