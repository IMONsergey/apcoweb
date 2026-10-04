import { expect, test } from '@playwright/test';

for (const width of [1920, 1440, 768, 390, 320]) {
  test(`search background has no added statistics band at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('./', { waitUntil: 'networkidle' });
    await expect(page).toHaveTitle(/^APCOSYS/);
    const section = page.locator('.search-preview');
    await section.scrollIntoViewIfNeeded();
    await expect(section.locator('.turquoise-flow canvas')).toBeVisible();
    await expect(section.locator('.dot-cascade canvas')).toBeVisible();

    for (const selector of [':scope > .summary-wrap', ':scope > .visual--flow']) {
      const layer = section.locator(selector);
      await expect(layer).toHaveCSS('background-image', 'none');
      await expect(layer).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
      for (const pseudo of ['::before', '::after']) {
        const paint = await layer.evaluate((element, pseudoElement) => {
          const style = getComputedStyle(element, pseudoElement);
          return { content: style.content, image: style.backgroundImage };
        }, pseudo);
        expect(paint.image).toBe('none');
        expect(['none', 'normal']).toContain(paint.content);
      }
    }

    await expect(section.locator('.summary-grid > div')).toHaveCount(6);
    await expect(section.getByRole('searchbox')).toBeVisible();
    await expect(section.locator('.search-scene img:not([src$=".svg"])')).toHaveCount(0);
  });
}
