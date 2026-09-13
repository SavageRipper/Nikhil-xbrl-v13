# MCA C&I XBRL Workbench V13 — QA Report

## Static checks

- `node --check app.js` — PASS
- `node --check app-bundled.js` — PASS
- `tests/smoke.mjs` — PASS
- bundled suffix matches `app.js` exactly — PASS
- authentication resources/references removed — PASS
- CSS brace balance — PASS
- taxonomy metadata retained: 47 ELRs, 3,616 elements, 4,092 presentation relationships, 1,051 calculation relationships, 2,967 definition relationships — PASS
- supplied `Specific rules for elements` dataset retained in bundle — PASS

## V13-specific regression checks

- V13 project key present — PASS
- V12 and earlier migration keys present — PASS
- ISO 4217 namespace declaration — PASS
- `unitNumerator` / `unitDenominator` generation code — PASS
- scenario emitted after period in context construction — PASS
- fact-footnote locator/resource labels and arcrole — PASS
- string items emitted as text rather than arbitrary child markup — PASS
- rich-text whitelist includes the explicitly permitted `align` attribute — PASS
- removed client-side login overlay and `auth.js` — PASS

## Environment limitation

A live browser run was not completed in this build environment. Earlier attempts to exercise the static application with Chromium/Playwright were blocked by the execution environment. The official MCA XBRL Validation Tool V5.1 desktop application was also not available for execution here.

Therefore this report does **not** claim:

- a live browser acceptance test;
- an official MCA V5.1 Validate pass;
- an official MCA Pre-scrutiny pass;
- filing acceptance by MCA.

## Recommended acceptance suite

Use representative instances covering standalone, consolidated, current/prior, dimensional tables, Boolean facts, rich text, footnotes, per-share units, 400100 applicability, imported previous-year XML and multiple-dimensional occurrences.

For each representative instance, require zero blocking errors in V13, then run MCA V5.1 Validate + Pre-scrutiny and compare the resulting PDF/output to the source financial statements.
