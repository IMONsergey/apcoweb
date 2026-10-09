import { useEffect, useState } from 'react';
import { siteRoutes, type SitePath } from '../content/routes';

const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
const rootedPath = (value: string) => value.replace(/\/+$/, '') || '/';

/** Keep client routes independent of the hosting base (/apcoweb/ or /). */
export function siteHref(path: string) {
  return (base || '') + '/' + path.replace(/^\/+/, '');
}
export function getRoutePath(): string {
  const pathname = window.location.pathname;
  if (base && pathname !== base && !pathname.startsWith(base + '/')) return '/404';
  const route = rootedPath(pathname.slice(base.length));
  return isSitePath(route) ? route : '/404';
}
export function isSitePath(value: string): value is SitePath {
  return siteRoutes.some((route) => route.path === value);
}

function resolveScroll() {
  const targetId = decodeURIComponent(location.hash.slice(1));
  if (!targetId) return false;
  const target = document.getElementById(targetId);
  if (!target) return false;
  target.scrollIntoView({ behavior: 'instant', block: 'start' });
  return true;
}

/** Preserve scroll state per history entry, including lazy route transitions. */
export function useSiteRoute() {
  const [path, setPath] = useState(getRoutePath);
  useEffect(() => {
    const previousSetting = history.scrollRestoration;
    history.scrollRestoration = 'manual';
    let frame = 0;
    let restoreTimer = 0;

    const recordScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        history.replaceState({ ...history.state, apcoScrollY: scrollY }, '');
      });
    };
    const waitForPage = (callback: () => void) => {
      let attempts = 0;
      const apply = () => {
        const main = document.querySelector('main');
        if (main?.querySelector('.route-fallback') && attempts++ < 70) {
          restoreTimer = window.setTimeout(apply, 30);
          return;
        }
        requestAnimationFrame(() => requestAnimationFrame(callback));
      };
      apply();
    };

    const sync = () => {
      setPath(getRoutePath());
      const rememberedY = Number(history.state?.apcoScrollY) || 0;
      waitForPage(() => {
        if (location.hash) {
          if (!resolveScroll()) {
            const observer = new MutationObserver(() => {
              if (resolveScroll()) observer.disconnect();
            });
            observer.observe(document.querySelector('main') ?? document.body, { childList: true, subtree: true });
            window.setTimeout(() => observer.disconnect(), 2500);
          }
        } else scrollTo({ top: rememberedY, behavior: 'instant' });
      });
    };

    const intercept = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 ||
          event.metaKey || event.ctrlKey || event.altKey || event.shiftKey ||
          !(event.target instanceof Element)) return;
      const anchor = event.target.closest('a[href]') as HTMLAnchorElement | null;
      if (!anchor || anchor.hasAttribute('download') || (anchor.target && anchor.target !== '_self')) return;
      const url = new URL(anchor.href, location.href);
      if (url.origin !== location.origin ||
          (base && url.pathname !== base && !url.pathname.startsWith(base + '/'))) return;
      const target = rootedPath(url.pathname.slice(base.length));
      if (!isSitePath(target)) return;
      event.preventDefault();
      if (url.href === location.href) {
        if (url.hash) resolveScroll();
        return;
      }
      cancelAnimationFrame(frame);
      history.replaceState({ ...history.state, apcoScrollY: scrollY }, '');
      history.pushState({ apcoScrollY: 0 }, '', url.pathname + url.search + url.hash);
      setPath(target);
      waitForPage(() => {
        if (!url.hash || !resolveScroll()) {
          if (url.hash) {
            const observer = new MutationObserver(() => {
              if (resolveScroll()) observer.disconnect();
            });
            observer.observe(document.querySelector('main') ?? document.body, { childList: true, subtree: true });
            window.setTimeout(() => observer.disconnect(), 2500);
          } else scrollTo({ top: 0, behavior: 'instant' });
        }
      });
    };
    window.addEventListener('popstate', sync);
    window.addEventListener('scroll', recordScroll, { passive: true });
    document.addEventListener('click', intercept);
    return () => {
      history.scrollRestoration = previousSetting;
      cancelAnimationFrame(frame);
      clearTimeout(restoreTimer);
      window.removeEventListener('popstate', sync);
      window.removeEventListener('scroll', recordScroll);
      document.removeEventListener('click', intercept);
    };
  }, []);

  useEffect(() => {
    const route = siteRoutes.find((item) => item.path === path);
    const title = route
      ? path === '/' ? 'Apcosys — Start with a query.' : route.title + ' | Apcosys'
      : 'Page not found | Apcosys';
    const description = route?.description || 'Find what you need on Apcosys.';
    document.title = title;
    const meta = (selector: string, value: string) => {
      document.querySelector<HTMLMetaElement>(selector)?.setAttribute('content', value);
    };
    meta('meta[name="description"]', description);
    meta('meta[property="og:title"]', title);
    meta('meta[property="og:description"]', description);
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.append(canonical);
    }
    canonical.href = location.origin + siteHref(path === '/404' ? '/' : path);
  }, [path]);
  return path;
}
