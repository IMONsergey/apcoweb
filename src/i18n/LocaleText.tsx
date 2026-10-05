/** An inline text boundary: it preserves natural wrapping and never remounts controls. */
export function LocaleText({ children, className = '' }: { children: string; className?: string }) {
  return <span className={`locale-text ${className}`.trim()}>{children}</span>;
}
