import { defineConfig } from '@playwright/test';
import { existsSync } from 'node:fs';
import { homedir } from 'node:os';

const cache = `${homedir()}/Library/Caches/ms-playwright`;
const cachedPaths = {
  chromium: `${cache}/chromium_headless_shell-1234/chrome-headless-shell-mac-x64/chrome-headless-shell`,
  firefox: `${cache}/firefox-1538/firefox/Nightly.app/Contents/MacOS/firefox`,
  webkit: `${cache}/webkit-2336/pw_run.sh`,
};
const cached = process.env.APCO_USE_CACHED_BROWSERS === '1';
const chromiumExecutable = process.env.APCO_CHROMIUM_EXECUTABLE;
export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: process.env.CI ? 2 : 1,
  timeout: 45000,
  expect: { timeout: 10000 },
  retries: process.env.CI ? 1 : 0,
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['json', { outputFile: 'test-results/results.json' }],
  ],
  use: {
    baseURL: process.env.APCO_BASE_URL || 'http://127.0.0.1:4187/apcoweb/',
    reducedMotion: 'reduce',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: (['chromium', 'firefox', 'webkit'] as const).map((browserName) => ({
    name: browserName,
    use: {
      browserName,
      launchOptions:
        browserName === 'chromium' && chromiumExecutable
          ? {
              executablePath: chromiumExecutable,
              args: ['--no-sandbox', '--disable-dev-shm-usage'],
            }
          : cached && existsSync(cachedPaths[browserName])
            ? { executablePath: cachedPaths[browserName] }
            : {},
    },
  })),
  webServer: process.env.APCO_BASE_URL
    ? undefined
    : {
        command: 'npm run preview',
        url: 'http://127.0.0.1:4187/apcoweb/',
        reuseExistingServer: !process.env.CI,
        timeout: 30000,
      },
});
