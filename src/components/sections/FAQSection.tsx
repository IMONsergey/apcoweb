import { useLocale } from '../../i18n/context';
import { productUrl, supportEmail } from '../../content/site';
import { AnimatedDetails } from '../ui/AnimatedDetails';
export function FAQSection() {
  const { t } = useLocale();
  return (
    <section className="faq-section section-space" id="faq" aria-labelledby="faq-title">
      <div className="container faq-grid">
        <h2 id="faq-title">
          {t('Good questions.')}
          <br />
          {t('Clear answers.')}
        </h2>
        <div className="faq-list">
          <AnimatedDetails title={t('How does the Free plan work?')} initialOpen>
            <p>
              {t('The existing Free plan introduces the service for personal, non-commercial use.')}
            </p>
          </AnimatedDetails>
          <AnimatedDetails title={t('What consumes search credits?')}>
            <p>
              {t('For the current credit usage rules,')}{' '}
              <a href={`mailto:${supportEmail}?subject=APCOSYS%20search%20credits`}>
                {t('contact our team')}
              </a>
              .
            </p>
          </AnimatedDetails>
          <AnimatedDetails title={t('Can I use the API?')}>
            <p>
              {t('API access is available on Plus, Expert and Business plans.')}{' '}
              <a href={`${productUrl}/docs/api`}>{t('View API documentation')}</a>.
            </p>
          </AnimatedDetails>
          <AnimatedDetails title={t('How can I contact the team?')}>
            <p>
              {t('Write to')} <a href={`mailto:${supportEmail}`}>{supportEmail}</a>{' '}
              {t('about your data, API or procurement needs.')}
            </p>
          </AnimatedDetails>
        </div>
      </div>
    </section>
  );
}
