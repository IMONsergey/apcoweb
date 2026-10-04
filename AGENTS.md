# APCOSYS website

This is the React/TypeScript marketing website, not the authenticated SaaS application.

## Read first

- docs/REVIEW-R3.md: current contextual billing and usability corrections.
- docs/REVIEW-R2.md: prior owner-approved visuals and annual billing behavior.
- README.md: commands and deployment.
- docs/DESIGN-CONTRACT.md and docs/CONTENT-STATUS.md: protected design and remaining inputs.
- docs/ANIMATIONS.md: supplied visual engines.
- docs/WORK-STATE.md: current branch/worktree handoff.

## Rules

- Preserve the two-part button as one semantic action and one tab stop.
- Preserve the search composition and its progressive blur; never restore the removed extra background band.
- Responsive billing uses a non-modal bottom dock at <=1199px; only the desktop inline selector is shown above that breakpoint.
- Preserve the original prepared image assets and six animation/data renderer modules. Use integration wrappers for lifecycle behavior.
- Do not alter prices, entitlements, billing math or brand claims without an explicit content task.
- Do not add UI frameworks, Tailwind, analytics, fake urgency or unwanted global toolbars.
- Never include tokens, private account data, .env files or source archives in Git.
- Before publication: clean dependency installation, verify:visuals, lint, typecheck, production build and cross-browser tests. Read the actual result, not an old success count.
- Do not modify Figma as part of website-only changes.
- Reconcile the disconnected Mac preflight worktree against GitHub before any later push.
