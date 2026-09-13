# MCA C&I XBRL Workbench V13 — Release Notes

## V13 focus

V13 uses the supplied research as an implementation guide while keeping the application static, local-first and GitHub Pages compatible.

### Authentication removed

- Removed the client-side login requirement completely.
- Removed `auth.js` and the login overlay from the package.
- The application opens directly into the Dashboard.
- This is intentionally not a security boundary; server-backed authentication remains a future commercial deployment layer.

### XBRL instance hardening

- Retains the prescribed MCA C&I 2016 `schemaRef` URI.
- Adds the ISO 4217 namespace declaration required by `iso4217:INR` units.
- Keeps current-year and prior-year contexts and prunes unused contexts at generation time.
- Emits `xbrli:scenario` after `xbrli:period`, with taxonomy-defined explicit members.
- Uses XBRL divide-unit children `unitNumerator` / `unitDenominator` for per-share units.
- Prevents duplicate concept/context facts across ordinary and dimensional occurrences.
- Continues to emit fact IDs and `decimals`, never `precision`/`scale`.
- Retains UTF-8 XML output and `xml:lang="en"` for string/text facts.
- Footnote relationships now use locator/resource labels and a fact-footnote `xlink:arcrole`.

### Business-rule coverage

- Continues to embed the complete supplied MCA Business Rules workbook.
- V13 evaluates specific rules for both current and prior data.
- Adds explicit processing of the supplied generic-rule material for currency, monetary precision and current/prior pairing.
- Adds safer dimensional-context checks: missing axis/member, repeated axis, unknown taxonomy QNames and explicit default members.
- Adds supplied `[400100]` applicability gating and a standalone review check for consolidated-only minority-interest disclosure.
- Retains the original MCA rule text and surfaces clauses that cannot be safely reduced to local-only checks.

**Important:** V13 does not claim that every one of the 4,146 rule rows has been converted into a deterministic semantic evaluator. Complex company-status, multi-table dimensional, external-database and highly specific cross-record rules remain visible as review items and must be confirmed by official MCA validation/pre-scrutiny.

### HTML / data preservation

- Strict MCA whitelist validation remains in place.
- Unsupported tags, attributes, classes, entities and formatting are blocked rather than silently removed.
- `align` is accepted alongside the previously implemented approved attributes.
- The editor keeps the user's original content intact until the user explicitly corrects invalid HTML.
- Footnote text is included in the same validation path.

### Project portability

- New browser key: `mcaCniXbrlProjectV13`.
- V13 automatically migrates an existing V12/V11/V10/V9/V8/V6 browser project when a V13 project is not already present.
- Portable project files carry `appVersion`, `projectFormat` and `savedAt` metadata.
- Restored legacy project files are normalized to the V13 state shape without replacing the bundled taxonomy/rule dataset.

### CI/QA

- Added `tests/smoke.mjs` for release regression checks.
- Added `.github/workflows/qa.yml` to run JavaScript syntax and smoke checks on push/pull request.
- Official MCA XBRL Validation Tool V5.1 is still an external acceptance step and was not executed in this build environment.
