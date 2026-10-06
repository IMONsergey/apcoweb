import { test, expect, type Page } from '@playwright/test';
import { writeFile } from 'node:fs/promises';
import { revealHeader, selectLanguage } from './helpers/locale';

async function visit(page: Page, width = 1440) {
  await page.setViewportSize({ width, height: 1000 });
  await page.goto('./?lang=en', { waitUntil: 'networkidle' });
  await expect(page.locator('html')).not.toHaveAttribute('data-page-entering');
  await page.evaluate(() => document.fonts.ready);
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

for (const width of [320, 390, 768, 1200, 1440, 1920]) {
  test(`language content determines natural dimensions and remains readable at ${width}px`, async ({
    page,
  }, info) => {
    await visit(page, width);
    const before = await readingGeometry(page);
    const englishActionWidth = (await page
      .locator('.hero-actions .double-button')
      .first()
      .boundingBox())!.width;
    expect(before.length).toBeGreaterThanOrEqual(7);
    for (const language of ['ru', 'en'] as const) {
      await selectLanguage(page, language);
      await expect(page.locator('html')).toHaveAttribute('lang', language);
      await expect(page.locator('html')).not.toHaveAttribute('data-locale-transition');
      const after = await readingGeometry(page);
      // Longer copy may change the layout. Returning to English must release all extra space.
      if (language === 'en') {
        for (const [index, rect] of after.entries()) {
          for (const dimension of ['left', 'top', 'width', 'height'] as const)
            expect(
              Math.abs(rect[dimension] - before[index][dimension]),
              `${dimension} of item ${index} after returning to English`,
            ).toBeLessThanOrEqual(1);
        }
      }
      if (width >= 600) {
        const actionSizes = await page
          .locator('.hero-actions .double-button')
          .evaluateAll((nodes) =>
            nodes.map((node) => {
              const label = node.querySelector('.double-button__label')!;
              const text = label.querySelector('.locale-text')!;
              const style = getComputedStyle(label);
              const contentWidth = text.getBoundingClientRect().width;
              const padding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
              const icon = node
                .querySelector('.double-button__icon')!
                .getBoundingClientRect().width;
              return {
                width: node.getBoundingClientRect().width,
                expected: contentWidth + padding + icon,
              };
            }),
          );
        for (const { width, expected } of actionSizes)
          expect(Math.abs(width - expected), 'button fits its current label').toBeLessThanOrEqual(
            1,
          );
        if (language === 'ru') {
          // The first hero action has a substantially longer Russian label.
          expect(actionSizes[0].width).toBeGreaterThan(englishActionWidth + 10);
        }
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
  test(`expanded FAQ retains disclosure and reflows its current language at ${width}px`, async ({
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
      await expect(page.locator('html')).not.toHaveAttribute('data-locale-transition');
      const answer = detail.locator('.faq-answer');
      const text = detail.locator('.faq-answer p');
      const answerBox = (await answer.boundingBox())!;
      const textBox = (await text.boundingBox())!;
      expect(textBox.y + textBox.height).toBeLessThanOrEqual(answerBox.y + answerBox.height + 1);
      if (language === 'en') {
        const after = await geometry();
        after.forEach((rect, index) => {
          expect(Math.abs(rect.top - before[index].top)).toBeLessThanOrEqual(1);
          expect(Math.abs(rect.height - before[index].height)).toBeLessThanOrEqual(1);
        });
      }
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
  expect(
    await page
      .locator('.footer-columns li')
      .first()
      .evaluate((node) => parseFloat(getComputedStyle(node).fontSize)),
  ).toBeCloseTo(14.6, 1);
});

test('R8 footer underline provides pointer and keyboard feedback without changing geometry', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await visit(page);
  const link = page.locator('.footer-columns a').first();
  await link.evaluate((node) => node.scrollIntoView({ block: 'center', behavior: 'instant' }));
  const geometry = () =>
    link.evaluate((node) => {
      const rect = node.getBoundingClientRect();
      return { x: rect.x + scrollX, y: rect.y + scrollY, width: rect.width, height: rect.height };
    });
  const before = await geometry();
  const scale = () =>
    link
      .locator('.locale-text')
      .evaluate((node) => new DOMMatrixReadOnly(getComputedStyle(node, '::after').transform).m11);
  expect(await scale()).toBe(0);
  await link.hover();
  await expect.poll(scale).toBe(1);
  expect(await geometry()).toEqual(before);
  await page.mouse.move(1, 1);
  await expect.poll(scale).toBe(0);
  await page.keyboard.press('Tab');
  await link.focus();
  await expect(link).toBeFocused();
  expect(await link.evaluate((node) => node.matches(':focus-visible'))).toBe(true);
  await expect.poll(scale).toBe(1);
  expect(await geometry()).toEqual(before);
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
