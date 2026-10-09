import { useLayoutEffect, type RefObject } from 'react';
import { gsap } from 'gsap';
import { useMotion } from './useMotion';

/** Small, once-only editorial reveals. Content is visible by default, including without JS. */
export function usePageMotion(ref: RefObject<HTMLElement | null>, identity: string) {
  const { reduced } = useMotion();
  useLayoutEffect(() => {
    const root = ref.current;
    if (!root || reduced) return;
    const played = new WeakSet<Element>();
    const context = gsap.context(() => {}, root);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || played.has(entry.target)) continue;
          played.add(entry.target);
          observer.unobserve(entry.target);
          context.add(() =>
            gsap.fromTo(
              entry.target,
              { opacity: 0.55, y: 14 },
              {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: 'power3.out',
                clearProps: 'opacity,transform',
              },
            ),
          );
        }
      },
      { threshold: 0.12 },
    );
    root
      .querySelectorAll(
        '.stage-page-hero__title, .stage-page-hero__aside, .stage-story__item, .stage-example-journey > div, .stage-team-operations__flow > article, .stage-team-operations__business',
      )
      .forEach((el) => observer.observe(el));
    return () => {
      observer.disconnect();
      context.revert();
    };
  }, [ref, identity, reduced]);
}
