import { Suspense, lazy } from 'react';
import { siteHref } from '../app/router';
import { PageFrame, PageAction, primarySearch } from './PageUI';

const PlatformPages = lazy(() => import('./PlatformPages'));
const ResearchPages = lazy(() => import('./ResearchPages'));
const CommercialPages = lazy(() => import('./CommercialPages'));
const CorporatePages = lazy(() => import('./CorporatePages'));

export default function InnerPage({ path }: { path: string }) {
  if (path.startsWith('/platform/')) return <Suspense fallback={null}><PlatformPages path={path} /></Suspense>;
  if (path.startsWith('/use-cases/') || path === '/teams') return <Suspense fallback={null}><ResearchPages path={path} /></Suspense>;
  if (path === '/developers/api' || path === '/pricing') return <Suspense fallback={null}><CommercialPages path={path} /></Suspense>;
  if (path === '/about' || path === '/responsible-scanning' || path === '/contact')
    return <Suspense fallback={null}><CorporatePages path={path} /></Suspense>;
  return <PageFrame eyebrow="PAGE NOT FOUND" title="This page is not here."
    description="The link may have moved. Continue exploring the Apcosys website instead."
    links={[{ label: 'Back to homepage', href: siteHref('/') }, primarySearch]}>
    <div className="container stage-not-found"><PageAction links={[{ label: 'Browse Apcosys', href: siteHref('/') }]} /></div>
  </PageFrame>;
}
