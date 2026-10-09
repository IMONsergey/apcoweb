import '../../styles/product-evidence.css';
import { useId, useState } from 'react';
import { productUrl } from '../../config/site';
import { demoNotice, demoScenarios, type EvidenceScenario } from '../../content/product-demo';
export type { EvidenceScenario } from '../../content/product-demo';
export type EvidenceMode = 'query' | 'results' | 'host' | 'services' | 'cve' | 'continue';

export function ProductEvidence({
  mode = 'results',
  scenario = 'domain',
  compact = false,
  selectedHost,
  onSelectHost,
  embedded = false,
}: {
  mode?: EvidenceMode;
  scenario?: EvidenceScenario;
  compact?: boolean;
  selectedHost?: number;
  onSelectHost?: (index: number) => void;
  embedded?: boolean;
}) {
  const id = useId();
  const [localSelection, setLocalSelection] = useState(0);
  const data = demoScenarios[scenario];
  const selected = Math.min(selectedHost ?? localSelection, data.hosts.length - 1);
  const host = data.hosts[selected]!;
  return (
    <div
      className={
        'product-evidence' +
        (compact ? ' product-evidence--compact' : '') +
        (embedded ? ' product-evidence--embedded' : '')
      }
      data-mode={mode}
      role="group"
      aria-label={data.description}
      aria-describedby={id}
    >
      <div className="product-evidence__bar">
        <span>
          APCOSYS <span className="product-evidence__slash">/</span>{' '}
          {mode === 'cve' ? 'CVE CONTEXT' : 'INVESTIGATION'}
        </span>
        <span className="product-evidence__status">SYNTHETIC DEMO</span>
      </div>
      <div className="product-evidence__query">
        <span className="product-evidence__mono">
          {scenario === 'technology' ? 'RESEARCH INPUT' : 'QUERY'}
        </span>
        <strong>{data.query}</strong>
        <span className="product-evidence__hint">
          {data.hosts.length} example {data.hosts.length === 1 ? 'host' : 'hosts'}
        </span>
      </div>
      {mode === 'query' && (
        <div className="product-evidence__context-note">
          <span className="product-evidence__mono">STARTING POINT</span>
          <p>
            Begin with a known {data.label.toLowerCase()}. The records below show how the
            investigation continues. Technology input illustrates intent, not verified query syntax.
          </p>
        </div>
      )}
      <div className="product-evidence__layout">
        <div className="product-evidence__results">
          <div className="product-evidence__eyebrow">
            <span>SEARCH RESULTS</span>
            <span>SELECT A HOST</span>
          </div>
          {data.hosts.map((item, index) => (
            <button
              type="button"
              key={item.ip}
              className="product-evidence__result"
              aria-pressed={selected === index}
              onClick={() => {
                setLocalSelection(index);
                onSelectHost?.(index);
              }}
            >
              <span className="product-evidence__result-main">
                <strong>{item.ip}</strong>
                <small>{item.hostname}</small>
              </span>
              <span className="product-evidence__result-meta">
                {item.services.map((s) => s.port).join(' / ')}
                <small>{item.role}</small>
              </span>
            </button>
          ))}
          {!compact && (
            <p className="product-evidence__disclaimer" id={id}>
              {demoNotice}
            </p>
          )}
        </div>
        <div
          className="product-evidence__details"
          aria-live="polite"
          aria-atomic="true"
          key={host.ip + mode}
        >
          <div className="product-evidence__eyebrow">
            <span>{mode === 'services' ? 'SERVICES & TECHNOLOGIES' : 'HOST DETAILS'}</span>
            <span>SELECTED</span>
          </div>
          <h3>{host.ip}</h3>
          <p className="product-evidence__meta">{host.hostname}</p>
          {!compact && (
            <div className="product-evidence__properties">
              <div>
                <span>Evidence source</span>
                <strong>Authored demonstration</strong>
              </div>
              <div>
                <span>Observation time</span>
                <strong>No live observation</strong>
              </div>
            </div>
          )}
          <div className="product-evidence__services">
            <span className="product-evidence__mono">SERVICES & TECHNOLOGIES</span>
            {host.services.map((service) => (
              <div key={service.port}>
                <span className="product-evidence__port">
                  {service.port}
                  <small>/ tcp</small>
                </span>
                <strong>{service.protocol}</strong>
                <span>
                  {service.technology}
                  {!compact && <small>{service.evidence}</small>}
                </span>
              </div>
            ))}
          </div>
          {(mode === 'cve' || scenario === 'technology') && (
            <div className="product-evidence__cve">
              <span className="product-evidence__mono">CVE ASSOCIATIONS</span>
              <dl>
                <div>
                  <dt>Detected product</dt>
                  <dd>{host.services[0]!.technology}</dd>
                </div>
                <div>
                  <dt>Applicability</dt>
                  <dd>Requires verification</dd>
                </div>
              </dl>
              <p>
                No CVE is asserted for this example. Check the vendor advisory, affected versions,
                configuration and backported fixes before confirming a vulnerability.
              </p>
            </div>
          )}
          {mode === 'continue' && (
            <div className="product-evidence__next">
              <span className="product-evidence__mono">NEXT RESEARCH LEAD</span>
              <strong>{host.hostname}</strong>
              <p>{data.next}</p>
            </div>
          )}
        </div>
      </div>
      {!embedded && (
        <div className="product-evidence__footer">
          <span>
            {compact
              ? demoNotice
              : 'Observation, detection, association: different levels of certainty.'}
          </span>
          <a href={productUrl + '/search'}>Open Apcosys Search</a>
        </div>
      )}
      {compact && (
        <span className="sr-only" id={id}>
          {demoNotice}
        </span>
      )}
    </div>
  );
}
