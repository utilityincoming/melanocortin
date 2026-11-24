// Orphan + integrity guard for the related-reading graph.
//
// The content cluster links back on itself through src/data/related.ts:
//   PAGES   = one canonical {href,title,blurb} per destination slug
//   RELATED = adjacency list keyed by source slug
// A "Related reading" rail on each page is drawn from this graph. As pages are
// added or renamed, three failures creep in silently and only a reader (or a
// crawler) notices:
//   1. a RELATED source or target slug no longer maps to a real page file;
//   2. a RELATED target has no PAGES entry, so its card cannot render;
//   3. a PAGES destination is listed by nobody (in-degree 0) — an orphan that
//      is unreachable through the cluster.
// This guard reads the source graph directly (no build needed) and fails on
// any of the above. It also reports non-reciprocal edges as information: the
// graph is only meant to be *roughly* reciprocal, so those are a nudge, not an
// error.
//
// Run:  node scripts/check-related-graph.mjs
// Exit: 0 if clean, 1 if any hard failure.

import { readdirSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const { PAGES, RELATED } = await import(pathToFileURL(join(root, 'src/data/related.ts')).href);

// Build the set of real page slugs from src/pages. A slug is the route path
// without the leading slash: "foo.astro" -> "foo", "receptors/mc1r.astro" ->
// "receptors/mc1r", "receptors/index.astro" -> "receptors". Dynamic routes
// ("[mc].astro") and the home/404 pages are not graph destinations.
const pagesDir = join(root, 'src/pages');
const realSlugs = new Set(
  readdirSync(pagesDir, { recursive: true })
    .map((f) => String(f).replaceAll('\\', '/'))
    .filter((f) => f.endsWith('.astro'))
    .filter((f) => !f.includes('[') && f !== '404.astro' && f !== 'index.astro')
    .map((f) => f.replace(/\.astro$/, '').replace(/\/index$/, '')),
);

const errors = [];

// 1. Every RELATED source slug must be a real page.
for (const src of Object.keys(RELATED)) {
  if (!realSlugs.has(src)) errors.push(`RELATED source "${src}" has no page file in src/pages/`);
}

// 2. Every RELATED target must be a real page AND have a PAGES entry (to render).
for (const [src, targets] of Object.entries(RELATED)) {
  for (const t of targets) {
    if (!realSlugs.has(t)) errors.push(`"${src}" -> "${t}": target has no page file in src/pages/`);
    if (!(t in PAGES)) errors.push(`"${src}" -> "${t}": target has no PAGES entry (card cannot render)`);
  }
}

// 3. Every PAGES destination must be reached by at least one page (no orphans).
const indeg = {};
for (const targets of Object.values(RELATED)) for (const t of targets) indeg[t] = (indeg[t] || 0) + 1;
for (const slug of Object.keys(PAGES)) {
  if (!(indeg[slug] > 0)) errors.push(`orphan: PAGES entry "${slug}" has 0 inbound related-reading links`);
}

// Info only: non-reciprocal edges (A -> B but not B -> A).
const gaps = [];
for (const [a, targets] of Object.entries(RELATED))
  for (const b of targets) if (!(RELATED[b] || []).includes(a)) gaps.push(`${a} -> ${b}`);

if (gaps.length) {
  console.log(`related-graph: ${gaps.length} non-reciprocal edge(s) (informational):`);
  for (const g of gaps) console.log(`  · ${g}`);
}

if (errors.length) {
  console.error(`\nrelated-graph: ${errors.length} error(s):`);
  for (const e of errors) console.error(`  ✗ ${e}`);
  process.exit(1);
}

console.log(`related-graph: OK — ${Object.keys(PAGES).length} destinations, all reachable, no dangling refs.`);
