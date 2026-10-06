/** English-only runtime. The language control remains visible but inactive until RU returns. */
export type Locale = 'en' | 'ru';

export function translate(
  _locale: Locale,
  key: string,
  values: Record<string, string | number> = {},
) {
  return key.replace(/\{(\w+)\}/g, (token, name: string) => String(values[name] ?? token));
}
