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
  const compactMotion = u¶»§q«^