import { useLocale } from './context';
import { typograph } from './typography';

/** An inline text boundary: it preserves natural wrapping and never remounts controls. */
export function LocaleText({ children, className = '' }: { children: string; className?: string }) {
  const { locale } = useLocale();
  return <span className={`locale-text ${className}`.trim()}>{typograph(children, locale)}</span>;
}
