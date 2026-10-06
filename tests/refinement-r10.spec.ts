import { expect, test } from '@playwright/test';

test('page content paints immediately while live search backgrounds are delayed', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.route(/(TurquoiseFlow|DotCascade)-.*\.js/, async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 1200));
    await route.continue();
  });
  await page.goto('./', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('#hero-title')).toBeVisible();
  await expect(page.locator('#root')).toHaveCSS('visibility', 'visible');
  await expect(page.locator('#root')).toHaveCSS('opacity', '1');
  await expect(page.locator('html')).not.toHaveAttribute('data-site-ready');
  await expect(page.locator('html')).toHaveAttribute('data-site-ready', 'true', { timeout: 10000 });
});

test('failed live search backgrounds leave the static backdrop and content visible', async ({
  page,
}) => {
  await page.route(/(TurquoiseFlow|DotCascade)-.*\.js/, async (route) => route.abort());
  await page.goto('./', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('#hero-title')).toBeVisible();
  await expect(page.locator('#root')).toHaveCSS('opacity', '1');
  const background = await page
    .locator('.search-preview')
    .evaluate((node) => getComputedStyle(node).backgroundImage);
  expect(background).not.toBe('none');
});

for (const [width, height] of [
  [1536, 740],
  [1366, 650],
  [1280, 600],
  [390, 844],
]) {
  test('search ¶»§q«^