import { LocaleText } from '../../i18n/LocaleText';
import { useLocale } from '../../i18n/context';
import { useEffect, useRef, useState } from 'react';
import { media, trustMarks } from '../../content/site';

/** One semantic list, with an inaccessible visual duplicate for the seamless loop. */
export function TrustMarquee() {
  const { t } = useLocale();
  const ref = useRef<HTMLDivElement>(null);
  const [running, setRunning] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    let visible = false;
    const sync = () => setRunning(visible && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? false;
      sync();
    });
    observer.observe(ref.current);
    document.addEventListener('visibilitychange', sync);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', sync);
    };
  }, []);
  return (
    <div className="container trust" ref={ref} data-running={running}>
      <p>
        <LocaleText>{t('Trusted by researchers and organizations worldwide')}</LocaleText>
      </p>
      <div
        className="trust-viewport"
        tabIndex={0}
        role="region"
        aria-label={t('Organizations — focus to pause scrolling')}
      >
        <div className="trust-track">
          {[0, 1].map((copy) => (
            <ul
              className="trust-group"
              key={copy}
              aria-label={copy === 0 ? 'Organizations shown in the design' : undefined}
              aria-hidden={copy === 1 || undefined}
            >
              {trustMarks.map(([file, name]) => (
                <li key={file}>
                  <span className="trust-mark">
                    <img
                      src={media(`${file}.svg`)}
                      width="134"
                      height="42"
                      alt={copy === 0 ? name : ''}
                      loading="lazy"
                      decoding="async"
                    />
                  </span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
