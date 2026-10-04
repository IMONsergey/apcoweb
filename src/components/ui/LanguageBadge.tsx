import { useId } from 'react';
/** SVG keeps the circular UK flag identical on Windows, macOS and mobile. */
export function LanguageBadge() {
  const clip = useId();
  return (
    <span className="language" aria-label="Language: English">
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id={clip}>
            <circle cx="12" cy="12" r="12" />
          </clipPath>
        </defs>
        <g clipPath={`url(#${clip})`}>
          <path fill="#012169" d="M0 0h24v24H0z" />
          <path stroke="#fff" strokeWidth="5" d="m0 0 24 24M24 0 0 24" />
          <path stroke="#c8102e" strokeWidth="2" d="m0 0 24 24M24 0 0 24" />
          <path stroke="#fff" strokeWidth="8" d="M12 0v24M0 12h24" />
          <path stroke="#c8102e" strokeWidth="4.5" d="M12 0v24M0 12h24" />
        </g>
      </svg>
      <span>EN</span>
    </span>
  );
}
