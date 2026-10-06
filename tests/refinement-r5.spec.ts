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
  await visit(page, 39¶»§q«^