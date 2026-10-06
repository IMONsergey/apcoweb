# R11 — desktop scenes fit the usable viewport

Owner request, 2026-10-06: desktop sections exceed a 16:9 screen, especially when browser controls and Windows display scaling reduce the available height. Prioritize “One query, step by step.” and “For security researchers and teams.”

## Behavior

- At desktop widths from 1200 px, composition responds to the actual CSS viewport height in short windows up to 1100 px and wider windows with at least an 8:5 aspect ratio. This also covers 2560×1320 usable viewports. Tall, narrow windows and the existing phone/tablet composition retain their natural layouts.
- The carousel heading flows inline, its introduction and controls use less space, and the cards devote their available height to the original interface illustrations. The section fits below a 96 px navigation allowance, with an 800 px ceiling to avoid excessive blank space on full HD. Text supplies the intrinsic minimum; below 600 px height, the carousel explicitly returns to normal document flow in all engines.
- Audience cards use shorter vertical spacing, naturally wrapping horizontal actions and wider text columns. Decorative contours retain their original rendering and clipped placement. Main body text remains at least 18 px and action targets remain at least 44 px high. Russian title sizes also account for available width, including the 1200 px desktop boundary.
- The data scene, API frame and closing mockup respond to viewport height. Numeric values retain their established readable sizes; the prepared interface images keep their original aspect ratios. The opening hero loses excess vertical spacing, allowing the full HD search to appear in its natural position without an unnecessary lift. When the search needs a lift, its existing smooth settling and state preservation remain.
- Current-language content still determines native layout. No alternate-language measurement, maximum locale reservation, additional runtime observer or animation library is introduced.

## Verification

Runtime/test source: `84335d669eed22b1ee9ab4f263117416b5819ba9`, based on the released R10 main `92badd28bb66661241f53b63043a76a72d74cd47`. Locked install, supplied-engine checksums, lint, TypeScript, formatting and clean build pass. All six changed runtime/test files and all 14 JS/CSS files plus index.html are byte-identical between the local build and the tested isolated Mac preview.

The new scenarios cover 1200×1000, 1280×600, 1536×740, 1920×950 and 2560×1320 in EN/RU, full scene bounds below the header, readable text, action targets, carousel bounds, resize/language state, and the 1280×480 natural-flow fallback. The supplemental three-engine run also includes existing search entrance and six-width natural-language checks: **45/45 pass**, with no failures, skips or retries. The full Chromium result and exact source/build provenance are in [qa-r11-summary.json](qa-r11-summary.json); matching-browser CI and final Pages verification are recorded in the release pull request.

Twenty-two normal-motion EN/RU viewport reviews span 390–2560 px and 600–1320 px height, with no runtime errors or page horizontal overflow. Four inspected captures and the complete geometry record are in [screenshots/r11/](screenshots/r11/). At 1536×740, the carousel falls from approximately 1209 to 644 px, and the audience section from 972 to 453 px in English / 443 px in Russian. The API, data and closing scenes also fit the available desktop reading frame.

Browser automation runs on macOS and subsequently Linux CI. The available CSS viewport models lost browser height and display scaling; this does not claim a physical Windows device check. Long pricing/FAQ content and narrow mobile reading flows remain naturally scrollable. Preserve R10's complete painted-background entrance, eager contours, search behavior, centered free hint, rounded API frame and menu motion. Figma, original engines, source artwork, copy, prices, billing and entitlements are unchanged.
