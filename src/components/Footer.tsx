import { footerGroups, media, supportEmail } from '../content/site';
import { Icon } from './ui/Icon';
import { useMotion } from '../hooks/useMotion';
export function Footer() {
  const { paused, reduced, toggle } = useMotion();
  return (
    <footer className="footer">
      <div className="container">
        <nav className="footer-columns" aria-label="Footer">
          {footerGroups.map((group) => (
            <div key={group.title}>
              <p className="eyebrow">{group.title}</p>
              <ul>
                {group.links.map(([label, href]) => (
                  <li key={label}>
                    <a href={href}>{label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <div className="footer-bottom">
          <a className="footer-brand" href="#top" aria-label="APCOSYS home">
            <img src={media('logo.svg')} width="360" height="70" alt="APCOSYS" loading="lazy" />
          </a>
          <div className="footer-meta">
            {!reduced && (
              <button
                className="motion-toggle"
                type="button"
                aria-pressed={paused}
                onClick={toggle}
              >
                <Icon name={paused ? 'play' : 'pause'} />
                {paused ? 'Resume motion' : 'Pause motion'}
              </button>
            )}
            <p>
              © APCOSYS {new Date().getFullYear()} ·{' '}
              <a href={`mailto:${supportEmail}`}>{supportEmail}</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
