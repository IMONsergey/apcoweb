import { useState } from 'react';
import { PricingSection } from '../components/sections/PricingSection';
import { plans, productUrl } from '../content/site';
import { PageFrame, Notice, StorySections, PageAction, linkTo, primarySearch } from './PageUI';

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
        <p className="eyebrow">PLAN COMPARISON</p>
        <h2>Compare plans.</h2>
        <p className="stage-intro">
          The entitlements shown are based on the approved Stage 2 client preview and must be
          verified against the live checkout before production.
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
      variant="commercial"
      title="Choose the access your research needs."
      description="Start free. Upgrade when you need more searches, deeper filters, API access or a team."
      links={[primarySearch, linkTo('Talk to Us', '/contact', true)]}
    >
      <PricingSection />
      <FullPlanComparison />
      <section className="stage-credits section-space">
        <div className="container">
          <p className="eyebrow">CREDITS & ACCESS</p>
          <h2>How credits work.</h2>
          <div className="stage-credits-grid">
            <article>
              <span className="stage-credits__number">01</span>
              <h3>Standard search</h3>
              <p>A standard search is listed as using 1 credit in the approved plan description.</p>
            </article>
            <article>
              <span className="stage-credits__number">04</span>
              <h3>Search with analytics</h3>
              <p>A search with analytics is listed as using 4 credits.</p>
            </article>
          </div>
          <h2>Need more capacity?</h2>
          <p className="stage-intro">
            Search Tokens can extend the available search capacity without changing a plan.
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
            Credit usage, token availability and package prices are part of the approved
            client-preview copy; confirm current commercial terms inside the product before
            purchasing.
          </Notice>
        </div>
      </section>
      <StorySections
        items={[
          {
            title: 'Free and personal use.',
            description:
              'The Free plan introduces Apcosys for personal, non-commercial exploration; eligibility and account conditions require confirmation.',
          },
          {
            title: 'Payment and invoices.',
            description:
              'Card checkout and Business invoice options are handled through the product. Monthly and annual choices, invoicing and local taxes are confirmed at checkout.',
          },
          {
            title: 'Cancellation and refunds.',
            description:
              'Review the applicable subscription, cancellation and refund terms in the checkout and current legal documents before payment.',
          },
        ]}
        variant="grid"
      />
    </PageFrame>
  );
}
const requestExample =
  'curl --request GET "$APCOSYS_API_ENDPOINT" \\\n  --header "Authorization: Bearer $APCOSYS_API_KEY"';
const responseExample =
  '{\n  "note": "Illustrative response shape only",\n  "data": [],\n  "documentation": "Consult the live API reference"\n}';
function ApiSample() {
  const [tab, setTab] = useState<'request' | 'response'>('request');
  const [copied, setCopied] = useState(false);
  const snippet = tab === 'request' ? requestExample : responseExample;
  return (
    <section className="stage-api-demo section-space">
      <div className="container">
        <p className="eyebrow">DEVELOPER EXPERIENCE</p>
        <h2>Your first request.</h2>
        <p className="stage-intro">
          Get an API key through the existing product and consult the API documentation for the
          verified endpoint and authentication contract.
        </p>
        <div className="stage-code-window">
          <div className="stage-code-header">
            <div className="stage-code-tabs" role="group" aria-label="API code example">
              <button
                type="button"
                aria-pressed={tab === 'request'}
                onClick={() => {
                  setTab('request');
                  setCopied(false);
                }}
              >
                Request
              </button>
              <button
                type="button"
                aria-pressed={tab === 'response'}
                onClick={() => {
                  setTab('response');
                  setCopied(false);
                }}
              >
                Response
              </button>
            </div>
            <button
              type="button"
              className="stage-code-copy"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(snippet);
                  setCopied(true);
                } catch {
                  setCopied(false);
                }
              }}
            >
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <pre tabIndex={0}>
            <code>{snippet}</code>
          </pre>
          <p className="stage-code-note">
            Illustrative template, not an executable API call. No endpoint or response schema is
            asserted here.
          </p>
        </div>
        <PageAction
          links={[
            { label: 'View API Documentation', href: productUrl + '/docs/api' },
            linkTo('Compare plans', '/pricing', true),
          ]}
        />
      </div>
    </section>
  );
}
function ApiPage() {
  return (
    <PageFrame
      eyebrow="DEVELOPERS · API"
      variant="technical"
      title="Apcosys data, in your own code."
      description="Query hosts, services and technologies programmatically and use the results in scripts, pipelines, reports and internal tools."
      links={[
        { label: 'View API Documentation', href: productUrl + '/docs/api' },
        linkTo('Compare plans', '/pricing', true),
      ]}
    >
      <StorySections
        items={[
          {
            title: 'What you can query.',
            description:
              'The API provides programmatic access to the supported search and host data described in the product documentation.',
          },
          {
            title: 'Access by plan.',
            description:
              'API access is listed for Plus, Expert and Business plans. Confirm applicable limits against the live product before integration.',
          },
        ]}
      />
      <section className="stage-api-limits section-space">
        <div className="container">
          <h2>API access by plan.</h2>
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
                  <th scope="col">Published plan rate limit</th>
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
          <Notice>
            Rate limits are supplied Stage 2 client-preview figures, pending verification of current
            product entitlements.
          </Notice>
        </div>
      </section>
      <ApiSample />
      <StorySections
        items={[
          {
            title: 'Usage and credits.',
            description:
              'API activity draws from the available plan credits. Additional Search Tokens may offer more capacity; confirm product billing rules before deployment.',
          },
        ]}
      />
    </PageFrame>
  );
}
export default function CommercialPages({ path }: { path: string }) {
  return path === '/pricing' ? <PricingPage /> : <ApiPage />;
}
