import { useState } from 'react';
import { siteHref } from '../../app/router';

const assets = [
  { name: 'Example domain', target: 'example.com', type: 'DOMAIN', observations: 'Sample host context', services: ['Service A', 'Service B'] },
  { name: 'Example host', target: '198.51.100.24', type: 'IPV4 · TEST-NET-2', observations: 'Sample service context', services: ['Service A', 'Service C'] },
] as const;

const views = [
  {
    id: 'scope',
    label: '01 / Scope',
    headline: 'Choose what to observe.',
    detail: 'A future monitoring workflow could begin with an authorised set of domains or IP addresses. This screen does not schedule a scan.',
    left: ['Research scope', 'Illustrative only'],
    right: ['State', 'Concept only'],
  },
  {
    id: 'observations',
    label: '02 / Observe',
    headline: 'Compare recorded observations.',
    detail: 'Service A and Service B illustrate a difference between two sample snapshots. They do not describe the selected host.',
    left: ['Earlier observation', 'Service A'],
    right: ['Later observation', 'Service A + Service B'],
  },
  {
    id: 'change',
    label: '03 / Signal',
    headline: 'Review a possible change.',
    detail: 'An additional service might be a useful research lead. An apparent difference does not prove a new exposure or a real incident.',
    left: ['Example signal', 'Possible service change'],
    right: ['Next action', 'Inspect host context'],
  },
  {
    id: 'context',
    label: '04 / Context',
    headline: 'Inspect the technical evidence.',
    detail: 'Review services, technology context and observation dates before determining whether a change has meaning.',
    left: ['Host evidence', 'Sample service attributes'],
    right: ['CVE context', 'Unverified association'],
  },
  {
    id: 'investigate',
    label: '05 / Investigate',
    headline: 'Continue in Search & Investigation.',
    detail: 'A future signal would hand off to the actual search and host investigation experience rather than claiming an alert is a finding.',
    left: ['Research lead', 'Selected example asset'],
    right: ['Destination', 'Search & Investigation'],
  },
] as const;

export function MonitoringConcept() {
  const [current, setCurrent] = useState(0);
  const [assetIndex, setAssetIndex] = useState(0);
  const view = views[current] ?? views[0];
  const asset = assets[assetIndex] ?? assets[0];
  return (
    <section className="stage-monitor-concept section-space" aria-labelledby="monitor-concept-title">
      <div className="container">
        <div className="stage-monitor-concept__heading">
          <div>
            <p className="eyebrow">MONITORING / CONCEPT EXPERIENCE</p>
            <h2 id="monitor-concept-title">An observation is a starting point.</h2>
          </div>
          <p>
            Select an example asset and move through a potential monitoring workflow. These are interactive sample states, not live scans, alerts or product records.
          </p>
        </div>
        <div className="stage-monitor-console">
          <div className="stage-monitor-console__header">
            <strong>APCOSYS <span>/ MONITORING CONCEPT</span></strong>
            <span>DEMONSTRATION / OFFLINE</span>
          </div>
          <div className="stage-monitor-console__body">
            <div className="stage-monitor-console__sidebar">
              <p className="stage-monitor-console__label">WORKFLOW</p>
              {views.map((item, i) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setCurrent(i)}
                  aria-pressed={i === current}
                  className="stage-monitor-console__nav"
                >
                  <span>{item.label}</span>
                  <span aria-hidden="true">↗</span>
                </button>
              ))}
              <div className="stage-monitor-console__sidebar-footer">No live monitoring connection</div>
            </div>
            <div className="stage-monitor-console__main">
              <div className="stage-monitor-console__overline">
                <span>CONCEPT / {view.id.toUpperCase()}</span>
                <span>0{current + 1} / 05</span>
              </div>
              <h3>{view.headline}</h3>
              <p>{view.detail}</p>
              <div className="stage-monitor-assets">
                <div className="stage-monitor-assets__intro">
                  <span>OBSERVATION TARGETS</span>
                  <span>SELECT AN EXAMPLE</span>
                </div>
                <div className="stage-monitor-assets__list">
                  {assets.map((item, index) => (
                    <button
                      key={item.target}
                      type="button"
                      aria-pressed={index === assetIndex}
                      onClick={() => setAssetIndex(index)}
                    >
                      <span><strong>{item.name}</strong><small>{item.target}</small></span>
                      <span aria-hidden="true">{index === assetIndex ? '●' : '○'}</span>
                    </button>
                  ))}
                </div>
                <div className="stage-monitor-assets__details" aria-live="polite">
                  <span>SELECTED / {asset.type}</span>
                  <strong>{asset.target}</strong>
                  <div>
                    <span>Illustrative services</span>
                    <span>{asset.services.join(' · ')}</span>
                  </div>
                  <div>
                    <span>Last observed</span>
                    <span>Not supplied</span>
                  </div>
                </div>
              </div>
              <div className="stage-monitor-console__summary">
                <div><span>{view.left[0]}</span><strong>{view.left[1]}</strong></div>
                <span className="stage-monitor-console__arrow" aria-hidden="true">→</span>
                <div><span>{view.right[0]}</span><strong>{view.right[1]}</strong></div>
              </div>
              <div className="stage-monitor-console__ledger">
                {views.map((step, index) => (
                  <div key={step.id}>
                    <span>0{index + 1}</span>
                    <strong>{step.label.slice(5)}</strong>
                    <span>{index === current ? 'Reviewing' : 'Illustrative'}</span>
                  </div>
                ))}
              </div>
              <a className="stage-monitor-console__link" href={siteHref('/platform/search-investigation')}>
                Explore Search & Investigation ↗
              </a>
            </div>
          </div>
          <div className="stage-monitor-console__footer">
            STATIC PRODUCT CONCEPT · NOT A MONITORING BACKEND · NO LIVE ALERTS
          </div>
        </div>
      </div>
    </section>
  );
}
