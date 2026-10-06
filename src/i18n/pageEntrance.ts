import { warmLocaleFonts } from './localeFonts';

const backgroundLayers = new Set<'flow' | 'dots'>();
const readinessListeners = new Set<() => void>();

/** Search background engines report their first actual frame, not just a loaded module. */
export function setSearchBackgroundReady(layer: 'flow' | 'dots', ready: boolean) {
  if (ready) backgroundLayers.add(layer);
  else backgroundLayers.delete(layer);
  readinessListeners.forEach((check) => check());
}

/** Reveal the whole site only after its initial background and typography are prepared. */
export function installPageEntrance() {
  const root = document.documentElement;
  let disposed = false;
  let contentReady = false;
  let frame = 0;
  if (root.hasAttribute('data-site-ready')) return () => undefined;
  const prepared = () => contentReady && backgroundLayers.size === 2;
  const check = () => {
    if (disposed || !prepared()) {
      cancelAnimationFrame(frame);
      frame = 0;
      return;
    }
    if (frame || root.hasAttribute('data-site-ready')) return;
    frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => {
        frame = 0;
        if (disposed || !prepared()) return;
        root.dataset.siteReady = 'true';
        readinessListeners.delete(check);
      });
    });
  };
  readinessListeners.add(check);
  const images = document.querySelectorAll<HTMLImageElement>(
    '.site-header img, .hero img, .search-preview img',
  );
  void Promise.allSettled([
    warmLocaleFonts().then(() => document.fonts.ready),
    ...Array.from(images, (image) => {
      // Hidden lazy images cannot finish decoding until explicitly requested.
      image.loading = 'eager';
      return image.decode();
    }),
  ]).then(() => {
    if (disposed) return;
    contentReady = true;
    check();
  });
  return () => {
    disposed = true;
    cancelAnimationFrame(frame);
    readinessListeners.delete(check);
  };
}
