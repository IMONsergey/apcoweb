# R3 — contextual billing and interaction repairs

## Responsive pricing control

At widths up to 1199px, the inline billing selector is removed. A compact bottom panel appears while pricing options intersect the readable viewport. The range includes the heading, cards and comparison action, but excludes the organization contact banner and FAQ. At 1200px and above the desktop selector remains in place.

The panel contains the established 20% annual offer and native period radios. One React state updates cards, comparison and selected-plan details. There is no new price calculation or charge. The panel does not lock scrolling, create a backdrop or autofocus. It respects safe-area insets and hides for dialogs, editable focus, pinch zoom or a hidden document. Hidden controls are inert. The panel is visually fixed but remains before the cards in natural reading/keyboard order. Focused plan actions are scrolled above it when necessary.

## Corrected issues

- Rapid carousel clicks previously collapsed to a single step. Requested stops now accumulate independently of animation progress. Touch/wheel interactions take over without scroll interception; Home and End are supported.
- Carousel dimensions use actual container width, avoiding scrollbar-related almost-duplicate final positions.
- Visible final CTA buttons and click regions did not align on several prepared screen assets. Hit regions now follow the measured button coordinates at all eight source breakpoints, with a minimum 44px target. Image files are unchanged.
- Plan details were cleared before the closing animation ended. Selection data remains mounted during the exit.
- The longest metric could exceed its card at 600px. A two-column grid covers 600–699px without shrinking the established numeric style.
- The stopped globe could lose its WebGL drawing buffer. Reduced motion uses the supplied persistent Canvas2D renderer; ordinary motion retains automatic rendering. The original renderer source is untouched.
- Search input text is at least 16px through tablet widths, without disabling zoom. Query submission is trimmed, prevents duplicates while navigating, and resets on pageshow after Back/Forward.
- FAQ height animations settle on resize. Mobile heading phrases balance independently without changing their words.

## Action feedback

Search has a clear-input action that retains focus, a native Search keyboard hint and a busy indicator during actual navigation. Menu links support arrow keys/Home/End and Escape. Direction-correct carousel arrow feedback, subtle card-media hover motion, plan focus feedback and reversible dock transitions respect reduced-motion preferences. Split buttons, source artwork, original six renderer/data modules and the removed search-background band are preserved.

## Evidence and limits

The new regression suites are billing-dock.spec.ts and ux-regressions.spec.ts. Together with the existing suites they define 53 checks per browser (159 across Chromium, Firefox and WebKit). GitHub Actions validates the production build and attaches browser-evidence with JSON results, screenshots and traces. The latest completed run is authoritative; do not treat an old local pass count as the current release result.

Editable-focus and VisualViewport fixtures are not physical iOS/Android keyboard certification. On macOS WebKit, keyboard traversal respects the system's full-keyboard-navigation policy. No authenticated API or payment transaction is attempted. Figma and original images remain unchanged.
