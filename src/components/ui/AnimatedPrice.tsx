import { useLayoutEffect, useRef } from 'react';
import { formatPrice } from '../../content/pricing';
import { useMotion } from '../../hooks/useMotion';

/** One text node with a short compositor-only settle instead of digit-reel DOM. */
export function AnimatedPrice({ amount }: { amount: number }) {
  const label = formatPrice(amount);
  const { reduced } = useMotion();
  const root = useRef<HTMLSpanElement>(null);
  const previous = useRef(amount);

  useLayoutEffect(() => {
    const changed = previous.current !== amount;
    const direction = amount > previous.current ? 1 : -1;
    previous.current = amount;
    if (!changed || reduced || !root.current) return;
    root.current.getAnimations().forEach((animation) => animation.cancel());
    root.current.animate(
      [
        { opacity: 0.55, transform: `translateY(${direction * 4}px)` },
        { opacity: 1, transform: 'translateY(0)' },
      ],
      {
        duration: 260,
        easing: 'cubic-bezier(.22,.61,.36,1)',
      },
    );
  }, [amount, reduced]);

  return (
    <span className="price-amount" ref={root}>
      {label}
    </span>
  );
}
