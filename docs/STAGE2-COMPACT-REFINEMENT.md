# Compact refinement — 9 October 2026

This pass responds to the nine annotated screenshots supplied at 15:46–15:53. It supersedes the oversized inner-page film decisions in `STAGE2-MOTION-RESTORATION.md`; the original GSAP rendering engines remain unchanged.

## Screenshot mapping

1. Search example: keep working host/service selection but reduce typography, row heights and padding. Remove the duplicate selected-host heading from the home fragment. The desktop results panel is about 291 px high; the whole search composition is capped at 1100 px wide.
2. Searchable data: replace the repeated full results screen with five focused details (identity, domain tree, service table, technology stack, version verification).
3. Data & Methodology CTA: use the canonical `DoubleButton`, including its second arrow shape.
4. Use cases: three equal columns with separate generated illustrations above each title; no oversized investigation ledgers. One column on narrow screens.
5. Remove marketing overlines from page/section markup. Navigation group names and theme-control labels remain, since they identify controls rather than duplicate headings.
6. Capabilities: five distinct, compact examples. Search starting points, service filter, selected-host fragment, saved collection and code response each have their own layout. Preserve measured-height transitions.
7. Business pricing: Choose Business and Talk to Us share one horizontal action row; all plan cards have one action baseline.
8. Team CTA: use the same fixed teal surface as the home API section, generous separation before FAQ, canonical double buttons and a new SVG/GSAP signal-convergence composition. Playback pauses offscreen/in hidden tabs and respects reduced motion.
9. Teams and other inner pages: remove repeated full GSAP films and duplicate sample panels. Search has one compact interactive record; Teams has its own four-stage handoff; each use case has a different scoped technical fragment. Data & Methodology has three evidence levels. Monitoring uses snapshot comparison and a small change-context record. The developer page leads directly with its copyable request/response tool. Shared heroes/editorial blocks use a tighter scale and spacing.

## Assets

Three separate imagegen calls produced the Bug Bounty, Vulnerability Research and OSINT illustrations. They are project-owned WebP assets in `public/assets/use-cases/`, registered by the asset integrity gate. The original generation outputs remain intact outside the repository; WebP conversion changes encoding only.

Prompt direction: landscape 3:2, airy technical minimalism, cool off-white, pale gray and muted teal, fine details, frosted glass and matte accents; no words, logos, people, UI screenshots or decorative clutter. Subjects: authorised scope around infrastructure; inspection through software layers; a trail of connected technical indicators.

## Motion and scope

The home carousel retains all five original GSAP films and the home API retains the original API film. Removed repetitions are presentation changes, not removal of those engines. All changes to natural content height use `MorphPanel`; changing the home example no longer remounts that panel. Hover/focus/manual pause and reduced-motion behavior remain supported.

This pass does not establish live API contracts, commercial entitlements or complete parity with Sevil's source documents. The previous private content audit still identifies those dependencies. All four approved use-case explanatory sections now render, including the two previously omitted by `slice(2)`.

## Verification

- Existing functional and motion coverage updated to the intentional presentation changes.
- New layout regression checks: compact results at 390/1440/1920, three-column cards, loaded unique images, canonical CTA, horizontal Business actions, separation from FAQ and distinct inner-page visuals.
- Accessibility, runtime/assets and responsive coverage across all 13 routes and both themes.
- Real unmasked desktop/mobile captures; original engine hashes and bundle limits remain enforced.

The work stays in draft PR #28; no main merge or public release. The last Vercel preview from the previous pass is stale for this refinement. Its daily deployment quota was exhausted; do not present that URL as this version.

## Follow-up: seven screenshots at 16:28–16:34

- Separate the search input from the example area; add a restrained rotating gradient border and a static reduced-motion state. Keep the input keyboard/focus treatment and avoid pseudo-element overflow.
- Increase desktop research-marquee typography to 18–22 px.
- Replace the repeated left-index/right-table Searchable layout with five directly visible observation cards. Selection changes the explanatory connection, is keyboard operable, and uses measured-height transitions. Its Methodology CTA uses the primary double button.
- Replace the underlined carousel footer action with the canonical double button and align its explanatory copy.
- Preserve the five capability selectors; arrange their content as a bento: task, interactive example and two contextual notes.
- Increase use-case section padding to 88–128 px without enlarging images or cards.
- Give the team CTA more vertical room. Replace the SVG chip/routes with a GSAP-driven Canvas field of three projected, undulating observation planes and travelling signals. Pointer response is restrained; the loop is periodic, sleeps offscreen/in hidden tabs and becomes a still composition with reduced motion.

Validation: 22 targeted interaction/layout/motion checks passed locally; desktop/mobile light/dark screenshots and accessibility checks passed, with no overflow at eight widths from 320 to 2560 and no browser runtime errors. Source integrity, lint, TypeScript and production build passed. User review is on the Mac's local port 4178; no new public release.

## Follow-up: six screenshots at 16:46–16:50

