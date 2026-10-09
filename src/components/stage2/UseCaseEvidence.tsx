import { siteHref } from '../../app/router';

export function ScopeEvidence() {
  return (
    <section
      className="stage-case-evidence stage-case-evidence--scope section-space"
      aria-labelledby="scope-evidence-title"
    >
      <div className="container">
        <div className="stage-case-evidence__heading">
          <p className="eyebrow">BUG BOUNTY / AUTHORISED SCOPE</p>
          <h2 id="scope-evidence-title">Visibility isn't permission.</h2>
          <p>
            Start from explicitly authorised targets and keep the programme rules alongside every
            discovery.
          </p>
        </div>
        <div className="stage-scope-console">
          <div className="stage-scope-console__left">
            <div className="stage-scope-console__head">
              <span>01 / RESEARCH INPUT</span>
              <span>EXAMPLE ONLY</span>
            </div>
            <h3>Programme scope</h3>
            <p>Reference input</p>
            <strong>example.com</strong>
            <small>Reserved example domain · No real bug bounty programme is implied</small>
            <div className="stage-scope-console__rules">
              <div>
                <span>01</span> Confirm permitted domains and ranges
              </div>
              <div>
                <span>02</span> Review programme exclusions
              </div>
              <div>
                <span>03</span> Validate hosts before testing
              </div>
            </div>
          </div>
          <div className="stage-scope-console__right">
            <p className="eyebrow">02 / INVESTIGATION DECISION</p>
            <h3>Candidate infrastructure</h3>
            <div className="stage-scope-console__host">
              <span>Possible host association</span>
              <strong>Requires scope verification</strong>
              <em>NOT AUTHORISED BY A SEARCH RESULT</em>
            </div>
            <p>
              Use observed services and technologies to prioritise what to inspect. Do not test a
              system until you have verified it is in scope.
            </p>
            <a href={siteHref('/platform/search-investigation')}>
              See the investigation workflow ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TechnologyEvidence() {
  return (
    <section
      className="stage-case-evidence stage-case-evidence--technology section-space"
      aria-labelledby="tech-evidence-title"
    >
      <div className="container">
        <div className="stage-case-evidence__heading">
          <p className="eyebrow">VULNERABILITY RESEARCH / EVIDENCE CHAIN</p>
          <h2 id="tech-evidence-title">
            A version is a lead.
            <br />
            Not a finding.
          </h2>
          <p>These are interpretation stages, not detections from a live host.</p>
        </div>
        <div className="stage-tech-console">
          <div className="stage-tech-console__header">
            <span>TECHNOLOGY REVIEW</span>
            <span>ILLUSTRATIVE / NOT LIVE SCAN DATA</span>
          </div>
          <div className="stage-tech-console__rows">
            <div>
              <span>01 / OBSERVE</span>
              <h3>Detected product</h3>
              <p>Assess product fingerprint quality and available service evidence.</p>
              <strong>Evidence required</strong>
            </div>
            <div>
              <span>02 / COMPARE</span>
              <h3>Reported version</h3>
              <p>A banner or version match may not reflect deployed patches or configuration.</p>
              <strong>Verify manually</strong>
            </div>
            <div>
              <span>03 / INVESTIGATE</span>
              <h3>CVE association</h3>
              <p>
                Potential CVE relevance is a prioritisation signal, not proof of exploitable
                exposure.
              </p>
              <strong>Not confirmed</strong>
            </div>
          </div>
          <div className="stage-tech-console__foot">
            <strong>What still needs investigation?</strong>
            <span>Patch status · Configuration · Observation age · Detection limits</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function IndicatorEvidence() {
  return (
    <section
      className="stage-case-evidence stage-case-evidence--indicator section-space"
      aria-labelledby="indicator-evidence-title"
    >
      <div className="container">
        <div className="stage-case-evidence__heading">
          <p className="eyebrow">OSINT / LEAD EXPLORATION</p>
          <h2 id="indicator-evidence-title">
            Follow attributes.
            <br />
            Keep attribution separate.
          </h2>
          <p>
            An infrastructure indicator can lead to more questions. Technical similarity does not
            establish control, intent or ownership.
          </p>
        </div>
        <div className="stage-indicator-console">
          <div className="stage-indicator-console__lead">
            <span>STARTING INDICATOR</span>
            <strong>198.51.100.24</strong>
            <p>Documentation-only TEST-NET-2 address</p>
          </div>
          <div className="stage-indicator-console__edges" aria-hidden="true">
            <span></span>
            <span></span>
          </div>
          <div className="stage-indicator-console__nodes">
            <article>
              <span>OBSERVED SERVICE</span>
              <h3>What answered?</h3>
              <p>Examine available host and service observations.</p>
            </article>
            <article>
              <span>RELATED ATTRIBUTE</span>
              <h3>What else shares it?</h3>
              <p>Form a new query from a relevant technology or service.</p>
            </article>
            <article>
              <span>DOCUMENTED EVIDENCE</span>
              <h3>When was it seen?</h3>
              <p>Record the time and limits before drawing conclusions.</p>
            </article>
          </div>
          <div className="stage-indicator-console__footer">
            ILLUSTRATIVE RESEARCH PATH · NO ATTRIBUTION OR LIVE INDICATOR LOOKUP
          </div>
        </div>
      </div>
    </section>
  );
}
