import { useRef, useState } from 'react';
import { MobileBillingDock } from './MobileBillingDock';
import { plans, productUrl, supportEmail } from '../../content/site';
import { DoubleButton } from '../ui/DoubleButton';
import { Modal } from '../ui/Modal';
import { Visual } from '../visuals/Visual';
import { BillingSwitch } from '../ui/BillingSwitch';
import { calculatePrice, formatPrice, type BillingPeriod } from '../../content/pricing';

type Plan = (typeof plans)[number];

export function PricingSection() {
  const [compare, setCompare] = useState(false);
  const rangeRef = useRef<HTMLDivElement>(null);
  const [planOpen, setPlanOpen] = useState(false);
  const [period, setPeriod] = useState<BillingPeriod>('monthly');
  const [selected, setSelected] = useState<Plan | null>(null);
  return (
    <section className="pricing section-space" id="pricing" aria-labelledby="pricing-title">
      <div className="container">
        <div className="pricing-options" ref={rangeRef} data-testid="pricing-options">
          <div className="pricing-heading">
            <h2 id="pricing-title">Start free.<br /><span>Upgrade when your<br className="desktop-break" /> investigation needs more.</span></h2>
            <div className="billing billing--desktop">
              <p>Subscribe annually<br />and save 20%!</p>
              <BillingSwitch value={period} onChange={setPeriod} />
            </div>
          </div>
          <p className="sr-only" role="status" aria-live="polite">
            {period === 'annually'
              ? 'Annual billing selected. Displayed monthly prices include 20 percent savings. Annual totals are shown below.'
              : 'Monthly billing selected.'}
          </p>
          <MobileBillingDock rangeRef={rangeRef} period={period} onChange={setPeriod} />
          <div className="plan-grid" id="pricing-plans">
            {plans.map((plan) => (
              <article id={`plan-${plan.id}`} key={plan.id}
                className={`plan-card${plan.id === 'plus' ? ' plan-card--featured' : ''}`}>
                <div><h3>{plan.name}</h3><p className="plan-description">{plan.description}</p></div>
                <div className="plan-price-block">
                  <p className="plan-price">
                    <span className="price-amount" key={period}>{formatPrice(calculatePrice(plan.price, period).monthly)}</span>
                    {plan.price > 0 && <span className="price-unit">/mo</span>}
                  </p>
                  <p className="plan-billing-note">{plan.price > 0
                    ? period === 'annually' ? `${formatPrice(calculatePrice(plan.price, period).total)} billed annually` : 'Billed monthly'
                    : '\u00a0'}</p>
                </div>
                <dl><div><dt>Credits</dt><dd>{plan.credits}</dd></div><div><dt>Users</dt><dd>{plan.users}</dd></div></dl>
                {plan.id === 'free'
                  ? <a className="plan-button" href={`${productUrl}/register`}>{plan.action}</a>
                  : <button type="button" className="plan-button" onClick={(event) => {
                    event.currentTarget.focus(); setSelected(plan); setPlanOpen(true);
                  }}>{plan.action}</button>}
              </article>
            ))}
          </div>
          <div className="comparison-action">
            <DoubleButton variant="inverse" onClick={(event) => {
              event.currentTarget.focus(); setCompare(true);
            }}>View a detailed comparison</DoubleButton>
          </div>
        </div>
        <div className="contact-banner">
          <Visual kind="dots" direction="left-to-right" />
          <div><h3>Have specific organisational requirements?</h3><p>Tell us about your data, API or procurement needs.</p></div>
          <DoubleButton variant="inverse" href={`mailto:${supportEmail}?subject=APCOSYS%20organisation%20requirements`}>Talk to Us</DoubleButton>
        </div>
      </div>
      <Modal open={compare} onClose={() => setCompare(false)} title="Compare plans" className="comparison-modal">
        <div className="table-scroll" tabIndex={0} role="region" aria-label="Plan comparison">
          <table>
            <caption>Allowances and access shown in the current landing concept</caption>
            <thead><tr><th scope="col">Plan</th>{plans.map((p) => <th scope="col" key={p.id}>{p.name}</th>)}</tr></thead>
            <tbody>
              <tr><th scope="row">Monthly price</th>{plans.map((p) => <td key={p.id}>{formatPrice(calculatePrice(p.price, period).monthly)}</td>)}</tr>
              <tr><th scope="row">{period === 'annually' ? 'Billed annually' : 'Billed monthly'}</th>{plans.map((p) => <td key={p.id}>{formatPrice(calculatePrice(p.price, period).total)}</td>)}</tr>
              <tr><th scope="row">Credits</th>{plans.map((p) => <td key={p.id}>{p.credits}</td>)}</tr>
              <tr><th scope="row">Users</th>{plans.map((p) => <td key={p.id}>{p.users}</td>)}</tr>
              <tr><th scope="row">API access</th>{plans.map((p) => <td key={p.id}>{p.api ? 'Included' : '—'}</td>)}</tr>
            </tbody>
          </table>
        </div>
        <p className="modal-note">Final pricing, billing periods and purchase conditions are confirmed in APCOSYS before payment.</p>
        <DoubleButton href={`${productUrl}/register`}>Continue in APCOSYS</DoubleButton>
      </Modal>
      <Modal open={planOpen} onClose={() => setPlanOpen(false)} title={selected ? `${selected.name} plan` : 'Plan'}>
        {selected && <>
          <p>{selected.description}</p>
          <p className="selected-plan-price">{formatPrice(calculatePrice(selected.price, period).monthly)} / month</p>
          <p className="modal-note">{period === 'annually'
            ? `${formatPrice(calculatePrice(selected.price, period).total)} billed annually · 20% savings`
            : 'Billed monthly'}</p>
          <dl className="plan-summary">
            <div><dt>Credits</dt><dd>{selected.credits}</dd></div>
            <div><dt>Users</dt><dd>{selected.users}</dd></div>
            <div><dt>API access</dt><dd>{selected.api ? 'Included' : '—'}</dd></div>
          </dl>
          <p className="modal-note">Continue in APCOSYS to confirm current pricing and activate your plan. No payment is collected on this preview.</p>
          <DoubleButton href={`${productUrl}/register`}>Continue in APCOSYS</DoubleButton>
        </>}
      </Modal>
    </section>
  );
}
