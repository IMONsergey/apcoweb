import { useId, useRef, type KeyboardEvent } from 'react';
import { useLocale } from '../../i18n/context';
import { LocaleText } from '../../i18n/LocaleText';
import { Icon } from './Icon';

const languages = [
  { value: 'en', label: 'English' },
  { value: 'ru', label: 'Русский' },
] as const;

function LanguageFlag({ locale }: { locale: 'en' | 'ru' }) {
  const clip = useId();
  return (
    <svg
      className="language-flag"
      viewBox="0 0 24 24"
      width="16"
      height="16"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <clipPath id={clip}>
          <circle cx="12" cy="12" r="12" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clip})`}>
        {locale === 'en' ? (
          <>
            <path fill="#012169" d="M0 0h24v24H0z" />
            <path stroke="#fff" strokeWidth="5" d="m0 0 24 24M24 0 0 24" />
            <path stroke="#c8102e" strokeWidth="2" d="m0 0 24 24M24 0 0 24" />
            <path stroke="#fff" strokeWidth="8" d="M12 0v24M0 12h24" />
            <path stroke="#c8102e" strokeWidth="4.5" d="M12 0v24M0 12h24" />
          </>
        ) : (
          <>
            <path fill="#fff" d="M0 0h24v8H0z" />
            <path fill="#0039a6" d="M0 8h24v8H0z" />
            <path fill="#d52b1e" d="M0 16h24v8H0z" />
          </>
        )}
      </g>
    </svg>
  );
}

/** Same disclosure as navigation, with native buttons and radio-menu keyboard behavior. */
export function LanguageBadge({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const id = useId();
  const panelId = `${id}-languages`;
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const { locale, setLocale, t } = useLocale();
  const focusOption = (index: number) => {
    requestAnimationFrame(() => {
      panel.current?.querySelectorAll<HTMLButtonElement>('button')[index]?.focus();
    });
  };
  const close = () => {
    onOpenChange(false);
    trigger.current?.focus({ preventScroll: true });
  };
  const openMenu = (index = languages.findIndex((language) => language.value === locale)) => {
    onOpenChange(true);
    focusOption(index);
  };
  const onMenuKey = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      close();
    } else if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      event.preventDefault();
      const options = Array.from(
        panel.current?.querySelectorAll<HTMLButtonElement>('button') ?? [],
      );
      const current = options.indexOf(document.activeElement as HTMLButtonElement);
      const next =
        event.key === 'Home'
          ? 0
          : event.key === 'End'
            ? 1
            : (current + (event.key === 'ArrowDown' ? 1 : -1) + options.length) % options.length;
      options[next]?.focus();
    }
  };
  return (
    <div
      className="language-control"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) onOpenChange(false);
      }}
    >
      <button
        ref={trigger}
        type="button"
        className="language"
        data-language-selector=""
        aria-label={t('Language')}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => (open ? close() : openMenu())}
        onKeyDown={(event) => {
          if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
            event.preventDefault();
            openMenu(event.key === 'ArrowUp' || event.key === 'End' ? 1 : 0);
          } else if (event.key === 'Tab' && open) onOpenChange(false);
        }}
      >
        <LanguageFlag locale={locale} />
        <LocaleText>{locale.toUpperCase()}</LocaleText>
        <Icon name="chevron" />
      </button>
      <div
        ref={panel}
        id={panelId}
        role="menu"
        aria-label={t('Language')}
        className="nav-panel language-panel"
        data-open={open}
        aria-hidden={!open}
        inert={!open}
        onKeyDown={onMenuKey}
      >
        {languages.map((language) => (
          <button
            key={language.value}
            type="button"
            role="menuitemradio"
            aria-checked={locale === language.value}
            tabIndex={open && locale === language.value ? 0 : -1}
            lang={language.value}
            onClick={() => {
              setLocale(language.value);
              close();
            }}
          >
            <LanguageFlag locale={language.value} />
            {language.label}
          </button>
        ))}
      </div>
    </div>
  );
}
