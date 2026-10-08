# Deployment and repository transfer

## Build for the destination

This preview is configured with the GitHub Pages base path `/apcoweb/` in `vite.config.ts`. Do not deploy that build at a different path without rebuilding.

| Destination                                        | Command                          |
| -------------------------------------------------- | -------------------------------- |
| Current GitHub Pages preview                       | `npm run build`                  |
| Custom domain at the root (`https://example.com/`) | `npm run build:root`             |
| Subdirectory (`https://example.com/site/`)         | `npm run build -- --base=/site/` |

Build artifacts are written to `dist/`. Deploy its contents at the exact matching path. Do not open the HTML directly with the `file://` protocol.

To inspect a root-domain build locally: `npm run build:root && npm run preview -- --base=/`. For a subdirectory build, provide the same base to both build and preview.

## Repository transfer

1. Copy the source tree from the accepted commit into the destination repository. Exclude the old `.git` directory, `node_modules`, `dist` and local Playwright reports.
2. Install dependencies with `npm ci` and run `npm run check` and `npm run build:root` (or the correct destination base path).
3. Configure the destination hosting project with Node.js 22+, build command and the `dist` output directory.
4. Review all outbound product links and approve content, legal pages, organization marks and final domain metadata.
5. Replace the preview-only `noindex` setting in `index.html` and `public/robots.txt` only when the site is approved for indexing.
6. Run a browser smoke test against the live URL: `APCO_BASE_URL=https://example.com/ npm run test:production`.

The old GitHub repository history is not part of a source snapshot. If preserving the original history is contractually required, transfer the repository instead of initializing an unrelated history. Preserve real third-party licensing and contribution attribution.

## Continuous integration

`.github/workflows/deploy.yml` validates and publishes the `main` branch to the current GitHub Pages site. `.github/workflows/ux-review.yml` performs cross-browser regression checks on pull requests. Replace or remove the Pages workflow when switching to client hosting.

The preview's external product base is currently `https://apcosys.net` in `src/content/site.ts`. Update it only if the destination product environment changes.

## Acceptance

Confirm successful network requests for JS, CSS, images and fonts after a hard reload. Test Light, Dark and System, mobile and desktop breakpoints, menus, search handoff, pricing, accessible keyboard navigation and reduced motion.
