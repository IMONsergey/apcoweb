import { expect, test } from '@playwright/test';

for (const theme of ['light', 'dark'] as const) {
  test(`pointer opening menus does not focus or outline an option (${theme})`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.addInitScript((mode) => localStorage.setItem('apcosys-theme-mode', mode), theme);
    await page.goto('./');

    const language = page.getByRole('button', { name: 'EN — Language', exact: true });
    const english = page.getByRole('menuitemradio', { name: 'English', exact: true });

    await language.click();
    await expect(language).toHaveAttribute('aria-expanded', 'true');
    await expect(english).toBeVisible();
    await expect(english).not.toBeFocused();
    expect(await english.evaluate((node) => node.matches(':focus-visible'))).toBe(false);
    expect(await language.evaluate((node) => node.matches(':focus-visible'))).toBe(false);

    await english.click();
    await expect(language).toHaveAttribute('aria-expanded', 'false');
    expect(await language.evaluate((node) => node.matches(':focus-visible'))).toBe(false);

    const appearance = page.getByRole('button', { name: 'Appearance', exact: true });
    const system = page.getByRole('menuitemradio', { name: 'System', exact: true });
    await appearance.click();
    await expect(appearance).toHaveAttribute('aria-expanded', 'true');
    await expect(system).toBeVisible();
    await expect(system).not.toBeFocused();
    expect(await system.evaluate((node) => node.matches(':focus-visible'))).toBe(false);
    expect(await appearance.evaluate((node) => node.matches(':focus-visible'))).toBe(false);

    await system.click();
    await expect(appearance).toHaveAttribute('aria-expanded', 'false');
    expect(await appearance.evaluate((node) => node.matches(':focus-visible'))).toBe(false);
  });

  test(`keyboard opening retains visible focus and Arrow keys (${theme})`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.addInitScript((mode) => localStorage.setItem('apcosys-theme-mode', mode), theme);
    await page.goto('./');

    const language = page.getByRole('button', { name: 'EN — Language', exact: true });
    const english = page.getByRole('menuitemradio', { name: 'English', exact: true });
    await language.focus();
    await page.keyboard.press('Enter');
    await expect(english).toBeFocused();
    expect(await english.evaluate((node) => node.matches(':focus-visible'))).toBe(true);
    await page.keyboard.press('Escape');
    await expect(language).toBeFocused();

    const appearance = page.getByRole('button', { name: 'Appearance', exact: true });
    const system = page.getByRole('menuitemradio', { name: 'System', exact: true });
    const light = page.getByRole('menuitemradio', { name: 'Light', exact: true });
    await appearance.focus();
    await page.keyboard.press('ArrowDown');
    await expect(system).toBeFocused();
    expect(await system.evaluate((node) => node.matches(':focus-visible'))).toBe(true);
    await page.keyboard.press('ArrowDown');
    await expect(light).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(appearance).toBeFocused();
  });
}
