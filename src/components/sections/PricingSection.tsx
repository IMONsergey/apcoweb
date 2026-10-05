import { useLocale } from '../../i18n/context';
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
  const { t } = useLocale();
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
            <h2 id="pricing-title">
              {t('Start free.')}
              <br />
              <span>
                {t('Upgrade when your')}
                <br className="desktop-break" /> {t('investigation needs more.')}
              </span>
            </h2>
            <div className="billing billing--desktop">
              <p>
                {t('Subscribe annually')}
                <br />
                {t('and save 20%!')}
              </p>
              <BillingSwitch value={period} onChange={setPeriod} />
            </div>
          </div>
          <p className="sr-only" role="status" aria-live="polite">
            {period === 'annually'
              ? t(
                  'Annual billing selected. Displayed monthly prices include 20 percent savings. Annual totals are shown below.',
                )
              : t('Monthly billing selected.')}
          </p>
          <MobileBillingDock rangeRef={rangeRef} period={period} onChange={setPeriod} />
          <div className="plan-grid" id="pricing-plans">
            {plans.map((plan) => (
              <article
                id={`plan-${plan.id}`}
                key={plan.id}
                className={`plan-card${plan.id === 'plus' ? ' plan-card--featured' : ''}`}
              >
                <div>
                  <h3>{plan.name}</h3>
                  <p className="plan-description">{t(plan.description)}</p>
                </div>
                <div className="plan-price-block">
                  <p className="plan-price">
                    <span className="price-amount" key={period}>
                      {formatPrice(calculatePrice(plan.price, period).monthly)}
                    </span>
                    {plan.price > 0 && <span className="price-unit">{t('/mo')}</span>}
                  </p>
                  <p className="plan-billing-note">
                    {plan.price > 0
                      ? period === 'annually'
                        ? t('{amount} billed annually', {
                            amount: formatPrice(calculatePrice(plan.price, period).total),
                          })
                        : t('Billed monthly')
                      : '\u00a0'}
                  </p>
                </div>
                <dl>
                  <div>
                    <dt>{t('Credits')}</dt>
                    <dd>{plan.credits}</dd>
                  </div>
                  <div>
                    <dt>{t('Users')}</dt>
                    <dd>{plan.users}</dd>
                  </div>
                </dl>
                {plan.id === 'free' ? (
                  <a className="plan-button" href={`${productUrl}/register`}>
                    {t(plan.action)}
                  </a>
                ) : (
                  <button
                    type="button"
                    className="plan-button"
                    onClick={(event) => {
                      event.currentTarget.focus();
                      setSelected(plan);
                      setPlanOpen(true);
                    }}
                  >
                    {t(plan.action)}
                  </button>
                )}
              </article>
            ))}
          </div>
          <div className="comparison-action">
            <DoubleButton
              variant="inverse"
              onClick={(event) => {
                event.currentTarget.focus();
                setCompare(true);
              }}
            >
              {t('View a detailed comparison')}
            </DoubleButton>
          </div>
        </div>
        <div className="contact-banner">
          <Visual kind="dots" direction="left-to-right" />
          <div>
            <h3>{t('Have specific organisational requirements?')}</h3>
            <p>{t('Tell us about your data, API or procurement needs.')}</p>
          </div>
          <DoubleButton
            variant="inverse"
            href={`mailto:${supportEmail}?subject=APCOSYS%20organisation%20requirements`}
          >
            {t('Talk to Us')}
          </DoubleButton>
        </div>
      </div>

      <Modal
        open={compare}
        onClose={() => setCompare(false)}
        title={t('Compare plans')}
        className="comparison-modal"
      >
        <div className="table-scroll" tabIndex={0} role="region" aria-label={t('Plan comparison')}>
          <table>
            <caption>{t('Allowances and access shown in the current landing concept')}</caption>
            <thead>
              <tr>
                <th scope="col">{t('Plan')}</th>
                {plans.map((p) => (
                  <th scope="col" key={p.id}>
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">{t('Monthly price')}</th>
                {plans.map((p) => (
                  <td key={p.id}>{formatPrice(calculatePrice(p.price, period).monthly)}</td>
                ))}
              </tr>
              <tr>
                <th scope="row">
                  {t(period === 'annually' ? 'Billed annually' : 'Billed monthly')}
                </th>
                {plans.map((p) => (
                  <td key={p.id}>{formatPrice(calculatePrice(p.price, period).total)}</td>
                ))}
              </tr>
              <tr>
                <th scope="row">{t('Credits')}</th>
                {plans.map((p) => (
                  <td key={p.id}>{p.credits}</td>
                ))}
              </tr>
              <tr>
                <th scope="row">{t('Users')}</th>
                {plans.map((p) => (
                  <td key={p.id}>{p.users}</td>
                ))}
              </tr>
              <tr>
                <th scope="row">{t('API access')}</th>
                {plans.map((p) => (
                  <td key={p.id}>{p.api ? t('Included') : '—'}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <p className="modal-note">
          {t(
            'Final pricing, billing periods and purchase conditions are confirmed in APCOSYS before payment.',
          )}
        </p>
        <DoubleButton href={`${productUrl}/register`}>{t('Continue in APCOSYS')}</DoubleButton>
      </Modal>
      <Modal
        open={planOpen}
        onClose={() => setPlanOpen(false)}
        title={selected ? t('{name} plan', { name: selected.name }) : t('Plan')}
      >
        {selected && (
          <>
            <p>{t(selected.description)}</p>
            <p className="selected-plan-price">
              {formatPrice(calculatePrice(selected.price, period).monthly)}
              {t(' / month')}
            </p>
            <p className="modal-note">
              {period === 'annually'
                ? t('{amount} billed annually · 20% savings', {
                    amount: formatPrice(calculatePrice(selected.price, period).total),
                  })
                : t('Billed monthly')}
            </p>
            <dl className="plan-summary">
              <div>
                <dt>{t('Credits')}</dt>
                <dd>{selected.credits}</dd>
              </div>
              <div>
                <dt>{t('Users')}</dt>
                <dd>{selected.users}</dd>
              </div>
              <div>
                <dt>{t('API access')}</dt>
                <dd>{selected.api ? t('Included') : '—'}</dd>
              </div>
            </dl>
            <p className="modal-note">
              {t(
                'Continue in APCOSYS to confirm current pricing and activate your plan. No payment is collected on this preview.',
              )}
            </p>
            <DoubleButton href={`${productUrl}/register`}>{t('Continue in APCOSYS')}</DoubleButton>
          </>
        )}
      </Modal>
    </section>
  );
}
