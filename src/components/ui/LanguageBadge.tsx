import { useId } from 'react';
import { Icon } from './Icon';

function EnglishFlag() {
  const clip = useId();
  return (
    <svg
      className="language-flag"
      viewBox="0 0 24 24"
      width="16"
      height="16"
      aria-hidden="true"
      focusable="false"
    >
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
  );
}

/** Visual language control placeholder. RU is intentionally unavailable for now. */
export function LanguageBadge({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  void open;
  void onOpenChange;
  return (
    <div className="language-control" aria-label="English language">
      <div className="language language--disabled" aria-disabled="true">
        <EnglishFlag />
        <span>EN</span>
        <Icon name="chevron" />
      </div>
    </div>
  );
}
