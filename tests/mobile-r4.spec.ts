import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { openLanguageMenu } from './helpers/locale';

for (const width of [320, 360, 390, 430, 599]) {
  test('compact scenes and mobile reading path at ' + width, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('./', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);

    const search = page.locator('.search-scene');
    await expect(search.locator('h3')).toHaveText('One query. A closer look.');
    await expect(page.getByRole('searchbox')).toHaveAttribute(
      'placeholder',
      /Domain, IP\sor\sattribute/,
    );
    await expect(search.locator('.search-free-note')).toHaveText('Itâ€™s free');
    expect((await search.boundingBox())!.height).toBeLessThanOrEqual(500.1);
    expect(
      await search
        .locator('.search-form input')
        .evaluate((el) => parseFloat(getComputedStyle(el).fontSize)),
    ).toBeGreaterThanOrEqual(16);

    await page.locator('#use-cases').scrollIntoViewIfNeeded();
    for (const card of await page.locator('.audience-card').all()) {
      await expect(card.locator('.audience-actions .double-button__icon')).toHaveCount(2);
      expect((await card.locator('.audience-art').boundingBox())!.width).toBeLessThanOrEqual(176);
    }

    await page.locator('#data').scrollIntoViewIfNeeded();
    expect(await page.evaluate(() => document.documentElement.scrollWidth))¶»§q«^