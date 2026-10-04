import { useEffect, useState, type ReactNode } from 'react';
import { MotionContext } from '../../hooks/useMotion';
export function MotionProvider({ children }: { children: ReactNode }) {
  const [manualPause, setManualPause] = useState(false);
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(query.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);
  return (
    <MotionContext
      value={{ paused: manualPause || reduced, reduced, toggle: () => setManualPause((p) => !p) }}
    >
      {children}
    </MotionContext>
  );
}
