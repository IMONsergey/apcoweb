# Content and integration status

This GitHub Pages website is a frontend review build. No authentication, API subscription or payment is implemented locally.

## Preserved from the supplied Figma concept

- Prices displayed: Free $0, Plus $40, Expert $240, Business $720.
- Credits, user counts, product labels, metric values and organization marks are design content. They are not presented as newly measured live data.
- Annual savings note and the monthly selection remain visible. Annual amounts are not calculated; the annual control explains the dependency and points to the current product.

## Routing

Verified from the current APCOSYS public frontend during implementation:

- `/search?search_value=...` is the full-text query handoff. Native GET submission URL-encodes user input; empty input is handled locally.
- `/register`, `/docs/api`, `/docs/about`, `/docs/contacts`.
- `/legal/api-data-license-agreement`, `/legal/cookie-policy`, `/legal/data-collection-policy`, `/legal/data-processing-agreement`, `/legal/privacy-policy`, `/legal/terms`.
  Authentication is hosted by APCOSYS. The Sign In action opens the product search entry, where the existing product controls authentication.

## Required before final publication

- Confirm pricing periods, annual total and payment destinations. Plan cards currently open frontend information dialogs and transfer to the product.
- Approve the remaining FAQ copy. The Free answer is from Figma. API and contact answers use the already stated API entitlement and provided email. Credit-consumption rules are not invented: the answer directs the visitor to the team.
- Confirm the figures, rights/basis for the trust logos, and accuracy of product images. The Host/API images are illustrative source assets, not proof of implemented server functionality.
- Replace remaining placeholders/examples in the fourth/fifth carousel cards when product-approved illustrations are available.
- Approve remaining outbound destinations and remove `noindex` only when launching the final production site.

The site makes no background product API calls, collects no credentials and has no analytics/cookies added by this implementation. Clicking a product link or submitting search transfers the visitor to the existing APCOSYS domain.
