# QA results — R4 mobile composition and EN/RU

## Source and gates

Runtime source and original follow-up test source: `70d22b8f3dfb905f95135a14e445444a6d6a8a22`. PR #4 continues the already merged PR #3. The one code correction found by visual review is a narrow-tablet RU closing overlay extension; no assets, animation algorithms, prices, metric values or entitlements changed.

Locked install, six-engine checksum verification, ESLint, TypeScript, Prettier and production build pass. Local Chromium smoke passes **69/69** with no skipped, flaky or unexpected results; targeted R4 passes **14/14**. [Final cross-browser gate](https://github.com/IMONsergey/apcoweb/actions/runs/37282442712) uses the Chromium/Firefox/WebKit revisions matching locked Playwright 1.63.0. **207/207 passed**, 69 per browser, with no skipped, flaky or failed scenarios. The R4 subset is 14 per browser (42 cross-browser checks).

The initial PR #3 source (`87fe41049f252b9a56697c2666bfab59b02e1417`) had already passed **204/204** in [run 37278235873](https://github.com/IMONsergey/apcoweb/actions/runs/37278235873), with zero flaky, skipped and unexpected results. [Pages run 37278769027](https://github.com/IMONsergey/apcoweb/actions/runs/37278769027) successfully published merge `3315c89985e635cb6dcf02536ce5dfb5539ca882`. Earlier Firefox subpixel assertion failures are superseded by that successful run.

## Visual review

Real Pages browser captures cover **24 combinations**: EN/RU at 320, 360, 390, 430, 599, 768, 1024, 1199, 1200, 1440, 1600 and 1920 px. `screenshots/r4/capture-results.json` reports no runtime errors, missing images or measured overflow. The header, Cyrillic fonts, long copy, search input, split buttons, audience contours, mobile metric reading path/full-width globe, contextual billing dock, closing UI and uppercase footer headings were visually inspected.

Visual review found a thin turquoise remnant of the prepared English CTA under the RU tablet closing overlay. The corrected local production screenshots at 600/768/899 px show it fully covered. A new regression verifies the original CTA region is covered at 600, 768, 899, 900, 1024, 1199, 1200, 1440 and 1920 px. Root screenshots retain the before-fix release; `screenshots/r4/fix/` records the correction. See the screenshot README for provenance.

## Functional scope

The suite retains R3 billing visibility, keyboard/focus/zoom/modal suppression, radio behavior, 20% annual arithmetic, carousel, search handoff, active/reduced motion, accessibility and source-artwork regressions. R4 adds compact mobile geometry, data reading order, native EN/RU selection, URL precedence, persistence, preserved query/billing/hash state, localized accessibility and prepared-CTA coverage. FAQ open/closed state and title were additionally checked through EN → RU → EN at 390 and 1440 px.

## Publication and limits

A successful main Pages deployment and the Chromium suite against the actual Pages URL are required after merge. The final PR release report identifies that deployment and production smoke. Documentation-only follow-up commits must leave the tested runtime/test source unchanged.

RU is working localization, not client-approved marketing copy. Prepared product illustrations retain embedded English UI. Browser-engine automation does not certify every physical iOS/Android device or keyboard. Product authentication, checkout and paid API requests were not exercised; the existing review deployment remains noindex. Figma and all six supplied rendering/data modules are unchanged.

## Production test synchronization

The first live Pages smoke after PR #4 recorded 68 first-attempt passes and one successful retry. The new closing-CTA test sampled responsive geometry before the selected Start image finished loading; its failure screenshot showed the image was still absent. The test now waits for image readiness and measures the artwork and cover rectangles atomically in the same browser evaluation. The coverage requirements are unchanged and no website source or compiled asset changes. The test-only follow-up PR records the final validation/deployment for this test-only continuation.
