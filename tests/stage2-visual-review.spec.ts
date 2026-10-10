import { mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';
import { expect, test } from '@playwright/test';
import { siteRoutes } from '../src/content/routes';

const profiles = [
  { id: 'desktop-1440', width: 1440, height: 900 },
  { id: 'desktop-1920', width: 1920, height: 1080 },
  { id: 'mobile-390', width: 390, height: 844 },
] as const;

const extras = [
  { id: 'short-1366', width: 1366, height: 768 },
  { id: 'compact-320', width: 320, height: 740 },
] as const;

function slug(value: string) {
  return value === '/' ? 'home' : value.slice(1).replaceAll('/', '--');
}

for (const route of siteRoutes) {
  for (const profile of profiles) {
    for (const theme of ['light', 'dark'] as const) {
      test(
        'visual review ' + slug(route.path) + ' ' + profile.id + ' ' + theme,
        async ({ page }, testInfo) => {
          test.skip(testInfo.project.name !== 'chromium', 'Reference capture uses Chromium only.');
          test.setTimeout(100_000);
          await page.setViewportSize({ width: profile.width, height: profile.height });
          await page.addInitScript(
            (mode) => localStorage.setItem('apcosys-theme-mode', mode),
            theme,
          );
          await page.goto('.' + route.path, { waitUntil: 'networkidle' });
          await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
          await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
          await page.evaluate(() => document.fonts.ready);
          await expect
            .poll(() =>
              page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 2),
            )
            .toBe(true);
          const name = slug(route.path) + '-' + profile.id + '-' + theme + '.png';
          const output = testInfo.outputPath('stage2-visual', name);
          await mkdir(dirname(output), { recursive: true });
          await page.screenshot({
            path: output,
            animations: 'disabled',
            fullPage: true,
            caret: 'hide',
            mask: [page.locator('canvas')],
            maskColor: '#838b90',
          });
        },
      );
    }
  }
}

for (const path of ['/', '/platform/search-investigation', '/pricing', '/platform/monitoring']) {
  for (const profile of extras) {
    for (const theme of ['light', 'dark'] as const) {
      test(
        'visual edge ' + slug(path) + ' ' + profile.id + ' ' + theme,
        async ({ page }, testInfo) => {
          test.skip(testInfo.project.name !== 'chromium', 'Reference capture uses Chromium only.');
          test.setTimeout(100_000);
          await page.setViewportSize({ width: profile.width, height: profile.height });
          await page.addInitScript(
            (mode) => localStorage.setItem('apcosys-theme-mode', mode),
            theme,
          );
          await page.goto('.' + path, { waitUntil: 'networkidle' });
          await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
          const name = slug(path) + '-' + profile.id + '-' + theme + '.png';
          const output = testInfo.outputPath('stage2-visual', name);
          await mkdir(dirname(output), { recursive: true });
          await page.screenshot({
            path: output,
            animations: 'disabled',
            fullPage: true,
            caret: 'hide',
            mask: [page.locator('canvas')],
            maskColor: '#838b90',
          });
        },
      );
    }
  }
}
