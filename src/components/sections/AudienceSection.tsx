import { useLocale } from '../../i18n/context';
import { DoubleButton } from '../ui/DoubleButton';
import { Visual } from '../visuals/Visual';
export function AudienceSection() {
  const { t, locale } = useLocale();
  return (
    <section id="use-cases" className="audiences section-space" aria-labelledby="audiences-title">
      <div className="container">
        <h2 id="audiences-title">
          {t('For security researchers')}
          <br />
          {t('and teams.')}
        </h2>
        <div className="audience-grid">
          <article id="researchers" className="audience-card">
            <div className="audience-art">
              <Visual kind="rings" />
            </div>
            <div className="audience-copy">
              <h3>
                {locale === 'ru' ? (
                  'Для исследователей'
                ) : (
                  <>
                    For security
                    <br />
                    researchers
                  </>
                )}
              </h3>
              <p>
                {t(
                  'Find the infrastructure you are interested in, check what runs on it and keep investigating.',
                )}
              </p>
              <ul className="use-case-tags">
                <li>{t('Bug Bounty')}</li>
                <li>{t('Vulnerability Research')}</li>
                <li>{t('OSINT / Threat Investigation')}</li>
              </ul>
            </div>
            <div className="audience-actions">
              <DoubleButton href="#how-it-works">
                {t('Explore Search & Investigation')}
              </DoubleButton>
              <DoubleButton variant="secondary" href="#pricing">
                {t('View Plans')}
              </DoubleButton>
            </div>
          </article>
          <article id="teams" className="audience-card">
            <div className="audience-art">
              <Visual kind="rosette" />
            </div>
            <div className="audience-copy">
              <h3>
                {locale === 'ru' ? (
                  'Для команд безопасности'
                ) : (
                  <>
                    For security
                    <br />
                    teams
                  </>
                )}
              </h3>
              <p>
                {t(
                  'Investigate the internet-facing infrastructure your organisation runs, review its technical context and bring the results into your own tools through the API. The Business plan gives up to 5 users access on one subscription.',
                )}
              </p>
            </div>
            <div className="audience-actions">
              <DoubleButton href="#api">{t('Explore For Teams')}</DoubleButton>
              <DoubleButton variant="secondary" href="#plan-business">
                {t('View Business Plan')}
              </DoubleButton>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
