# Dark artwork — R26

15 separate dark editions rendered with the built-in image generation tool, using each original light illustration as its composition reference. Only resizing and WebP encoding were applied afterward. Light assets are unchanged.

## Theme delivery

ThemedArtwork selects the file from the resolved application theme, including manual overrides and live system changes. Intrinsic dimensions and aspect ratios stay stable. No inversion, hue rotation, brightness filter, or image recoloring is used.

## Verification

- `npm run check` and `npm run build` passed.
- 15 theme/artwork browser checks passed, covering every illustrated route, manual override, live system theme, stable hero dimensions, mobile responsive sources, and no light artwork downloads in dark mode.
- 19 dark-theme route accessibility/asset checks passed.
- Existing inner-page layout checks at 320, 768, and 1440px, responsive editorial image check, and Contact form validation check passed (5 checks).
- Visual review: desktop search hero, About editorial image, homepage cards, and mobile search hero. Screenshots: `docs/proofs/r26/`.
- 18 optimized WebP exports total 607,408 bytes. Each theme loads only its selected assets.
- The prior Pages production smoke failure was a test URL assertion that rejected Pages' canonical `/contact/` URL. The assertion now accepts the optional trailing slash while retaining the form validation checks.

## Generation prompts

### inner/search

- Reference: public/assets/inner/search.webp
- Selected output: public/assets/inner/search-dark.webp
- Generated original: /workspace/scratch/40532d170b04/generated_images/exec-9194da8d-176c-4cb9-9de5-cc010c32eb28.png

Use case: lighting-weather. Asset type: Apcosys website dark-mode hero illustration, landscape 3:2. Input image: edit target, preserve its camera, composition, three server stacks and floating optical lens. Create a separately art-directed dark edition of this illustration, not a negative or simple color inversion. Scene: seamless near-black cool charcoal studio background #0D1113. Materials: left and right servers satin graphite #263239 with softly lit cool silver edges; central servers rich petrol teal; optical lens clear smoked glass with believable bright silver reflections and subtle cyan refraction. Lighting: broad soft studio key and restrained teal rim light #43C0D0, enough midtone detail to read at small size, natural downward contact shadows. Keep object placement and geometry, ample calm negative space at image edges, elegant clean premium product render. Avoid beige, warm colors, purple, neon bloom, starfields, wires, extra objects, text, logos, watermark. Full image opaque.

### inner/methodology

- Reference: public/assets/inner/methodology.webp
- Selected output: public/assets/inner/methodology-dark.webp
- Generated original: /workspace/scratch/40532d170b04/generated_images/exec-0d1e8684-45aa-4019-9344-f95dd2deb103.png

Use case: lighting-weather. Asset type: Apcosys website dark-mode illustration, landscape 3:2. Input image is the edit target. Preserve original camera, composition, object count, scale and spacing; create a separately rendered dark studio edition, not a negative or color inversion. Seamless near-black cool charcoal #0D1113 background with calm empty edges, graphite #263239 solids, clear smoked glass, rich petrol teal elements, restrained #43C0D0 edge accents. Soft broad studio key, readable midtones and cool silver reflections, dark natural contact shadows. Elegant premium realistic product rendering. No beige, warm hues, purple, neon bloom, stars, text, logos, watermark, or extra objects. Full opaque image. Preserve three floating transparent square layers: bottom interconnected records, middle scattered observation cubes, top terrain interpretation. Central petrol column. Make layers readable in graphite smoked glass with soft silver highlights.

### inner/monitoring

- Reference: public/assets/inner/monitoring.webp
- Selected output: public/assets/inner/monitoring-dark.webp
- Generated original: /workspace/scratch/40532d170b04/generated_images/exec-de4e142e-b04c-4ca3-ba3b-68ce22b6b199.png

Use case: lighting-weather. Asset type: Apcosys website dark-mode illustration, landscape 3:2. Input image is the edit target. Preserve original camera, composition, object count, scale and spacing; create a separately rendered dark studio edition, not a negative or color inversion. Seamless near-black cool charcoal #0D1113 background with calm empty edges, graphite #263239 solids, clear smoked glass, rich petrol teal elements, restrained #43C0D0 edge accents. Soft broad studio key, readable midtones and cool silver reflections, dark natural contact shadows. Elegant premium realistic product rendering. No beige, warm hues, purple, neon bloom, stars, text, logos, watermark, or extra objects. Full opaque image. Preserve two upright glass observation panels with relief waves and central petrol rectangular changed element connected by a single fine teal wave. Glass must remain legible against dark background.

### inner/teams

