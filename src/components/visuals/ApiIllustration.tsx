import {
  Component,
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { media } from '../../content/site';
import { useLocale } from '../../i18n/context';
import { useTheme } from '../../theme/ThemeProvider';

const Demo = lazy(() => import('./ApiDemoMount'));
class DemoBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}
export function ApiIllustration() {
  const { t } = useLocale();
  const { theme } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);
  const onReady = useCallback(() => setReady(true), []);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin: '280px' },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className="api-demo-frame"
      data-ready={ready}
      role="img"
      aria-label={t(
        'Illustrative APCOSYS API documentation with a request and response. See the current documentation for the live API.',
      )}
    >
      <div className="api-demo-poster" aria-hidden="true">
        <img
          className="api-demo-fallback"
          src={media(theme === 'dark' ? 'api-layers-dark.webp' : 'api-layers.webp')}
          width="712"
          height="554"
          alt=""
          loading="lazy"
          decoding="async"
          aria-hidden="true"
        />
      </div>
      <DemoBoundary>
        <Suspense fallback={null}>{mounted && <Demo onReady={onReady} />}</Suspense>
      </DemoBoundary>
    </div>
  );
}
