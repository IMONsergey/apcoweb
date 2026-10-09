import { useLayoutEffect, useRef, type HTMLAttributes, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { useMotion } from '../../hooks/useMotion';
import './MorphPanel.css';

/** Measure the natural inner layout; interrupt transitions from their current visible height. */
export function MorphPanel({
  children,
  changeKey,
  className = '',
  reveal = false,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  changeKey?: string | number;
  reveal?: boolean;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const { reduced } = useMotion();
  const measure = useRef<(() => void) | null>(null);
  const previousContent = useRef<HTMLElement | null>(null);
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
        duration: 0.56,
        ease: 'sine.inOut',
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
    const inner = content.current;
    const outer = frame.current;
    if (!inner || !outer) return;
    const previous = previousContent.current;
    previousContent.current = inner.cloneNode(true) as HTMLElement;
    if (reduced || changeKey === undefined) return;
    if (reveal && previous) {
      previous.className = 'morph-panel__outgoing';
      previous.setAttribute('aria-hidden', 'true');
      previous.inert = true;
      previous.removeAttribute('id');
      previous.querySelectorAll('[id]').forEach((node) => node.removeAttribute('id'));
      outer.append(previous);
      // Exchange complete states in sequence: never draw two sets of text together.
      gsap.set(inner, { clipPath: 'inset(0 0 100% 0)' });
      const timeline = gsap.timeline();
      timeline
        .fromTo(
          previous,
          { clipPath: 'inset(0% 0 0 0)' },
          {
            clipPath: 'inset(100% 0 0 0)',
            duration: 0.16,
            ease: 'power1.in',
            onComplete: () => previous.remove(),
          },
        )
        .to(inner, {
          clipPath: 'inset(0 0 0% 0)',
          duration: 0.3,
          ease: 'power2.out',
          clearProps: 'clipPath',
        });
      return () => {
        timeline.kill();
        previous.remove();
        gsap.set(inner, { clearProps: 'clipPath' });
      };
    }
    if (reveal) return;
    const targets = inner.querySelectorAll('[data-morph-enter]');
    if (!targets.length) return;
    const tween = gsap.fromTo(
      targets,
      { opacity: 0.8 },
      { opacity: 1, duration: 0.4, ease: 'sine.out', clearProps: 'opacity' },
    );
    return () => {
      tween.kill();
      gsap.set(targets, { clearProps: 'opacity' });
    };
  }, [changeKey, reduced, reveal]);

  return (
    <div {...props} ref={frame} className={'morph-panel ' + className}>
      <div ref={content} className="morph-panel__content">
        {children}
      </div>
    </div>
  );
}
