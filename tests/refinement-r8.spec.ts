import { test, expect, type Page } from '@playwright/test';
import { writeFile } from 'node:fs/promises';
import { revealHeader, selectLanguage } from './helpers/locale';

async function visit(page: Page, width = 1440) {
  await page.setViewportSize({ width, height: 1000 });
  await page.goto('./?lang=en', { waitUntil: 'networkidle' });
  await expect(page.locator('html')).toHaveAttribute('data-locale-layout', 'ready');
}

const readingGeometry = (page: Page) =>
  page
    .locator(
      '.hero, .search-preview, #use-cases, #data, #api, #pricing, .hero-actions .double-button, .site-header .nav-trigger, .header-signin, .header-signup, .language-control .language',
    )
    .evaluateAll((nodes) =>
      nodes.map((node) => {
        const rect = node.getBoundingClientRect();
        return { top: rect.top + scrollY, left: rect.left, width: rect.width, height: rect.height };
      }),
    );

for (const width of [320, 390, 768, 1440, 1920]) {
  test(`R8 stable language geometry and readable layout at ${width}px`, async ({ page }, info) => {
    await visit(page, width);
    const before = await readingGeometry(page);
    expect(before.length).toBeGreaterThanOrEqual(7);
    for (const language of ['ru', 'en'] as const) {
      await selectLanguage(page, language);
      await expect(page.locator('html')).toHaveAttribute('lang', language);
      await expect(page.locator('html')).not.toHaveAttribute('data-locale-transition');
      const after = await readingGeometry(page);
      for (const [index, rect] of after.entries()) {
        expect(
          Math.abs(rect.left - before[index].left),
          `left of item ${index}`,
        ).toBeLessThanOrEqual(1);
        expect(
          Math.abs(rect.width - before[index].width),
          `width of item ${index}`,
        ).toBeLessThanOrEqual(1);
        expect(Math.abs(rect.top - before[index].top), `top of item ${index}`).toBeLessThanOrEqual(
          1,
        );
        expect(
          Math.abs(rect.height - before[index].height),
          `height of item ${index}`,
        ).toBeLessThanOrEqual(1);
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
        width + 1,
      );
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
    }
    await page.locator('[data-language-selector]').click();
    await expect(page.locator('.language-panel')).toHaveCSS('opacity', '1');
    expect((await page.locator('.language-panel').boundingBox())!.width).toBeLessThan(160);
    if ([390, 1920].includes(width))
      await page.screenshot({ path: info.outputPath(`r8-hero-menu-${width}.png`) });
    await page.keyboard.press('Escape');
    if (width < 1200) {
      await expect(page.getByRole('searchbox')).toHaveAttribute(
        'placeholder',
        /Domain, IP\sor\sattribute/,
      );
      await expect(page.locator('.search-free-note')).toHaveText('It’s free');
      await page.getByRole('searchbox').fill(' ');
      await page.getByRole('button', { name: 'Search APCOSYS', exact: true }).click();
      await expect(page.locator('.search-error')).toBeVisible();
      const note = (await page.locator('.search-free-note').boundingBox())!;
      const error = (await page.locator('.search-error').boundingBox())!;
      expect(error.y).toBeGreaterThanOrEqual(note.y + note.height);
    }
    if ([390, 1920].includes(width)) {
      await page.locator('.closing-scene').scrollIntoViewIfNeeded();
      await page
        .locator('.closing-scene')
        .screenshot({ path: info.outputPath(`r8-closing-${width}.png`) });
    }
  });
}

