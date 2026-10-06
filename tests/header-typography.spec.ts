import { test, expect } from '@playwright/test';
import { translate } from '../src/i18n/messages';
import { typograph, noBreakNumber } from '../src/i18n/typography';
import { openLanguageMenu, revealHeader } from './helpers/locale';

test('English Typograf pipeline remains active and preserves commercial values', () => {
  expect(typograph('Search in the internet.')).toContain('in\u00a0');
  expect(typograph('It\'s "search" - a start.')).toContain('â€œsearchâ€');
  expect(translate('en', ' / month')).toBe(' / month');
  expect(translate('en', '{amount} billed annually', { amount: '$6,912' })).toBe(
    '$6,912 billed annually',
  );
  expect(noBreakNumber('1 500 000')).toBe('1\u00a0500\u00a0000');
  const copy = typograph('Search in the internet.');
  expect(typograph(copy)).toBe(copy);
});

for (const width of [320, 390, 768, 1440]) {
  test(
    'English-only header, language availability and anchor clearance at ' + width + 'px',
    async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('./?lang=ru', { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);

      await expect(page.locator('html')).toHaveAttribute('lang', 'en');
      await expect(page.locator('#hero-title')).toContainText('Start with a query.');

      const input = page.getByRole('searchbox');
      await input.fill('port:443 hostname:"example.com"');

      const header = page.locator('.site-header');
      await page.locator('#¶»§q«^