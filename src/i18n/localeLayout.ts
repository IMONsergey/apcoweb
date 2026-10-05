import { translate, type Locale } from './messages';

let fontWork: Promise<unknown> | undefined;
export function warmLocaleFonts() {
  return (fontWork ??= Promise.all([
    ...[400, 500, 600].flatMap((weight) => [
      document.fonts.load(weight + ' 20px "Instrument Sans"', 'English'),
      document.fonts.load(weight + ' 20px "Inter"', 'Русский English'),
    ]),
    ...[400, 500].map((weight) =>
      document.fonts.load(weight + ' 14px "IBM Plex Mono"', 'Русский English'),
    ),
  ]).catch(() => undefined));
}

const blocks = 'main h1, main h2, main h3, main p, footer .eyebrow';
const navText = '.site-header .nav-trigger > .locale-text';
const controls = '.double-button';
const excluded = '[aria-hidden="true"], .sr-only, dialog:not([open]), .visual';

/** Measure the alternate copy once per width, then retain native, untransformed text boxes. */
export function installLocaleLayout(site: HTMLElement) {
  const root = document.documentElement;
  const originals = new Map<HTMLElement, { height: string; width: string }>();
  let disposed = false;
  let timer = 0;
  let lastWidth = 0;
  let fontsReady = false;
  const restore = () =>
    originals.forEach((style, node) => {
      node.style.minHeight = style.height;
      node.style.minWidth = style.width;
      delete node.dataset.localeSized;
    });
  const measure = () => {
    if (disposed || !site.isConnected) return;
    if (root.hasAttribute('data-locale-transition')) {
      clearTimeout(timer);
      timer = window.setTimeout(measure, 80);
      return;
    }
    restore();
    const current = root.lang as Locale;
    const other: Locale = current === 'ru' ? 'en' : 'ru';
    const mirror = site.cloneNode(true) as HTMLElement;
    // Keep matching indexes before removing closed dialogs and decorative subtrees.
    const liveBlocks = Array.from(site.querySelectorAll<HTMLElement>(blocks));
    const otherBlocks = Array.from(mirror.querySelectorAll<HTMLElement>(blocks));
    const liveNav = Array.from(site.querySelectorAll<HTMLElement>(navText));
    const otherNav = Array.from(mirror.querySelectorAll<HTMLElement>(navText));
    const liveControls = Array.from(site.querySelectorAll<HTMLElement>(controls));
    const otherControls = Array.from(mirror.querySelectorAll<HTMLElement>(controls));
    mirror.lang = other;
    mirror.removeAttribute('id');
    mirror.dataset.localeSizing = 'true';
    mirror.inert = true;
    mirror.setAttribute('aria-hidden', 'true');
    Object.assign(mirror.style, {
      position: 'fixed',
      left: '-100000px',
      top: '0',
      width: site.getBoundingClientRect().width + 'px',
      visibility: 'hidden',
      pointerEvents: 'none',
      contain: 'layout style',
    });
    mirror.style.setProperty(
      '--font-sans',
      other === 'ru' ? 'Inter, Arial, sans-serif' : '"Instrument Sans", Arial, sans-serif',
    );
    // Never connect a second renderer, custom element, or dialog during sizing.
    mirror.querySelectorAll('.visual, api-developer-demo, dialog').forEach((node) => node.remove());
    mirror.querySelectorAll<HTMLElement>('[data-locale-key]').forEach((node) => {
      const key = node.dataset.localeKey!;
      const values = node.dataset.localeValues
        ? (JSON.parse(node.dataset.localeValues) as Record<string, string | number>)
        : {};
      node.textContent = translate(other, key, values);
    });
    document.body.append(mirror);
    try {
      const widths = [...liveNav, ...liveControls].flatMap((node, index) => {
        const counterpart = [...otherNav, ...otherControls][index];
        const blocked = node.closest(excluded);
        if (!counterpart || (blocked && !blocked.matches('.site-header'))) return [];
        const rect = node.getBoundingClientRect();
        if (!rect.width || !rect.height) return [];
        return [
          {
            node,
            counterpart,
            size: Math.ceil(Math.max(rect.width, counterpart.getBoundingClientRect().width)),
          },
        ];
      });
      // Match action widths first: these can affect the width available to nearby copy.
      for (const { node, counterpart, size } of widths) {
        if (!originals.has(node))
          originals.set(node, { height: node.style.minHeight, width: node.style.minWidth });
        node.style.minWidth = counterpart.style.minWidth = `min(${size}px, 100%)`;
        if (node.matches(controls))
          node.dataset.localeSized = counterpart.dataset.localeSized = 'true';
      }
      const heights = liveBlocks.flatMap((node, index) => {
        const counterpart = otherBlocks[index];
        if (!counterpart || node.closest(excluded) || !node.querySelector('.locale-text'))
          return [];
        const rect = node.getBoundingClientRect();
        if (!rect.width || !rect.height) return [];
        return [
          {
            node,
            size: Math.ceil(Math.max(rect.height, counterpart.getBoundingClientRect().height)),
          },
        ];
      });
      // Batch writes after all measurements, avoiding read/write loops.
      for (const { node, size } of heights) {
        if (!originals.has(node))
          originals.set(node, { height: node.style.minHeight, width: node.style.minWidth });
        node.style.minHeight = size + 'px';
      }
      root.dataset.localeLayout = 'ready';
    } finally {
      mirror.remove();
    }
  };
  const resize = new ResizeObserver(() => {
    const width = site.getBoundingClientRect().width;
    if (Math.abs(width - lastWidth) < 1) return;
    lastWidth = width;
    clearTimeout(timer);
    if (fontsReady) timer = window.setTimeout(measure, 140);
  });
  resize.observe(site);
  const reveal = () => root.removeAttribute('data-page-entering');
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) root.dataset.pageEntering = 'true';
  // A slow optional font must never hold the page behind a loading screen.
  const entryTimeout = window.setTimeout(reveal, 220);
  document.addEventListener('pointerdown', reveal, { once: true });
  document.addEventListener('keydown', reveal, { once: true });
  void warmLocaleFonts().then(() => {
    if (disposed) return;
    fontsReady = true;
    measure();
    clearTimeout(entryTimeout);
    reveal();
  });
  return () => {
    disposed = true;
    clearTimeout(timer);
    clearTimeout(entryTimeout);
    resize.disconnect();
    restore();
    reveal();
    delete root.dataset.localeLayout;
    document.removeEventListener('pointerdown', reveal);
    document.removeEventListener('keydown', reveal);
  };
}
