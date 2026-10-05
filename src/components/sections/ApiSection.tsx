import { useLocale } from '../../i18n/context';
import { media, productUrl } from '../../content/site';
import { DoubleButton } from '../ui/DoubleButton';
import { Icon } from '../ui/Icon';
import { Visual } from '../visuals/Visual';
export function ApiSection() {
  const { t } = useLocale();
  return (
    <section className="api-section" id="api" aria-labelledby="api-title">
      <Visual kind="dots" direction="right-to-left" />
      <div className="container api-grid">
        <div className="api-copy">
          <h2 id="api-title">
            {t('Bring Apcosys')}
            <br className="api-break" /> {t('data into your')}
            <br className="api-break" /> {t('own tools.')}
          </h2>
          <Icon name="focus" width="25" height="25" />
          <p>
            {t(
              'Query APCOSYS programmatically and work with the results in your scripts, pipelines and reports. API access is available on Plus, Expert and Business plans.',
            )}
          </p>
          <DoubleButton variant="inverse" href={`${productUrl}/docs/api`}>
            {t('View API Docs')}
          </DoubleButton>
        </div>
        <div className="api-visual">
          <img
            src={media('api-layers.webp')}
            width="712"
            height="554"
            alt={t(
              'Illustrative APCOSYS API documentation with a request and response. See the current documentation for the live API.',
            )}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}
