import { useState, useRef, useEffect } from 'react';
import { MorphPanel } from '../ui/MorphPanel';
import { ObservationTrace } from './ObservationTrace';
import { siteHref } from '../../app/router';
import { demoHosts } from '../../content/product-demo';
import { ProductEvidence } from './ProductEvidence';
const views = [
  {
    id: 'scope',
    label: 'Scope',
    headline: 'Choose what to observe.',
    detail:
      'Begin with infrastructure you own or are authorised to assess. Select an example target below.',
  },
  {
    id: 'observations',
    label: 'Observe',
    headline: 'Compare recorded observations.',
    detail: 'Two authored snapshots show how a service difference can become a research lead.',
  },
  {
    id: 'change',
    label: 'Signal',
    headline: 'Review a possible change.',
    detail:
      'A service appearing in a later snapshot deserves investigation. A difference alone does not prove an incident.',
  },
  {
    id: 'context',
    label: 'Context',
    headline: 'Inspect the technical evidence.',
    detail: 'Read the service response and detected technology before interpreting a signal.',
  },
  {
    id: 'investigate',
    label: 'Investigate',
    headline: 'Continue the investigation.',
    detail: 'Carry the selected host into Search & Investigation and validate the observation.',
  },
];
export function MonitoringConcept() {
  const [current, setCurrent] = useState(0);
  const [assetIndex, setAssetIndex] = useState(0);
  const nav = useRef<HTMLDivElement>(null);
  const view = views[current]!;
  const asset = demoHosts[assetIndex]!;
  const service = asset.services[1]!;
  useEffect(() => {
    const el = nav.current;
    const active = el?.querySelector<HTMLElement>('[aria-pressed="true"]');
    if (!el || !active || el.scrollWidth <= el.clientWidth) return;
    const a = active.getBoundingClientRect(),
      n = el.getBoundingClientRect();
    if (a.right > n.right) el.scrollLeft += a.right - n.right;
    else if (a.left < n.left) el.scrollLeft -= n.left - a.left;
  }, [current]);
  return (
    <section
      className="stage-monitor-concept section-space"
      aria-labelledby="monitor-concept-title"
    >
      <div className="container">
        <div className="stage-monitor-concept__heading">
          <div>
            <p className="eyebrow">MONITORING / CONCEPT EXPERIENCE</p>
            <h2 id="monitor-concept-title">An observation is a starting point.</h2>
          </div>
          <p>
            Explore a potential monitoring workflow with synthetic snapshots. This concept does not
            connect to live scans or alerts.
          </p>
        </div>
        <div className="stage-monitor-console">
          <div className="stage-monitor-console__header">
            <strong>
              APCOSYS <span>/ MONITORING CONCEPT</span>
            </strong>
            <span>SYNTHETIC DEMONSTRATION</span>
          </div>
          <div className="stage-monitor-console__body">
            <div className="stage-monitor-console__sidebar" ref={nav}>
              <p className="stage-monitor-console__label">WORKFLOW</p>
              {views.map((item, i) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setCurrent(i)}
                  aria-pressed={i === current}
                  className="stage-monitor-console__nav"
                >
                  0{i + 1} / {item.label}
                </button>
              ))}
              <p className="stage-monitor-console__sidebar-footer">
                Concept only · availability to be confirmed
              </p>
            </div>
            <MorphPanel changeKey={current + String(assetIndex)}>
              <div className="stage-monitor-console__main">
                <div className="stage-monitor-console__overline">
                  <span>{view.label.toUpperCase()}</span>
                  <span>0{current + 1} / 05</span>
                </div>
                <h3 data-morph-enter>{view.headline}</h3>
                <p>{view.detail}</p>
                <div className="stage-monitor-assets">
                  <div className="stage-monitor-assets__intro">
                    <span>OBSERVATION TARGETS</span>
                    <span>SELECT AN EXAMPLE</span>
                  </div>
                  <div className="stage-monitor-assets__list">
                    {demoHosts.map((host, i) => (
                      <button
                        type="button"
                        key={host.ip}
                        aria-pressed={assetIndex === i}
                        onClick={() => setAssetIndex(i)}
                      >
                        <span>
                          <strong>{host.role}</strong>
                          <small>{host.ip}</small>
                        </span>
                        <span>{assetIndex === i ? 'Selected' : 'Select'}</span>
                      </button>
                    ))}
                  </div>
                  <div className="stage-monitor-assets__details" aria-live="polite">
                    <span>SELECTED / DOCUMENTATION ADDRESS</span>
                    <strong>{asset.ip}</strong>
                    <div>
                      <span>Hostname</span>
                      <span>{asset.hostname}</span>
                    </div>
                    <div>
                      <span>Snapshot source</span>
                      <span>Authored concept · no scan date</span>
                    </div>
                  </div>
                </div>
                <ObservationTrace port={service.port} active={current} />
                {current <= 2 ? (
                  <div className="stage-monitor-console__summary" aria-live="polite">
                    <div>
                      <span>{current === 0 ? 'Authorised scope' : 'Snapshot A / earlier'}</span>
                      <strong>{current === 0 ? asset.hostname : '443 / HTTPS'}</strong>
                      <p>
                        {current === 0
                          ? 'Confirm permission before observing.'
                          : 'nginx 1.24.0 · HTTP Server header'}
                      </p>
                    </div>
                    <div>
                      <span>{current === 0 ? 'Objects to review' : 'Snapshot B / later'}</span>
                      <strong>
                        {current === 0
                          ? asset.services.length + ' service records'
                          : '443 / HTTPS + ' + service.port + ' / ' + service.protocol}
                      </strong>
                      <p>
                        {current === 0
                          ? asset.role
                          : 'Added in this example: ' + service.technology}
                      </p>
                    </div>
                  </div>
                ) : (
                  <ProductEvidence
                    scenario="domain"
                    mode={current === 3 ? 'services' : 'continue'}
                    selectedHost={assetIndex}
                    onSelectHost={setAssetIndex}
                    compact
                    embedded
                  />
                )}
                <a
                  className="stage-monitor-console__link"
                  href={
                    siteHref('/platform/search-investigation') +
                    '?demoHost=' +
                    encodeURIComponent(asset.ip)
                  }
                >
                  Explore Search & Investigation
                </a>
              </div>
            </MorphPanel>
          </div>
          <div className="stage-monitor-console__footer">
            MONITORING CONCEPT · NO LIVE ALERTS · SYNTHETIC SERVICE RECORDS
          </div>
        </div>
      </div>
    </section>
  );
}
