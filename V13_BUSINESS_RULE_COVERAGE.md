# V13 Business Rule Coverage

## Source loaded

The package embeds the complete supplied C&I Business Rules V1.3 workbook, including:

- Specific rules for elements
- Generic rules
- Mandatory Line Items
- Parent/child calculation exemptions
- Parent/child member dimensional exemptions
- Applicable ELR material
- Country codes
- Change-log material

The bundled rule dataset contains the same 4,146-row `Specific rules for elements` source used for V12.

## Deterministic checks in V13

V13 directly evaluates these families where the supplied text can be mapped safely to the browser state:

- unconditional and conditional mandatory rules
- current/prior pairing rules
- standalone/consolidated wording that can be resolved from the filing profile
- non-negative constraints
- percentage upper limits
- system-date limits
- CIN, DIN and PAN format checks
- country-list checks
- uniqueness checks within the local filing state
- filing-company difference checks for specified CIN/PAN rules
- common equality / lower / upper comparison wording
- taxonomy calculation-link consistency
- supplied generic currency, two-decimal and current/prior checks
- dimensional context integrity and default-member checks
- selected ELR applicability controls, including [400100]

## Review-gate behavior

Where a rule depends on information the browser does not possess reliably—such as external professional-body association data, complex multi-table semantic relationships, company-status facts not entered in the profile, or other special-record relationships—the original rule text is retained and surfaced as a warning/review item.

This is intentional. V13 does not silently treat an unimplemented rule as passed.

## Commercial acceptance boundary

The supplied workbook supports the requirement to consider all rule text. It does not by itself provide a universal machine-readable grammar for every natural-language clause. Therefore the correct acceptance test remains:

1. run V13 local checks;
2. generate the XBRL instance;
3. run MCA XBRL Validation Tool V5.1 Validate;
4. run MCA Pre-scrutiny;
5. review PDF output for representative filings.

A future version can convert additional review-gate families into deterministic evaluators as representative MCA error messages/test instances are collected.
