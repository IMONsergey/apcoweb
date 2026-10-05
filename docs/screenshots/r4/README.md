# R4 visual review — 2026-10-05

The root captures are browser screenshots of the published PR #3 release (`3315c89985e635cb6dcf02536ce5dfb5539ca882`) at https://imonsergey.github.io/apcoweb/. `capture-results.json` records the 24 EN/RU viewport checks: 320, 360, 390, 430, 599, 768, 1024, 1199, 1200, 1440, 1600 and 1920 px. All report no runtime errors, missing images or measured text/document overflow. Screenshots use reduced motion to make visual inspection repeatable; active animation is exercised by the browser suite.

`*-full.webp` records the entire page. Section captures cover the header, live search scene, audience cards, data section, pricing/dock, closing scene and footer at representative widths. The images were visually inspected, including Cyrillic typography, long strings, split actions, the full-width mobile globe, billing text and the 1199/1200 breakpoint.

## Issue found and corrected

The original `768-ru-closing.webp` shows a turquoise sliver below the translated CTA: the overlay ended just above the bottom edge of the English CTA baked into the unchanged Start asset. `fix/600-ru-closing.webp`, `fix/768-ru-closing.webp` and `fix/899-ru-closing.webp` show the corrected local production build. Only the translated narrow-tablet cover minimum height changed from 43% to 45%; the images, English layout and actual link are untouched. The additional R4 regression checks coverage of the source CTA at nine tablet/desktop widths.

The root screenshots intentionally retain the before-fix evidence; use `fix/` for the corrected closing region. `docs/QA-RESULTS.md` and `docs/qa-summary.json` identify the final tested source and CI evidence. Screenshots are browser-engine evidence, not physical-device certification.
