# Supplied animation integration

Uploaded archive: `Коды(1).zip` (identical to the preceding `Коды.zip`). SHA-256: `1521af8fc6a9f9b1fddfd4e57a6320a982dee12745105b5eac3dc553c94e3576`.

| Supplied package                    | Use in the page                                                                        |
| ----------------------------------- | -------------------------------------------------------------------------------------- |
| block second bg / TurquoiseFlow     | Animated light/turquoise field behind the original search composition                  |
| signal-globe-react / SignalGlobe    | The data section globe; transparent, Canvas/WebGL renderer with fallback               |
| clean-rings + clean-rosette         | Researcher/team contour motifs                                                         |
| dot-cascade variants                | Search, card, API and contact dots; direction is a prop rather than duplicated engines |
| Botom waves blocks / IceSphereWaves | Soft lower-page atmosphere behind FAQ and the closing scene                            |

## Ownership

React owns layout, semantic content, dialogs, navigation and motion preference. Each supplied effect owns only its Canvas or SVG subtree. No renderer rewrites page DOM or product content.

- Effects are dynamically imported when close to the viewport.
- Original engines handle visibility, device-pixel limits and cleanup.
- Global motion pause and `prefers-reduced-motion` stop nonessential animation. The text and product preview remain usable.
- All listeners and controllers are disposed on unmount; React StrictMode exercises teardown.
- Decorative layers do not block buttons or page scrolling. Their wrappers forward pointer coordinates/listen on the containing semantic surface so gentle hover works without an invisible hit-area overlay.
- Dot directions use one implementation: top-to-bottom for search, bottom-to-top in cards, right-to-left for API, left-to-right for the contact strip.

The original module checksums are in `src/visuals/SOURCE-MANIFEST.json`. The small wrapper integration changes are listed in `docs/visual-source-verification.json`; rendering algorithms are preserved.
