import type { ReactNode } from 'react';
import { siteHref } from '../app/router';

export function EditorialSection({
  id,
  title,
  intro,
  children,
  className = '',
}: {
  id: string;
  title: string;
  intro?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={'editorial-section section-space ' + className}
      aria-labelledby={id + '-title'}
    >
      <div className="container">
        <div className="editorial-heading">
          <h2 id={id + '-title'}>{title}</h2>
          {intro && <p>{intro}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

export function ReadingRows({
  items,
  numbered = false,
}: {
  items: readonly { title: string; text: string; detail?: string }[];
  numbered?: boolean;
}) {
  return (
    <div className={'reading-rows' + (numbered ? ' reading-rows--numbered' : '')}>
      {items.map((item, i) => (
        <article className="reading-row" key={item.title}>
          {numbered && (
            <span className="reading-row__number" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
          )}
          <h3>{item.title}</h3>
          <div>
            <p>{item.text}</p>
            {item.detail && <p className="reading-row__detail">{item.detail}</p>}
          </div>
        </article>
      ))}
    </div>
  );
}

export function FeatureColumns({
  items,
}: {
  items: readonly { title: string; text: string; detail?: string }[];
}) {
  return (
    <div className="feature-columns">
      {items.map((item) => (
        <article key={item.title}>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
          {item.detail && <span className="feature-columns__detail">{item.detail}</span>}
        </article>
      ))}
    </div>
  );
}

export function RelatedReading({
  items,
}: {
  items: readonly { title: string; text: string; path: string }[];
}) {
  return (
    <div className="related-reading">
      {items.map((item) => (
        <a key={item.path} href={siteHref(item.path)}>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
          <span>Explore</span>
        </a>
      ))}
    </div>
  );
}
