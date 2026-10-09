import { primarySearch, primaryContact, linkTo } from './pageLinks';
import { metrics } from '../content/site';
import { SearchForm } from '../components/sections/SearchPreview';
import { StepCarousel } from '../components/sections/StepCarousel';
import { PageFrame, StorySections, Notice } from './PageUI';

const steps = [
  {
    title: 'Query with what you already know.',
    description:
      'Start from an IP address, domain, port, service or detected technology. Combine supported search attributes to narrow the infrastructure behind your question.',
  },
  {
    title: 'Judge relevance before you click.',
    description:
      'Review matching hosts and the available service information. Use search filters to focus the list on what matters.',
  },
  {
    title: 'One host, the full technical picture.',
    description:
      'Open a host to inspect available observations: ports, services, products, versions and other recorded attributes.',
  },
  {
    title: 'Context, not conclusions.',
    description:
      'Detected products and versions may be associated with CVEs. An association is a lead to verify, not proof that the host is vulnerable.',
  },
  {
    title: 'Keep the thread.',
    description:
      'Use a service, technology or domain from your findings to refine the query and continue the investigation.',
  },
] as const;

function InvestigationPage() {
  return (
    <PageFrame
      eyebrow="PLATFORM · SEARCH & INVESTIGATION"
      title="Every investigation starts with a question."
      description="Turn a technical question into a query, review the hosts that match and open each one to see the services, technologies and context behind it."
      variant="product"
      links={[primarySearch('Data & Methodology', '/platform/data-methodology', true)]}
    >
      <section className="stage-platform-search section-space">
        <div className="container">
          <h2>Query with what you already know.</h2>
          <p>
            Search from a technical attribute. Your query opens the existing Apcosys search product.
          </p>
          <SearchForm />
          <p className="stage-helper">
            Search examples will be added when supported syntax is confirmed in the product.
          </p>
        </div>
      </section>
      <StepCarousel />
      <StorySections items={steps.slice(1)} variant="timeline" />
      <section className="stage-page-crosslink">
        <div className="container">
          <h2>Explore the search syntax.</h2>
          <p>
            Learn how to turn an observed attribute into a query using the existing product
            documentation.
          </p>
          <a href={primarySearch.href}>Continue to Apcosys search ↗</a>
        </div>
      </section>
    </PageFrame>
  );
}

const coverageDefinitions = [
  ['IPv4', 'Observed IPv4-related entries'],
  ['IPv6', 'Observed IPv6-related entries'],
  ['Domains', 'Domain observations represented in the dataset'],
  ['Detected Products', 'Recorded product detections'],
  ['CVE Associations', 'Links between detected technologies and potentially relevant CVEs'],
  ['Protocols', 'Protocols represented in the dataset'],
] as const;

function MethodologyPage() {
  return (
    <PageFrame
      eyebrow="PLATFORM · DATA & METHODOLOGY"
      title="Know what’s behind every result."
      description="How Apcosys represents internet infrastructure observations, what its coverage figures count and how to interpret technical context."
      variant="technical"
      links={[primarySearch('Responsible Scanning', '/responsible-scanning', true)]}
    >
      <section className="stage-methodology section-space">
        <div className="container">
          <p className="eyebrow">COVERAGE</p>
          <h2>Coverage, defined.</h2>
          <p className="stage-intro">
            Figures supplied for the client preview. The reference date and measurement definitions
            require production verification; they must not be treated as current measurements.
          </p>
          <div
            className="stage-table-scroll"
            role="region"
            aria-label="Coverage metrics"
            tabIndex={0}
          >
            <table className="stage-data-table">
              <thead>
                <tr>
                  <th scope="col">Metric</th>
                  <th scope="col">What it counts</th>
                  <th scope="col">Value</th>
                  <th scope="col">Reference date</th>
                </tr>
              </thead>
              <tbody>
                {metrics.map((metric, i) => (
                  <tr key={metric.id}>
                    <th scope="row">{metric.label}</th>
                    <td>{coverageDefinitions[i]?.[1]}</td>
                    <td className="stage-data-numeric">{metric.value}</td>
                    <td>Not provided</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <StorySections
        variant="split"
        items={[
          {
            title: 'What Apcosys records.',
            description:
              'Apcosys organises observations of publicly accessible hosts, including reported ports, services and detected technologies. A single observation describes what the system recorded, not the permanent state of the host.',
          },
          {
            title: 'How collection works.',
            description:
              'Data is gathered from responses of publicly accessible internet infrastructure. Exact scan coverage, supported protocols and update frequency need confirmation before production release.',
          },
          {
            title: 'Reading dates and timestamps.',
            description:
              'A recent observation represents what responded when it was recorded. It does not guarantee that the service remains available or unchanged today.',
          },
          {
            title: 'What a CVE association means.',
            description:
              'Product and version matches may suggest a relevant CVE. Backported patches, configuration and scan limitations affect applicability: association is not proof of a confirmed vulnerability.',
          },
        ]}
      />
    </PageFrame>
  );
}
function MonitoringPage() {
  return (
    <PageFrame
      eyebrow="PLATFORM · FUTURE CAPABILITIES"
      title="Understand what changes across your exposure."
      description="A conceptual view of how observed infrastructure changes might support ongoing security investigation and team evaluation."
      concept
      variant="product"
      links={[linkTo('Search & Investigation', '/platform/search-investigation')]}
    >
      <section className="stage-concept-demo section-space">
        <div className="container">
          <p className="eyebrow">ILLUSTRATIVE EXPERIENCE</p>
          <h2>From one observation to the next question.</h2>
          <div className="stage-monitor-grid">
            <div className="stage-monitor-target">
              <span>01 / OBSERVE</span>
              <h3>Infrastructure</h3>
              <p>Choose the scope you need to investigate.</p>
            </div>
            <div className="stage-monitor-target">
              <span>02 / REVIEW</span>
              <h3>Signals</h3>
              <p>Understand the technical attributes worth revisiting.</p>
            </div>
            <div className="stage-monitor-target">
              <span>03 / INVESTIGATE</span>
              <h3>Context</h3>
              <p>Continue to a deeper host and service examination.</p>
            </div>
          </div>
          <Notice>
            This is a non-functional product concept for client discussion. Live alerts, continuous
            monitoring, history and available plan entitlements are not represented as existing
            capabilities.
          </Notice>
        </div>
      </section>
      <StorySections
        items={[
          {
            title: 'Define the question.',
            description:
              'Start with the relevant infrastructure scope and the observation you want to understand.',
          },
          {
            title: 'Interpret changes carefully.',
            description:
              'Changes in observed data need context. Network conditions and collection timing can affect what is seen.',
          },
          {
            title: 'Continue with Search & Investigation.',
            description:
              'Move from a signal to the underlying host, services and technical evidence.',
          },
        ]}
      />
    </PageFrame>
  );
}
export default function PlatformPages({ path }: { path: string }) {
  if (path === '/platform/search-investigation') return <InvestigationPage />;
  if (path === '/platform/data-methodology') return <MethodologyPage />;
  return <MonitoringPage />;
}
