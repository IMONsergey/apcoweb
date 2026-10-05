import { LocaleText } from '../../i18n/LocaleText';
import { useLocale } from '../../i18n/context';
import { DoubleButton } from '../ui/DoubleButton';
import { Visual } from '../visuals/Visual';
export function AudienceSection() {
  const { t } = useLocale();
  return (
    <section id="use-cases" className="audiences section-space" aria-labelledby="audiences-title">
      <div className="container">
        <h2 id="audiences-title">
          <LocaleText>{t('For security researchers')}</LocaleText>
          <br />
          <LocaleText>{t('and teams.')}</LocaleText>
        </h2>
        <div className="audience-grid">
          <article id="researchers" className="audience-card">
            <div className="audience-art">
              <Visual kind="rings" />
            </div>
            <div className="audience-copy">
              <h3>
                <LocaleText className="locale-text--lines">
                  {t('For security\nresearchers')}
                </LocaleText>
              </h3>
              <p>
                <LocaleText>
                  {t(
                    'Find the infrastructure you are interested in, check what runs on it and keep investigating.',
                  )}
                </LocaleText>
              </p>
              <ul className="use-case-tags">
                <li>
                  <LocaleText>{t('Bug Bounty')}</LocaleText>
                </li>
                <li>
                  <LocaleText>{t('Vulnerability Research')}</LocaleText>
                </li>
                <li>
                  <LocaleText>{t('OSINT / Threat Investigation')}</LocaleText>
                </li>
              </ul>
            </div>
            <div className="audience-actions">
              <DoubleButton href="#how-it-works">
                <LocaleText>{t('Explore Search & Investigation')}</LocaleText>
              </DoubleButton>
              <DoubleButton variant="secondary" href="#pricing">
                <LocaleText>{t('View Plans')}</LocaleText>
              </DoubleButton>
            </div>
          </article>
          <article id="teams" className="audience-card">
            <div className="audience-art">
              <Visual kind="rosette" />
            </div>
            <div className="audience-copy">
              <h3>
                <LocaleText className="locale-text--lines">{t('For security\nteams')}</LocaleText>
              </h3>
              <p>
                <LocaleText>
                  {t(
                    'Investigate the internet-facing infrastructure your organisation runs, review its technical context and bring the results into your own tools through the API. The Business plan gives up to 5 users access on one subscription.',
                  )}
                </LocaleText>
              </p>
            </div>
            <div className="audience-actions">
              <DoubleButton href="#api">
                <LocaleText>{t('Explore For Teams')}</LocaleText>
              </DoubleButton>
              <DoubleButton variant="secondary" href="#plan-business">
                <LocaleText>{t('View Business Plan')}</LocaleText>
              </DoubleButton>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
