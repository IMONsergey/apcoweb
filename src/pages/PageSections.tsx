import type { ReactNode } from 'react';
import { siteHref } from '../app/router';

type EditorialMedia = { file: string; alt: string };

export function EditorialHeading({
  title,
  intro,
  id,
}: {
  title: string;
  intro?: string;
  id?: string;
}) {
  return (
    <div className="editorial-heading">
      <h2 id={id}>{title}</h2>
      {intro && <p>{intro}</p>}
    </div>
  );
}

export function EditorialSection({
  id,
  title,
  intro,
  children,
  className = '',
  media,
}: {
  id: string;
  title: string;
  intro?: string;
  children: ReactNode;
  className?: string;
  media?: EditorialMedia;
}) {
  return (
    <section
      id={id}
      className={'editorial-section section-space ' + className}
      aria-labelledby={id + '-title'}
    >
      <div className="container">
        <div
          className={
            media ? 'editorial-opening editorial-opening--illustrated' : 'editorial-opening'
          }
        >
          <EditorialHeading id={id + '-title'} title={title} {...(intro ? { intro } : {})} />
          {media && (
            <figure className="editorial-media">
              <img
                src={import.meta.env.BASE_URL + 'assets/editorial/' + media.file + '.webp'}
                srcSet={
                  import.meta.env.BASE_URL +
                  'assets/editorial/' +
                  media.file +
                  '-600.webp 600w, ' +
                  import.meta.env.BASE_URL +
                  'assets/editorial/' +
                  media.file +
                  '.webp 1200w'
                }
                sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1520px) calc(50vw - 60px), 700px"
                width="1200"
                height="800"
                loading="lazy"
                decoding="async"
                alt={media.alt}
              />
            </figure>
          )}
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
    <div
      className={
        'reading-rows reading-rows--' +
        items.length +
        (numbered ? ' reading-rows--numbered' : '') +
        (items.some((item) => item.detail) ? ' reading-rows--with-details' : '')
      }
    >
      {items.map((item, i) => (
        <article className="reading-row" key={item.title}>
          {numbered && (
            <span className="reading-row__number" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
          )}
          <h3>{item.title}</h3>
          <p>{item.text}</p>
          {item.detail && <p className="reading-row__detail">{item.detail}</p>}
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
    <div
      className={
        'feature-columns' +
        (items.some((item) => item.detail) ? ' feature-columns--with-details' : '')
      }
    >
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
          {relatedArtwork[item.path] && (
            <img
              className="related-reading__image"
              src={import.meta.env.BASE_URL + 'assets/' + relatedArtwork[item.path]}
              alt=""
              width="960"
              height="640"
              loading="lazy"
              decoding="async"
            />
          )}
          <h3>{item.title}</h3>
          <p>{item.text}</p>
          <span>Explore</span>
        </a>
      ))}
    </div>
  );
}

const relatedArtwork: Record<string, string> = {
  '/platform/search-investigation': 'inner/search.webp',
  '/platform/data-methodology': 'inner/methodology.webp',
  '/developers/api': 'inner/api.webp',
};
