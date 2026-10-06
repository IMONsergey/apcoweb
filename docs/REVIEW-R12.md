# R12 — intrinsic responsiveness and five supplied scenes

This is an isolated comparison candidate. The owner rejected PR #12's height pass and explicitly prohibited changing or merging `main` without a new confirmation. Main remains `7951f19afce1b95ab13f3f6c3cd47931c8a4620b`; GitHub Pages remains its existing deployment.

## Independent baseline

`compare/pre-height-r10` starts from current main and completely reverts merge `7951f19` with mainline parent 1. The local revert is `fba0c8abda8cfe210829f4c69126fa5c4001adad`; the connector-published equivalent is `d6ef695c06e454daa29e1dcc688589e1e45dd86f`. Their full tree is `8b43d3f2ef3c58a74cd23301862fb3a63d3dc4b7`, exactly equal to `92badd2^{tree}`, including runtime, tests and documentation. There is no residual R11 CSS or baseline-only code change.

Public baseline: https://apcoweb-review-5kfwzk0ki-cdo-2844s-projects.vercel.app/

`test/responsive-core-r12` was created strictly from that rollback. Its remote comparison commit has the baseline commit as parent. The draft PR and its description record the final R12 source, independent preview URL and subsequent CI/live results. Nothing in this review authorizes a main merge.

## CSS architecture

- `StepCarousel.css`, `AudienceSection.css`, `DataSection.css` and `ApiSection.css` sit beside their components. Their rules were removed from the older global refinement/localization/mobile files and consolidated in original cascade order. No R12 patch stylesheet or additional cascade layer is introduced. Unrelated sections retain their existing cascade.
- The four sections are named inline-size containers (`research`, `audiences`, `data`, `api`). Their width-dependent component decisions use container queries. Flexible columns use `minmax(0, …)` and children have intrinsic minimums. A three-browser test narrows only the component while keeping a 1920 px viewport and verifies the appropriate carousel/audience composition.
- Shared gutter, section spacing and component gaps/paddings use `clamp()`, `min()` and density variables. Normal desktop values reproduce R10. There is exactly one short-desktop state: `min-width: 1200px` and `max-height: 800px`, setting space density to `.55` and media density to `.82`.
- Density reduces section padding, internal gaps, unnecessary minimum media heights and artwork size. It preserves title/body font sizes, weights, line heights, explicit breaks, CTA direction, original image `object-fit`, artwork anchors and metric placement. No height-sized fonts, hidden breaks, rearranged actions or forced viewport section heights are added.
- The six positioned metrics remain part of the approved globe composition. Their existing intrinsic mobile/tablet reading path is preserved. Long sections stay in natural flow instead of being cropped to a viewport.
- Root-wide `.site { overflow: clip }` is removed. Intentional clipping is local to the search/globe/closing and existing carousel/visual stages. No speculative `content-visibility` or containment is added around canvas, GSAP or anchors.

The initial CSS-only extraction was compared at all 16 requested viewport sizes in EN/RU in Chromium: zero measured geometry or computed-style differences. The final all-engine comparison also finds zero geometry differences on the four normal desktop sizes (2560×1440, 1920×1080, 1536×864, 1440×900), and zero font/line-height/weight/tracking, flex-direction or image-fit differences at all 96 cases. The supplied animated illustrations intentionally replace the five posters; the comparison claim concerns the surrounding approved layout and typography.

At 1536×740, Chromium section heights in CSS pixels are:

| Section | Baseline EN / RU | R12 EN / RU |
| --- | ---: | ---: |
| One query | 1208.8 / 1207.7 | 946.3 / 935.0 |
| Audiences | 972.2 / 972.2 | 762.7 / 760.8 |
| Data / globe | 1200 / 1200 | 991.2 / 991.2 |
| API | 796 / 803.8 | 652.7 / 677.8 |

## Supplied motion and cleanup

The expanded second archive contains all five scenes: query, results, host, evidence and suggestions. It is used once in `src/visuals/product/product-scenes.js`; the smaller three-scene module is not duplicated. Archive and module checksums are in `screenshots/r12/scene-provenance.json`. Source archives are excluded from Git.

