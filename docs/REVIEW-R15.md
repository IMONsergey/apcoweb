# R15 — client-preview audit repairs

Owner request, 2026-10-07: fix the confirmed problems in the main audit (A01–A13) and the Dark/menu follow-up (A14–A17). This candidate starts from R14.5 `b075d22adfbbb8d90c0e124f4a05dcac90fd53b8`. It preserves the supplied effects, two-part buttons, prices/entitlements and intentionally light API illustration.

| Audit | Repair                                                                                                                         |
| ----- | ------------------------------------------------------------------------------------------------------------------------------ |
| A01   | Distinct color and font-size body tokens; unchanged typography between themes.                                                 |
| A02   | Explicit root-domain build command and version-matched handoff instructions.                                                   |
| A03   | Real 44 px mobile footer link targets; no overlapping pseudo-elements.                                                         |
| A04   | Correct group within the Appearance menu.                                                                                      |
| A05   | Native mobile theme radio inputs and browser keyboard behavior.                                                                |
| A06   | Visible EN included in the language control name; real closing DoubleButton with matching Try free search text in both themes. |
| A07   | Price typography responds to actual card width, including the 600 px boundary.                                                 |
| A08   | Removed the body minimum width that conflicted with a reserved scrollbar gutter.                                               |
| A09   | New state/keyboard/geometry/hit-target tests; complete WCAG 2.1 A tag and explicit label-name rule.                            |
| A10   | ESLint covers maintained JavaScript adapters and demos; only six protected original modules remain excluded.                   |
| A11   | Removed unreachable media rule; CSS ownership cleanup is recorded below.                                                       |
| A12   | Smaller 360/600 px responsive product/API posters; original full-size sources retained.                                        |
| A13   | README and content status now describe current English-only preview, theme modes and hosting targets.                          |
| A14   | Appearance opens into the menu; arrows/Home/End, Tab and Escape handle focus.                                                  |
| A15   | Navigation closes on desktop transition and restores focus to a visible header action.                                         |
| A16   | Fresh dialog sessions reset scroll; interrupted closing/reopening retains its current position.                                |
| A17   | Dark animation checks explicitly enable motion and require active nonzero timelines.                                           |

## CSS ownership

Pricing, its controls/dialogs and the footer now have component stylesheets. Their rules were extracted from the global historical files in the original cascade order, retaining selector specificity and responsive conditions. The desktop billing visibility rule now lives with its base component so the mobile dock remains the only visible billing control. Other section layouts and dark paint overrides keep their current order. This is a scoped consolidation, not a page-wide redesign.

## Verification

- Locked dependencies installed with `npm ci`; `check`, `format:check` and the Pages build pass. The six supplied original-source checksums are unchanged.
- Full local Chromium suite: **153/153**, zero failures, skips or retries. This includes 16 new regressions, all expanded accessibility states and normal-motion dark timeline samples across all five product scenes.
- Visual review at 390, 600, 768, 1024 and 1440 px in both themes: closing CTA, pricing, mobile menu and footer. The real closing button covers the raster CTA; existing decorative layers remain separate. These states have no JS errors or failed asset requests. Small viewports select the new smaller posters.
- Appearance keyboard coverage runs with both `reduce` and `no-preference`. Reduced motion uses a truly zero-duration CSS transition to prevent a tiny inherited visibility transition from blocking focus.
- Firefox: 152/153 passed on the first full run. The remaining check assumed an exact `19.6px` serialization; Firefox returned `19.5938px`. The corrected subpixel-tolerant assertion passes in both Chromium and Firefox; the exact theme-to-theme geometry assertion remains unchanged.
- Domain-root delivery build: 4/4 Chromium smoke cases, covering both themes at 390/1440 px, all image/font/script requests and reload persistence; no failed local requests or JS errors.
- WebKit could not run in this host (missing native libraries, followed by a native process crash during recovery). Safari verification remains pending; there is no new three-engine CI result.
- Publication is pending: GitHub's blob-upload connector repeatedly failed, and CLI push lacks credentials. The source is committed locally and the handoff includes the exact binary-capable source patch. The original preview URL and main were not updated. Draft PR #16 still identifies the prior candidate until publication succeeds.

The site remains a preview: noindex, illustrative content, disabled upcoming languages and external product destinations are intentional. Routing review decisions are listed in CONTENT-STATUS.md. This work does not authorize merging or updating main.
