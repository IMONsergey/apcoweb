# R7 — sticky header and typography, 2026-10-05

Runtime/test source `b52211d3b39e6ef6ea8b45da0adcfc8147935dfa`: 246/246 Chromium/Firefox/WebKit scenarios passed with zero retries/failures/skips in [run 37331119341](https://github.com/IMONsergey/apcoweb/actions/runs/37331119341); 82/82 independent Chromium checks passed in [run 37331119331](https://github.com/IMONsergey/apcoweb/actions/runs/37331119331). Locked install, checksums, lint, TypeScript, formatting, build and the local typography pipeline test pass. Matching local browsers could not be downloaded, so no local browser pass is claimed. Exact build, candidates and artifact provenance: qa-r7-summary.json; two inspected lossless captures: screenshots/r7/. PR #8 is merged at `d7bbda47e2162808ddf29cf9da8762f0c5aa52d2`: [main run 37333162045](https://github.com/IMONsergey/apcoweb/actions/runs/37333162045) passed validation, Pages deployment and all 82 actual production checks with zero retries/failures/skips. All 12 live JS/CSS hashes and byte counts match the tested build. The fully opened live language menu and sticky header are retained in screenshots/r7/production-pricing-language.jpg; qa-r7-summary.json contains exact release provenance.

# QA results — R6 quiet language morph and menu flags

Source `d838f0266d4c6bad043c281f779e392edae6e5ac` replaces R5 translated-text movement with an inline dissolve and a short coordinated layout morph. Locked installation, all six supplied-engine checksums, lint, TypeScript, formatting and production build pass. [Matching-browser CI](https://github.com/IMONsergey/apcoweb/actions/runs/37321058513) passed **231/231**, 77 per Chromium/Firefox/WebKit: **230 first-attempt passes and one successful WebKit retry**, with no remaining failures or skips. The retry involved a uniform 5 px viewport offset in the outgoing geometry capture; text dimensions and wrapping were unchanged. The independent [PR Chromium gate](https://github.com/IMONsergey/apcoweb/actions/runs/37321058626) passed 77/77. Local matching executables are unavailable; no local browser pass is claimed.

Actual outgoing/incoming frames are sampled in both directions at 390/1440 px. Coverage checks natural line geometry, hidden wording handoff, no heading/copy overlap, rapid reversals and cancelled selections, retained form/viewport state, reduced motion and cleanup. Existing menu keyboard/accessibility, pricing, marquee and all prior regressions remain. Visual inspection covers the natural highlighted-phrase wrap and both menu flags. Four lossless captures and their provenance are in `screenshots/r6/`; `qa-r6-summary.json` preserves exact results and earlier candidates.

The main workflow deploys Pages and runs all 77 Chromium scenarios against its actual published URL. [PR #7](https://github.com/IMONsergey/apcoweb/pull/7) is the release report for the exact merge, deployment and live result. Documentation/evidence follow-ups preserve tested runtime and tests byte for byte. R5 and R4 reports below are historical evidence.

# QA results — R5 language menu and motion

Source `2e612c483a3f567bf12c6577c63cc345f70be0b5` extends released R4. Locked installation, all six engine checksums, lint, TypeScript, formatting and production build pass. Local browser archives are unavailable in this environment; no local browser pass is claimed. [Final matching-browser CI](https://github.com/IMONsergey/apcoweb/actions/runs/37305369987) passed **228/228**, 76 per Chromium/Firefox/WebKit, with **zero retries, skips or failures**. The independent [PR Chromium gate](https://github.com/IMONsergey/apcoweb/actions/runs/37305370031) passed 76/76.

The seven new scenarios per engine cover menu appearance/semantics and keyboard behavior, 320–1440 menu bounds, normal/reduced text motion, retained form state and viewport coordinates, rapid locale switches, rolling prices in both directions and their final digits, pointer-hover marquee continuity, phone logo size and open-menu accessibility. All 69 prior scenarios remain.

`screenshots/r5/` retains 20 lossless Chromium captures. CI retains 60 R5 captures across all three engines. EN/RU menus were inspected on phones/tablets/desktops, plus monthly/annual prices and real animation midpoints. The initial passing candidate's midpoint revealed a scroll-anchor viewport jump as RU content grew; the final source preserves viewport coordinates and verifies them. `qa-r5-summary.json` records provenance and the earlier candidate separately.

The main workflow now runs the Chromium suite against the actual Pages URL after successful deployment. [PR #6](https://github.com/IMONsergey/apcoweb/pull/6) is the final release report for the merge SHA, deployment and live smoke. Following documentation/evidence commits preserve the tested runtime and tests byte for byte. Physical devices, product sign-in and checkout are outside this website-only verification.

The R4 report below is historical evidence.

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
