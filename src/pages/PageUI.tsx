import '../styles/compact-experience.css';
import '../styles/inner-pages.css';
import { PageArtwork, type ArtworkKey } from './PageArtwork';
import { useRef, type ReactNode } from 'react';
import { usePageMotion } from '../hooks/usePageMotion';
import { DoubleButton } from '../components/ui/DoubleButton';

export type PageLink = { label: string; href: string; secondary?: boolean };

export function PageIntro({
  title,
  description,
  concept = false,
  artwork,
  actions,
}: {
  eyebrow: string;
  title: string;
  description: string;
  concept?: boolean;
  artwork?: ArtworkKey | undefined;
  actions?: readonly PageLink[] | undefined;
}) {
  return (
    <header className="stage-page-hero">
      <div className="container stage-page-hero__grid">
        <div className="stage-page-hero__copy">
          <div className="stage-page-hero__title">
            <h1>{title}</h1>
          </div>
          <div className="stage-page-hero__aside">
            <p className="stage-page-hero__description">{description}</p>
            {concept && (
              <p className="stage-concept-label">
                Concept demonstration · Not a live product capability
              </p>
            )}
          </div>
          {actions && <PageAction links={actions} />}
        </div>
        {artwork && <PageArtwork kind={artwork} />}
      </div>
    </header>
  );
}

/** The site's primary CTAs use the original R21 double-button component. */
export function PageAction({ links }: { links: readonly PageLink[] }) {
  return (
    <div className="stage-actions">
      {links.map(({ label, href, secondary }) => (
        <DoubleButton
          key={href + label}
          href={href}
          {...(secondary ? { variant: 'secondary' as const } : {})}
        >
          {label}
        </DoubleButton>
      ))}
    </div>
  );
}

export function PageFrame({
  eyebrow,
  title,
  description,
  children,
  links,
  heroLinks,
  variant = 'editorial',
  concept = false,
  artwork,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  links?: readonly PageLink[];
  heroLinks?: readonly PageLink[];
  variant?: 'editorial' | 'technical' | 'product' | 'commercial' | 'usecase' | 'developer';
  concept?: boolean;
  artwork?: ArtworkKey;
}) {
  const root = useRef<HTMLElement>(null);
  usePageMotion(root, title);
  return (
    <article ref={root} className={'stage-page inner-pages stage-page--' + variant}>
      <PageIntro
        eyebrow={eyebrow}
        title={title}
        description={description}
        concept={concept}
        artwork={artwork}
        actions={heroLinks ?? links?.slice(0, 2)}
      />
      {children}
      {links && (
        <nav className="stage-related" aria-label="Continue exploring Apcosys">
          <div className="container stage-related__inner">
            <div className="stage-related__links">
              {links.map(({ label, href }) => (
                <DoubleButton variant="secondary" compact href={href} key={href + label}>
                  {label}
                </DoubleButton>
              ))}
            </div>
          </div>
        </nav>
      )}
    </article>
  );
}

/** Sparse editorial facts, not a generic card grid or a replacement for product scenes. */
export function StorySections({
  items,
  variant = 'split',
}: {
  items: readonly { title: string; description: string; note?: string }[];
  variant?: 'split' | 'grid' | 'timeline';
}) {
  return (
    <section className={'stage-story section-space stage-story--' + variant}>
      <div className="container">
        {items.map((item) => (
          <article className="stage-story__item" key={item.title}>
            <div>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              {item.note && <p className="stage-story__note">{item.note}</p>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function Notice({ children }: { children: ReactNode }) {
  return (
    <aside className="stage-note" role="note">
      {children}
    </aside>
  );
}
