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

## Bundle limits

Production builds enforce an initial JavaScript entry budget of 400 KiB and CSS
entry budget of 100 KiB (uncompressed). Run `npm run verify:bundle` after a
build to inspect these limits. Decorative renderers and the API walkthrough
are lazy-loaded and monitored through the browser suite.

## Browser selection

Use `npx playwright install chromium firefox webkit` for normal local runs and
CI. To test with an already-installed browser executable, set one of
`APCO_CHROMIUM_EXECUTABLE`, `APCO_FIREFOX_EXECUTABLE` or
`APCO_WEBKIT_EXECUTABLE`. Playwright has no machine-specific browser paths.

## Visual regression screenshots

The CI suite checks 12 committed Chromium baselines on Linux (desktop/mobile,
Light/Dark, hero, pricing, walkthrough and navigation). Screenshots are stored in
`tests/visual-regression.spec.ts-snapshots/`. Missing baselines fail CI; macOS and
Windows skip pixel comparisons because font rasterization differs by platform.

To intentionally refresh screenshots, capture them using the pinned Playwright
browser on Ubuntu 24.04:

```sh
APCO_VISUAL_CAPTURE=1 npx playwright test tests/visual-regression.spec.ts --project=chromium --workers=1
```

The capture is written under `test-results/`. Review the images against the
approved design, copy only approved `*-chromium-linux.png` files into the
snapshot folder, and commit them alongside their corresponding changes.
The pull-request workflow must not write back to the repository.
