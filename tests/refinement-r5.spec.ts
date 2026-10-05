import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { selectLanguage } from './helpers/locale';

const visit = async (page: Page, width = 1440) => {
  await page.setViewportSize({ width, height: 1000 });
  await page.goto('./?lang=en', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
};
const priceAnimations = (page: Page) =>
  page
    .locator('#plan-plus .price-amount')
    .evaluate(
      (node) =>
        node
          .getAnimations({ subtree: true })
          .filter((animation) => animation.playState === 'running').length,
    );

test('language disclosure and Pricing use the existing soft navigation treatment', async ({
  page,
}) => {
  await visit(page);
  const platform = page.getByRole('button', { name: 'Platform', exact: true });
  const language = page.getByRole('button', { name: 'Language', exact: true });
  await platform.click();
  await language.click();
  await expect(platform).toHaveAttribute('aria-expanded', 'false');
  await expect(language).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByRole('menuitemradio', { name: 'English' })).toBeFocused();
  await expect(page.getByRole('menuitemradio', { name: 'English' })).toHaveAttribute(
    'aria-checked',
    'true',
  );
  await expect(page.locator('.language-control select')).toHaveCount(0);
  await expect(page.locator('.language-panel')).toHaveCSS('background-color', 'rgb(241, 242, 244)');
  await expect(page.locator('.language-panel')).toHaveCSS('border-radius', '12px');
  await expect(page.getByRole('menuitemradio', { name: 'English' })).toHaveCSS(
    'background-color',
    'rgb(255, 255, 255)',
  );
  await page.keyboard.press('Escape');
  await expect(language).toBeFocused();
  await expect(page.locator('.language-panel')).toHaveAttribute('inert', '');
  const pricing = page.locator('.desktop-nav a[href="#pricing"]');
  await pricing.hover();
  await expect(pricing).toHaveCSS('background-color', 'rgb(241, 242, 244)');
  await expect(pricing).toHaveCSS('border-radius', '12px');
  await language.click();
  await pricing.click();
  await expect(language).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('dialog[open]')).toHaveCount(0);
});

test('language menu keyboard selection, dismissal and mobile bounds', async ({ page }) => {
  for (const width of [320, 390, 768, 1199, 1200, 1440]) {
    await visit(page, width);
    const language = page.locator('[data-language-selector]');
    await language.focus();
    await page.keyboard.press('ArrowDown');
    await expect(page.getByRole('menuitemradio', { name: 'English' })).toBeFocused();
    const bounds = (await page.locator('.language-panel').boundingBox())!;
    expect(bounds.x).toBeGreaterThanOrEqual(0);
    expect(bounds.x + bounds.width).toBeLessThanOrEqual(width);
    await page.keyboard.press('ArrowDown');
    await expect(page.getByRole('menuitemradio', { name: 'Русский' })).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
    await expect(language).toBeFocused();
    await expect(language).toHaveAttribute('aria-expanded', 'false');
    await page.keyboard.press('ArrowUp');
    await expect(page.getByRole('menuitemradio', { name: 'Русский' })).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(language).toBeFocused();
    await language.click();
    await page.keyboard.press('Tab');
    await expect(language).toHaveAttribute('aria-expanded', 'false');
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
      width + 1,
    );
  }
});

test('locale text crossfades, rapid changes settle, and form state stays mounted', async ({
  page,
}, info) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await visit(page);
  const search = page.getByRole('searchbox');
  await search.fill('example.com');
  await search.evaluate((node) => {
    node.setAttribute('data-original-input', '');
    (node as HTMLInputElement).blur();
  });
  await selectLanguage(page, 'ru');
  await expect(page.locator('html')).toHaveAttribute('data-locale-transition', 'ru');
  expect(await page.locator('.locale-text-ghost').count()).toBeGreaterThan(0);
  expect(
    await page
      .locator('.locale-text-ghost')
      .evaluateAll((nodes) =>
        nodes.every(
          (node) =>
            node.getAttribute('aria-hidden') === 'true' &&
            (node as HTMLElement).inert &&
            !node.querySelector('input,button,a'),
        ),
      ),
  ).toBe(true);
  await page.evaluate(() => {
    document
      .getAnimations()
      .filter((animation) => {
        const target = (animation.effect as KeyframeEffect).target;
        return target instanceof HTMLElement && target.closest('.locale-text,.locale-text-ghost');
      })
      .forEach((animation) => {
        animation.pause();
        animation.currentTime = 180;
      });
  });
  await page.screenshot({ path: info.outputPath('language-transition-midpoint.png') });
  await page.evaluate(() =>
    document
      .getAnimations()
      .filter((animation) => {
        const target = (animation.effect as KeyframeEffect).target;
        return target instanceof HTMLElement && target.closest('.locale-text,.locale-text-ghost');
      })
      .forEach((animation) => animation.play()),
  );
  await expect(search).toHaveValue('example.com');
  await expect(search).toHaveAttribute('data-original-input', '');
  for (const locale of ['en', 'ru', 'en'] as const) {
    await page.locator('[data-language-selector]').dispatchEvent('click');
    await page
      .getByRole('menuitemradio', { name: locale === 'en' ? 'English' : 'Русский', exact: true })
      .dispatchEvent('click');
  }
  await expect(page.locator('.locale-text-ghost')).toHaveCount(0);
  await expect(page.locator('html')).not.toHaveAttribute('data-locale-transition');
  await expect(page.locator('#hero-title')).toContainText('Start with a query.');
  await expect(search).toHaveValue('example.com');
  await expect(search).toHaveAttribute('data-original-input', '');
  expect(
    await page
      .locator('#hero-title .locale-text')
      .first()
      .evaluate((node) => getComputedStyle(node).opacity),
  ).toBe('1');
});

