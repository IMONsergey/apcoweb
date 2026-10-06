import { expect, test } from '@playwright/test';

test('page appears with the prepared search background, without waiting for other decorative assets', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  let releaseArtwork = () => {};
  const pendingArtwork = new Promise<void>((resolve) => (releaseArtwork = resolve));
  await page.route(/AnimatedShape-.*\.js/, async (route) => {
    await pendingArtwork;
    await route.continue();
  });
  await page.goto('./?lang=en', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('#hero-title')).toBeAttached();
  await expect(page.locator('#site-preloader')).toHaveCount(0);
  await expect(page.locator('html')).toHaveAttribute('data-site-ready', 'true');
  for (const layer of ['.turquoise-flow', '.dot-cascade']) {
    await expect(page.locator(`.search-preview ${layer} canvas`)).toHaveAttribute(
      'data-render-ready',
      'frame',
    );
  }
  await expect(page.locator('#root')).toHaveCSS('opacity', '1', { timeout: 1200 });
  await expect(page.locator('.audience-art svg')).toHaveCount(0);
  releaseArtwork();
  await expect(page.locator('#root')).toHaveCSS('transform', 'none');
  await page.locator('[data-language-selector]').click();
  await page.getByRole('menuitemradio', { name: 'Русский', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
  await expect(page.locator('#root')).toHaveCSS('opacity', '1');
  await page.locator('#use-cases').scrollIntoViewIfNeeded();
  await expect(page.locator('.audience-art svg')).toHaveCount(2);
  await expect(page.locator('#root')).toHaveCSS('opacity', '1');
});

for (const [layer, chunk] of [
  ['flow', /TurquoiseFlow-.*\.js/],
  ['dots', /DotCascade-.*\.js/],
] as const) {
  test(`the whole page stays hidden until the delayed ${layer} background has painted`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    let releaseLayer = () => {};
    const pendingLayer = new Promise<void>((resolve) => (releaseLayer = resolve));
    await page.route(chunk, async (route) => {
      await pendingLayer;
      await route.continue();
    });
    await page.goto('./?lang=en', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('#hero-title')).toBeAttached();
    const other = layer === 'flow' ? '.dot-cascade' : '.turquoise-flow';
    await expect(page.locator(`.search-preview ${other} canvas`)).toHaveAttribute(
      'data-render-ready',
      'frame',
    );
    // The former 1600 ms HTML timer must never expose an incomplete background.
    await page.waitForTimeout(1750);
    await expect(page.locator('html')).not.toHaveAttribute('data-site-ready');
    await expect(page.locator('#root')).toHaveCSS('opacity', '0');
    await expect(page.locator('#root')).toHaveCSS('visibility', 'hidden');
    await page.keyboard.press('Tab');
    expect(
      await page.locator('#root').evaluate((root) => root.contains(document.activeElement)),
    ).toBe(false);
    releaseLayer();
    await expect(page.locator('html')).toHaveAttribute('data-site-ready', 'true');
    await expect(page.locator('.search-preview canvas[data-render-ready="frame"]')).toHaveCount(2);
    await expect(page.locator('#root')).toHaveCSS('opacity', '1');
  });
}

test('a loaded background module does not release the site before its first usable canvas frame', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getBoundingClientRect;
    const state = window as Window & { holdFlowSize?: boolean };
    state.holdFlowSize = true;
    HTMLCanvasElement.prototype.getBoundingClientRect = function () {
      if (state.holdFlowSize && this.classList.contains('turquoise-flow__canvas')) {
        return new DOMRect(0, 0, 0, 0);
      }
      return original.call(this);
    };
  });
  await page.goto('./?lang=en', { waitUntil: 'networkidle' });
  const canvas = page.locator('.search-preview .turquoise-flow canvas');
  await expect(canvas).toBeAttached();
  await expect(page.locator('.search-preview .dot-cascade canvas')).toHaveAttribute(
    'data-render-ready',
    'frame',
  );
  await expect(canvas).not.toHaveAttribute('data-render-ready');
  await expect(page.locator('html')).not.toHaveAttribute('data-site-ready');
  await expect(page.locator('#root')).toHaveCSS('opacity', '0');
  await canvas.evaluate((node) => {
    (window as Window & { holdFlowSize?: boolean }).holdFlowSize = false;
    // Trigger the real engine's ResizeObserver once the first usable size is available.
    node.style.height = 'calc(100% - 1px)';
  });
  await expect(canvas).toHaveAttribute('data-render-ready', 'frame');
  await expect(page.locator('#root')).toHaveCSS('opacity', '1');
  await canvas.evaluate((node) => (node.style.height = ''));
  expect(
    await canvas.evaluate((node) =>
      Array.from((node as HTMLCanvasElement).getContext('2d')!.getImageData(0, 0, 1, 1).data),
    ),
  ).not.toEqual([0, 0, 0, 0]);
});

