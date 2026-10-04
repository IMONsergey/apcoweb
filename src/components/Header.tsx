import { useEffect, useRef, useState } from 'react';
import { media, navigation, productUrl } from '../content/site';
import { DoubleButton } from './ui/DoubleButton';
import { Icon } from './ui/Icon';
import { Modal } from './ui/Modal';
import { LanguageBadge } from './ui/LanguageBadge';
export function Header() {
  const [active, setActive] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!active) return;
    const onPointer = (event: PointerEvent) => {
      if (!ref.current?.contains(event.target as Node)) setActive(null);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        const trigger = ref.current?.querySelector<HTMLElement>('[aria-expanded="true"]');
        setActive(null);
        trigger?.focus();
      }
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [active]);
  return (
    <>
      <header className="site-header" ref={ref}>
        <div className="container header-row">
          <a className="brand" href="#top" aria-label="APCOSYS home">
            <img src={media('logo.svg')} width="134" height="26" alt="APCOSYS" />
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            {navigation.map((group, i) => (
              <div
                className="nav-group"
                key={group.label}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) setActive(null);
                }}
              >
                <button
                  type="button"
                  className="nav-trigger"
                  aria-expanded={active === group.label}
                  aria-controls={`nav-panel-${i}`}
                  onClick={() => setActive(active === group.label ? null : group.label)}
                  onKeyDown={(event) => {
                    if (event.key === 'ArrowDown') {
                      event.preventDefault();
                      setActive(group.label);
                      requestAnimationFrame(() =>
                        document.querySelector<HTMLAnchorElement>(`#nav-panel-${i} a`)?.focus(),
                      );
                    }
                  }}
                >
                  {group.label}
                  <Icon name="chevron" />
                </button>
                <div
                  id={`nav-panel-${i}`}
                  className="nav-panel"
                  data-open={active === group.label}
                  aria-hidden={active !== group.label}
                  inert={active !== group.label}
                >
                  {group.items.map((item, index) => (
                    <a
                      className={index === 0 ? 'nav-panel__default' : undefined}
                      key={item.label}
                      href={item.href}
                      onClick={() => setActive(null)}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
            <a className="nav-link" href="#pricing">
              Pricing
            </a>
          </nav>
          <div className="header-actions">
            <LanguageBadge />
            <a href={`${productUrl}/search`} className="plain-button header-signin">
              Sign In
            </a>
            <DoubleButton href={`${productUrl}/register`} compact className="header-signup">
              Create free account
            </DoubleButton>
            <button
              className="icon-button menu-toggle"
              type="button"
              aria-label="Open navigation"
              aria-expanded={mobileOpen}
              onClick={(event) => {
                event.currentTarget.focus();
                setMobileOpen(true);
              }}
            >
              <Icon name="menu" />
            </button>
          </div>
        </div>
      </header>
      <Modal
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        title="Navigation"
        className="mobile-navigation"
      >
        <nav aria-label="Mobile navigation">
          {navigation.map((group) => (
            <div className="mobile-nav-group" key={group.label}>
              <p className="eyebrow">{group.label}</p>
              {group.items.map((item) => (
                <a key={item.label} href={item.href} onClick={() => setMobileOpen(false)}>
                  {item.label}
                  <Icon name="arrow" />
                </a>
              ))}
            </div>
          ))}
          <a className="mobile-pricing" href="#pricing" onClick={() => setMobileOpen(false)}>
            Pricing
            <Icon name="arrow" />
          </a>
          <DoubleButton href={`${productUrl}/register`}>Create free account</DoubleButton>
          <a className="plain-button" href={`${productUrl}/search`}>
            Sign In
          </a>
        </nav>
      </Modal>
    </>
  );
}
