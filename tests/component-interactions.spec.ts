import { test, expect } from '@playwright/test';
import { calculatePrice } from '../src/content/pricing';

const visit = async (page: import('@playwright/test').Page) => {
  await page.goto('./', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
};

test('billing math is exact and switching is reversible', async ({ page }) => {
  expect(calculatePrice(40, 'annually')).toEqual({ monthly: 32, total: 384 });
  expect(calculatePrice(240, 'annually')).toEqual({ monthly: 192, total: 2304 });
  expect(calculatePrice(720, 'annually')).toEqual({ monthly: 576, total: 6912 });
  expect(calculatePrice(0, 'annually')).toEqual({ monthly: 0, total: 0 });
  expect(() => calculatePrice(-1, 'monthly')).toThrow();
  await visit(page);
  const monthly = page.getByRole('radio', { name: 'Monthly', exact: true });
  await monthly.focus();
  await page.keyboard.press('ArrowLeft');
  await expect(page.getByRole('radio', { name: 'Annually', exact: true })).toBeChecked();
  await expect(page.locator('#plan-plus .price-amount')).toHaveText('$32');
  await page.keyboard.press('ArrowRight');
  await expect(monthly).toBeChecked();
  await expect(page.locator('#plan-plus .price-amount')).toHaveText('$40');
  await expect(page.locator('dialog[open]')).toHaveCount(0);
});

test('navigation matches the soft panel and circular-flag treatment', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await visit(page);
  const trigger = page.getByRole('button', { name: 'Platform', exact: true });
  await trigger.click();
  const styles = await page.locator('#nav-panel-0').evaluate((panel) => ({
    color: getComputedStyle(panel).backgroundColor,
    radius: getComputedStyle(panel).borderRadius,
    shadow: getComputedStyle(panel).boxShadow,
    width: panel.getBoundingClientRect().width,
    firstRow: getComputedStyle(panel.querySelector('a')!).backgroundColor,
  }));
  expect(styles).toMatchObject({
    color: 'rgb(241, 242, 244)',
    radius: '12px',
    shadow: 'none',
    firstRow: 'rgb(255, 255, 255)',
  });
  expect(styles.width).toBeLessThan(260);
  await expect(page.locator('.language svg clipPath circle')).toHaveCount(1);
  await page.keyboard.press('Escape');
  await expect(page.locator('#nav-panel-0')).toHaveAttribute('inert', '');
  await expect(trigger).toBeFocused();
});

test('search scene uses live code instead of a screenshot or baked background', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await visit(page);
  await expect(page.locator('.search-scene picture,.search-scene source')).toHaveCount(0);
  expect(
    await page
      .locator('.search-scene img')
      .evaluateAll((images) =>
        images.every((img) => (img as HTMLImageElement).src.endsWith('.svg')),
      ),
  ).toBe(true);
  await expect(page.locator('.search-title-desktop')).toHaveText('One query. A closer look.');
  await expect(page.locator('.search-preview > .visual--flow canvas')).toHaveCount(1);
  await expect(page.locator('.search-preview > .visual--dots canvas')).toHaveCount(1);
  const fog = await page.locator('.search-chrome__fog').evaluate((el) => ({
    filter: getComputedStyle(el).backdropFilter,
    mask: getComputedStyle(el).maskImage,
  }));
  expect(fog.filter).toContain('blur');
  expect(fog.mask).toContain('linear-gradient');
});

test('trust logos stay on one masked row on every target width', async ({ page }) => {
  await visit(page);
  for (const width of [1920, 1600, 1440, 1280, 1024, 768, 430, 390, 360, 320]) {
    await page.setViewportSize({ width, height: 900 });
    const result = await page.locator('.trust-viewport').evaluate((el) => ({
      mask: getComputedStyle(el).maskImage,
      tops: [...el.querySelectorAll('.trust-group:first-child li')].map(
        (n) => n.getBoundingClientRect().top,
      ),
      height: el.getBoundingClientRect().height,
    }));
    expect(result.mask).toContain('linear-gradient');
    expect(Math.max(...result.tops) - Math.min(...result.tops)).toBeLessThan(1);
    expect(result.height).toBeLessThan(96);
  }
});

