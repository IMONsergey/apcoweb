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
export const supportEmail =
  import.meta.env.VITE_APCO_SUPPORT_EMAIL?.trim() || 'info@apcosys.net';
