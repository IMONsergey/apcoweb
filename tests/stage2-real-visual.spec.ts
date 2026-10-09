import { mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';
import { expect, test } from '@playwright/test';
import { siteRoutes } from '../src/content/routes';

const formats = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
] as const;

function slug(path: string) {
  return path === '/' ? 'home' : path.slice(1).replaceAll('/', '--');
}

for (const route of siteRoutes) {
  for (const format of formats) {
    for (const theme of ['light', 'dark'] as const) {
      test(`real unmasked visual ${slug(route.path)} ${format.name} ${theme}`, async ({
        page,
      }, testInfo) => {
        test.skip(testInfo.project.name !== 'chromium');
        test.setTimeout(90_000);
        await page.setViewportSize({ width: format.width, height: format.height });
        await page.addInitScript((mode) => localStorage.setItem('apcosys-theme-mode', mode), theme);
        await page.goto('.' + route.path, { waitUntil: 'networkidle' });
        await expect(page.locator('main h1')).toBeVisible();
        await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
        await page.evaluate(async () => {
          await document.fonts.ready;
          await new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
        });
        const destination = testInfo.outputPath(
          'stage2-real-visual',
          slug(route.path) + '-' + format.name + '-' + theme + '.png',
        );
        await mkdir(dirname(destination), { recursive: true });
        await page.screenshot({ path: destination, fullPage: true, caret: 'hide' });
        const fold = testInfo.outputPath(
          'stage2-real-first-fold',
          slug(route.path) + '-' + format.name + '-' + theme + '.png',
        );
        await mkdir(dirname(fold), { recursive: true });
        await page.screenshot({ path: fold, fullPage: false, caret: 'hide' });
      });
    }
  }
}

test('unmasked search result and product scene details', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'chromium');
  await page.goto('./');
  const example = page.locator('.search-scene__example');
  await example.locator('summary').click();
  await expect(example.locator('.search-scene__example-result')).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath('search-example-open.png'), fullPage: true });
  await page.goto('./platform/search-investigation');
  await page.locator('.stage-workbench__step').nth(2).click();
  await expect(page.locator('.product-evidence__details')).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath('investigation-host-open.png'), fullPage: true });
});
