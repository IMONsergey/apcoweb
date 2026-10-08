import { Component, Suspense, lazy, useEffect, useRef, useState, type ReactNode } from 'react';
import { type ResearchPoster, type ResearchScene } from '../../content/site';
import { assetUrl } from '../../content/assets';
import { useTheme } from '../../theme/ThemeProvider';

const Demo = lazy(() => import('./StepDemoMount'));
const posterWidths: Record<ResearchPoster, number> = {
  'step-query.webp': 908,
  'step-results.webp': 1234,
  'step-host.webp': 1164,
};

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
  scene: ResearchScene;
  image: ResearchPoster;
  alt: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const themedImage = theme === 'dark' ? image.replace('.webp', '-dark.webp') : image;
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
      <img
        src={assetUrl('walkthrough', themedImage)}
        srcSet={[360, 600]
          .map(
            (width) =>
              `${assetUrl('walkthrough', themedImage.replace('.webp', `-${width}.webp`))} ${width}w`,
          )
          .concat(`${assetUrl('walkthrough', themedImage)} ${posterWidths[image]}w`)
          .join(', ')}
        sizes="(max-width: 599px) calc(100vw - 108px), (max-width: 1199px) calc((100vw - 120px) / 2), (min-width: 1800px) 522px, calc((100vw - 220px) / 3)"
        width="908"
        height="609"
        alt=""
        loading="lazy"
        decoding="async"
      />
      <SceneBoundary>
        <Suspense fallback={null}>
          {mounted && <Demo key={`${scene}-${theme}`} scene={scene} />}
        </Suspense>
      </SceneBoundary>
    </div>
  );
}
