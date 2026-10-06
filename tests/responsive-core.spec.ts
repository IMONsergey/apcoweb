import { test, expect } from '@playwright/test';

const viewports = [
  [2560, 1440],
  [1920, 1080],
  [1536, 864],
  [1536, 740],
  [1440, 900],
  [1366, 768],
  [1366, 650],
  [1280, 720],
  [1280, 600],
  [1024, 768],
  [768, 1024],
  [430, 932],
  [390, 844],
  [360, 800],
  [320, 568],
  [844, 390],
];

for (const [width, height] of viewports) {
  test(
    'intrinsic composition and complete English copy at ' + width + 'x' + height,
    async ({ page }) => {
      await page.setViewportSize({ width, height });
      await page.goto('./?lang=ru', { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);

      await expect(page.locator('html')).toHaveAttribute('lang', 'en');
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
        width + 1,
      );
      await expect(page.locator('.site')).toHaveCSS('overflow', 'visible');
      await expect(page.locator('.audience-actions').first()).toHaveCSS('flex-direction', 'column');
      for (const selector of ['#steps-title br', '#audiences-title br']) {
        await expect(page.locator(selector)).not.toHaveCSS('display', 'none');
      }

      const overflow = await page
        .locator('main h1, main h2, main h3, main p')
        .evaluateAll((nodes) =>
          nodes
            .filter(
              (node) =>
                !node.closest('[inert], [aria-hidden="true"], .sr-only') &&
                node.clientWidth > 0 &&
                no¶»§q«^