import { useId, useState } from 'react';
import { productUrl } from '../../config/site';

export type EvidenceMode = 'results' | 'host' | 'services' | 'cve';
export type EvidenceScenario = 'domain' | 'indicator' | 'technology';

type Host = {
  ip: string;
  hostname: string;
  services: readonly { port: string; protocol: string; technology: string }[];
};

const scenarios: Record<
  EvidenceScenario,
  { query: string; description: string; hosts: readonly Host[] }
> = {
  domain: {
    query: 'example.com',
    description: 'Illustrative domain investigation',
    hosts: [
      {
        ip: '198.51.100.24',
        hostname: 'example.com',
        services: [
          { port: '443', protocol: 'HTTPS', technology: 'Web service · sample' },
          { port: '80', protocol: 'HTTP', technology: 'Redirect · sample' },
        ],
      },
      {
        ip: '203.0.113.42',
        hostname: 'sample.example.com',
        services: [{ port: '443', protocol: 'HTTPS', technology: 'Web service · sample' }],
      },
    ],
  },
  indicator: {
    query: '198.51.100.24',
    description: 'Illustrative indicator lookup',
    hosts: [
      {
        ip: '198.51.100.24',
        hostname: 'Not established',
        services: [
          { port: '443', protocol: 'HTTPS', technology: 'TLS · sample' },
          { port: '22', protocol: 'SSH', technology: 'Remote service · sample' },
        ],
      },
    ],
  },
  technology: {
    query: 'Technology / version',
    description: 'Illustrative technology investigation · not executable search syntax',
    hosts: [
      {
        ip: '203.0.113.42',
        hostname: 'Not established',
        services: [{ port: '443', protocol: 'HTTPS', technology: 'Illustrative product · v1.0' }],
      },
      {
        ip: '198.51.100.24',
        hostname: 'Not established',
        services: [
          { port: '80', protocol: 'HTTP', technology: 'Illustrative product · version unknown' },
        ],
      },
    ],
  },
};

export function ProductEvidence({
  mode = 'results',
  scenario = 'domain',
  compact = false,
}: {
  mode?: EvidenceMode;
  scenario?: EvidenceScenario;
  compact?: boolean;
}) {
  const id = useId();
  const data = scenarios[scenario];
  const [selected, setSelected] = useState(0);
  const host = data.hosts[Math.min(selected, data.hosts.length - 1)] ?? data.hosts[0];
  return (
    <div
      className={'product-evidence' + (compact ? ' product-evidence--compact' : '')}
      aria-label={data.description}
    >
      <div className="product-evidence__bar">
        <span>
          APCOSYS <span className="product-evidence__slash">/</span>{' '}
          {mode === 'cve' ? 'CONTEXT' : 'INVESTIGATION'}
        </span>
        <span className="product-evidence__status">ILLUSTRATIVE DATA · NOT LIVE RESULTS</span>
      </div>
      <div className="product-evidence__query">
        <span className="product-evidence__mono">QUERY</span>
        <strong>{data.query}</strong>
        <span className="product-evidence__hint">{data.description}</span>
      </div>
      <div className="product-evidence__layout">
        <div className="product-evidence__results">
          <div className="product-evidence__eyebrow">
            <span>HOST RESULTS</span>
            <span>{data.hosts.length} examples</span>
          </div>
          {data.hosts.map((item, index) => (
            <button
              type="button"
              key={item.ip}
              className="product-evidence__result"
              aria-pressed={selected === index}
              onClick={() => setSelected(index)}
            >
              <span className="product-evidence__result-main">
                <strong>{item.ip}</strong>
                <small>{item.hostname}</small>
              </span>
              <span className="product-evidence__result-meta">
                {item.services.length} sample services <span aria-hidden="true">↗</span>
              </span>
            </button>
          ))}
          <p className="product-evidence__disclaimer">
            Reserved documentation addresses. Entries are fictional UI examples, not observations of
            these hosts.
          </p>
        </div>
        <div className="product-evidence__details" aria-live="polite" aria-atomic="true">
          <div className="product-evidence__eyebrow">
            <span>HOST DETAILS</span>
            <span>SELECTED</span>
          </div>
          <h3>{host.ip}</h3>
          <p className="product-evidence__meta">
            Observation timestamp <strong>Not supplied</strong>
          </p>
          <div className="product-evidence__properties">
            <div>
              <span>Domain context</span>
              <strong>{host.hostname}</strong>
            </div>
            <div>
              <span>Reported services</span>
              <strong>{host.services.length} sample entries</strong>
            </div>
          </div>
          <div className="product-evidence__services">
            <span className="product-evidence__mono">SERVICES & TECHNOLOGIES</span>
            {host.services.map((service) => (
              <div key={service.port}>
                <span className="product-evidence__port">{service.port}</span>
                <strong>{service.protocol}</strong>
                <span>{service.technology}</span>
              </div>
            ))}
          </div>
          {(mode === 'cve' || scenario === 'technology') && (
            <div className="product-evidence__cve">
              <span className="product-evidence__mono">CVE ASSOCIATIONS</span>
              <p>
                No CVE is asserted for this example. In a real result, compare reported
                product/version with vendor advisories, patch status and observation age before
                making a finding.
              </p>
            </div>
          )}
          {mode !== 'cve' && scenario !== 'technology' && (
            <div className="product-evidence__next">
              <span className="product-evidence__mono">NEXT STEP</span>
              <p>
                {scenario === 'indicator'
                  ? 'Use an observed service or technology to refine the investigation; do not infer attribution.'
                  : 'Validate that a selected host belongs to your authorised research scope before testing.'}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="product-evidence__footer">
        <span>Example only · No live search request is performed</span>
        <a href={productUrl + '/search'}>
          Open Apcosys Search <span aria-hidden="true">↗</span>
        </a>
      </div>
      <span className="sr-only" id={id}>
        Technical entries shown are designed examples, not factual detections.
      </span>
    </div>
  );
}
