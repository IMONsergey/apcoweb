import { test, expect, type Page } from '@playwright/test';
import { revealHeader } from './helpers/locale';

async function visit(page: Page, width = 1440, height = 1000) {
  await page.setViewportSize({ width, height });
  await page.goto('./', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
}

for (const width of [320, 390, 768, 1200, 1440, 1920]) {
  test('English content remains readable and intrinsic at ' + width + 'px', async ({ page }) => {
    await visit(page, width);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
      width + 1,
    );
    const overflow = await page
      .locator('main h1, main h2, main h3, main p')
      .evaluateAll((nodes) =>
        nodes
          .filter(
            (node) =>
              !node.closest('[inert], [aria-hidden="true"], .sr-only') &&
              node.clientWidth > 0 &&
              node.scrollWidth > node.clientWidth + 2,
          )
          .map((node) => node.textContent),
      );
    expect(overflow).toEqual([]);
  });
}

for (const width of [390, 768, 1440]) {
  test(
    'expanded FAQ retains native disclosure and reflows at ' + width + 'px',
    async ({ page }) => {
      await visit(page, width);
      await page.locator('#faq').scrollIntoViewIfNeeded();
      const details = page.locator('.faq-list details').nth(1);
      await details.locator('summary').cli¶»§q«^