import '../styles/stage2-showcases.css';
import { primarySearch, primaryContact, linkTo } from './pageLinks';
import { metrics } from '../content/site';
import { SearchForm } from '../components/sections/SearchPreview';
import { InvestigationWorkbench } from '../components/stage2/InvestigationWorkbench';
import { MonitoringConcept } from '../components/stage2/MonitoringConcept';
import { DataInterpretation } from '../components/stage2/DataInterpretation';
import { PageFrame, StorySections } from './PageUI';

function InvestigationPage() {
  return (
    <PageFrame
      eyebrow="PLATFORM · SEARCH & INVESTIGATION"
      title="Every investigation starts with a question."
      description="Turn a technical question into a query, review the hosts that match and open each one to see the services, technologies and context behind it."
      variant="product"
      links={[primarySearch, linkTo('Data & Methodology', '/platform/data-methodology', true)]}
    >
      <section className="stage-platform-search section-space">
        <div className="container">
          <h2>Query with what you already know.</h2>
          <p>
            Search from a technical attribute. Your query opens the existing Apcosys search product.
          </p>
          <SearchForm />
          <p className="stage-helper">
            Start with a domain or IPv4 address. Advanced attribute filters depend on the supported
            live search syntax.
          </p>
        </div>
      </section>
      <InvestigationWorkbench story="search" />
      <section className="stage-page-crosslink" id="search-syntax">
        <div className="container">
          <h2>Explore the search syntax.</h2>
          <p>
            Begin with a domain or IP address, then review the filtering and attribute syntax
            available in the SaaS. This introduction intentionally does not claim an unverified
            filter grammar.
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
      links={[primarySearch, linkTo('Responsible Scanning', '/responsible-scanning', true)]}
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
      <DataInterpretation />
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
      links={[linkTo('Search & Investigation', '/platform/search-investigation'), primaryContact]}
    >
      <MonitoringConcept />
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
