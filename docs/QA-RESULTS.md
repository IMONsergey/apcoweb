# QA — R3

The current matrix defines 159 production-build checks: 53 cases in each of Chromium, Firefox and WebKit. The latest completed GitHub Actions run provides the pass/fail result, not a hard-coded historical count.

## Coverage

Full layout/media checks: 1920, 1600, 1440, 1366, 1280, 1024, 768, 430, 390, 360 and 320px. Additional breakpoint checks cover 599, 600, 620, 699, 700, 1199 and 1200px. The dock is checked at six responsive widths and 844x390 landscape.

Scenarios include pricing entry/exit/re-entry; period retention across resize; no hidden focus stops; modal suppression and restoration; focused actions above the panel; editable-focus and zoom suppression; natural keyboard order; rapid carousel input and scrollbar geometry; menu keys; search clear/trim/pending/pageshow; final CTA hit regions; stable modal content; persistent stopped globe; and narrow-tablet numeric padding. Existing annual-price, empty search, FAQ, menu, asset, marquee, reduced-motion and search-background-band regressions remain active.

## Evidence

Each workflow uploads `browser-evidence`: JSON results, full-page screenshots, responsive dock screenshots, HTML report and any failure traces. PR validation does not publish the page. The main branch publishes only after the checks succeed.

Earlier files in docs/screenshots are R2 snapshots. Use the current run's artifact for R3 visuals. Do not confuse viewport automation with physical phone testing, or automated accessibility scans with a complete screen-reader audit. No payment was collected or live authenticated API transaction performed.
