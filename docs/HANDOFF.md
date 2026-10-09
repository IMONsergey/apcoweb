# Client handoff checklist

This repository contains the marketing website, not the authenticated APCOSYS product.

## Before transferring source

- Verify the accepted source commit and green GitHub Actions run.
- Run `npm ci`, `npm run check`, `npm run build:root` and Playwright tests.
- Approve displayed prices, product claims, contact details and legal destinations.
- Verify the rights to organization marks, illustrations, fonts and embedded demonstrations.
- Document the new domain, hosting base path, indexing policy and security headers.
- Preserve package lock, font/third-party licenses, and rendering integrity manifest.
- Validate mobile browsers and keyboard/screen-reader navigation on actual devices.

## New client repository

Create a new repository from the accepted source snapshot without its old `.git` history, `node_modules`, `dist`, or test output. Include the source, tests, required licenses, docs and lockfile. Do not misrepresent authorship or remove upstream attributions.

Replace the preview's GitHub Pages workflow with the client's deployment configuration; retain the quality gates. See [Deployment](DEPLOYMENT.md).

## External product

The authenticated product is being redesigned. Registration, sign-in, search handoff and embedded API examples remain integration inputs, not requirements for this source-only handoff.

## Public build settings

Use `.env.example` for the product origin and support email. Any `VITE_*` setting becomes visible to the browser and must never contain credentials.
