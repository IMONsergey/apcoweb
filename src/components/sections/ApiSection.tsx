import { LocaleText } from '../../i18n/LocaleText';
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
            <LocaleText>{t('Bring Apcosys')}</LocaleText>
            <br className="api-break" /> <LocaleText>{t('data into your')}</LocaleText>
            <br className="api-break" /> <LocaleText>{t('own tools.')}</LocaleText>
          </h2>
          <Icon name="focus" width="25" height="25" />
          <p>
            <LocaleText>
              {t(
                'Query APCOSYS programmatically and work with the results in your scripts, pipelines and reports. API access is available on Plus, Expert and Business plans.',
              )}
            </LocaleText>
          </p>
          <DoubleButton variant="inverse" href={`${productUrl}/docs/api`}>
            <LocaleText>{t('View API Docs')}</LocaleText>
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
