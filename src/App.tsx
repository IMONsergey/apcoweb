import { Suspense, lazy } from 'react';
import { useLocale } from './i18n/context';
import { LocaleText } from './i18n/LocaleText';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MotionProvider } from './components/visuals/MotionProvider';
import { useSiteRoute } from './app/router';

const HomePage = lazy(() => import('./pages/HomePage'));
const InnerPage = lazy(() => import('./pages/InnerPage'));

export function App() {
  const { locale, t } = useLocale();
  const path = useSiteRoute();
  return <MotionProvider>
    <div id="top" className="site" lang={locale}>
      <a href="#main" className="skip-link"><LocaleText>{t('Skip to content')}</LocaleText></a>
      <Header />
      <main id="main" data-route={path}>
        <Suspense fallback={<div className="route-fallback" role="status">Loading page…</div>}>
          {path === '/' ? <HomePage /> : <InnerPage path={path} />}
        </Suspense>
      </main>
      <Footer />
    </div>
  </MotionProvider>;
}
