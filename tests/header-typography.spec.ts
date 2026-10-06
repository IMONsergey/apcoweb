import { test, expect } from '@playwright/test';
import { translate } from '../src/i18n/messages';
import { typograph, noBreakNumber } from '../src/i18n/typography';
import { openLanguageMenu, revealHeader } from './helpers/locale';

test('English Typograf pipeline remains active and preserves commercial values', () => {
  expect(typograph('Search in the internet.')).toContain('in\u00a0');
  expect(typograph('It\'s "search" - a start.')).toContain('“search”');
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
      await page.locator('#api').scrollIntoViewIfNeeded();
      await expect(header).toHaveAttribute('data-hidden', 'true');
      await revealHeader(page);

      const menu = await openLanguageMenu(page);
      await expect(menu.english).toHaveAttribute('aria-checked', 'true');
      await expect(menu.english).toBeEnabled();
      await expect(menu.russian).toBeDisabled();
      await expect(menu.chinese).toBeDisabled();
      await expect(menu.russian).toHaveAttribute('aria-disabled', 'true');
      await expect(menu.chinese).toHaveAttribute('aria-disabled', 'true');
      await expect(page.locator('html')).toHaveAttribute('lang', 'en');
      await expect(input).toHaveValue('port:443 hostname:"example.com"');

      await page.keyboard.press('Escape');
      await expect(menu.trigger).toBeFocused();

      if (width >= 1200) {
        await page.locator('.desktop-nav a[href="#pricing"]').click();
      } else {
        await page.getByRole('button', { name: 'Open navigation', exact: true }).click();
        const dialog = page.getByRole('dialog', { name: 'Navigation', exact: true });
        await dialog.getByRole('link', { name: 'Pricing', exact: true }).click();
      }

      await expect(page).toHaveURL(/#pricing$/);
    },
  );
}