test('a failed critical chunk supplies a static background before revealing the page', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.route(/TurquoiseFlow-.*\.js/, (route) => route.abort('failed'));
  await page.goto('./?lang=en', { waitUntil: 'networkidle' });
  await expect(page.locator('.search-preview .visual-fallback--flow')).toBeVisible();
  await expect(page.locator('.search-preview .visual-fallback--flow')).not.toHaveCSS(
    'background-image',
    'none',
  );
  await expect(page.locator('.search-preview .dot-cascade canvas')).toHaveAttribute(
    'data-render-ready',
    'frame',
  );
  await expect(page.locator('#root')).toHaveCSS('opacity', '1');
});

test('unavailable canvas uses the complete static backdrop instead of retaining a hidden page', async ({
  page,
}) => {
  await page.addInitScript(() => {
    HTMLCanvasElement.prototype.getContext = () => null;
  });
  await page.goto('./?lang=en', { waitUntil: 'networkidle' });
  await expect(page.locator('.search-preview canvas[data-render-ready="fallback"]')).toHaveCount(2);
  await expect(page.locator('.search-preview .dot-cascade__fallback')).toBeVisible();
  await expect(page.locator('.search-preview .turquoise-flow')).not.toHaveCSS(
    'background-image',
    'none',
  );
  await expect(page.locator('#root')).toHaveCSS('opacity', '1');
});

for (const [width, height] of [
  [1440, 900],
  [1920, 1080],
]) {
  test(`search fits the first screen then settles inside the stationary scene at ${width}px`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.setViewportSize({ width, height });
    await page.goto('./?lang=en', { waitUntil: 'networkidle' });
    const scene = page.locator('.search-scene');
    const form = scene.locator('.search-form');
    const heading = scene.locator('h3');
    const startScene = (await scene.boundingBox())!;
    const startForm = (await form.boundingBox())!;
    // Allow one physical pixel for browser-specific fractional layout rounding.
    expect(startForm.y + startForm.height).toBeLessThanOrEqual(height - 23);
    expect((await heading.boundingBox())!.y).toBeGreaterThan(startScene.y + 48);
    const shift = () =>
      scene
        .locator('.search-scene__content')
        .evaluate((node) =>
          parseFloat((node as HTMLElement).style.getPropertyValue('--search-lift')),
        );
    const initial = await shift();
    expect(initial).toBeLessThan(-10);
    await form.getByRole('searchbox').fill('example.org');
    const settle = Math.max(180, startScene.y - 160);
    await page.evaluate((y) => window.scrollTo({ top: y / 2, behavior: 'instant' }), settle);
    await expect.poll(shift).toBeGreaterThan(initial);
    expect(await shift()).toBeLessThan(0);
    const actualScene = (await scene.boundingBox())!;
    const scroll = await page.evaluate(() => window.scrollY);
    expect(Math.abs(actualScene.y + scroll - startScene.y)).toBeLessThan(1);
    await page.evaluate((y) => window.scrollTo({ top: y + 1, behavior: 'instant' }), settle);
    await expect.poll(shift).toBe(0);
    expect((await form.boundingBox())!.height).toBeCloseTo(startForm.height, 1);
    await expect(form.getByRole('searchbox')).toHaveValue('example.org');
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await expect.poll(shift).toBeCloseTo(initial, 1);
  });
}

test('audience artwork is ready before scrolling while the API remains deferred', async ({
  page,
}) => {
  const loaded: string[] = [];
  page.on('request', (request) => loaded.push(request.url()));
  await page.goto('./?lang=en', { waitUntil: 'networkidle' });
  expect(await page.evaluate(() => window.scrollY)).toBe(0);
  await expect(page.locator('.audience-art svg')).toHaveCount(2);
  expect(await page.locator('.audience-art svg circle').count()).toBeGreaterThan(10);
  expect(loaded.some((url) => /AnimatedShape-.*\.js/.test(url))).toBe(true);
  expect(loaded.some((url) => /ApiDemoMount-.*\.js/.test(url))).toBe(false);
  expect(
    await page
      .locator('.audience-art .animated-shape')
      .first()
      .evaluate((node) => getComputedStyle(node).animationName),
  ).toBe('none');
});

