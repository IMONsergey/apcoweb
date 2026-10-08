# Architecture

## Application composition

`src/main.tsx` mounts the app inside the theme and locale providers. `src/App.tsx` defines the section order. Sections own their content and component-specific styling; common controls live in `src/components/ui/`.

`src/content/site.ts` provides links, navigation, metrics, plan data and walkthrough metadata. `src/content/pricing.ts` contains billing calculations. `src/content/assets.ts` resolves URLs relative to Vite's base path.

Theme state is managed by `src/theme/ThemeProvider.tsx` with the `system`, `light` and `dark` modes. The initial theme is set in `index.html` before React mounts to avoid a flash of the wrong theme. English is the only selectable language currently; the locale provider retains the non-live translation infrastructure.

## Styling

CSS is intentionally lightweight and does not use a CSS-in-JS runtime. Global imports in `src/main.tsx` are ordered: font declarations, tokens, base/feature styles, layout adjustments, section styles, and theme overrides last. Keep that order when modifying the cascade.

- `tokens.css`: typography, spacing and semantic color variables.
- `site.css` and feature files: base layout and interaction styles.
- `mobile-layout.css`, `interface-layout.css` and `search-composition.css`: responsive composition and UI geometry.
- `theme.css` and `theme-demos.css`: theme-dependent surfaces, including embedded demo styling.

## Visual effects

`src/components/visuals/` controls when demos are mounted and communicates readiness. `src/visuals/` keeps effect controllers and adapters isolated from the document content. Rendering modules own their canvas/SVG surfaces, not navigation or page state. See [Visual components](VISUALS.md).

## Site boundaries

The local site is presentation-only. The search field submits to the external product, and account/plan buttons navigate to the APCOSYS service. There is no server-side authentication, checkout, live metric feed or product API in this repository.

## Editing guidelines

Prefer modifying content in `src/content/` and theme tokens rather than repeating literals inside components. Keep controlled UI as real semantic HTML. Preserve keyboard access, reduced-motion behavior, theme parity and responsive content wrapping. Run `npm run check`, `npm run build` and Playwright tests before merging.
