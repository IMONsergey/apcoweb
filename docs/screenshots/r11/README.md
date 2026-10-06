# R11 viewport review

Runtime/test source: `84335d669eed22b1ee9ab4f263117416b5819ba9`. Production preview: `http://127.0.0.1:4195/apcoweb/`, isolated Mac worktree based on R10 main `92badd28bb66661241f53b63043a76a72d74cd47`. Cached macOS Chromium; normal motion, loaded fonts and complete visible carousel images. Captures use real scrolling and wheel reversal to restore navigation, without DOM/style changes.

The four lossless PNGs show complete carousel and audience sections in EN at 1536×740 and RU at 1366×640. `geometry.json` records 22 EN/RU viewport reviews; `baseline-geometry.json` records 16 comparisons against released R10. The measured desktop composition includes 96 px clearance for the navigation. Phone/tablet reading flows and tall windows retain the established composition.

All four captures were visually inspected. Source/build hashes, browser paths, test results and prior candidate corrections are in `../../qa-r11-summary.json`. CSS viewport sizes model browser controls and display scaling; these are not physical Windows device captures.
