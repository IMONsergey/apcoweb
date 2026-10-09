import { siteHref } from '../app/router';
import { productUrl } from '../content/site';
import type { PageLink } from './PageUI';

export const primarySearch: PageLink = { label: 'Try Search', href: productUrl + '/search' };
export const primaryContact: PageLink = { label: 'Talk to Us', href: siteHref('/contact') };
export const linkTo = (label: string, path: string, secondary = false): PageLink => ({
  label, href: siteHref(path), secondary,
});
