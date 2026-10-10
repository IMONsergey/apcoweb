import { defineConfig } from '@playwright/test';
import base from './playwright.config';

// Stage 2 release contract. Historical R21 pixel references remain available in
// visual-regression.spec.ts; they are not rewritten to bless the new page design.
// This suite checks the current approved product, all routes, layout, accessibility,
// source assets and live motion both before and after publication.
export default defineConfig({
  ...base,
  testMatch:
    '**/{audit-r25,asset-delivery,column-rails,compact-layout,editorial-readability,font-loading,gradient-preservation,header-spacer-seam,inner-hero-layout,inner-page-content,inner-page-layout,legal-pages,motion-and-focus,reading-rails,responsive-navigation,route-motion,site-grid,stage2-final-rebuild,stage2-functional,stage2-motion,stage2-product-experience,stage2-quality,stage2-routes,visual-rhythm}.spec.ts',
  projects: base.projects?.filter((project) => project.name === 'chromium'),
});
