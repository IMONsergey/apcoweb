# QA results — R3 contextual billing

## Release candidate

Source commit: `78752537ba55e5c411e6604a40671f3714911cde`.

[Cross-browser run](https://github.com/IMONsergey/apcoweb/actions/runs/37264232626): **165/165 passed**, 55 each in Chromium, Firefox and WebKit. No skipped, flaky or unexpected results. The run installed the browser revisions matching Playwright 1.63.0 in Ubuntu 24.04 and tested the production build.

`npm ci`, original-six-engine verification, ESLint, TypeScript, Prettier and the production build passed. Old, interrupted local runs and cached browser revisions are not counted as a release pass.

## Coverage

Layout/assets: 1920, 1600, 1440, 1366, 1280, 1024, 768, 430, 390, 360 and 320 px. Contextual billing: 320, 390, 430, 768, 1024 and 1199 px, the 1200 px desktop boundary and 844 × 390 landscape. Metric padding is additionally checked at 599/600/620/699/700/768/1199/1200 px.

The dock has one shared billing state, no page scroll lock or autofocus, no inline duplicate below 1200 px, and no layout jump when switching. Tests cover entering/leaving pricing, reverse scrolling during its animation, leaving for the contact banner/FAQ, dialogs and focus restoration, text-input/keyboard/zoom suppression, and native radio Tab/arrow behavior. Hidden controls are inert.

Other regressions cover rapid carousel input and Home/End, scrollbar-aware card sizing, query clearing and trimmed submission, restored submit feedback after browser history navigation, exact closing CTA hit areas, persistent reduced-motion globe rendering, flexible FAQ, and numeric fit. Existing background, marquee, calculation, asset, accessibility and interaction checks remain enabled.

## Visual review and publication

`docs/screenshots/r3/` contains release-review captures. The existing Actions workflow validates and deploys main. Post-publication checks are run separately against the actual Pages URL using `APCO_BASE_URL`, and are recorded in the release report.

These checks are not a claim that all possible bugs are eliminated or every physical iOS/Android device was tested. Keyboard/zoom fixtures are controlled browser tests. Product authentication and paid transactions were not exercised. Figma, content entitlements and the six supplied rendering/data engines are unchanged.
