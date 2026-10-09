import { productUrl, supportEmail } from '../config/site';

export { productUrl, supportEmail };
export const metrics = [
  { id: 'ipv4', label: 'IPv4', value: '88 585 365' },
  { id: 'ipv6', label: 'IPv6', value: '106 984 285' },
  { id: 'domains', label: 'Domains', value: '734 910 896' },
  { id: 'products', label: 'Detected Products', value: '1 061 725 887' },
  { id: 'cves', label: 'CVE Associations', value: '73 227 609' },
  { id: 'protocols', label: 'Protocols', value: '56' },
] as const;
export type ResearchScene = 'query' | 'results' | 'host' | 'evidence' | 'suggestions';
export const researchSteps = [
  {
    title: 'Query.',
    scene: 'query',
    description: 'Search internet-facing hosts, services and technologies.',
    image: 'step-query.webp',
    alt: 'Search query with recent queries and syntax examples.',
  },
  {
    title: 'Results.',
    scene: 'results',
    description: 'Matching hosts with their open ports and services.',
    image: 'step-results.webp',
    alt: 'Illustrative list of matching hosts, services and technologies.',
  },
  {
    title: 'Host.',
    scene: 'host',
    description: 'Open ports, services and detected products of a single host.',
    image: 'step-host.webp',
    alt: 'Illustrative host details and open services.',
  },
  {
    title: 'Technical context.',
    scene: 'evidence',
    description: 'Detected products, versions and CVEs potentially associated with them.',
    image: 'step-host.webp',
    alt: 'Illustrative technical context for an individual host.',
  },
  {
    title: 'Next step.',
    scene: 'suggestions',
    description: 'Refine the query with what you found and continue.',
    image: 'step-query.webp',
    alt: 'Return to the query with a more specific search.',
  },
] as const satisfies ReadonlyArray<{
  title: string;
  scene: ResearchScene;
  description: string;
  image: string;
  alt: string;
}>;
export type ResearchPoster = (typeof researchSteps)[number]['image'];
export const plans = [
  {
    id: 'free',
    name: 'FREE',
    description: 'Personal introduction',
    price: 0,
    credits: '500',
    users: '1',
    action: 'Start free',
    api: false,
  },
  {
    id: 'plus',
    name: 'PLUS',
    description: 'Research with API access',
    price: 40,
    credits: '25 000',
    users: '1',
    action: 'View Plus',
    api: true,
  },
  {
    id: 'expert',
    name: 'EXPERT',
    description: 'Advanced search & full filters',
    price: 240,
    credits: '250 000',
    users: '1',
    action: 'View Expert',
    api: true,
  },
  {
    id: 'business',
    name: 'BUSINESS',
    description: 'Team access & private scanning',
    price: 720,
    credits: '1 500 000',
    users: '5',
    action: 'View Business',
    api: true,
  },
] as const;
export const navigation = [
  {
    label: 'Platform',
    items: [
      { label: 'Search & Investigation', href: '/platform/search-investigation' },
      { label: 'Data & Methodology', href: '/platform/data-methodology' },
      { label: 'Monitoring', href: '/platform/monitoring' },
    ],
  },
  {
    label: 'Use Cases',
    items: [
      { label: 'Bug Bounty', href: '/use-cases/bug-bounty' },
      { label: 'Vulnerability Research', href: '/use-cases/vulnerability-research' },
      { label: 'OSINT & Threat Investigation', href: '/use-cases/osint-threat-investigation' },
    ],
  },
  {
    label: 'Developers',
    items: [
      { label: 'API', href: '/developers/api' },
      { label: 'Documentation', href: productUrl + '/docs/api' },
    ],
  },
] as const;
export const footerGroups = [
  {
    title: 'Platform',
    links: [
      ['Search & Investigation', '/platform/search-investigation'],
      ['Data & Methodology', '/platform/data-methodology'],
      ['Monitoring', '/platform/monitoring'],
      ['Pricing', '/pricing'],
    ],
  },
  {
    title: 'Use Cases',
    links: [
      ['Bug Bounty', '/use-cases/bug-bounty'],
      ['Vulnerability Research', '/use-cases/vulnerability-research'],
      ['OSINT & Threat Investigation', '/use-cases/osint-threat-investigation'],
    ],
  },
  { title: 'For Teams', links: [['Security Teams', '/teams']] },
  {
    title: 'Developers',
    links: [
      ['API', '/developers/api'],
      ['Documentation', productUrl + '/docs/api'],
    ],
  },
  {
    title: 'Apcosys',
    links: [
      ['About', '/about'],
      ['Responsible Scanning', '/responsible-scanning'],
      ['Talk to Us', '/contact'],
    ],
  },
  {
    title: 'Legal',
    links: [
      ['API & Data License Agreement', productUrl + '/legal/api-data-license-agreement'],
      ['Cookie Policy', productUrl + '/legal/cookie-policy'],
      ['Data Collection Policy', productUrl + '/legal/data-collection-policy'],
      ['Data Processing Agreement', productUrl + '/legal/data-processing-agreement'],
      ['Privacy Policy', productUrl + '/legal/privacy-policy'],
      ['Terms & Conditions', productUrl + '/legal/terms'],
    ],
  },
] as const;
