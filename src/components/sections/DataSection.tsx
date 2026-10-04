import { metrics, productUrl } from '../../content/site';
import { DoubleButton } from '../ui/DoubleButton';
import { Visual } from '../visuals/Visual';
export function DataSection() {
  return (
    <section className="data-section" id="data" aria-labelledby="data-title">
      <div className="container data-stage">
        <Visual kind="globe" />
        <div className="data-copy">
          <h2 id="data-title">
            The data behind
            <br />
            every search.
          </h2>
          <p>
            APCOSYS scans the public internet and records how internet-facing hosts respond: open
            ports, services and detected products.
          </p>
          <div className="data-actions">
            <DoubleButton href={`${productUrl}/legal/data-collection-policy`} variant="dark">
              Read methodology
            </DoubleButton>
            <DoubleButton href={`${productUrl}/docs/about`} variant="inverse">
              How we scan
            </DoubleButton>
          </div>
        </div>
        <dl className="data-metrics">
          {metrics.map((metric) => (
            <div className={`metric-card metric-card--${metric.id}`} key={metric.id}>
              <dt>{metric.label}</dt>
              <dd>{metric.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
