# R5 — language disclosure and motion

Owner-requested continuation of released R4. The two supplied screenshots establish the language-menu treatment: the existing pale-gray navigation panel with rounded corners and white highlighted rows, rather than an operating-system select popup.

## Changes

- Language selection uses native buttons in an EN/RU radio menu. It shares the header's open-disclosure state, closes on outside interaction or Escape, supports arrow keys/Home/End and returns focus to its trigger after selection. On phones it remains the same bounded dropdown, without opening a native picker or keyboard.
- Pricing uses the same rounded hover/focus shape as the other navigation triggers.
- Visible translated text crossfades with a small directional outgoing movement and soft blur. Inline text boundaries preserve natural wrapping. The original React controls remain mounted; outgoing text copies are inert, hidden from assistive technology and removed after the transition. Rapid changes cancel the previous animation; reduced motion changes language immediately.
- Monthly-equivalent prices use individual vertical digit reels. Decreases roll downward and increases upward, with a short stagger between places. Interrupted switches start from the current visible position and finish on the latest amount. The accessible final currency text updates immediately. Original price calculations and annual totals are unchanged.
- Trust logos continue moving while hovered. Keyboard-focus pause, visibility lifecycle and reduced-motion manual scrolling are preserved. Phone logo images shrink from 112 × 30 px to 96 × 26 px; their frames shrink proportionally.

## Verification

Locked install, original visual-engine checksums, lint, TypeScript, formatting and production build are checked locally. This execution environment returns an HTML response instead of the Playwright browser archives, so local browser launch is unavailable; this is not recorded as a browser pass. The existing cross-browser review workflow now also runs on pull requests. Its matching Chromium/Firefox/WebKit suite and retained R5 screenshots are the release gate, followed by main Pages deployment.

R5 regressions exercise menu semantics/appearance, keyboard and phone bounds, normal/reduced motion, rapid locale/billing changes, final visible digits and continuous marquee hover. Screenshots include open EN/RU menus at 320/390/768/1200/1440 and monthly/annual plan grids at 390/1440, as well as animation midpoints.

Figma, supplied source images and rendering/data engines, approved layout, content, prices and entitlements remain protected. This remains the existing noindex review site.
