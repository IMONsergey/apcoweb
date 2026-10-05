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
