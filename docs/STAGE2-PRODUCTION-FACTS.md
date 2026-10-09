# Stage 2 — production fact and access register

Do not treat these claims as approved or verified merely because a page renders correctly.

| Area     | Unverified fact / production decision                                                                       | Required source                                           |
| -------- | ----------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| Search   | Three real working example queries, syntax grammar, live guest search results and limits                    | SaaS owner, reproducible guest-session test               |
| Search   | Query preserved when guest creates an account                                                               | Product owner and end-to-end integration test             |
| Routing  | Actual login, registration, search, documentation, plan checkout and legal URLs                             | Approved product route list and HTTP/browser verification |
| Metrics  | Six numerical totals, exact counting definitions, scan reference date and update frequency                  | Dated source-of-truth report                              |
| Data     | Created/Updated meaning, protocol coverage and CVE association methodology                                  | Data engineering / approved policy                        |
| Security | Scanner identifiers, reverse DNS, exclusion/opt-out request and response SLA                                | Approved Responsible Scanning policy                      |
| Plans    | Four plan prices, credit limits, feature access, annual discount, Search Tokens and Business users          | Current in-product rate card                              |
| Payment  | Paddle, billing/taxes, invoice, refunds, cancellation, trial and payment methods                            | Live checkout and approved legal terms                    |
| API      | Endpoints, auth, response shape, pagination, rate limits and production documentation route                 | Sanitised official API spec                               |
| Features | Monitoring roadmap, private scanner, Leaked Data, Buckets, filters and API plan entitlements                | Product evidence per feature                              |
| Company  | Legal entity, location, team details, customer logos and endorsements                                       | Legal and brand approval                                  |
| Contact  | Form delivery provider/API, data retention, anti-spam, server validation and genuine error/success messages | Working owned backend / approved provider                 |
| Visuals  | Approved screenshots and redistribution rights to product scenes                                            | Rights holder / design lead approval                      |
| Vercel   | GitHub Login Connection and access to the intended Vercel team/project                                      | Account admin; grant project deployment access            |

## Current safe fallback decisions

- Domain and IP examples fill the front-end form; successful SaaS results are **not verified**. example.com is a reserved example domain. 198.51.100.0/24 and 203.0.113.0/24 are documentation-only IP ranges, not scanned hosts.
- Search syntax links lead to an on-site explanation, not a guessed external documentation path.
- When VITE_APCO_SIGN_IN_URL is absent, Sign In is visibly disabled rather than linking misleadingly to the product homepage.
- A chosen plan is displayed in a descriptive modal. No plan choice is claimed to carry through registration; Business has a separate Talk to Us path.
- Monitoring is a non-live concept. API snippets are clearly illustrative and do not claim a valid endpoint, auth contract or response schema.
- Contact opens the visitor's email app instead of falsely claiming backend message delivery.
- All route heads have static title/description/OG after build. The site is still a client-rendered Vite SPA. Set APCO_PUBLIC_SITE_ORIGIN only when the final HTTPS origin is authorised.
- A noindex flag is not preview access protection. Protected deployment requires hosting authentication and project permissions.

## Verified documentation destination

The public navigation and API CTAs use in-site integration guidance until
`VITE_APCO_API_DOCS_URL` is supplied after verifying the actual HTTPS
reference. Do not infer `/docs/api` from the marketing site or advertise
illustrative request/response snippets as live documentation.

## October 9 product-experience implementation

The Stage 2 client review uses a shared `ProductEvidence` component for Search Results, Host Details, Services & Technologies and CVE Context. Its sample addresses are from documentation-only ranges and **its listed services are fictional illustrative records**, not a scan or live product output.

| Design slot            | Implemented experience                                                                              | Required to switch to approved real content                                                                        |
| ---------------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| R21 SearchPreview      | Expandable single-result example embedded within the original chrome; one real search form retained | One permitted guest-search query, sanitised result and host evidence, actual age/timestamp                         |
| Search & Investigation | Five-step, selectable results/host/context interface with a shared illustrative evidence record     | Approved result, host schema, supported query filters, screen/copy rights                                          |
| Bug Bounty             | Starting point → query → result → next step, plus scope-vetting host scene                          | Authorised demonstration scope and representative result, excluding real client assets                             |
| Vulnerability Research | Technology/version → matching examples → host → potential CVE context                               | Confirmed filter grammar, technology/version sample, safe CVE association and applicability notes                  |
| OSINT                  | Example indicator → host evidence → next research lead                                              | Approved unclassified indicator and observations with attribution restrictions                                     |
| Monitoring             | Five selectable concept stages and two documentation-only asset examples                            | Actual availability roadmap, scan diff semantics, real display fields, approval to market                          |
| Data & Methodology     | Observation and potential CVE context integrated into host UI                                       | Approved field definitions, dates, provenance, detection methodology                                               |
| Pricing                | Credits/Search Tokens explainer before comparison, package display unchanged                        | Token:credit relationship, action costs, API deductions, exhaustion state, rollover, expiry and plan compatibility |
| Developers / API       | Request scaffold, copy, response tab and authentication guidance                                    | Sanitised working endpoint/method/auth/payload/response, official docs destination                                 |
| Contact                | Native mailto draft and explicit delivery notice                                                    | Owned backend/service, lawful storage/consent and error handling                                                   |

### Verification ownership

The product owner must supply three distinct **working** guest queries for a fully interactive multi-result home teaser; without them, the existing single illustrative sample remains visibly labelled. Confirm the actual search query transfer to `/search` before promising `Run this search` deep links.

The API reference must include host, environment, method, authentication headers, request parameters, pagination, rate limits and a sanitised real response. Do not publish secrets or client records into this public website repository.

The current pricing values are unchanged from the approved client-preview copy. Nothing in the visual explainer asserts unverified conversions or expiry rules. Publication must wait for approval of that mechanics sheet.

### Design review and hosting

The source R21 visual system remains authoritative. Deterministic screenshots with masked canvases are regression evidence only; the dedicated real-visual suite captures unmasked canvas and GSAP states in both themes on desktop and mobile.

No `main` merge or GitHub Pages publication is authorised. Vercel READY does not prove password protection; the account owner must verify deployment protection before distributing confidential client preview links.
