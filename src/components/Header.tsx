import { LocaleText } from '../i18n/LocaleText';
import { useLocale } from '../i18n/context';
import { useEffect, useRef, useState } from 'react';
import { media, navigation, productUrl } from '../content/site';
import { DoubleButton } from './ui/DoubleButton';
import { Icon } from './ui/Icon';
import { Modal } from './ui/Modal';
import { LanguageBadge } from './ui/LanguageBadge';
export function Header() {
  const { t } = useLocale();
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
          <a className="brand" href="#top" aria-label={t('APCOSYS home')}>
            <img src={media('logo.svg')} width="134" height="26" alt="APCOSYS" />
          </a>
          <nav className="desktop-nav" aria-label={t('Main navigation')}>
            {navigation.map((group, i) => (
              <div
                className="nav-group"
                key={group.label}
                onKeyDown={(event) => {
                  if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
                  const links = Array.from(
                    event.currentTarget.querySelectorAll<HTMLAnchorElement>('.nav-panel a'),
                  );
                  if (!links.length) return;
                  const focused = links.indexOf(document.activeElement as HTMLAnchorElement);
                  event.preventDefault();
                  setActive(group.label);
                  const next =
                    event.key === 'Home'
                      ? 0
                      : event.key === 'End'
                        ? links.length - 1
                        : focused < 0
                          ? event.key === 'ArrowUp'
                            ? links.length - 1
                            : 0
                          : (focused + (event.key === 'ArrowDown' ? 1 : -1) + links.length) %
                            links.length;
                  requestAnimationFrame(() => links[next]?.focus());
                }}
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
                  <LocaleText>{t(group.label)}</LocaleText>
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
                      <LocaleText>{t(item.label)}</LocaleText>
                    </a>
                  ))}
                </div>
              </div>
            ))}
            <a className="nav-link nav-trigger" href="#pricing">
              <LocaleText>{t('Pricing')}</LocaleText>
            </a>
          </nav>
          <div className="header-actions">
            <LanguageBadge
              open={active === 'language'}
              onOpenChange={(open) => setActive(open ? 'language' : null)}
            />
            <a href={`${productUrl}/search`} className="plain-button header-signin">
              <LocaleText>{t('Sign In')}</LocaleText>
            </a>
            <DoubleButton href={`${productUrl}/register`} compact className="header-signup">
              <LocaleText>{t('Create free account')}</LocaleText>
            </DoubleButton>
            <button
              className="icon-button menu-toggle"
              type="button"
              aria-label={t('Open navigation')}
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
        title={t('Navigation')}
        className="mobile-navigation"
      >
        <nav aria-label={t('Mobile navigation')}>
          {navigation.map((group) => (
            <div className="mobile-nav-group" key={group.label}>
              <p className="eyebrow">
                <LocaleText>{t(group.label)}</LocaleText>
              </p>
              {group.items.map((item) => (
                <a key={item.label} href={item.href} onClick={() => setMobileOpen(false)}>
                  <LocaleText>{t(item.label)}</LocaleText>
                  <Icon name="arrow" />
                </a>
              ))}
            </div>
          ))}
          <a className="mobile-pricing" href="#pricing" onClick={() => setMobileOpen(false)}>
            <LocaleText>{t('Pricing')}</LocaleText>
            <Icon name="arrow" />
          </a>
          <DoubleButton href={`${productUrl}/register`}>
            <LocaleText>{t('Create free account')}</LocaleText>
          </DoubleButton>
          <a className="plain-button" href={`${productUrl}/search`}>
            <LocaleText>{t('Sign In')}</LocaleText>
          </a>
        </nav>
      </Modal>
    </>
  );
}
