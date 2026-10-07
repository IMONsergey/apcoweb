import { LocaleText } from '../i18n/LocaleText';
import { useLocale } from '../i18n/context';
import { footerGroups, supportEmail } from '../content/site';
import { Logo } from './ui/Logo';
export function Footer() {
  const { t } = useLocale();
  return (
    <footer className="footer">
      <div className="container">
        <nav className="footer-columns" aria-label={t('Footer')}>
          {footerGroups.map((group) => (
            <div key={group.title}>
              <p className="eyebrow">
                <LocaleText>{t(group.title)}</LocaleText>
              </p>
              <ul>
                {group.links.map(([label, href]) => (
                  <li key={label}>
                    <a href={href}>
                      <LocaleText>{t(label)}</LocaleText>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <div className="footer-bottom">
          <a className="footer-brand" href="#top" aria-label={t('APCOSYS home')}>
            <Logo className="footer-logo" />
          </a>
          <div className="footer-meta">
            <p>
              ©{'\u00a0'}APCOSYS{'\u00a0'}
              {new Date().getFullYear()} ·{' '}
              <a className="footer-email" href={`mailto:${supportEmail}`}>
                <strong>{supportEmail}</strong>
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
