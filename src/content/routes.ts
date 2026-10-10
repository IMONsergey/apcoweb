import { legalRoutes } from './legal-routes';

/** Client-preview routes, including the locally hosted legal documents. */
export const siteRoutes = [
  {
    path: '/',
    title: 'Start with a query. Follow what you find.',
    description:
      'Explore internet-facing infrastructure, services and technical context with Apcosys.',
  },
  {
    path: '/platform/search-investigation',
    title: 'Search & Investigation',
    description: 'Follow the research journey from technical query to host and context.',
  },
  {
    path: '/platform/data-methodology',
    title: 'Data & Methodology',
    description: 'Understand the observations, coverage and limits behind Apcosys data.',
  },
  {
    path: '/platform/monitoring',
    title: 'Monitoring concept',
    description: 'Explore a concept for observing changes to internet-facing infrastructure.',
  },
  {
    path: '/use-cases/bug-bounty',
    title: 'Bug Bounty',
    description: 'Investigate infrastructure within an authorised bug bounty scope.',
  },
  {
    path: '/use-cases/vulnerability-research',
    title: 'Vulnerability Research',
    description: 'Study technologies and potential CVE associations as research signals.',
  },
  {
    path: '/use-cases/osint-threat-investigation',
    title: 'OSINT & Threat Investigation',
    description: 'Follow observed internet infrastructure indicators and technical context.',
  },
  {
    path: '/teams',
    title: 'Security Teams',
    description: 'Evaluate Apcosys search, data and API access for your security team.',
  },
  {
    path: '/developers/api',
    title: 'API',
    description: 'Integrate Apcosys internet infrastructure data into your workflows.',
  },
  {
    path: '/pricing',
    title: 'Pricing',
    description: 'Compare Apcosys plans, credits, limits and API access.',
  },
  {
    path: '/about',
    title: 'About',
    description: 'Learn about the approach behind Apcosys internet intelligence.',
  },
  {
    path: '/responsible-scanning',
    title: 'Responsible Scanning',
    description: 'Learn about responsible infrastructure observations and contact Apcosys.',
  },
  {
    path: '/contact',
    title: 'Talk to Us',
    description: 'Contact Apcosys about data, teams, API access, billing or scanning.',
  },
  ...legalRoutes,
] as const;

export type SitePath = (typeof siteRoutes)[number]['path'];
export const routeGroups = [
  {
    label: 'Platform',
    links: [
      { label: 'Search & Investigation', path: '/platform/search-investigation' },
      { label: 'Data & Methodology', path: '/platform/data-methodology' },
      { label: 'Monitoring', path: '/platform/monitoring' },
    ],
  },
  {
    label: 'Use Cases',
    links: [
      { label: 'Bug Bounty', path: '/use-cases/bug-bounty' },
      { label: 'Vulnerability Research', path: '/use-cases/vulnerability-research' },
      { label: 'OSINT & Threat Investigation', path: '/use-cases/osint-threat-investigation' },
    ],
  },
  { label: 'For Teams', links: [{ label: 'Security Teams', path: '/teams' }] },
  { label: 'Developers', links: [{ label: 'API', path: '/developers/api' }] },
  {
    label: 'Apcosys',
    links: [
      { label: 'About', path: '/about' },
      { label: 'Responsible Scanning', path: '/responsible-scanning' },
      { label: 'Talk to Us', path: '/contact' },
    ],
  },
] as const;
