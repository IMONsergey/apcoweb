# Content and integration status

This is a frontend client-review build, hosted either at a domain root or under a configured subdirectory. No authentication, API subscription or payment is implemented locally. The accepted source commit must match the delivered `dist`; see README for both build targets.

## Preserved from the supplied Figma concept

- Prices displayed: Free $0, Plus $40, Expert $240, Business $720.
- Credits, user counts, product labels, metric values and organization marks are design content. They are not presented as newly measured live data.
- R2 explicitly authorizes a 20% annual discount, calculated by native switching with an explicit annual total. See REVIEW-R2.md for the approved arithmetic.

## Routing

Verified from the current APCOSYS public frontend during implementation:

- `/search?search_value=...` is the full-text query handoff. Native GET submission URL-encodes user input; empty input is handled locally.
- `/register`, `/docs/api`, `/docs/about`, `/docs/contacts`.
- `/legal/api-data-license-agreement`, `/legal/cookie-policy`, `/legal/data-collection-policy`, `/legal/data-processing-agreement`, `/legal/privacy-policy`, `/legal/terms`.
  Authentication is hosted by APCOSYS. The Sign In action opens the product search entry, where the existing product controls authentication.

## Required before final publication

- Confirm payment destinations and final checkout integration. The annual arithmetic was authorized in R2; the preview still does not process payments.
- Approve the remaining FAQ copy. The Free answer is from Figma. API and contact answers use the already stated API entitlement and provided email. Credit-consumption rules are not invented: the answer directs the visitor to the team.
- Confirm the figures, rights/basis for the trust logos, and accuracy of product images. The Host/API images are illustrative source assets, not proof of implemented server functionality.
- Approve the illustrative examples in all five animated carousel scenes before treating them as product screenshots.
- Approve remaining outbound destinations and remove `noindex` only when launching the final production site.

The site makes no background product API calls, collects no credentials and has no analytics/cookies added by this implementation. Clicking a product link or submitting search transfers the visitor to the existing APCOSYS domain.

## Current language and theme availability

The review UI is English. English is the active language; Russian and Chinese are disabled and labelled SOON. Retained Russian translation source is historical working copy, not a currently available or client-approved translation. The landing selector does not control the external product's language.

Light, Dark and System are implemented. The API block intentionally preserves its original cyan and light product interface in both themes; other theme surfaces and effects use the selected palette.

## Preview routing decisions

- Monitoring links to the product search entry; it does not start a separate monitoring flow on this landing page.
- Bug Bounty, Vulnerability Research and OSINT links share the researchers overview.
- Explore For Teams leads to the API overview, which describes the current integration path.
- Sign In opens the existing product search entry and its authentication controls.

These existing review destinations are retained without inventing new product routes. Confirm their names and final product flows with the owner before production publication.