- Replace the multi-ring search treatment with one mint/cyan gradient. Focus intensifies the same contour instead of adding the legacy solid outline; its animation stops with reduced motion.
- Restore the compact left-hand data selector and right-hand example. Each selector has an explicit selected indicator and supports keyboard activation; mobile uses a compact two-column selector group.
- Crossfade the outgoing and incoming capability/data examples over 480 ms while measuring height over 560 ms. The temporary outgoing copy is inert, hidden from assistive technology, stripped of IDs and removed after the animation.
- Preload the selected route before changing the page. Use native View Transitions with a stable header where supported, a restrained opacity fallback elsewhere, and immediate updates with reduced motion. Preserve hash navigation, focus and history scroll restoration. Superseded navigation cannot overwrite the latest choice.
- Make Business pricing's Talk to Us action use the existing accent/on-action theme tokens and keep both actions horizontal.
- Enlarge the team animation and reduce its three planes from 495 to 189 points, removing the secondary particle outlines. Preserve the layered observation concept and offscreen/reduced-motion controls.

Validation: the 66 targeted layout, functional, route and motion scenarios passed across focused runs, including delayed route chunks, back/forward during transitions, cancelled navigation and overlapping capability content. Desktop/mobile screenshots checked in both themes; responsive overflow remained zero at eight widths. Full-page accessibility checks exposed one accent-button contrast override, which was fixed and rechecked in both themes. Search focus now has no solid CSS outline and retains its gradient. Original visual-module hashes, lint, TypeScript, asset checks and production bundle budgets remain enforced. Local Mac review remains on port 4178.

## Follow-up: seven screenshots at 16:52–17:07

1. Search example — removed the playback caption/progress strip from the home results. The underlying GSAP cursor/evidence sequence still runs; status elements are now optional rather than a playback dependency.
2. Search caption — centered the synthetic-example notice and link, with balanced mobile wrapping.
3. Globe cards — centered labels, values and supporting text in all six observation cards, keeping the globe and existing composition.
4. Sign In — restored the canonical gray surface and full text contrast. The preview still requires the configured, verified sign-in URL before enabling navigation.
5. Search contour — replaced mint/cyan stops with neutral-to-brand-teal tones. A broad highlight travels slowly along the same border in idle/focus states; no extra solid focus ring.
6. Searchable data — enclosed the right-hand example and CTA in one panel aligned to the full left selector height. Replaced text crossfades with sequential masked replacement (160 ms exit, 300 ms reveal), preserving container-height interpolation. Intermediate-frame review rejected an initial simultaneous wipe because it still showed portions of two different examples. Keyboard focus now underlines only the selector title, not its supporting description.
7. Team animation — one continuous wave of round points, larger in the section, with depth/crest brightness and no connecting grid or particle outlines. Keeps offscreen, hidden-tab and reduced-motion behavior.

Additional audit: reviewed fresh desktop/mobile captures of all 12 inner routes and all changed home sections, both home themes, focused search and intermediate content-transition frames. Corrected a dangling `aria-describedby` reference in non-compact product examples. No horizontal overflow at eight home widths or at either audited inner-page width; no runtime errors, broken loaded images or unnamed main-content links. Automated accessibility checks found no violations in the four home theme/viewport cases and all 12 mobile inner routes; this is not a full accessibility certification.

Validation: 60 targeted Chromium scenarios passed. After tightening sequential replacement, all 13 route/motion scenarios passed again, including a frame-level assertion that two text states are never visible together. Source integrity, asset checks, formatting, lint, TypeScript and production build passed. Screenshots and machine-readable audit results are retained in the working audit folder `/tmp/apco-polish/`; the reviewable deliverable remains the locally running site on the Mac, port 4178. No merge to main or public deployment.

## Follow-up: four screenshots at 17:21–17:23

1. Search — stronger brand-teal gradient with a diffuse idle halo. Focus reduces the blur and strengthens the same contour; reduced motion stops its travel. The blurred wrapper surrounds a masked border so the filter produces a genuine soft glow instead of a hard outer ring.
2. Data selectors — every item now has a white/themed card surface and border before selection; the selected tint and title indicator remain distinct.
3. Shared panel motion — removed sequential masks, outgoing DOM copies and text-opacity effects throughout all MorphPanel consumers (data, capabilities, API, monitoring, investigations and team scenarios). Keep one fully opaque content state. Animate only measured container height over 480 ms with sine easing, including interrupted changes. This supersedes the two preceding content-transition approaches. Route preloading/history behavior and original product films remain intact.
4. Team wave — removed pointer tracking, pointer listeners and pointer-driven rotation. The continuous point wave still animates autonomously, pauses outside the viewport/in hidden tabs, and respects reduced motion.

Validation: 59 of the initial 61 focused scenarios passed; the two mobile height-velocity failures were resolved by adjusting height easing, then all 17 relevant polish, route and motion scenarios passed again without weakening the velocity assertions. New frame-level coverage verifies visible, unmasked, nonduplicated content for all five capability states. Fresh search captures checked idle/focused states at 390 and 1440 in both themes; four home accessibility scans had no violations, eight responsive widths had no overflow, and no browser errors were recorded. Build and source-integrity checks remain enforced. Review stays on the Mac's local port 4178, with no main merge or public deployment.
