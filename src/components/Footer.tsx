import { footerGroups, media, supportEmail } from '../content/site';
export function Footer() {
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
            <p>
              © APCOSYS {new Date().getFullYear()} ·{' '}
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
