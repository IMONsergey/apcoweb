import { primarySearch, linkTo } from './pageLinks';
import { ApiIllustration } from '../components/visuals/ApiIllustration';
import '../styles/product-motion.css';
import { ApiExample } from '../components/stage2/ApiExample';
import { PricingSection } from '../components/sections/PricingSection';
import { CreditsExplained } from '../components/stage2/CreditsExplained';
import { plans } from '../content/site';
import { apiDocumentationUrl } from '../config/site';
import { siteHref } from '../app/router';
import { PageFrame, Notice, StorySections, PageAction } from './PageUI';

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
      <CreditsExplained />
      <FullPlanComparison />
      <section className="stage-credits section-space" id="search-token-packages">
        <div className="container">
          <p className="eyebrow">ADDITIONAL CAPACITY / CLIENT PREVIEW</p>
          <h2>Search Token packages.</h2>
          <p className="stage-intro">
            Packages shown in the approved pricing concept. Confirm eligibility, current pricing,
            expiration and token-to-credit relationship inside the product before purchase.
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
const documentationLink = apiDocumentationUrl
  ? { label: 'View API Documentation', href: apiDocumentationUrl }
  : {
      label: 'Read API integration guidance',
      href: siteHref('/developers/api') + '#documentation',
    };

function ApiSample() {
  return (
    <section className="stage-api-demo section-space" id="documentation">
      <div className="container">
        <p className="eyebrow">DEVELOPER EXPERIENCE</p>
        <h2>Your first request.</h2>
        <p className="stage-intro">
          Prepare a request using your account API key and the confirmed endpoint, authorization
          scheme and parameters from the live documentation.
        </p>
        <ApiExample />
        {!apiDocumentationUrl && (
          <Notice>
            The production API documentation URL is not yet confirmed. This page explains
            integration concepts only; do not use the illustrative request as an API contract.
          </Notice>
        )}
        <PageAction links={[documentationLink, linkTo('Compare plans', '/pricing', true)]} />
      </div>
    </section>
  );
}
function ApiPage() {
  return (
    <PageFrame
      eyebrow="DEVELOPERS · API"
      variant="developer"
      title="Apcosys data, in your own code."
      description="Query hosts, services and technologies programmatically and use the results in scripts, pipelines, reports and internal tools."
      links={[documentationLink, linkTo('Compare plans', '/pricing', true)]}
    >
      <section className="stage-api-showcase section-space" aria-label="Animated API walkthrough">
        <div className="container stage-api-showcase__grid">
          <div className="stage-api-showcase__copy">
            <p className="eyebrow">FROM REQUEST TO RESPONSE</p>
            <h2>See the workflow unfold.</h2>
            <p>
              Set a parameter. Inspect the request. Read the response, then follow one record into
              its details.
            </p>
          </div>
          <div className="stage-api-showcase__screen">
            <ApiIllustration />
            <p>Illustrative API interface · no live request</p>
          </div>
        </div>
      </section>
      <ApiSample />
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
          <Notice>
            Rate limits are supplied Stage 2 client-preview figures, pending verification of current
            product entitlements.
          </Notice>
        </div>
      </section>
      <StorySections
        items={[
          {
            title: 'Usage and credits.',
            description:
              'API usage depends on your plan and request type. See Pricing for request costs and Search Token packages, and confirm how credits and Search Tokens relate before adding capacity.',
          },
        ]}
      />
    </PageFrame>
  );
}
export default function CommercialPages({ path }: { path: string }) {
  return path === '/pricing' ? <PricingPage /> : <ApiPage />;
}
