import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { demoHosts } from '../../content/product-demo';
import type { ResearchScene } from '../../content/site';
/** Readable excerpts of one investigation. No scaled desktop screenshots. */
export function StepSnippet({ scene }: { scene: ResearchScene }) {
  const ref = useRef<HTMLDivElement>(null);
  const host = demoHosts[0]!;
  useEffect(() => {
    if (!ref.current || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          gsap.fromTo(
            el.querySelectorAll('[data-record]'),
            { opacity: 0.3, y: 6 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
          );
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      gsap.killTweensOf(el.querySelectorAll('[data-record]'));
    };
  }, []);
  return (
    <div ref={ref} className="step-snippet">
      <div className="step-snippet__bar">
        <span>APCOSYS / {scene === 'evidence' ? 'CONTEXT' : scene.toUpperCase()}</span>
        <span>DEMO</span>
      </div>
      {scene === 'query' ? (
        <>
          <div className="step-snippet__query" data-record>
            <span>DOMAIN QUERY</span>
            <strong>example.com</strong>
          </div>
          <div className="step-snippet__row" data-record>
            <span>Research scope</span>
            <strong>Programme domain</strong>
          </div>
          <p data-record>Start with an authorised domain. Review the hosts that match.</p>
        </>
      ) : scene === 'results' ? (
        <>
          {demoHosts.map((h) => (
            <div className="step-snippet__row" key={h.ip} data-record>
              <strong>{h.ip}</strong>
              <span>{h.hostname}</span>
              <small>{h.services.map((s) => s.port + ' / ' + s.protocol).join(' · ')}</small>
            </div>
          ))}
        </>
      ) : scene === 'host' ? (
        <>
          <div className="step-snippet__query" data-record>
            <span>HOST DETAILS</span>
            <strong>{host.ip}</strong>
            <small>{host.hostname}</small>
          </div>
          {host.services.map((s) => (
            <div className="step-snippet__service" key={s.port} data-record>
              <code>{s.port}</code>
              <span>{s.protocol}</span>
              <strong>{s.technology}</strong>
            </div>
          ))}
        </>
      ) : scene === 'evidence' ? (
        <>
          <div className="step-snippet__query" data-record>
            <span>DETECTED TECHNOLOGY</span>
            <strong>nginx 1.24.0</strong>
            <small>HTTP Server header</small>
          </div>
          <div className="step-snippet__row" data-record>
            <span>CVE ASSOCIATIONS</span>
            <strong>Verify applicability</strong>
          </div>
          <p data-record>
            No CVE finding asserted. Review the advisory, patches and configuration.
          </p>
        </>
      ) : (
        <>
          <div className="step-snippet__query" data-record>
            <span>NEXT RESEARCH LEAD</span>
            <strong>{host.hostname}</strong>
          </div>
          <div className="step-snippet__row" data-record>
            <span>Found in host context</span>
            <strong>443 / HTTPS</strong>
          </div>
          <p data-record>Refine the question with this hostname. Confirm scope before testing.</p>
        </>
      )}
    </div>
  );
}
