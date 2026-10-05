import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

async function openLanding(page: Page) {
  await page.goto('./', { waitUntil: 'networkidle' });
  await expect(page).toHaveTitle(/^APCOSYS/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Start with a query.');
  await page.evaluate(() => document.fonts.ready);
}

const widths = [1920, 1600, 1440, 1366, 1280, 1024, 768, 430, 390, 360, 320];
for (const width of widths) {
  test(`layout and assets at ${width}px`, async ({ page }, testInfo) => {
    const runtimeErrors: string[] = [];
    const failedAssets: string[] = [];
    page.on('pageerror', (error) => runtimeErrors.push(error.message));
    page.on('response', (response) => {
      if (response.status() >= 400 && response.url().includes('/apcoweb/'))
        failedAssets.push(response.url());
    });
    await page.setViewportSize({ width, height: width === 768 ? 1024 : 900 });
    await openLanding(page);
    // Request offscreen media as well so the asset check does not mistake lazy images for failures.
    await page.evaluate(() => {
      for (const img of document.images) img.loading = 'eager';
    });
    await expect
      .poll(() =>
        page.evaluate(() => [...document.images].every((i) => i.complete && i.naturalWidth > 0)),
      )
      .toBe(true);
    for (const selector of [
      '#how-it-works',
      '#use-cases',
      '#data',
      '#api',
      '#pricing',
      '#faq',
      '.closing-section',
    ]) {
      await page.locator(selector).scrollIntoViewIfNeeded();
      await page.waitForTimeout(100);
    }
    await expect(page.locator('.plan-card')).toHaveCount(4);
    await expect(page.locator('.step-card')).toHaveCount(5);
    const geometry = await page.evaluate(() => {
      const checks = [
        ...document.querySelectorAll<HTMLElement>(
          'h1, h2, .audience-card, .audience-copy, .audience-actions, .plan-card, .faq-list, .search-form, .closing-scene, .header-row',
        ),
      ];
      return {
        viewport: innerWidth,
        document: document.documentElement.scrollWidth,
        overflow: checks
          .filter((el) => {
            const r = el.getBoundingClientRect();
            return (
              r.width &&
              (r.left < -1 ||
                r.right > innerWidth + 1 ||
                (!el.classList.contains('audience-card') && el.scrollWidth > el.clientWidth + 2))
            );
          })
          .map((el) => el.className || el.tagName),
        anchors: [...document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')]
          .filter((a) => !document.getElementById(a.hash.slice(1)))
          .map((a) => a.getAttribute('href')),
      };
    });
    expect(geometry.document).toBeLessThanOrEqual(width + 1);
    expect(geometry.overflow).toEqual([]);
    expect(geometry.anchors).toEqual([]);
    expect(runtimeErrors).toEqual([]);
    expect(failedAssets).toEqual([]);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(250);
    await page.screenshot({ path: testInfo.outputPath(`landing-${width}.png`), fullPage: true });
  });
}

test('desktop disclosure menus, keyboard closing and local anchors', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await openLanding(page);
  const trigger = page.getByRole('button', { name: 'Platform', exact: true });
  await trigger.click();
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#nav-panel-0')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await expect(trigger).toBeFocused();
  await page.getByRole('link', { name: 'See how it works', exact: true }).click();
  expect(
    await page.evaluate(() =>
      Math.abs(document.getElementById('how-it-works')!.getBoundingClientRect().top),
    ),
  ).toBeLessThan(80);
});

test('mobile navigation scroll, dismissal, focus restoration', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await openLanding(page);
  const trigger = page.getByRole('button', { name: 'Open navigation' });
  await trigger.click();
  const dialog = page.getByRole('dialog', { name: 'Navigation' });
  await expect(dialog).toBeVisible();
  await dialog.getByRole('link', { name: 'Pricing', exact: true }).click();
  await expect(dialog).not.toBeVisible();
  await expect(page).toHaveURL(/#pricing$/);
  await page.evaluate(() => window.scrollTo(0, 0));
  await trigger.click();
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe('');
});

test('carousel reaches both ends with correct counter', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openLanding(page);
  const next = page.getByRole('button', { name: 'Next research step' });
  const previous = page.getByRole('button', { name: 'Previous research step' });
  await expect(previous).toBeDisabled();
  for (let i = 0; i < 4; i++) {
    await next.click();
    await page.waitForTimeout(120);
  }
  await expect(page.locator('.counter')).toHaveText('5 / 5');
  await expect(next).toBeDisabled();
  await previous.click();
  await expect(page.locator('.counter')).toHaveText('4 / 5');
});

