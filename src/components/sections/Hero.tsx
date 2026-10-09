import { LocaleText } from '../../i18n/LocaleText';
import { useLocale } from '../../i18n/context';
import { DoubleButton } from '../ui/DoubleButton';
import { productUrl } from '../../content/site';
import { SearchForm } from './SearchPreview';
import { siteHref } from '../../app/router';
export function Hero() {
  const { t } = useLocale();
  return (
    <section className="hero stage2-hero" aria-labelledby="hero-title">
      <div className="container">
        <p className="eyebrow stage-hero-eyebrow">
          INTERNET INTELLIGENCE FOR SECURITY INVESTIGATION
        </p>
        <h1 id="hero-title">
          <span className="hero-title__line">
            <LocaleText>{t('Start with a query.')}</LocaleText>
          </span>{' '}
          <span className="hero-title__line">
            <LocaleText>{t('Follow what you find.')}</LocaleText>
          </span>
        </h1>
        <div className="hero-bottom stage-hero-bottom">
          <p className="lead">
            Search internet-facing infrastructure across hosts, domains, services and technologies.
            Examine the technical context behind each result and follow the evidence wherever your
            investigation leads.
          </p>
          <div className="hero-actions">
            <DoubleButton href={siteHref('/platform/search-investigation')} variant="secondary">
              Explore investigation
            </DoubleButton>
          </div>
        </div>
        <div className="stage-hero-search-wrap">
          <SearchForm className="stage-hero-search" />
          <div className="stage-hero-search-meta">
            <span>No account required to start searching.</span>
            <a href={productUrl + '/docs/about'}>Explore search syntax ↗</a>
          </div>
        </div>
      </div>
    </section>
  );
}
