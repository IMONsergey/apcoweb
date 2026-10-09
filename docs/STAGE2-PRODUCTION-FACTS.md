# Stage 2 — production fact and access register

Do not treat these claims as approved or verified merely because a page renders correctly.

| Area | Unverified fact / production decision | Required source |
| --- | --- | --- |
| Search | Three real working example queries, syntax grammar, live guest search results and limits | SaaS owner, reproducible guest-session test |
| Search | Query preserved when guest creates an account | Product owner and end-to-end integration test |
| Routing | Actual login, registration, search, documentation, plan checkout and legal URLs | Approved product route list and HTTP/browser verification |
| Metrics | Six numerical totals, exact counting definitions, scan reference date and update frequency | Dated source-of-truth report |
| Data | Created/Updated meaning, protocol coverage and CVE association methodology | Data engineering / approved policy |
| Security | Scanner identifiers, reverse DNS, exclusion/opt-out request and response SLA | Approved Responsible Scanning policy |
| Plans | Four plan prices, credit limits, feature access, annual discount, Search Tokens and Business users | Current in-product rate card |
| Payment | Paddle, billing/taxes, invoice, refunds, cancellation, trial and payment methods | Live checkout and approved legal terms |
| API | Endpoints, auth, response shape, pagination, rate limits and production documentation route | Sanitised official API spec |
| Features | Monitoring roadmap, private scanner, Leaked Data, Buckets, filters and API plan entitlements | Product evidence per feature |
| Company | Legal entity, location, team details, customer logos and endorsements | Legal and brand approval |
| Contact | Form delivery provider/API, data retention, anti-spam, server validation and genuine error/success messages | Working owned backend / approved provider |
| Visuals | Approved screenshots and redistribution rights to product scenes | Rights holder / design lead approval |
| Vercel | GitHub Login Connection and access to the intended Vercel team/project | Account admin; grant project deployment access |

## Current safe fallback decisions

- Domain and IP examples fill the front-end form; successful SaaS results are **not verified**. example.com is a reserved example domain. 198.51.100.0/24 and 203.0.113.0/24 are documentation-only IP ranges, not scanned hosts.
- Search syntax links lead to an on-site explanation, not a guessed external documentation path.
- When VITE_APCO_SIGN_IN_URL is absent, Sign In is visibly disabled rather than linking misleadingly to the product homepage.
- A chosen plan is displayed in a descriptive modal. No plan choice is claimed to carry through registration; Business has a separate Talk to Us path.
- Monitoring is a non-live concept. API snippets are clearly illustrative and do not claim a valid endpoint, auth contract or response schema.
- Contact opens the visitor's email app instead of falsely claiming backend message delivery.
- All route heads have static title/description/OG after build. The site is still a client-rendered Vite SPA. Set APCO_PUBLIC_SITE_ORIGIN only when the final HTTPS origin is authorised.
- A noindex flag is not preview access protection. Protected deployment requires hosting authentication and project permissions.
