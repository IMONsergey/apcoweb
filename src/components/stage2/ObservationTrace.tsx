import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useMotion } from '../../hooks/useMotion';

/** A service comparison, not an invented time series or a real incident signal. */
export function ObservationTrace({ port, active }: { port: string; active: number }) {
  const root = useRef<HTMLDivElement>(null);
  const { reduced } = useMotion();
  useLayoutEffect(() => {
    if (!root.current || reduced) return;
    const context = gsap.context(() => {
      const line = root.current!.querySelector('[data-trace-line]');
      const points = root.current!.querySelectorAll('[data-trace-point]');
      const tl = gsap.timeline({ paused: true });
      tl.fromTo(
        line,
        { strokeDashoffset: 1 },
        { strokeDashoffset: 0, duration: 1.5, ease: 'power2.inOut' },
      );
      tl.fromTo(
        points,
        { opacity: 0, scale: 0.7, transformOrigin: 'center' },
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          stagger: 0.3,
          ease: 'power2.out',
          clearProps: 'transform',
        },
        0.2,
      );
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            tl.play();
            observer.disconnect();
          }
        },
        { threshold: 0.3 },
      );
      observer.observe(root.current!);
      return () => observer.disconnect();
    }, root);
    return () => context.revert();
  }, [port, active, reduced]);
  return (
    <div className="observation-trace" ref={root}>
      <div>
        <span>EARLIER SNAPSHOT</span>
        <span>LATER SNAPSHOT</span>
      </div>
      <svg
        viewBox="0 0 600 92"
        role="img"
        aria-label={
          'Illustrative comparison: HTTPS remains present; port ' +
          port +
          ' appears in the later snapshot.'
        }
      >
        <path className="observation-trace__base" d="M24 28H576M24 70H576" />
        <path
          data-trace-line
          pathLength="1"
          strokeDasharray="1"
          d="M24 28H330Q355 28 375 48T430 70H576"
        />
        <circle data-trace-point cx="24" cy="28" r="5" />
        <circle data-trace-point cx="330" cy="28" r="5" />
        <circle data-trace-point cx="576" cy="70" r="5" />
      </svg>
      <div>
        <strong>443 / HTTPS</strong>
        <strong>+ {port} / service observed</strong>
      </div>
      <p>Authored service comparison · no live scan</p>
    </div>
  );
}
