# R7 — sticky navigation and shared typography

The owner requested a header that follows scrolling on every viewport and consistent typography across the website.

- The existing white header uses native `position: sticky; top: 0` within the page. Its initial layout is unchanged. The height token is 96 px on desktop/tablet and 78 px below 600 px; native anchor scrolling reserves that height plus 24 px. Disclosure menus stay above content and below native dialogs.
- All translated copy passes through the shared `src/i18n/typography.ts` pipeline after interpolation. Typograf 7.8.0 is locked; separate EN/RU engines apply language-specific quotes, dashes, spaces, nonbreaking short-word/preposition/conjunction ties, particles and short final words. Results are cached and rendered as React text. HTML insertion, value conversion, date/number/currency rewriting and automatic link generation are disabled.
- Intentional spaces around inline fragments remain intact. The hero's final conjunction stays attached to the highlighted phrase, and the FAQ contact preposition stays attached across its email link. Numeric group separators are nonbreaking without changing any value. Paragraphs use `text-wrap: pretty`; approved balanced headings and explicit section breaks remain.
- Search queries, hrefs, plan prices, entitlements, source-engine assets and supplied artwork retain their original content. Locale fades/layout morph, flags, price reels, pricing hover and continuous marquee remain R6 behavior.

The typography test checks actual Unicode output, punctuation, preserved price interpolation and idempotence. Four browser scenarios at 320, 390, 768 and 1440 px check header position after scrolling, changing languages without viewport/input loss, real nonbreaking text ranges and overflow, native pricing anchors through desktop/mobile navigation, and usable language menus while scrolled. Existing anchor expectations now reserve the header rather than place content underneath it.

Locked installation, six source-engine checksums, lint, TypeScript, formatting, production build and the typography test pass locally. Matching local Playwright browser executables are unavailable; browser verification is performed by the locked Chromium/Firefox/WebKit CI jobs. Release evidence follows in the PR and QA handoff.
