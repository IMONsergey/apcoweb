import { LocaleText } from '../../i18n/LocaleText';
import { useLocale } from '../../i18n/context';
import { noBreakNumber } from '../../i18n/typography';
import { metrics, productUrl } from '../../content/site';
import { DoubleButton } from '../ui/DoubleButton';
import { Visual } from '../visuals/Visual';

/** One set of metrics; CSS changes the mobile reading path without duplicating data. */
export function DataSection() {
  const { t } = useLocale();
  return (
    <section className="data-section" id="data" aria-labelledby="data-title">
      <div className="container data-stage">
        <div className="data-copy">
          <h2 id="data-title">
            <LocaleText>{t('The data behind')}</LocaleText>
            <br />
            <LocaleText>{t('every search.')}</LocaleText>
          </h2>
          <p>
            <LocaleText>
              {t(
                'APCOSYS scans the public internet and records how internet-facing hosts respond: open ports, services and detected products.',
              )}
            </LocaleText>
          </p>
        </div>
        <div className="data-visual-field">
          <Visual kind="globe" />
          <dl className="data-metrics">
            {metrics.map((metric) => (
              <div className={`metric-card metric-card--${metric.id}`} key={metric.id}>
                <dt>
                  <span>
                    <LocaleText>{t(metric.label)}</LocaleText>
                  </span>
                </dt>
                <dd>{noBreakNumber(metric.value)}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="data-actions">
          <DoubleButton href={`${productUrl}/legal/data-collection-policy`} variant="dark">
            <LocaleText>{t('Read methodology')}</LocaleText>
          </DoubleButton>
          <DoubleButton href={`${productUrl}/docs/about`} variant="inverse">
            <LocaleText>{t('How we scan')}</LocaleText>
          </DoubleButton>
        </div>
      </div>
    </section>
  );
}
