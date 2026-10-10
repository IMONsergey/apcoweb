import { primarySearch, linkTo } from './pageLinks';
import '../styles/product-motion.css';
import { ApiExample } from '../components/stage2/ApiExample';
import { PricingSection } from '../components/sections/PricingSection';
import { CreditsExplained } from '../components/stage2/CreditsExplained';
import { plans } from '../content/site';
import { apiDocumentationUrl } from '../config/site';
import { siteHref } from '../app/router';
import { PageFrame, Notice } from './PageUI';
import { EditorialSection, ReadingRows, FeatureColumns } from './PageSections';

const planAccess = [
  { label: 'Credits', values: ['500', '25,000', '250,000', '1,500,000'] },
  { label: 'Users', values: ['1', '1', '1', '5'] },
  {
    label: 'Search & filters',
    values: ['Basic', 'Extended', 'Advanced · full filters', 'Advanced · full filters'],
  },
  { label: 'API access', values: ['Not included', 'Included', 'Included', 'Included'] },
  { label: 'API rate limit', values: ['—', '1 request/s', '2 requests/s', '5 requests/s'] },
  { label: 'CVE context', values: ['Not included', 'Included', 'Included', 'Included'] },
  { label: 'Buckets', values: ['Not included', 'Included', 'Included', 'Included'] },
  { label: 'Leaked Data', values: ['Not included', 'Not included', 'Included', 'Included'] },
  {
    label: 'Private Scanner',
    values: ['Not included', 'Not included', 'Not included', 'Listed for Business'],
  },
  { label: 'Support', values: ['Contact team', 'Contact team', 'Contact team', 'Contact team'] },
] as const;
const rateLimits = [
  ['Free', 'No', '—'],
  ['Plus', 'Yes', '1 request/s'],
  ['Expert', 'Yes', '2 requests/s'],
  ['Business', 'Yes', '5 requests/s'],
] as const;

