import { productUrl, supportEmail } from '../../content/site';
import { AnimatedDetails } from '../ui/AnimatedDetails';
export function FAQSection() {
  return (
    <section className="faq-section section-space" id="faq" aria-labelledby="faq-title">
      <div className="container faq-grid">
        <h2 id="faq-title">
          Good questions.
          <br />
          Clear answers.
        </h2>
        <div className="faq-list">
          <AnimatedDetails title="How does the Free plan work?" initialOpen>
            <p>The existing Free plan introduces the service for personal, non-commercial use.</p>
          </AnimatedDetails>
          <AnimatedDetails title="What consumes search credits?">
            <p>
              For the current credit usage rules,{' '}
              <a href={`mailto:${supportEmail}?subject=APCOSYS%20search%20credits`}>
                contact our team
              </a>
              .
            </p>
          </AnimatedDetails>
          <AnimatedDetails title="Can I use the API?">
            <p>
              API access is available on Plus, Expert and Business plans.{' '}
              <a href={`${productUrl}/docs/api`}>View API documentation</a>.
            </p>
          </AnimatedDetails>
          <AnimatedDetails title="How can I contact the team?">
            <p>
              Write to <a href={`mailto:${supportEmail}`}>{supportEmail}</a> about your data, API or
              procurement needs.
            </p>
          </AnimatedDetails>
        </div>
      </div>
    </section>
  );
}
