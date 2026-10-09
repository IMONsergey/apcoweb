# Stage 2 — motion restoration

The previous pass replaced the original GSAP product films with static excerpts. That weakened the approved R21 experience. This pass restores the actual supplied engines and develops the inner pages around them.

## Original scenes

- Home API again renders `ApiIllustration` / `api-developer-demo`: parameters, authorization, cURL, sending, response lines and endpoint navigation.
- All five carousel scenes again render `StepIllustration`: query typing, filtering results, host chart/services, technical evidence and suggested queries.
- Search & Investigation and Security Teams use those same five films as their primary Workbench visual. Scene selection and explanatory text remain keyboard accessible.
- Bug Bounty uses the results film, Vulnerability Research uses technical evidence, OSINT uses the host film, alongside the distinct investigation narrative.
- Developers now has a large API film before the copyable Request/Response example. Animated demonstration and functional code reference serve different purposes.
- The six original rendering/data module hashes remain unchanged. No video or Lottie replaces their DOM/SVG/GSAP implementation.

## New motion and interaction

- The responsive evidence component follows query, selected host, selected service and response with a restrained cursor, focus treatment, typing and progress. Automatic playback does not change user selections or perform requests.
- Host and service controls are real. Selecting port 80 displays the illustrative redirect; selecting port 22 displays SSH. The response remains readable during manual interaction.
- Playback pauses outside the viewport, in a hidden document, on pointer/focus interaction and through an explicit pause control. Reduced motion presents a complete static state.
- Monitoring gains a drawn service-comparison trace with labelled earlier/later snapshots. This is a concept comparison, not invented live telemetry.
- Inner-page introductions, editorial rows, use-case stages and team workflow receive restrained once-only viewport entrances, with no scroll hijacking.

## Layout motion

`MorphPanel` measures a natural inner layout and animates the outer height for 480 ms with `power3.inOut`. React updates freeze the previous height in a layout effect before paint; ResizeObserver covers subsequent content/font changes. Rapid updates start from the current visible height. Width changes and reduced motion settle immediately. Nested panels follow their already-animated child rather than applying a second easing curve.

Applied to evidence modes and host/service records, capabilities/filtering, Monitoring, API Request/Response, Workbench films and captions. Existing native FAQ height animation remains intact. Incoming content uses a short 5 px fade/translation; final inline transforms are cleared.

## Verification

`tests/stage2-motion.spec.ts` runs with real motion enabled and verifies advancing/paused API timelines, all five animated films, frame-by-frame mobile/desktop height interpolation, interrupted transitions, matching service responses and reduced-motion behavior. The existing 13-page/two-theme accessibility, responsive and visual suites remain required. The delivery note records actual final run results.

Draft PR #28 only. No main merge or public release.
