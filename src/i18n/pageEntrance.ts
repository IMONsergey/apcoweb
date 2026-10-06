const backgroundLayers = new Set<'flow' | 'dots'>();

/**
 * Search renderers report readiness only for their own fade-in. The page itself
 * is never blocked on decorative canvas work.
 */
export function setSearchBackgroundReady(layer: 'flow' | 'dots', ready: boolean) {
  const root = document.documentElement;
  if (ready) {
    backgroundLayers.add(layer);
    if (layer === 'flow') root.dataset.searchFlowReady = 'true';
    else root.dataset.searchDotsReady = 'true';
  } else {
    backgroundLayers.delete(layer);
    if (layer === 'flow') delete root.dataset.searchFlowReady;
    else delete root.dataset.searchDotsReady;
  }
}

/** Mark the application ready without delaying first paint for decorative media. */
export function installPageEntrance() {
  const root = document.documentElement;
  if (root.hasAttribute('data-site-ready')) return () => undefined;
  let frame = requestAnimationFrame(() => {
    frame = 0;
    root.dataset.siteReady = 'true';
  });
  return () => cancelAnimationFrame(frame);
}
