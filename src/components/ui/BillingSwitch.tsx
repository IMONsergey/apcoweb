import { useId } from 'react';
import type { BillingPeriod } from '../../content/pricing';

export function BillingSwitch({
  value,
  onChange,
}: {
  value: BillingPeriod;
  onChange: (value: BillingPeriod) => void;
}) {
  const name = useId();
  return (
    <fieldset
      className="billing-switch"
      tabIndex={0}
      onFocus={(event) => {
        // A single explicit entry point also works after a fixed panel becomes visible in WebKit.
        // Only user-initiated group focus is forwarded; appearing on scroll never steals focus.
        if (event.target === event.currentTarget)
          event.currentTarget
            .querySelector<HTMLInputElement>('input:checked')
            ?.focus({ preventScroll: true });
      }}
    >
      <legend className="sr-only">Billing period</legend>
      <div className="segmented" data-period={value}>
        {(['annually', 'monthly'] as const).map((period) => (
          <label key={period}>
            <input
              type="radio"
              name={name}
              value={period}
              checked={value === period}
              tabIndex={-1}
              onChange={() => onChange(period)}
            />
            <span>{period === 'annually' ? 'Annually' : 'Monthly'}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
