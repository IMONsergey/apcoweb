import { useLayoutEffect, useMemo, type ReactNode } from 'react';
import { LocaleContext } from './context';
import { translate, type Locale } from './messages';
import { installPageEntrance } from './pageEntrance';

/**
 * Public landing is English-only for now. Keep the context contract stable so a
 * future language pack can return without touching every component.
 */
export function LocaleProvider({ children }: { children: ReactNode }) {
  useLayoutEffect(() => {
    document.documentElement.lang = 'en';
    document.title = 'APCOSYS — Start with a query.';
    return installPageEntrance();
  }, []);

  const value = useMemo(
    () => ({
      locale: 'en' as Locale,
      setLocale: () => undefined,
      t: (key: string, values?: Record<string, string | number>) => translate('en', key, values),
    }),
    [],
  );

  return <LocaleContext value={value}>{children}</LocaleContext>;
}
