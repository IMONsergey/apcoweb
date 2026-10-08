# Content and integration checklist

The landing page is a product presentation. Displayed metrics, interface scenes and plan details are illustrative or owner-supplied content, not a live feed.

## Items to approve before production

- Displayed prices (Free $0, Plus $40, Expert $240 and Business $720), credits, user limits, and annual discount calculation.
- Accuracy and currency of internet-scale statistics and product descriptions.
- Organization logos, their usage rights and any implied customer or partner relationship.
- Illustrative Query / Results / Host / Technical context / Next step scenes and API demo.
- FAQs, support contact address, plan details and final checkout destinations.
- Legal links, privacy requirements, tracking/cookie policy and search handoff behavior.

The site does not implement local checkout, account storage, user authentication or production API calls. Search and account actions point to the APCOSYS product.

## Language and theme

English is the active landing-page language. Russian and Chinese are marked as unavailable. Light, Dark and System themes are available. The API demo intentionally keeps a light product interface in both themes.

## Preview restrictions

`index.html` and `public/robots.txt` prevent indexing during review. They must be considered explicitly during the production release. Do not remove them merely as part of repository cleanup.
