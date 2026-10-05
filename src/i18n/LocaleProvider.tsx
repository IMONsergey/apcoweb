import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { flushSync } from 'react-dom';
import { LocaleContext } from './context';
import { translate, type Locale } from './messages';
import { transitionLocaleText } from './textTransition';
const preferenceKey = 'apcosys.landing.language';
const productPreferenceKey = 'i18nextLng';
const valid = (value: unknown): value is Locale => value === 'en' || value === 'ru';
function readLocale(): Locale {
  const query = new URLSearchParams(window.location.search).get('lang');
  if (valid(query)) return query;
  try {
    const saved = localStorage.getItem(preferenceKey) ?? localStorage.getItem(productPreferenceKey);
    if (valid(saved)) return saved;
  } catch {
    /* Storage may be disabled. */
  }
  return 'en';
}
/** Changing locale keeps pricing, query and expanded-content state mounted. */
export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, update] = useState<Locale>(readLocale);
  const stopTransition = useRef<() => void>(() => undefined);
  const setLocale = useCallback(
    (next: Locale) => {
      if (next === locale) return;
      stopTransition.current();
      stopTransition.current = transitionLocaleText(() => flushSync(() => update(next)), next);
      try {
        localStorage.setItem(preferenceKey, next);
        localStorage.setItem(productPreferenceKey, next);
      } catch {
        /* Preference persistence is optional. */
      }
      const url = new URL(window.location.href);
      url.searchParams.set('lang', next);
      history.replaceState(history.state, '', url);
    },
    [locale],
  );
  useLayoutEffect(() => {
    document.documentElement.lang = locale;
    document.title =
      locale === 'ru' ? 'APCOSYS — Начните с запроса.' : 'APCOSYS — Start with a query.';
  }, [locale]);
  useEffect(() => {
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const stopMotion = () => {
      if (motion.matches || document.hidden) stopTransition.current();
    };
    motion.addEventListener('change', stopMotion);
    document.addEventListener('visibilitychange', stopMotion);
    const sync = () => update(readLocale());
    const stored = (event: StorageEvent) => {
      if (event.key === preferenceKey) sync();
    };
    window.addEventListener('popstate', sync);
    window.addEventListener('storage', stored);
    return () => {
      stopTransition.current();
      motion.removeEventListener('change', stopMotion);
      document.removeEventListener('visibilitychange', stopMotion);
      window.removeEventListener('popstate', sync);
      window.removeEventListener('storage', stored);
    };
  }, []);
  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t: (key: string, values?: Record<string, string | number>) => translate(locale, key, values),
    }),
    [locale, setLocale],
  );
  return <LocaleContext value={value}>{children}</LocaleContext>;
}
