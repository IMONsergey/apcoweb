import { useLayoutEffect, useRef, type HTMLAttributes, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { useMotion } from '../../hooks/useMotion';
import './MorphPanel.css';

/** Measure the natural inner layout; interrupt transitions from their current visible height. */
export function MorphPanel({
  children,
  changeKey,
  className = '',
  ...props
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode; changeKey?: string | number }) {
  const frame = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const { reduced } = useMotion();
  const measure = useRef<(() => void) | null>(null);
  useLayoutEffect(() => {
    const outer = frame.current;
    const inner = content.current;
    if (!outer || !inner) return;
    let height = inner.getBoundingClientRect().height;
    let width = inner.getBoundingClientRect().width;
    let tween: gsap.core.Tween | undefined;
    const resize = () => {
      const next = inner.getBoundingClientRect();
      if (Math.abs(next.height - height) < 0.5 && Math.abs(next.width - width) < 0.5) return;
      const previous = tween?.isActive() ? parseFloat(outer.style.height) : height;
      const resized = Math.abs(next.width - width) > 1;
      height = next.height;
      width = next.width;
      tween?.kill();
      // A nested morph already drives the parent's natural layout continuously.
      const nested = inner.querySelector('[data-morphing="true"]');
      if (reduced || resized || nested || !height) {
        outer.style.height = '';
        outer.dataset.morphing = 'false';
        return;
      }
      outer.dataset.morphing = 'true';
      gsap.set(outer, { height: previous });
      tween = gsap.to(outer, {
        height,
        duration: 0.48,
        ease: 'power3.inOut',
        overwrite: true,
        onComplete: () => {
          outer.style.height = '';
          outer.dataset.morphing = 'false';
        },
      });
    };
    measure.current = resize;
    const observer = new ResizeObserver(resize);
    observer.observe(inner);
    return () => {
      measure.current = null;
      observer.disconnect();
      tween?.kill();
      outer.style.height = '';
      delete outer.dataset.morphing;
    };
  }, [reduced]);

  // Freeze before paint on React updates; the observer also covers fonts and child changes.
  useLayoutEffect(() => {
    measure.current?.();
  });

  useLayoutEffect(() => {
    if (reduced || !content.current || changeKey === undefined) return;
    const targets = content.current.querySelectorAll('[data-morph-enter]');
    if (!targets.length) return;
    const tween = gsap.fromTo(
      targets,
      { opacity: 0.35, y: 5 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.025,
        ease: 'power2.out',
        clearProps: 'opacity,transform',
      },
    );
    return () => {
      tween.kill();
      gsap.set(targets, { clearProps: 'opacity,transform' });
    };
  }, [changeKey, reduced]);

  return (
    <div {...props} ref={frame} className={'morph-panel ' + className}>
      <div ref={content} className="morph-panel__content">
        {children}
      </div>
    </div>
  );
}
