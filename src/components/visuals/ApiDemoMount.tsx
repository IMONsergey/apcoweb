import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import '../../visuals/api/api-developer-demo.js';

declare global {
  interface Window {
    ApcosysApiWidget?: { configure(options: { gsap: typeof gsap }): void };
  }
}
window.ApcosysApiWidget?.configure({ gsap });

/** The uploaded custom element owns only its isolated illustrative DOM. */
export default function ApiDemoMount({ onReady }: { onReady: () => void }) {
  const host = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (!host.current) return;
    const element = document.createElement('api-developer-demo');
    element.inert = true;
    element.setAttribute('aria-hidden', 'true');
    host.current.append(element);
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(onReady);
    });
    return () => {
      cancelAnimationFrame(frame);
      element.remove(); // disconnectedCallback reverts GSAP and disposes every observer.
    };
  }, [onReady]);
  return <div ref={host} className="api-demo-host" aria-hidden="true" inert />;
}