for (const width of [390, 1440]) {
  test(`R8 expanded FAQ retains disclosure and reading geometry at ${width}px`, async ({
    page,
  }) => {
    await visit(page, width);
    const detail = page.locator('.faq-list details').nth(1);
    await detail.locator('summary').click();
    await expect(detail).toHaveAttribute('open', '');
    await revealHeader(page);
    const geometry = () =>
      page.locator('.faq-list, .closing-section').evaluateAll((nodes) =>
        nodes.map((node) => {
          const rect = node.getBoundingClientRect();
          return { top: rect.top + scrollY, height: rect.height };
        }),
      );
    const before = await geometry();
    for (const language of ['ru', 'en'] as const) {
      await selectLanguage(page, language);
      await expect(page.locator('html')).toHaveAttribute('lang', language);
      await expect(detail).toHaveAttribute('open', '');
      const after = await geometry();
      after.forEach((rect, index) => {
        expect(Math.abs(rect.top - before[index].top)).toBeLessThanOrEqual(1);
        expect(Math.abs(rect.height - before[index].height)).toBeLessThanOrEqual(1);
      });
    }
  });

  test(`R8 directional header keeps menus and keyboard usable at ${width}px`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await visit(page, width);
    const header = page.locator('.site-header');
    await page.mouse.wheel(0, 1200);
    await expect(header).toHaveAttribute('data-hidden', 'true');
    await expect(header).toHaveAttribute('inert', '');
    await expect(header).toHaveAttribute('data-compact', 'true');
    expect((await header.boundingBox())!.height).toBeCloseTo(width < 600 ? 64 : 72, 2);
    await revealHeader(page);
    await page.locator('[data-language-selector]').click();
    await expect(page.locator('.language-panel')).toHaveCSS('opacity', '1');
    await page.mouse.wheel(0, 180);
    await expect(header).toHaveAttribute('data-hidden', 'false');
    await page.keyboard.press('Escape');
    await expect(page.locator('[data-language-selector]')).toBeFocused();
    await page.locator('[data-language-selector]').blur();
    await page.mouse.wheel(0, 180);
    await expect(header).toHaveAttribute('data-hidden', 'true');
    await page.keyboard.press('Tab');
    await expect(header).toHaveAttribute('data-hidden', 'false');
    await expect(header).not.toHaveAttribute('inert');
    expect(
      await page
        .locator('body')
        .evaluate(() => document.activeElement?.closest('[inert]') === null),
    ).toBe(true);
  });
}

test('R8 API demo loads near its section, runs the supplied sequence and pauses off screen', async ({
  page,
}, info) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  const loaded: string[] = [];
  page.on('request', (request) => loaded.push(request.url()));
  await visit(page, 1920);
  expect([...new Set(loaded.filter((url) => /instrument-sans.*\.woff2/.test(url)))]).toHaveLength(
    1,
  );
  expect([...new Set(loaded.filter((url) => /inter-cyrillic.*\.woff2/.test(url)))]).toHaveLength(1);
  expect([...new Set(loaded.filter((url) => /inter-latin.*\.woff2/.test(url)))]).toHaveLength(1);
  expect(loaded.some((url) => /ApiDemoMount-.*\.js/.test(url))).toBe(false);
  await expect(page.locator('api-developer-demo')).toHaveCount(0);
  await page.locator('#api').scrollIntoViewIfNeeded();
  await expect(page.locator('.api-demo-frame')).toHaveAttribute('data-ready', 'true');
  const demo = page.locator('api-developer-demo');
  await expect(demo).toHaveAttribute('inert', '');
  await expect(demo.locator('input').first()).toHaveAttribute('readonly', '');
  expect(loaded.some((url) => /ApiDemoMount-.*\.js/.test(url))).toBe(true);
  const time = () => demo.evaluate((node) => Reflect.get(node, '_timeline').time() as number);
  const initial = await time();
  await expect.poll(time).toBeGreaterThan(initial + 0.1);
  await demo.evaluate((node) => {
    Reflect.get(node, 'pause').call(node);
    Reflect.get(node, '_timeline').time(11.8, false);
  });
  await expect(demo.locator('[name="limit"]')).toHaveValue('25');
  await expect(demo.locator('[name="q"]')).toHaveValue('revenue');
  await expect(demo.locator('.status-label')).toHaveText('200 OK');
  await page
    .locator('.api-demo-frame')
    .screenshot({ path: info.outputPath('r8-api-response-1920.png') });
  await demo.evaluate((node) => {
    Reflect.get(node, '_timeline').time(26, false);
  });
  await expect(demo.locator('.completion-card')).toBeVisible();
  await page
    .locator('.api-demo-frame')
    .screenshot({ path: info.outputPath('r8-api-completion-1920.png') });
  await demo.evaluate((node) => Reflect.get(node, 'play').call(node));
  await page.locator('#hero-title').scrollIntoViewIfNeeded();
  await expect
    .poll(() => demo.evaluate((node) => Reflect.get(node, '_timeline').paused() as boolean))
    .toBe(true);
  await page.locator('#api').scrollIntoViewIfNeeded();
  await expect
    .poll(() => demo.evaluate((node) => Reflect.get(node, '_timeline').paused() as boolean))
    .toBe(false);
  expect(loaded.filter((url) => url.startsWith('https://api.apcosys.com'))).toEqual([]);
});

