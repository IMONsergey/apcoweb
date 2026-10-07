# APCOSYS website

React, TypeScript, Vite and plain CSS marketing preview. This repository contains the landing page and illustrative product scenes; authentication, search and subscriptions are hosted by APCOSYS.

The current review candidate extends `feat/dark-theme-system-2026-10-07` with the [R15 audit repairs](docs/REVIEW-R15.md). It includes Light, Dark and System, responsive navigation and five supplied product animations. `main` and older preview URLs can contain different builds: hand over the accepted source commit and its matching `dist`.

## Development and checks

Node 22.12 or newer is required.

```sh
npm ci
npm run dev                 # http://127.0.0.1:5187/apcoweb/
npm run check               # original-source checksums, lint and TypeScript
npm run format:check
npm run build               # GitHub Pages /apcoweb/ build
npm run preview             # http://127.0.0.1:4187/apcoweb/
npx playwright install chromium firefox webkit
npm test                    # three-browser suite
npm run test:smoke          # full Chromium suite
```

`APCO_CHROMIUM_EXECUTABLE` optionally selects an already installed Chromium executable. Normal local and CI runs use Playwright's installed browsers. Animation tests explicitly enable normal motion; reduced-motion tests remain separate.

## Client handoff and hosting

For a **domain root**, including a Vercel preview:

```sh
npm ci
npm run build:root
npm run preview -- --base=/  # http://127.0.0.1:4187/
```

For an arbitrary **subdirectory**, use its exact path:

```sh
npm run build -- --base=/client-path/
npm run preview -- --base=/client-path/
```

Upload the contents of `dist` to the matching HTTP location. Opening `index.html` with `file://` is not a deployment. Check a hard reload and all JS/CSS/media/font requests at the final path. Tests can target a running build with `APCO_BASE_URL=https://preview.example/`.

Hand over `dist`, the matching source commit/branch, `package-lock.json`, this README and `docs/CONTENT-STATUS.md`. Retain the exact commit SHA and SHA-256 checksums in the delivery archive. A clean checkout of `main` is not automatically the accepted preview.

`.github/workflows/deploy.yml` validates and publishes GitHub Pages only for `main`; the standard base is `/apcoweb/`. The review workflow tests Chromium, Firefox and WebKit. A root-domain build must use `build:root` or an explicit `--base=/` override.

This remains a client preview with `noindex` and a disallowing `robots.txt`. They are intentional until a separately approved production launch.

## Implementation

- `src/components/sections/`: landing sections and component CSS.
- `src/components/ui/`: one-stop split buttons, native dialogs, language disclosure and appearance controls.
- `src/theme/`: persisted Light/Dark/System, OS changes and cross-tab updates.
- `src/styles/tokens.css`: separate semantic colors and typography sizes; `theme.css` changes paint roles.
- `src/content/site.ts`: existing prices, entitlements, metrics and destinations.
- `src/i18n/`: English UI and Typograf formatting. RU and Chinese are unavailable and labelled SOON; translation source is retained for future editorial work.
- `src/i18n/pageEntrance.ts`: soft page entrance after fonts, initial images and both search backgrounds are ready, without a loader.
- `src/visuals/`: six protected supplied originals plus maintained adapters. `verify:visuals` verifies original-source preservation; adapters and demos also pass ESLint and browser lifecycle tests.
- `public/media/`: local source images and smaller responsive poster variants.
- `tests/`: interaction, geometry, keyboard, accessibility, responsive and animation regressions.
- `docs/`: current review notes, content status and historical provenance.

The API composition intentionally remains cyan with a light product interface in both themes. Search starts with the same turquoise field in Light and Dark; its lower fade resolves to the selected page background. Preserve the two-part DoubleButton and original effects.

## Source design

Figma file `lLMSuy0RrCiPhg873xpVUY`, page **CLEAR WORK — Handoff**, desktop frame `552:319`; phone artwork comes from **saas mobile**. Responsive layouts use normal reflow and retain the approved composition. No Figma changes are part of these code repairs.
