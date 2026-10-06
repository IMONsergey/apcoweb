import { Fragment } from 'react';

/**
 * English-only text is already authored for output. Avoid a wrapper node unless
 * a component explicitly needs one for layout (currently multiline card titles).
 */
export function LocaleText({ children, className = '' }: { children: string; className?: string }) {
  if (!className) return <Fragment>{children}</Fragment>;
  return <span className={className}>{children}</span>;
}
