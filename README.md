# APCOSYS Website

A responsive marketing website built with React 19, TypeScript, Vite and CSS. The project includes product interface illustrations and decorative animations. Authentication, searching and subscription management belong to the external APCOSYS platform.

## Requirements

- Node.js 22.12+ (see `.nvmrc`)
- npm (dependency versions are locked in `package-lock.json`)

## Getting started

```sh
npm ci
npm run dev
```

The development server runs at `http://127.0.0.1:5187/apcoweb/`.

## Commands

| Command              | Purpose                                                         |
| -------------------- | --------------------------------------------------------------- |
| `npm run dev`        | Start the Vite development server                               |
| `npm run check`      | Validate assets, engine hashes, formatting, lint and TypeScript |
| `npm run build`      | Production build for the current GitHub Pages path              |
| `npm run build:root` | Production build for a root-domain deployment                   |
| `npm run preview`    | Preview an existing build                                       |
| `npm run test:smoke` | Full Playwright suite in Chromium                               |
| `npm test`           | Full Playwright suite in Chromium, Firefox and WebKit           |

Install Playwright browsers once with `npx playwright install chromium firefox webkit`.

## Directory structure

```text
public/
  assets/
    brand/
    partners/
    illustrations/
      api/
      closing/
      walkthrough/
  fonts/
src/
  components/
    sections/
    ui/
    visuals/
  content/
  hooks/
  i18n/
  styles/
  theme/
  visuals/
tests/
scripts/
docs/
```

- `src/components/sections/` contains page sections and local component styles.
- `src/components/ui/` contains reusable UI controls.
- `src/components/visuals/` contains lazy-loading integration and visibility boundaries.
- `src/visuals/` contains the rendering modules and React wrappers.
- `src/content/` contains visible content, pricing and asset URL helpers.
- `src/styles/` contains tokens and global styles. CSS import order in `src/main.tsx` is intentional.
- `public/` contains static assets copied to the build without bundling.

## Deployment

The current GitHub Pages preview is at https://imonsergey.github.io/apcoweb/. The default Vite base is `/apcoweb/`. For a custom domain or another path, follow [Deployment](docs/DEPLOYMENT.md).

The site ships as a preview with `noindex` and restrictive `robots.txt`. Remove those only when a production launch has been approved.

## Technical documentation

- [Architecture](docs/ARCHITECTURE.md)
- [Assets and licenses](docs/ASSETS.md)
- [Deployment and transfer](docs/DEPLOYMENT.md)
- [Content requiring approval](docs/CONTENT.md)
- [Visual components](docs/VISUALS.md)
- [Quality assurance](docs/QA.md)
