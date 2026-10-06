# R9 visual evidence

Actual local production-preview captures after removing maximum locale dimensions. English and Russian heroes at 390 and 1920 px were visually inspected. The 16-case geometry record covers both languages at 320, 390, 768, 1199, 1200, 1440, 1920 and 2560 px, with no measured text/header overflow or runtime errors.

Capture browser: cached macOS Chromium 151.0.7922.34. This is supplemental visual evidence; matching locked Chromium/Firefox/WebKit CI remains the release gate. Screenshots retain source resolution and are not edited. FAQ/input/billing/motion behavior is verified by the browser suite.

At 1920 px, the English primary hero action is 184.828125 px and its Russian translation is 230.4375 px. The former R8 English reservation was 231 px. English lead height is now 60.4375 px; Russian lead is 90.65625 px. Both follow displayed content, with no generated inline minimum sizes.
