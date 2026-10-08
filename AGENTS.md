# APCOSYS website

This is the React/TypeScript marketing website, not the authenticated SaaS application.

## Read first

- docs/REVIEW-R16.md: current audit follow-up and owner-supplied dark search gradient. The opaque lower palette ends at #0C1113; preserve the light renderer and six protected originals. WCAG scans use the shared helper so extra rules never replace the tag filter.
- docs/WORK-STATE.md: current release evidence is at the top. R15 was merged as PR #17 and published on 2026-10-08 after owner approval. Earlier candidate restrictions and publication blockers below are historical; consult the current session's authorization before publishing new changes.

- docs/REVIEW-R15.md: audit fixes on the R14 theme candidate. Preserve the supplied visual effects and the theme-invariant API section; use the new typography, accessible controls and regression coverage. Client handoff builds use `npm run build:root` for a domain root. R15 is released; its original pre-publication notes are historical.

- docs/REVIEW-R12.md (historical): the R12 branch was a comparison candidate, based strictly on the complete PR #12 rollback. Preserve R10 composition, typography and entrance/search lifecycle. Layout is CSS-only; the five supplied GSAP product scenes are authorized alongside the API demo. Do not merge or update main without the owner's new confirmation. Earlier R10 publication instructions below are historical.

- docs/REVIEW-R10.md (historical): current content paints immediately while backgrounds prepare, with a static fallback if a chunk fails (tests/refinement-r10.spec.ts). Preserve scroll-linked search placement, aligned API frame, navigation reveal and active-language natural sizing.

- docs/REVIEW-R9.md: owner-requested removal of R8's shared locale sizing. Active text determines native dimensions; width/height may change on language selection. This overrides the stable EN/RU geometry requirements below.

- docs/REVIEW-R8.md: compact directional header, stable EN/RU text geometry, supplied API demo and responsive refinements. R8 replaces the R6 section-layout morph; preserve native inline wrapping and all other released interactions. R12 extends GSAP authorization to the five uploaded carousel scenes.

- docs/REVIEW-R7.md: sticky header, anchor clearance and shared EN/RU typography. This extends R6; retain its quiet language morph and flags.

- docs/REVIEW-R6.md: quiet inline-text fades, a shared layout morph and language-menu flags; this replaces R5 text movement/blur. Preserve the other R5 interactions.

- docs/REVIEW-R5.md: styled EN/RU disclosure, text transitions, digit reels and continuous pointer-hover marquee. This extends R4; preserve keyboard-focus pause and reduced motion.

- docs/REVIEW-R4.md: current mobile composition and EN/RU language behavior; this extends R3.

- docs/REVIEW-R3.md: current contextual billing behavior and verified interaction fixes. Preserve the mobile dock at <=1199px and desktop control at >=1200px.

- docs/REVIEW-R2.md: latest owner-authorized visual changes and annual billing; this overrides earlier static-preview assumptions.

- README.md: commands and deployment.
- docs/DESIGN-CONTRACT.md: what must not change.
- docs/CONTENT-STATUS.md: commercial and editorial inputs that remain provisional.
- docs/ANIMATIONS.md: supplied effects and lifecycle decisions.
- docs/WORK-STATE.md: latest handoff state.

## Rules

- Size translated elements from the active language's content and normal responsive CSS. Never measure other translations or reserve their maximum dimensions in the current language. Preserve layout reflow, the quiet text fade and existing UI state.
- Preserve the two-part button: a single link/button with a separate-looking arrow segment; one tab stop.
- Preserve the exact search scene and its progressive blur. Do not replace it with an unrelated dashboard.
- Mobile SaaS insertions come from the prepared saas mobile page; do not redraw them.
- Do not alter prices, entitlements, billing calculations or brand claims without an explicit content task.
- Avoid adding UI libraries, animation frameworks or Tailwind. Use existing components and CSS tokens.
- Do not include tokens, user account data, .env files or source-document archives in Git.
- Before pushing: npm ci, npm run check, npm run build, npm run test:smoke.
- Do not modify any Figma document as part of a website-only change.
