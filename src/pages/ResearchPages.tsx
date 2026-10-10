import '../styles/stage2-showcases.css';
import '../styles/stage2-usecases.css';
import { primaryContact, linkTo } from './pageLinks';
import { productUrl } from '../config/site';
import { PageFrame } from './PageUI';
import { CaseApproach, CaseChecks } from './CaseGuidance';
import { TeamWorkflow } from '../components/stage2/TeamSignal';
import { TeamOperations } from '../components/stage2/TeamOperations';
import {
  ScopeEvidence,
  TechnologyEvidence,
  IndicatorEvidence,
} from '../components/stage2/UseCaseEvidence';

const caseStudies = {
  '/use-cases/bug-bounty': {
    eyebrow: 'USE CASES · BUG BOUNTY',
    title: 'More to test inside your scope.',
    description:
      'Map internet-facing infrastructure related to an authorised programme, see what runs on it and decide where to look first.',
    items: [
      {
        title: 'Start from the programme scope.',
        description:
          'Use the domains, IP addresses or other assets explicitly permitted by the programme. Stay within its published testing rules.',
      },
      {
        title: 'See what’s exposed.',
        description:
          'Explore observed services and technologies associated with the infrastructure you are authorised to assess.',
      },
      {
        title: 'Prioritise with context.',
        description:
          'Inspect host observations and use relevant technology and CVE associations as research leads rather than confirmed findings.',
      },
      {
        title: 'Stay in scope.',
        description:
          'Cross-check every lead against the programme rules before taking action. Search results are not an authorisation to test an unrelated system.',
      },
    ],
    next: linkTo('Compare plans', '/pricing', true),
  },
  '/use-cases/vulnerability-research': {
    eyebrow: 'USE CASES · VULNERABILITY RESEARCH',
    title: 'See where a technology runs.',
    description:
      'Search for observed products and versions, explore the infrastructure around them and evaluate potential vulnerability context.',
    items: [
      {
        title: 'Search by product and version.',
        description:
          'Begin with a specific product or technology and use the supported search syntax to focus on relevant observations.',
      },
      {
        title: 'Explore the distribution.',
        description:
          'Review which internet-facing hosts appear to use the product, alongside observed ports and services.',
      },
      {
        title: 'Examine potential exposure.',
        description:
          'Investigate CVEs potentially associated with observed versions. Version matching is a research hint, not vulnerability confirmation.',
      },
      {
        title: 'Research responsibly.',
        description:
          'Consider vendor fixes, backports, system configuration and observation timing before drawing conclusions.',
      },
    ],
    next: linkTo('How CVE associations work', '/platform/data-methodology', true),
  },
  '/use-cases/osint-threat-investigation': {
    eyebrow: 'USE CASES · OSINT & THREAT INVESTIGATION',
    title: 'Turn one indicator into a clearer picture.',
    description:
      'Use observable technical attributes to investigate the internet-facing infrastructure behind a lead.',
    items: [
      {
        title: 'Start from what you have.',
        description:
          'An IP from a log, a domain from a report or a service identified in an alert can become a starting point.',
      },
      {
        title: 'Examine the host.',
        description:
          'Look at the available services, ports and detected technologies on the selected system.',
      },
      {
        title: 'Follow shared attributes.',
        description:
          'Use discovered attributes to formulate a new search. Do not assume a technical similarity proves common ownership or attribution.',
      },
      {
        title: 'Keep the evidence together.',
        description:
          'Record the observed attributes and their time context in your own investigation notes and analytical workflow.',
      },
    ],
    next: linkTo('Explore API integration', '/developers/api', true),
  },
} as const;

function TeamPage() {
  return (
    <PageFrame
      eyebrow="FOR TEAMS · SECURITY TEAMS"
      artwork="teams"
      variant="technical"
      title="Internet intelligence for your security team."
      description="Give analysts a common source of technical evidence about internet-facing infrastructure — from the first indicator to the context behind it."
      sections={[
        { label: 'Analyst workflow', id: 'team-workflow' },
        { label: 'Research tasks', id: 'team-tasks' },
        { label: 'Data & handoffs', id: 'team-trust' },
        { label: 'Business access', id: 'team-access' },
      ]}
      closing={{
        title: 'Evaluate it with your own research question.',
        description:
          'Tell us about the infrastructure you investigate, your existing tools and the access your team needs.',
      }}
      links={[primaryContact, linkTo('View Business Plan', '/pricing', true)]}
    >
      <TeamWorkflow />
      <TeamOperations />
    </PageFrame>
  );
}
export default function ResearchPages({ path }: { path: string }) {
  if (path === '/teams') return <TeamPage />;
  const config = caseStudies[path as keyof typeof caseStudies];
  if (!config) return null;
  const kind =
    path === '/use-cases/bug-bounty'
      ? 'scope'
      : path === '/use-cases/vulnerability-research'
        ? 'technology'
        : 'indicator';
  return (
    <PageFrame
      variant="usecase"
      eyebrow={config.eyebrow}
      artwork={
        path === '/use-cases/bug-bounty'
          ? 'bounty'
          : path === '/use-cases/vulnerability-research'
            ? 'vulnerability'
            : 'osint'
      }
      title={config.title}
      description={config.description}
      sections={[
        { label: 'The approach', id: 'research-approach' },
        { label: 'Example investigation', id: 'example-investigation' },
        { label: 'Before you act', id: 'research-checks' },
      ]}
      closing={{
        title:
          kind === 'scope'
            ? 'Find your next in-scope lead.'
            : kind === 'technology'
              ? 'Put a technology under the microscope.'
              : 'Follow the next evidence-led question.',
        description:
          kind === 'scope'
            ? 'Start free. Upgrade when your research needs more credits, filters or API access.'
            : kind === 'technology'
              ? 'Search observed products and versions. CVE context is available from Plus in the plan preview.'
              : 'Start with an IP or domain, or use the API to bring repeat lookups into your investigation workflow.',
      }}
      links={[
        {
          label:
            path === '/use-cases/bug-bounty'
              ? 'Search your scope'
              : path === '/use-cases/vulnerability-research'
                ? 'Search by technology'
                : 'Look up an IP or domain',
          href: productUrl + '/search',
        },
        config.next,
      ]}
    >
      <CaseApproach kind={kind} items={config.items} />
      {path === '/use-cases/bug-bounty' ? (
        <ScopeEvidence />
      ) : path === '/use-cases/vulnerability-research' ? (
        <TechnologyEvidence />
      ) : (
        <IndicatorEvidence />
      )}
      <CaseChecks kind={kind} />
    </PageFrame>
  );
}
