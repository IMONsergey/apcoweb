import { DoubleButton } from '../components/ui/DoubleButton';
import { siteHref } from '../app/router';

const entities = [
  ['Hosts', 'Find internet-facing systems that match your query.'],
  ['Domains', 'Search and investigate observed domain data.'],
  ['Ports & Services', 'See exposed ports and the services observed behind them.'],
  [
    'Technologies',
    'Explore detected products and technologies across internet-facing infrastructure.',
  ],
  [
    'Vulnerability Context',
    'Examine CVEs potentially associated with observed technologies and versions.',
  ],
];
const useCases = [
  [
    'Bug Bounty',
    'Find more to investigate.',
    'Investigate internet-facing services and technologies in your authorised scope.',
    '/use-cases/bug-bounty',
  ],
  [
    'Vulnerability Research',
    'Investigate technologies at internet scale.',
    'Study observations, versions and potential CVE associations.',
    '/use-cases/vulnerability-research',
  ],
  [
    'OSINT & Threat Investigation',
    'Follow infrastructure clues.',
    'Explore the technical attributes behind an infrastructure lead.',
    '/use-cases/osint-threat-investigation',
  ],
] as const;
const capabilities = [
  ['Search', 'Query by technical attribute'],
  ['Filter', 'Narrow the signal'],
  ['Host view', 'Everything observed on one host'],
  ['Buckets', 'Keep your research together'],
  ['API', 'Work with Apcosys programmatically'],
];
export function WhatYouCanSearch() {
  return (
    <section
      className="stage-section stage-searchable section-space"
      id="searchable-data"
      aria-labelledby="searchable-title"
    >
      <div className="container">
        <p className="eyebrow">INTERNET INFRASTRUCTURE DATA</p>
        <h2 id="searchable-title">Search the infrastructure behind the internet.</h2>
        <p className="stage-intro">
          Apcosys turns observations from publicly accessible internet infrastructure into
          searchable technical data for security research and investigation.
        </p>
        <div className="stage-entity-grid">
          {entities.map(([title, description], index) => (
            <article key={title} className={'stage-entity stage-entity--' + index}>
              <span className="stage-entity__count">0{index + 1}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
        <a className="stage-text-link" href={siteHref('/platform/data-methodology')}>
          Explore Data & Methodology →
        </a>
      </div>
    </section>
  );
}

export function UseCasePreview() {
  return (
    <section
      className="stage-section stage-usecases section-space"
      aria-labelledby="stage-usecases-title"
    >
      <div className="container">
        <p className="eyebrow">BUILT FOR INVESTIGATION</p>
        <h2 id="stage-usecases-title">
          Different questions.
          <br />
          One place to investigate them.
        </h2>
        <div className="stage-usecase-grid">
          {useCases.map(([name, title, description, route], i) => (
            <article key={name} className={'stage-usecase stage-usecase--' + i}>
              <span className="eyebrow">0{i + 1} / RESEARCH</span>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
              <a href={siteHref(route)}>
                Explore {name} <span aria-hidden>↗</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CapabilityPreview() {
  return (
    <section
      className="stage-section stage-capabilities section-space"
      aria-labelledby="stage-capabilities-title"
    >
      <div className="container">
        <p className="eyebrow">CAPABILITIES</p>
        <h2 id="stage-capabilities-title">The tools to go deeper.</h2>
        <p className="stage-intro">
          The tools behind each step of an investigation — and a way to take the data into your own
          workflows.
        </p>
        <div className="stage-capabilities-grid">
          {capabilities.map(([title, description], i) => (
            <div className="stage-capability" key={title}>
              <span>0{i + 1}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          ))}
        </div>
        <DoubleButton href={siteHref('/platform/search-investigation')}>
          Explore Search & Investigation
        </DoubleButton>
      </div>
    </section>
  );
}

export function TeamEvaluationCTA() {
  return (
    <section className="stage-team-cta section-space" aria-labelledby="stage-team-cta-title">
      <div className="container stage-team-cta__layout">
        <div>
          <p className="eyebrow">FOR SECURITY TEAMS</p>
          <h2 id="stage-team-cta-title">Evaluating Apcosys for your security team?</h2>
        </div>
        <div className="stage-team-cta__copy">
          <p>
            Tell us about your investigation workflows, data requirements and API needs. Find the
            right way to evaluate Apcosys for your team.
          </p>
          <div className="stage-actions">
            <DoubleButton href={siteHref('/contact')}>Talk to Us</DoubleButton>
            <DoubleButton variant="secondary" href={siteHref('/teams')}>
              Explore Security Teams
            </DoubleButton>
          </div>
        </div>
      </div>
    </section>
  );
}
