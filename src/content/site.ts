/** Copy from CLEAR WORK — Handoff; commercial details remain review inputs. */
export const productUrl = 'https://apcosys.net';
export const supportEmail = 'info@apcosys.net';
export const media = (name: string): string => `${import.meta.env.BASE_URL}media/${name}`;
export const metrics = [
  { id: 'ipv4', label: 'IPv4', value: '88 585 365' },
  { id: 'ipv6', label: 'IPv6', value: '106 984 285' },
  { id: 'domains', label: 'Domains', value: '734 910 896' },
  { id: 'products', label: 'Detected Products', value: '1 061 725 887' },
  { id: 'cves', label: 'Vulnerabilities (CVEs)', value: '73 227 609' },
  { id: 'protocols', label: 'Protocols', value: '56' },
] as const;
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
] as const;
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
      { label: 'Search & Investigation', href: '#how-it-works' },
      { label: 'Monitoring', href: `${productUrl}/search` },
      { label: 'Data & Methodology', href: '#data' },
    ],
  },
  {
    label: 'Use Cases',
    items: [
      { label: 'Bug Bounty', href: '#researchers' },
      { label: 'Vulnerability Research', href: '#researchers' },
      { label: 'OSINT / Threat Investigation', href: '#researchers' },
    ],
  },
  { label: 'For Teams', items: [{ label: 'Security Teams', href: '#teams' }] },
  {
    label: 'Developers',
    items: [
      { label: 'API', href: '#api' },
      { label: 'Documentation', href: `${productUrl}/docs/api` },
    ],
  },
] as const;
export const footerGroups = [
  {
    title: 'Platform',
    links: [
      ['Search & Investigation', '#how-it-works'],
      ['Monitoring', `${productUrl}/search`],
      ['Data & Methodology', '#data'],
      ['Pricing', '#pricing'],
    ],
  },
  {
    title: 'Use Cases',
    links: [
      ['Bug Bounty', '#researchers'],
      ['Vulnerability Research', '#researchers'],
      ['OSINT / Threat Investigation', '#researchers'],
    ],
  },
  { title: 'For Teams', links: [['Security Teams', '#teams']] },
  {
    title: 'Developers',
    links: [
      ['API', '#api'],
      ['Documentation', `${productUrl}/docs/api`],
    ],
  },
  {
    title: 'APCOSYS',
    links: [
      ['About', `${productUrl}/docs/about`],
      ['Responsible Scanning', `${productUrl}/legal/data-collection-policy`],
      ['Talk to Us', `mailto:${supportEmail}`],
    ],
  },
  {
    title: 'Legal',
    links: [
      ['API & Data License Agreement', `${productUrl}/legal/api-data-license-agreement`],
      ['Cookie Policy', `${productUrl}/legal/cookie-policy`],
      ['Data Collection Policy', `${productUrl}/legal/data-collection-policy`],
      ['Data Processing Agreement', `${productUrl}/legal/data-processing-agreement`],
      ['Privacy Policy', `${productUrl}/legal/privacy-policy`],
      ['Terms & Conditions', `${productUrl}/legal/terms`],
    ],
  },
] as const;
export const trustMarks = [
  ['ibm', 'IBM'],
  ['microsoft', 'Microsoft'],
  ['google', 'Google'],
  ['samsung', 'Samsung'],
  ['openai', 'OpenAI'],
  ['adobe', 'Adobe'],
] as const;
