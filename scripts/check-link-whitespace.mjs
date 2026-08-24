// Regression guard for the Astro inline-link whitespace bug.
//
// Astro strips the newline + indentation between flowing prose text and an
// inline <a> placed on its own source line, gluing "word<a>link</a>word" with
// no space. CSS cannot fix it (the space is absent from the DOM); the source
// must carry an explicit {' '} token. This guard scans the *built* HTML for
// the glued signatures and fails the build if any reappear — e.g. after a new
// page is added or prettier-plugin-astro reflows a link onto its own line.
//
// Run after `astro build`:  node scripts/check-link-whitespace.mjs
// The patterns below are chosen to have ZERO legitimate matches: block/card
// links compile to `>​<a`, citations to `</sup><a`, and nav rows to `</a><a`,
// none of which these patterns catch.

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const DIR = ['.vercel/output/static', 'dist'].find((d) => existsSync(d));
if (!DIR) {
  console.error('✗ No built HTML found. Run `npm run build` first.');
  process.exit(2);
}

const CHECKS = [
  { label: 'word/punctuation glued before a link', re: /[A-Za-z0-9,.:;)]<a / },
  { label: 'word glued after a link', re: /<\/a>[A-Za-z0-9(]/ },
  { label: 'bold/italic/code glued before a link', re: /<\/(?:em|strong|code|b|i)><a / },
];
// Widen match for a readable report once a line is known to offend.
const REPORT = [
  /[A-Za-z0-9,.:;)]<a [^>]*>[^<]*<\/a>/g,
  /<\/a>[A-Za-z0-9(]/g,
  /<\/(?:em|strong|code|b|i)><a [^>]*>[^<]*<\/a>/g,
];

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (name.endsWith('.html')) out.push(p);
  }
  return out;
}

let hits = 0;
for (const file of walk(DIR)) {
  const html = readFileSync(file, 'utf8');
  for (let i = 0; i < CHECKS.length; i++) {
    if (!CHECKS[i].re.test(html)) continue;
    for (const m of html.match(REPORT[i]) || []) {
      hits++;
      const rel = file.replace(DIR + '\\', '').replace(DIR + '/', '');
      console.error(`  ${rel}: …${m.slice(0, 90)}`);
    }
  }
}

if (hits) {
  console.error(`\n✗ ${hits} glued inline link(s) found. Add {' '} around the link in the source ` +
    `(see the hero <h1> or scripts/check-link-whitespace.mjs header).`);
  process.exit(1);
}
console.log('✓ No glued inline links — whitespace around links is intact.');
