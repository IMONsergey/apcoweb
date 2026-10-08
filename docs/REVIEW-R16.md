# R16 — follow-up audit and supplied dark gradient

## Scope and source

Requested by the owner on 2026-10-08 after the global audit of released main `a070c4b`.

- Restore full WCAG coverage in four test groups. `tests/helpers/accessibility.ts` keeps the WCAG tag filter and enables label/name checking without replacing `runOnly`. A negative control requires both `button-name` and `label-content-name-mismatch` findings.
- Let the desktop registration label shrink/wrap when user text-spacing settings exhaust the header width. Normal layout, the 1200 px navigation breakpoint and the single-link split-button construction remain intact.
- Correct the release context in AGENTS, WORK-STATE and the R15 handoff.
- Adapt only the dark branch of the maintained flow renderer to `block-second-bg-dark(1).zip`, `turquoise-flow/turquoise-flow.js`, supplied by the owner. The lower palette and CSS fallback are copied from that version: transparent until 36%, 50% turquoise at 48%, then opaque #007A92 at 60%, #005567 at 70%, #003440 at 80%, #0B1C21 at 90%, #0C1113 at 98–100%. Opaque lower rows prevent animated pale spots from muddying the transition. Restore the supplied default strength of 1 in dark mode.

The renderer's existing lifecycle, visibility/reduced-motion handling and theme switching remain in place. The light branch and six checksum-protected original engines are not replaced. The archive's sample page and package are reference material, not application dependencies. The already approved dot overlay, search UI and API illustration are retained.

## Verification

Required gates: locked install, protected-source checksums, lint/typecheck, formatting, production build and full Chromium suite. Targeted R16 coverage verifies full WCAG filtering, header fit under user spacing at 1200/1280/1440 px in both themes, spatially uniform opaque dark rows, exact bottom RGBA [12,17,19,255] at 390/1440 px, return to the unchanged light bottom [246,246,246,255], and failed-chunk fallback.

Exact execution results and publication status belong in the pull request so this source commit does not claim a deployment before it occurs. Preserve the last released baseline and CI links in WORK-STATE.

Local pixel comparison against the supplied archive at 1440×950 and 390×844 CSS px (paused Canvas 2D, resolution 192) reports zero differing channels across 97,536 and 68,352 RGBA bytes respectively. Browser gradient dithering may vary by one channel value across opaque rows; the last row is asserted exactly.

## Follow-up: new owner archive and CI evidence

The subsequently uploaded `block-second-bg-dark(2).zip` specifies the **same** lower-gradient stop sequence as the R16 renderer and CSS fallback: 0/36% transparent, 48% half-opacity teal, then `#007A92` at 60%, `#005567` at 70%, `#003440` at 80%, `#0B1C21` at 90% and `#0C1113` at 98–100%. Its component is reference material only; replacing the maintained adapter wholesale would unnecessarily change the light version and lifecycle logic. No further visual engine change is necessary for the new archive.

The original R16 source commit `f7b6583` passed [163 Chromium tests](https://github.com/IMONsergey/apcoweb/actions/runs/37732133956) and [489 tests across Chromium, Firefox and WebKit](https://github.com/IMONsergey/apcoweb/actions/runs/37732134039). Both jobs also passed their required install/check/build gates. These results apply to that source commit; new branch commits receive their own CI checks. Neither a green PR nor the archive comparison confirms that R16 has been deployed to the public `main` site.
