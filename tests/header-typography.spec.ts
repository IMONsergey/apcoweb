import { test, expect, type Page, type Locator } from '@playwright/test';
import { translate } from '../src/i18n/messages';
import { typograph, noBreakNumber } from '../src/i18n/typography';

// Locator.click scrolls sticky controls towards the viewport center in the browser protocol.
// Exercise an ordinary pointer click on the already visible header instead.
async function clickInPlace(page: Page, control: Locator) {
  await expect(control).toBeInViewport({ ratio: 1 });
  const box = (await control.boundingBox())!;
  await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
}
async function selectInPlace(page: Page, locale: 'en' | 'ru') {
  await clickInPlace(page, page.locator('[data-language-selector]'));
  const panel = page.locator('.language-panel');
  await expect(panel).toHaveCSS('opacity', '1');
  await expect
    .poll(() => panel.evaluate((el) => el.getAnimations().some((a) => a.playState === 'running')))
    .toBe(false);
  await clickInPlace(
    page,
    page.getByRole('menuitemradio', { name: locale === 'en' ? 'English' : 'Русский', exact: true }),
  );
}

test('typography pipeline binds words, formats punctuation and preserves commercial values', () => {
  expect(translate('ru', 'Start with a query.')).toContain('с\u00a0запроса');
  expect(typograph('Поиск в интернете и работа с данными.', 'ru')).toContain('в\u00a0интернете');
  expect(typograph('Поиск в интернете и работа с данными.', 'ru')).toContain('и\u00a0работа');
  expect(typograph('Search in the internet.', 'en')).toContain('in\u00a0');
  expect(typograph('Это "поиск" - начало...', 'ru')).toContain('«поиск»');
  expect(typograph('Это "поиск" - начало...', 'ru')).toContain('\u00a0— начало…');
  expect(typograph('It\'s "search" - a start.', 'en')).toContain('“search”');
  expect(translate('en', ' / month')).toBe(' / month');
  expect(translate('en', '{amount} billed annually', { amount: '$6,912' })).toBe(
    '$6,912 billed annually',
  );
  expect(noBreakNumber('1 500 000')).toBe('1\u00a0500\u00a0000');
  const copy = typograph('Поиск в интернете и работа с данными.', 'ru');
  expect(typograph(copy, 'ru')).toBe(copy);
});

for (const width of [320, 390, 768, 1440]) {
  test(`sticky header, anchor clearance and typographic reading at ${width}px`, async ({
    page,
  }, info) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto('./?lang=en', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const input = page.getByRole('searchbox');
    const query = 'port:443 hostname:"example.com"';
    await input.fill(query);
    await input.blur();
    const header = page.locator('.site-header');
    await page.locator('#api').scrollIntoViewIfNeeded();
    await expect(header).toHaveCSS('position', 'sticky');
    await expect.poll(() => header.evaluate((el) => el.getBoundingClientRect().top)).toBe(0);
    const position = await page.evaluate(() => scrollY);
    await selectInPlace(page, 'ru');
    await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
    await expect(page.locator('html')).not.toHaveAttribute('data-locale-transition');
    expect(await page.evaluate(() => scrollY)).toBe(position);
    await expect(input).toHaveValue(query);
    await expect(page.locator('#hero-title .locale-text').first()).toContainText(
      'Начните с запроса.',
    );
    expect(await page.locator('#hero-title .locale-text').first().textContent()).toContain(
      'с\u00a0запроса',
    );
    // The conjunction also stays attached across the separate highlighted inline element.
    expect(await page.locator('.hero .lead').textContent()).toContain('и\u00a0уточняйте');
    const wraps = await page.locator('.locale-text').evaluateAll((nodes) => {
      const broken: string[] = [];
      for (const node of nodes) {
        if (node.closest('[inert], [aria-hidden="true"]') || !node.getBoundingClientRect().width)
          continue;
        const text = node.firstChild;
        if (!text || text.nodeType !== Node.TEXT_NODE) continue;
        for (const match of (text.textContent ?? '').matchAll(/\p{L}+(?:\u00a0\p{L}+)+/gu)) {
          const range = document.createRange();
          range.setStart(text, match.index);
          range.setEnd(text, match.index + match[0].length);
          const lines = [...range.getClientRects()];
          if (lines.some((rect) => Math.abs(rect.top - lines[0].top) > 1)) broken.push(match[0]);
        }
      }
      return broken;
    });
    expect(wraps).toEqual([]);
    const overflow = await page
      .locator('h1,h2,p,.header-row,.plan-card,.metric-card')
      .evaluateAll((nodes) =>
        nodes
          .filter(
            (el) =>
              !el.closest('[inert], [aria-hidden="true"], .sr-only, dialog:not([open])') &&
              el.clientWidth > 0,
          )
          .filter((el) => el.scrollWidth > el.clientWidth + 2)
          .map((el) => ({
            id: el.id,
            className: el.className,
            text: el.textContent,
            width: el.clientWidth,
            scrollWidth: el.scrollWidth,
            fontSize: getComputedStyle(el).fontSize,
          })),
      );
    expect(overflow).toEqual([]);
    if (width >= 1200) await page.locator('.desktop-nav a[href="#pricing"]').click();
    else {
      await page.getByRole('button', { name: 'Открыть меню', exact: true }).click();
      const menu = page.getByRole('dialog', { name: 'Навигация', exact: true });
      await expect(menu).toBeVisible();
      await menu.getByRole('link', { name: 'Тарифы', exact: true }).click();
      await expect(menu).not.toBeVisible();
    }
    await expect(page).toHaveURL(/#pricing$/);
    await expect
      .poll(() =>
        page.evaluate(() => {
          const top = document.querySelector('#pricing')!.getBoundingClientRect().top;
          const bottom = document.querySelector('.site-header')!.getBoundingClientRect().bottom;
          return Math.abs(top - bottom - 24) < 1;
        }),
      )
      .toBe(true);
    await expect(header).toHaveCSS('top', '0px');
    await selectInPlace(page, 'en');
    await expect(page.locator('html')).not.toHaveAttribute('data-locale-transition');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(input).toHaveValue(query);
    await expect.poll(() => header.evaluate((el) => el.getBoundingClientRect().top)).toBe(0);
    if (width === 390 || width === 1440) {
      await page.locator('[data-language-selector]').click();
      await expect(page.getByRole('menuitemradio', { name: 'English', exact: true })).toBeVisible();
      await page.screenshot({ path: info.outputPath(`sticky-header-${width}.png`) });
    }
  });
}
