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
                node.scrollWidth > node.clientWidth + 2,
            )
            .map((node) => node.textContent),
        );

      expect(overflow).toEqual([]);

      const track = page.locator('#research-track');
      expect(await track.locator('.step-card').count()).toBe(5);

      await track.scrollIntoViewIfNeeded();
      await track.focus();
      await page.keyboard.press('End');
      await expect(page.locator('.counter')).toHaveText(
        width >= 1200 ? '3 / 3' : width >= 600 ? '4 / 4' : '5 / 5',
      );

      await page.keyboard.press('Home');
      await expect(page.locator('.counter')).toHaveText(
        width >= 1200 ? '1 / 3' : width >= 600 ? '1 / 4' : '1 / 5',
      );
    },
  );
}

test('five supplied scenes stay inert and pause outside the viewport', async ({ page }) => {
  test.setTimeout(90000);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.setViewportSize({ width: 1536, height: 864 });

  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));

  await page.goto('./', { waitUntil: 'networkidle' });
  await expect(page.locator('apcosys-product-demo')).toHaveCount(0);

  const track = page.locator('#research-track');
  await page.locator('.step-illustration').first().scrollIntoViewIfNeeded();
  await expect(page.locator('apcosys-product-demo[scene="query"]')).toBeAttached();

  await track.focus();
  await page.keyboard.press('End');
  await page.locator('.step-illustration').last().scrollIntoViewIfNeeded();
  await expect(page.locator('apcosys-product-demo')).toHaveCount(5);

  const scenes = await page.locator('apcosys-product-demo').evaluateAll((nodes) =>
    nodes.map((node) => ({
      scene: node.getAttribute('scene'),
      inert: (node as HTMLElement).inert,
    })),
  );

  expect(scenes.map((scene) => scene.scene)).toEqual([
    'query',
    'results',
    'host',
    'evidence',
    'suggestions',
  ]);
  expect(scenes.every((scene) => scene.inert)).toBe(true);

  await page.locator('#pricing').scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      page
        .locator('apcosys-product-demo')
        .evaluateAll((nodes) => nodes.every((node) => Reflect.get(node, '_timeline')?.paused())),
    )
    .toBe(true);

  expect(errors).toEqual([]);
});

test('height changes retain carousel and search state in English-only runtime', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1536, height: 864 });
  await page.goto('./?lang=ru', { waitUntil: 'networkidle' });

  await page.getByRole('searchbox').fill('apache country:us');
  await page.locator('#research-track').scrollIntoViewIfNeeded();
  await page.getByRole('button', { name: 'Next research step' }).click();
  await expect(page.locator('.counter')).toHaveText('2 / 3');

  await page.setViewportSize({ width: 1536, height: 740 });
  await expect(page.locator('.counter')).toHaveText('2 / 3');
  await expect(page.getByRole('searchbox')).toHaveValue('apache country:us');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});

test('components respond to their own width inside a wide viewport', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto('./', { waitUntil: 'networkidle' });

  await expect(page.locator('.counter')).toHaveText('1 / 3');

  await page.locator('#how-it-works').evaluate((node) => {
    (node as HTMLElement).style.width = '1100px';
  });
  await page.locator('#use-cases').evaluate((node) => {
    (node as HTMLElement).style.width = '1100px';
  });

  await expect(page.locator('.counter')).toHaveText('1 / 4');

  const cards = await page.locator('.audience-card').evaluateAll((nodes) =>
    nodes.map((node) => {
      const box = node.getBoundingClientRect();
      return { x: box.x, y: box.y, bottom: box.bottom };
    }),
  );

  expect(cards[0].x).toBe(cards[1].x);
  expect(cards[1].y).toBeGreaterThanOrEqual(cards[0].bottom);
});
