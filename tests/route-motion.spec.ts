import { expect, test } from '@playwright/test';

for (const mode of ['native', 'fallback', 'reduced'] as const) {
  test(`navigation keeps the current page while loading and restores history: ${mode}`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: mode === 'reduced' ? 'reduce' : 'no-preference' });
    if (mode === 'fallback')
      await page.addInitScript(() => {
        Object.defineProperty(document, 'startViewTransition', { value: undefined });
      });
    let release: (() => void) | undefined;
    const gate = new Promise<void>((resolve) => (release = resolve));
    let requested = false;
    await page.route('**/CommercialPages-*.js', async (route) => {
      requested = true;
      await gate;
      await route.continue();
    });
    await page.goto('./platform/data-methodology');
    await expect(page.locator('main h1')).toBeVisible();
    const heading = await page.locator('main h1').textContent();
    await page.evaluate(() => scrollTo({ top: 700, behavior: 'instant' }));
    await expect.poll(() => page.evaluate(() => history.state?.apcoScrollY)).toBe(700);
    await page.evaluate(() => {
      document.querySelector<HTMLAnchorElement>('.site-header a[href$="/pricing"]')!.click();
    });
    await expect.poll(() => requested).toBe(true);
    await page.waitForTimeout(250);
    await expect(page.locator('main h1')).toHaveText(heading!);
    await expect(page.locator('.route-fallback')).toHaveCount(0);
    expect(await page.evaluate(() => scrollY)).toBe(700);
    release!();
    await expect(page.locator('main h1')).toContainText('Choose the access');
    await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
    await expect(page.locator('main h1')).toBeFocused();
    // Back may interrupt the still-running view transition.
    await page.goBack();
    await expect(page.locator('main h1')).toHaveText(heading!);
    await expect.poll(() => page.evaluate(() => Math.abs(scrollY - 700))).toBeLessThan(2);
    await page.goForward();
    await expect(page.locator('main h1')).toContainText('Choose the access');
    await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
  });
}

test('capability content overlaps softly and leaves only the selected controls', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('./');
  const panel = page.locator('.home-capabilities > .container > .morph-panel');
  await panel.scrollIntoViewIfNeeded();
  const samples = await page.evaluate(async () => {
    document
      .querySelector<HTMLButtonElement>('.home-capabilities__tabs button:nth-child(2)')!
      .click();
    const values: { incoming: number; outgoing: number }[] = [];
    for (let i = 0; i < 38; i++) {
      await new Promise(requestAnimationFrame);
      const root = document.querySelector('.home-capabilities > .container > .morph-panel')!;
      const incoming = root.querySelector('.morph-panel__content')!;
      const outgoing = root.querySelector('.morph-panel__outgoing');
      values.push({
        incoming: Number(getComputedStyle(incoming).opacity),
        outgoing: outgoing ? Number(getComputedStyle(outgoing).opacity) : 0,
      });
    }
    return values;
  });
  expect(samples.some((s) => s.incoming > 0.15 && s.incoming < 0.85 && s.outgoing > 0.15)).toBe(
    true,
  );
  await expect(panel.locator('.morph-panel__outgoing')).toHaveCount(0);
  await expect(page.getByRole('checkbox', { name: 'HTTPS only' })).toHaveCount(1);
});

test('returning to the current page cancels an unfinished navigation', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  let release: (() => void) | undefined;
  const gate = new Promise<void>((resolve) => (release = resolve));
  let requested = false;
  await page.route('**/CommercialPages-*.js', async (route) => {
    requested = true;
    await gate;
    await route.continue();
  });
  await page.goto('./');
  await expect(page.locator('main h1')).toBeVisible();
  await page.evaluate(() =>
    document.querySelector<HTMLAnchorElement>('.site-header a[href$="/pricing"]')!.click(),
  );
  await expect.poll(() => requested).toBe(true);
  await page.evaluate(() =>
    document.querySelector<HTMLAnchorElement>('.site-header .brand')!.click(),
  );
  release!();
  await page.waitForTimeout(700);
  await expect(page.locator('main')).toHaveAttribute('data-route', '/');
  await expect(page).not.toHaveURL(/\/pricing$/);
});
