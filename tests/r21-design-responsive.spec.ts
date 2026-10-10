import { expect, test } from '@playwright/test';
import { siteRoutes } from '../src/content/routes';

const widths = [
  320, 360, 375, 390, 430, 599, 768, 1024, 1199, 1280, 1366, 1440, 1920, 2560,
] as const;

for (const route of siteRoutes) {
  for (const theme of ['light', 'dark'] as const) {
    test(`R21 responsive integrity ${route.path} in ${theme}`, async ({ page }) => {
      test.setTimeout(120_000);
      await page.setViewportSize({ width: widths[0], height: 844 });
      await page.addInitScript((mode) => localStorage.setItem('apcosys-theme-mode', mode), theme);
      await page.goto('.' + route.path);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
      await page.evaluate(() => document.fonts.ready);

      for (const width of widths) {
        await page.setViewportSize({
          width,
          height: width >= 1366 ? (width >= 1920 ? 1080 : 768) : 844,
        });
        const result = await page.evaluate(() => ({
          viewport: window.innerWidth,
          scrollWidth: document.documentElement.scrollWidth,
          title: document.querySelector('main h1')?.getBoundingClientRect(),
        }));
        expect(result.scrollWidth, `${route.path} ${theme} at ${width}px`).toBeLessThanOrEqual(
          result.viewport + 2,
        );
        expect(result.title?.width ?? 0).toBeGreaterThan(0);
      }
    });
  }
}
