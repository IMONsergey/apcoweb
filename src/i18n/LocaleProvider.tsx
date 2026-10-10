import { useLayoutEffect, useMemo, type ReactNode } from 'react';
import { LocaleContext } from './context';
import { translate } from './messages';
import { installPageEntrance } from './pageEntrance';

export function LocaleProvider({ children }: { children: ReactNode }) {
  useLayoutEffect(() => {
    document.documentElement.lang = 'en';
    document.title = 'Apcosys — Start with a query.';
    return installPageEntrance();
  }, []);

  const value = useMemo(
    () => ({
      locale: 'en' as const,
      t: (key: string, values?: Record<string, string | number>) => translate('en', key, values),
    }),
    [],
  );

  return <LocaleContext value={value}>{children}</LocaleContext>;
}
