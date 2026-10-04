# APCOSYS website

This is the React/TypeScript marketing website, not the authenticated SaaS application.

## Read first

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
