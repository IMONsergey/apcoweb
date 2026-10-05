import { createContext, useContext } from 'react';
import { translate, type Locale } from './messages';
export type LocaleState = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, values?: Record<string, string | number>) => string;
};
export const LocaleContext = createContext<LocaleState>({
  locale: 'en',
  setLocale: () => undefined,
  t: (key, values) => translate('en', key, values),
});
export const useLocale = () => useContext(LocaleContext);