`StepIllustration` retains the translated accessible image description and original poster fallback, and loads `StepDemoMount` near the carousel. The five scenes share one lazy chunk and the already-installed GSAP version with the API demo. Their authored visual DOM, styles, timelines and pointer behavior are retained. A native SVG `viewBox`/`foreignObject` supplies proportional scaling instead of the source's `ResizeObserver` transform layout calculation. Native SVG scaling works in all three tested engines; unsupported typed CSS division is not required. JavaScript remains responsible for motion, visibility pause and cleanup.

Each scene is inert, pauses outside the viewport/on hidden documents, disconnects its observers/listeners/timeline when removed and keeps the supplied reduced-motion static composition. Tests visit all five scenes, verify active loops and verify offscreen pause. R10 entrance readiness, eager audience contours, live search positioning, API lifecycle, fonts used at runtime, prices and all six original rendering engines are unchanged. No runtime dependencies or lockfile changes are introduced.

Seven obsolete search WebP files and six duplicate font files have no source, script, test or HTML references and are removed, together with seven obsolete manifest entries: 462,964 bytes of deployment content. This is disk/deployment savings, not a claim that unused files previously downloaded at startup. Active fonts and all five poster fallbacks remain.

## Bundle measurements

Both locked builds use the normal `/apcoweb/` base and identical Node zlib gzip settings (default level 6). Exact per-file bytes and SHA-256 are in `screenshots/r12/bundle-sizes.json`.

| Measurement | R10 baseline | R12 |
| --- | ---: | ---: |
| Initial main JS + CSS, raw | 411,487 B | 415,308 B |
| Initial main JS + CSS, gzip | 120,067 B | 120,738 B |
| All JS + CSS including lazy chunks, gzip | 176,424 B | 200,282 B |
| Complete `dist`, uncompressed | 1,733,295 B | 1,352,618 B |

Initial compressed code increases 671 B; all compressed code increases 23,858 B for the five new scenes. Complete static output decreases about 22%. The new scene chunk is approximately 79 KB raw / 23 KB gzip. Hosting previews build with `--base=/` only; the repository's Pages configuration and baseline tree are untouched.

## Verification and evidence

Locked install, six original-engine checksums, ESLint, TypeScript, formatting and production build pass. Source hashes and all 16 R12 JS/CSS build hashes match the tested isolated Mac worktree.

- Baseline: 109/109 full cached Chromium scenarios, zero failures/retries/skips.
- R12 final runtime: 127/127 full cached Chromium scenarios, zero failures/retries/skips. The subsequent test-only container-width addition passes 3/3 across cached Chromium/Firefox/WebKit; runtime is unchanged.
- Earlier targeted scene/layout suite: 54/54 (18 per engine), before the final globe/API media-size adjustment. It is supplemental evidence, not a claim that this was a final complete suite.
- Baseline and final R12: 96 viewport/language/engine cases each. No horizontal page/text overflow or JavaScript errors. Viewports: 2560×1440, 1920×1080, 1536×864, 1536×740, 1440×900, 1366×768, 1366×650, 1280×720, 1280×600, 1024×768, 768×1024, 430×932, 390×844, 360×800, 320×568, 844×390; EN/RU in Chromium, Firefox and WebKit.

All 384 final section viewport screenshots were reviewed through labeled contact sheets, with full-resolution checks of the normal desktop composition, short desktop sections, both carousel ends and phone globe. `screenshots/r12/` retains 21 selected raw PNGs, capture provenance, compact coordinate/style records for every measured element and device/build checksums. One capture attempt found no mounted section and was repeated with an explicit mounted-section wait; both the initial capture error and successful replacement are recorded. No product error or failed test is hidden by that retry.

`tests/refinement-r8.spec.ts` includes only the robust measurement fixes: wait for prepared page/fonts, footer document coordinates and explicit keyboard modality before focus checks. These do not weaken layout/accessibility assertions or modify baseline tests. `responsive-core.spec.ts` adds 19 scenarios per engine for the prescribed matrix, all five scene loops, viewport resize state retention and actual component-width container queries.

The draft PR records matching locked-browser CI and real public preview smoke results when complete. Local cached browsers and Linux CI do not establish a physical Windows-device result; the requested available viewport heights model browser chrome loss. Review this candidate before authorizing any main change.
