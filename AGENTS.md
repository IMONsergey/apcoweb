# APCOSYS website

This is the React/TypeScript marketing website, not the authenticated SaaS application.

## Read first

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

- Preserve the two-part button: a single link/button with a separate-looking arrow segment; one tab stop.
- Preserve the exact search scene and its progressive blur. Do not replace it with an unrelated dashboard.
- Mobile SaaS insertions come from the prepared saas mobile page; do not redraw them.
- Do not alter prices, entitlements, billing calculations or brand claims without an explicit content task.
- Avoid adding UI libraries, animation frameworks or Tailwind. Use existing components and CSS tokens.
- Do not include tokens, user account data, .env files or source-document archives in Git.
- Before pushing: npm ci, npm run check, npm run build, npm run test:smoke.
- Do not modify any Figma document as part of a website-only change.
