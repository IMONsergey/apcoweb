# R9 — natural dimensions for the selected language

Owner request, 2026-10-06: English controls and reading blocks had been stretched to reserve the larger Russian copy. That made shorter labels and paragraphs occupy unnecessary space.

R9 deletes the offscreen alternate-language measurement tree and its generated minimum widths/heights for headings, paragraphs, navigation, actions, FAQ answers and sections. It removes measurement-only message metadata, the fixed language-trigger width and shared header overrides introduced for maximum EN/RU geometry. Ordinary responsive CSS now sizes the actual selected text; switching languages may change widths, heights and section positions. Existing full-width phone actions and layout grids retain their intended responsive behavior.

The quiet text fade, font preparation and nonblocking page wash remain independent of sizing. Search query, billing, FAQ disclosure, fragment, saved preference and keyboard focus remain mounted. Wide-screen text scaling, compact language menu, 93% audience artwork, footer underline, mobile search copy, directional compact header and supplied lazy API demo are retained. Prices, artwork, source engines and Figma are unchanged.

Existing browser regressions now check that desktop/tablet hero actions fit their current text plus normal padding and arrow, that the longer Russian label grows, and that returning to English releases extra space. They allow natural reflow while continuing to check text overflow, menu bounds and FAQ disclosure.

At the 1200 px three-card carousel breakpoint, 32 px horizontal copy padding keeps the long English word “Technical” within its card; wider layouts retain their original padding. The language regression now includes this boundary.

Locked installation, six source-engine checksums, lint, TypeScript, formatting and production build pass. The final local Chromium suite passes 96/96 with no failures, retries or skips, using cached macOS Chromium 151.0.7922.34. The earlier local candidate had two ambiguous FAQ test selectors; those were corrected and the full suite rerun successfully without any additional runtime changes. Inspected captures and 16 EN/RU viewport checks are retained in [screenshots/r9/](screenshots/r9/).

Runtime/test source `4235219121310669192ee668be6e268bd082867e` passes **288/288** matching Chromium/Firefox/WebKit scenarios, 96 per engine, with no failures, retries or skips in [run 37411880514](https://github.com/IMONsergey/apcoweb/actions/runs/37411880514). The independent Chromium gate passes 96/96 in [run 37411880517](https://github.com/IMONsergey/apcoweb/actions/runs/37411880517).

[PR #10](https://github.com/IMONsergey/apcoweb/pull/10) is merged as `66f65fd80948f3cba89583f11ddda5c0e12dfbbd`. [Pages run 37412596307](https://github.com/IMONsergey/apcoweb/actions/runs/37412596307) successfully validates the main build, publishes Pages and passes **96/96** against the actual public URL. All 13 published JS/CSS SHA-256 hashes match a clean local production build; its HTML references the correct entry files. The release summary is in [qa-r9-summary.json](qa-r9-summary.json). Subsequent documentation-only evidence preserves runtime and tests byte for byte.
