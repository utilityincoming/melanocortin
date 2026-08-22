// Build-time freshness dates for pages, keyed by URL pathname.
//
// The site shows only year-level dates to readers (editorial policy: no false
// precision in the byline). But crawlers benefit from a genuine, precise
// last-modified signal, so we derive one here from each page's last git commit
// date and feed it to the sitemap <lastmod> and the JSON-LD `dateModified`.
// This is a machine-only signal; nothing here is rendered into the byline.
//
// Resolution order per page: last git commit date -> file mtime -> a fixed
// fallback. Everything is wrapped so a missing git history (e.g. a shallow CI
// checkout) degrades gracefully instead of breaking the build.

import { execSync } from 'node:child_process';
import { statSync } from 'node:fs';
import { join } from 'node:path';

// The build (and dev) always runs from the project root, and unlike
// import.meta.url this stays correct after Vite bundles this module into a
// component chunk — so the sitemap and BaseLayout resolve the same paths.
const ROOT = process.cwd();
const FALLBACK = '2026-01-01';
const cache = new Map();

/** Candidate source files for a given URL pathname, most-specific first. */
function candidateFiles(pathname) {
  const clean = pathname.replace(/^\/+|\/+$/g, '');
  if (clean === '') return ['src/pages/index.astro'];
  return [
    `src/pages/${clean}.astro`,
    `src/pages/${clean}/index.astro`,
    `src/pages/${clean}.mdx`,
    `src/pages/${clean}.md`,
  ];
}

function gitDate(file) {
  try {
    const out = execSync(`git log -1 --format=%cI -- "${file}"`, {
      cwd: ROOT,
      stdio: ['ignore', 'pipe', 'ignore'],
    })
      .toString()
      .trim();
    return out ? out.slice(0, 10) : null; // YYYY-MM-DD
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
  let date = null;
  for (const file of candidateFiles(pathname)) {
    date = gitDate(file) ?? fsDate(file);
    if (date) break;
  }
  const result = date ?? FALLBACK;
  cache.set(pathname, result);
  return result;
}
