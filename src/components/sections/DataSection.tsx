import { useLocale } from '../../i18n/context';
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
            {t('The data behind')}
            <br />
            {t('every search.')}
          </h2>
          <p>
            {t(
              'APCOSYS scans the public internet and records how internet-facing hosts respond: open ports, services and detected products.',
            )}
          </p>
        </div>
        <div className="data-visual-field">
          <Visual kind="globe" />
          <dl className="data-metrics">
            {metrics.map((metric) => (
              <div className={`metric-card metric-card--${metric.id}`} key={metric.id}>
                <dt>
                  <span>{t(metric.label)}</span>
                </dt>
                <dd>{metric.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="data-actions">
          <DoubleButton href={`${productUrl}/legal/data-collection-policy`} variant="dark">
            {t('Read methodology')}
          </DoubleButton>
          <DoubleButton href={`${productUrl}/docs/about`} variant="inverse">
            {t('How we scan')}
          </DoubleButton>
        </div>
      </div>
    </section>
  );
}
