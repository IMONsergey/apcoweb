# Stage 2 review and launch gates

Stage 2 is implemented on a dedicated feature branch for a client preview. The accepted R21 `main` and GitHub Pages remain unchanged. The branch is public source; it is not a confidential workspace. Do not upload internal `Apco` files, private investor data, secrets or security findings.

## Review scope

- Thirteen website routes, including home, three platform pages, three use cases, teams, API, pricing, about, responsible scanning and contact
- Shared header, footer, responsive groups, keyboard navigation, Light/Dark/System, base-path routing, first-fold search
- Marketing-to-SaaS transitions, full pricing toggle and plan comparison, observation caveats, concept Monitoring, cookie preferences
- Production code must pass strict TypeScript, ESLint, Prettier, asset and integrity verification, Playwright regression and visual approvals

## Facts still requiring product/client confirmation

- Exact guest-search access, search syntax and three verified example queries
- Canonical sign-in URL and guest-to-account query retention; use `VITE_APCO_SIGN_IN_URL` only after validation
- Coverage reference date and exact definitions for all six metrics
- Supported API endpoint, authentication scheme, response schema, current per-plan rate limits
- Credits and Search Token packages, cancellation/refund and invoice arrangements
- Monitoring functional readiness (page is clearly labelled concept), Bucket and Private Scanner entitlements
- Any company client, partner or endorsement claims; current marquee uses neutral research topics
- Official contact-form delivery backend and data retention. The preview explicitly opens an email draft instead of pretending a form was sent
- Approved screenshots, observed data and legal copy. Existing legal paths link to the SaaS; their exact URLs must be checked

## Deployment

A separate Vite preview build must use `npm run build:root`, output `dist`, and SPA routing via `vercel.json`. Protect the preview at the platform level; `noindex` alone does not make a deployment private.

Do not merge Stage 2 into `main` or publish it to the existing GitHub Pages release without a separate approval. Replace preview contact backend and resolve factual gates before production.