test('logo marquee moves continuously and pauses for focus and reduced motion', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await visit(page);
  const viewport = page.locator('.trust-viewport');
  await viewport.scrollIntoViewIfNeeded();
  await page.mouse.move(0, 0);
  const offset = () =>
    page
      .locator('.trust-track')
      .evaluate((el) => new DOMMatrixReadOnly(getComputedStyle(el).transform).m41);
  await expect(page.locator('.trust')).toHaveAttribute('data-running', 'true');
  await expect(page.locator('.trust-track')).toHaveCSS('animation-play-state', 'running');
  const start = await offset();
  await expect.poll(offset, { timeout: 8000 }).toBeLessThan(start - 2);
  await viewport.focus();
  await expect(page.locator('.trust-track')).toHaveCSS('animation-play-state', 'paused');
  // Sample after the compositor has committed the paused animation, not the previous frame.
  await page.evaluate(
    () =>
      new Promise<void>((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
      }),
  );
  const focused = await offset();
  await page.waitForTimeout(250);
  expect(Math.abs((await offset()) - focused)).toBeLessThan(0.5);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  expect(
    await page.locator('.trust-track').evaluate((el) => getComputedStyle(el).animationName),
  ).toBe('none');
});

test('larger mobile contours do not cross body copy', async ({ page }) => {
  await visit(page);
  for (const width of [430, 390, 360, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await page.locator('#use-cases').scrollIntoViewIfNeeded();
    await expect(page.locator('.audience-art svg')).toHaveCount(2);
    const clearances = await page.locator('.audience-card').evaluateAll((cards) =>
      cards.map((card) => {
        const svg = card.querySelector('svg.animated-shape__svg') as SVGSVGElement;
        const rect = svg.getBoundingClientRect(),
          ink = svg.getBBox();
        const bottom = rect.top + ((ink.y + ink.height) / 532) * rect.height;
        const copy = card.querySelector('.audience-copy p')!.getBoundingClientRect();
        return copy.top - bottom;
      }),
    );
    expect(Math.min(...clearances)).toBeGreaterThanOrEqual(-1);
  }
});

test('metric typography and footer match the requested details', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await visit(page);
  const metric = await page.locator('.metric-card--products dd').evaluate((el) => ({
    family: getComputedStyle(el).fontFamily,
    size: getComputedStyle(el).fontSize,
    right: el.getBoundingClientRect().right,
    parent: el.parentElement!.getBoundingClientRect().right,
  }));
  expect(metric.family).toContain('IBM Plex Mono');
  expect(metric.size).toBe('24px');
  expect(metric.right).toBeLessThan(metric.parent);
  await expect(page.locator('.metric-card--cves dt > span')).toHaveCount(1);
  expect(
    await page
      .locator('.contact-banner h3')
      .evaluate((el) => parseFloat(getComputedStyle(el).fontSize)),
  ).toBeGreaterThanOrEqual(36);
  await expect(page.locator('.footer .motion-toggle')).toHaveCount(0);
  expect(
    await page
      .locator('.footer-email strong')
      .evaluate((el) => Number(getComputedStyle(el).fontWeight)),
  ).toBeGreaterThanOrEqual(600);
});

test('FAQ and dialogs settle after interrupted motion without stale heights', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await visit(page);
  const details = page.locator('.faq-list details').nth(1);
  const summary = details.locator('summary');
  for (let i = 0; i < 4; i++) {
    await summary.dispatchEvent('click');
    await page.waitForTimeout(40);
  }
  await page.waitForTimeout(320);
  await expect(details).not.toHaveAttribute('open', '');
  expect(await details.evaluate((el) => (el as HTMLElement).style.height)).toBe('');
  await summary.click();
  await page.waitForTimeout(320);
  await expect(details).toHaveAttribute('open', '');
  const button = page.getByRole('button', { name: 'View a detailed comparison' });
  await button.click();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog', { name: 'Compare plans' })).not.toBeVisible();
  await expect(button).toBeFocused();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe('');
});
