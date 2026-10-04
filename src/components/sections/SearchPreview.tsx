import { useId, useState, type FormEvent } from 'react';
import { metrics, productUrl } from '../../content/site';
import { SearchChrome } from './SearchChrome';
import { TrustMarquee } from './TrustMarquee';
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
        <div className="search-scene" data-source="React chrome / original Handoff composition">
          <SearchChrome />
          <div className="search-chrome__fog" aria-hidden="true" />
          <div className="search-scene__heading">
            <h3>
              <span className="search-title-desktop">One query. A closer look.</span>
              <span className="search-title-mobile">
                Search internet
                <br />
                infrastructure
              </span>
            </h3>
            <p>Find hosts, services and networks.</p>
          </div>
          <SearchForm />
        </div>
      </div>
      <TrustMarquee />
    </section>
  );
}
