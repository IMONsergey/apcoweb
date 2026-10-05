import { test, expect } from '@playwright/test';
import { selectLanguage } from './helpers/locale';
import AxeBuilder from '@axe-core/playwright';

for (const width of [320, 360, 390, 430, 599]) {
  test(`compact scenes and mobile reading path at ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('./', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const search = page.locator('.search-scene');
    await expect(search.locator('h3')).toHaveText('One query. A closer look.');
    await expect(page.getByRole('searchbox')).toHaveAttribute(
      'placeholder',
      /Domain, IP\sor\sattribute/,
    );
    await expect(search.locator('.search-free-note')).toHaveText('It’s free');
    await expect(search.locator('.search-chrome__filters')).not.toBeVisible();
    expect((await search.boundingBox())!.height).toBeLessThanOrEqual(500.1);
    expect(
      await search
        .locator('.search-form input')
        .evaluate((el) => parseFloat(getComputedStyle(el).fontSize)),
    ).toBeGreaterThanOrEqual(16);
    await page.locator('#use-cases').scrollIntoViewIfNeeded();
    for (const card of await page.locator('.audience-card').all()) {
      await expect(card.locator('.audience-actions .double-button__icon')).toHaveCount(2);
      await expect(card.locator('.audience-copy h3')).toHaveCSS('padding-top', '0px');
      expect((await card.locator('.audience-art').boundingBox())!.width).toBeLessThanOrEqual(176);
      await expect(card.locator('.audience-art svg')).toBeVisible();
      expect(await card.locator('.audience-art svg circle').count()).toBeGreaterThan(0);
    }
    await page.locator('#data').scrollIntoViewIfNeeded();
    const layout = await page.locator('#data').evaluate((section) => {
      const cards = [...section.querySelectorAll('.metric-card')].map((el) =>
        el.getBoundingClientRect(),
      );
      const globe = section.querySelector('.visual--globe')!.getBoundingClientRect();
      const actions = section.querySelector('.data-actions')!.getBoundingClientRect();
      return {
        cards: cards.map((r) => ({ x: r.x, y: r.y, b: r.bottom, w: r.width, h: r.height })),
        globe: { x: globe.x, w: globe.width, y: globe.y, h: globe.height },
        actionTop: actions.top,
        width: section.getBoundingClientRect().width,
      };
    });
    await expect(page.locator('.data-visual-field .signal-globe canvas')).toBeVisible();
    const [a, b, c, d, e, f] = layout.cards;
    expect(Math.abs(a.y - b.y)).toBeLessThan(1);
    expect(Math.abs(c.x - a.x)).toBeLessThan(1);
    expect(Math.abs(d.x - b.x)).toBeLessThan(1);
    expect(Math.abs(e.y - f.y)).toBeLessThan(1);
    expect(d.y - c.b).toBeCloseTo(a.h + 32, 0);
    expect(layout.actionTop).toBeGreaterThan(f.b + 20);
    expect(layout.globe.w).toBeCloseTo(layout.width, 0);
    expect(layout.globe.y).toBeLessThan(c.b);
    expect(layout.globe.y + layout.globe.h).toBeGreaterThan(d.y);
    await page.locator('.closing-section').scrollIntoViewIfNeeded();
    const closing = page.locator('.closing-scene');
    expect((await closing.boundingBox())!.height).toBeLessThanOrEqual(480);
    await expect(closing.locator('picture img')).toBeVisible();
    await expect(closing.locator('.double-button')).toBeVisible();
    await expect(closing.locator('.double-button')).toHaveAttribute(
      'href',
      'https://apcosys.net/search',
    );
    const styles = await page
      .locator('.footer-columns .eyebrow')
      .evaluateAll((nodes) => nodes.map((n) => getComputedStyle(n).textTransform));
    expect(styles).toEqual(Array(6).fill('uppercase'));
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
      width + 1,
    );
  });
}

test('left-aligned accent billing text preserves the contextual control', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./', { waitUntil: 'networkidle' });
  await page.locator('#plan-plus').scrollIntoViewIfNeeded();
  const dock = page.locator('.billing-dock');
  await expect(dock).toBeVisible();
  const style = await dock.locator('.billing-dock__offer').evaluate((el) => ({
    align: getComputedStyle(el).textAlign,
    colors: [...el.children].map((n) => getComputedStyle(n).color),
  }));
  expect(style.align).toBe('left');
  expect(style.colors).toEqual(['rgb(3, 122, 143)', 'rgb(3, 122, 143)']);
  await page.getByRole('radio', { name: 'Annually', exact: true }).check();
  await expect(page.locator('#plan-plus .price-amount')).toHaveText('$32');
  await page.locator('#faq').scrollIntoViewIfNeeded();
  await expect(dock).not.toBeVisible();
});

for (const width of [320, 390, 768, 1440, 1920]) {
  test(`EN RU language selection and content at ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('./?review=r4', { waitUntil: 'networkidle' });
    await expect(page.getByRole('button', { name: 'Language', exact: true })).toBeVisible();
    await page.getByRole('searchbox').fill('example.com');
    await page.getByRole('searchbox').evaluate((el) => (el as HTMLInputElement).blur());
    await page.locator('#plan-plus').scrollIntoViewIfNeeded();
    await page.getByRole('radio', { name: 'Annually', exact: true }).check();
    await page.evaluate(() =>
      history.replaceState(history.state, '', `${location.pathname}${location.search}#pricing`),
    );
    await selectLanguage(page, 'ru');
    await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Начните с запроса.');
    await expect(page.locator('.search-scene h3')).toHaveText('Один запрос. Больше контекста.');
    await expect(page.getByRole('searchbox')).toHaveValue('example.com');
    await expect(page.locator('#plan-plus .price-amount')).toHaveText('$32');
    await expect(page.locator('#plan-plus .plan-button')).toHaveText('Тариф Plus');
    await expect(
      page.locator('.footer-columns').getByText('Платформа', { exact: true }),
    ).toBeVisible();
    expect(new URL(page.url()).searchParams.get('review')).toBe('r4');
    expect(new URL(page.url()).searchParams.get('lang')).toBe('ru');
    expect(await page.evaluate(() => localStorage.getItem('i18nextLng'))).toBe('ru');
    const footerTransforms = await page
      .locator('.footer-columns .eyebrow')
      .evaluateAll((nodes) => nodes.map((n) => getComputedStyle(n).textTransform));
    expect(footerTransforms).toEqual(Array(6).fill('uppercase'));
    expect(new URL(page.url()).hash).toBe('#pricing');
    await page.evaluate(() => document.fonts.ready);
    const overflow = await page
      .locator('h1,h2,.header-row,.audience-copy,.plan-card,.metric-card')
      .evaluateAll((nodes) =>
        nodes
          .filter((n) => n.scrollWidth > n.clientWidth + 2)
          .map((n) => ({
            id: n.id,
            className: n.className,
            text: n.textContent,
            width: n.clientWidth,
            scrollWidth: n.scrollWidth,
            fontSize: getComputedStyle(n).fontSize,
          })),
      );
    expect(overflow).toEqual([]);
    await page.reload({ waitUntil: 'networkidle' });
    await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
    await selectLanguage(page, 'en');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('#hero-title')).toContainText('Start with a query.');
  });
}