test('R8 API reduced motion, phone closing composition and large-screen reading scale', async ({
  page,
}, info) => {
  await visit(page, 390);
  await page.locator('#api').scrollIntoViewIfNeeded();
  await expect(page.locator('.api-demo-frame')).toHaveAttribute('data-ready', 'true');
  const demo = page.locator('api-developer-demo');
  await expect(demo.locator('.status-label')).toHaveText('200 OK');
  expect(await demo.evaluate((node) => Reflect.get(node, '_timeline'))).toBeNull();
  const frame = (await page.locator('.api-demo-frame').boundingBox())!;
  expect(frame.width / frame.height).toBeCloseTo(2048 / 1511, 2);
  await page.locator('.api-demo-frame').screenshot({ path: info.outputPath('r8-api-phone.png') });
  await page.locator('.closing-scene').scrollIntoViewIfNeeded();
  const picture = (await page.locator('.closing-scene > picture').boundingBox())!;
  const account = (await page.locator('.closing-scene .closing-account').boundingBox())!;
  expect(picture.y + picture.height).toBeLessThan(account.y);
  const small = await page
    .locator('.plan-description')
    .first()
    .evaluate((node) => parseFloat(getComputedStyle(node).fontSize));
  await page.setViewportSize({ width: 1920, height: 1000 });
  await expect
    .poll(() =>
      page
        .locator('.plan-description')
        .first()
        .evaluate((node) => parseFloat(getComputedStyle(node).fontSize)),
    )
    .toBeGreaterThan(small);
  await expect(page.locator('.footer-columns li').first()).toHaveCSS('font-size', '14.6px');
});

test('R8 footer underline provides pointer and keyboard feedback without changing geometry', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await visit(page);
  const link = page.locator('.footer-columns a').first();
  await link.scrollIntoViewIfNeeded();
  const before = await link.boundingBox();
  const scale = () =>
    link
      .locator('.locale-text')
      .evaluate((node) => new DOMMatrixReadOnly(getComputedStyle(node, '::after').transform).m11);
  expect(await scale()).toBe(0);
  await link.hover();
  await expect.poll(scale).toBe(1);
  expect(await link.boundingBox()).toEqual(before);
  await page.mouse.move(1, 1);
  await expect.poll(scale).toBe(0);
  await link.focus();
  await page.keyboard.press('Tab');
  await page.keyboard.press('Shift+Tab');
  await expect(link).toBeFocused();
  await expect.poll(scale).toBe(1);
});

test('R8 complete reading-flow audit evidence at phone and large desktop widths', async ({
  page,
}, info) => {
  for (const width of [390, 1920]) {
    await visit(page, width);
    await page.screenshot({ path: info.outputPath(`r8-flow-hero-${width}.png`) });
    for (const [name, selector] of [
      ['search', '.search-scene'],
      ['audiences', '#use-cases'],
      ['data', '#data'],
      ['api', '#api'],
      ['pricing', '#pricing'],
      ['closing', '.closing-scene'],
      ['footer', '.footer'],
    ] as const) {
      const section = page.locator(selector);
      await section.scrollIntoViewIfNeeded();
      if (name === 'audiences') await expect(section.locator('.visual svg').first()).toBeVisible();
      if (name === 'data') await expect(section.locator('.visual canvas').first()).toBeVisible();
      if (name === 'api')
        await expect(section.locator('.api-demo-frame')).toHaveAttribute('data-ready', 'true');
      await section.screenshot({ path: info.outputPath(`r8-flow-${name}-${width}.png`) });
    }
    // A full-page record keeps fixed navigation out of the middle of section crops.
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await expect(page.locator('.site-header')).toHaveAttribute('data-hidden', 'false');
    await page.screenshot({ path: info.outputPath(`r8-flow-full-${width}.png`), fullPage: true });
    const geometry: Record<string, { x: number; y: number; width: number; height: number }> = {};
    for (const [name, selector] of [
      ['hero', '.hero'],
      ['search', '.search-scene'],
      ['audiences', '#use-cases'],
      ['data', '#data'],
      ['api', '#api'],
      ['pricing', '#pricing'],
      ['closing', '.closing-scene'],
      ['footer', '.footer'],
    ] as const) {
      geometry[name] = await page.locator(selector).evaluate((node) => {
        const rect = node.getBoundingClientRect();
        return { x: rect.x + scrollX, y: rect.y + scrollY, width: rect.width, height: rect.height };
      });
    }
    await writeFile(
      info.outputPath(`r8-flow-geometry-${width}.json`),
      JSON.stringify(geometry, null, 2),
    );
  }
});
