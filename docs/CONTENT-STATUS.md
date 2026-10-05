# Content and integration status

This GitHub Pages website is a frontend review build. No authentication, API subscription or payment is implemented locally.

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
- Replace remaining placeholders/examples in the fourth/fifth carousel cards when product-approved illustrations are available.
- Approve remaining outbound destinations and remove `noindex` only when launching the final production site.

The site makes no background product API calls, collects no credentials and has no analytics/cookies added by this implementation. Clicking a product link or submitting search transfers the visitor to the existing APCOSYS domain.

## R4 localization

EN/RU selection localizes the landing UI, metadata and accessibility labels. RU copy is a working translation of the existing English content, not client-approved marketing copy. Technical product names and the prepared illustrative product images remain intact; English labels baked into desktop/tablet illustrations are not claims that the landing selector controls the external product. Confirm the Russian editorial copy before a production-domain launch.
