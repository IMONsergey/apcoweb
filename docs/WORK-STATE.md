# Work state

Repository: IMONsergey/apcoweb. Branch: main.

Current implementation: screenshot review R2 (2026-10-04). Read REVIEW-R2.md for the owner-authorized changes; earlier notes saying annual pricing is disabled are superseded.

84/84 production-build checks passed across Chromium, Firefox and WebKit. GitHub Pages is released by the existing workflow after validation; the latest Actions run is authoritative for deployment status.

Preview URL: https://imonsergey.github.io/apcoweb/

Double buttons and Figma are unchanged. The upper promo now uses HTML/SVG over the supplied live background, not a baked screenshot. The native billing switch applies the approved 20% annual discount with explicit annual totals. No global Pause motion button; device reduced-motion preference remains supported.

Local development uses 5187 and production preview 4187. Port 5173 belongs to another project. Remaining editorial/checkout questions are in CONTENT-STATUS.md.
