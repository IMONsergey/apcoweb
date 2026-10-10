# Shared site grid

## Intent

Header, page sections and footer use the same horizontal rails on every route. The previous 1760 px site container and 1240 px internal-page container created visible shifts between navigation, page content and footer. A single maximum of 1440 px gives interactive content room without stretching reading columns across large desktop displays.

## Layout contract

Defined in `src/styles/tokens.css`:

| Token            | Purpose                                                                                                                                                              |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--layout-max`   | 1440 px maximum content width across the entire site                                                                                                                 |
| `--gutter`       | Existing responsive page-edge padding: 16–24 px on small phones, 32 px on tablets, 40 px on standard desktops; larger displays are constrained by the shared maximum |
| `--layout-gap`   | Structural column gap, fluid from 24 to 40 px                                                                                                                        |
| `--layout-half`  | Equal halves, corresponding to 6 / 6 columns                                                                                                                         |
| `--layout-aside` | Narrow explanation beside larger content, corresponding to 4 / 8 columns                                                                                             |

The twelve-column relationship does not require every component to render twelve DOM columns. Two- and three-column editorial compositions derive from the same rails and gutter. Product controls, card padding, form field spacing and compact data grids retain their own component spacing.

- `.container` is the single page-width owner. Internal pages no longer override it.
- Main-page search/data explanation, API and team CTA share equal-column alignment.
- Internal hero, editorial headings, cases, evidence notes and closing blocks use the half layout.
- Reading rows, API setup, usage and desktop Contact use the aside layout. Numbered reading rows keep their body on the same rail as unnumbered rows.
- At tablet widths, text columns use equal halves where needed; Contact moves to a full-width form at 1000 px so field values remain readable.
- At phone widths, sections stack. Token packages become full width. Existing horizontal scrolling remains confined to wide comparison tables and code samples.
- The homepage carousel calculates both its start offset and three-card width from `--layout-max`; its next-card preview can intentionally extend beyond the content rail.
- Paragraphs retain local readable measures (48–65 ch for principal copy). Hero artwork is capped at 600 px inside its column and never forces a wider page.

## Verification

`tests/site-grid.spec.ts` checks all thirteen routes at 320, 768, 1440, 1920 and 2560 px: container edges match the header, content width does not exceed the maximum and pages do not overflow horizontally. Separate checks cover carousel rail alignment and the width of Contact fields at 768 and 1000 px.

Also verified internal-page hierarchy, API table fit, Monitoring stages, original GSAP scenes, continuous panel-height animation and native/fallback/reduced-motion navigation. Reviewed desktop and tablet screenshots of the home page and representative internal pages, including the corrected Contact form.
