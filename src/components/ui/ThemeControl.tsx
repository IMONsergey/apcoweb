import { useId, useRef, type KeyboardEvent } from 'react';
import { useTheme, type ThemeMode } from '../../theme/ThemeProvider';
import { Icon } from './Icon';

const options: Array<{ value: ThemeMode; label: string }> = [
  { value: 'system', label: 'System' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
];

function ThemeOptions({ compact = false }: { compact?: boolean }) {
  const { mode, setMode } = useTheme();
  return (
    <div
      className={compact ? 'theme-segmented' : 'theme-menu-options'}
      role={compact ? 'radiogroup' : undefined}
      aria-label="Appearance"
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role={compact ? 'radio' : 'menuitemradio'}
          aria-checked={mode === option.value}
          data-active={mode === option.value}
          onClick={() => setMode(option.value)}
        >
          <span>{option.label}</span>
          {mode === option.value && (
            <span className="theme-check" aria-hidden="true">
              ✓
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

export function ThemeMenu({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const id = useId();
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      onOpenChange(false);
      trigger.current?.focus({ preventScroll: true });
    }
    if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      const buttons = Array.from(
        panel.current?.querySelectorAll<HTMLButtonElement>('button') ?? [],
      );
      if (!buttons.length) return;
      event.preventDefault();
      const current = buttons.indexOf(document.activeElement as HTMLButtonElement);
      const next =
        event.key === 'Home'
          ? 0
          : event.key === 'End'
            ? buttons.length - 1
            : current < 0
              ? 0
              : (current + (event.key === 'ArrowDown' ? 1 : -1) + buttons.length) % buttons.length;
      buttons[next]?.focus();
    }
  };
  return (
    <div
      className="theme-control theme-control--desktop"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) onOpenChange(false);
      }}
    >
      <button
        ref={trigger}
        type="button"
        className="icon-button theme-trigger"
        aria-label="Appearance"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => onOpenChange(!open)}
      >
        <Icon name="appearance" />
      </button>
      <div
        ref={panel}
        id={id}
        className="nav-panel theme-panel"
        role="menu"
        aria-label="Appearance"
        data-open={open}
        aria-hidden={!open}
        inert={!open}
        onKeyDown={onKeyDown}
      >
        <p className="eyebrow">APPEARANCE</p>
        <ThemeOptions />
      </div>
    </div>
  );
}

export function MobileThemeControl() {
  return (
    <div className="mobile-theme-control">
      <p className="eyebrow">APPEARANCE</p>
      <ThemeOptions compact />
    </div>
  );
}
