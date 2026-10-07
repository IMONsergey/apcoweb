import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

async function chooseTheme(
  page: import('@playwright/test').Page,
  name: 'System' | 'Light' | 'Dark',
) {
  await page.getByRole('button', { name: 'Appearance', exact: true }).click();
  await page.getByRole('menuitemradio', { name, exact: true }).click();
}

test('system theme resolves before the app and follows OS color scheme', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('./', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('html')).toHaveAttribute('data-theme-mode', 'system');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute('content', '#0D1113');
  await page.emulateMedia({ colorScheme: 'light' });
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});

test('manual dark choice persists and reloads already resolved', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('./');
  await chooseTheme(page, 'Dark');
  await expect(page.locator('html')).toHaveAttribute('data-theme-mode', 'dark');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.locator('.step-illustration > img').first()).toHaveAttribute(
    'src',
    /-dark\.webp$/,
  );
  expect(await page.evaluate(() => localStorage.getItem('apcosys-theme-mode'))).toBe('dark');
  await page.reload({ waitUntil: 'domcontentloaded' });
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

test('theme switch preserves reviewed layout geometry', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('./', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator('html')).toHaveAttribute('data-site-ready', 'true');
  const selectors = [
    '.hero h1',
    '.step-card:first-child',
    '.audience-card:first-child',
    '.plan-card:first-child',
    '.faq-list details:first-child summary',
  ];
  await page.locator('.faq-list details:first-child').scrollIntoViewIfNeeded();
  await page.mouse.wheel(0, -140);
  await expect(page.getByRole('button', { name: 'Appearance', exact: true })).toBeVisible();
  await page.waitForTimeout(100);
  const boxes = async () =>
    Promise.all(
      selectors.map(async (selector) =>
        page.locator(selector).evaluate((element) => {
          const box = element.getBoundingClientRect();
          return { x: box.x, y: box.y + window.scrollY, width: box.width, height: box.height };
        }),
      ),
    );
  const light = await boxes();
  await chooseTheme(page, 'Dark');
  await page.waitForTimeout(300);
  const dark = await boxes();
  dark.forEach((box, index) => {
    expect(Math.abs(box.x - light[index].x), selectors[index]).toBeLessThanOrEqual(0.5);
    expect(Math.abs(box.y - light[index].y), selectors[index]).toBeLessThanOrEqual(0.5);
    expect(Math.abs(box.width - light[index].width), selectors[index]).toBeLessThanOrEqual(0.5);
    expect(Math.abs(box.height - light[index].height), selectors[index]).toBeLessThanOrEqual(0.5);
  });
});

test('dark theme replaces core surfaces instead of leaving light islands', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('./');
  await chooseTheme(page, 'Dark');
  await expect(page.locator('.hero')).toHaveCSS('background-color', 'rgb(21, 27, 31)');
  await expect(page.locator('.audience-card').first()).toHaveCSS(
    'background-color',
    'rgb(21, 27, 31)',
  );
  await expect(page.locator('.plan-card').first()).toHaveCSS('background-color', 'rgb(21, 27, 31)');
  await expect(page.locator('.api-section')).toHaveCSS('background-color', 'rgb(3, 122, 143)');
});

test('product demos use dark paint while the API composition stays theme-invariant', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('./');
  await chooseTheme(page, 'Dark');
  await page.locator('.step-illustration').first().scrollIntoViewIfNeeded();
  const product = page.locator('apcosys-product-demo').first();
  await expect(product).toBeAttached({ timeout: 10_000 });
  expect(
    (
      await product.evaluate((node) =>
        getComputedStyle(node).getPropertyValue('--demo-c-ffffff').trim(),
      )
    ).toLowerCase(),
  ).toBe('#14191c');
  await page.locator('.api-demo-frame').scrollIntoViewIfNeeded();
  const api = page.locator('api-developer-demo');
  await expect(api).toBeAttached({ timeout: 10_000 });
  expect(await api.evaluate((node) => getComputedStyle(node).backgroundColor)).toBe(
    'rgb(255, 255, 255)',
  );
  expect(
    await api.evaluate(
      (node) =>
        getComputedStyle(node.shadowRoot?.querySelector('.completion-card') as Element)
          .backgroundColor,
    ),
  ).toBe('rgb(255, 255, 255)');
});

