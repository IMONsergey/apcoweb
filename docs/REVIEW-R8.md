# R8 — responsive refinements and quiet interaction

Owner request: 2026-10-05, eight supplied screenshots and `apcosys-api-widget (1).zip`. Baseline is the published R7 main merge `d7bbda47e2162808ddf29cf9da8762f0c5aa52d2`.

## Resulting behavior

1. At 1600–2000 px, body copy grows gradually from 18 to 20 px and secondary reading text from 13 to 15 px. Control sizes increase selectively; the main composition is preserved.
2. The language menu fits its labels and flags instead of retaining a 182 px minimum width.
3. Audience contour compositions are 7% smaller.
4. Footer links get a left-to-right underline with the existing soft color transition; keyboard focus gets the same cue.
5. At <=1199 px, the search placeholder is “Domain, IP or attribute”; “It’s free” appears below it in the accent color. Error copy has its own nonoverlapping line.
6. The compact billing offer is left aligned and vertically centered. The comparison action label is left aligned.
7. The phone closing scene clips the source bitmap to its brand/menu strip, keeping baked body content behind the live account/copy from showing through. Original artwork is preserved.
8. The supplied API sequence replaces the bitmap after its lazy chunk mounts. A source-image fallback keeps the section usable if that optional chunk fails.
9. The header hides on downward scrolling and returns upward; its scrolled row is 72 px on desktop/tablet and 64 px on phones. Open menus and keyboard access keep it visible. Native anchors clear the compact header.
10. Language changes preserve native inline wrapping. Headings, paragraphs, buttons and navigation reserve the larger EN/RU dimensions after fonts load, so sections do not scale or slide. A short hidden text handoff retains query, billing and FAQ state.
11. The initial page wash is nonblocking and capped at 220 ms, then fades from white. Newly mounted decorative layers appear through opacity. Reduced-motion preferences bypass optional transitions.
12. Font faces at different weights now share URLs for byte-identical WOFF2 files. The same outlines and weight declarations are preserved, while a cold load avoids six redundant requests and 194,192 bytes. The archive-compatible files remain available.

## Supplied API provenance

`src/visuals/api/api-developer-demo.js` is byte-identical to the archive's source, SHA-256 `7fdc54f8094f5f48ff2d445d5964f9295637c5f143e93a44bb6bf134934f681a`. The uploaded GSAP version is pinned as `gsap@3.13.0`; its license notice is retained. No archive, real credentials or account data is included in Git. The original six rendering/data modules still pass the source-manifest checks.

The widget is an illustrative screen, not an interactive API client. It remains inert and outside keyboard order. The exact 2048:1511 ratio is reserved before loading. Its source lifecycle pauses offscreen/when hidden, renders a static successful response for reduced motion, and disposes GSAP context, observers and listeners. Shared GSAP is configured before the custom element is connected. Only this lazy chunk includes GSAP.

## Validation and audit

Local locked install, source integrity, lint, TypeScript, formatting and production build are checked before publishing. Local matching-browser execution is unavailable in this workspace; authoritative browser checks run in GitHub Actions with the exact Playwright browser versions. Their final outcome, inspected screenshots and published build identity will be recorded here after execution. The post-fix six-step audit is retained in AUDIT-R8.md when complete.

Do not treat this candidate note as a successful release record. A successful Pages deployment and independent checks against the actual published URL are required.
