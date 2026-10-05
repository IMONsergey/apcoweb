# R4 — mobile composition and language selection

Owner-requested refinement based on released R3.

## What changed

- Phone search scene uses the same wording and real query form as desktop, hides the decorative filter/type controls and is reduced from the old tall mockup to a compact scene.
- Phone Start scene before the footer keeps the prepared `saas mobile` artwork, crops unused vertical space without altering the source file, and overlays a real accessible CTA. EN/RU account labels and editorial copy cover the corresponding baked text.
- Audience cards use the original two-part button for both actions, so the secondary actions now have the separate arrow segment too. Phone contour renderers are smaller and visible at the top-right; titles start at the card top.
- Phone data reading path is: headline/copy → IPv4+IPv6 → Domains left → one-card-height globe opening → Detected Products right → CVEs+Protocols → actions. The original globe renderer is full-width behind that opening; metric values are unchanged.
- Contextual billing copy is centered and uses the action turquoise. R3 appearance/disappearance and billing arithmetic are unchanged.
- Footer group headings use uppercase presentation at every width.
- The former language badge is now a native EN/RU selector. The current SaaS bundle already exposes EN and RU resources, so the landing mirrors that pair. Selection updates real React copy, `<html lang>`, accessibility labels and page title; it preserves billing/query/fragment state and is saved in `apcosys.landing.language` plus the SaaS-compatible `i18nextLng` key. `?lang=` overrides saved preference for shareable review links.
- Inter is used only as the Cyrillic sans fallback; IBM Plex Mono Cyrillic is supplied for technical labels. Both are open-source Google Fonts downloads with OFL texts committed. Existing EN Instrument Sans files and the six supplied visual engines are untouched.

## Locked behavior

- Prices, discount calculations, entitlements, product URLs and metric values are unchanged.
- Split buttons remain one semantic action / one tab stop with two visual segments.
- Search backdrop remains the supplied TurquoiseFlow + DotCascade with progressive haze; no extra band is painted.
- Prepared Start images are not edited or regenerated. Desktop/tablet use the same assets; phone crops them non-destructively.
- Figma is not modified by this website pass.

## Verification

Local production build, source-engine checksum verification, ESLint, TypeScript and Prettier pass. Chromium smoke suite passes **68/68**, including the R3 regression set and 13 new R4 scenarios. R4 scenarios cover 320/360/390/430/599 mobile composition, EN/RU at 320/390/768/1440/1920, persistent locale/query/billing state, footer casing and a localized accessibility scan.

The cross-browser GitHub Actions review (Chromium / Firefox / WebKit) is the merge gate. Do not report release until that run and the main Pages deployment are green.

## Release continuation and visual finding

PR #3 had already been merged and published when the continuation started. Its source `87fe41049f252b9a56697c2666bfab59b02e1417` passed 204/204 cross-browser scenarios without retries, skipped or unexpected results in [run 37278235873](https://github.com/IMONsergey/apcoweb/actions/runs/37278235873); [Pages run 37278769027](https://github.com/IMONsergey/apcoweb/actions/runs/37278769027) deployed merge `3315c89985e635cb6dcf02536ce5dfb5539ca882`.

Fresh screenshots of the published site cover EN and RU at 320, 360, 390, 430, 599, 768, 1024, 1199, 1200, 1440, 1600 and 1920 px. All 24 captures have no measured overflow, missing images or JavaScript errors. Visual inspection found a thin remnant of the prepared English CTA beneath the RU closing overlay at 768 px. The follow-up changes only the narrow-tablet cover minimum height from 43% to 45%; screenshots at 600/768/899 px confirm the artifact is gone. A new regression checks coverage at nine widths. No original artwork or English composition was changed.

Source `70d22b8f3dfb905f95135a14e445444a6d6a8a22` passes the local static/build gates, Chromium 69/69 and targeted R4 14/14. Final [cross-browser run 37282442712](https://github.com/IMONsergey/apcoweb/actions/runs/37282442712) passes **207/207**, 69 per browser, including 14 R4 checks each. No skipped, flaky or failed scenarios. QA-RESULTS.md and qa-summary.json record the verified source; the final PR release report records the main deployment and live smoke. Screenshots, including the before/fix distinction, are in screenshots/r4/README.md.

RU copy remains a working localization of existing English content, not approved marketing text. Prepared illustrations retain embedded English product UI. FAQ open/closed state and page title were additionally checked through EN → RU → EN at 390 and 1440 px. Physical iOS/Android keyboard and every device/browser version are outside this browser-engine validation; product authentication, checkout and paid API calls were not exercised.
