# Work state

Repository: IMONsergey/apcoweb. Current implementation: R4 mobile composition and EN/RU localization, extending the R3 contextual billing behavior.

Read REVIEW-R4.md first, then REVIEW-R3.md and DESIGN-CONTRACT.md. Do not restart R4. The original PR #3 was already merged at the start of this continuation: source `87fe41049f252b9a56697c2666bfab59b02e1417`, merge `3315c89985e635cb6dcf02536ce5dfb5539ca882`. Its cross-browser run 37278235873 passed 204/204 and Pages deploy 37278769027 succeeded.

The continuation found one screenshot-visible issue: RU tablet closing copy left the bottom edge of the prepared English CTA exposed. Source candidate `70d22b8f3dfb905f95135a14e445444a6d6a8a22` extends only the narrow-tablet cover and adds a regression across nine widths. PR #4 continues the same working branch. Local gates pass: locked install, six engine checksums, lint, TypeScript, formatting, build, Chromium 69/69 and targeted R4 14/14. Final cross-browser gate **PASS — 207/207**, 69 per Chromium/Firefox/WebKit, no skipped/flaky/failed scenarios: https://github.com/IMONsergey/apcoweb/actions/runs/37282442712. See QA-RESULTS.md and qa-summary.json for its verified outcome.

Visual evidence is in docs/screenshots/r4. Root files capture the initial published R4 at all 12 requested widths in both languages; fix/ records the corrected closing scene at 600/768/899 px. RU is a working localization, not approved client copy. Prices, metric values, entitlements, source images, six rendering/data modules and Figma remain unchanged.

GitHub Pages: https://imonsergey.github.io/apcoweb/. Only a successful main deployment plus the post-publication Chromium suite against APCO_BASE_URL=https://imonsergey.github.io/apcoweb/ establishes the final release; a green branch run alone does not. The PR release report records the resulting deployment and live smoke.

Development port: 5187. Production preview: 4187. Do not disturb 5173 (another project). The dock remains contextual at <=1199 px, desktop billing remains at >=1200 px, and all approved 20% annual arithmetic is preserved. Figma must not be changed in a code-only task.
