# R3 — contextual billing and interaction QA

## Owner request

Find technical and visual bugs; add deliberate feedback to user actions. On responsive layouts, replace the static billing control with a small panel from the bottom, only while the visitor is viewing the pricing block. Preserve the visual identity, original motion modules, split buttons and the corrected search background.

## Billing behavior

- At 1199px and below, the inline billing control is removed from layout and the accessibility tree. At 1200px and above the desktop control is unchanged.
- The non-modal dock appears while the pricing options intersect the readable viewport. The observed range contains the heading, plan cards and comparison action, not the organization contact banner or FAQ.
- It shows the existing 20% offer and native monthly/annual radios. The same React state drives cards, the comparison table, plan details and the desktop control.
- There is no new backdrop, page scroll lock, automatic focus or extra pricing calculation. Existing approved arithmetic is unchanged.
- Controls remain before the cards in natural reading/Tab order. Offscreen controls are inert. The dock hides for dialogs, editable input/keyboard focus, pinch zoom and a hidden document, then returns when appropriate.
- The panel measures 70–75px at the tested phone widths, respects safe-area insets, and does not change document layout when appearing or switching.
- Focused plan actions are scrolled above the dock when necessary. Native scrolling and zoom remain available.

## Bugs corrected

- Four rapid Next clicks previously ended at carousel position 2/5. Requested stops now accumulate independently of animation progress. Home and End are supported; native touch/wheel scrolling cancels the pending click target.
- Carousel card widths now use their actual CSS container rather than scrollbar-inclusive viewport width, preventing near-duplicate final positions on classic-scrollbar layouts.
- Final CTA click regions did not match the visible buttons in several prepared assets (particularly 320, 768 and 1024). Regions are now derived from the visible source button positions; images and links are unchanged. The entire visible button is a single target of at least 44px height.
- The selected-plan dialog cleared its content at the start of its exit animation. Selection data now remains mounted through closing.
- At 600px the longest metric extended beyond its card border. The data grid uses two columns from 600 through 699 without shrinking the established numeric style.
- Stopped WebGL content could disappear from reduced-motion captures. The reduced-motion globe now uses the supplied persistent Canvas2D path; normal animation still uses auto rendering. No renderer source file was changed.
- Small search input text risked automatic mobile/tablet input zoom. Editable search text is now at least 16px through 1199px; page zoom is not disabled.
- FAQ height animations finish cleanly if the viewport is resized during the transition.

- The dock could fail to reappear after a desktop-to-phone resize in Firefox. A coalesced geometry check now handles scroll, resize and visual viewport changes instead of depending on a stale intersection callback.
- Applying scroll clearance to the fixed radios made keyboard focus move the page away from pricing in WebKit. Clearance now belongs only to document-flow plan actions; native radio keyboard behavior is preserved.

## Deliberate feedback

- Search: native Search keyboard hint, clear-input action with focus retained, trimmed query submission, real navigation-in-progress feedback and pageshow recovery after Back/Forward.
- Navigation: arrow-key/Home/End navigation within open disclosures, Escape returning to its trigger.
- Carousel: direction-correct arrow feedback and subtle media lift on pointer hover, without resizing artwork or moving the page.
- Plans: focus/CTA hover feedback; period changes update all price representations without jumping the page.
- Dock: reversible entrance/exit and unchanged panel dimensions across periods. Reduced-motion preference disables nonessential transitions.

## Verification

Tests live in billing-dock.spec.ts and ux-regressions.spec.ts, alongside the existing layout, accessibility, motion, pricing and search-background regressions. The latest final run is recorded in QA-RESULTS.md and qa-summary.json. Headless viewport, editable-focus and visual-viewport fixtures do not claim physical iOS/Android keyboard certification.

Figma, prices, entitlements, source images, original six rendering/data engines and the removed-background-band fix remain protected.
