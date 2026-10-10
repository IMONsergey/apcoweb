import { PageAction } from '../../pages/PageUI';
import { linkTo, primaryContact } from '../../pages/pageLinks';

export function TeamOperations() {
  return (
    <section className="stage-team-operations section-space" aria-labelledby="team-process-title">
      <div className="container">
        <div className="stage-team-operations__header">
          <h2 id="team-process-title">A shared starting point for your team.</h2>
          <p>
            Evaluate the platform with the questions, tools and handoffs your analysts already use.
          </p>
        </div>
        <div className="team-evaluation">
          <article>
            <h3>Start with a real question.</h3>
            <p>
              Choose an investigation your team understands. Compare the observations with your
              existing evidence and identify what needs validation.
            </p>
          </article>
          <article>
            <h3>Keep the context.</h3>
            <p>
              Carry host details, service responses and open questions into the next review. Make
              the distinction between an observation and a finding clear.
            </p>
          </article>
          <article>
            <h3>Connect your workflow.</h3>
            <p>
              Evaluate supported API requests with a small script or report before integrating them
              into a wider process.
            </p>
          </article>
        </div>
        <div className="stage-team-operations__business">
          <div>
            <h3>Room for a team.</h3>
            <p>
              The Business plan includes a five-user allowance, 1.5 million credits and API access
              in this plan preview.
            </p>
          </div>
          <div className="stage-team-operations__metrics">
            <div>
              <strong>5</strong>
              <span>Users</span>
            </div>
            <div>
              <strong>1.5M</strong>
              <span>Credits</span>
            </div>
          </div>
          <PageAction links={[primaryContact, linkTo('Compare Business', '/pricing', true)]} />
        </div>
      </div>
    </section>
  );
}
