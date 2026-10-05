# R6 — quiet language changes

Owner feedback replaces the R5 translated-text effect with a restrained dissolve in place.

- No translation, blur, directional exit or stagger between strings.
- Outgoing copies align their actual text-line bounds to the original inline text. The former block-line positioning raised the large English heading by about 11 px at creation in the live browser, even before its exit animation; this baseline jump is removed.
- A shared 440 ms opacity timeline gently fades the old language for 140 ms, then reveals the new language for 300 ms. The handoff at zero opacity prevents English and Russian words from appearing on top of each other, including when their line wrapping differs.
- Real React controls, query, billing, expanded content and focus stay mounted. Language, metadata and saved preference still update immediately. Existing viewport preservation and interruptible cleanup are retained. Reduced motion switches immediately.
- The custom language menu, navigation hover, price reels and continuous trust-logo marquee remain the released R5 behavior.

Verification covers the app's actual outgoing/incoming animation frames in both directions at 390 and 1440 px: each copied text line matches the original position and wrapping, no position change, no blur/transform, no stagger or visible overlap at the handoff, and complete cleanup. The existing rapid-selection, preserved-query, scroll-position and reduced-motion regressions continue to apply.

Local checks and production build are required. This workspace cannot launch the matching Playwright browsers; browser results must come from the existing three-engine GitHub Actions gate before merge. The main Pages workflow then checks the actual published URL. Verification and release identifiers will be recorded once those runs complete.