test('FAQ preserves independent states and grows with text', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await openLanding(page);
  const details = page.locator('.faq-list details');
  await expect(details.nth(0)).toHaveAttribute('open', '');
  await details.nth(1).locator('summary').click();
  await expect(details.nth(1)).toHaveAttribute('open', '');
  await expect(details.nth(0)).toHaveAttribute('open', '');
  await details
    .nth(1)
    .locator('p')
    .evaluate((el) => (el.textContent = 'This is a long editorial content check. '.repeat(30)));
  const box = await details.nth(1).evaluate((el) => ({
    scroll: el.scrollHeight,
    height: el.clientHeight,
    width: el.scrollWidth,
    clientWidth: el.clientWidth,
  }));
  expect(box.scroll).toBeLessThanOrEqual(box.height + 1);
  expect(box.width).toBeLessThanOrEqual(box.clientWidth + 1);
});

test('search validates locally and forwards the verified URL parameter', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openLanding(page);
  await page.getByRole('button', { name: 'Search APCOSYS', exact: true }).click();
  await expect(page.getByRole('alert')).toHaveText('Enter a domain, IP or technical attribute.');
  await page.getByRole('searchbox').fill('example.com');
  await page.route('https://apcosys.net/search?*', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'text/html',
      body: '<title>Search handoff test</title>',
    }),
  );
  await page.getByRole('button', { name: 'Search APCOSYS', exact: true }).click();
  await expect(page).toHaveURL('https://apcosys.net/search?search_value=example.com');
});

test('native billing selection applies the approved 20 percent discount', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openLanding(page);
  await page.locator('#plan-plus').scrollIntoViewIfNeeded();
  await expect(page.locator('.price-amount')).toHaveText(['$0', '$40', '$240', '$720']);
  await page.getByRole('radio', { name: 'Annually', exact: true }).check();
  await expect(page.locator('dialog[open]')).toHaveCount(0);
  await expect(page.locator('.price-amount')).toHaveText(['$0', '$32', '$192', '$576']);
  await expect(page.locator('#plan-plus .plan-billing-note')).toHaveText('$384 billed annually');
  await expect(page.locator('#plan-expert .plan-billing-note')).toHaveText(
    '$2,304 billed annually',
  );
  await expect(page.locator('#plan-business .plan-billing-note')).toHaveText(
    '$6,912 billed annually',
  );
  await page.getByRole('button', { name: 'View a detailed comparison' }).click();
  await expect(page.getByRole('dialog', { name: 'Compare plans' })).toBeVisible();
  await expect(page.getByRole('table')).toContainText('$32');
  await expect(page.getByRole('table')).toContainText('$384');
  await page.keyboard.press('Escape');
  await page.getByRole('radio', { name: 'Monthly', exact: true }).check();
  await expect(page.locator('.price-amount')).toHaveText(['$0', '$40', '$240', '$720']);
  await page.getByRole('button', { name: 'View Plus', exact: true }).click();
  await expect(page.getByRole('dialog', { name: 'PLUS plan' })).toContainText('$40 / month');
});

for (const width of [1440, 390])
  test(`accessibility scan at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await openLanding(page);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(
      results.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })),
    ).toEqual([]);
  });

test('supplied motion runs and stops for the device preference without a footer control', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await openLanding(page);
  const canvas = page.locator('.turquoise-flow canvas');
  await canvas.scrollIntoViewIfNeeded();
  await expect(canvas).toBeVisible();
  const sample = () => canvas.evaluate((c: HTMLCanvasElement) => c.toDataURL());
  const before = await sample();
  await page.waitForTimeout(600);
  expect(await sample()).not.toEqual(before);
  await expect(page.getByRole('button', { name: 'Pause motion', exact: true })).toHaveCount(0);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.waitForTimeout(250);
  const reduced = await sample();
  await page.waitForTimeout(450);
  expect(await sample()).toEqual(reduced);
});
