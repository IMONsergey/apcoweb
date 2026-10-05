# R5 visual evidence — 2026-10-05

Captured by matching Playwright 1.63.0 browsers against the production preview of source `2e612c483a3f567bf12c6577c63cc345f70be0b5` in [the final cross-browser run](https://github.com/IMONsergey/apcoweb/actions/runs/37305369987). All 228 scenarios passed without retries, skips or failures. These 20 Chromium captures are lossless WebP conversions of the CI PNGs; `capture-results.json` identifies each original PNG. The workflow artifact retains all 60 R5 captures across Chromium, Firefox and WebKit.

Open EN/RU language menus cover 320, 390, 768, 1200 and 1440 px. Monthly/annual plan grids cover 390 and 1440 px in both languages. `language-transition-midpoint.webp` and `pricing-transition-midpoint.webp` freeze the application's real animations halfway through their duration. Static screenshots use reduced motion for repeatable inspection; the animation scenarios use normal motion.

Visual review covers panel styling/bounds, Cyrillic type, price glyph alignment and rolling digit clipping. The first candidate's locale midpoint exposed a viewport jump caused by scroll anchoring as RU copy grew. The final capture and regression preserve the viewport during the swap. Main publication and live-site verification are recorded in [PR #6](https://github.com/IMONsergey/apcoweb/pull/6).
