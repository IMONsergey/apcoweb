import { useEffect, useState } from 'react';
import { siteRoutes, type SitePath } from '../content/routes';

const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
const rootedPath = (value: string) => value.replace(/\/+$/, '') || '/';

/** Preserve Vite's base path on both /apcoweb/ Pages and root-domain builds. */
export function siteHref(path: string) {
  const normalized = '/' + path.replace(/^\/+/, '');
  return (base || '') + normalized;
}
export function getRoutePath(): string {
  const pathname = decodeURI(window.location.pathname);
  if (base && pathname !== base && !pathname.startsWith(base + '/')) return '/404';
  return rootedPath(pathname.slice(base.length));
}
export function isSitePath(value: string): value is SitePath {
  return siteRoutes.some((route) => route.path === value);
}
export function useSiteRoute() {
  const [path, setPath] = useState(getRoutePath);
  useEffect(() => {
    function sync() { setPath(getRoutePath()); }
    function intercept(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
      if (!(event.target instanceof Element)) return;
      const anchor = event.target.closest('a[href]');
      if (!anchor || anchor.hasAttribute('download') || anchor.target && anchor.target !== '_self') return;
      const url = new URL(anchor.href, location.href);
      if (url.origin !== location.origin || (base && url.pathname !== base && !url.pathname.startsWith(base + '/'))) return;
      const target = rootedPath(url.pathname.slice(base.length));
      if (!isSitePath(target) && target !== '/404') return;
      event.preventDefault();
      if (url.href !== location.href) history.pushState(null, '', url.href);
      sync();
      if (url.hash) requestAnimationFrame(() => document.getElementById(url.hash.slice(1))?.scrollIntoView());
      else window.scrollTo({ top: 0, behavior: 'instant' });
    }
    window.addEventListener('popstate', sync);
    document.addEventListener('click', intercept);
    return () => {
      window.removeEventListener('popstate', sync);
      document.removeEventListener('click', intercept);
    };
  }, []);
  useEffect(() => {
    const route = siteRoutes.find((item) => item.path === path);
    const title = route ? (path === '/' ? 'Apcosys — Start with a query.' : route.title + ' | Apcosys') : 'Page not found | Apcosys';
    const description = route?.description || 'Find what you need on Apcosys.';
    document.title = title;
    function meta(selector: string, content: string, attr = 'content') {
      const item = document.head.querySelector<HTMLMetaElement>(selector);
      if (item) item.setAttribute(attr, content);
    }
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
