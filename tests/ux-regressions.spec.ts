import { test, expect } from '@playwright/test';

test('rapid carousel clicks accumulate and Home/End reach real bounds', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./', { waitUntil: 'networkidle' });
  const next = page.getByRole('button', { name: 'Next research step' });
  await next.scrollIntoViewIfNeeded();
  await next.evaluate((el) => {
    for (let i = 0; i < 4; i++) (el as HTMLButtonElement).click();
  });
  await expect(page.locator('.counter')).toHaveText('5 / 5');
  await expect(next).toBeDisabled();
  await page.locator('#research-track').focus();
  await page.keyboard.press('Home');
  await expect(page.locator('.counter')).toHaveText('1 / 5');
  await page.keyboard.press('End');
  await expect(page.locator('.counter')).toHaveText('5 / 5');
});

test('desktop carousel uses its container width rather than scrollbar-inclusive viewport', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('./', { waitUntil: 'networkidle' });
  await page.addStyleTag({ content: 'html{scrollbar-gutter:stable both-edges}' });
  await expect(page.locator('.counter')).toHaveText('1 / 3');
  const sizes = await page.locator('.step-track').evaluate((el) => {
    const c = getComputedStyle(el);
    const card = el.children[0].getBoundingClientRect();
    return {
      expected: el.clientWidth - parseFloat(c.paddingRight),
      actual: card.width * 3 + parseFloat(c.gap) * 2,
    };
  });
  expect(Math.abs(sizes.actual - sizes.expected)).toBeLessThan(1);
});

test('keyboard navigation opens disclosures and moves through actual links', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('./', { waitUntil: 'networkidle' });
  const trigger = page.getByRole('button', { name: 'Platform', exact: true });
  await trigger.focus();
  await page.keyboard.press('ArrowDown');
  const links = page.locator('#nav-panel-0 a');
  await expect(links.first()).toBeFocused();
  await page.keyboard.press('End');
  await expect(links.last()).toBeFocused();
  await page.keyboard.press('ArrowUp');
  await expect(links.nth(1)).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(trigger).toBeFocused();
});

test('search clear preserves focus, input is mobile-zoom safe, and submitted feedback resets', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./', { waitUntil: 'networkidle' });
  const input = page.getByRole('searchbox');
  await input.fill('  example.com  ');
  expect(
    await input.evaluate((el) => parseFloat(getComputedStyle(el).fontSize)),
  ).toBeGreaterThanOrEqual(16);
  await page.getByRole('button', { name: 'Clear search query' }).click();
  await expect(input).toHaveValue('');
  await expect(input).toBeFocused();
  await input.fill('  example.com  ');
  // Prevent only browser navigation; React still validates and updates submit feedback.
  await page
    .locator('.search-form')
    .evaluate((el) =>
      el.addEventListener('submit', (event) => event.preventDefault(), { once: true }),
    );
  await page.locator('.search-form').dispatchEvent('submit', { bubbles: true, cancelable: true });
  await expect(input).toHaveValue('example.com');
  await expect(page.locator('.search-form')).toHaveAttribute('aria-busy', 'true');
  await expect(page.getByRole('button', { name: 'Search APCOSYS', exact: true })).toBeDisabled();
  await page.evaluate(() =>
    window.dispatchEvent(new PageTransitionEvent('pageshow', { persisted: true })),
  );
  await expect(page.getByRole('button', { name: 'Search APCOSYS', exact: true })).toBeEnabled();
});

test('closing action is aligned with the visible button in every prepared asset', async ({
  page,
}) => {
  const cases = [
    [1920, 0.5228, 0.66215],
    [1440, 0.5228, 0.66215],
    [1024, 0.538, 0.686],
    [768, 0.5515, 0.6275],
    [430, 0.4995, 0.577],
    [390, 0.5, 0.5855],
    [360, 0.5, 0.5965],
    [320, 0.5005, 0.6795],
  ];
  await page.goto('./', { waitUntil: 'networkidle' });
  for (const [width, x, y] of cases) {
    await page.setViewportSize({ width, height: 1000 });
    await page.locator('.closing-scene').scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        page.locator('.closing-scene img').evaluate((el) => (el as HTMLImageElement).complete),
      )
      .toBe(true);
    // Responsive picture decoding and scroll anchoring can settle after the viewport resize.
    await expect
      .poll(
        () =>
          page.locator('.closing-scene').evaluate(
            (el, point) => {
              const rect = el.getBoundingClientRect();
              const target = document.elementFromPoint(
                rect.left + rect.width * point[0],
                rect.top + rect.height * point[1],
              );
              return !!target?.closest('a.closing-hotspot');
            },
            [x, y],
          ),
        { message: `Visible CTA center must be clickable at ${width}px` },
      )
      .toBe(true);
    await expect(page.locator('.closing-hotspot')).toHaveCSS('min-height', '44px');
    // Firefox transforms can report 43.99997 for a 44px box; allow only subpixel rounding.
    expect((await page.locator('.closing-hotspot').boundingBox())!.height).toBeGreaterThanOrEqual(
      43.99,
    );
  }
});

test('selected plan content remains mounted while its modal closes', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('./', { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'View Plus', exact: true }).click();
  const dialog = page.getByRole('dialog', { name: 'PLUS plan' });
  await expect(dialog).toBeVisible();
  await dialog.getByRole('button', { name: 'Close dialog' }).dispatchEvent('click');
  await expect(page.locator('.selected-plan-price')).toHaveText('$40 / month');
  await expect(dialog).not.toBeVisible();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe('');
});

test('reduced-motion globe remains visibly drawn instead of losing its single WebGL frame', async ({
  page,
}) => {
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto('./', { waitUntil: 'networkidle' });
  await page.locator('#data').scrollIntoViewIfNeeded();
  const canvas = page.locator('.signal-globe canvas');
  await expect(canvas).toBeVisible();
  const pixels = await canvas.evaluate((el) => {
    const c = el as HTMLCanvasElement;
    const context = c.getContext('2d');
    if (!context) return 0;
    const data = context.getImageData(0, 0, c.width, c.height).data;
    let visible = 0;
    for (let i = 3; i < data.length; i += 64) if (data[i] > 16) visible++;
    return visible;
  });
  expect(pixels).toBeGreaterThan(100);
  const before = await canvas.evaluate((el) => (el as HTMLCanvasElement).toDataURL());
  await page.waitForTimeout(500);
  expect(await canvas.evaluate((el) => (el as HTMLCanvasElement).toDataURL())).toBe(before);
});

test('narrow tablet metric values remain inside their card padding', async ({ page }) => {
  await page.goto('./', { waitUntil: 'networkidle' });
  for (const width of [599, 600, 620, 699, 700, 768, 1199, 1200]) {
    await page.setViewportSize({ width, height: 900 });
    await page.evaluate(() => document.fonts.ready);
    const gaps = await page.locator('.metric-card dd').evaluateAll((nodes) =>
      nodes.map((el) => {
        const parent = el.parentElement!;
        return (
          parent.getBoundingClientRect().right -
          parseFloat(getComputedStyle(parent).paddingRight) -
          el.getBoundingClientRect().right
        );
      }),
    );
    expect(Math.min(...gaps), `Numeric values at ${width}px`).toBeGreaterThanOrEqual(-1);
  }
});
