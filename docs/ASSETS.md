# Asset directory

All static images are stored under `public/assets/`. Image URLs in React use `assetUrl(group, filename)` from `src/content/assets.ts`; this handles root and subdirectory deployments.

| Folder                              | Contents                                           |
| ----------------------------------- | -------------------------------------------------- |
| `assets/brand/`                     | APCOSYS favicon and standalone logo                |
| `assets/partners/`                  | Organization logos used in the trust strip         |
| `assets/illustrations/hero/`        | Closing-section artwork at multiple viewport sizes |
| `assets/illustrations/walkthrough/` | Query, results and host illustrations              |
| `assets/illustrations/api/`         | API interface illustration                         |
| `fonts/`                            | Local WOFF2 files and license notices              |

## Image variants

- Closing artwork uses `start-[width].webp` and `start-[width]-dark.webp`, plus desktop variants.
- Walkthrough images use `step-[scene].webp`, `step-[scene]-dark.webp` and 360/600 pixel variants. The dark responsive names are `step-[scene]-dark-[width].webp`.
- The API illustration intentionally stays visually consistent in both themes and uses the same light assets.
- CSS and component dimensions must preserve each original image's aspect ratio.

The asset validation script (`npm run verify:assets`) checks for the expected groups, all currently referenced variants, the local fonts and required license files.

## Rights and licensing

Font licenses are retained as `public/fonts/LICENSE-Instrument-Sans.txt` and `public/fonts/LICENSE-IBM-Plex-Mono.txt`. The embedded API demo also includes `src/visuals/api/GSAP-NOTICE.txt`. Retain license and attribution notices when transferring or modifying the project.

The organization marks, product illustrations and usage rights must be confirmed by the site owner before a public production launch. Their presence in a design is not evidence of an approved endorsement.
