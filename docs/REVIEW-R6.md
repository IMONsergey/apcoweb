# R6 — quiet language changes and menu flags

Owner feedback replaces the R5 translated-text effect with a restrained dissolve in place, and adds flags to the language menu.

- Real inline text gently fades for 140 ms, the locale commits while that text is invisible, then the new wording appears over 300 ms. Target fonts load before the hidden handoff. Individual words use opacity only, with no blur, exit direction or stagger.
- The original inline nodes keep their font baselines, wrapping and highlighted phrases. There are no detached text copies and no simultaneous English/Russian wording.
- Changed container positions and dimensions use a short, shared FLIP morph while incoming text is faint. Adjacent blocks and header navigation adjust together; no individual words fly out. Target fonts load before the hidden locale commit. Menu focus preserves the viewport explicitly; pointer selection prevents the browser's default focus scroll, and smooth scrolling is suspended while the menu is open and during the short transition.
- Quick reversals continue from the current opacity. Returning to the displayed language cancels the queued alternate locale. Query, billing, expanded content and focus stay mounted; viewport coordinates are preserved at the hidden handoff. URL and saved preference record the latest selection immediately; document language/title change with its actual text. Reduced motion switches immediately.
- The English and Russian menu rows use the same circular 16 px SVG flags as the header button. Flags are decorative; language names and radio-menu keyboard behavior remain accessible.
- Pricing hover, price reels, trust-logo motion, approved prices, source assets and Figma remain the released behavior.

Regressions sample the actual opacity animations in both directions at 390 and 1440 px. They verify original line positions/wrapping during the outgoing fade, a hidden language handoff, no overlap between morphed heading/copy, rapid reversal/cancelled selection, retained form/scroll state, reduced motion and cleanup. Open-menu captures cover both flags at the existing responsive widths.

Local checks and production build are required. This workspace cannot launch the matching Playwright browsers; browser results must come from the existing three-engine GitHub Actions gate before merge. The main Pages workflow then checks the actual published URL. Verification and release identifiers will be recorded once those runs complete.
