# Work state

Repository: IMONsergey/apcoweb. Current implementation: R3 contextual billing and interaction repairs.

Read REVIEW-R3.md first; it extends REVIEW-R2.md. The mobile/tablet billing panel replaces the inline control up to 1199 px and appears only inside the pricing-options range. At 1200 px and above the existing inline control remains. Prices, discount arithmetic, entitlements and two-part buttons are unchanged.

Source candidate 78752537ba55e5c411e6604a40671f3714911cde passed 165/165 checks on matching Chromium/Firefox/WebKit engines in Actions run 37264232626. QA-RESULTS.md and qa-summary.json record the verified scope. Do not report old interrupted local logs as final results.

The release is integrated through PR #2. GitHub Pages: https://imonsergey.github.io/apcoweb/. The main deployment's successful deploy job is authoritative for publication; a green review-branch run alone is not a release. Post-publication browser checks target the live Pages URL using APCO_BASE_URL.

Development port: 5187. Production preview: 4187. Do not disturb 5173 (another project). Figma must not be changed in a code-only task. Optional next features are in NEXT-UX.md; they are proposals, not implemented product commitments.
