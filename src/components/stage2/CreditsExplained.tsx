const questions = [
  {
    label: 'Who is each plan for?',
    answer:
      'Free introduces search. Plus supports individual research and API use. Expert is for deeper investigations and filtering. Business lists higher team allowances. See the plan cards for exact proposed entitlements.',
  },
  {
    label: 'Credits or Search Tokens?',
    answer:
      'Plans list allowances in credits; additional packages are sold as Search Tokens. Their exact relationship and conversion are not yet verified. Do not assume they are interchangeable.',
  },
  {
    label: 'What uses the balance?',
    answer:
      'The public Apcosys pricing page lists 1 Search Token for a request without analytics, such as host information or bucket search, and 4 Search Tokens for a search with category analytics. Search Tokens cover website and API requests; the credit-to-token conversion still needs confirmation.',
  },
  {
    label: 'Upgrade or buy more?',
    answer:
      'Upgrade for capabilities or team access; consider a package when you only need more search capacity. The balance-exhaustion behaviour, package compatibility, expiry and rollover are not yet verified. Confirm these before purchasing.',
  },
] as const;

export function CreditsExplained() {
  return (
    <section className="stage-usage-guide section-space" aria-labelledby="usage-guide-title">
      <div className="container stage-usage-guide__layout">
        <div className="stage-usage-guide__lead">
          <h2 id="usage-guide-title">Understand your allowance.</h2>
          <p>
            Find the right level of access and understand what needs checking before adding search
            capacity.
          </p>
          <a className="stage-text-link" href="#search-token-packages">
            See Search Token packages
          </a>
        </div>
        <div className="stage-usage-guide__questions">
          {questions.map((question, i) => (
            <article key={question.label}>
              <span className="stage-credits__number">0{i + 1}</span>
              <div>
                <h3>{question.label}</h3>
                <p>{question.answer}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
