import Typograf from 'typograf';
import type { Locale } from './messages';

const engines = {
  en: new Typograf({ locale: 'en-US' }),
  ru: new Typograf({ locale: ['ru', 'en-US'] }),
};
for (const engine of Object.values(engines)) {
  // Editorial rules only: never reinterpret prices, dates, units or technical syntax.
  engine.disableRule('*');
  engine.enableRule([
    'common/space/*',
    'common/punctuation/*',
    'common/nbsp/afterShortWord',
    'common/nbsp/afterShortWordByList',
    'common/nbsp/beforeShortLastWord',
    'ru/nbsp/abbr',
    'ru/nbsp/beforeParticle',
    'ru/dash/main',
    'en-US/dash/main',
  ]);
  // Some messages are inline fragments with intentional surrounding spaces.
  engine.disableRule([
    'common/space/trimLeft',
    'common/space/trimRight',
    'common/space/delLeadingBlanks',
    'common/space/delTrailingBlanks',
    'common/space/insertFinalNewline',
  ]);
}
const cache = new Map<string, string>();

/** Format translated copy once, as Unicode text rather than injected HTML. */
export function typograph(text: string, locale: Locale): string {
  const key = `${locale}:${text}`;
  let result = cache.get(key);
  if (result === undefined) {
    result = engines[locale].execute(text);
    cache.set(key, result);
    cache.set(`${locale}:${result}`, result);
  }
  return result;
}

/** Keep the supplied numeric values and grouping; prevent groups splitting across lines. */
export function noBreakNumber(value: string): string {
  return value.replace(/(?<=\d) (?=\d)/g, '\u00a0');
}
