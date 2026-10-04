# Screenshot review R2 — 2026-10-04

## Requested changes implemented

- Soft gray navigation panels, rounded active triggers, white highlighted rows. Keyboard focus remains visible; inactive links are inert.
- Circular UK flag in the EN badge, implemented as SVG for consistent rendering across platforms.
- The upper search promo is HTML/SVG, not a screenshot. The archive's TurquoiseFlow and DotCascade engines render the background. CSS masks/backdrop blur retain the approved soft fade. Only the real native search form accepts input; miniature SaaS chrome is presentational.
- Trust logos use one horizontally moving row at every breakpoint, with edge masks. The inaccessible duplicate makes the loop seamless. Focus/hover pauses the row; reduced motion switches to manual horizontal scrolling. No footer motion button.
- Larger contour figures account for the supplied SVG's internal viewBox margin. On phones, their title area reserves enough height to keep the enlarged art out of the body copy.
- Metric cards use the source IBM Plex Mono Medium values, sufficient horizontal inset, subtle borders/white glow and independently highlighted label lines. No numerical data changes.
- Native billing radios replace the former annual information dialog. The thumb slides; the prices and comparison table update in place.
- The contact-banner heading is larger. Footer email is bold. Double-button shape and one-action semantics remain unchanged.
- Menu, hover, FAQ, dialog and price transitions are soft, interruptible and reduced-motion aware. No animation framework or scroll hijacking added.

## Annual billing authorized by the owner

The monthly base prices remain $0 / $40 / $240 / $720. Annual billing applies a 20% reduction:

| Plan | Monthly equivalent | Annual total |
| --- | ---: | ---: |
| Free | $0 | $0 |
| Plus | $32 | $384 |
| Expert | $192 | $2,304 |
| Business | $576 | $6,912 |

Both the monthly equivalent and annual charge are explicitly labelled. This is frontend arithmetic, not payment processing. Existing registration/product links and entitlements are unchanged.

## Boundaries

Figma is not modified. The closing CTA and the research/API example cards retain their supplied source images. Earlier upper-search exports can remain in source history/storage but are not referenced by the render tree. The six original rendering/data engines remain unchanged.

## Checks

The test suite includes all prior layout and interaction checks, updated for the new billing behavior and removal of the motion control, plus screenshot-review regression tests. Final results and deployment revision are recorded in WORK-STATE.md and qa-summary.json after validation.
