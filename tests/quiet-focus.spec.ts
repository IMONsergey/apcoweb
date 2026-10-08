import { expect, test } from '@playwright/test';

for (const theme of ['light', 'dark'] as const) {
  test(`focus outlines are removed outside search on desktop (${theme})`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.addInitScript((mode) => localStorage.setItem('apcosys-theme-mode', mode), theme);
    await page.goto('./');

    const developers = page.getByRole('button', { name: 'Developers', exact: true });
    await developers.click();
    await expect(developers).toHaveAttribute('aria-expanded', 'true');
    await expect(developers).toHaveCSS('outline-style', 'none');

    await developers.focus();
    await page.keyboard.press('ArrowDown');
    const menuLink = page.locator('.desktop-nav .nav-panel a:focus');
    await expect(menuLink).toHaveCount(1);
    await expect(menuLink).toHaveCSS('outline-style', 'none');
    await expect(menuLink).toHaveCSS('text-decoration-line', 'underline');
    await page.keyboard.press('Escape');

    const language = page.getByRole('button', { name: 'EN — Language', exact: true });
    await language.click();
    await expect(language).toHaveCSS('outline-style', 'none');
    const english = page.getByRole('menuitemradio', { name: 'English', exact: true });
    await english.focus();
    await expect(english).toHaveCSS('outline-style', 'none');

    const appearance = page.getByRole('button', { name: 'Appearance', exact: true });
    await appearance.click();
    await expect(appearance).toHaveCSS('outline-style', 'none');

    const search = page.locator('.search-form input').first();
    await search.focus();
    await expect(page.locator('.search-form').first()).toHaveCSS('outline-style', 'solid');
    await expect(page.locator('.search-form').first()).toHaveCSS('outline-width', '2px');
  });

  test(`radio focus cues are understated on mobile (${theme})`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.addInitScript((mode) => localStorage.setItem('apcosys-theme-mode', mode), theme);
    await page.goto('./');

    await page.getByRole('button', { name: 'Open navigation', exact: true }).click();
    const dialog = page.getByRole('dialog', { name: 'Navigation' });
    const dark = dialog.getByRole('radio', { name: 'Dark', exact: true });
    await dark.focus();
    await expect(dark.locator('xpath=..')).toHaveCSS('outline-style', 'none');
    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible();

    // On phones, billing is an inert sticky dock until its pricing section is reached.
    await page.locator('#plan-plus').scrollIntoViewIfNeeded();
    await expect(page.locator('.billing-dock')).toBeVisible();
    const monthly = page.getByRole('radio', { name: 'Monthly', exact: true });
    await monthly.focus();
    const monthlyText = monthly.locator('xpath=following-sibling::span');
    await expect(monthlyText).toHaveCSS('outline-style', 'none');
    await expect(page.locator('.billing-dock .segmented')).toHaveCSS('box-shadow', 'none');
  });
}
