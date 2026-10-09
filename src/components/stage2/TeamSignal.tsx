import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useMotion } from '../../hooks/useMotion';
import { MorphPanel } from '../ui/MorphPanel';

/** A quiet converging signal field, not another product screenshot. */
export function TeamSignal({ inverse = false }: { inverse?: boolean }) {
  const ref = useRef<SVGSVGElement>(null);
  const { paused, reduced } = useMotion();
  useEffect(() => {
    const root = ref.current;
    if (!root || reduced) return;
    const context = gsap.context(() => {
      const timeline = gsap.timeline({ repeat: -1, paused: true });
      timeline
        .fromTo(
          '[data-signal-trace]',
          { strokeDashoffset: 1 },
          { strokeDashoffset: 0, duration: 2.4, stagger: 0.18, ease: 'power2.inOut' },
        )
        .fromTo(
          '[data-signal-node]',
          { opacity: 0.3, scale: 0.7, transformOrigin: 'center' },
          { opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out' },
          0.8,
        )
        .to(
          '[data-signal-core]',
          { rotation: 90, transformOrigin: 'center', duration: 1.5, ease: 'power3.inOut' },
          1.5,
        )
        .to('[data-signal-trace]', { opacity: 0.25, duration: 1.2 }, 4.2);
      let visible = false;
      const sync = () => {
        if (visible && !paused && !document.hidden) timeline.play();
        else timeline.pause();
      };
      const observer = new IntersectionObserver((entries) => {
        visible = !!entries[0]?.isIntersecting;
        sync();
      });
      observer.observe(root);
      document.addEventListener('visibilitychange', sync);
      return () => {
        observer.disconnect();
        document.removeEventListener('visibilitychange', sync);
      };
    }, root);
    return () => context.revert();
  }, [paused, reduced]);
  return (
    <svg
      ref={ref}
      className={'team-signal' + (inverse ? ' team-signal--inverse' : '')}
      viewBox="0 0 600 360"
      aria-hidden="true"
    >
      <g className="team-signal__grid">
        {[70, 140, 210, 280, 350, 420, 490].map((x) => (
          <path key={x} d={`M${x} 25V335`} />
        ))}
        {[60, 120, 180, 240, 300].map((y) => (
          <path key={y} d={`M35 ${y}H565`} />
        ))}
      </g>
      <g className="team-signal__routes">
        {[
          'M65 70H195V150H265',
          'M70 285H185V210H265',
          'M535 80H425V150H335',
          'M530 285H415V210H335',
          'M300 30V135',
          'M300 330V225',
        ].map((d) => (
          <path key={d} data-signal-trace pathLength="1" strokeDasharray="1" d={d} />
        ))}
      </g>
      <g className="team-signal__nodes">
        {[
          [65, 70],
          [70, 285],
          [535, 80],
          [530, 285],
          [300, 30],
          [300, 330],
        ].map(([x, y]) => (
          <rect
            data-signal-node
            key={x + ',' + y}
            x={x! - 6}
            y={y! - 6}
            width="12"
            height="12"
            rx="2"
          />
        ))}
      </g>
      <g data-signal-core className="team-signal__core">
        <rect x="262" y="142" width="76" height="76" rx="10" />
        <rect x="279" y="159" width="42" height="42" rx="4" />
      </g>
    </svg>
  );
}
const teamStages = [
  {
    name: 'Frame the question',
    title: 'One lead. A shared starting point.',
    text: 'Turn an alert, domain or technical question into an investigation your team can follow.',
    record: 'portal.example.com',
    meta: 'Analyst input',
  },
  {
    name: 'Review the evidence',
    title: 'Put observations in context.',
    text: 'Compare the service response, detected software and observation time before escalating a lead.',
    record: '443 / HTTPS / nginx',
    meta: 'Technical review',
  },
  {
    name: 'Validate the signal',
    title: 'Separate a lead from a finding.',
    text: 'Record what has been observed and what still needs independent verification.',
    record: 'Version applicability → verify',
    meta: 'Research decision',
  },
  {
    name: 'Continue in your tools',
    title: 'Move the next task forward.',
    text: 'Use supported API access to bring observations into scripts, reports and existing workflows.',
    record: 'Search → review → integrate',
    meta: 'Workflow handoff',
  },
];
export function TeamWorkflow() {
  const [selected, setSelected] = useState(0);
  const item = teamStages[selected]!;
  return (
    <section className="team-workflow section-space">
      <div className="container">
        <h2>
          From analyst question
          <br />
          to technical context.
        </h2>
        <div className="team-workflow__layout">
          <div className="team-workflow__visual">
            <div className="team-sequence" aria-label="Illustrative analyst handoff">
              {['Investigation brief', 'Service observations', 'Research notes', 'API handoff'].map(
                (label, i) => (
                  <div className={selected === i ? 'is-current' : ''} key={label}>
                    <span>0{i + 1}</span>
                    <div>
                      <strong>{label}</strong>
                      <small>
                        {
                          [
                            'Domain or technical attribute',
                            'Host · protocol · technology',
                            'Evidence and open questions',
                            'Scripts and internal reports',
                          ][i]
                        }
                      </small>
                    </div>
                    <i aria-hidden="true" />
                  </div>
                ),
              )}
            </div>
            <MorphPanel changeKey={selected}>
              <div className="team-workflow__record">
                <span>{item.meta}</span>
                <code>{item.record}</code>
              </div>
            </MorphPanel>
          </div>
          <div>
            <div className="team-workflow__tabs" role="group" aria-label="Team workflow">
              {teamStages.map((s, i) => (
                <button
                  type="button"
                  aria-pressed={selected === i}
                  onClick={() => setSelected(i)}
                  key={s.name}
                >
                  <span>0{i + 1}</span>
                  {s.name}
                </button>
              ))}
            </div>
            <MorphPanel changeKey={selected}>
              <div className="team-workflow__detail" data-morph-enter>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </MorphPanel>
          </div>
        </div>
      </div>
    </section>
  );
}