export function FullPlanComparison() {
  return (
    <section className="stage-plan-comparison section-space" id="compare-plans">
      <div className="container">
        <h2>Compare plans.</h2>
        <p className="stage-intro">
          Compare the allowance, research tools and API access included at each level. Choose the
          capabilities you need before adding more capacity.
        </p>
        <div
          role="region"
          aria-label="Scroll to compare plan features"
          tabIndex={0}
          className="stage-table-scroll"
        >
          <table className="stage-data-table stage-plan-table">
            <thead>
              <tr>
                <th scope="col">Feature</th>
                {plans.map((plan) => (
                  <th key={plan.id} scope="col">
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {planAccess.map((row) => (
                <tr key={row.label}>
                  <th scope="row">{row.label}</th>
                  {row.values.map((value, i) => (
                    <td key={plans[i]?.id}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="stage-helper">
          Swipe the table horizontally on smaller screens to compare all four plans.
        </p>
      </div>
    </section>
  );
}

function PricingPage() {
  return (
    <PageFrame
      eyebrow="PRICING · PLANS & ACCESS"
      artwork="pricing"
      heroLinks={[
        { label: 'Explore plans', href: '#pricing' },
        linkTo('Talk to Us', '/contact', true),
      ]}
      variant="commercial"
      title="Choose the access your research needs."
      description="Start free. Upgrade when you need more searches, deeper filters, API access or a team."
      sections={[
        { label: 'Plans', id: 'pricing' },
        { label: 'Usage', id: 'usage-guide' },
        { label: 'Compare', id: 'compare-plans' },
        { label: 'More capacity', id: 'search-token-packages' },
        { label: 'Billing', id: 'billing-questions' },
      ]}
      closing={{
        title: 'Start with your next research question.',
        description:
          'Explore the public search first. Talk to the team when you need shared access, invoice payment or help evaluating a plan.',
      }}
      links={[primarySearch, linkTo('Talk to Us', '/contact', true)]}
    >
      <PricingSection showTeamBanner={false} title="Find your level of access." />
      <CreditsExplained />
      <FullPlanComparison />
      <section className="stage-credits section-space" id="search-token-packages">
        <div className="container">
          <h2>Search Token packages.</h2>
          <p className="stage-intro">
            Need more search capacity without changing your level of access? Explore the available
            Search Token packages. A package adds capacity; a plan upgrade changes capabilities.
          </p>
          <div className="stage-token-grid">
            <div>
              <strong>25,000</strong>
              <span>Search Tokens</span>
              <b>$50</b>
            </div>
            <div>
              <strong>1,000,000</strong>
              <span>Search Tokens</span>
              <b>$900</b>
            </div>
          </div>
          <Notice>
            Packages shown for the client preview. Check eligibility, token balance, expiry and
            final purchase terms in your account.
          </Notice>
        </div>
      </section>
      <EditorialSection
        id="billing-questions"
        title="Billing questions."
        intro="A few practical details before you choose. Review the final terms in the product checkout before payment."
      >
        <ReadingRows
          items={[
            {
              title: 'Can I start for free?',
              text: 'The Free plan is intended for personal, non-commercial use, with one Free account per person.',
            },
            {
              title: 'Monthly or annual billing?',
              text: 'Use the switch above the plans to compare billing periods. Annual prices show the discounted monthly equivalent; the annual total is shown on the plan.',
            },
            {
              title: 'How can I pay?',
              text: 'Monthly subscriptions use card checkout. Ask the team about invoice payment for an annual Business subscription.',
            },
            {
              title: 'What about taxes?',
              text: 'Applicable VAT or GST and the final payable amount are shown in checkout before you complete the purchase.',
            },
            {
              title: 'What happens after cancellation?',
              text: 'The proposed billing terms keep paid features available until the end of the current subscription period. Confirm the applicable terms in your account.',
            },
            {
              title: 'How are refunds handled?',
              text: 'Refund eligibility follows the payment provider’s policy and applicable consumer law. Review the current policy in checkout or contact the team with your billing question.',
            },
          ]}
        />
      </EditorialSection>
    </PageFrame>
  );
}
const documentationLink = apiDocumentationUrl
  ? { label: 'View API Documentation', href: apiDocumentationUrl }
  : {
      label: 'Read API integration guidance',
      href: siteHref('/developers/api') + '#documentation',
    };

function ApiSample() {
  return (
    <EditorialSection
      id="documentation"
      title="Your first request."
      intro="Start with a small query. Use your account API key and the endpoint, authentication scheme and parameters from the current API reference."
      className="stage-api-demo"
    >
      <div className="api-first-request">
        <ol className="api-setup">
          <li>
            <h3>Get your account key.</h3>
            <p>
              Use an account with API access. Keep the key in your server environment or secrets
              manager, outside browser code.
            </p>
          </li>
          <li>
            <h3>Prepare a narrow request.</h3>
            <p>
              Choose a host or search question you understand. Set the endpoint and authentication
              header from the current reference.
            </p>
          </li>
          <li>
            <h3>Inspect the response.</h3>
            <p>
              Read the returned fields and their observation context before using them in a report
              or wider workflow.
            </p>
          </li>
        </ol>
        <div>
          <ApiExample />
          {!apiDocumentationUrl && (
            <Notice>
              Illustrative request template, not a working API contract. Contact the team for the
              current endpoint, authentication details and API reference.
            </Notice>
          )}
        </div>
      </div>
    </EditorialSection>
  );
}
function ApiPage() {
  return (
    <PageFrame
      eyebrow="DEVELOPERS · API"
      artwork="api"
      variant="developer"
      title="Apcosys data, in your own code."
      description="Query hosts, services and technologies programmatically and use the results in scripts, pipelines, reports and internal tools."
      sections={[
        { label: 'First request', id: 'documentation' },
        { label: 'What to query', id: 'api-capabilities' },
        { label: 'Access & limits', id: 'api-access' },
        { label: 'Integration', id: 'api-integration' },
      ]}
      closing={{
        title: 'Bring the evidence into your workflow.',
        description:
          'Explore access levels or talk to the team about the API reference and your integration requirements.',
      }}
      links={[documentationLink, linkTo('Compare plans', '/pricing', true)]}
    >
      <ApiSample />
      <EditorialSection
        id="api-capabilities"
        title="What you can query."
        intro="Use the same search and host context in your own tools. Build around the supported fields and request types in the current API reference."
      >
        <FeatureColumns
          items={[
            {
              title: 'Search infrastructure.',
              text: 'Turn an IP, domain, service or technology question into a set of observations to review.',
              detail: 'Useful for: focused enrichment and repeat lookups.',
            },
            {
              title: 'Inspect a host.',
              text: 'Bring observed ports, services and detected products into the context of a single system.',
              detail: 'Useful for: analyst tools and investigation reports.',
            },
            {
              title: 'Keep the context.',
              text: 'Carry the available observation dates and supporting attributes with the result.',
              detail: 'Useful for: traceable research and careful interpretation.',
            },
          ]}
        />
      </EditorialSection>
      <EditorialSection
        id="api-access"
        title="API access by plan."
        intro="Plus, Expert and Business include API access. Choose a rate and allowance that fit the volume and pace of your workflow."
        className="stage-api-limits"
      >
        <div className="api-access-layout">
          <div
            role="region"
            aria-label="API rate limits"
            tabIndex={0}
            className="stage-table-scroll"
          >
            <table className="stage-data-table">
              <thead>
                <tr>
                  <th scope="col">Plan</th>
                  <th scope="col">API access</th>
                  <th scope="col">Plan rate limit</th>
                </tr>
              </thead>
              <tbody>
                {rateLimits.map(([plan, enabled, limit]) => (
                  <tr key={plan}>
                    <th scope="row">{plan}</th>
                    <td>{enabled}</td>
                    <td>{limit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <aside className="api-usage">
            <h3>Usage and credits.</h3>
            <p>
              Request rate controls how quickly you can query. Your usage allowance controls how
              much capacity is available.
            </p>
            <p>
              API activity uses the account’s request balance. Review request costs and Search Token
              packages before scheduling a larger workflow.
            </p>
            <a className="stage-text-link" href={siteHref('/pricing') + '#usage-guide'}>
              Understand usage and capacity
            </a>
          </aside>
        </div>
        <p className="editorial-note">
          Plan rates shown for the client preview. Confirm current limits and consumption in your
          account.
        </p>
      </EditorialSection>
      <EditorialSection
        id="api-integration"
        title="Start small. Make the result useful."
        intro="A careful first integration is easier to understand, debug and extend."
      >
        <ReadingRows
          items={[
            {
              title: 'Handle unsuccessful requests.',
              text: 'Check status codes and the current API error guidance. Make failures visible in your own tool instead of treating an empty result as a confirmed absence.',
            },
            {
              title: 'Respect the request rate.',
              text: 'Keep your workflow within its plan limit. Use the documented retry guidance and avoid repeating unsuccessful requests indefinitely.',
            },
            {
              title: 'Preserve the evidence.',
              text: 'Store the fields your investigation needs alongside the source and observation context. Keep your own conclusions separate from the returned data.',
            },
          ]}
        />
      </EditorialSection>
    </PageFrame>
  );
}
export default function CommercialPages({ path }: { path: string }) {
  return path === '/pricing' ? <PricingPage /> : <ApiPage />;
}
