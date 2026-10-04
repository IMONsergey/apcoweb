import { useId, useState, type FormEvent } from 'react';
import { media, metrics, productUrl, trustMarks } from '../../content/site';
import { Icon } from '../ui/Icon';
import { Visual } from '../visuals/Visual';
export function SearchForm({ className = '' }: { className?: string }) {
  const id = useId();
  const [error, setError] = useState(false);
  const [query, setQuery] = useState('');
  function submit(event: FormEvent<HTMLFormElement>) {
    if (!query.trim()) {
      event.preventDefault();
      setError(true);
      document.getElementById(id)?.focus();
    }
  }
  return (
    <form
      className={`search-form ${className}${error ? ' search-form--invalid' : ''}`}
      action={`${productUrl}/search`}
      method="get"
      onSubmit={submit}
      role="search"
      aria-label="Search internet infrastructure"
    >
      <label className="sr-only" htmlFor={id}>
        Domain, IP or technical attribute
      </label>
      <input
        id={id}
        type="search"
        name="search_value"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setError(false);
        }}
        placeholder="Domain, IP or technical attribute. It’s free"
        autoComplete="off"
        spellCheck={false}
        aria-invalid={error || undefined}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      <button type="submit" aria-label="Search APCOSYS">
        <Icon name="search" />
      </button>
      {error && (
        <span className="search-error" id={`${id}-error`} role="alert">
          Enter a domain, IP or technical attribute.
        </span>
      )}
    </form>
  );
}
export function SearchPreview() {
  return (
    <section className="search-preview" aria-label="Try APCOSYS public search">
      <Visual kind="flow" eager />
      <Visual kind="dots" eager />
      <div className="summary-wrap">
        <dl className="container summary-grid">
          {metrics.map((metric) => (
            <div key={metric.id}>
              <dt>{metric.label}</dt>
              <dd>{metric.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="container search-preview__inner">
        <div className="search-scene" data-source="Figma 552:371 + saas mobile">
          <picture>
            <source media="(max-width: 340px)" srcSet={media('search-320.webp')} />
            <source media="(max-width: 375px)" srcSet={media('search-360.webp')} />
            <source media="(max-width: 410px)" srcSet={media('search-390.webp')} />
            <source media="(max-width: 599px)" srcSet={media('search-430.webp')} />
            <img
              className="search-scene__image"
              src={media('search-composite.webp')}
              width="1916"
              height="1252"
              alt="APCOSYS search interface: One query. A closer look."
              fetchPriority="high"
              decoding="async"
            />
          </picture>
          <div className="search-scene__haze" aria-hidden="true" />
          <SearchForm />
        </div>
      </div>
      <div className="container trust">
        <p>
          Trusted by
          <br className="desktop-break" /> researchers and
          <br className="desktop-break" /> organizations
          <br className="desktop-break" /> worldwide
        </p>
        <ul aria-label="Organizations shown in the design">
          {trustMarks.map(([file, name]) => (
            <li key={file}>
              <span className="trust-mark">
                <img
                  src={media(`${file}.svg`)}
                  width="134"
                  height="42"
                  alt={name}
                  loading="lazy"
                  decoding="async"
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
