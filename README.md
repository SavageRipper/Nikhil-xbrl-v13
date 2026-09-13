# MCA C&I XBRL Workbench — V13

V13 is a local-first, GitHub Pages-compatible preparation workbench for MCA C&I Taxonomy 2016 / Business Rules V1.3 filings.

## Reference basis

This build uses the supplied:

- MCA C&I Taxonomy 2016 V1.2 / 31-03-2016
- MCA C&I Business Rules V1.3 / 06-08-2016
- MCA Filing Manual
- MCA XBRL Validation Tool V5.1 / 02-12-2025
- the supplied V13 research summary covering XBRL instance generation, business-rule enforcement, HTML validation, project portability, CI/CD and future cloud architecture

## What changed in V13

### No login

V13 opens directly into the Workbench. The previous client-side authentication layer has been removed completely.

Because the application remains static and local-first, this is not a security boundary. A real multi-user commercial deployment should add server-backed authentication, authorization, audit logging, backup/versioning and appropriate data protection later.

### XBRL generation

V13 includes the previous compliance work plus these corrections:

- exact C&I 2016 schemaRef URI
- `http://www.mca.gov.in/CIN` context identifier scheme
- `in-gaap`, `in-ca`, `xbrldi` and ISO 4217 namespace declarations
- current and previous year base contexts
- period-before-scenario context structure
- taxonomy-defined explicit dimensions/members
- rejection of explicit default members
- used-unit generation for INR, shares, pure and INR-per-share
- `unitNumerator` / `unitDenominator` for divide units
- no `precision` or `scale`
- fact IDs
- duplicate fact suppression by concept/context
- UTF-8 XML declaration
- `xml:lang="en"` on string/text facts
- labeled fact-footnote arcs
- unused context/unit pruning through generation from referenced facts

The internal structural gate runs before download.

## Business rules

The complete supplied workbook is embedded in `app-bundled.js`. V13 evaluates a broad set of specific and generic rule families and retains original rule text for review-gate items that cannot be safely determined from browser-only data.

This is deliberately different from claiming that every natural-language clause has been transformed into an infallible semantic program. V13 is designed not to silently convert an unresolved MCA rule into a false pass.

## HTML and data preservation

MCA-restricted HTML validation is non-destructive:

- the editor accepts only the approved tag/class/attribute vocabulary used by this workbench;
- unsupported HTML is rejected;
- the entered content is not silently stripped or rewritten;
- the user receives the reason and must correct the content explicitly;
- XML generation is blocked while invalid rich text remains.

## Project storage and migration

Browser save key: `mcaCniXbrlProjectV13`.

At startup, V13 checks for an existing V13 project first. When none exists, it can migrate the first available project from these legacy keys:

`mcaCniXbrlProjectV12`, `V11`, `V10`, `V9`, `V8`, `V6`.

Portable project files include version metadata and can be restored through **Restore project**.

## MCA company / DIN lookup

The tool does not scrape MCA, bypass CAPTCHA, reuse authenticated sessions, or depend on an unofficial API. CIN and optional DIN are format-checked locally. The dashboard provides the official MCA portal route for human verification.

## GitHub Pages

The package remains static: `index.html`, `styles.css`, `app-bundled.js` and `app.js` are enough to run it. The rule CSVs are included as transparent reference material.

An optional GitHub Actions workflow is included at `.github/workflows/qa.yml` for syntax and smoke-regression checks.

## Validation boundary

The internal gate is not the MCA validator. V13 has not been certified by running the actual MCA V5.1 desktop application in this environment.

Before a filing is released, validate the generated XML through MCA XBRL Validation Tool V5.1, including Validate and Pre-scrutiny, and review the PDF output for representative cases.

## Deployment

1. Copy the package contents into the GitHub Pages repository root.
2. Publish the static site.
3. Open the Pages URL.
4. Complete the Dashboard filing profile.
5. Enter/import/tag filing data.
6. Run checks and resolve blocking errors.
7. Generate V13 XML.
8. Validate and pre-scrutinise it using MCA V5.1 before filing.
