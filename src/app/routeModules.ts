/** Warm the exact lazy route before replacing the currently visible page. */
export const loadHome = () => import('../pages/HomePage');
export const loadInner = () => import('../pages/InnerPage');
export const loadPlatform = () => import('../pages/PlatformPages');
export const loadResearch = () => import('../pages/ResearchPages');
export const loadCommercial = () => import('../pages/CommercialPages');
export const loadLegal = () => import('../pages/LegalPages');
export const loadCorporate = () => import('../pages/CorporatePages');
const pending = new Map<string, Promise<unknown>>();
export function prepareRoute(path: string) {
  if (!pending.has(path)) {
    const group = path.startsWith('/legal/')
      ? loadLegal
      : path.startsWith('/platform/')
        ? loadPlatform
        : path.startsWith('/use-cases/') || path === '/teams'
          ? loadResearch
          : path === '/developers/api' || path === '/pricing'
            ? loadCommercial
            : loadCorporate;
    const request = path === '/' ? loadHome() : Promise.all([loadInner(), group()]);
    pending.set(
      path,
      request.catch((error: unknown) => {
        pending.delete(path);
        throw error;
      }),
    );
  }
  return pending.get(path)!;
}
