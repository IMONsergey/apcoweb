import { siteHref } from '../app/router';
import { PageFrame, StorySections, PageAction, Notice, primarySearch, primaryContact, linkTo } from './PageUI';

const caseStudies = {
  '/use-cases/bug-bounty': {
    eyebrow: 'USE CASES · BUG BOUNTY',
    title: 'More to test inside your scope.',
    description: 'Map internet-facing infrastructure related to an authorised programme, see what runs on it and decide where to look first.',
    items: [
      { title: 'Start from the programme scope.', description: 'Use the domains, IP addresses or other assets explicitly permitted by the programme. Stay within its published testing rules.' },
      { title: 'See what’s exposed.', description: 'Explore observed services and technologies associated with the infrastructure you are authorised to assess.' },
      { title: 'Prioritise with context.', description: 'Inspect host observations and use relevant technology and CVE associations as research leads rather than confirmed findings.' },
      { title: 'Stay in scope.', description: 'Cross-check every lead against the programme rules before taking action. Search results are not an authorisation to test an unrelated system.' },
    ],
    next: linkTo('Compare plans', '/pricing', true),
  },
  '/use-cases/vulnerability-research': {
    eyebrow: 'USE CASES · VULNERABILITY RESEARCH',
    title: 'See where a technology runs.',
    description: 'Search for observed products and versions, explore the infrastructure around them and evaluate potential vulnerability context.',
    items: [
      { title: 'Search by product and version.', description: 'Begin with a specific product or technology and use the supported search syntax to focus on relevant observations.' },
      { title: 'Explore the distribution.', description: 'Review which internet-facing hosts appear to use the product, alongside observed ports and services.' },
      { title: 'Examine potential exposure.', description: 'Investigate CVEs potentially associated with observed versions. Version matching is a research hint, not vulnerability confirmation.' },
      { title: 'Research responsibly.', description: 'Consider vendor fixes, backports, system configuration and observation timing before drawing conclusions.' },
    ],
    next: linkTo('How CVE associations work', '/platform/data-methodology', true),
  },
  '/use-cases/osint-threat-investigation': {
    eyebrow: 'USE CASES · OSINT & THREAT INVESTIGATION',
    title: 'Turn one indicator into a clearer picture.',
    description: 'Use observable technical attributes to investigate the internet-facing infrastructure behind a lead.',
    items: [
      { title: 'Start from what you have.', description: 'An IP from a log, a domain from a report or a service identified in an alert can become a starting point.' },
      { title: 'Examine the host.', description: 'Look at the available services, ports and detected technologies on the selected system.' },
      { title: 'Follow shared attributes.', description: 'Use discovered attributes to formulate a new search. Do not assume a technical similarity proves common ownership or attribution.' },
      { title: 'Keep the evidence together.', description: 'Record the observed attributes and their time context in your own investigation notes and analytical workflow.' },
    ],
    next: { label: 'View API Documentation', href: 'https://apcosys.net/docs/api', secondary: true },
  },
} as const;

function TeamPage() {
  return <PageFrame eyebrow="FOR TEAMS · SECURITY TEAMS" variant="technical"
    title="Internet intelligence for your security team."
    description="Bring internet-facing infrastructure observations into technical research, security evaluation and existing team workflows."
    links={[primaryContact, linkTo('View Business Plan', '/pricing', true)]}>
    <section className="stage-team-banner section-space"><div className="container">
      <div><p className="eyebrow">SECURITY TEAMS</p><h2>Work from a question to the evidence.</h2></div>
      <p>Search, technical context and programmatic access support deeper security research. The current Business plan is presented with five users and higher usage limits, subject to product verification.</p>
    </div></section>
    <StorySections items={[
      { title: 'Investigate the infrastructure behind a question.', description: 'Start from the relevant asset or technical observation, then examine the accessible infrastructure data.' },
      { title: 'Give analysts the context they need.', description: 'Review observed services, technologies and possible vulnerability associations with their methodological limits.' },
      { title: 'Bring data into existing workflows.', description: 'Use the available API access to integrate observations with scripts and internal research processes.' },
      { title: 'Understand the data you rely on.', description: 'Review coverage definitions, observation timestamps and responsible collection principles before evaluation.' },
      { title: 'Choose access for your team.', description: 'Compare the Business allowance, user access and API terms against the operational requirements of your team.' },
    ]} />
    <section className="stage-page-crosslink"><div className="container">
      <h2>Evaluating Apcosys for your security team?</h2>
      <p>Tell us about your investigation workflows, data requirements and API needs.</p>
      <PageAction links={[primaryContact, linkTo('Data & Methodology', '/platform/data-methodology', true)]} />
    </div></section>
  </PageFrame>;
}
export default function ResearchPages({ path }: { path: string }) {
  if (path === '/teams') return <TeamPage />;
  const config = caseStudies[path as keyof typeof caseStudies];
  if (!config) return null;
  return <PageFrame variant="editorial" eyebrow={config.eyebrow}
    title={config.title} description={config.description} links={[primarySearch, config.next]}>
    <section className="stage-case-proof section-space"><div className="container">
      <p className="eyebrow">RESEARCH WORKFLOW</p>
      <h2>Start with a lead.<br />Investigate what you find.</h2>
      <p className="stage-intro">Each result is a technical observation. Use it to decide where to investigate next — not as a final conclusion.</p>
    </div></section>
    <StorySections items={config.items} variant="timeline" />
    <section className="stage-case-bottom"><div className="container">
      <Notice>Only investigate assets you own or are explicitly authorised to assess. A search result does not grant testing permission or establish attribution.</Notice>
      <a className="stage-text-link" href={siteHref('/platform/search-investigation')}>Explore Search & Investigation →</a>
    </div></section>
  </PageFrame>;
}
