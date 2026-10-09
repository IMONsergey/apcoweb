/** Public settings are embedded into the client bundle at build time. */
function normalizeOrigin(input: string): string {
  const url = new URL(input);
  if (
    (url.protocol !== 'https:' && url.protocol !== 'http:') ||
    url.username ||
    url.password ||
    url.search ||
    url.hash ||
    url.pathname !== '/'
  ) {
    throw new Error('VITE_APCO_PRODUCT_URL must be an HTTP(S) origin without path or credentials.');
  }
  return url.origin;
}

export const productUrl = normalizeOrigin(
  import.meta.env.VITE_APCO_PRODUCT_URL?.trim() || 'https://apcosys.net',
);
export const supportEmail = import.meta.env.VITE_APCO_SUPPORT_EMAIL?.trim() || 'info@apcosys.net';

/** Use the verified product sign-in URL when provided; do not guess an auth route. */
export const signInUrl = (() => {
  const input = import.meta.env.VITE_APCO_SIGN_IN_URL?.trim();
  if (!input) return null;
  const url = new URL(input);
  if (!['http:', 'https:'].includes(url.protocol) || url.origin !== productUrl) {
    throw new Error('VITE_APCO_SIGN_IN_URL must stay on the product origin.');
  }
  return url.href;
})();
