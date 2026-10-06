# R9 — natural dimensions for the selected language

Owner request, 2026-10-06: English controls and reading blocks had been stretched to reserve the larger Russian copy. That made shorter labels and paragraphs occupy unnecessary space.

R9 deletes the offscreen alternate-language measurement tree and its generated minimum widths/heights for headings, paragraphs, navigation, actions, FAQ answers and sections. It removes measurement-only message metadata, the fixed language-trigger width and shared header overrides introduced for maximum EN/RU geometry. Ordinary responsive CSS now sizes the actual selected text; switching languages may change widths, heights and section positions. Existing full-width phone actions and layout grids retain their intended responsive behavior.

The quiet text fade, font preparation and nonblocking page wash remain independent of sizing. Search query, billing, FAQ disclosure, fragment, saved preference and keyboard focus remain mounted. Wide-screen text scaling, compact language menu, 93% audience artwork, footer underline, mobile search copy, directional compact header and supplied lazy API demo are retained. Prices, artwork, source engines and Figma are unchanged.

Existing browser regressions now check that desktop/tablet hero actions fit their current text plus normal padding and arrow, that the longer Russian label grows, and that returning to English releases extra space. They allow natural reflow while continuing to check text overflow, menu bounds and FAQ disclosure.

At the 1200 px three-card carousel breakpoint, 32 px horizontal copy padding keeps the long English word “Technical” within its card; wider layouts retain their original padding. The language regression now includes this boundary.

Locked installation, six source-engine checksums, lint, TypeScript, formatting and production build pass. The final local Chromium suite passes 96/96 with no failures, retries or skips, using cached macOS Chromium 151.0.7922.34. The earlier local candidate had two ambiguous FAQ test selectors; those were corrected and the full suite rerun successfully without any additional runtime changes. Matching locked Chromium/Firefox/WebKit CI and the actual published Chromium suite remain the release gates; the PR and Actions records identify their exact source and outcome. Inspected captures and 16 EN/RU viewport checks are retained in [screenshots/r9/](screenshots/r9/).
