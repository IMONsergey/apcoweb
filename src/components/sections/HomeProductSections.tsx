import { useState } from 'react';
import { MorphPanel } from '../ui/MorphPanel';
import { siteHref } from '../../app/router';
import { ProductEvidence, type EvidenceMode } from '../stage2/ProductEvidence';
import { DoubleButton } from '../ui/DoubleButton';
import { demoHosts } from '../../content/product-demo';
import '../../styles/home-product.css';

const searchable = [
  {
    label: 'Hosts',
    description: 'Find internet-facing systems that match your query.',
    mode: 'host',
  },
  {
    label: 'Domains',
    description: 'Search and investigate observed domain data.',
    mode: 'results',
  },
  {
    label: 'Ports & Services',
    description: 'See exposed ports and the services observed behind them.',
    mode: 'services',
  },
  {
    label: 'Technologies',
    description: 'Explore detected products and technologies.',
    mode: 'services',
  },
  {
    label: 'Vulnerability Context',
    description: 'Examine CVEs potentially associated with observed technologies and versions.',
    mode: 'cve',
  },
] as const;

export function SearchableSection() {
  const [selected, setSelected] = useState(2);
  return (
    <section
      id="what-you-can-search"
      className="home-searchable section-space"
      aria-labelledby="searchable-title"
    >
      <div className="container">
        <div className="home-product-heading">
          <p className="eyebrow">INTERNET INFRASTRUCTURE DATA</p>
          <h2 id="searchable-title">
            Search the infrastructure <br />
            behind the internet.
          </h2>
        </div>
        <div className="home-searchable__layout">
          <div className="home-searchable__index" role="group" aria-label="Searchable data types">
            {searchable.map((item, i) => (
              <button
                key={item.label}
                type="button"
                aria-pressed={selected === i}
                onClick={() => setSelected(i)}
              >
                <span className="home-product-number">0{i + 1}</span>
                <span>
                  <strong>{item.label}</strong>
                  <small>{item.description}</small>
                </span>
              </button>
            ))}
            <a className="stage-text-link" href={siteHref('/platform/data-methodology')}>
              Explore Data & Methodology
            </a>
          </div>
          <div className="home-searchable__evidence">
            <ProductEvidence mode={searchable[selected]!.mode} compact />
            <p className="home-product-caption">
              One host connects the query, service response and detected technology. An association
              is a lead to verify.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
const cases = [
  {
    title: 'Bug Bounty',
    task: 'A domain in your programme scope.',
    outcome: 'Find candidate infrastructure. Verify permission before testing.',
    path: '/use-cases/bug-bounty',
    label: 'Explore Bug Bounty',
    input: 'example.com',
    result: 'portal.example.com',
    detail: '443 / HTTPS · nginx 1.24.0',
  },
  {
    title: 'Vulnerability Research',
    task: 'A technology named in an advisory.',
    outcome: 'Find matching versions. Check whether the advisory applies.',
    path: '/use-cases/vulnerability-research',
    label: 'Explore Vulnerability Research',
    input: 'nginx 1.24.0',
    result: '203.0.113.42',
    detail: 'Product / version match · requires verification',
  },
  {
    title: 'OSINT & Threat Investigation',
    task: 'An IP address from an alert.',
    outcome: 'Examine services and host context. Identify the next research lead.',
    path: '/use-cases/osint-threat-investigation',
    label: 'Explore OSINT',
    input: '198.51.100.24',
    result: 'portal.example.com',
    detail: 'Hostname + HTTPS service · next query',
  },
];
export function HomeUseCases() {
  return (
    <section
      className="home-usecases section-space"
      id="use-cases"
      aria-labelledby="home-cases-title"
    >
      <div className="container">
        <div className="home-product-heading">
          <p className="eyebrow">BUILT FOR INVESTIGATION</p>
          <h2 id="home-cases-title">
            Different questions. <br />
            One place to investigate them.
          </h2>
        </div>
        <div className="home-usecases__rows">
          {cases.map((item, i) => (
            <article key={item.title}>
              <span className="home-product-number">0{i + 1}</span>
              <div className="home-usecases__story">
                <h3>{item.title}</h3>
                <p>{item.task}</p>
                <a className="stage-text-link" href={siteHref(item.path)}>
                  {item.label}
                </a>
              </div>
              <div className="home-usecases__record">
                <span className="eyebrow">EXAMPLE INVESTIGATION</span>
                <code>{item.input}</code>
                <div>
                  <span>RESULT</span>
                  <strong>{item.result}</strong>
                  <small>{item.detail}</small>
                </div>
                <p>{item.outcome}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="home-product-caption">
          Synthetic examples with documentation addresses. No live infrastructure observations or
          vulnerability findings.
        </p>
      </div>
    </section>
  );
}
const capabilities = [
  {
    label: 'Search',
    title: 'Start with a technical attribute.',
    text: 'An IP, domain, service or technology becomes your starting point.',
    mode: 'query',
  },
  {
    label: 'Filter',
    title: 'Focus on the relevant service.',
    text: 'Select HTTPS to narrow this demonstration to the service you want to inspect.',
    mode: 'services',
  },
  {
    label: 'Host View',
    title: 'Read the evidence in context.',
    text: 'Ports, services and detected versions belong to one selected host.',
    mode: 'host',
  },
  {
    label: 'Buckets',
    title: 'Keep a useful lead together.',
    text: 'An illustrative saved collection. Confirm current availability and plan access with the team.',
    mode: 'host',
  },
  {
    label: 'API',
    title: 'Continue in your own tools.',
    text: 'Take supported search and host data into scripts and internal workflows.',
    mode: 'host',
  },
] as const;
export function CapabilitiesSection() {
  const [selected, setSelected] = useState(0);
  const [httpsOnly, setHttpsOnly] = useState(false);
  const item = capabilities[selected]!;
  return (
    <section
      className="home-capabilities section-space"
      id="capabilities"
      aria-labelledby="capabilities-title"
    >
      <div className="container">
        <div className="home-product-heading">
          <p className="eyebrow">CAPABILITIES</p>
          <h2 id="capabilities-title">The tools to go deeper.</h2>
        </div>
        <div
          className="home-capabilities__tabs"
          role="group"
          aria-label="Investigation capabilities"
        >
          {capabilities.map((cap, i) => (
            <button
              type="button"
              key={cap.label}
              aria-pressed={selected === i}
              onClick={() => setSelected(i)}
            >
              <span>0{i + 1}</span>
              {cap.label}
            </button>
          ))}
        </div>
        <MorphPanel changeKey={selected + String(httpsOnly)}>
          <div className="home-capabilities__stage" data-morph-enter>
            <div className="home-capabilities__copy">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <a
                className="stage-text-link"
                href={siteHref(
                  selected === 4 ? '/developers/api' : '/platform/search-investigation',
                )}
              >
                {selected === 4 ? 'Explore API integration' : 'Explore Search & Investigation'}
              </a>
            </div>
            <div className="home-capabilities__screen">
              {selected === 1 ? (
                <div className="capability-record">
                  <div className="capability-record__bar">
                    <span>SERVICE FILTER / SYNTHETIC DEMO</span>
                    <label>
                      <input
                        type="checkbox"
                        checked={httpsOnly}
                        onChange={(e) => setHttpsOnly(e.target.checked)}
                      />
                      HTTPS only
                    </label>
                  </div>
                  {demoHosts.map((host) => (
                    <div className="capability-record__host" key={host.ip}>
                      <strong>{host.ip}</strong>
                      <span>{host.hostname}</span>
                      {host.services
                        .filter((s) => !httpsOnly || s.protocol === 'HTTPS')
                        .map((s) => (
                          <p key={s.port}>
                            <code>
                              {s.port} / {s.protocol}
                            </code>
                            <span>{s.technology}</span>
                          </p>
                        ))}
                    </div>
                  ))}
                </div>
              ) : selected === 3 ? (
                <div className="capability-record">
                  <div className="capability-record__bar">
                    <span>BUCKETS / CONCEPT</span>
                    <span>Research shortlist</span>
                  </div>
                  {demoHosts.map((host) => (
                    <div className="capability-record__host" key={host.ip}>
                      <strong>{host.hostname}</strong>
                      <span>{host.ip}</span>
                      <p>Review service evidence and confirm authorised scope.</p>
                    </div>
                  ))}
                </div>
              ) : selected === 4 ? (
                <div className="capability-record">
                  <div className="capability-record__bar">
                    <span>INTEGRATION / EXAMPLE</span>
                    <span>Host context</span>
                  </div>
                  <pre>
                    <code>
                      {JSON.stringify(
                        {
                          host: demoHosts[0]!.ip,
                          services: demoHosts[0]!.services.map((s) => ({
                            port: Number(s.port),
                            technology: s.technology,
                          })),
                        },
                        null,
                        2,
                      )}
                    </code>
                  </pre>
                  <p className="home-product-caption">
                    Illustrative data shape. The API contract comes from the product documentation.
                  </p>
                </div>
              ) : (
                <ProductEvidence compact mode={item.mode as EvidenceMode} />
              )}
            </div>
          </div>
        </MorphPanel>
      </div>
    </section>
  );
}
export function SecurityTeamsCTA() {
  return (
    <section className="home-team-cta section-space" aria-labelledby="team-evaluation-title">
      <div className="container">
        <p className="eyebrow">FOR SECURITY TEAMS</p>
        <div className="home-team-cta__layout">
          <h2 id="team-evaluation-title">
            Evaluating Apcosys <br />
            for your security team?
          </h2>
          <div>
            <p>
              Tell us about your investigation workflows, data requirements and API needs. Find the
              right way to evaluate Apcosys with your team.
            </p>
            <DoubleButton href={siteHref('/contact')}>Talk to Us</DoubleButton>
            <a className="stage-text-link" href={siteHref('/teams')}>
              Explore Security Teams
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
