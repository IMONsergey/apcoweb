# R10 inspected screenshots

Captured in cached macOS Chromium 151.0.7922.34 against the production preview. These files were visually inspected. No source artwork was modified.

- `background-ready-1440-en.png` and `background-ready-390-ru.png`: the latest entrance midpoint at 140 ms of the 520 ms transition (opacity 0.706). Both background canvases have already drawn complete frames; the turquoise field and dot pattern appear together with the page.
- `page-entrance.png`: historical first logo-free candidate, before the owner reported its late-arriving background. It is superseded by the two background-ready captures.
- `en-1440-900-entry.png`: the search visible at initial scroll position in a 1440×900 viewport.
- `api-live-final.png`: the ready supplied DOM/SVG interface inside the corrected grid and rounded frame, 1440×900.
- `en-390-search.png`: the compact search and centered free-search hint, 390×1000.
- `menu-opening.png`: the real navigation entrance midpoint at 390×844; the settled layout remains native.

The latest `background-ready-record.json` samples actual pixels during unpaused EN desktop and RU phone cold starts. TurquoiseFlow's download was delayed 1800 ms and fonts 500 ms. Every visible sample has two ready canvases, an opaque painted flow pixel and a nonempty dot pattern; neither case has an early reveal or JavaScript error. `page-entrance.json` retains the earlier candidate's historical frame record.

The original full sixteen-case EN/RU geometry review covers widths 320 through 2560 px without measured overflow or JavaScript errors. Production and matching-browser CI are documented separately; these captures do not claim to cover every browser/device.
