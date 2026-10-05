import { expect, type Page } from '@playwright/test';

export async function revealHeader(page: Page) {
  const header = page.locator('.site-header');
  // Finish the browser's queued focus scroll before checking the navigation state.
  await expect
    .poll(async () => {
      const before = await page.evaluate(() => scrollY);
      await page.waitForTimeout(80);
      return before === (await page.evaluate(() => scrollY));
    })
    .toBe(true);
  if ((await header.getAttribute('data-hidden')) === 'true') {
    const viewport = page.viewportSize()!;
    await page.mouse.move(8, viewport.height / 2);
    await page.mouse.wheel(0, -80);
    await expect(header).toHaveAttribute('data-hidden', 'false');
  }
  await expect(header).toHaveCSS('transform', 'matrix(1, 0, 0, 1, 0, 0)');
}

export async function selectLanguage(page: Page, language: 'en' | 'ru') {
  await revealHeader(page);
  const trigger = (await page.locator('[data-language-selector]').boundingBox())!;
  await page.mouse.click(trigger.x + trigger.width / 2, trigger.y + trigger.height / 2);
  await expect(page.locator('.language-panel')).toHaveCSS('opacity', '1');
  const option = page.getByRole('menuitemradio', {
    name: language === 'en' ? 'English' : 'Русский',
    exact: true,
  });
  await expect(option).toBeInViewport({ ratio: 1 });
  const box = (await option.boundingBox())!;
  await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
  // Inspect rendered geometry after native inherited font styles have reached a paint.
  await page.evaluate(
    () =>
      new Promise<void>((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
      ),
  );
}
