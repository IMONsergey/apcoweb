import { startTransition, useEffect, useState } from 'react';
import { prepareRoute } from './routeModules';
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
    let navigationVersion = 0;
    let currentPath = getRoutePath();
    let navigating = false;
    let activeTransition: ViewTransition | undefined;
    let fallbackAnimation: Animation | undefined;
    const recordScroll = () => {
      if (navigating) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!navigating) history.replaceState({ ...history.state, apcoScrollY: scrollY }, '');
      });
    };
    const waitForPage = async (targetPath: string, version: number) => {
      for (let attempt = 0; attempt < 150; attempt++) {
        if (version !== navigationVersion) return false;
        const main = document.querySelector('main');
        if (
          main?.dataset.route === targetPath &&
          main.querySelector('h1') &&
          !main.querySelector('.route-fallback')
        )
          return true;
        await new Promise<void>((resolve) => window.setTimeout(resolve, 20));
      }
      return false;
    };
    const applyScroll = (y: number) => {
      if (!location.hash || !resolveScroll()) scrollTo({ top: y, behavior: 'instant' });
    };
    const navigate = async (targetPath: string, url?: URL, rememberedY = 0) => {
      const version = ++navigationVersion;
      activeTransition?.skipTransition();
      fallbackAnimation?.cancel();
      cancelAnimationFrame(frame);
      navigating = true;
      try {
        await prepareRoute(targetPath);
        if (version !== navigationVersion) return;
        const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
        const samePage = targetPath === currentPath;
        const commit = async () => {
          if (version !== navigationVersion) return;
          if (url && url.href !== location.href) {
            history.replaceState({ ...history.state, apcoScrollY: scrollY }, '');
            history.pushState({ apcoScrollY: 0 }, '', url.pathname + url.search + url.hash);
          }
          startTransition(() => setPath(targetPath));
          if (!(await waitForPage(targetPath, version))) return;
          currentPath = targetPath;
          applyScroll(rememberedY);
          if (!samePage) {
            const heading = document.querySelector<HTMLElement>('main h1');
            heading?.setAttribute('tabindex', '-1');
            heading?.focus({ preventScroll: true });
          }
        };
        if (!reduced && !samePage && document.startViewTransition) {
          activeTransition = document.startViewTransition(commit);
          // A newer navigation may skip the old animation; its update still settles safely.
          await activeTransition.finished.catch(() => undefined);
        } else if (!reduced && !samePage) {
          const main = document.querySelector('main');
          fallbackAnimation = main?.animate([{ opacity: 1 }, { opacity: 0.72 }], {
            duration: 120,
            fill: 'forwards',
            easing: 'ease-out',
          });
          await fallbackAnimation?.finished.catch(() => undefined);
          if (version !== navigationVersion) return;
          await commit();
          fallbackAnimation?.cancel();
          fallbackAnimation = main?.animate([{ opacity: 0.72 }, { opacity: 1 }], {
            duration: 280,
            easing: 'ease-out',
          });
          await fallbackAnimation?.finished.catch(() => undefined);
        } else await commit();
      } catch {
        // Preserve normal browser navigation if a chunk fails to load.
        if (version === navigationVersion) location.assign(url?.href ?? location.href);
      } finally {
        if (version === navigationVersion) {
          navigating = false;
          recordScroll();
        }
      }
    };
    const sync = () => {
      const rememberedY = Number(history.state?.apcoScrollY) || 0;
      void navigate(getRoutePath(), undefined, rememberedY);
    };
    const internalAnchor = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return null;
      const anchor = target.closest('a[href]') as HTMLAnchorElement | null;
      if (
        !anchor ||
        anchor.hasAttribute('download') ||
        (anchor.target && anchor.target !== '_self')
      )
        return null;
      const url = new URL(anchor.href, location.href);
      if (
        url.origin !== location.origin ||
        (base && url.pathname !== base && !url.pathname.startsWith(base + '/'))
      )
        return null;
      const targetPath = rootedPath(url.pathname.slice(base.length));
      return isSitePath(targetPath) ? { url, targetPath } : null;
    };
    const warm = (event: Event) => {
      const anchor = internalAnchor(event.target);
      if (anchor && anchor.targetPath !== currentPath)
        void prepareRoute(anchor.targetPath).catch(() => undefined);
    };
    const intercept = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        event.shiftKey
      )
        return;
      const anchor = internalAnchor(event.target);
      if (!anchor) return;
      event.preventDefault();
      if (anchor.url.href === location.href && !navigating) {
        if (anchor.url.hash) resolveScroll();
        return;
      }
      void navigate(anchor.targetPath, anchor.url);
    };
    window.addEventListener('popstate', sync);
    window.addEventListener('scroll', recordScroll, { passive: true });
    document.addEventListener('click', intercept);
    document.addEventListener('pointerover', warm, { passive: true });
    document.addEventListener('focusin', warm);
    if (location.hash)
      void waitForPage(getRoutePath(), navigationVersion).then((ready) => {
        if (ready) resolveScroll();
      });
    return () => {
      navigationVersion++;
      activeTransition?.skipTransition();
      fallbackAnimation?.cancel();
      history.scrollRestoration = previousSetting;
      cancelAnimationFrame(frame);
      window.removeEventListener('popstate', sync);
      window.removeEventListener('scroll', recordScroll);
      document.removeEventListener('click', intercept);
      document.removeEventListener('pointerover', warm);
      document.removeEventListener('focusin', warm);
    };
  }, []);

  useEffect(() => {
    const route = siteRoutes.find((item) => item.path === path);
    const title = route
      ? path === '/'
        ? 'Apcosys — Start with a query.'
        : route.title + ' | Apcosys'
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
