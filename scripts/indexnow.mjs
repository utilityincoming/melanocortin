// IndexNow — push changed URLs to Bing / Yandex / Naver / Seznam the moment a
// deploy lands, instead of waiting for them to re-read the sitemap.
//
// Why: the site's crawl bottleneck is demand, not discoverability (every page
// is in the sitemap and one click from the homepage). IndexNow is the one
// programmatic "please crawl this now" that exists. It does NOT reach Google.
//
// Protocol (https://www.indexnow.org/documentation): a public key file lives at
// the site root (public/<key>.txt containing the key) and we POST
// { host, key, keyLocation, urlList } to api.indexnow.org, which fans out to
// every participating engine. The key is intentionally public — it only proves
// we control the host — so committing it is fine.
//
// Usage:
//   node scripts/indexnow.mjs            # URLs with sitemap <lastmod> in the last 7 days
//   node scripts/indexnow.mjs --days 30  # widen the window
//   node scripts/indexnow.mjs --all      # the whole sitemap (first run, or after a rebuild)
//   node scripts/indexnow.mjs --dry-run  # print what would be sent, send nothing
//
// The URL set comes from the LIVE sitemap, so run this after the deploy is up;
// the GitHub Action in .github/workflows/indexnow.yml does that on every push
// to main.

const SITE = 'https://melanocortin.com';
const HOST = 'melanocortin.com';
const KEY = '8cec9a94d0fd488e3f34370b7cbfb502';
const KEY_LOCATION = `${SITE}/${KEY}.txt`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';

const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const opt = (name, fallback) => {
  const i = args.indexOf(name);
  return i !== -1 && args[i + 1] ? args[i + 1] : fallback;
};

const all = flag('--all');
const dryRun = flag('--dry-run');
const days = Number(opt('--days', '7'));

async function text(url) {
  const res = await fetch(url, { headers: { 'user-agent': 'melanocortin-indexnow/1.0' } });
  if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`);
  return res.text();
}

// Astro's sitemap integration emits sitemap-index.xml → sitemap-N.xml. Walk the
// index rather than hard-coding sitemap-0.xml so a future split still works.
async function readSitemap() {
  const index = await text(`${SITE}/sitemap-index.xml`);
  const children = [...index.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const entries = [];
  for (const child of children) {
    const xml = await text(child);
    for (const m of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
      const loc = m[1].match(/<loc>([^<]+)<\/loc>/)?.[1];
      const lastmod = m[1].match(/<lastmod>([^<]+)<\/lastmod>/)?.[1];
      if (loc) entries.push({ loc: loc.trim(), lastmod: lastmod?.trim() ?? null });
    }
  }
  return entries;
}

async function verifyKeyFile() {
  const body = (await text(KEY_LOCATION)).trim();
  if (body !== KEY) throw new Error(`key file at ${KEY_LOCATION} does not contain the key`);
}

async function main() {
  try {
    await verifyKeyFile();
  } catch (err) {
    // Before the first deploy that ships the key file, a dry run should still
    // show the URL set; a real submission would be rejected, so keep failing.
    if (!dryRun) throw err;
    console.warn(`warning: ${err.message} (dry run continues)`);
  }
  const entries = await readSitemap();
  const cutoff = Date.now() - days * 86_400_000;
  const selected = all
    ? entries
    : entries.filter((e) => e.lastmod && new Date(e.lastmod).getTime() >= cutoff);
  const urlList = selected.map((e) => e.loc);

  console.log(
    `sitemap: ${entries.length} URLs · selected: ${urlList.length}` +
      (all ? ' (all)' : ` (lastmod within ${days}d)`),
  );
  for (const u of urlList) console.log(`  ${u}`);

  if (urlList.length === 0) {
    console.log('nothing to submit');
    return;
  }
  if (dryRun) {
    console.log('dry run — not submitted');
    return;
  }

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
  });
  // 200 = OK, 202 = accepted / key validation pending. Anything else is a bug
  // in the payload or the key file, so fail the run loudly.
  const detail = await res.text();
  console.log(`IndexNow → HTTP ${res.status}${detail ? ` ${detail}` : ''}`);
  if (res.status !== 200 && res.status !== 202) process.exit(1);
}

main().catch((err) => {
  console.error(err.message ?? err);
  process.exit(1);
});
