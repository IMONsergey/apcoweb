import { Suspense, lazy } from 'react';
import { siteHref } from '../app/router';
import { PageFrame, PageAction } from './PageUI';

import { loadPlatform, loadResearch, loadCommercial, loadCorporate } from '../app/routeModules';
const PlatformPages = lazy(loadPlatform);
const ResearchPages = lazy(loadResearch);
const CommercialPages = lazy(loadCommercial);
const CorporatePages = lazy(loadCorporate);

export default function InnerPage({ path }: { path: string }) {
  if (path.startsWith('/platform/'))
    return (
      <Suspense fallback={null}>
        <PlatformPages path={path} />
      </Suspense>
    );
  if (path.startsWith('/use-cases/') || path === '/teams')
    return (
      <Suspense fallback={null}>
        <ResearchPages path={path} />
      </Suspense>
    );
  if (path === '/developers/api' || path === '/pricing')
    return (
      <Suspense fallback={null}>
        <CommercialPages path={path} />
      </Suspense>
    );
  if (path === '/about' || path === '/responsible-scanning' || path === '/contact')
    return (
      <Suspense fallback={null}>
        <CorporatePages path={path} />
      </Suspense>
    );
  return (
    <PageFrame
      eyebrow="PAGE NOT FOUND"
      title="This page is not here."
      description="The link may have moved. Continue exploring the Apcosys website instead."
      links={[{ label: 'Back to homepage', href: siteHref('/') }]}
    >
      <div className="container stage-not-found">
        <PageAction links={[{ label: 'Browse Apcosys', href: siteHref('/') }]} />
      </div>
    </PageFrame>
  );
}
