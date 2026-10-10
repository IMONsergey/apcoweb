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
- Internal hero, paired work areas and closing blocks use the half layout. Editorial titles and introductions stack on the left rail; an optional illustration occupies the other half.
- API setup, usage and desktop Contact retain the equal-half central rail. Explanatory reading groups keep each title above its own paragraph, in two columns (three for three short items on large desktops). The 4 / 8 layout is reserved for the legal reading column and its contents sidebar.
- At tablet widths, text columns use equal halves where needed; Contact moves to a full-width form at 1000 px so field values remain readable.
- At phone widths, sections stack. Token packages become full width. Existing horizontal scrolling remains confined to wide comparison tables and code samples.
- The homepage carousel calculates both its start offset and three-card width from `--layout-max`; its next-card preview can intentionally extend beyond the content rail.
- Paragraphs retain local readable measures (48–65 ch for principal copy). Hero artwork is capped at 600 px inside its column and never forces a wider page.

## Verification

`tests/site-grid.spec.ts` checks all nineteen routes at 320, 768, 1440, 1920 and 2560 px: container edges match the header, content width does not exceed the maximum and pages do not overflow horizontally. Separate checks cover carousel rail alignment and the width of Contact fields at 768 and 1000 px.

Also verified internal-page hierarchy, API table fit, Monitoring stages, original GSAP scenes, continuous panel-height animation and native/fallback/reduced-motion navigation. Reviewed desktop and tablet screenshots of the home page and representative internal pages, including the corrected Contact form.

## Equal internal-page first blocks

All twelve internal routes share the same hero sizing in `inner-pages.css`; Pricing and Contact no longer override padding or artwork size.

- At 768 px and above, the total hero minimum is `clamp(560px, 44vw, 640px)`. Its grid subtracts the shared top/bottom padding, so copy and artwork are vertically centred within the same space. The largest current headline/description/action combination fits without changing type size.
- Below 768 px, the hero minimum is 760 px. Copy occupies the flexible first row and artwork sits in the second row, giving every route the same illustration position and lower boundary. Artwork is capped at 400 px to avoid an oversized image on wide phones.
- These are minimum block sizes, not clipped fixed heights. Text enlargement or future longer content can expand the hero naturally. No measuring JavaScript, hidden duplicate content, overflow clipping or route-specific height exceptions are used.
- Existing headings, copy, links, image aspect ratios, colours and page transitions are preserved.

`tests/inner-hero-layout.spec.ts` compares all twelve routes at twelve widths from 320 to 1920 px, including both sides of the 768/1000 px breakpoints. It checks equal hero height, equal artwork size, aligned next-section starts, containment and separation. Two additional tests enlarge hero text to 200% on phone and desktop to verify that the section grows and copy does not overlap the illustration. Representative short and long heroes are also reviewed visually on desktop and mobile.

## Earlier rail audit (superseded editorial composition)

An equal outer container was insufficient: introductions began halfway across the page, while body rows began one-third across it. Independent 32–64 px nested padding created further shifts. Marketing pages now use `--reading-columns` and `--reading-lead`, both derived from the common half grid.

- Heading descriptions, reading-row bodies, API code, usage explanations, the team workflow and desktop contact form start on the same central rail.
- Date, handoff, rate-limit and scanning explanations no longer add an extra horizontal inset. Their top rules group content without displacing text.
- Numbered mobile rows return the body to the page edge; numbers no longer reduce paragraph width.
- Parallel feature cards use natural subgrid rows so descriptions align after titles wrap. They become ordinary vertical reading groups on phones.
- Pricing comparison and token-package headings use the same editorial heading; packages fill the shared two-column grid. The desktop billing control aligns with the reading rail.
- Three-column comparisons, four plan choices and small product interfaces remain task-specific grids. These are bounded comparisons, not alternate page text rails.
- Contact stacks below 1001 px for usable fields. Legal documents retain their 760 px reading measure and separate sidebar layout.
- `reading-rails.spec.ts` measures actual paragraph positions across routes at 768, 1001, 1440 and 1920 px, plus wrapped card rows, mobile paragraphs and document reading position.

## Editorial readability revision

The earlier heading-left / introduction-right pattern was geometrically aligned but made reading fragmented and monotonous. `editorial-system.css` now owns internal content typography and grouping; `inner-pages.css` continues to own heroes and product demonstrations.

- Section headings and lead paragraphs share a left edge and read top to bottom. H2 uses 34–48 px on desktop; lead copy 19–22 px; body 18 px, 1.7 line height; notes 15 px. On phones body is 17 px and lead copy 18 px.
- Sections have 88–144 px between their content boundaries and a quiet rule on the shared page rails. No alternating page backgrounds.
- Grouped comparisons use one surface with equal 22–32 px insets and dividers. These intentional interior insets do not change the outer site grid.
- Reading rows are now coherent title-and-paragraph groups. The mobile paragraph remains aligned to its heading.
- Three editorial illustrations appear alongside relevant introductions, not behind text. Aspect ratio is reserved, images are lazy loaded and have 600/1200 px variants.
- Legal copy uses a 720 px maximum column, 18 px desktop / 17 px phone type, and clear rules before document sections. Source text remains intact.
- Equal hero heights and original home GSAP engines remain unchanged.
- `editorial-readability.spec.ts` verifies stacked introductions, readable body sizes, heading relationships and responsive image loading. `reading-rails.spec.ts` still checks the central rail of genuinely paired work areas.

## R22: responsive reading groups and inner alignment

Three-item prose groups use three columns above 1000 px and a single ordered column below; they never leave a 2+1 orphan. Comparisons keep one surface and switch their separators from vertical to horizontal. Contact topic choices also stack below 1001 px, while its form remains full width.

Reading-row annotations, research-pair paragraphs, scanning descriptions and related-reading links now share natural subgrid tracks. Optional details allocate a track only when present. On phones these groups return to ordinary vertical flow. The plan grid uses the shared structural gap and a single heading-to-cards margin. Team workflow panels use one inset instead of compounding outer and inner padding.

`tests/visual-rhythm.spec.ts` checks readable column measures, wrapped-title alignment, annotation/link alignment, the absence of orphaned three-card rows, matching H2 sizes, pricing gaps and breathing room in use-case journeys. See `VISUAL-AUDIT-R22-2026-10-10.md` for current-run evidence and the explicit distinction between desktop visual review and responsive geometry tests.

## R23: column rails, including the shared footer

R22 checked outer containers and selected paired work areas, but missed independent
20/24 px column gaps in the footer and other page-level grids. This let the footer's
Developers column drift left of closing actions even when both containers matched.

All structural grids now use the shared horizontal gap: footer navigation and its
bottom row, home metrics/use cases/audience/pricing/FAQ, capability panels, legal
navigation and actions, and nested use-case steps. The tablet legal reading column
keeps the same four-column start. Mobile About/Teams groups no longer introduce
independent 28/18 px horizontal gaps. Vertical spacing remains local to each section.

The footer's copyright, email and cookie control start on the central rail on desktop;
on smaller screens the bottom row stacks and begins on the page rail. At 768 px and
above the three metadata items remain on one line. Contained product interfaces,
five-option toolbars and padded comparison surfaces retain their intentional local
layouts; they are not page-level columns.

`tests/column-rails.spec.ts` checks actual child edges against the common twelve-column
lattice, independently of a component's computed gap. It covers all nineteen routes
at 320, 390, 768, 1024, 1199, 1200, 1440, 1920 and 2560 px, including the footer
breakpoint. This test reproduces the reported defect against the previous build.
