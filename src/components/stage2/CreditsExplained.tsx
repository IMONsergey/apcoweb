export function CreditsExplained() {
  return (
    <section
      id="usage-guide"
      className="stage-usage-guide section-space"
      aria-labelledby="usage-guide-title"
    >
      <div className="container">
        <div className="editorial-heading">
          <h2 id="usage-guide-title">Understand your allowance.</h2>
          <p>
            Choose a plan for its capabilities. Add capacity when the tools already fit and you need
            to make more requests.
          </p>
        </div>
        <div className="usage-layout">
          <div className="request-costs">
            <h3>Request costs</h3>
            <div>
              <strong>1</strong>
              <p>
                Search Token
                <span>Request without analytics, such as host information or bucket search.</span>
              </p>
            </div>
            <div>
              <strong>4</strong>
              <p>
                Search Tokens<span>Search with category analytics.</span>
              </p>
            </div>
            <p className="editorial-note">
              Usage applies to website and API requests. Check the current charge in your account.
            </p>
          </div>
          <div className="stage-usage-guide__questions">
            <article>
              <div>
                <h3>Who is each plan for?</h3>
                <p>
                  Free introduces search. Plus adds API access for individual research. Expert adds
                  deeper filtering. Business brings access for a team and a larger allowance.
                </p>
              </div>
            </article>
            <article>
              <div>
                <h3>Credits or Search Tokens?</h3>
                <p>
                  Plan allowances are listed in credits; additional packages are sold as Search
                  Tokens. The credit-to-token relationship is not yet verified. Confirm the account
                  balance and package terms before adding capacity.
                </p>
              </div>
            </article>
            <article>
              <div>
                <h3>Upgrade or buy more?</h3>
                <p>
                  Upgrade when you need another capability or team access. Consider a package when
                  you need more requests at the same access level.
                </p>
              </div>
            </article>
            <article>
              <div>
                <h3>What happens at the limit?</h3>
                <p>
                  Check the remaining balance before a larger investigation. Ask the team about
                  exhaustion, expiry and rollover if these affect your workflow.
                </p>
              </div>
            </article>
            <a className="stage-text-link" href="#search-token-packages">
              See Search Token packages
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
