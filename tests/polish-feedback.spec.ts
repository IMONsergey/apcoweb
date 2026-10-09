import { expect, test } from '@playwright/test';

for (const width of [390, 1440]) {
  test(`search and data composition stay clean and aligned at ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('./');
    await expect(page.locator('.search-scene .evidence-playback')).toHaveCount(0);
    await expect(page.locator('.search-scene__demo-note')).toHaveCSS('text-align', 'center');
    await expect(page.locator('.header-signin')).toHaveCSS('opacity', '1');
    for (const card of await page.locator('.data-section .metric-card').all()) {
      await expect(card).toHaveCSS('text-align', 'center');
      await expect(card).toHaveCSS('align-items', 'center');
    }
    const buttons = page.locator('.home-searchable__index button');
    for (const button of await buttons.all()) {
      await button.click();
      await expect(button).toHaveAttribute('aria-pressed', 'true');
      await expect(button).not.toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
      if (width > 767) {
        const left = await page.locator('.home-searchable__index').boundingBox();
        const right = await page.locator('.home-searchable__evidence').boundingBox();
        expect(Math.abs(left!.y - right!.y)).toBeLessThan(1);
        expect(Math.abs(left!.height - right!.height)).toBeLessThan(1);
      }
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth - innerWidth),
      ).toBeLessThanOrEqual(1);
    }
    await page.locator('.search-form input').focus();
    const focus = await page.locator('.search-form').evaluate((el) => ({
      outline: getComputedStyle(el).outlineStyle,
      gradient: getComputedStyle(el, '::after').backgroundImage,
    }));
    expect(focus.outline).toBe('none');
    expect(focus.gradient).toContain('linear-gradient');
  });
}

test('removing the home playback strip keeps the evidence animation active', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('./');
  await page.locator('.search-scene').scrollIntoViewIfNeeded();
  await page.mouse.move(0, 0);
  await expect
    .poll(() =>
      page
        .locator('.search-scene .evidence-cursor')
        .evaluate((el) => Number(getComputedStyle(el).opacity)),
    )
    .toBeGreaterThan(0.1);
});

test('search halo resolves on focus and the wave ignores pointer input', async ({ page }) => {
  await page.goto('./');
  const form = page.locator('.search-form');
  const halo = () =>
    form.locator('.search-form__glow').evaluate((el) => ({
      blur: getComputedStyle(el).filter,
      opacity: Number(getComputedStyle(el).opacity),
    }));
  expect((await halo()).blur).toBe('blur(7px)');
  expect((await halo()).opacity).toBeGreaterThan(0.5);
  await form.locator('input').focus();
  await expect.poll(async () => (await halo()).blur).toBe('blur(3px)');
  await expect.poll(async () => (await halo()).opacity).toBeLessThan(0.3);
  await expect(page.locator('.team-signal-field')).toHaveCSS('pointer-events', 'none');
});
