import fs from 'node:fs';
import assert from 'node:assert/strict';

const app = fs.readFileSync(new URL('../app.js', import.meta.url), 'utf8');
const bundle = fs.readFileSync(new URL('../app-bundled.js', import.meta.url), 'utf8');
const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const css = fs.readFileSync(new URL('../styles.css', import.meta.url), 'utf8');

assert.match(app, /APP_VERSION='13\.0\.0'/);
assert.match(app, /PROJECT_KEY='mcaCniXbrlProjectV13'/);
assert.match(app, /MCA_SCHEMA_REF='http:\/\/www\.mca\.gov\.in\/XBRL\/2016\/07\/26\/Taxonomy\/CnI\/in-ci-ent-2016-03-31\.xsd'/);
assert.match(app, /xmlns:iso4217/);
assert.match(app, /xbrli:unitNumerator/);
assert.match(app, /xbrli:unitDenominator/);
assert.match(app, /xlink:arcrole.*fact-footnote/);
assert.match(app, /xlink:label/);
assert.match(app, /evaluateWorkbookGenericRules/);
assert.match(app, /evaluateDimensionalRules/);
assert.match(app, /evaluateElrApplicabilityRules/);
assert.match(app, /LEGACY_PROJECT_KEYS/);
assert.match(app, /mcaCniXbrlProjectV12/);
assert.match(app, /Nothing in the filing was intentionally removed/);
assert.match(app, /MCA_HTML_ATTRS=new Set\(\['class','colspan','rowspan','align'\]\)/);

for (const authToken of ['auth.js','MCAAuth','loginShell','authUserBadge','auth-locked','MCA-Admin@2026#X','Secure sign-in']) {
  assert.equal(html.includes(authToken), false, `index.html contains removed auth token: ${authToken}`);
  assert.equal(css.includes(authToken), false, `styles.css contains removed auth token: ${authToken}`);
  assert.equal(app.includes(authToken), false, `app.js contains removed auth token: ${authToken}`);
  assert.equal(bundle.includes(authToken), false, `app-bundled.js contains removed auth token: ${authToken}`);
}

const marker = bundle.indexOf('const state=');
assert.ok(marker > 0, 'bundle must contain the app source marker');
assert.equal(bundle.slice(marker), app, 'bundled app suffix must exactly match app.js');

const m = bundle.slice(0, marker);
assert.match(m, /"elrCount":47/);
assert.match(m, /"elementCount":3616/);
assert.match(m, /"presentationCount":4092/);
assert.match(m, /"calculationCount":1051/);
assert.match(m, /"definitionCount":2967/);
assert.match(m, /"Specific rules for elements"/);
assert.equal(fs.existsSync(new URL('../auth.js', import.meta.url)), false);

assert.match(html, /<script src="app-bundled\.js"><\/script>/);
assert.equal((html.match(/<script src=/g) || []).length, 1);
assert.equal(css.match(/\{/g)?.length, css.match(/\}/g)?.length, 'CSS braces must balance');

console.log('V13 smoke checks: PASS');
