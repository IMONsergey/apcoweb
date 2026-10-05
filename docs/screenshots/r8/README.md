# R8 visual evidence

Seven inspected lossless captures from the local matching Chromium production-preview run, 95/95 scenarios passed. Runtime/test source: `960cf312ea4418e441c7108336301c1ea294abc7`.

The full-page reading-flow test visited every section at 390 and 1920 px and waited for its illustrations to mount. Section evidence is cropped using that test’s recorded DOM geometry, keeping fixed navigation out of section interiors. The language menu capture is cropped to the header and complete hero; the API capture shows the source timeline’s successful response. WebP is lossless; pixels are not rescaled or retouched.

capture-provenance.json records the original screenshot names, crop rectangles, dimensions and SHA-256 hashes. See ../../AUDIT-R8.md for the six-step audit and ../../qa-r8-summary.json for browser/build provenance.

## Published page

`live-publication.jpg` is the original cloud-browser JPEG, captured once on the actual published Pages site at `https://imonsergey.github.io/apcoweb/?lang=ru#top`, 2026-10-05 20:36:03.975 UTC. It includes the first-screen context and compact menu with flags. No pixels are cropped, rescaled or retouched. Publication source, dimensions and SHA-256 are in ../../qa-r8-summary.json; ../../RELEASE-R8.md records successful publication, 95/95 actual Pages scenarios and the live-browser capture.
