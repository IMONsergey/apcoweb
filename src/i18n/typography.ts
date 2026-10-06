import type { Locale } from './messages';

/**
 * Copy is authored in its final English form. Keep this boundary lightweight so
 * existing components can retain their API without shipping a runtime typographer.
 */
export function typograph(text: string, locale: Locale): string {
  void locale;
  return text;
}

/** Keep supplied numeric grouping and prevent groups splitting across lines. */
export function noBreakNumber(value: string): string {
  return value.replace(/(?<=\d) (?=\d)/g, '\u00a0');
}