test('prices roll in both directions and rapid billing switches finish on the right digits', async ({
  page,
}, info) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await visit(page);
  await page.locator('#pricing').scrollIntoViewIfNeeded();
  const grid = page.locator('.plan-grid');
  const height = (await grid.boundingBox())!.height;
  const annual = page.getByRole('radio', { name: 'Annually', exact: true });
  const monthly = page.getByRole('radio', { name: 'Monthly', exact: true });
  const directions = () =>
    page.locator('#plan-plus .price-digit__reel').evaluateAll((nodes) =>
      nodes.flatMap((node) =>
        node.getAnimations().map((animation) => {
          const frames = (animation.effect as KeyframeEffect).getKeyframes();
          return (
            new DOMMatrixReadOnly(String(frames.at(-1)!.transform)).m42 -
            new DOMMatrixReadOnly(String(frames[0].transform)).m42
          );
        }),
      ),
    );
  await annual.check();
  await expect(page.locator('.price-amount')).toHaveText(['$0', '$32', '$192', '$576']);
  expect(await priceAnimations(page)).toBeGreaterThan(0);
  expect((await directions()).every((distance) => distance > 0)).toBe(true);
  await page.locator('.price-amount').evaluateAll((nodes) =>
    nodes.forEach((node) =>
      node.getAnimations({ subtree: true }).forEach((animation) => {
        animation.pause();
        animation.currentTime = 280;
      }),
    ),
  );
  await grid.screenshot({ path: info.outputPath('pricing-transition-midpoint.png') });
  await page
    .locator('.price-amount')
    .evaluateAll((nodes) =>
      nodes.forEach((node) =>
        node.getAnimations({ subtree: true }).forEach((animation) => animation.play()),
      ),
    );
  await expect.poll(() => priceAnimations(page)).toBe(0);
  await monthly.check();
  expect((await directions()).every((distance) => distance < 0)).toBe(true);
  await annual.check();
  await monthly.check();
  await annual.check();
  await expect.poll(() => priceAnimations(page)).toBe(0);
  await expect(page.locator('.price-amount')).toHaveText(['$0', '$32', '$192', '$576']);
  const final = await page.locator('.price-digit__reel').evaluateAll((nodes) =>
    nodes.map((node) => {
      const height = node.firstElementChild!.getBoundingClientRect().height;
      const index = -new DOMMatrixReadOnly(getComputedStyle(node).transform).m42 / height;
      return {
        visible: Math.round(index) % 10,
        target: Number((node as HTMLElement).dataset.digit),
      };
    }),
  );
  expect(final.every((digit) => digit.visible === digit.target)).toBe(true);
  expect((await grid.boundingBox())!.height).toBeCloseTo(height, 0);
});

test('reduced motion cancels text and price transitions without losing the selected value', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await visit(page);
  await selectLanguage(page, 'ru');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('.locale-text-ghost')).toHaveCount(0);
  await expect(page.locator('#hero-title')).toContainText('Начните с запроса.');
  await page.locator('#pricing').scrollIntoViewIfNeeded();
  await page.getByRole('radio', { name: 'За год', exact: true }).check();
  await expect(page.locator('.price-amount')).toHaveText(['$0', '$32', '$192', '$576']);
  expect(await priceAnimations(page)).toBe(0);
  await selectLanguage(page, 'en');
  await expect(page.locator('.locale-text-ghost')).toHaveCount(0);
});

test('marquee keeps moving under the pointer and phone logos are smaller', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await visit(page);
  const viewport = page.locator('.trust-viewport');
  const track = page.locator('.trust-track');
  await viewport.scrollIntoViewIfNeeded();
  await viewport.hover();
  await expect(track).toHaveCSS('animation-play-state', 'running');
  const offset = () =>
    track.evaluate((node) => new DOMMatrixReadOnly(getComputedStyle(node).transform).m41);
  const before = await offset();
  await page.waitForTimeout(300);
  expect(await offset()).toBeLessThan(before - 2);
  await page.setViewportSize({ width: 390, height: 844 });
  await viewport.scrollIntoViewIfNeeded();
  await expect(page.locator('.trust-mark img').first()).toHaveCSS('width', '96px');
  await expect(page.locator('.trust-mark img').first()).toHaveCSS('height', '26px');
  await expect(track).toHaveCSS('animation-play-state', 'running');
});

test('R5 visual evidence and open language menu accessibility', async ({ page }, info) => {
  for (const width of [320, 390, 768, 1200, 1440]) {
    for (const locale of ['en', 'ru'] as const) {
      await visit(page, width);
      if (locale === 'ru') await selectLanguage(page, 'ru');
      await page.evaluate(() => document.fonts.ready);
      await page.locator('[data-language-selector]').click();
      await expect(page.getByRole('menu')).toBeVisible();
      await page.screenshot({ path: info.outputPath(`language-${width}-${locale}.png`) });
      if (width === 390 && locale === 'ru') {
        const result = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
          .analyze();
        expect(
          result.violations.map((violation) => ({
            id: violation.id,
            targets: violation.nodes.map((node) => node.target),
          })),
        ).toEqual([]);
      }
      await page.keyboard.press('Escape');
      if ([390, 1440].includes(width)) {
        await page.locator('#plan-plus').scrollIntoViewIfNeeded();
        await page
          .locator('.plan-grid')
          .screenshot({ path: info.outputPath(`pricing-${width}-${locale}-monthly.png`) });
        await page
          .getByRole('radio', { name: locale === 'en' ? 'Annually' : 'За год', exact: true })
          .check();
        await page
          .locator('.plan-grid')
          .screenshot({ path: info.outputPath(`pricing-${width}-${locale}-annual.png`) });
      }
    }
  }
});
