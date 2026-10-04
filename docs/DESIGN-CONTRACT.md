# Design contract

## Preserve

- Instrument Sans for UI/editorial content; IBM Plex Mono for data and technical labels.
- Light surfaces, the turquoise identity, generous typography and the original split buttons.
- The search composition "One query. A closer look." with its original embedded interface, progressive blur and haze. The readable search input is a real HTML form positioned on that scene.
- Prepared `saas mobile` Search/Start images. The final insertion is an original screen with a single accessible CTA link on the visible button. It is an illustration, not a fake live dashboard.
- Original Figma illustrations for Query/Results/Host and API. Existing crop transforms are baked into appropriately sized WebP assets; images are never stretched.

## Responsive layout

- Fluid content up to 1760 px; normal desktop gutters 40 px, wide-screen gutters 48–80 px.
- Tablet gutters 32 px. Phone gutters 24 / 20 / 16 px depending on available width.
- Desktop carousel: three visible cards; tablet: two; phone: one with a next-card hint. Counter reports positions, not total item count. No autoplay or scroll hijacking.
- Plans: 4 / 2 / 1 columns. Questions expand naturally with text. Navigation becomes a scrollable native modal drawer.
- Typography and spacing use CSS media queries and flexible containers; long copy must not be clipped.

## Sources

- Desktop: https://www.figma.com/design/lLMSuy0RrCiPhg873xpVUY/Apcosys?node-id=552-319
- SaaS source page: https://www.figma.com/design/lLMSuy0RrCiPhg873xpVUY/Apcosys?node-id=574-8377

## Implementation improvements

The Figma frames were not treated as immutable fixed pixel coordinates. Browser-specific overflow, image sizing and text wrapping are corrected in CSS while retaining the composition. White text uses the darker existing action turquoise when necessary for contrast; decorative brand color remains separate.
