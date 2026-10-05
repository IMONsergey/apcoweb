import { useLocale } from './context';
import { typograph } from './typography';
import { messageSource } from './messages';

/** An inline text boundary: it preserves natural wrapping and never remounts controls. */
export function LocaleText({ children, className = '' }: { children: string; className?: string }) {
  const { locale } = useLocale();
  const source = messageSource(children, locale);
  return (
    <span
      className={`locale-text ${className}`.trim()}
      lang={locale}
      data-locale-key={source?.key}
      data-locale-values={
        source && Object.keys(source.values).length ? JSON.stringify(source.values) : undefined
      }
    >
      {typograph(children, locale)}
    </span>
  );
}
