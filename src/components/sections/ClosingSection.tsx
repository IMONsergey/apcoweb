import { media, productUrl } from '../../content/site';
export function ClosingSection() {
  return (
    <section className="closing-section" aria-label="Start your first query">
      <div className="container">
        <div className="closing-scene" data-source="saas mobile / Start">
          <picture>
            <source media="(max-width: 340px)" srcSet={media('start-320.webp')} />
            <source media="(max-width: 375px)" srcSet={media('start-360.webp')} />
            <source media="(max-width: 410px)" srcSet={media('start-390.webp')} />
            <source media="(max-width: 599px)" srcSet={media('start-430.webp')} />
            <source media="(max-width: 899px)" srcSet={media('start-768.webp')} />
            <source media="(max-width: 1199px)" srcSet={media('start-1024.webp')} />
            <img
              src={media('start-desktop.webp')}
              width="2880"
              height="1894"
              alt="Start with your first query. Try the public search before creating an account."
              loading="lazy"
              decoding="async"
            />
          </picture>
          <a
            className="closing-hotspot"
            href={`${productUrl}/search`}
            aria-label="Start your first query in APCOSYS"
          >
            <span className="sr-only">Try free search</span>
          </a>
        </div>
      </div>
    </section>
  );
}
