/** Resolve static assets relative to the site's configured base URL. */
const directories = {
  brand: 'assets/brand',
  partners: 'assets/partners',
  hero: 'assets/illustrations/hero',
  walkthrough: 'assets/illustrations/walkthrough',
  api: 'assets/illustrations/api',
} as const;

export type AssetGroup = keyof typeof directories;

export function assetUrl(group: AssetGroup, filename: string): string {
  return `${import.meta.env.BASE_URL}${directories[group]}/${filename}`;
}
