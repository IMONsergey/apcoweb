# Quality assurance

Run checks against a clean dependency installation.

```sh
npm ci
npm run check
npm run build
npx playwright install chromium firefox webkit
npm test
```

`npm run check` validates asset completeness, rendering module integrity, formatting, ESLint and TypeScript. `npm run test:smoke` runs the full test collection in Chromium; `npm test` runs Chromium, Firefox and WebKit.

Browser tests cover responsive dimensions, themes, keyboard access, menus, dialogs, carousel interaction, asset loading, motion preferences, contrast scans and navigation. Test evidence is generated under `test-results/` and `playwright-report/` and is ignored by Git.

For a deployed instance, run `APCO_BASE_URL=https://your-host/ npm run test:production`. The configured base URL must match the deployed path.

Automated tests do not guarantee complete WCAG conformance, physical-device compatibility or correct business content. Validate on actual target devices and confirm the external product endpoints before acceptance.
