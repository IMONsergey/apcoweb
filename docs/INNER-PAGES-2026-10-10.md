# Internal-page design revision — 10 October 2026

## Direction

Twelve internal routes now share the site's existing neutral page surface, font family, teal accent and double-button component. Sections are separated by space rather than alternating background bands. The hero pairs the page's question and description with a relevant illustration; section headings are visibly subordinate. Existing homepage search, films, globe, wave, pricing defaults and navigation remain in place.

The first generated illustration series incorrectly used ivory materials. Following the client's correction, all nine new assets were edited with ImageGen to remove beige, cream and warm lighting. The final palette is neutral white, cool gray, clear glass and petrol teal. Three existing use-case illustrations are reused without altering their homepage versions.

## Route review

| Route                        | Problem addressed                                                       | Revised composition                                                                                                               |
| ---------------------------- | ----------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Search & Investigation       | Oversized headings and disconnected explanatory fragments               | Lens illustration, five compact investigation controls, one connected host/results panel and a separate syntax explanation        |
| Data & Methodology           | Competing heading levels and over-framed evidence                       | Layered illustration, three plain evidence levels, coverage table, two-column explanatory text                                    |
| Monitoring                   | Decorative trace and repeated console labels competed with the workflow | Paired-observation illustration, quiet canvas trace, five horizontal controls, one asset workspace; all controls fit on desktop   |
| Bug Bounty                   | Repetition between example and explanatory steps                        | Scope illustration, short query/result journey next to evidence, deeper scope guidance below                                      |
| Vulnerability Research       | Dense technical example without a clear entry point                     | Layer illustration, compact product/version example, distinct follow-up research guidance                                         |
| OSINT & Threat Investigation | Indicator example and prose lacked separation                           | Indicator illustration, compact attribute trail and host evidence, attribution guidance below                                     |
| Teams                        | Two competing four-stage demonstrations                                 | Shared-evidence illustration, one interactive handoff, three practical evaluation points, quieter Business information            |
| API                          | Repeated actions and oversized technical hierarchy                      | Integration illustration, request/response sample first, access table and credit guidance; all three table columns fit on a phone |
| Pricing                      | Marketing heading competed with detailed comparison                     | Access-level illustration, existing plan controls with a clearer heading, usage explanation, comparison and token packages        |
| About                        | Large text blocks lacked a focal point                                  | Open-structure illustration, concise statement, four editorial principles and a direct contact route                              |
| Responsible Scanning         | Important instructions were visually undifferentiated                   | Bounded-infrastructure illustration, readable collection/identity/opt-out/contact sections and a scanning enquiry link            |
| Contact                      | Contact guidance and form were poorly balanced                          | Conversation illustration, short contact guidance beside a padded form, working anchor and email preparation fallback             |

## Interaction and accessibility

- Preserve the single-state MorphPanel behavior and measured height transitions. No outgoing/incoming text overlays were added.
- Reduce editorial movement to 4 px and a near-opaque reveal; avoid a second hero reveal on top of route transitions.
- Decorative canvases on Monitoring and API use no pointer input, pause offscreen and in hidden tabs, and respect reduced motion and the site's motion pause.
- Illustrations reserve their aspect ratio, have descriptive alternative text and reuse the existing theme mechanism.
- Preserve the request/response switch, selected-host state, monitoring examples, billing toggle, keyboard navigation and contact validation.

## Image provenance

New files: `public/assets/inner/{search,methodology,monitoring,teams,api,pricing,about,scanning,contact}.webp`.

Each asset was generated for its page, then edited from its original image with this shared correction: preserve subject and composition; remove every beige/ivory/cream/tan cast; use neutral white or cool light gray surfaces, neutral daylight, soft cool shadows, clear glass and brand petrol teal; add no text or decoration. The final 1536 × 1024 images were resized and encoded as 960 × 640 WebP assets. No raster color correction was performed outside ImageGen.

The use-case routes reuse `public/assets/use-cases/{bug-bounty,vulnerability-research,osint}.webp`.

## Content and review boundaries

This pass reorganizes the existing preview copy and shortens repetitive demonstration labels. It does not establish full parity with Sevil's two original documents. Monitoring remains a disclosed concept; API authentication, live documentation and commercial entitlements retain their existing verification notes. The contact form prepares an email and does not pretend to submit to a backend.

Review is through the existing feature branch and Vercel Preview. No merge to main or production promotion is part of this revision.

## Validation

- Production build, asset registry, original rendering-module integrity, formatting, ESLint and TypeScript pass.
- Fresh full-page captures cover all 12 internal pages at 1440 px and 390 px, plus the dark theme at 1440 px.
- Layout regression checks cover all internal routes at 320, 768 and 1440 px, loaded illustrations and heading hierarchy. Monitoring controls fit on desktop and the API access table fits on a phone.
- The 35 functional/product/layout scenarios pass after correcting the mobile API table's inherited no-wrap heading style.
- All 26 light/dark accessibility-and-asset scenarios pass for the homepage and internal routes. These automated WCAG checks are not a full accessibility certification.
