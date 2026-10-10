import { LocaleText } from '../i18n/LocaleText';
import { useLocale } from '../i18n/context';
import { footerGroups, supportEmail } from '../content/site';
import { Logo } from './ui/Logo';
import { siteHref } from '../app/router';
import { CookiePreferences } from './ui/CookiePreferences';
export function Footer() {
  const { t } = useLocale();
  return (
    <footer className="footer">
      <div className="container">
        <nav className="footer-columns" aria-label={t('Footer')}>
          {footerGroups.map((group) => (
            <div key={group.title}>
              <p className={group.title === 'Apcosys' ? 'eyebrow footer-company-title' : 'eyebrow'}>
                <LocaleText>{t(group.title)}</LocaleText>
              </p>
              <ul>
                {group.links.map(([label, href]) => (
                  <li key={label}>
                    <a href={href.startsWith('/') ? siteHref(href) : href}>
                      <LocaleText>{t(label)}</LocaleText>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <div className="footer-bottom">
          <a className="footer-brand" href={siteHref('/')} aria-label={t('Apcosys home')}>
            <Logo className="footer-logo" />
          </a>
          <div className="footer-meta">
            <p>
              ©{'\u00a0'}Apcosys{'\u00a0'}
              {new Date().getFullYear()}
            </p>
            <a className="footer-email" href={`mailto:${supportEmail}`}>
              <strong>{supportEmail}</strong>
            </a>
            <CookiePreferences />
          </div>
        </div>
      </div>
    </footer>
  );
}
