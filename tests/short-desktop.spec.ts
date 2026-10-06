import { test, expect, type Page } from '@playwright/test';
import { selectLanguage } from './helpers/locale';

async function visit(page: Page, width: number, height: number, lang = 'en') {
  await page.setViewportSize({ width, height });
  await page.goto(`./?lang=${lang}`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator('html')).not.toHaveAttribute('data-page-entering');
}

async function checkCopy(page: Page) {
  const issues = await page
    .locator(
      '.steps h2, .audiences h2, .api-copy h2, .step-copy h3, .step-copy p, .audience-copy h3, .audience-copy p, .metric-card dd',
    )
    .evaluateAll((nodes) =>
      nodes.flatMap((node) => {
        const parent = node.closest(
          '.step-card, .audience-card, .metric-card, .steps, .audiences, .api-grid',
        )!;
        const rect = node.getBoundingClientRect();
        const box = parent.getBoundingClientRect();
        const padding = parseFloat(getComputedStyle(parent).paddingRight);
        return rect.bottom > box.bottom + 1 ||
          rect.right > box.right - padding + 1 ||
          node.scrollWidth > node.clientWidth + 2
          ? [node.textContent]
          : [];
      }),
    );
  expect(issues).toEqual([]);
}

for (const [width, height] of [
  [1200, 1000],
  [1280, 600],
  [1536, 740],
  [1920, 950],
  [2560, 1320],
]) {
  test(`complete desktop scenes fit below the header at ${width}x${height}`, async ({ page }) => {
    for (const lang of ['en', 'ru']) {
      await visit(page, width, height, lang);
      await expect(page.locator('.counter')).toHaveText('1 / 3');
      const track = (await page.locator('.step-track').boundingBox())!;
      expect(track.x + track.width).toBeLessThanOrEqual(width + 1);
      const intro = (await page.locator('.steps-intro').boundingBox())!;
      expect(intro.x + intro.width).toBeLessThanOrEqual(width + 1);
      for (const selector of ['#how-it-works', '#use-cases', '#data', '#api', '.closing-section']) {
        const section = page.locator(selector);
        await section.evaluate((node) =>
          window.scrollTo({
            top: node.getBoundingClientRect().top + scrollY - 96,
            behavior: 'instant',
          }),
        );
        const box = (await section.boundingBox())!;
        expect(
          box.height,
          `${lang} ${selector} fits the available reading height`,
        ).toBeLessThanOrEqual(height - 96 + 1);
        expect(box.y + box.height).toBeLessThanOrEqual(height + 1);
      }
      await checkCopy(page);
      expect(
        await page
          .locator('.step-copy p')
          .first()
          .evaluate((n) => parseFloat(getComputedStyle(n).fontSize)),
      ).toBeGreaterThanOrEqual(18);
      const buttons = await page
        .locator('.audience-actions .double-button')
        .evaluateAll((nodes) => nodes.map((node) => node.getBoundingClientRect().height));
      expect(Math.min(...buttons)).toBeGreaterThanOrEqual(44);
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
        width + 1,
      );
    }
  });
}

test('height and language changes retain query and carousel position', async ({ page }) => {
  await visit(page, 1536, 740);
  await page.locator('.search-form input').fill('example.com port:443');
  await page.getByRole('button', { name: 'Next research step' }).click();
  await expect(page.locator('.counter')).toHaveText('2 / 3');
  await selectLanguage(page, 'ru');
  await expect(page.locator('.counter')).toHaveText('2 / 3');
  await page.setViewportSize({ width: 1536, height: 1200 });
  expect((await page.locator('#how-it-works').boundingBox())!.height).toBeGreaterThan(900);
  await page.setViewportSize({ width: 1536, height: 740 });
  await expect(page.locator('.counter')).toHaveText('2 / 3');
  await expect(page.locator('.search-form input')).toHaveValue('example.com port:443');
  expect((await page.locator('#how-it-works').boundingBox())!.height).toBeLessThanOrEqual(645);
  await checkCopy(page);
});

test('very short windows keep complete copy in normal document flow', async ({ page }) => {
  await visit(page, 1280, 480, 'ru');
  const steps = (await page.locator('#how-it-works').boundingBox())!;
  const audiences = (await page.locator('#use-cases').boundingBox())!;
  expect(steps.height).toBeGreaterThan(480 - 96);
  expect(audiences.y).toBeGreaterThanOrEqual(steps.y + steps.height - 1);
  await checkCopy(page);
});
