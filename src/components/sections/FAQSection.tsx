import { productUrl, supportEmail } from '../../content/site';
import { Icon } from '../ui/Icon';
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
          <details open>
            <summary>
              <span>How does the Free plan work?</span>
              <span className="faq-icon">
                <Icon name="plus" />
                <Icon name="minus" />
              </span>
            </summary>
            <div className="faq-answer">
              <p>The existing Free plan introduces the service for personal, non-commercial use.</p>
            </div>
          </details>
          <details>
            <summary>
              <span>What consumes search credits?</span>
              <span className="faq-icon">
                <Icon name="plus" />
                <Icon name="minus" />
              </span>
            </summary>
            <div className="faq-answer">
              <p>
                For the current credit usage rules,{' '}
                <a href={`mailto:${supportEmail}?subject=APCOSYS%20search%20credits`}>
                  contact our team
                </a>
                .
              </p>
            </div>
          </details>
          <details>
            <summary>
              <span>Can I use the API?</span>
              <span className="faq-icon">
                <Icon name="plus" />
                <Icon name="minus" />
              </span>
            </summary>
            <div className="faq-answer">
              <p>
                API access is available on Plus, Expert and Business plans.{' '}
                <a href={`${productUrl}/docs/api`}>View API documentation</a>.
              </p>
            </div>
          </details>
          <details>
            <summary>
              <span>How can I contact the team?</span>
              <span className="faq-icon">
                <Icon name="plus" />
                <Icon name="minus" />
              </span>
            </summary>
            <div className="faq-answer">
              <p>
                Write to <a href={`mailto:${supportEmail}`}>{supportEmail}</a> about your data, API
                or procurement needs.
              </p>
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}
