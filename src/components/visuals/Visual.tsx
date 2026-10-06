import { Component, Suspense, lazy, useEffect, useRef, useState, type ReactNode } from 'react';
import type { DotDirection } from '../../visuals/dots/dot-cascade';
import { useMotion } from '../../hooks/useMotion';
import { useMediaQuery } from '../../hooks/useMediaQuery';
const Flow = lazy(() => import('../../visuals/flow/TurquoiseFlow'));
const Waves = lazy(() => import('../../visuals/waves/IceSphereWaves'));
const Globe = lazy(() => import('../../visuals/globe/SignalGlobe'));
const Shape = lazy(() => import('../../visuals/shapes/AnimatedShape'));
const Dots = lazy(() => import('../../visuals/dots/DotCascade'));
class VisualBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode; onReady?: (ready: boolean) => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onReady?.(true);
  }
  render() {
    return this.state.failed ? (this.props.fallback ?? null) : this.props.children;
  }
}
type Kind = 'flow' | 'waves' | 'globe' | 'rings' | 'rosette' | 'dots';
export function Visual({
  kind,
  className = '',
  eager = false,
  direction = 'top-to-bottom',
  onReady,
}: {
  kind: Kind;
  className?: string;
  eager?: boolean;
  direction?: DotDirection;
  onReady?: (ready: boolean) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(eager);
  const { paused } = useMotion();
  const compactMotion = useMediaQuery('(max-width: 899px), (pointer: coarse)');
  useEffect(() => {
    if (mounted || !ref.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setMounted(true);
          io.disconnect();
        }
      },
      { rootMargin: '240px' },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [mounted]);
  return (
    <div ref={ref} className={`visual visual--${kind} ${className}`} aria-hidden="true">
      <VisualBoundary
        onReady={onReady}
        fallback={onReady && <div className={`visual-fallback visual-fallback--${kind}`} />}
      >
        <Suspense fallback={null}>
          {mounted &&
            (kind === 'flow' ? (
              <Flow
                speed={1}
                strength={1}
                fps={compactMotion ? 24 : 30}
                resolution={compactMotion ? 160 : 192}
                paused={paused}
                onReady={onReady}
              />
            ) : kind === 'waves' ? (
              <Waves speed={0.7} paused={paused} />
            ) : kind === 'globe' ? (
              <Globe
                renderer={paused ? 'canvas2d' : 'auto'}
                speed={0.85}
                fps={compactMotion ? 24 : 30}
                pixelRatio={compactMotion ? 1 : 1.5}
                paused={paused}
                interactive={!paused && !compactMotion}
              />
            ) : kind === 'dots' ? (
              <Dots
                overlay
                direction={direction}
                fps={compactMotion ? 24 : 30}
                startOpacity={0.28}
                endOpacity={0.015}
                interactive={!paused && !compactMotion}
                onReady={onReady}
              />
            ) : (
              <Shape
                kind={kind === 'rings' ? 'echo' : 'rosette'}
                color="#121314"
                opacity={0.42}
                speed={0.75}
                strength={0.65}
                strokeWidth={1.35}
                paused={paused}
                interactive={!paused && !compactMotion}
                fps={compactMotion ? 24 : 30}
              />
            ))}
        </Suspense>
      </VisualBoundary>
    </div>
  );
}
