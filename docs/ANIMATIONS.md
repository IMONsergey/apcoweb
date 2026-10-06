# Supplied animation integration

Uploaded archive: `Коды(1).zip` (identical to the preceding `Коды.zip`). SHA-256: `1521af8fc6a9f9b1fddfd4e57a6320a982dee12745105b5eac3dc553c94e3576`.

| Supplied package                    | Use in the page                                                                        |
| ----------------------------------- | -------------------------------------------------------------------------------------- |
| block second bg / TurquoiseFlow     | Live field behind HTML/SVG search chrome (no upper-scene screenshot)                  |
| signal-globe-react / SignalGlobe    | The data section globe; transparent, Canvas/WebGL renderer with fallback               |
| clean-rings + clean-rosette         | Researcher/team contour motifs                                                         |
| dot-cascade variants                | Search, card, API and contact dots; direction is a prop rather than duplicated engines |
| Botom waves blocks / IceSphereWaves | Soft lower-page atmosphere behind FAQ and the closing scene                            |

## Ownership

React owns layout, semantic content, dialogs, navigation and motion preference. Each supplied effect owns only its Canvas or SVG subtree. No renderer rewrites page DOM or product content.

- Effects are dynamically imported when close to the viewport, except the search backdrop and audience contours prepared on initial page load.
- Original engines handle visibility, device-pixel limits and cleanup.
- R2 removes the global pause control. Device reduced-motion preferences stop nonessential motion; the marquee additionally pauses on keyboard focus. R5 preserves continuous movement under pointer hover.
- All listeners and controllers are disposed on unmount; React StrictMode exercises teardown.
- Decorative layers do not block buttons or page scrolling. Their wrappers forward pointer coordinates/listen on the containing semantic surface so gentle hover works without an invisible hit-area overlay.
- Dot directions use one implementation: top-to-bottom for search, bottom-to-top in cards, right-to-left for API, left-to-right for the contact strip.

The original module checksums are in `src/visuals/SOURCE-MANIFEST.json`. The small wrapper integration changes are listed in `docs/visual-source-verification.json`; rendering algorithms are preserved.

See REVIEW-R2.md for the new marquee and interaction transitions.

## R3 behavior

The contextual billing panel is non-modal, stays in logical keyboard order before the plans, and is inert outside its pricing range. Reduced motion disables its translation and uses the supplied Canvas2D globe renderer to keep the stopped image visible. The renderer algorithms are unchanged. Hover media lift, search navigation feedback and focus feedback are scoped to user actions.

## R8 behavior

- Locale changes use a 100 ms fade-out and 220 ms fade-in on real inline text. R8 originally reserved maximum EN/RU sizes; R9 removes that behavior at the owner's request. Displayed copy now reflows naturally, without transformed sections or alternate-language measurement. Reduced motion changes copy immediately.
- The fixed header follows scroll direction with a 12 px noise threshold, shows at the page top and stays visible for open navigation or keyboard focus. The compact row is 72 px, or 64 px on phones. Native anchor clearance uses the compact height.
- Historical R8/R9 used a white page wash and individual decorative fades. R10 uses a 520 ms opacity entrance on the page itself after the first painted frames of both search-background engines and initial font/image preparation, with no separate loader, logo or minimum dwell; see REVIEW-R10.md. Individual contour mounts do not animate their opacity.
- Audience contours are displayed at 93% of their previous size. Their source renderers remain unchanged.
- Footer underlines grow from left to right on hover or keyboard focus; press feedback is scoped to actual controls.
- The owner-supplied `api-developer-demo` is isolated in shadow DOM, inert and decorative. It loads within 280 px of the viewport. Its original 30.2 s GSAP sequence pauses offscreen or when the document is hidden, uses a static response for reduced motion, and reverts its context and disposes observers/listeners on unmount. It never sends a live API request or writes the clipboard.