- Reference: public/assets/inner/teams.webp
- Selected output: public/assets/inner/teams-dark.webp
- Generated original: /workspace/scratch/40532d170b04/generated_images/exec-677e4c24-1b2c-4333-b160-d2efc104eca0.png

Use case: lighting-weather. Asset type: Apcosys website dark-mode illustration, landscape 3:2. Input image is the edit target. Preserve original camera, composition, object count, scale and spacing; create a separately rendered dark studio edition, not a negative or color inversion. Seamless near-black cool charcoal #0D1113 background with calm empty edges, graphite #263239 solids, clear smoked glass, rich petrol teal elements, restrained #43C0D0 edge accents. Soft broad studio key, readable midtones and cool silver reflections, dark natural contact shadows. Elegant premium realistic product rendering. No beige, warm hues, purple, neon bloom, stars, text, logos, watermark, or extra objects. Full opaque image. Preserve four unoccupied desk/chair/monitor stations around a central transparent shared cube, connected by four petrol beams. Desks in softly lit satin graphite, frosted smoked-glass central evidence cube.

### inner/api

- Reference: public/assets/inner/api.webp
- Selected output: public/assets/inner/api-dark.webp
- Generated original: /workspace/scratch/40532d170b04/generated_images/exec-d7cf26ea-bdbc-4414-8618-bac688adc078.png

Use case: lighting-weather. Asset type: Apcosys website dark-mode illustration, landscape 3:2. Input image is the edit target. Preserve original camera, composition, object count, scale and spacing; create a separately rendered dark studio edition, not a negative or color inversion. Seamless near-black cool charcoal #0D1113 background with calm empty edges, graphite #263239 solids, clear smoked glass, rich petrol teal elements, restrained #43C0D0 edge accents. Soft broad studio key, readable midtones and cool silver reflections, dark natural contact shadows. Elegant premium realistic product rendering. No beige, warm hues, purple, neon bloom, stars, text, logos, watermark, or extra objects. Full opaque image. Preserve two precision rectangular connector blocks, central teal bridge and square glass data tiles passing through. Blocks satin graphite, data tiles smoked clear glass; strong but soft silver edge reflections.

### inner/pricing

- Reference: public/assets/inner/pricing.webp
- Selected output: public/assets/inner/pricing-dark.webp
- Generated original: /workspace/scratch/40532d170b04/generated_images/exec-80410a42-12e6-49e7-addf-8bfe5ea36d70.png

Use case: lighting-weather. Asset type: Apcosys website dark-mode illustration, landscape 3:2. Input image is the edit target. Preserve original camera, composition, object count, scale and spacing; create a separately rendered dark studio edition, not a negative or color inversion. Seamless near-black cool charcoal #0D1113 background with calm empty edges, graphite #263239 solids, clear smoked glass, rich petrol teal elements, restrained #43C0D0 edge accents. Soft broad studio key, readable midtones and cool silver reflections, dark natural contact shadows. Elegant premium realistic product rendering. No beige, warm hues, purple, neon bloom, stars, text, logos, watermark, or extra objects. Full opaque image. Four steadily ascending platforms representing access levels, graphite side walls and petrol top surfaces, simple clear smoked-glass rectangular bars on top. Preserve the original four-level staircase silhouette and wide composition.

### inner/about

- Reference: public/assets/inner/about.webp
- Selected output: public/assets/inner/about-dark.webp
- Generated original: /workspace/scratch/40532d170b04/generated_images/exec-413da63a-0073-4895-9ed3-feca22c9a23e.png

Use case: lighting-weather. Asset type: Apcosys website dark-mode illustration, landscape 3:2. Input image is the edit target. Preserve original camera, composition, object count, scale and spacing; create a separately rendered dark studio edition, not a negative or color inversion. Seamless near-black cool charcoal #0D1113 background with calm empty edges, graphite #263239 solids, clear smoked glass, rich petrol teal elements, restrained #43C0D0 edge accents. Soft broad studio key, readable midtones and cool silver reflections, dark natural contact shadows. Elegant premium realistic product rendering. No beige, warm hues, purple, neon bloom, stars, text, logos, watermark, or extra objects. Full opaque image. Preserve an open spherical architectural structure made from curved bands around a small floating rectangular teal glass core. Outer bands softly lit satin graphite with silver edges; inner surfaces petrol teal. Open spaces must remain clearly visible.

### inner/scanning

- Reference: public/assets/inner/scanning.webp
- Selected output: public/assets/inner/scanning-dark.webp
- Generated original: /workspace/scratch/40532d170b04/generated_images/exec-88c9c33e-fa90-4f58-b5c1-307e4a1a0b58.png

