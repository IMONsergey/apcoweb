import { useLocale } from '../../i18n/context';
import { DoubleButton } from '../ui/DoubleButton';
import { productUrl } from '../../content/site';
export function Hero() {
  const { t } = useLocale();
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container">
        <h1 id="hero-title">
          <span className="hero-title__line">{t('Start with a query.')}</span>{' '}
          <span className="hero-title__line">{t('Follow what you find.')}</span>
        </h1>
        <div className="hero-bottom">
          <p className="lead">
            {t(
              'Search internet-facing hosts by IP, domain, port, service or technology, see what runs on them and',
            )}{' '}
            <mark>{t('refine your search as you go.')}</mark>
          </p>
          <div className="hero-actions">
            <DoubleButton href={`${productUrl}/search`}>{t('Try free search')}</DoubleButton>
            <DoubleButton href="#how-it-works" variant="secondary" icon="down">
              {t('See how it works')}
            </DoubleButton>
          </div>
        </div>
      </div>
    </section>
  );
}
