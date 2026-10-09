import { useState } from 'react';
import { researchSteps } from '../../content/site';
import { StepIllustration } from '../visuals/StepIllustration';
import { productUrl } from '../../config/site';
import { siteHref } from '../../app/router';

type Story = 'search' | 'bounty' | 'vulnerability' | 'osint' | 'team';

const stories = {
  search: {
    tag: 'SEARCH & INVESTIGATION',
    heading: 'One investigation. Five connected decisions.',
    context: 'Follow an illustrative host research sequence from input to the next technical question.',
    query: 'example.com',
    captions: ['Enter an observed attribute', 'Inspect matching infrastructure', 'Examine a host', 'Review detected technology', 'Refine the next query'],
    detail: ['Start with a domain or IP, then refine with supported filters.', 'Compare the returned hosts by their reported services.', 'Review ports, services and technology on one selected host.', 'A detected version can suggest a CVE association — not a confirmed vulnerability.', 'Use an observed attribute to formulate a new search.'],
  },
  bounty: {
    tag: 'AUTHORISED BUG BOUNTY',
    heading: 'Stay inside the programme scope.',
    context: 'Illustrative research using example.com, a reserved example domain. Always verify the actual programme scope before testing.',
    query: 'example.com',
    captions: ['Confirm scope', 'Identify candidate hosts', 'Inspect exposed services', 'Prioritise research signals', 'Verify authorisation again'],
    detail: ['Start with a target explicitly permitted by programme rules.', 'Treat search results as candidate infrastructure, not authorised targets.', 'Review a host’s observed ports and software to prioritise manual verification.', 'Versions and CVEs can guide investigation; neither proves exploitability.', 'Confirm the scope and rules again before interacting with the host.'],
  },
  vulnerability: {
    tag: 'VULNERABILITY RESEARCH',
    heading: 'Technology signals need verification.',
    context: 'A conceptual product walkthrough: detected technology, matching hosts and potential vulnerability context.',
    query: 'Technology / version',
    captions: ['Choose a technology', 'Review matching hosts', 'Inspect an observed version', 'Examine potential CVEs', 'Validate findings responsibly'],
    detail: ['Use a product or version only with syntax supported by the live search.', 'Distribution is an observation, not a live census.', 'Detected banners and versions can be incomplete or misleading.', 'CVE associations do not account for all patches and configurations.', 'Confirm applicability and follow coordinated disclosure practices.'],
  },
  osint: {
    tag: 'OSINT & THREAT INVESTIGATION',
    heading: 'Follow an indicator, not an assumption.',
    context: 'An illustrative lead built around documentation-only example addresses, without attribution claims.',
    query: '198.51.100.24',
    captions: ['Begin with an indicator', 'Review observable hosts', 'Inspect service evidence', 'Assess shared attributes', 'Record the next lead'],
    detail: ['Start from a known IP or domain associated with a report or alert.', 'Consider the age and completeness of each observation.', 'Technical similarities are not proof of shared ownership.', 'Use common services or technologies to formulate new questions.', 'Keep evidence and timestamps in your own investigation records.'],
  },
  team: {
    tag: 'SECURITY TEAM WORKFLOW',
    heading: 'From analyst question to technical context.',
    context: 'An illustrative research experience for teams evaluating search and API capabilities.',
    query: '203.0.113.42',
    captions: ['Receive a question', 'Search exposed hosts', 'Review host context', 'Assess a research signal', 'Export the next task'],
    detail: ['Turn an alert or investigation lead into a query.', 'Narrow your view with the filters supported by your plan.', 'Review the observation time along with technical results.', 'Escalate only after validation; associations are not findings.', 'Use confirmed API endpoints for workflow integrations.'],
  },
} as const;

export function InvestigationWorkbench({ story = 'search' }: { story?: Story }) {
  const [selected, setSelected] = useState(0);
  const data = stories[story];
  const step = researchSteps[selected] ?? researchSteps[0];
  return (
    <section className={'stage-workbench stage-workbench--' + story + ' section-space'}
      aria-label={data.tag + ' interactive illustrated workflow'}>
      <div className="container">
        <div className="stage-workbench__intro">
          <div><p className="eyebrow">{data.tag}</p><h2>{data.heading}</h2></div>
          <p>{data.context}</p>
        </div>
        <div className="stage-workbench__stage">
          <nav className="stage-workbench__steps" aria-label="Investigation workflow steps">
            {data.captions.map((label, index) =>
              <button key={label} type="button" id={'stage-step-' + story + '-' + index}
                className="stage-workbench__step" role="tab" aria-selected={selected === index}
                aria-controls={'stage-panel-' + story}
                onClick={() => setSelected(index)}>
                <span>{String(index + 1).padStart(2, '0')}</span><strong>{label}</strong>
                <span aria-hidden="true">↗</span>
              </button>,
            )}
          </nav>
          <div className="stage-workbench__viewer" role="tabpanel" tabIndex={0}
            id={'stage-panel-' + story} aria-labelledby={'stage-step-' + story + '-' + selected}>
            <div className="stage-workbench__bar">
              <span><i aria-hidden="true" /> APCOSYS / RESEARCH</span>
              <span>ILLUSTRATIVE INTERFACE</span>
            </div>
            <div className="stage-workbench__illustration">
              <StepIllustration key={selected} scene={step.scene} image={step.image} alt={step.alt} />
            </div>
            <div className="stage-workbench__insight">
              <div><span className="stage-workbench__mini">STEP {String(selected + 1).padStart(2, '0')} / 05</span>
                <h3>{data.captions[selected]}</h3><p>{data.detail[selected]}</p>
              </div>
              <span className="stage-workbench__query" title="Example only">{data.query}</span>
            </div>
          </div>
        </div>
        <div className="stage-workbench__bottom">
          <p>Illustrative UI · No live host results or backend queries are simulated. The product screens demonstrate the intended investigation sequence.</p>
          <div>
            <a href={productUrl + '/search'}>Try Search ↗</a>
            <a href={siteHref('/platform/data-methodology')}>Data & Methodology ↗</a>
          </div>
        </div>
      </div>
    </section>
  );
}