test('dark visual audit keeps search, trust, pricing and data controls coherent', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('./');
  await chooseTheme(page, 'Dark');

  await expect(page.locator('.trust-mark img').first()).toHaveCSS(
    'filter',
    'brightness(0) invert(1)',
  );
  await expect(page.locator('.billing--desktop .segmented')).toHaveCSS(
    'background-color',
    'rgb(28, 37, 42)',
  );
  await expect(page.locator('.language-control .language')).toHaveCSS(
    'border-color',
    'rgb(52, 65, 72)',
  );
  await expect(page.locator('.data-actions .double-button--dark .double-button__label')).toHaveCSS(
    'background-color',
    'rgb(4, 118, 138)',
  );

  const searchPixels = await page
    .locator('.search-preview canvas')
    .first()
    .evaluate((canvas) => {
      const element = canvas as HTMLCanvasElement;
      const context = element.getContext('2d');
      if (!context) return [] as number[][];
      const x = Math.floor(element.width / 2);
      return [1, Math.floor(element.height * 0.42), element.height - 2].map(
        (y) => Array.from(context.getImageData(x, y, 1, 1).data.slice(0, 3)) as number[],
      );
    });
  const luminance = ([r, g, b]: number[]) => 0.2126 * r + 0.7152 * g + 0.0722 * b;
  expect(searchPixels).toHaveLength(3);
  // Dark starts with the same live turquoise field as light; only the lower fade changes.
  expect(luminance(searchPixels[0])).toBeGreaterThan(90);
  expect(luminance(searchPixels[2])).toBeLessThan(35);
  expect(luminance(searchPixels[1])).toBeGreaterThan(luminance(searchPixels[0]) + 40);

  const contactButton = page.locator('.contact-banner .double-button__label');
  await expect(contactButton).toHaveCSS('background-color', 'rgb(255, 255, 255)');
  await expect(contactButton).toHaveCSS('color', 'rgb(18, 19, 20)');
});

test('dark product animations never write light surfaces over their demo palettes', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('./');
  await chooseTheme(page, 'Dark');
  await page.locator('.step-illustration').first().scrollIntoViewIfNeeded();
  await expect(page.locator('apcosys-product-demo')).toHaveCount(3, { timeout: 10_000 });

  const brightSurfaceCount = async () =>
    page.locator('apcosys-product-demo').evaluateAll((hosts) => {
      const luminance = (value: string) => {
        const match = value.match(/rgba?\(([^)]+)\)/);
        if (!match) return 0;
        const values = match[1]
          .split(/[,\s/]+/)
          .filter(Boolean)
          .map(Number);
        const [r, g, b] = values;
        return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
      };
      return hosts.flatMap((host) =>
        Array.from(host.shadowRoot?.querySelectorAll('*') ?? []).filter((node) => {
          const element = node as HTMLElement;
          const box = element.getBoundingClientRect();
          if (box.width < 20 || box.height < 16) return false;
          const style = getComputedStyle(element);
          const alpha = Number(
            style.backgroundColor.match(/rgba\([^,]+,[^,]+,[^,]+,\s*([^)]+)\)/)?.[1] ?? 1,
          );
          return alpha > 0.8 && luminance(style.backgroundColor) > 0.62;
        }),
      ).length;
    });

  await expect.poll(brightSurfaceCount, { timeout: 7500, intervals: [0, 600, 1000, 1200] }).toBe(0);
  await page.waitForTimeout(4300);
  expect(await brightSurfaceCount()).toBe(0);
});

test('dark mobile billing dock uses the dark control surface', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./');
  await page.evaluate(() => localStorage.setItem('apcosys-theme-mode', 'dark'));
  await page.reload({ waitUntil: 'networkidle' });
  await page.locator('.pricing').scrollIntoViewIfNeeded();
  const dock = page.locator('.billing-dock');
  await expect(dock).toHaveAttribute('data-visible', 'true');
  await expect(dock).toHaveCSS('background-color', 'rgb(21, 27, 31)');
  await expect(dock.locator('.segmented')).toHaveCSS('background-color', 'rgb(28, 37, 42)');
});

