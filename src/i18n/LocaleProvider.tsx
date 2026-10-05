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
import { transitionLocaleText, type StopLocaleTransition } from './textTransition';
import { installLocaleLayout } from './localeLayout';
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
  const requestedLocale = useRef(locale);
  const stopTransition = useRef<StopLocaleTransition>(() => undefined);
  const setLocale = useCallback((next: Locale) => {
    if (next === requestedLocale.current) return;
    requestedLocale.current = next;
    stopTransition.current = transitionLocaleText(
      () => flushSync(() => update(next)),
      next,
      () => stopTransition.current(false),
    );
    try {
      localStorage.setItem(preferenceKey, next);
      localStorage.setItem(productPreferenceKey, next);
    } catch {
      /* Preference persistence is optional. */
    }
    const url = new URL(window.location.href);
    url.searchParams.set('lang', next);
    history.replaceState(history.state, '', url);
  }, []);
  useLayoutEffect(() => {
    document.documentElement.lang = locale;
    document.title =
      locale === 'ru' ? 'APCOSYS — Начните с запроса.' : 'APCOSYS — Start with a query.';
  }, [locale]);
  useLayoutEffect(() => {
    const site = document.querySelector<HTMLElement>('.site');
    if (site) return installLocaleLayout(site);
  }, []);
  useEffect(() => {
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const stopMotion = () => {
      if (motion.matches || document.hidden) stopTransition.current();
    };
    motion.addEventListener('change', stopMotion);
    document.addEventListener('visibilitychange', stopMotion);
    const sync = () => {
      stopTransition.current(false);
      const next = readLocale();
      requestedLocale.current = next;
      update(next);
    };
    const stored = (event: StorageEvent) => {
      if (event.key === preferenceKey) sync();
    };
    window.addEventListener('popstate', sync);
    window.addEventListener('storage', stored);
    return () => {
      stopTransition.current(false);
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
