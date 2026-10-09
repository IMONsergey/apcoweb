# Stage 2 — approved requirements coverage

Source: Apcosys_Website_Strategy_Architecture_Content_APPROVED.docx, October 2026, pages 5–24.
This is a review matrix, not a declaration of launch readiness. "Implemented" refers to UI/code presence; not all claims or destinations are product-verified.

| Page | Required sections | Implemented sections in PR #27 | Missing or modified |
| --- | --- | --- | --- |
| Home | Search Hero + 3 working examples, searchable data, coverage, investigation sequence, use cases, capabilities, researchers/teams, methodology, API, four tariffs, team CTA, FAQ, final CTA | Hero form and three click-to-fill domain/IP examples; searchable-data cards; coverage and retained R21 illustrated SearchPreview; five-step research carousel; use cases; capabilities; audience; data; API; pricing; FAQ; final CTA | Live search result validation for all 3 examples; coverage timestamp; check R21 visual review and first fold |
| Search & Investigation | Query, Results, Host, Context, Continue; syntax link; search examples | Large five-step illustrated workbench and separate search entry; syntax introduction, step explanations and CTAs | Production search grammar and query-retention at registration need verification |
| Data & Methodology | What observed, coverage definition/value/date, collection method, Created/Updated, CVE associations and limits | Six metric rows with unverified reference date; time/observation evidence diagram; methodology text, CVE limitations | Authoritative definitions, measurement date, Created/Updated semantics, collection cadence |
| Monitoring (conditional) | Concept only, without asserting live continuous monitoring or ASM/EASM | Distinct three-state interactive offline concept dashboard with observation/signal/investigation transition | Live capability and entitlements deliberately not claimed |
| Bug Bounty | Programme scope, observed host/services, research prioritisation, scope enforcement, example, pricing entry | Authorisation/scope evidence console and story-specific 5-step interface; plan CTA and caution | Scope syntax and real guest search results require SaaS validation |
| Vulnerability Research | Product/version query, distribution and filters, CVE associations, verification, plan CTA | Dedicated product/version/CVE signal chain plus illustrated workflow | Exact filter grammar, CVE plan availability and live example |
| OSINT & Threat Investigation | Indicator to host, shared technical attributes, evidence trail and API link | Indicator research diagram with RFC documentation address; illustrated UI story and API CTA | Live pivot semantics and API contract |
| Security Teams | Analyst investigation, host context, API integration, data trust, Business access and conversation | Four-stage team workflow, investigation viewer, proposed Business metrics, methodology and contact CTAs | User entitlements, invoice/commercial terms, operational workflow proof |
| API | Capabilities, plans, rate limits, request/response and docs entry | Interactive copyable labelled illustrative request/response panel, access table and credit context | Actual endpoint/auth/pagination/response and documentation URL require confirmation |
| Pricing | Four plans with monthly/annual savings, comparison, credits/tokens, FAQ on payment/cancel/refunds, conversion | R21 animated prices and billing, four plan states and modal; comparison table; credits/tokens; commercial explanatory blocks; Business contact | No unverified checkout deep links; exact plan and payment terms still fact-check |
| About | Product motivation, approach and responsible principles, company details, contact | Editorial approach, values, contact | Legal entity/person/location intentionally omitted until approved |
| Responsible Scanning | What observed, scanner identification, opt-out, support | Four information sections plus contact and data methodology | Scanner identifiers/ranges, opt-out SLA and approved scanning policy |
| Talk to Us | Validated name/email/company/topic/message, consent, delivery success/error and alternate email | Validated fields and consent; email-draft fallback with explicit non-delivery notice | Contact API/provider, delivery success/error and retention policy require owner integration |

## Navigation, SEO and UX

The shared header contains Platform, Use Cases, For Teams, Developers, Pricing and product CTAs; Company, Legal, Cookie Preferences and email are in the footer. Navigation is relative to the Vite build base, supports history and scroll positions. Build emits static per-route HTML metadata for all route URLs, but React page content is client-side, not true SSR. Preview remains noindex; this is not an access control.

## Screenshots / design approval

A dedicated Stage 2 review job captures 13 routes at 1440×900, 1920×1080 and 390×844, each in Light/Dark (78 frames); additional Home/Search/Pricing/Monitoring at 1366×768 and 320×740, each Light/Dark (16 frames). The 94-frame package is considered available only after the corresponding workflow passes. Original R21 pixel baselines remain unchanged; comparison contact sheets are generated separately for designer review.

## Publication

No merge to main and no replacement of the existing R21 GitHub Pages release. A client preview requires authorised access to the correct Vercel team and product facts listed in the fact register.
