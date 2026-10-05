import { useId } from 'react';
import { useLocale } from '../../i18n/context';
import { Icon } from './Icon';
/** Native select handles touch/keyboard; the original badge is its visual representation. */
export function LanguageBadge() {
  const clip = useId();
  const { locale, setLocale, t } = useLocale();
  return (
    <div className="language-control">
      <span className="language" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false">
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
        <span>{locale.toUpperCase()}</span>
        <Icon name="chevron" />
      </span>
      <select
        data-language-selector=""
        aria-label={t('Language')}
        value={locale}
        onChange={(event) => {
          const value = event.currentTarget.value;
          if (value === 'en' || value === 'ru') setLocale(value);
        }}
      >
        <option value="en" lang="en">
          English
        </option>
        <option value="ru" lang="ru">
          Русский
        </option>
      </select>
    </div>
  );
}