Use case: lighting-weather. Asset type: Apcosys website dark-mode illustration, landscape 3:2. Input image is the edit target. Preserve original camera, composition, object count, scale and spacing; create a separately rendered dark studio edition, not a negative or color inversion. Seamless near-black cool charcoal #0D1113 background with calm empty edges, graphite #263239 solids, clear smoked glass, rich petrol teal elements, restrained #43C0D0 edge accents. Soft broad studio key, readable midtones and cool silver reflections, dark natural contact shadows. Elegant premium realistic product rendering. No beige, warm hues, purple, neon bloom, stars, text, logos, watermark, or extra objects. Full opaque image. Preserve three server towers underneath a clear protective glass hemisphere, with restrained teal scanning rays arriving from the left and a thin teal boundary ring. Towers graphite; glass dome softly lit, transparent enough to clearly see servers.

### inner/contact

- Reference: public/assets/inner/contact.webp
- Selected output: public/assets/inner/contact-dark.webp
- Generated original: /workspace/scratch/40532d170b04/generated_images/exec-69e0b3ac-f918-4575-afd2-7184b1a76b60.png

Use case: lighting-weather. Asset type: Apcosys website dark-mode illustration, landscape 3:2. Input image is the edit target. Preserve original camera, composition, object count, scale and spacing; create a separately rendered dark studio edition, not a negative or color inversion. Seamless near-black cool charcoal #0D1113 background with calm empty edges, graphite #263239 solids, clear smoked glass, rich petrol teal elements, restrained #43C0D0 edge accents. Soft broad studio key, readable midtones and cool silver reflections, dark natural contact shadows. Elegant premium realistic product rendering. No beige, warm hues, purple, neon bloom, stars, text, logos, watermark, or extra objects. Full opaque image. Preserve two abstract speech-bubble sculptures built from chunky interlocking rectangles, facing one another with a small glass bridge between. Replace white solid blocks with satin graphite, keep petrol transparent blocks and clear glass bridge. Clear readable conversational silhouette.

### use-cases/bug-bounty

- Reference: public/assets/use-cases/bug-bounty.webp
- Selected output: public/assets/use-cases/bug-bounty-dark.webp
- Generated original: /workspace/scratch/40532d170b04/generated_images/exec-eec1bb19-7047-4df0-a69f-78abd970c036.png

Use case: lighting-weather. Asset type: Apcosys website dark-mode illustration, landscape 3:2. Input image is the edit target. Preserve original camera, composition, object count, scale and spacing; create a separately rendered dark studio edition, not a negative or color inversion. Seamless near-black cool charcoal #0D1113 background with calm empty edges, graphite #263239 solids, clear smoked glass, rich petrol teal elements, restrained #43C0D0 edge accents. Soft broad studio key, readable midtones and cool silver reflections, dark natural contact shadows. Elegant premium realistic product rendering. No beige, warm hues, purple, neon bloom, stars, text, logos, watermark, or extra objects. Full opaque image. Preserve the restrained isometric cluster of five server volumes within one thin rectangular teal scope boundary and the small outer satellite blocks. Smoked glass servers with graphite interiors, one solid petrol hero server. Clear geometry; fine low-contrast connections.

### use-cases/vulnerability-research

- Reference: public/assets/use-cases/vulnerability-research.webp
- Selected output: public/assets/use-cases/vulnerability-research-dark.webp
- Generated original: /workspace/scratch/40532d170b04/generated_images/exec-3ae910f8-e6f1-480f-bff8-5953f2ae4f47.png

Use case: lighting-weather. Asset type: Apcosys website dark-mode illustration, landscape 3:2. Input image is the edit target. Preserve original camera, composition, object count, scale and spacing; create a separately rendered dark studio edition, not a negative or color inversion. Seamless near-black cool charcoal #0D1113 background with calm empty edges, graphite #263239 solids, clear smoked glass, rich petrol teal elements, restrained #43C0D0 edge accents. Soft broad studio key, readable midtones and cool silver reflections, dark natural contact shadows. Elegant premium realistic product rendering. No beige, warm hues, purple, neon bloom, stars, text, logos, watermark, or extra objects. Full opaque image. Preserve five evenly separated floating square glass layers, one central petrol square indicator and fine alignment lines. Transparent smoked glass edges lit softly in cool silver, one layer subtly teal. Airy sparse geometric exploded construction; no added circuits or symbols.

### use-cases/osint

- Reference: public/assets/use-cases/osint.webp
- Selected output: public/assets/use-cases/osint-dark.webp
- Generated original: /workspace/scratch/40532d170b04/generated_images/exec-79d2b76c-9738-427d-bd3d-f8c047f59c4c.png

