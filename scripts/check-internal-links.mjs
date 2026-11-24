// Broken internal-link guard for the built site.
//
// As the hub grows, cross-references between pages are easy to break: a page
// gets renamed or moved, but an <a href> pointing at its old path lingers.
// Nothing at build time catches that today — a dead internal link only shows
// up as a 404 for a reader (or a crawler, which is worse for an SEO-first
// reference site). This scans the *built* HTML and fails if any internal link
// points at a path the build did not emit.
//
// Run after `astro build`:  node scripts/check-internal-links.mjs
//
// What counts as internal: same-origin links — a root-relative "/foo", or an
// absolute "https://melanocortin.com/foo". External origins, mailto:, tel:,
// fragment-only "#x", and data: URIs are left alone. The site builds with
// `trailingSlash: 'never'` and `output: 'static'`, so "/foo" must resolve to
// a file "foo.html" (or "foo/index.html") in the output tree.

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const SITE = 'https://melanocortin.com';

const DIR = ['.vercel/output/static', 'dist'].find((d) => existsSync(d));
if (!DIR) {
  console.error('✗ No built HTML found. Run `npm run build` first.');
  process.exit(2);
}

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (name.endsWith('.html')) out.push(p);
  }
  return out;
}

const files = walk(DIR);

// The set of paths the build actually serves, normalised to a slash-free,
// extension-free form: "/foo/bar". The index becomes "/".
const served = new Set();
for (const file of files) {
  let rel = relative(DIR, file).replace(/\\/g, '/'); // e.g. foo/index.html
  rel = rel.replace(/\.html$/, '').replace(/\/index$/, '').replace(/^index$/, '');
  served.add('/' + rel === '/' ? '/' : '/' + rel);
}
// Also treat any emitted non-HTML asset (og images, robots, etc.) as served,
// and the public/ directory contents the adapter copies through, so links to
// files like /favicon.svg or /og/foo.png don't trip the check.
function walkAll(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walkAll(p));
    else out.push(p);
  }
  return out;
}
const assets = new Set(
  walkAll(DIR).map((f) => '/' + relative(DIR, f).replace(/\\/g, '/')),
);

const HREF = /<a\b[^>]*\shref="([^"]*)"/gi;

function normalise(path) {
  // Strip query and fragment, drop a trailing slash (site is slash-free).
  let p = path.split('#')[0].split('?')[0];
  if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1);
  return p === '' ? '/' : p;
}

let broken = 0;
const seen = new Set();

for (const file of files) {
  const html = readFileSync(file, 'utf8');
  const rel = relative(DIR, file).replace(/\\/g, '/');
  let m;
  while ((m = HREF.exec(html))) {
    let href = m[1].trim();
    if (!href) continue;

    // Skip hrefs built at runtime inside inline scripts/templates — a static
    // scan can't resolve `${...}`, `{{...}}` or `:path` placeholders.
    if (/\$\{|\{\{|[:*]\w/.test(href)) continue;

    // Resolve same-origin absolute URLs to their path; skip other origins.
    if (/^https?:\/\//i.test(href)) {
      if (!href.startsWith(SITE)) continue;
      href = href.slice(SITE.length) || '/';
    } else if (/^(mailto:|tel:|data:|javascript:)/i.test(href)) {
      continue;
    } else if (href.startsWith('#')) {
      continue; // in-page anchor
    } else if (!href.startsWith('/')) {
      continue; // relative or protocol-relative — not a root path we can verify
    }

    const path = normalise(href);
    if (served.has(path) || assets.has(path)) continue;

    const key = rel + ' -> ' + path;
    if (seen.has(key)) continue;
    seen.add(key);
    broken++;
    console.error(`  ${rel}: dead internal link -> ${href}`);
  }
}

if (broken) {
  console.error(
    `\n✗ ${broken} broken internal link(s) found — they point at paths the build did not emit. ` +
      `Fix the href or restore the target page.`,
  );
  process.exit(1);
}
console.log(`✓ No broken internal links — all same-origin hrefs resolve to a built page.`);
