import { siteHref } from '../../app/router';

export function TeamOperations() {
  const process = [
    {
      step: '01',
      name: 'Analyst input',
      desc: 'A host, domain, report or relevant technology begins the question.',
    },
    {
      step: '02',
      name: 'Search evidence',
      desc: 'Examine observed services and technical attributes with their time context.',
    },
    {
      step: '03',
      name: 'Validate context',
      desc: 'Review related technology and CVE signals, then verify before escalation.',
    },
    {
      step: '04',
      name: 'Integrate workflow',
      desc: 'Use the confirmed API capabilities in internal scripts and reporting.',
    },
  ] as const;
  return (
    <section className="stage-team-operations section-space" aria-labelledby="team-process-title">
      <div className="container">
        <div className="stage-team-operations__header">
          <div>
            <h2 id="team-process-title">
              From question to evidence.
              <br />
              Then into your workflow.
            </h2>
          </div>
          <p>
            A technical evaluation of Apcosys can begin with one analyst and extend to a team
            process.
          </p>
        </div>
        <div className="stage-team-operations__flow">
          {process.map((item) => (
            <article key={item.step}>
              <span>{item.step} / 04</span>
              <h3>{item.name}</h3>
              <p>{item.desc}</p>
            </article>
          ))}
        </div>
        <div className="stage-team-operations__business">
          <div>
            <h3>Business plan</h3>
            <p>
              Up to five users, higher credit allowances and API access are listed in the approved
              plan concept. Confirm current entitlements with the team.
            </p>
          </div>
          <div className="stage-team-operations__metrics">
            <div>
              <strong>5</strong>
              <span>Users (proposed)</span>
            </div>
            <div>
              <strong>1.5M</strong>
              <span>Credits (proposed)</span>
            </div>
          </div>
          <div className="stage-team-operations__actions">
            <a href={siteHref('/pricing')}>Compare Business</a>
            <a href={siteHref('/developers/api')}>API integration</a>
          </div>
        </div>
      </div>
    </section>
  );
}