test('URL locale precedence and storage denial do not break selection', async ({ page }) => {
  await page.addInitScript(() => {
    try {
      localStorage.setItem('apcosys.landing.language', 'ru');
    } catch {
      /* optional */
    }
  });
  await page.goto('./?lang=en', { waitUntil: 'networkidle' });
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await page.evaluate(() =>
    Object.defineProperty(window, 'localStorage', {
      get() {
        throw new DOMException('disabled', 'SecurityError');
      },
      configurable: true,
    }),
  );
  await selectLanguage(page, 'ru');
  await expect(page.locator('#hero-title')).toContainText('Начните с запроса.');
});

test('localized mobile page remains accessible', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./?lang=ru', { waitUntil: 'networkidle' });
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  expect(
    results.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })),
  ).toEqual([]);
});

test('RU closing copy fully covers the prepared English CTA on tablet and desktop', async ({
  page,
}) => {
  await page.goto('./?lang=ru', { waitUntil: 'networkidle' });
  for (const [width, x, y, w, h] of [
    [600, 0.415, 0.6275, 0.273, 0.047],
    [768, 0.415, 0.6275, 0.273, 0.047],
    [899, 0.415, 0.6275, 0.273, 0.047],
    [900, 0.436, 0.686, 0.204, 0.062],
    [1024, 0.436, 0.686, 0.204, 0.062],
    [1199, 0.436, 0.686, 0.204, 0.062],
    [1200, 0.45, 0.66215, 0.1456, 0.0473],
    [1440, 0.45, 0.66215, 0.1456, 0.0473],
    [1920, 0.45, 0.66215, 0.1456, 0.0473],
  ]) {
    await page.setViewportSize({ width, height: 1000 });
    const scene = page.locator('.closing-scene');
    await scene.scrollIntoViewIfNeeded();
    await page.evaluate(() => document.fonts.ready);
    const copy = scene.locator('.closing-copy--translated');
    await expect(copy).toBeVisible();
    // Responsive assets load asynchronously on Pages. Wait for the selected image,
    // then measure both rectangles in one frame so scroll anchoring cannot split the sample.
    await expect
      .poll(() =>
        scene.evaluate(
          (node, region) => {
            const image = node.querySelector('img')!;
            const art = node.getBoundingClientRect();
            const cover = node.querySelector('.closing-copy--translated')!.getBoundingClientRect();
            return {
              imageReady: image.complete && image.naturalWidth > 0,
              left: cover.left <= art.left + art.width * region.x,
              right: cover.right >= art.left + art.width * (region.x + region.w),
              top: cover.top <= art.top + art.height * (region.y - region.h / 2),
              bottom: cover.bottom > art.top + art.height * (region.y + region.h / 2) + 1,
            };
          },
          // Coordinates of the visible CTA in each unchanged source image, verified in R3.
          { x, y, w, h },
        ),
      )
      .toEqual({ imageReady: true, left: true, right: true, top: true, bottom: true });
    const action = copy.getByRole('link', { name: 'Попробовать поиск', exact: true });
    await expect(action).toHaveAttribute('href', 'https://apcosys.net/search');
    await expect(action).toBeVisible();
  }
});
