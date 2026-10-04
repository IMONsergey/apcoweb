# Local validation results

Final run: 60/60 passed, zero failed, skipped or flaky tests.

- Chromium, Firefox and WebKit: 20 tests each.
- Eleven viewport widths from 320 to 1920 px.
- Lint, TypeScript and production build passed.
- Automated axe scans at 1440 and 390 px found no violations in the configured WCAG A/AA checks. This is not a conformance certification.
- Supplied rendering algorithms match the archive checksums.
- npm audit --omit=dev: no reported vulnerabilities at the time of this run.

The test source is in tests/landing.spec.ts, numeric results in qa-summary.json, and representative captures in screenshots/.

A WebKit focus-restoration issue found during the first pass was fixed and the full suite rerun.

Final service integration (billing, account creation and production API) is out of this frontend preview; search handoff is tested with an intercepted destination.
