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
