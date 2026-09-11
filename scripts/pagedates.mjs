// Regenerate src/data/pagedates.json: one precise last-modified date per page
// URL, from FULL git history. Vercel builds from a shallow clone where git
// can't answer for most files, so the build falls back to this manifest.
//
//   npm run pagedates          (run after content changes; commit the result)
//
// Refuses to run in a shallow clone, since that would bake in the same bogus
// boundary dates the manifest exists to avoid.

import { execSync } from 'node:child_process';
import { readdirSync, statSync, writeFileSync, readFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { gitDate } from '../src/lib/pagedates.mjs';

const ROOT = process.cwd();
const OUT = join(ROOT, 'src/data/pagedates.json');
const PAGES = join(ROOT, 'src/pages');

const shallow = execSync('git rev-parse --is-shallow-repository', { cwd: ROOT }).toString().trim();
if (shallow === 'true') {
  console.error('pagedates: refusing to regenerate from a shallow clone (git fetch --unshallow first)');
  process.exit(1);
}

const files = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(astro|mdx?)$/.test(name)) files.push(p);
  }
})(PAGES);

const dates = {};
for (const abs of files) {
  const rel = relative(ROOT, abs).split(sep).join('/');
  let route = relative(PAGES, abs).split(sep).join('/').replace(/\.(astro|mdx?)$/, '');
  if (route === '404') continue;
  route = route.replace(/(^|\/)index$/, '');
  const key = route ? `/${route}` : '/';
  const date = gitDate(rel, { trustRoot: true });
  if (date) dates[key] = date;
}

const sorted = Object.fromEntries(Object.entries(dates).sort(([a], [b]) => a.localeCompare(b)));
const next = JSON.stringify(sorted, null, 2) + '\n';
let prev = '';
try {
  prev = readFileSync(OUT, 'utf8');
} catch {}
writeFileSync(OUT, next);
console.log(`pagedates: ${Object.keys(sorted).length} pages → ${relative(ROOT, OUT)}${prev === next ? ' (unchanged)' : ''}`);
