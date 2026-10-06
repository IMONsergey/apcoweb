# APCOSYS website

React + TypeScript + Vite implementation of the APCOSYS landing page. Plain CSS, semantic HTML and the supplied Canvas/SVG effects; no component framework or Tailwind.

**Published preview:** https://imonsergey.github.io/apcoweb/

Current branch review: [R12 intrinsic responsiveness and five scenes](docs/REVIEW-R12.md), compared against the exact [R10 entrance and composition](docs/REVIEW-R10.md). Main and its published Pages site remain unchanged. See [verification evidence](docs/QA-RESULTS.md).

## Development

```sh
npm ci
npm run dev
```

Development runs at `http://127.0.0.1:5187/apcoweb/`. Node 22.12 or newer is required. The standard Vite port is intentionally not used to avoid colliding with other local projects.

```sh
npm run check       # ESLint and TypeScript
npm run build       # production output in dist
npm run preview     # http://127.0.0.1:4187/apcoweb/
npx playwright install chromium firefox webkit
npm test            # cross-browser checks
npm run test:smoke  # Chromium checks used in CI
```

## Structure

- `src/components/sections/`: independently editable landing sections.
- `src/components/sections/{StepCarousel,AudienceSection,DataSection,ApiSection}.css`: consolidated component styles, named container queries and shared spacing/media density tokens.
- `src/components/ui/`: shared split button, icon and native dialog.
- `src/content/site.ts`: metrics, plans, navigation, carousel and footer data.
- `src/i18n/`: EN/RU copy, quiet locale transitions and the shared Typograf pipeline. Translated text is formatted after interpolation; input queries, URLs and source artwork keep their original syntax.
- `src/i18n/localeFonts.ts`: font preparation for the quiet text handoff; no alternate-language rendering or dimension reservation. Native CSS sizes the current copy.
- `src/i18n/pageEntrance.ts`: the page itself softly appears once both search-background engines have painted and initial fonts/images are ready, independent of language switching. Initial HTML defines the opacity transition; no timer reveals incomplete content and there is no separate loader or brand surface.
- `src/visuals/firstPaint.ts`: first-frame readiness from the unchanged canvas engines, including late layout and unsupported-canvas fallback.
- `src/hooks/useSearchEntrance.ts`: moves only the live search group into the first viewport when there is room, then settles it in the stationary mockup.
- `src/styles/`: tokens, typefaces and responsive page styles.
- `src/visuals/`: the supplied animation engines and their React wrappers.
- `src/visuals/api/`: the supplied API demo, loaded near the API section.
- `src/visuals/product/`: the five supplied carousel scenes in one lazy module. Both demos share the existing GSAP chunk; scene scaling uses the browser's SVG viewBox, not JavaScript layout measurement.
- `public/media/`: optimized local assets exported from Figma.
- `tests/`: browser geometry, interactions, assets, accessibility and motion checks.
- `docs/`: implementation decisions, content status and QA.

## Deployment

A push to `main` triggers `.github/workflows/deploy.yml`: install from the lockfile, lint/typecheck, build, browser smoke tests, then deploy `dist` with GitHub Pages. Vite's base path is `/apcoweb/`. No client-side secrets or custom backend are needed.

This is a review deployment and has `noindex` plus `robots.txt`. It must not be mistaken for the final public product or checkout. See `docs/CONTENT-STATUS.md` before a production-domain launch.

## Source design

Figma file `lLMSuy0RrCiPhg873xpVUY`, page **CLEAR WORK — Handoff**, 1440 source frame `552:319`; mobile insertions are exported from **saas mobile**. Desktop composition is the visual reference; smaller layouts use natural HTML reflow rather than scaling the whole page.
