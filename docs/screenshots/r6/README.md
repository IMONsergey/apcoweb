# R6 verified captures

Four lossless Chromium captures from source `d838f0266d4c6bad043c281f779e392edae6e5ac` and [the matching-browser run](https://github.com/IMONsergey/apcoweb/actions/runs/37321058513). Artifact `11350256523` has SHA-256 `79917c4d2580802a6db079c9dd2f2600f350a9c494ca335ead4e54205bc3b9e7`. All 231 scenarios passed: 230 on the first attempt and one WebKit frame-geometry scenario on its successful retry, with no remaining failures or skips.

The two language captures show both decorative menu flags at 390 and 1440 px. The two dissolve captures sample the real incoming opacity and shared layout animations at 150 ms. Text stays in its own inline nodes; highlighted phrases wrap naturally. The same source was tested in both directions across Chromium/Firefox/WebKit. `capture-results.json` records original PNG and retained WebP checksums. Conversion is lossless.
