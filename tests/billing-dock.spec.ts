import { test, expect } from '@playwright/test';
import { wcagAxe } from './helpers/accessibility';

for (const width of [320, 390, 430, 768, 1024, 1199]) {
  test(`contextual billing dock at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto('./', { waitUntil: 'networkidle' });
    const dock = page.getByRole('complementary', {
      name: 'Plan billing options',
      includeHidden: true,
    });
    await expect(page.locator('.billing-dock')).not.toBeVisible();
    await expect(page.locator('.billing--desktop')).not.toBeVisible();
    await page.locator('#plan-plus').scrollIntoViewIfNeeded();
    await expect(dock).toBeVisible();
    await expect(dock).toHaveAttribute('data-visible', 'true');
    await expect(page.getByRole('radio')).toHaveCount(2);
    expect(await dock.evaluate((el) => el.contains(document.activeElement))).toBe(false);
    const rect = await dock.boundingBox();
    expect(rect!.x).toBeGreaterThanOrEqual(10);
    expect(rect!.x + rect!.width).toBeLessThanOrEqual(width - 10);
    expect(rect!.height).toBeLessThanOrEqual(90);
    const before = await page.locator('#plan-plus').boundingBox();
    await page.getByRole('radio', { name: 'Annually', exact: true }).check();
    await expect(page.locator('#plan-plus .price-amount')).toHaveText('$32');
    await expect(page.locator('#plan-plus .plan-billing-note')).toHaveText('$384 billed annually');
    const after = await page.locator('#plan-plus').boundingBox();
    expect(Math.abs(before!.y - after!.y)).toBeLessThan(1);
    expect((await dock.boundingBox())!.height).toBe(rect!.height);
    await expect(page.locator('dialog[open]')).toHaveCount(0);
    await page.locator('#faq').scrollIntoViewIfNeeded();
    await expect(dock).not.toBeVisible();
    await expect(page.locator('.billing-dock')).toHaveAttribute('inert', '');
    await page.locator('#plan-business').scrollIntoViewIfNeeded();
    await expect(dock).toBeVisible();
    await expect(page.getByRole('radio', { name: 'Annually', exact: true })).toBeChecked();
    await expect(page.locator('#plan-business .price-amount')).toHaveText('$576');
  });
}

test('desktop and compact controls share one billing state across resize', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('./', { waitUntil: 'networkidle' });
  await expect(page.locator('.billing-dock')).not.toBeVisible();
  await page.getByRole('radio', { name: 'Annually', exact: true }).check();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator('#plan-plus').scrollIntoViewIfNeeded();
  await expect(page.locator('.billing-dock')).toBeVisible();
  await expect(page.getByRole('radio', { name: 'Annually', exact: true })).toBeChecked();
  await page.getByRole('radio', { name: 'Monthly', exact: true }).check();
  await page.setViewportSize({ width: 1200, height: 900 });
  await expect(page.locator('.billing-dock')).not.toBeVisible();
  await expect(page.locator('.billing--desktop')).toBeVisible();
  await expect(page.getByRole('radio', { name: 'Monthly', exact: true })).toBeChecked();
  await expect(page.locator('#plan-plus .price-amount')).toHaveText('$40');
});

test('dock yields to dialogs and restores without locking or stealing focus', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./', { waitUntil: 'networkidle' });
  const button = page.getByRole('button', { name: 'View Plus', exact: true });
  await button.scrollIntoViewIfNeeded();
  await expect(page.locator('.billing-dock')).toBeVisible();
  await button.click();
  await expect(page.getByRole('dialog', { name: 'PLUS plan' })).toBeVisible();
  await expect(page.locator('.billing-dock')).not.toBeVisible();
  await page.keyboard.press('Escape');
  await expect(button).toBeFocused();
  await expect(page.locator('.billing-dock')).toBeVisible();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe('');
  await expect(page.locator('dialog[open]')).toHaveCount(0);
});

test('keyboard focus on a plan action is not covered by the floating control', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto('./', { waitUntil: 'networkidle' });
  const button = page.locator('#plan-business .plan-button');
  await button.evaluate((el) => {
    const r = el.getBoundingClientRect();
    window.scrollTo(0, scrollY + r.bottom - innerHeight + 4);
  });
  await expect(page.locator('.billing-dock')).toBeVisible();
  await button.evaluate((el) => (el as HTMLElement).focus({ preventScroll: true }));
  await expect
    .poll(async () => {
      const action = await button.boundingBox();
      const dock = await page.locator('.billing-dock').boundingBox();
      return action!.y + action!.height <= dock!.y - 12;
    })
    .toBe(true);
  await expect(button).toBeFocused();
});

test('editing or pinch zoom suppresses the dock; returning restores the selected period', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./', { waitUntil: 'networkidle' });
  await page.locator('#plan-plus').scrollIntoViewIfNeeded();
  await expect(page.locator('.billing-dock')).toBeVisible();
  await page.evaluate(() => {
    const field = document.createElement('input');
    field.id = 'keyboard-test-field';
    document.querySelector('#plan-plus')!.appendChild(field);
    field.focus({ preventScroll: true });
  });
  await expect(page.locator('.billing-dock')).not.toBeVisible();
  await page.evaluate(() => document.querySelector('#keyboard-test-field')?.remove());
  await expect(page.locator('.billing-dock')).toBeVisible();
  await page.evaluate(() => {
    Object.defineProperty(window.visualViewport, 'scale', { configurable: true, value: 2 });
    window.visualViewport?.dispatchEvent(new Event('resize'));
  });
  await expect(page.locator('.billing-dock')).not.toBeVisible();
  await page.evaluate(() => {
    Object.defineProperty(window.visualViewport, 'scale', { configurable: true, value: 1 });
    window.visualViewport?.dispatchEvent(new Event('resize'));
  });
  await expect(page.locator('.billing-dock')).toBeVisible();
});

test('active dock is accessible and disappears on a short landscape viewport outside pricing', async ({
  page,
}) => {
  await page.setViewportSize({ width: 844, height: 390 });
  await page.goto('./', { waitUntil: 'networkidle' });
  await page.locator('#plan-plus').scrollIntoViewIfNeeded();
  await expect(page.locator('.billing-dock')).toBeVisible();
  const results = await wcagAxe(page).include('.billing-dock').analyze();
  expect(results.violations.map((v) => v.id)).toEqual([]);
  await page.locator('.footer').scrollIntoViewIfNeeded();
  await expect(page.locator('.billing-dock')).not.toBeVisible();
});

test('visible dock is before the plan cards in natural Tab order', async ({
  page,
  browserName,
}) => {
  const allControls = browserName === 'webkit' && process.platform === 'darwin';
  const nextItem = allControls ? 'Alt+Tab' : 'Tab';
  const previousItem = allControls ? 'Alt+Shift+Tab' : 'Shift+Tab';
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./', { waitUntil: 'networkidle' });
  // Start on a real control rather than a temporarily focusable, offscreen heading.
  const firstAction = page.locator('#plan-free .plan-button');
  await firstAction.focus();
  await expect(page.locator('.billing-dock')).toBeVisible();
  // Visibility updates before the browser rebuilds its sequential-focus candidates.
  // Wait for the newly exposed fixed control to be painted, not an arbitrary delay.
  await expect(page.locator('.billing-dock')).not.toHaveAttribute('inert', '');
  await page.evaluate(
    () =>
      new Promise<void>((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
      }),
  );
  const selectedRadio = page.getByRole('radio', { name: 'Monthly', exact: true });
  await expect(selectedRadio).toHaveCSS('scroll-margin-bottom', '0px');
  const beforeFocus = await page.evaluate(() => scrollY);
  await page.keyboard.press(previousItem);
  await expect(selectedRadio).toBeFocused();
  expect(Math.abs((await page.evaluate(() => scrollY)) - beforeFocus)).toBeLessThan(1);
  await page.keyboard.press('ArrowLeft');
  await expect(page.locator('#plan-plus .price-amount')).toHaveText('$32');
  await page.keyboard.press(nextItem);
  await expect(firstAction).toBeFocused();
});

test('dock remains hidden while the visual keyboard viewport is still reduced', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./', { waitUntil: 'networkidle' });
  await page.locator('#plan-plus').scrollIntoViewIfNeeded();
  const dock = page.locator('.billing-dock');
  await expect(dock).toBeVisible();
  await page.evaluate(() => {
    Object.defineProperty(window.visualViewport, 'height', { configurable: true, value: 450 });
    window.visualViewport?.dispatchEvent(new Event('resize'));
  });
  await expect(dock).not.toBeVisible();
  await page.evaluate(() => {
    Object.defineProperty(window.visualViewport, 'height', { configurable: true, value: 844 });
    window.visualViewport?.dispatchEvent(new Event('resize'));
  });
  await expect(dock).toBeVisible();
});

test('animated dock reverses cleanly and is absent over the contact banner', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./', { waitUntil: 'networkidle' });
  const dock = page.locator('.billing-dock');
  for (const selector of ['#plan-plus', '.footer', '#plan-plus']) {
    await page.locator(selector).evaluate((el) => {
      const top = scrollY + el.getBoundingClientRect().top - 24;
      window.scrollTo({ top, behavior: 'instant' });
    });
    await page.waitForTimeout(60);
  }
  await expect(dock).toHaveAttribute('data-visible', 'true');
  await expect(dock).toHaveCSS('opacity', '1');
  await expect(dock).not.toHaveAttribute('inert', '');
  await page.locator('.contact-banner').evaluate((el) => {
    window.scrollTo({ top: scrollY + el.getBoundingClientRect().top - 24, behavior: 'instant' });
  });
  await expect(dock).not.toBeVisible();
  await expect(dock).toHaveAttribute('inert', '');
});
