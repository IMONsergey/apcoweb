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
  test(`intrinsic composition and complete EN/RU copy at ${width}x${height}`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    for (const language of ['en', 'ru']) {
      await page.goto(`./?lang=${language}`, { waitUntil: 'networkidle' });
      await expect(page.locator('html')).not.toHaveAttribute('data-page-entering');
      await page.evaluate(() => document.fonts.ready);
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
      const before = await track.locator('.step-card').count();
      expect(before).toBe(5);
      await track.scrollIntoViewIfNeeded();
      await track.focus();
      await page.keyboard.press('End');
      await expect(page.locator('.counter')).toHaveText(
        width >= 1200 ? '3 / 3' : width >= 600 ? '4 / 4' : '5 / 5',
      );
      await page.locator('.step-illustration').last().scrollIntoViewIfNeeded();
      const scene = page.locator('apcosys-product-demo[scene="suggestions"]');
      await expect(scene).toBeAttached();
      await expect
        .poll(() =>
          scene.evaluate((node) => {
            const viewport = node.shadowRoot?.querySelector('.viewport');
            const frame = node.shadowRoot?.querySelector('.frame');
            if (!viewport || !frame) return false;
            const box = viewport.getBoundingClientRect(),
              drawing = frame.getBoundingClientRect();
            return (
              box.width > 0 &&
              drawing.width > 0 &&
              drawing.width <= box.width + 1 &&
              drawing.height <= box.height + 1
            );
          }),
        )
        .toBe(true);
      expect(await scene.evaluate((node) => (node as HTMLElement).inert)).toBe(true);
      await page.keyboard.press('Home');
      await track.focus();
      await page.keyboard.press('Home');
      await expect(page.locator('.counter')).toHaveText(
        width >= 1200 ? '1 / 3' : width >= 600 ? '1 / 4' : '1 / 5',
      );
    }
  });
}

test('five supplied scenes loop, stay inert and pause outside the viewport', async ({ page }) => {
  test.setTimeout(90000);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.setViewportSize({ width: 1536, height: 864 });
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('./?lang=en', { waitUntil: 'networkidle' });
  await expect(page.locator('html')).not.toHaveAttribute('data-page-entering');
  await expect(page.locator('apcosys-product-demo')).toHaveCount(0);
  const track = page.locator('#research-track');
  await page.locator('.step-illustration').first().scrollIntoViewIfNeeded();
  await expect(page.locator('apcosys-product-demo[scene="query"]')).toBeAttached();
  await page.waitForTimeout(12000);
  await track.focus();
  await page.keyboard.press('End');
  await page.locator('.step-illustration').last().scrollIntoViewIfNeeded();
  await expect(page.locator('apcosys-product-demo')).toHaveCount(5);
  await page.waitForTimeout(12000);
  const scenes = await page.locator('apcosys-product-demo').evaluateAll((nodes) =>
    nodes.map((node) => {
      const timeline = Reflect.get(node, '_timeline');
      return {
        scene: node.getAttribute('scene'),
        time: timeline?.totalTime(),
        inert: (node as HTMLElement).inert,
      };
    }),
  );
  expect(scenes.map((scene) => scene.scene)).toEqual([
    'query',
    'results',
    'host',
    'evidence',
    'suggestions',
  ]);
  for (const scene of scenes) {
    expect(scene.inert).toBe(true);
    expect(scene.time, scene.scene ?? '').toBeGreaterThan(0);
  }
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

test('height and container changes retain carousel, search and locale state', async ({ page }) => {
  await page.setViewportSize({ width: 1536, height: 864 });
  await page.goto('./?lang=ru', { waitUntil: 'networkidle' });
  await expect(page.locator('html')).not.toHaveAttribute('data-page-entering');
  await page.getByRole('searchbox').fill('apache country:us');
  await page.locator('#research-track').scrollIntoViewIfNeeded();
  await page.getByRole('button', { name: 'Следующий шаг исследования' }).click();
  await expect(page.locator('.counter')).toHaveText('2 / 3');
  await page.setViewportSize({ width: 1536, height: 740 });
  await expect(page.locator('.counter')).toHaveText('2 / 3');
  await expect(page.getByRole('searchbox')).toHaveValue('apache country:us');
  await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
});

test('components respond to their own width inside a wide viewport', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto('./?lang=en', { waitUntil: 'networkidle' });
  await expect(page.locator('html')).not.toHaveAttribute('data-page-entering');
  await page.getByRole('searchbox').fill('port:443');
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
  await expect(page.getByRole('searchbox')).toHaveValue('port:443');
});
