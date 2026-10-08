import { expect, test } from '@playwright/test';

for (const theme of ['light', 'dark'] as const) {
  test(`desktop search emphasizes “It’s free” in ${theme} theme without losing input behavior`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.addInitScript((value) => localStorage.setItem('apcosys-theme-mode', value), theme);
    await page.goto('./');
    await expect(page.locator('html')).toHaveAttribute('data-theme', theme);

    const input = page.locator('.search-scene .search-form input');
    const hint = page.locator('.search-scene .search-desktop-placeholder');
    const accent = hint.locator('.search-desktop-placeholder__accent');
    await expect(hint).toBeVisible();
    await expect(accent).toHaveText('It’s free');
    await expect(accent).toHaveCSS('text-decoration-line', 'underline');
    const colors = await hint.evaluate((node) => {
      const text = node.querySelector('span')!;
      const accentText = node.querySelector('.search-desktop-placeholder__accent')!;
      return [getComputedStyle(text).color, getComputedStyle(accentText).color];
    });
    expect(colors[0]).not.toBe(colors[1]);
    await input.fill('example.org');
    await expect(hint).toHaveCount(0);
    await expect(input).toHaveValue('example.org');
    await input.fill('');
    await expect(hint).toBeVisible();

    const canvasColor = await page
      .locator('html')
      .evaluate((node) => getComputedStyle(node).backgroundColor);
    const heroColor = await page
      .locator('.hero')
      .evaluate((node) => getComputedStyle(node).backgroundColor);
    expect(canvasColor).toBe(heroColor);
    const heading = page.locator('.step-copy h3').first();
    const headingRatio = await heading.evaluate((node) => {
      const css = getComputedStyle(node);
      return parseFloat(css.lineHeight) / parseFloat(css.fontSize);
    });
    expect(headingRatio).toBeLessThan(0.95);
  });

  test(`mobile appearance is the final navigation control with SVG checks in ${theme} theme`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.addInitScript((value) => localStorage.setItem('apcosys-theme-mode', value), theme);
    await page.goto('./');
    await page.getByRole('button', { name: 'Open navigation' }).click();
    const dialog = page.getByRole('dialog', { name: 'Navigation' });
    await expect(dialog).toBeVisible();
    const themeControl = dialog.locator('nav > .mobile-theme-control:last-child');
    await expect(themeControl).toBeAttached();
    const checkedRadio = themeControl.getByRole('radio', {
      name: theme === 'dark' ? 'Dark' : 'Light',
      exact: true,
    });
    await expect(checkedRadio).toBeChecked();
    await expect(themeControl.locator('.theme-check svg')).toHaveCount(1);
    await expect(themeControl.locator('.theme-check')).not.toHaveText('✓');
    await themeControl.getByRole('radio', { name: 'System', exact: true }).check();
    const system = themeControl.getByRole('radio', { name: 'System' });
    await expect(system).toBeChecked();
    await expect(themeControl.locator('.theme-check svg')).toHaveCount(1);
    await system.focus();
    await page.keyboard.press('Tab');
    await expect(dialog.getByRole('button', { name: 'Close dialog' })).toBeFocused();
    await page.keyboard.press('Shift+Tab');
    await expect(system).toBeFocused();
  });
}
