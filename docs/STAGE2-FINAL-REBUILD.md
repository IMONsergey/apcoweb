# Stage 2 final rebuild — October 9, 2026

Design review candidate in draft PR #28. No merge or production publication.

## Implementation

- Home: What You Can Search, Use Cases, Capabilities and Security Teams conversion. The existing R21 hero, chrome, typography, buttons, visual engines and pricing remain the foundation.
- SearchPreview: one functional form; results visible immediately; Domain, Technology and IP presets switch a labelled synthetic investigation.
- Shared evidence: results, host, service/version evidence and CVE applicability context. The selected host persists through all five Workbench steps. Arrow, Home and End keys keep the active mobile step visible.
- Five carousel snippets show the same investigation. A short GSAP entrance respects reduced motion and cleans up on unmount.
- Monitoring: two sample targets, meaningful service comparisons, context and a host-preserving handoff to investigation. Explicitly a concept.
- Three use cases: Starting point, Query, Result, Next step, contextual search CTA and plan guidance. Repeated explanatory sections removed.
- Data: one set of coverage totals on home; the globe explains observation, detection, time and uncertainty. Methodology places evidence before the definition table.
- API: one reusable request/response example, copy feedback, response initially hidden, auth guidance and a verified configurable docs destination. No invented endpoint or response contract.
- Pricing: Credits/Search Tokens explanation before the full comparison; billing control yields when it would cover a price or plan action.
- Teams: product investigation precedes team workflow and plan information. About uses editorial rows. Contact validates trimmed input and opens a clearly disclosed email draft.

## Five design passes

| Pass                     | Inspection and resulting changes                                                                                                                                                                                                                                                        |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. Visual system         | Compared the R21 reference and initial Stage 2. Reused semantic tokens, Instrument Sans, IBM Plex Mono and DoubleButton. Removed added decorative Unicode arrows; retained original icon assets.                                                                                        |
| 2. Home composition      | Expanded the home with four substantive sections. Rebuilt the usable interior of the original search chrome. Removed duplicated coverage totals and team banners. Replaced unrelated carousel/API illustrations with connected product excerpts.                                        |
| 3. Product experience    | Inspected all five investigation steps, selectable hosts, services/CVE context, Monitoring states, use-case examples, API and pricing. Shared fixture records prevent host/service inconsistencies.                                                                                     |
| 4. Responsive and themes | Inspected both themes on desktop/mobile and tested 14 widths, 320–2560 px. Fixed mobile scene spacing, first/last Workbench tab visibility, billing overlap and words joined by hidden line breaks.                                                                                     |
| 5. Final art direction   | Reviewed all 13 page contact sheets and full-page renders. Five weakest details corrected: narrow Searchable heading; small use-case links on tinted surfaces; inconsistent API window in dark mode; selected Monitoring target label; Teams scene footer links. Reran affected checks. |

## Reproducible checks

- `npm run check`, `npm run build`, `npm run build:root`, `npm run audit:production`.
- Route, functional, product experience and final rebuild Playwright suites.
- `r21-design-responsive.spec.ts`: 13 routes × 2 themes × 14 widths.
- `stage2-quality.spec.ts`: WCAG axe checks, JavaScript errors, failed same-origin responses and broken images, all 13 routes in both themes. Incomplete automated contrast checks are attached for manual review.
- `stage2-real-visual.spec.ts`: real unmasked full pages and first folds, 13 routes × desktop/mobile × light/dark. Actual lazy visuals are mounted before capture.
- Existing GitHub review workflow also exercises interactions in Chromium, Firefox and WebKit.

The delivery report records actual runs, screenshots, commit and deployment IDs. Historical R21 pixel snapshots are reference material, not a claim that intentionally expanded content remains pixel-identical.

## External facts

See `STAGE2-PRODUCTION-FACTS.md`. Synthetic UI records are not actual scans. Live guest queries, precise API contract, credit consumption/conversion, current commercial terms and contact delivery require product sources. These are explicit content/integration dependencies; the review UI does not simulate backend success.
