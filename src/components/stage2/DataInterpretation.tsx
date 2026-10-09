export function DataInterpretation() {
  const fields = [
    {
      code: '01',
      name: 'Observation',
      value: 'A technical response recorded at a point in time',
      foot: 'Not a guarantee of current availability',
    },
    {
      code: '02',
      name: 'Detected product',
      value: 'Technology inferred from observed service information',
      foot: 'May be incomplete or misidentified',
    },
    {
      code: '03',
      name: 'CVE association',
      value: 'A potential match based on detected product/version',
      foot: 'Never proof of vulnerability',
    },
  ] as const;
  return (
    <section
      className="stage-data-interpreter section-space"
      aria-label="How to interpret observation evidence"
    >
      <div className="container">
        <p className="eyebrow">READ THE EVIDENCE</p>
        <div className="stage-data-interpreter__top">
          <h2>
            One record.
            <br />
            Several levels of certainty.
          </h2>
          <p>
            Each stage adds technical context, not certainty. Understand when data was seen and what
            still needs verification.
          </p>
        </div>
        <div className="stage-data-interpreter__graph">
          {fields.map((field) => (
            <article key={field.code}>
              <span className="stage-data-interpreter__index">{field.code} / EVIDENCE</span>
              <h3>{field.name}</h3>
              <p>{field.value}</p>
              <div>{field.foot}</div>
            </article>
          ))}
        </div>
        <div className="stage-data-interpreter__timeline">
          <div>
            <span>Observed at</span>
            <strong>Timestamp from the recorded response</strong>
          </div>
          <div>
            <span>Revisited at</span>
            <strong>Subsequent observation, if available</strong>
          </div>
          <div>
            <span>Now</span>
            <strong>State must be verified again</strong>
          </div>
        </div>
        <p className="stage-data-interpreter__note">
          Conceptual interpretation diagram · No timestamps, host detections or collection cadence
          are asserted.
        </p>
      </div>
    </section>
  );
}
