import { existsSync } from 'node:fs';
import { basename } from 'node:path';
import { expect, test } from '@playwright/test';

const scenes = [
  { key: 'hero-desktop', width: 1440, height: 900, section: 'top' },
  { key: 'hero-mobile', width: 390, height: 844, section: 'top' },
  { key: 'pricing-desktop', width: 1440, height: 900, section: 'pricing' },
  { key: 'pricing-mobile', width: 390, height: 844, section: 'pricing' },
  { key: 'steps-desktop', width: 1440, height: 900, section: 'how-it-works' },
  { key: 'menu-mobile', width: 390, height: 844, section: 'menu' },
] as const;

for (const theme of ['light', 'dark'] as const) {
  for (const scene of scenes) {
    test(`${scene.key} ${theme}`, async ({ page }, testInfo) => {
      const filename = `${scene.key}-${theme}.png`;
      const capture = process.env.APCO_VISUAL_CAPTURE === '1';
      const snapshotPath = testInfo.snapshotPath(filename);
      if (testInfo.project.name !== 'chromium') test.skip();
      if (!capture && !existsSync(snapshotPath)) test.skip();

      await page.setViewportSize({ width: scene.width, height: scene.height });
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.addInitScript((mode) => {
        localStorage.setItem('apcosys-theme-mode', mode);
      }, theme);
      await page.goto('./', { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
      await expect(page.locator('html')).toHaveAttribute('data-site-ready', 'true');

      if (scene.section === 'menu') {
        await page.getByRole('button', { name: 'Open navigation' }).click();
        await expect(page.getByRole('dialog', { name: 'Navigation' })).toBeVisible();
      } else if (scene.section !== 'top') {
        await page.evaluate((id) => {
          const section = document.getElementById(id);
          if (!section) throw new Error(`Missing visual section: ${id}`);
          window.scrollTo({
            top: section.getBoundingClientRect().top + window.scrollY - 82,
            behavior: 'instant',
          });
        }, scene.section);
        await expect(page.locator(`#${scene.section}`)).toBeInViewport();
      }
      const options = {
        animations: 'disabled' as const,
        caret: 'hide' as const,
        mask: [
          page.locator('canvas'),
          page.locator('.trust-track'),
          page.locator('api-developer-demo'),
        ],
        maskColor: '#7f878c',
      };
      if (capture) {
        await page.screenshot({
          ...options,
          path: testInfo.outputPath(basename(snapshotPath)),
        });
      } else {
        await expect(page).toHaveScreenshot(filename, {
          ...options,
          maxDiffPixelRatio: 0.015,
          threshold: 0.2,
        });
      }
    });
  }
}
