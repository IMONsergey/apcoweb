import { Component, Suspense, lazy, useEffect, useRef, useState, type ReactNode } from 'react';
import { media } from '../../content/site';

const Demo = lazy(() => import('./StepDemoMount'));

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/** One shared lazy chunk; only illustrations approaching the viewport are mounted. */
export function StepIllustration({
  scene,
  image,
  alt,
}: {
  scene: string;
  image: string;
  alt: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin: '240px' },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className="step-illustration" role="img" aria-label={alt}>
      <img src={media(image)} width="908" height="609" alt="" loading="lazy" decoding="async" />
      <SceneBoundary>
        <Suspense fallback={null}>{mounted && <Demo scene={scene} />}</Suspense>
      </SceneBoundary>
    </div>
  );
}
