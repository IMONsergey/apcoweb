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
    await expect(search.locator('.search-free-note')).toHaveText('It’s free');
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
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
      width + 1,
    );
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });
}

test('left-aligned accent billing text preserves the contextual control', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./', { waitUntil: 'networkidle' });
  await page.locator('#pricing').scrollIntoViewIfNeeded();
  const dock = page.locator('.billing-dock');
  await expect(dock).toHaveAttribute('data-visible', 'true');
  await expect(dock.locator('.billing-dock__offer')).toHaveCSS('text-align', 'left');
});

for (const width of [320, 390, 768, 1440]) {
  test('language menu exposes unavailable RU and ZH without switching at ' + width, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('./?lang=ru', { waitUntil: 'networkidle' });
    const menu = await openLanguageMenu(page);
    await expect(menu.english).toBeEnabled();
    await expect(menu.russian).toBeDisabled();
    await expect(menu.chinese).toBeDisabled();
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('#hero-title')).toContainText('Start with a query.');
  });
}

test('English-only mobile page remains accessible', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./', { waitUntil: 'networkidle' });
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations.filter((v) => v.impact === 'critical' || v.impact === 'serious')).toEqual(
    [],
  );
});
