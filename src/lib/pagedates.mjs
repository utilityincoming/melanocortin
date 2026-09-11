// Build-time freshness dates for pages, keyed by URL pathname.
//
// The site shows only year-level dates to readers (editorial policy: no false
// precision in the byline). But crawlers benefit from a genuine, precise
// last-modified signal, so we derive one here from each page's last git commit
// date and feed it to the sitemap <lastmod> and the JSON-LD `dateModified`.
// This is a machine-only signal; nothing here is rendered into the byline.
//
// Why there is a committed manifest (src/data/pagedates.json):
// Vercel builds from a SHALLOW clone. In a shallow clone `git log -1 -- file`
// returns the graft boundary commit for every file whose real last change lies
// beyond the clone depth, so most pages ended up sharing one identical date
// (33 of 46 URLs read 2026-08-27 on the live sitemap). Google discounts
// <lastmod> once it looks synthetic, which defeats the point. So:
//
// Resolution order per page:
//   1. git, but only when the answer is trustworthy (the commit has a parent,
//      i.e. it is not a shallow boundary), else
//   2. the committed manifest generated from full history by
//      `npm run pagedates`, else
//   3. file mtime, else a fixed fallback.
// Everything is wrapped so a missing git history degrades gracefully.

import { execSync } from 'node:child_process';
import { readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

// The build (and dev) always runs from the project root, and unlike
// import.meta.url this stays correct after Vite bundles this module into a
// component chunk — so the sitemap and BaseLayout resolve the same paths.
const ROOT = process.cwd();
const MANIFEST = 'src/data/pagedates.json';
const FALLBACK = '2026-01-01';
const cache = new Map();

let manifest = null;
function readManifest() {
  if (manifest) return manifest;
  try {
    manifest = JSON.parse(readFileSync(join(ROOT, MANIFEST), 'utf8'));
  } catch {
    manifest = {};
  }
  return manifest;
}

/** Candidate source files for a given URL pathname, most-specific first. */
export function candidateFiles(pathname) {
  const clean = pathname.replace(/^\/+|\/+$/g, '');
  if (clean === '') return ['src/pages/index.astro'];
  return [
    `src/pages/${clean}.astro`,
    `src/pages/${clean}/index.astro`,
    `src/pages/${clean}.mdx`,
    `src/pages/${clean}.md`,
  ];
}

/**
 * Last commit date for `file`, or null when git can't answer reliably.
 * A commit with no parent is either the repo root or a shallow-clone graft
 * boundary; in both cases the date is not evidence of when the page changed.
 */
export function gitDate(file, { trustRoot = false } = {}) {
  try {
    const out = execSync(`git log -1 --format=%cI%n%P -- "${file}"`, {
      cwd: ROOT,
      stdio: ['ignore', 'pipe', 'ignore'],
    })
      .toString()
      .trim();
    if (!out) return null;
    const [date, parents = ''] = out.split('\n');
    if (!parents.trim() && !trustRoot) return null;
    return date.slice(0, 10); // YYYY-MM-DD
  } catch {
    return null;
  }
}

function fsDate(file) {
  try {
    return statSync(join(ROOT, file)).mtime.toISOString().slice(0, 10);
  } catch {
    return null;
  }
}

/** ISO (YYYY-MM-DD) last-modified date for the page at `pathname`. */
export function lastmod(pathname) {
  if (cache.has(pathname)) return cache.get(pathname);
  const key = pathname.replace(/\/+$/, '') || '/';
  let date = null;
  for (const file of candidateFiles(pathname)) {
    date = gitDate(file);
    if (date) break;
  }
  date ??= readManifest()[key] ?? null;
  if (!date) {
    for (const file of candidateFiles(pathname)) {
      date = fsDate(file);
      if (date) break;
    }
  }
  const result = date ?? FALLBACK;
  cache.set(pathname, result);
  return result;
}
