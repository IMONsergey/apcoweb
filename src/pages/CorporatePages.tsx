import { primaryContact, linkTo } from './pageLinks';
import { useState, type FormEvent } from 'react';
import { productUrl, supportEmail } from '../content/site';
import { PageFrame, StorySections, Notice } from './PageUI';
import { DoubleButton } from '../components/ui/DoubleButton';

function AboutPage() {
  return (
    <PageFrame
      eyebrow="APCOSYS · ABOUT"
      variant="editorial"
      title="Built for people who investigate the internet."
      description="Apcosys makes technical observations about internet-facing infrastructure searchable, so researchers and security teams can investigate them."
      links={[primaryContact, linkTo('Responsible Scanning', '/responsible-scanning', true)]}
    >
      <section className="stage-about-belief section-space">
        <div className="container">
          <p className="eyebrow">WHY APCOSYS</p>
          <h2>The answer is rarely in the first result.</h2>
          <p className="stage-intro">
            Investigating internet infrastructure means working through technical observations.
            Apcosys is built to shorten the path from a question to the hosts, services and context
            behind it — and make the next step clear.
          </p>
        </div>
      </section>
      <StorySections
        items={[
          {
            title: 'Searchable observations.',
            description:
              'Apcosys organises data derived from public host responses, such as ports, services and detected technologies.',
          },
          {
            title: 'Built for investigation.',
            description:
              'The product supports a path from an initial query to a host and its technical context.',
          },
          {
            title: 'Transparent data.',
            description:
              'Understanding observations, collection and uncertainty matters when making technical decisions.',
          },
          {
            title: 'Responsible collection.',
            description:
              'Questions and concerns about scanning should have an accessible contact route.',
          },
        ]}
        variant="grid"
      />
      <section className="stage-company section-space">
        <div className="container">
          <p className="eyebrow">THE COMPANY</p>
          <h2>Contact Apcosys.</h2>
          <p>
            For enquiries about the platform, data or collaboration, contact the team at{' '}
            <a href={'mailto:' + supportEmail}>{supportEmail}</a>.
          </p>
        </div>
      </section>
    </PageFrame>
  );
}
function ScanningPage() {
  return (
    <PageFrame
      eyebrow="APCOSYS · RESPONSIBLE SCANNING"
      variant="technical"
      title="How Apcosys scans."
      description="The principles behind collecting observations from publicly accessible infrastructure — and where to direct questions or concerns."
      links={[primaryContact, linkTo('Data & Methodology', '/platform/data-methodology', true)]}
    >
      <StorySections
        items={[
          {
            title: 'What we collect.',
            description:
              'The product describes observations of internet-facing service responses, such as ports and detected technologies. Detailed collection boundaries require technical verification.',
          },
          {
            title: 'Identifying our scanners.',
            description:
              'Questions about the origin or identity of Apcosys scanning traffic can be sent to the team. Scanner IP ranges and reverse-DNS identifiers are not yet published in this preview.',
          },
          {
            title: 'Opting out.',
            description:
              'If you own or administer infrastructure and have a scanning concern or an exclusion request, contact the team with the relevant networks and your contact details. No response-time promise is made here.',
          },
          {
            title: 'Questions or concerns.',
            description:
              'Contact info@apcosys.net about publicly observed data, scanning activity or network management questions.',
          },
        ]}
      />
      <section className="stage-page-crosslink">
        <div className="container">
          <h2>Questions about an observation?</h2>
          <p>
            Reach the team directly. Do not send account passwords, API keys or other sensitive
            credentials in a message.
          </p>
          <a
            className="stage-text-link"
            href={'mailto:' + supportEmail + '?subject=Apcosys%20scanning%20inquiry'}
          >
            Email the scanning team ↗
          </a>
        </div>
      </section>
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
function ContactForm() {
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
    const subject = encodeURIComponent('APCOSYS: ' + topic);
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
    <form className="stage-contact-form" onSubmit={submit} noValidate={false}>
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
          <select name="topic" required defaultValue="">
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
          <a href={productUrl + '/legal/privacy-policy'} target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a>
          .
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
        Preview mode: the site does not have a contact-form backend. Messages are not stored or
        delivered by this website. Your email application must send the message.
      </Notice>
    </form>
  );
}
function ContactPage() {
  return (
    <PageFrame
      eyebrow="APCOSYS · TALK TO US"
      variant="editorial"
      title="Talk to the Apcosys team."
      description="Questions about data, API access, security teams or procurement? Tell us what you need."
      links={[linkTo('Explore For Teams', '/teams', true)]}
    >
      <section className="stage-contact section-space">
        <div className="container stage-contact-layout">
          <div className="stage-contact-aside">
            <p className="eyebrow">GET IN TOUCH</p>
            <h2>Start a conversation.</h2>
            <p>
              Prefer email? Write to <a href={'mailto:' + supportEmail}>{supportEmail}</a>.
            </p>
            <p>
              Do not include credentials, access tokens or sensitive third-party findings in the
              form.
            </p>
          </div>
          <ContactForm />
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
