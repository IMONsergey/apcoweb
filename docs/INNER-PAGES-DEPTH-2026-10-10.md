# Internal pages: content depth and hierarchy

Date: 2026-10-10. Incremental revision after the first internal-page visual rebuild.

## Problem

The first pass gave the pages a consistent hero and illustrations, but the body content still depended on repeated generic sections. It did not sufficiently distinguish the decisions made by a researcher, an API integrator, a team buyer, and a visitor with a scanning question.

This revision gives each of the twelve routes a specific reading order, practical content and a relevant next action. Page backgrounds remain uniform. Space and thin rules separate editorial sections; filled surfaces are reserved for demonstrations, code and forms. The established typeface, teal palette and double-button component are retained. There is no beige palette.

## Page-by-page changes

| Route                        | Reading order and purpose                                                                          | Composition                                                                                                 |
| ---------------------------- | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Search & Investigation       | Investigation → useful query starting points → how to interpret evidence → continue researching    | Connected product scene, three query examples, concise evidence rows                                        |
| Data & Methodology           | Observation / detection / association → dataset coverage → collection and dates → limits           | Three evidence levels, two-column metric register, paired collection/date explanations                      |
| Monitoring                   | Explore the proposed workflow → interpret different changes → decide the next action               | Existing five-state concept, three change examples, numbered handoff steps                                  |
| Bug Bounty                   | Begin with programme scope → follow a worked example → verify a candidate → search                 | Four numbered steps, scope example, three focused checks                                                    |
| Vulnerability Research       | Product/version → distribution → potential exposure → responsible validation                       | Paired research stages, technology evidence fragment, detection/advisory/current-state checks               |
| OSINT & Threat Investigation | Starting indicator → context → evidence trail → attribution limits                                 | Narrative beside an example investigation notebook, indicator fragment, three recording principles          |
| Security Teams               | Analyst workflow → recurring tasks → useful handoff → shared access                                | Existing workflow scene, task rows, handoff record, compact Business-plan facts                             |
| API                          | Prepare first request → understand query capabilities → choose access → handle results responsibly | Three setup steps beside request/response example, capability columns, rates beside usage explanation       |
| Pricing                      | Choose a plan → understand usage → compare capabilities → add capacity → billing questions         | Existing pricing cards, request-cost explanation, comparison table, token packages, visible billing answers |
| About                        | Why the product exists → approach → explore the product → contact                                  | Two-column rationale, four-part investigation sequence, approach rows, related reading                      |
| Responsible Scanning         | What is collected → information needed to identify traffic → request an exclusion → contact        | Collection columns, structured inquiry fields, three steps and a prefilled email draft                      |
| Contact                      | Pick a relevant topic → prepare a useful message → send via email                                  | Three compact topic selectors, six form topics, guidance beside form                                        |

Each page has an illustration and an “On this page” navigation. Closing sections have a page-specific heading, short rationale and existing double buttons. Internal pages retain compact product demonstrations; this change does not introduce another repeated full-screen animation.

## Content sources and reconciliation

Read both supplied documents from the uploaded originals:

- `Apcosys_Website_Strategy_Architecture_Content_APPROVED(3).docx`
- `Apcosys_Website_Enhancements_Team_Discussion_FINAL(3).docx`

This is an editorial adaptation, not a claim of verbatim parity. It restores the source architecture and practical details while preserving the previously approved product-preview constraints.

| Source requirement                                          | Treatment                                                                                       |
| ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Five connected investigation steps                          | Retained in the workbench; descriptions expanded to explain how one step informs the next       |
| Four-step use-case flows and Query / Result / Next examples | Retained, with different reading compositions and validation guidance for each case             |
| Contextual use-case CTAs                                    | Each case closes on its specific research question and corresponding product action             |
| Team workflow, context, API, trust, Business access         | Separate task, evidence-handoff and shared-access sections                                      |
| Compact API request/response example                        | Retained beside practical setup steps; copy and response interaction remain available           |
| Usage explanation before full plan comparison               | Request-cost panel and allowance questions precede the comparison table                         |
| Billing questions                                           | Free use, periods, payment, tax, cancellation and refunds are addressed visibly                 |
| Collection, data meaning and dates                          | Observation/detection/association distinction, metric definitions, collection and date guidance |
| Scanning identification and opt-out                         | Actionable inquiry fields and prepared exclusion request; no invented scanner IP ranges         |
| Contact functionality                                       | Topic choices populate the form and focus the name field; known URL topic presets are validated |

## Product facts still requiring confirmation

- Real production API endpoint, authentication contract and documentation URL are not supplied. The example remains explicitly illustrative and does not invent a working endpoint.
- Credit-to-Search-Token conversion, package eligibility and final billing terms still require product confirmation. Existing approved preview prices, plan features and rates are preserved.
- Coverage totals remain supplied preview figures; measurement date and final counting definitions are not available.
- Exact Created/Updated semantics, collection cadence and scanner identification details remain unconfirmed.
- Monitoring is a labelled concept; it does not connect to live scans or deliver alerts.
- Product scenes use reserved addresses and illustrative records. Authentic product captures have not been supplied.
- Contact prepares an email draft. It does not claim server-side submission or message delivery.

These gaps are not filled with fabricated metrics, legal details or product promises.

## Validation

- Build, TypeScript, lint, formatting, asset-integrity and visual-source integrity checks.
- Screenshots of all twelve routes at desktop and phone sizes; desktop dark-theme review.
- Responsive checks at 320, 768 and 1440 px, including heading hierarchy, illustration loading, Monitoring navigation and API rate columns.
- Functional regression coverage for product fragments, API request/response, plan controls, contact validation and history navigation.
- WCAG automated checks for all thirteen routes in light and dark themes.
- Motion checks for continuous height changes, native/fallback/reduced-motion navigation, original homepage films and canvas visibility handling.
- New checks for unique contents anchors, contact topic presets/focus, and actionable exclusion email drafts.

During verification, fixed mobile API grid overflow and a legacy related-link rule overriding the text colour of primary double buttons. Updated the Monitoring viewport check to scroll to the actual section before checking its five stages. Updated the API honesty assertion to match the new visible wording without relaxing the underlying requirement.

This remains an unmerged preview branch. See the PR and Vercel deployment for the exact reviewed revision.
