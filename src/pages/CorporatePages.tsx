import { primaryContact, linkTo } from './pageLinks';
import { useState, type FormEvent } from 'react';
import { supportEmail } from '../content/site';
import { siteHref } from '../app/router';
import { PageFrame, Notice } from './PageUI';
import { EditorialSection, ReadingRows, RelatedReading } from './PageSections';
import { DoubleButton } from '../components/ui/DoubleButton';

function AboutPage() {
  return (
    <PageFrame
      eyebrow="Apcosys · ABOUT"
      artwork="about"
      variant="editorial"
      title="Built for people who investigate the internet."
      description="Apcosys makes technical observations about internet-facing infrastructure searchable, so security researchers and teams can investigate them."
      sections={[
        { label: 'Why Apcosys', id: 'why-apcosys' },
        { label: 'Our approach', id: 'our-approach' },
        { label: 'Explore the platform', id: 'about-explore' },
      ]}
      closing={{
        title: 'Talk to the people behind the product.',
        description:
          'Questions about the platform, data or collaboration? Reach the team at info@apcosys.net.',
      }}
      links={[primaryContact, linkTo('Responsible Scanning', '/responsible-scanning', true)]}
    >
      <EditorialSection
        id="why-apcosys"
        media={{
          file: 'investigation',
          alt: 'A glass lens brings one connected host into focus within an infrastructure landscape.',
        }}
        title="Why we built Apcosys."
        intro="The answer is rarely in the first result. A good investigation needs a clear path from a technical question to the evidence behind it."
      >
        <div className="about-statement">
          <p>
            Internet infrastructure produces a large volume of technical signals. The difficult part
            is turning an initial lead into a question you can investigate.
          </p>
          <p>
            Apcosys brings hosts, services and detected technologies into a searchable view, so
            researchers can open a result, understand its context and choose where to look next.
          </p>
        </div>
        <ol className="about-path">
          <li>
            <strong>Query</strong>
            <span>Start with an attribute.</span>
          </li>
          <li>
            <strong>Host</strong>
            <span>Inspect the services.</span>
          </li>
          <li>
            <strong>Context</strong>
            <span>Read the evidence.</span>
          </li>
          <li>
            <strong>Next question</strong>
            <span>Continue the investigation.</span>
          </li>
        </ol>
      </EditorialSection>
      <EditorialSection
        id="our-approach"
        title="Our approach."
        intro="Make the evidence easier to find, easier to understand and easier to use responsibly."
      >
        <ReadingRows
          items={[
            {
              title: 'Searchable observations.',
              text: 'We turn how public hosts respond — ports, services and technologies — into data you can query. Start with an attribute you know and narrow the question as you learn.',
            },
            {
              title: 'Built for investigation.',
              text: 'The product follows the path from query to host to context. Each step should help a researcher decide what deserves a closer look.',
            },
            {
              title: 'Transparent data.',
              text: 'A useful result explains what was observed and what remains uncertain. Collection context, observation dates and detection limits matter as much as the result itself.',
            },
            {
              title: 'Responsible collection.',
              text: 'Publicly observable information is not permission to test a system. We provide a direct contact route for scanning questions and network exclusion requests.',
            },
          ]}
        />
      </EditorialSection>
      <EditorialSection
        id="about-explore"
        title="See the approach in practice."
        intro="Explore the investigation workflow and the principles behind the data."
      >
        <RelatedReading
          items={[
            {
              title: 'From a question to a host.',
              text: 'Follow a query through results, services and technical context.',
              path: '/platform/search-investigation',
            },
            {
              title: 'What sits behind a result.',
              text: 'Read about observations, coverage, dates and potential CVE associations.',
              path: '/platform/data-methodology',
            },
          ]}
        />
      </EditorialSection>
    </PageFrame>
  );
}
function ScanningPage() {
  const inquiry =
    'mailto:' + supportEmail + '?subject=' + encodeURIComponent('Apcosys scanning inquiry');
  const exclusion =
    'mailto:' +
    supportEmail +
    '?subject=' +
    encodeURIComponent('Apcosys network exclusion request') +
    '&body=' +
    encodeURIComponent(
      'Networks / IP ranges:\n\nMy role in managing these networks:\n\nContact details:\n\nRelevant dates and context:\n',
    );
  return (
    <PageFrame
      eyebrow="Apcosys · RESPONSIBLE SCANNING"
      artwork="scanning"
      variant="technical"
      title="How Apcosys scans."
      description="The principles behind collecting observations from publicly accessible systems, and how to reach us about scanning activity or a network exclusion."
      sections={[
        { label: 'Collection', id: 'scanning-collection' },
        { label: 'Identify traffic', id: 'scanner-identity' },
        { label: 'Request exclusion', id: 'scanning-opt-out' },
      ]}
      heroLinks={[
        { label: 'Contact the scanning team', href: inquiry },
        { label: 'Request an exclusion', href: '#scanning-opt-out', secondary: true },
      ]}
      closing={{
        title: 'Questions about an observation?',
        description:
          'Share the relevant network and time context with the team. For help interpreting a result, start with Data & Methodology.',
      }}
      links={[
        { label: 'Email the scanning team', href: inquiry },
        linkTo('Data & Methodology', '/platform/data-methodology', true),
      ]}
    >
      <EditorialSection
        id="scanning-collection"
        media={{
          file: 'scope',
          alt: 'A glass boundary defines the infrastructure reached through a controlled entry point.',
        }}
        title="What we collect."
        intro="Apcosys records how publicly accessible services respond to connection requests. Those responses become searchable technical observations."
      >
        <div className="scanning-records">
          <article>
            <h3>Ports and services</h3>
            <p>Where a service responds and which supported protocol is observed.</p>
          </article>
          <article>
            <h3>Service responses</h3>
            <p>The technical response used as evidence for an observation.</p>
          </article>
          <article>
            <h3>Detected technologies</h3>
            <p>Products and versions inferred from the available response.</p>
          </article>
        </div>
        <p className="editorial-note">
          For detailed collection boundaries or questions about specific traffic, contact the
          scanning team.
        </p>
      </EditorialSection>
      <EditorialSection
        id="scanner-identity"
        title="Identifying our scanners."
        intro="If you believe traffic came from Apcosys, send the details needed to check its origin. A product name or service banner alone is not enough to verify a scanner."
      >
        <div className="scanning-request">
          <div>
            <h3>What to include</h3>
            <dl>
              <div>
                <dt>Source</dt>
                <dd>The source IP observed in your logs.</dd>
              </div>
              <div>
                <dt>Destination</dt>
                <dd>The affected address, port and protocol.</dd>
              </div>
              <div>
                <dt>Time</dt>
                <dd>The date, time and timezone of the traffic.</dd>
              </div>
              <div>
                <dt>Context</dt>
                <dd>A short description and a relevant, sanitised log excerpt.</dd>
              </div>
            </dl>
          </div>
          <aside>
            <h3>Ask us to verify it.</h3>
            <p>
              Write to the team with the source and destination details. We can review your question
              against the relevant scanning information.
            </p>
            <p>Do not send passwords, API keys or unrelated customer data.</p>
            <a className="stage-text-link" href={inquiry}>
              Email {supportEmail}
            </a>
          </aside>
        </div>
      </EditorialSection>
      <EditorialSection
        id="scanning-opt-out"
        title="Opting out."
        intro="If you own or administer a network, contact us with the IP ranges you want excluded. Give the team enough context to identify the request and reach you."
      >
        <ReadingRows
          numbered
          items={[
            {
              title: 'Identify the networks.',
              text: 'List the relevant IP addresses or ranges. If the request concerns a particular event, include its date and timezone.',
            },
            {
              title: 'Explain your role.',
              text: 'Describe your responsibility for these networks and include a working contact address for follow-up.',
            },
            {
              title: 'Send the request.',
              text: 'The email link below prepares a short request. The team will need to confirm the next steps; an email draft does not apply an exclusion automatically.',
            },
          ]}
        />
        <a className="stage-text-link" href={exclusion}>
          Prepare a network exclusion request
        </a>
      </EditorialSection>
    </PageFrame>
  );
}
const topics = [
  'Data & coverage',
  'API access',
  'Team & Business plan',
  'Billing & invoices',
  'Responsible scanning',
  'Other',
] as const;
function ContactForm({
  topic,
  onTopicChange,
}: {
  topic: string;
  onTopicChange: (topic: string) => void;
}) {
  const [status, setStatus] = useState('');
  const [opening, setOpening] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity() || opening) return;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const company = String(data.get('company') || '').trim();
    const topic = String(data.get('topic') || '').trim();
    const message = String(data.get('message') || '').trim();
    if (!name || !message) {
      setStatus('Enter your name and a message containing more than spaces.');
      form
        .querySelector<HTMLInputElement | HTMLTextAreaElement>(
          !name ? '[name="name"]' : '[name="message"]',
        )
        ?.focus();
      return;
    }
    const subject = encodeURIComponent('Apcosys: ' + topic);
    const body = encodeURIComponent(
      [
        'Name: ' + name,
        'Work email: ' + email,
        'Company: ' + (company || 'Not provided'),
        'Topic: ' + topic,
        '',
        message,
      ].join('\n'),
    );
    setOpening(true);
    setStatus(
      'Your email application will open with a prepared message. Please send the email there; this website has not submitted it.',
    );
    window.location.href = 'mailto:' + supportEmail + '?subject=' + subject + '&body=' + body;
    window.setTimeout(() => setOpening(false), 700);
  }
  return (
    <form id="contact-form" className="stage-contact-form" onSubmit={submit} noValidate={false}>
      <div className="stage-form-row">
        <label>
          Name <input name="name" required autoComplete="name" maxLength={100} />
        </label>
        <label>
          Work email{' '}
          <input name="email" required type="email" autoComplete="email" maxLength={200} />
        </label>
      </div>
      <div className="stage-form-row">
        <label>
          Company <input name="company" autoComplete="organization" maxLength={120} />
        </label>
        <label>
          Topic{' '}
          <select
            name="topic"
            required
            value={topic}
            onChange={(event) => onTopicChange(event.target.value)}
          >
            <option value="" disabled>
              Select a topic
            </option>
            {topics.map((topic) => (
              <option value={topic} key={topic}>
                {topic}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label>
        Message{' '}
        <textarea
          name="message"
          required
          rows={7}
          minLength={10}
          maxLength={6000}
          placeholder="Tell us what you would like to evaluate…"
        />
      </label>
      <label className="stage-consent">
        <input type="checkbox" name="consent" required />{' '}
        <span>
          I agree to the processing of my data in line with the{' '}
          <a href={siteHref('/legal/privacy-policy')}>Privacy Policy</a>.
        </span>
      </label>
      <DoubleButton type="submit" className="stage-contact-submit" disabled={opening}>
        {opening ? 'Opening email…' : 'Prepare email'}
      </DoubleButton>
      {status && (
        <p className="stage-form-status" role="status">
          {status}
        </p>
      )}
      <Notice>
        Messages are not stored or delivered by this website. This form prepares a draft in your
        email application; review and send it there.
      </Notice>
    </form>
  );
}
function ContactPage() {
  const [topic, setTopic] = useState(() => {
    const initial = new URLSearchParams(window.location.search).get('topic');
    return topics.some((item) => item === initial) ? initial! : '';
  });
  const chooseTopic = (value: string) => {
    setTopic(value);
    const form = document.getElementById('contact-form');
    form?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'instant'
        : 'smooth',
      block: 'start',
    });
    form?.querySelector<HTMLInputElement>('[name="name"]')?.focus({ preventScroll: true });
  };
  return (
    <PageFrame
      eyebrow="Apcosys · TALK TO US"
      artwork="contact"
      variant="editorial"
      title="Talk to the Apcosys team."
      description="Questions about data, API access, team plans or procurement? Choose a topic and tell us what you need."
      heroLinks={[
        { label: 'Start a conversation', href: '#contact-form' },
        { label: 'Email us', href: 'mailto:' + supportEmail, secondary: true },
      ]}
      sections={[
        { label: 'Choose a topic', id: 'contact-topics' },
        { label: 'Write your message', id: 'contact-form' },
      ]}
    >
      <EditorialSection
        id="contact-topics"
        title="What would you like to discuss?"
        intro="Choose a topic to prepare the form. A little context helps the team understand your question."
      >
        <div className="contact-topics">
          {[
            [
              'Data & coverage',
              'Data & coverage',
              'Tell us which data, observations or coverage you want to understand.',
            ],
            [
              'API access',
              'API & integration',
              'Describe the workflow, request types and volume you are planning.',
            ],
            [
              'Team & Business plan',
              'Teams & procurement',
              'Share your team size, research needs and any invoice requirements.',
            ],
          ].map(([value, title, text]) => (
            <button
              key={value}
              type="button"
              aria-pressed={topic === value}
              onClick={() => chooseTopic(value!)}
            >
              <h3>{title}</h3>
              <p>{text}</p>
              <span>{topic === value ? 'Selected' : 'Choose topic'}</span>
            </button>
          ))}
        </div>
        <p className="editorial-note">
          Billing, scanning or another question? Select the relevant topic in the form below.
        </p>
      </EditorialSection>
      <section className="stage-contact section-space">
        <div className="container stage-contact-layout">
          <div className="stage-contact-aside">
            <h2>Start a conversation.</h2>
            <p>
              Tell us what you are trying to do, what you have already explored and which question
              you need answered.
            </p>
            <div className="contact-direct">
              <h3>Prefer a direct email?</h3>
              <a href={'mailto:' + supportEmail}>{supportEmail}</a>
              <p>
                The form prepares a message in your email application. You review it and send it
                from there.
              </p>
            </div>
            <p className="editorial-note">
              Keep credentials, access tokens and sensitive third-party findings out of your
              message.
            </p>
          </div>
          <ContactForm topic={topic} onTopicChange={setTopic} />
        </div>
      </section>
    </PageFrame>
  );
}
export default function CorporatePages({ path }: { path: string }) {
  if (path === '/about') return <AboutPage />;
  if (path === '/responsible-scanning') return <ScanningPage />;
  return <ContactPage />;
}
