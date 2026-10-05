# Design contract

## Preserve

- Instrument Sans for UI/editorial content; IBM Plex Mono for data and technical labels.
- Light surfaces, the turquoise identity, generous typography and the original split buttons.
- The search composition "One query. A closer look." with its original embedded interface, progressive blur and haze. The readable search input is a real HTML form positioned on that scene.
- Prepared `saas mobile` Start images remain unchanged. R4 permits a compact phone composition over the Start asset and translated editorial overlays; the CTA is always a real single accessible link. The upper search scene remains live React with the supplied background/point renderers, never a baked screenshot.
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

## R4 extension

At <=599 px, preserve the compact search wording, 16 px input and hidden decorative filters; both audience actions use the existing split-button construction. The mobile data order is IPv4/IPv6, Domains left, one-card-height opening over the full-width globe, Detected Products right, CVEs/Protocols, then actions. Footer headings use presentation-only uppercase. The EN/RU selector preserves billing, query and fragment state, and URL language overrides storage. REVIEW-R4.md records the working-localization boundary and release QA.
