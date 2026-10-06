import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { openLanguageMenu } from './helpers/locale';

const visit = async (page: Page, width = 1440) => {
  await page.setViewportSize({ width, height: 1000 });
  await page.goto('./', { waitUntil: 'networkidle' });
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

test('language disclosure keeps the soft navigation treatment with unavailable RU and ZH', async ({
  page,
}) => {
  await visit(page);

  const platform = page.getByRole('button', { name: 'Platform', exact: true });
  await platform.click();

  const menu = await openLanguageMenu(page);
  await expect(platform).toHaveAttribute('aria-expanded', 'false');
  await expect(menu.english).toHaveAttribute('aria-checked', 'true');
  await expect(menu.russian).toBeDisabled();
  await expect(menu.chinese).toBeDisabled();
  await expect(page.locator('.language-panel')).toHaveCSS('background-color', 'rgb(241, 242, 244)');
  await expect(menu.russian).toHaveCSS('opacity', '0.42');

  await page.keyboard.press('Escape');
  await expect(menu.trigger).toBeFocused();
});

test('language menu keyboard dismissal stays stable', async ({ page }) => {
  await visit(page, 390);

  const menu = await openLanguageMenu(page);
  await expect(menu.english).toBeFocused();

  await page.keyboard.press('ArrowDown');
  await expect(menu.english).toBeFocused();

  await page.keyboard.press('Escape');
  await expect(menu.trigger).toBeFocused();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});

test('prices retain the digit-reel animation in both directions and rapid switches settle correctly', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await visit(page);
  await page.locator('#pricing').scrollIntoViewIfNeeded();

  const annual = page.getByRole('radio', { name: 'Annually', exact: true });
  const monthly = page.getByRole('radio', { name: 'Monthly', exact: true });

  await annual.check();
  await expect(page.locator('.price-amount')).toHaveText(['$0', '$32', '$192', '$576']);
  expect(await priceAnimations(page)).toBeGreaterThan(0);
  expect(await page.locator('.price-digit__reel').count()).toBeGreaterThan(0);

  await monthly.check();
  await expect(page.locator('.price-amount')).toHaveText(['$0', '$40', '$240', '$720']);
  expect(await priceAnimations(page)).toBeGreaterThan(0);

  await annual.check();
  await monthly.check();
  await annual.check();
  await expect(page.locator('.price-amount')).toHaveText(['$0', '$32', '$192', '$576']);
});

test('reduced motion preserves the selected price without a running reel', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await visit(page);
  await page.locator('#pricing').scrollIntoViewIfNeeded();

  await page.getByRole('radio', { name: 'Annually', exact: true }).check();
  await expect(page.locator('.price-amount')).toHaveText(['$0', '$32', '$192', '$576']);
  expect(await priceAnimations(page)).toBe(0);
});

test('marquee pauses for focus', async ({ page }) => {
  await visit(page);

  const trust = page.locator('.trust');
  await trust.scrollIntoViewIfNeeded();
  await expect(trust).toHaveAttribute('data-running', 'true');

  const viewport = trust.locator('.trust-viewport');
  await viewport.focus();
  await expect(viewport.locator('.trust-track')).toHaveCSS('animation-play-state', 'paused');
});

test('R13 language surface has no serious accessibility violations', async ({ page }) => {
  await visit(page, 390);

  const menu = await openLanguageMenu(page);
  await expect(menu.russian).toBeDisabled();

  const results = await new AxeBuilder({ page }).analyze();
  expect(
    results.violations.filter((v) => v.impact === 'critical' || v.impact === 'serious'),
  ).toEqual([]);
});
