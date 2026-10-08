import { defineConfig } from '@playwright/test';
const browserExecutables = {
  chromium: process.env.APCO_CHROMIUM_EXECUTABLE,
  firefox: process.env.APCO_FIREFOX_EXECUTABLE,
  webkit: process.env.APCO_WEBKIT_EXECUTABLE,
};
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
      ...(browserExecutables[browserName]
        ? {
            launchOptions: {
              executablePath: browserExecutables[browserName],
              ...(browserName === 'chromium'
                ? { args: ['--no-sandbox', '--disable-dev-shm-usage'] }
                : {}),
            },
          }
        : {}),
    },
  })),
  ...(process.env.APCO_BASE_URL
    ? {}
    : {
        webServer: {
          command: 'npm run preview',
          url: 'http://127.0.0.1:4187/apcoweb/',
          reuseExistingServer: !process.env.CI,
          timeout: 30000,
        },
      }),
});
