# Internal legal documents — 10 October 2026

## Source and scope

The six complete English documents were retrieved from the public Apcosys application on 10 October 2026. All carry the published edition date **August 4, 2025**. The transfer preserves their wording, lists, emphasis and legal provisions. It is a presentation/routing change, not a new legal revision or a validation of the provisions.

The production HTML references `https://cdn.apcosys.cc/assets/js/index-79ps6aYV.js`, whose route declarations map the legal documents to static Markdown exports in `https://cdn.apcosys.cc/assets/js/md-file-nlL44WhB.js`. The six static template literals were extracted with the TypeScript parser without executing downloaded JavaScript. Verbatim Markdown is retained in `docs/legal-sources/` and excluded from automatic formatting.

| Published source                                                                             | Sections | Source SHA-256                                                     |
| -------------------------------------------------------------------------------------------- | -------- | ------------------------------------------------------------------ |
| [Apcosys API & Data License Agreement](https://apcosys.net/legal/api-data-license-agreement) | 10       | `b24ab848d215a20f1d51b19f9b1706e114da01854470e76f27853f36380a0ecf` |
| [Apcosys Cookie Policy](https://apcosys.net/legal/cookie-policy)                             | 6        | `f94e749e96992207de3dc7398c996fad305dee1fda8005f8f7a98b00e318976a` |
| [Apcosys Data Collection Policy](https://apcosys.net/legal/data-collection-policy)           | 4        | `f3a0996ed230291486f4c3c342f4ac5c26937b8fd1a1fed0732a7c47085f5a3a` |
| [Apcosys Data Processing Agreement](https://apcosys.net/legal/data-processing-agreement)     | 12       | `7e5c2ae1ca5a338c09311b98dbe8084a1eb95420b1e43b295a830e217bb7261a` |
| [Apcosys Privacy Policy](https://apcosys.net/legal/privacy-policy)                           | 12       | `540d9f98c4e26d6e4425bc69e72b3853f7fe849c6177ff2532f11cc21eb59964` |
| [Apcosys Terms and Conditions](https://apcosys.net/legal/terms)                              | 27       | `0af4e10b34b92fc30b09975b2e49c8da7370ccfe7b324709156b0650ae160d4a` |

## Reading and navigation

- Dedicated document layout: shared page rails and theme, a 760 px maximum reading column, real list markers, spacious section headings, preserved edition dates.
- All six footer links, Contact's privacy link and the cookie dialog link resolve to local routes. Prominent references to the other policies link internally without changing their visible wording.
- The contents navigation is generated from actual published H2 headings. Existing numbered heading anchors are preserved; H3 subsections also have direct anchors. The source's orphan Terms `#refund-policy` TOC item has no matching section, so it is omitted from navigation; the full **Payments and Refunds** section is retained.
- Terms has 27 sections; its desktop contents rail is sticky and independently scrollable within the viewport. On mobile, the contents use the existing animated disclosure component, with reduced-motion handling.
- Print action uses the browser's print dialog. Print CSS removes site/navigation controls, preserves all document text and uses a light reading surface.
- The source's HTML comments remain unpublished; content hidden by the source publisher is not restored.
- No legal illustrations or decorative animation: space is allocated to the document and its navigation.

## Source issues preserved for owner review

These are discrepancies in the existing published documents, not changes made during migration:

- API license plan terminology (Personal, Free, Business, Enterprise) does not fully match the new pricing presentation (Free, Plus, Expert, Business).
- Privacy/Cookie policies describe analytics, advertising and product cookies. This protected marketing preview currently installs no optional analytics/marketing trackers; its preference dialog continues to state that actual behavior.
- The DPA names a “Subprocessors List” without providing a URL. No destination was invented.
- The documents retain their original dates and statements about governing law, consent, refunds and service capabilities. No legal compliance certification is implied by the transfer.

## Build and verification

`npm run legal:compile` regenerates the static document JSON from the reviewed Markdown. `npm run legal:check` verifies it is current and runs as part of `npm run check`. Marked is a development-only compiler, not shipped to the browser. Raw HTML/images and unsupported URL schemes are rejected by the compiler; no remote document fetch or user-provided HTML is rendered at runtime.

The legal suite compares the full rendered body of each page against an independent Markdown rendering of its published source (excluding only the title/date displayed above and regenerated TOC). It also checks anchor targets and deep-link refresh, base-path handling, mobile/desktop width, both themes, internal navigation and footer alignment. Site-wide branding checks cover visible text, accessible labels and page titles. API environment-variable names remain uppercase technical identifiers.
