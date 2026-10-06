import { expect, test } from '@playwright/test';

test('page content paints immediately while live search backgrounds are delayed', async ({ page }) => {
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

test('failed live search backgrounds leave the static backdrop and content visible', async ({ page }) => {
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
  test('search remains composed and usable at ' + width + 'x' + height, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.goto('./', { waitUntil: 'networkidle' });
    const scene = page.locator('.search-scene');
    const box = (await scene.boundingBox())!;
    expect(box.width).toBeLessThanOrEqual(width + 1);
    await expect(page.getByRole('searchbox')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
      width + 1,
    );
  });
}

test('audience artwork is lazy while API remains deferred until its section approaches', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('./', { waitUntil: 'networkidle' });
  await expect(page.locator('api-developer-demo')).toHaveCount(0);
  await page.locator('#use-cases').scrollIntoViewIfNeeded();
  await expect(page.locator('.audience-art svg')).toHaveCount(2);
  await expect(page.locator('api-developer-demo')).toHaveCount(0);
});

test('API interface and stacked layers fit the content grid', async ({ page }) => {
  for (const [width, height] of [
    [1440, 900],
    [768, 1024],
    [390, 844],
  ]) {
    await page.setViewportSize({ width, height });
    await page.goto('./', { waitUntil: 'networkidle' });
    await page.locator('#api').scrollIntoViewIfNeeded();
    const box = await page.locator('.api-demo-frame').boundingBox();
    expect(box).not.toBeNull();
    expect(box!.x + box!.width).toBeLessThanOrEqual(width + 1);
  }
});

test('free hint stays aligned under the compact search field', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./', { waitUntil: 'networkidle' });
  const hint = page.locator('.search-free-note');
  await expect(hint).toBeVisible();
  const search = await page.locator('.search-form').boundingBox();
  const note = await hint.boundingBox();
  expect(note!.x).toBeGreaterThanOrEqual(search!.x);
  expect(note!.x + note!.width).toBeLessThanOrEqual(search!.x + search!.width + 1);
});

test('navigation reveal survives reversal and restores keyboard focus', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./', { waitUntil: 'networkidle' });
  const toggle = page.getByRole('button', { name: 'Open navigation' });
  await toggle.click();
  const dialog = page.getByRole('dialog', { name: 'Navigation' });
  await expect(dialog).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(toggle).toBeFocused();
});

test('reduced motion shows the page directly and keeps the search scene static', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./', { waitUntil: 'networkidle' });
  await expect(page.locator('#root')).toHaveCSS('opacity', '1');
  await expect(page.locator('#hero-title')).toBeVisible();
});
