import '../styles/stage2-showcases.css';
import { primarySearch, primaryContact, linkTo } from './pageLinks';
import { metrics } from '../content/site';
import { EvidenceFlow } from '../components/stage2/EvidenceFlow';
import { InvestigationWorkbench } from '../components/stage2/InvestigationWorkbench';
import { MonitoringConcept } from '../components/stage2/MonitoringConcept';
import { PageFrame } from './PageUI';
import { EditorialSection, ReadingRows, FeatureColumns, RelatedReading } from './PageSections';

function InvestigationPage() {
  return (
    <PageFrame
      eyebrow="PLATFORM · SEARCH & INVESTIGATION"
      artwork="search"
      variant="product"
      title="Every investigation starts with a question."
      description="Turn a technical question into a query, review the hosts that match and open each one to see the services, technologies and context behind it."
      sections={[
        { label: 'The investigation', id: 'investigation' },
        { label: 'Starting a query', id: 'search-syntax' },
        { label: 'Reading the evidence', id: 'research-context' },
      ]}
      closing={{
        title: 'Keep the thread.',
        description:
          'Use a service, a technology or a domain from one result to ask a more precise question. Start with the public search and follow what you find.',
      }}
      links={[primarySearch, linkTo('Data & Methodology', '/platform/data-methodology', true)]}
    >
      <InvestigationWorkbench story="search" />
      <EditorialSection
        id="search-syntax"
        title="Query with what you already know."
        intro="You do not need a complete picture to begin. Choose the attribute you have, then use the current search filters to narrow the question."
      >
        <div className="query-guide">
          {[
            [
              'IP address',
              '198.51.100.24',
              'Investigate one host.',
              'Useful when a log, alert or report already identifies a system. Review its observed services before widening the search.',
            ],
            [
              'Domain',
              'example.com',
              'Find the infrastructure behind a name.',
              'Use an authorised domain as a starting point, then inspect the hosts and services returned by the search.',
            ],
            [
              'Technology',
              'nginx 1.24.0',
              'Research a product or version.',
              'Look for matching detections, compare the services involved and inspect the evidence behind a version match.',
            ],
          ].map(([label, value, title, text]) => (
            <article key={label}>
              <span>{label}</span>
              <code>{value}</code>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <p className="editorial-note">
          Illustrative inputs, not query syntax. Use the syntax and filters provided in Apcosys
          search.
        </p>
      </EditorialSection>
      <EditorialSection
        id="research-context"
        title="Context, not conclusions."
        intro="A result helps you decide where to look next. The evidence behind it determines what you can reasonably conclude."
      >
        <ReadingRows
          items={[
            {
              title: 'Judge relevance before you click.',
              text: 'Compare open ports, services and detected technologies across the results. Narrow the list to systems that help answer your question.',
              detail:
                'Look for: the service you expected, an unexpected exposed port, or a product worth investigating.',
            },
            {
              title: 'One host, the technical picture.',
              text: 'Open a host to read its observed services together. A port identifies where a response was collected; the response provides context for a product or version detection.',
              detail: 'Keep the host, port and supporting response together when recording a lead.',
            },
            {
              title: 'Validate a potential association.',
              text: 'A CVE associated with a detected version points to possible exposure. Backported patches, configuration and the age of an observation can change whether it applies.',
              detail: 'An association is a lead to verify, not a confirmed vulnerability.',
            },
          ]}
        />
      </EditorialSection>
    </PageFrame>
  );
}

const coverageDefinitions = [
  ['IPv4', 'Observed IPv4 address entries'],
  ['IPv6', 'Observed IPv6 address entries'],
  ['Domains', 'Domain observations connected to infrastructure'],
  ['Detected Products', 'Product detections derived from service responses'],
  ['CVE Associations', 'Potential links between detected products and CVEs'],
  ['Protocols', 'Protocols represented in the dataset'],
] as const;

function MethodologyPage() {
  return (
    <PageFrame
      eyebrow="PLATFORM · DATA & METHODOLOGY"
      artwork="methodology"
      variant="technical"
      title="Know what’s behind every result."
      description="How Apcosys collects internet infrastructure data, what each data type means, and how to read the context attached to an observation."
      sections={[
        { label: 'What we observe', id: 'observations' },
        { label: 'Coverage', id: 'coverage' },
        { label: 'Collection & dates', id: 'collection' },
        { label: 'Limits', id: 'data-limits' },
      ]}
      closing={{
        title: 'Read the result. Understand the source.',
        description:
          'Explore a host with its service evidence, or learn how to contact the team about scanning activity.',
      }}
      links={[primarySearch, linkTo('Responsible Scanning', '/responsible-scanning', true)]}
    >
      <EditorialSection
        id="observations"
        media={{
          file: 'evidence',
          alt: 'A single teal connection links three transparent layers of observations.',
        }}
        title="What Apcosys records."
        intro="Apcosys turns responses from publicly accessible infrastructure into searchable observations. Three different kinds of information appear together in a result."
      >
        <EvidenceFlow />
        <div className="evidence-levels">
          {[
            [
              '01',
              'Observation',
              '443 / HTTPS',
              'A service responded on a port. Its response is the starting point for the record.',
            ],
            [
              '02',
              'Detection',
              'nginx / 1.24.0',
              'A product or version is inferred from the available service response.',
            ],
            [
              '03',
              'Association',
              'Potential CVE',
              'A detected product or version may connect to a published vulnerability advisory.',
            ],
          ].map(([n, title, value, text]) => (
            <article key={n}>
              <span>{n}</span>
              <h3>{title}</h3>
              <code>{value}</code>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <div className="evidence-reading">
          <p>
            <strong>Read from the observation outward.</strong> A response supports a detection; a
            detection can suggest an association. Each step needs its own interpretation.
          </p>
          <p>
            Domain observations connect names to infrastructure. A shared domain, service or
            technology does not by itself establish ownership.
          </p>
        </div>
      </EditorialSection>
      <EditorialSection
        id="coverage"
        title="Coverage, defined."
        intro="These figures describe different parts of the dataset. Product detections and CVE associations are records, not counts of distinct vulnerable systems."
      >
        <div className="coverage-register" role="region" aria-label="Coverage metrics">
          {metrics.map((metric, i) => (
            <article key={metric.id}>
              <div>
                <h3>{metric.label}</h3>
                <p>{coverageDefinitions[i]?.[1]}</p>
              </div>
              <strong>{metric.value}</strong>
            </article>
          ))}
        </div>
        <p className="editorial-note">
          Client-preview figures. Measurement date and final counting definitions have not been
          supplied; these are not live totals.
        </p>
      </EditorialSection>
      <EditorialSection
        id="collection"
        title="An observation has a time."
        intro="Internet-facing systems change. Read a service response alongside its collection context before using it in a decision."
      >
        <div className="collection-layout">
          <article>
            <h3>How collection works.</h3>
            <p>
              Apcosys discovers publicly accessible infrastructure and records responses across
              supported ports and protocols. Those responses provide the evidence for service and
              technology records.
            </p>
            <a className="stage-text-link" href={linkTo('', '/responsible-scanning').href}>
              Read the scanning principles
            </a>
          </article>
          <div className="date-reading">
            <h3>Reading dates and timestamps.</h3>
            <p>
              A recent record describes what responded at that moment. It does not guarantee that
              the service remains available or unchanged.
            </p>
            <dl>
              <div>
                <dt>Before comparing records</dt>
                <dd>Check whether their observation times are comparable.</dd>
              </div>
              <div>
                <dt>Before acting on a result</dt>
                <dd>Validate the current state with an authorised method.</dd>
              </div>
            </dl>
            <p className="editorial-note">
              The exact meanings of Created and Updated, and the scan cadence, still require
              confirmation.
            </p>
          </div>
        </div>
      </EditorialSection>
      <EditorialSection
        id="data-limits"
        title="Know what the data cannot prove."
        intro="Searchable observations reduce uncertainty. They do not remove the need for technical judgement."
      >
        <FeatureColumns
          items={[
            {
              title: 'A match is not a finding.',
              text: 'CVE associations need checks against vendor advisories, patch backports and the actual configuration.',
            },
            {
              title: 'Missing is not absent.',
              text: 'Filtered hosts, unsupported ports and short-lived services may not appear in the dataset.',
            },
            {
              title: 'Similar is not related.',
              text: 'Shared technologies and service attributes are useful research leads, not proof of common ownership.',
            },
          ]}
        />
      </EditorialSection>
    </PageFrame>
  );
}

function MonitoringPage() {
  return (
    <PageFrame
      eyebrow="PLATFORM · MONITORING"
      artwork="monitoring"
      variant="product"
      concept
      title="Understand what changes across your exposure."
      description="Compare infrastructure observations, review what changed and carry the relevant evidence into an investigation. Explore the proposed workflow below."
      sections={[
        { label: 'Explore the concept', id: 'monitoring-workflow' },
        { label: 'What a change means', id: 'change-signals' },
        { label: 'Next steps', id: 'monitoring-next' },
      ]}
      closing={{
        title: 'What would your team need to track?',
        description:
          'Tell us which assets, changes and investigation workflows matter to your team. Help shape the monitoring experience.',
      }}
      heroLinks={[
        { label: 'Explore the workflow', href: '#monitoring-workflow' },
        { ...primaryContact, secondary: true },
      ]}
      links={[
        primaryContact,
        linkTo('Explore Search & Investigation', '/platform/search-investigation', true),
      ]}
    >
      <MonitoringConcept />
      <EditorialSection
        id="change-signals"
        title="A change opens a question."
        intro="The useful part of a comparison is the next decision. Different changes need different checks before they become a research task."
      >
        <div className="change-ledger">
          {[
            [
              'New service',
              '443 → 443 + 22',
              'Expected access or new exposure?',
              'Check whether the added service belongs to a planned deployment. Review its response and confirm the host remains in your scope.',
            ],
            [
              'Different technology',
              'Version A → Version B',
              'Upgrade, reconfiguration or a different response?',
              'Compare the supporting service evidence. A different banner may reflect a configuration change rather than a software upgrade.',
            ],
            [
              'No later response',
              'Observed → Not observed',
              'Removed, filtered or temporarily unavailable?',
              'Check the observation time and collection context. An absent response alone does not prove that a service has been retired.',
            ],
          ].map(([title, change, question, text]) => (
            <article key={title}>
              <h3>{title}</h3>
              <code>{change}</code>
              <h4>{question}</h4>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <p className="editorial-note">
          Concept examples only. This page does not connect to live scans or deliver alerts.
        </p>
      </EditorialSection>
      <EditorialSection
        id="monitoring-next"
        title="Keep the evidence with the task."
        intro="A useful handoff explains what changed, what was checked and what still needs an answer."
      >
        <ReadingRows
          numbered
          items={[
            {
              title: 'Define the scope.',
              text: 'Begin with infrastructure your team owns or is authorised to assess. Keep the scope and the research question explicit.',
            },
            {
              title: 'Review the comparison.',
              text: 'Keep the earlier and later records together with their time context. Inspect the service response behind the change.',
            },
            {
              title: 'Choose the next action.',
              text: 'Open the host for closer investigation, validate the observation or pass a concise question to another analyst.',
            },
          ]}
        />
        <RelatedReading
          items={[
            {
              title: 'Search & Investigation',
              text: 'Follow a changed host into its services and technical context.',
              path: '/platform/search-investigation',
            },
            {
              title: 'Data & Methodology',
              text: 'Understand observations, dates and the limits of a comparison.',
              path: '/platform/data-methodology',
            },
          ]}
        />
      </EditorialSection>
    </PageFrame>
  );
}

export default function PlatformPages({ path }: { path: string }) {
  if (path === '/platform/search-investigation') return <InvestigationPage />;
  if (path === '/platform/data-methodology') return <MethodologyPage />;
  return <MonitoringPage />;
}
