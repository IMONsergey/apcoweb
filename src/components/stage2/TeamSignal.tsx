import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useMotion } from '../../hooks/useMotion';
import { MorphPanel } from '../ui/MorphPanel';

/** Layered observation field: independent signals gradually resolve into ordered planes. */
export function TeamSignal({ inverse = false }: { inverse?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const { paused, reduced } = useMotion();
  useEffect(() => {
    const canvas = ref.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;
    const state = { phase: 1.2 };
    const pointer = { x: 0, y: 0 };
    let width = 600,
      height = 440,
      visible = false,
      previous = 0;
    const render = () => {
      const now = performance.now();
      if (now - previous < 32 && !reduced) return;
      previous = now;
      context.clearRect(0, 0, width, height);
      const phase = state.phase;
      const turn = -0.55 + Math.sin(phase) * 0.18 + pointer.x * 0.09;
      const tilt = 0.82 + pointer.y * 0.06;
      const scale = Math.min(width / 600, height / 440);
      const project = (x: number, y: number, z: number) => {
        const rx = x * Math.cos(turn) + z * Math.sin(turn);
        const rz = z * Math.cos(turn) - x * Math.sin(turn);
        const ry = y * Math.cos(tilt) - rz * Math.sin(tilt);
        const depth = y * Math.sin(tilt) + rz * Math.cos(tilt);
        const perspective = 820 / (820 + depth);
        return {
          x: width / 2 + rx * scale * perspective,
          y: height / 2 + ry * scale * perspective,
          depth,
          perspective,
        };
      };
      const layers = [2, 1, 0];
      for (const layer of layers) {
        const points: ReturnType<typeof project>[][] = [];
        const separation = 58 + 18 * Math.sin(phase);
        for (let row = 0; row < 11; row++) {
          points[row] = [];
          for (let col = 0; col < 15; col++) {
            const wave = Math.sin(col * 0.48 + row * 0.35 + phase + layer * 0.7);
            const fold = (1 - Math.cos(phase)) * 0.5;
            points[row]![col] = project(
              (col - 7) * 25,
              (layer - 1) * separation + wave * 24 * fold,
              (row - 5) * 23,
            );
          }
        }
        const rgb = inverse ? '204,248,250' : '3,122,143';
        context.lineWidth = 0.65 * scale;
        for (let row = 0; row < 11; row++) {
          context.beginPath();
          points[row]!.forEach((point, col) =>
            col ? context.lineTo(point.x, point.y) : context.moveTo(point.x, point.y),
          );
          context.strokeStyle = `rgba(${rgb},${0.12 + layer * 0.025})`;
          context.stroke();
        }
        for (let col = 0; col < 15; col++) {
          context.beginPath();
          points.forEach((row, i) =>
            i ? context.lineTo(row[col]!.x, row[col]!.y) : context.moveTo(row[col]!.x, row[col]!.y),
          );
          context.stroke();
        }
        points.forEach((row, r) =>
          row.forEach((point, c) => {
            const pulse = Math.pow(
              Math.max(0, Math.cos(c * 0.32 + r * 0.28 - phase * 2 + layer)),
              16,
            );
            const size = (1.1 + pulse * 2.2) * scale * point.perspective;
            context.fillStyle = `rgba(${rgb},${0.28 + pulse * 0.72})`;
            context.fillRect(point.x - size / 2, point.y - size / 2, size, size);
            if (pulse > 0.8) {
              context.strokeStyle = `rgba(${rgb},${(pulse - 0.8) * 1.4})`;
              context.strokeRect(point.x - size * 2, point.y - size * 2, size * 4, size * 4);
            }
          }),
        );
      }
    };
    const timeline = gsap.to(state, {
      phase: 1.2 + Math.PI * 2,
      duration: 18,
      repeat: -1,
      ease: 'none',
      paused: true,
    });
    let ticking = false;
    const sync = () => {
      const running = visible && !paused && !reduced && !document.hidden;
      if (running) {
        timeline.play();
        if (!ticking) gsap.ticker.add(render);
      } else {
        timeline.pause();
        gsap.ticker.remove(render);
      }
      ticking = running;
    };
    const resize = new ResizeObserver(([entry]) => {
      if (!entry) return;
      width = entry.contentRect.width;
      height = entry.contentRect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      previous = 0;
      render();
    });
    const observer = new IntersectionObserver(([entry]) => {
      visible = !!entry?.isIntersecting;
      sync();
    });
    const move = (event: PointerEvent) => {
      if (reduced || event.pointerType !== 'mouse') return;
      const box = canvas.getBoundingClientRect();
      gsap.to(pointer, {
        x: (event.clientX - box.left) / box.width - 0.5,
        y: (event.clientY - box.top) / box.height - 0.5,
        duration: 1,
        overwrite: true,
      });
    };
    const leave = () => {
      gsap.to(pointer, { x: 0, y: 0, duration: 1.4, overwrite: true });
    };
    resize.observe(canvas);
    observer.observe(canvas);
    canvas.addEventListener('pointermove', move);
    canvas.addEventListener('pointerleave', leave);
    document.addEventListener('visibilitychange', sync);
    return () => {
      timeline.kill();
      gsap.killTweensOf(pointer);
      gsap.ticker.remove(render);
      resize.disconnect();
      observer.disconnect();
      canvas.removeEventListener('pointermove', move);
      canvas.removeEventListener('pointerleave', leave);
      document.removeEventListener('visibilitychange', sync);
    };
  }, [inverse, paused, reduced]);
  return <canvas ref={ref} className="team-signal-field" aria-hidden="true" />;
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
