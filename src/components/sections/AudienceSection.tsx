import { DoubleButton } from '../ui/DoubleButton';
import { Visual } from '../visuals/Visual';
export function AudienceSection() {
  return (
    <section id="use-cases" className="audiences section-space" aria-labelledby="audiences-title">
      <div className="container">
        <h2 id="audiences-title">
          For security researchers
          <br />
          and teams.
        </h2>
        <div className="audience-grid">
          <article id="researchers" className="audience-card">
            <div className="audience-art">
              <Visual kind="rings" />
            </div>
            <div className="audience-copy">
              <h3>
                For security
                <br />
                researchers
              </h3>
              <p>
                Find the infrastructure you are interested in, check what runs on it and keep
                investigating.
              </p>
              <ul className="use-case-tags">
                <li>Bug Bounty</li>
                <li>Vulnerability Research</li>
                <li>OSINT / Threat Investigation</li>
              </ul>
            </div>
            <div className="audience-actions">
              <DoubleButton href="#how-it-works">Explore Search &amp; Investigation</DoubleButton>
              <a className="plain-button" href="#pricing">
                View Plans
              </a>
            </div>
          </article>
          <article id="teams" className="audience-card">
            <div className="audience-art">
              <Visual kind="rosette" />
            </div>
            <div className="audience-copy">
              <h3>
                For security
                <br />
                teams
              </h3>
              <p>
                Investigate the internet-facing infrastructure your organisation runs, review its
                technical context and bring the results into your own tools through the API. The
                Business plan gives up to 5 users access on one subscription.
              </p>
            </div>
            <div className="audience-actions">
              <DoubleButton href="#api">Explore For Teams</DoubleButton>
              <a className="plain-button" href="#plan-business">
                View Business Plan
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
