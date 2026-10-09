import { useState } from 'react';
import { siteHref } from '../../app/router';

const views = [
  { id: 'observe', label: '01 / Scope', headline: 'Define the infrastructure to review.',
    detail: 'This concept starts with an authorised set of infrastructure attributes. It does not create a scheduled scan.',
    headlineLabel: 'Observation scope', left: ['Example target', 'example.com'], right: ['State', 'Concept only'] },
  { id: 'signal', label: '02 / Signal', headline: 'Review a possible change.',
    detail: 'A new service observation could be a starting point, but a difference between scans does not itself establish a new exposure.',
    headlineLabel: 'Illustrative comparison', left: ['Earlier observation', 'Service A'], right: ['Later observation', 'Service A + Service B'] },
  { id: 'investigate', label: '03 / Investigate', headline: 'Move from a signal to evidence.',
    detail: 'Open a host in Search & Investigation to examine the technical context and validate the underlying finding.',
    headlineLabel: 'Research handoff', left: ['Lead', 'Review observed service'], right: ['Next action', 'Inspect host context'] },
] as const;

export function MonitoringConcept() {
  const [current, setCurrent] = useState(0);
  const view = views[current] ?? views[0];
  return (
    <section className="stage-monitor-concept section-space" aria-labelledby="monitor-concept-title">
      <div className="container">
        <div className="stage-monitor-concept__heading">
          <div><p className="eyebrow">CONCEPT EXPERIENCE / NOT AVAILABLE IN THE LIVE PRODUCT</p>
            <h2 id="monitor-concept-title">From observation to investigation.</h2></div>
          <p>Explore how a future monitoring workflow could make a change easier to interpret. All states below are static examples, not scan data, alerts or product output.</p>
        </div>
        <div className="stage-monitor-console">
          <div className="stage-monitor-console__header"><strong>APCOSYS <span>/ MONITORING CONCEPT</span></strong><span>DEMONSTRATION / OFFLINE</span></div>
          <div className="stage-monitor-console__body">
            <div className="stage-monitor-console__sidebar">
              <p className="stage-monitor-console__label">WORKFLOW</p>
              {views.map((item, i) => <button type="button" key={item.id} onClick={() => setCurrent(i)}
                aria-pressed={i === current} className="stage-monitor-console__nav">
                <span>{item.label}</span><span aria-hidden="true">↗</span>
              </button>)}
              <div className="stage-monitor-console__sidebar-footer">No live monitoring connection</div>
            </div>
            <div className="stage-monitor-console__main">
              <div className="stage-monitor-console__overline"><span>CONCEPT / {view.headlineLabel}</span><span>0{current + 1} / 03</span></div>
              <h3>{view.headline}</h3><p>{view.detail}</p>
              <div className="stage-monitor-console__summary">
                <div><span>{view.left[0]}</span><strong>{view.left[1]}</strong></div>
                <span className="stage-monitor-console__arrow" aria-hidden="true">→</span>
                <div><span>{view.right[0]}</span><strong>{view.right[1]}</strong></div>
              </div>
              <div className="stage-monitor-console__ledger">
                <div><span>01</span><strong>Observe</strong><span>{current >= 0 ? 'Illustrative' : '—'}</span></div>
                <div><span>02</span><strong>Review signal</strong><span>{current >= 1 ? 'Illustrative' : 'Not selected'}</span></div>
                <div><span>03</span><strong>Investigate</strong><span>{current >= 2 ? 'Illustrative' : 'Not selected'}</span></div>
              </div>
              <a className="stage-monitor-console__link" href={siteHref('/platform/search-investigation')}>
                Explore the existing Search & Investigation experience ↗
              </a>
            </div>
          </div>
          <div className="stage-monitor-console__footer">STATIC PRODUCT CONCEPT · NOT A MONITORING BACKEND · NO LIVE ALERTS</div>
        </div>
      </div>
    </section>
  );
}
