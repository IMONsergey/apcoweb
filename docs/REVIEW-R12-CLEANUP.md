# R12 technical cleanup — 2026-10-06

The accepted comparison baseline is `55b1f3f1d607d3e760e5a202e419c8a7b6e537c4`. This pass changes only AudienceSection.css, DataSection.css and ApiSection.css, plus this report and evidence. Work remains on `test/responsive-core-r12`. Main stays at `7951f19afce1b95ab13f3f6c3cd47931c8a4620b`; no merge or Pages deployment is authorized.

## Actual changes

- Audience: consolidate the desktop art rules and the repeated 599/340 px typography/art states. Remove the three `.audience-actions .plain-button` selector occurrences: both audience cards render only DoubleButton components. Keep the original fractional-width fallback between the bounded container states; removing it would change the 899.5 px composition.
- Data: one canonical desktop stage, one tablet state and one phone metrics/globe state. Consolidate metric borders, padding, label/value typography and globe stacking. Remove declarations that were always overridden, including the earlier flex/block stage display, old copy/metric margins and phone globe width. The six metrics, their placement and the globe renderer are preserved.
- API: consolidate frame, fallback/host and layer styling before the responsive states; merge the repeated 899/599 px blocks. Keep the winning poster height, all offsets/radii and the existing typography.

Repeated selector/rule occurrences within the same enclosing condition decrease **23 → 0** (Audience 8, Data 13, API 2). Rules decrease 200 → 168 and declarations 466 → 406. These counts cover the three files and include consolidation, overridden declarations and unused selector removal. No additional assets are removed in this pass. No refinement/patch stylesheet, runtime dependency, JavaScript, test or workflow change is introduced.

## Bytes

Identical locked installs/build settings, repository base `/apcoweb/`, Node zlib gzip level 6. Full per-file values are in [sizes.json](screenshots/r12-cleanup/sizes.json).

| Measurement | Accepted R12 | Cleanup | Saved |
| --- | ---: | ---: | ---: |
| AudienceSection.css source | 5,810 B | 4,477 B | 1,333 B |
| DataSection.css source | 8,598 B | 7,156 B | 1,442 B |
| ApiSection.css source | 4,261 B | 3,877 B | 384 B |
| Three CSS sources total | 18,669 B | 15,510 B | 3,159 B |
| All built CSS, raw | 71,933 B | 69,643 B | 2,290 B |
| All built CSS, gzip | 15,312 B | 15,047 B | 265 B |
| Initial JS + CSS, gzip | 120,738 B | 120,467 B | 271 B |
| All JS + CSS including lazy chunks, gzip | 200,282 B | 200,009 B | 273 B |

Compression savings are small; the main result is a simpler cascade.

## Investigations retained as R12

**Viewport typography:** replacing vw with cqi is equivalent when the component fills the viewport, but changes typography when its container narrows independently. At a 1920 px viewport with a 1300 px container, EN Step changes 86 → 77.6386 px, Data 80 → 70.85 px, API 80 → 68.9 px; RU audience changes 35 → 31.2 px. Keep all existing vw typography.

**Short desktop artwork:** restoring the Step width from the density-scaled value to 103% increases section height about 55 px at 1536×740. A spacing/padding/min-height-only compensation still leaves roughly 35 px extra height. Smaller viewports behave differently, so this is not an equivalent substitution. StepCarousel.css and the approved R12 scale remain byte-for-byte unchanged. Experiments were temporary CSSOM/style probes; none is included in the delivered CSS.

## Verification

- Locked install, six original-engine checksums, ESLint, TypeScript, formatting and production build pass. Diff whitespace check passes.
- Complete unchanged local suite: **379/384 first-attempt passes**, then **5/5** exact failed cases pass with one worker and no source change. The initial failures are menu/navigation timeouts or state checks while full screenshot captures were also running. Both reports and traces are preserved; [tests-local.json](screenshots/r12-cleanup/tests-local.json) records the first and repeated outcomes. This is not reported as 384 first-attempt passes.
- Same complete viewport matrix: **96 cases** = 16 sizes × EN/RU × Chromium/Firefox/WebKit. Bounds, text line rectangles, heading breaks, CTA content/direction and page/text overflow are unchanged. No JavaScript errors or horizontal/text overflow.
- **480/480 PNG pairs are exactly equal in RGB**, with no masks or pixel tolerance. Four sections are captured, with both carousel ends (five pairs per case). The existing reduced-motion static state is used; functional tests separately cover normal motion and all five scenes.
- The initial capture pass had 32 differing pairs caused by comparing asynchronous states: sticky header scroll settling, poster versus mounted API demo, or an adjacent API-background row at the globe section boundary. Those pairs were recaptured after explicit demo/background readiness and settled section scrolling; all 32 then match exactly. Initial results are retained in [pixel-comparison-initial.json](screenshots/r12-cleanup/pixel-comparison-initial.json); final results in [pixel-comparison.json](screenshots/r12-cleanup/pixel-comparison.json). Product source is identical throughout.
- One initial cached Chromium snapshot serializes the data-stage auto margins differently (48 px versus 0 px) despite identical bounds; after mounting, all measured style values match. This raw readback remains in the geometry evidence. Pixel equality and layout assertions are not relaxed.
- **126/126 boundary checks** = 21 integer/fractional container widths × EN/RU × three engines, zero geometry/computed-style differences.

Viewports: 2560×1440, 1920×1080, 1536×864, 1536×740, 1440×900, 1366×768, 1366×650, 1280×720, 1280×600, 1024×768, 768×1024, 430×932, 390×844, 360×800, 320×568, 844×390.

Boundary widths: 340, 340.5, 341, 375, 375.5, 376, 599, 599.5, 600, 699, 699.5, 700, 899, 899.5, 900, 1199, 1199.5, 1200, 1399, 1399.5, 1400.

[screenshots/r12-cleanup](screenshots/r12-cleanup/) includes selected unmodified before/after PNGs, compressed complete geometry records, pixel reports, boundary checks, experiment results, test outcomes and source/build hashes. Full raw captures and original test traces are retained on the review Mac. Cached Mac browsers supplement the matching locked-browser GitHub CI; a physical Windows device is not claimed.

The new preview and fresh matching-browser CI results are recorded in [draft PR #13](https://github.com/IMONsergey/apcoweb/pull/13) against the pushed cleanup commit. Preview uses the existing isolated apcoweb-review project with a root-only build-base override. Repository Pages configuration and main remain unchanged.
