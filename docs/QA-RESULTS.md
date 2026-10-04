# QA results — screenshot review R2

84/84 automated checks passed: 28 cases in each of Chromium, Firefox and WebKit. No skipped, unexpected or flaky results.

Layout and asset checks cover 1920, 1600, 1440, 1366, 1280, 1024, 768, 430, 390, 360 and 320 px. Accessibility scans cover 1440 and 390 px. New cases verify the native annual discount, synchronized totals, single-row masked marquee, pause/reduced-motion behavior, live upper scene, enlarged contour clearance, metric typography, footer, and interrupted FAQ/dialog transitions.

`npm ci`, the six-engine source verification, ESLint, TypeScript and the production build passed. The production build is tested, not only the Vite development server. A production-only backdrop-filter minification issue was found and corrected before release.

Screenshots in `docs/screenshots/` show the tested build. These are browser-engine tests, not a guarantee for every physical device or a complete manual assistive-technology audit. No product payment/API transaction was performed.
