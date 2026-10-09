import { useState } from 'react';
import { MorphPanel } from '../ui/MorphPanel';
import { apiRequestExample, apiResponseExample } from '../../content/product-demo';
export function ApiExample({ compact = false }: { compact?: boolean }) {
  const [response, setResponse] = useState(false);
  const [copyState, setCopyState] = useState('Copy');
  const snippet = response ? apiResponseExample : apiRequestExample;
  return (
    <div className={'stage-code-window' + (compact ? ' stage-code-window--compact' : '')}>
      <div className="stage-code-header">
        <div className="stage-code-tabs" role="group" aria-label="API code example">
          <button
            type="button"
            aria-pressed={!response}
            onClick={() => {
              setResponse(false);
              setCopyState('Copy');
            }}
          >
            Request
          </button>
          <button
            type="button"
            aria-pressed={response}
            onClick={() => {
              setResponse(true);
              setCopyState('Copy');
            }}
          >
            Response
          </button>
        </div>
        <button
          type="button"
          className="stage-code-copy"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(snippet);
              setCopyState('Copied');
            } catch {
              setCopyState('Select code to copy');
            }
          }}
        >
          {copyState}
        </button>
      </div>
      {!compact && (
        <div className="stage-api-auth">
          <span>AUTHENTICATION</span>
          <p>
            Obtain your key inside Apcosys. Set the endpoint and authentication header from the
            confirmed API reference.
          </p>
        </div>
      )}
      <MorphPanel changeKey={String(response)}>
        <pre
          data-morph-enter
          tabIndex={0}
          aria-label={response ? 'Illustrative API response' : 'API request template'}
        >
          <code>{snippet}</code>
        </pre>
        <p className="stage-code-note">
          {response
            ? 'Synthetic host data, not the production response schema.'
            : 'Request template. Endpoint and authentication contract require product confirmation.'}
        </p>
      </MorphPanel>
      <span className="sr-only" role="status">
        {copyState === 'Copy' ? '' : copyState}
      </span>
    </div>
  );
}
