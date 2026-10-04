import { useCallback, useEffect, useRef, useState } from 'react';
import { media, researchSteps } from '../../content/site';
import { Icon } from '../ui/Icon';
import { Visual } from '../visuals/Visual';
import { useMotion } from '../../hooks/useMotion';
export function StepCarousel() {
  const track = useRef<HTMLUListElement>(null);
  const [position, setPosition] = useState(0);
  const [positions, setPositions] = useState(3);
  const { paused } = useMotion();
  const update = useCallback(() => {
    const element = track.current,
      first = element?.firstElementChild as HTMLElement | null;
    if (!element || !first) return;
    const gap = parseFloat(getComputedStyle(element).gap) || 20;
    const step = first.offsetWidth + gap;
    const maximum = Math.max(0, element.scrollWidth - element.clientWidth);
    const count = Math.max(1, Math.ceil(maximum / step - 0.02) + 1);
    setPositions(count);
    setPosition(
      element.scrollLeft >= maximum - 2
        ? count - 1
        : Math.min(count - 1, Math.round(element.scrollLeft / step)),
    );
  }, []);
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const resize = new ResizeObserver(update);
    resize.observe(el);
    el.addEventListener('scroll', update, { passive: true });
    update();
    return () => {
      resize.disconnect();
      el.removeEventListener('scroll', update);
    };
  }, [update]);
  function move(direction: number) {
    const el = track.current,
      first = el?.firstElementChild as HTMLElement | null;
    if (!el || !first) return;
    const step = first.offsetWidth + (parseFloat(getComputedStyle(el).gap) || 20);
    el.scrollTo({
      left: Math.max(0, Math.min(el.scrollWidth - el.clientWidth, (position + direction) * step)),
      behavior: paused ? 'instant' : 'smooth',
    });
  }
  return (
    <section id="how-it-works" className="steps section-space" aria-labelledby="steps-title">
      <div className="container section-heading-row">
        <h2 id="steps-title">
          One query,
          <br />
          step by step.
        </h2>
        <div className="steps-intro">
          <Icon name="focus" width="25" height="25" />
          <p>
            Start with a single query. See which hosts match, open one, review its technical context
            and decide where to look next.
          </p>
        </div>
      </div>
      <div className="container carousel-controls">
        <span className="counter" aria-live="polite" aria-atomic="true">
          {position + 1} / {positions}
        </span>
        <div className="carousel-arrows">
          <button
            type="button"
            className="icon-button"
            aria-label="Previous research step"
            aria-controls="research-track"
            disabled={position === 0}
            onClick={() => move(-1)}
          >
            <Icon name="previous" />
          </button>
          <button
            type="button"
            className="icon-button"
            aria-label="Next research step"
            aria-controls="research-track"
            disabled={position >= positions - 1}
            onClick={() => move(1)}
          >
            <Icon name="arrow" />
          </button>
        </div>
      </div>
      <div className="carousel-bleed">
        <ul
          id="research-track"
          className="step-track"
          ref={track}
          aria-label="Five steps of an investigation"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
              event.preventDefault();
              move(event.key === 'ArrowRight' ? 1 : -1);
            }
          }}
        >
          {researchSteps.map((step, i) => (
            <li className="step-card" key={step.title}>
              <div className="step-copy">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
              <div className="step-media">
                <Visual kind="dots" direction="bottom-to-top" />
                <img
                  src={media(step.image)}
                  width={i === 1 ? 1234 : 908}
                  height={i === 1 ? 824 : 609}
                  alt={step.alt}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
