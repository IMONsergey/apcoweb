# R8 publication — 2026-10-05

PR [#9](https://github.com/IMONsergey/apcoweb/pull/9) is merged. Main merge: `2151ab023e8b7b1d76f2cd2b73a9d94d5f1460fb`; runtime/tests remain byte-identical to verified source `960cf312ea4418e441c7108336301c1ea294abc7`.

## Verified outcome

- Local production preview: **285/285**, 95 in each matching Chromium, Firefox and WebKit; zero failures, skips or retries.
- [Cross-browser CI 37365675775](https://github.com/IMONsergey/apcoweb/actions/runs/37365675775): **285/285**, zero failures, skips or retries.
- [Main workflow 37367494555](https://github.com/IMONsergey/apcoweb/actions/runs/37367494555): validation job `111956072763` passed **95/95**, zero retries. Deployment job `111960884560` succeeded at **20:24:02 UTC**.
- Actual published Pages: **95/95**, zero failures, skips or test retries; production job `111968326646`, workflow attempt 2, summary at **20:43:34.750 UTC**. The full workflow is successful.
- All **13 published JS/CSS SHA-256 hashes** match the tested local build. Exact hashes are in [qa-r8-summary.json](qa-r8-summary.json).
- The cloud browser additionally verified EN↔RU, the compact flag menu, the 72 px upward header, downward hiding, native anchors and mounting of the supplied API screen on the actual public site.

## Public-site provenance

The first production job `111962797158` was cancelled while queued, before any tests ran. Only that job was re-run; successful validation and deployment were carried forward. Attempt 2 lists carried validation/deployment jobs as `111968363271` and `111968377633`. The first actual live test execution passed all 95 scenarios in 2.6 minutes, without retries.

Production evidence artifact: `11370941507`, `production-review-2151ab023e8b7b1d76f2cd2b73a9d94d5f1460fb`, 21,991,597 bytes. Its digest and expiry are recorded in qa-r8-summary.json. A separate local public-browser attempt stopped at `net::ERR_EMPTY_RESPONSE`; no pass is claimed for that environmental attempt. The completed GitHub production job, cloud browser and independent HTTP comparison verify the public release.

This documentation-only follow-up records publication without changing the deployed website or launching another deployment. The main workflow above is the authoritative release record.

## Visual evidence and limits

[Live public-page capture](screenshots/r8/live-publication.jpg) was captured once from `https://imonsergey.github.io/apcoweb/?lang=ru#top` at 20:36:03.975 UTC, including the complete first-screen context and open compact language menu. The original JPEG bytes are unchanged. Provenance, dimensions and checksum are in qa-r8-summary.json. Seven inspected lossless local section captures remain in [screenshots/r8/](screenshots/r8/).

The [post-fix audit](AUDIT-R8.md) is based on browser behavior, resource sizes and loading boundaries. Field Core Web Vitals, physical-device certification and product authentication/checkout are outside the evidence collected here.