test('dark closing artwork and API poster are real theme assets', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./');
  await page.evaluate(() => localStorage.setItem('apcosys-theme-mode', 'dark'));
  await page.reload({ waitUntil: 'domcontentloaded' });
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  const stepPoster = page.locator('.step-illustration > img').first();
  await stepPoster.scrollIntoViewIfNeeded();
  expect(await stepPoster.getAttribute('src')).toContain('-dark.webp');
  const closing = page.locator('.closing-scene img');
  await closing.scrollIntoViewIfNeeded();
  await expect(closing).toHaveJSProperty('complete', true);
  expect(await closing.evaluate((img: HTMLImageElement) => img.currentSrc)).toContain('-dark.webp');
  const poster = page.locator('.api-demo-fallback');
  await poster.scrollIntoViewIfNeeded();
  expect(await poster.getAttribute('src')).toContain('api-layers.webp');
  expect(await poster.getAttribute('src')).not.toContain('-dark.webp');
});

test('dark lower waves stay dark and closing artwork hides baked corner defects', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('./');
  await chooseTheme(page, 'Dark');
  await page.locator('.lower-scene').scrollIntoViewIfNeeded();
  await expect(page.locator('.lower-scene canvas')).toBeVisible({ timeout: 10_000 });

  const wavePixels = await page.locator('.lower-scene canvas').evaluate((canvas) => {
    const element = canvas as HTMLCanvasElement;
    const context = element.getContext('2d');
    if (!context) return [] as number[][];
    return [0.25, 0.55, 0.85].map(
      (ratio) =>
        Array.from(
          context
            .getImageData(Math.floor(element.width * 0.5), Math.floor(element.height * ratio), 1, 1)
            .data.slice(0, 3),
        ) as number[],
    );
  });
  wavePixels.forEach(([r, g, b]) => {
    expect(0.2126 * r + 0.7152 * g + 0.0722 * b).toBeLessThan(85);
  });

  const picture = page.locator('.closing-scene:not(.closing-scene--compact) > picture');
  await expect(picture).toHaveCSS('clip-path', 'inset(6px)');
  const hotspot = page.locator('.closing-hotspot');
  await expect(hotspot).toHaveCSS('color', 'rgb(255, 255, 255)');
  await expect(hotspot).toHaveCSS('background-color', 'rgb(42, 171, 188)');
  await expect(hotspot.locator('.closing-hotspot__visual')).toBeVisible();
});

test('mobile navigation exposes appearance, language intent and scroll continuation cue', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./');
  await page.getByRole('button', { name: 'Open navigation' }).click();
  const dialog = page.getByRole('dialog', { name: 'Navigation' });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('radiogroup', { name: 'Appearance' })).toBeVisible();
  await expect(dialog.locator('.mobile-nav-scroll-cue')).toBeVisible();
  await expect(dialog).toHaveAttribute('data-scroll-cue', 'true');
  await dialog.evaluate((node) => {
    node.scrollTop = node.scrollHeight;
    node.dispatchEvent(new Event('scroll'));
  });
  await expect(dialog).not.toHaveAttribute('data-scroll-cue', 'true');
  await page.keyboard.press('Escape');
  await page.getByRole('button', { name: 'Language' }).click();
  await expect(page.locator('.language-soon')).toHaveCount(2);
});

test('search preview uses a level-two heading without visual restyling', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('.search-scene__heading > h2')).toContainText(
    'One query. A closer look.',
  );
});

test('dark theme passes WCAG AA scans on desktop and phone', async ({ page }) => {
  for (const [width, height] of [
    [1440, 1000],
    [390, 844],
  ] as const) {
    await page.setViewportSize({ width, height });
    await page.goto('./');
    await page.evaluate(() => localStorage.setItem('apcosys-theme-mode', 'dark'));
    await page.reload({ waitUntil: 'networkidle' });
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(
      results.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })),
      `dark accessibility at ${width}px`,
    ).toEqual([]);
  }
});

test('footer links keep enlarged invisible pointer hit areas', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./', { waitUntil: 'networkidle' });
  const link = page.locator('.footer-columns a').first();
  await link.scrollIntoViewIfNeeded();
  const hit = await link.evaluate((element) => {
    const box = element.getBoundingClientRect();
    const target = document.elementFromPoint(box.left + box.width / 2, box.top - 6);
    return target === element || element.contains(target);
  });
  expect(hit).toBe(true);
});
