import type { ReactNode } from 'react';
import { DoubleButton } from '../components/ui/DoubleButton';

export type PageLink = { label: string; href: string; secondary?: boolean };
export function PageIntro({
  eyebrow,
  title,
  description,
  concept = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  concept?: boolean;
}) {
  return (
    <header className="stage-page-hero">
      <div className="container stage-page-hero__grid">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          {concept && (
            <p className="stage-concept-label">
              Concept demonstration · Not a live product capability
            </p>
          )}
        </div>
        <p className="stage-page-hero__description">{description}</p>
      </div>
    </header>
  );
}
export function PageAction({ links }: { links: readonly PageLink[] }) {
  return (
    <div className="stage-actions">
      {links.map(({ label, href, secondary }) => (
        <DoubleButton key={href + label} href={href} {...(secondary ? { variant: 'secondary' as const } : {})}>
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
  variant = 'editorial',
  concept = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  links?: readonly PageLink[];
  variant?: 'editorial' | 'technical' | 'product' | 'commercial';
  concept?: boolean;
}) {
  return (
    <article className={'stage-page stage-page--' + variant}>
      <PageIntro eyebrow={eyebrow} title={title} description={description} concept={concept} />
      {children}
      {links && (
        <section className="stage-page-cta section-space">
          <div className="container">
            <p className="eyebrow">CONTINUE EXPLORING</p>
            <h2>Follow the next lead.</h2>
            <PageAction links={links} />
          </div>
        </section>
      )}
    </article>
  );
}
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
        {items.map((item, i) => (
          <article className="stage-story__item" key={item.title}>
            <div className="stage-story__index">0{i + 1}</div>
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