Use case: lighting-weather. Asset type: Apcosys website dark-mode illustration, landscape 3:2. Input image is the edit target. Preserve original camera, composition, object count, scale and spacing; create a separately rendered dark studio edition, not a negative or color inversion. Seamless near-black cool charcoal #0D1113 background with calm empty edges, graphite #263239 solids, clear smoked glass, rich petrol teal elements, restrained #43C0D0 edge accents. Soft broad studio key, readable midtones and cool silver reflections, dark natural contact shadows. Elegant premium realistic product rendering. No beige, warm hues, purple, neon bloom, stars, text, logos, watermark, or extra objects. Full opaque image. Preserve a sparse isometric investigation network of small clear glass cubes, a foreground glass cube enclosing a petrol core, and one selected fine teal path branching into the network. Dark cool-gray secondary paths. Do not add complexity; cube edges readable but subdued.

### editorial/evidence

- Reference: public/assets/editorial/evidence.webp
- Selected output: public/assets/editorial/evidence-dark.webp
- Generated original: /workspace/scratch/40532d170b04/generated_images/exec-a5e49608-6b5f-44bf-8211-75a4837e9651.png

Use case: lighting-weather. Asset type: Apcosys website dark-mode illustration, landscape 3:2. Input image is the edit target. Preserve original camera, composition, object count, scale and spacing; create a separately rendered dark studio edition, not a negative or color inversion. Seamless near-black cool charcoal #0D1113 background with calm empty edges, graphite #263239 solids, clear smoked glass, rich petrol teal elements, restrained #43C0D0 edge accents. Soft broad studio key, readable midtones and cool silver reflections, dark natural contact shadows. Elegant premium realistic product rendering. No beige, warm hues, purple, neon bloom, stars, text, logos, watermark, or extra objects. Full opaque image. Preserve the close-up diagonal sequence of three thick frosted-glass square observation platforms connected by one thin petrol cable; a small teal spherical observation on the middle platform and stacked evidence cards within a circular glass recess in the foreground. Smoked glass platforms, graphite cards, natural silver specular highlights. Composition is a cinematic wide editorial crop; maintain the close-up perspective and visible cable.

### editorial/investigation

- Reference: public/assets/editorial/investigation.webp
- Selected output: public/assets/editorial/investigation-dark.webp
- Generated original: /workspace/scratch/40532d170b04/generated_images/exec-ce99fa84-18fc-4f74-a801-2b0ed818250e.png

Use case: lighting-weather. Asset type: Apcosys website dark-mode illustration, landscape 3:2. Input image is the edit target. Preserve original camera, composition, object count, scale and spacing; create a separately rendered dark studio edition, not a negative or color inversion. Seamless near-black cool charcoal #0D1113 background with calm empty edges, graphite #263239 solids, clear smoked glass, rich petrol teal elements, restrained #43C0D0 edge accents. Soft broad studio key, readable midtones and cool silver reflections, dark natural contact shadows. Elegant premium realistic product rendering. No beige, warm hues, purple, neon bloom, stars, text, logos, watermark, or extra objects. Full opaque image. Preserve the architectural block field, large upright magnifying lens in the foreground focusing on one petrol cube and the thin connection line leading into the distance. Keep the camera and photographic depth of field. Graphite architectural blocks, neutral clear lens, soft cool studio highlights.

### editorial/scope

- Reference: public/assets/editorial/scope.webp
- Selected output: public/assets/editorial/scope-dark.webp
- Generated original: /workspace/scratch/40532d170b04/generated_images/exec-bc041c42-ecf9-4689-ad42-529fc82e86a3.png

Use case: lighting-weather. Asset type: Apcosys website dark-mode illustration, landscape 3:2. Input image is the edit target. Preserve original camera, composition, object count, scale and spacing; create a separately rendered dark studio edition, not a negative or color inversion. Seamless near-black cool charcoal #0D1113 background with calm empty edges, graphite #263239 solids, clear smoked glass, rich petrol teal elements, restrained #43C0D0 edge accents. Soft broad studio key, readable midtones and cool silver reflections, dark natural contact shadows. Elegant premium realistic product rendering. No beige, warm hues, purple, neon bloom, stars, text, logos, watermark, or extra objects. Full opaque image. Preserve the open circular clear-glass scope boundary, small infrastructure blocks and single petrol cube inside it, and one teal cable entering through the front gap. Preserve the original distant hills and lake as subdued charcoal dusk silhouettes, no stars. Readable soft cool studio illumination on foreground objects.