test('API interface and stacked layers fit the content grid on desktop tablet and phone', async ({
  page,
}) => {
  for (const width of [320, 390, 768, 1024, 1440, 1920, 2560]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('./?lang=en', { waitUntil: 'networkidle' });
    await page.locator('#api').scrollIntoViewIfNeeded();
    await expect(page.locator('.api-demo-frame')).toHaveAttribute('data-ready', 'true');
    const grid = (await page.locator('.api-grid').boundingBox())!;
    const frame = (await page.locator('.api-demo-frame').boundingBox())!;
    expect(frame.x).toBeGreaterThanOrEqual(grid.x);
    expect(frame.x + frame.width + 16).toBeLessThanOrEqual(grid.x + grid.width + 1);
    expect(frame.y).toBeGreaterThanOrEqual(grid.y);
    await expect(page.locator('.api-demo-host')).toHaveCSS('overflow', 'hidden');
    await expect(page.locator('.api-demo-frame')).toHaveCSS(
      'border-top-left-radius',
      width < 600 ? '8px' : '12px',
    );
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
      width + 1,
    );
  }
});

test('free hint is centered under the current search field in both languages', async ({ page }) => {
  for (const width of [320, 390, 768, 1199])
    for (const lang of ['en', 'ru']) {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto(`./?lang=${lang}`, { waitUntil: 'networkidle' });
      const form = page.locator('.search-form');
      const hint = page.locator('.search-free-note');
      const formBox = (await form.boundingBox())!;
      const hintBox = (await hint.boundingBox())!;
      expect(
        Math.abs(hintBox.x + hintBox.width / 2 - (formBox.x + formBox.width / 2)),
      ).toBeLessThan(1);
      await expect(hint).toHaveCSS('text-align', 'center');
    }
});

test('navigation reveals from the right, survives reversal and restores keyboard focus', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./?lang=en', { waitUntil: 'networkidle' });
  const trigger = page.getByRole('button', { name: 'Open navigation' });
  const dialog = page.locator('.mobile-navigation');
  await trigger.click();
  await expect(dialog).toHaveAttribute('open', '');
  const direction = await dialog.evaluate((node) =>
    node
      .getAnimations()
      .flatMap((animation) => (animation.effect as KeyframeEffect).getKeyframes())
      .some((frame) => String(frame.transform).includes('translateX')),
  );
  expect(direction).toBe(true);
  await expect
    .poll(() =>
      dialog.evaluate(
        (node) => node.getAnimations().filter((item) => item.playState === 'running').length,
      ),
    )
    .toBe(0);
  await expect(dialog).toHaveCSS('opacity', '1');
  await page.keyboard.press('Escape');
  // Reopen during the short closing phase through the same mounted trigger.
  await trigger.evaluate((node) => (node as HTMLButtonElement).click());
  await expect(dialog).toHaveAttribute('data-modal-phase', 'opening');
  await expect(dialog).toHaveAttribute('open', '');
  expect(await dialog.evaluate((node) => node.contains(document.activeElement))).toBe(true);
  await page.keyboard.press('Tab');
  // Native Safari keyboard access may move Tab to browser chrome, never to the covered page.
  expect(
    await dialog.evaluate(
      (node) =>
        node.contains(document.activeElement) ||
        (!document.hasFocus() && document.activeElement === document.body),
    ),
  ).toBe(true);
  await page.keyboard.press('Escape');
  await expect(dialog).not.toHaveAttribute('open', '');
  await expect(trigger).toBeFocused();
  expect(await page.locator('body').evaluate((node) => node.style.overflow)).toBe('');
});

test('reduced motion shows the page directly and keeps the search scene static', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto('./?lang=en', { waitUntil: 'networkidle' });
  await expect(page.locator('#site-preloader')).toHaveCount(0);
  await expect(page.locator('#root')).toHaveCSS('opacity', '1');
  await expect(page.locator('#root')).toHaveCSS('transition-property', 'none');
  await expect(page.locator('.search-scene__content')).toHaveCSS('transform', 'none');
});
