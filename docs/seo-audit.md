# SEO audit — meta titles & descriptions

_Audit date: 2026-11-01 · Scope: every route in `src/pages/` · Site: melanocortin.com_

This audit looks only at the two levers that most directly shape how a page
appears in search results and how often it earns a click: the `<title>` and the
meta `description`. The underlying technical SEO is already in good shape (see
[What's already right](#whats-already-right)); the opportunities are in the copy
that renders into the SERP.

## TL;DR

| Finding | Severity | Pages affected |
| --- | --- | --- |
| 1. Titles exceed the ~60-char SERP budget | **High** | 39 of ~60 |
| 2. Meta descriptions far exceed the ~160-char display limit | **High** | 56 of ~60 |
| 3. Brand suffix ` — melanocortin.com` spends 19 chars of title budget on every content page | Medium | all `PageLayout` pages (~50) |
| 4. A few titles are thin/generic (`Glossary`, `Editorial standards`) | Low | 2–3 |
| 5. `receptors/[mc].astro` stub route is dormant but would ship thin, indexable pages if re-enabled | Low (latent) | 0 today |

Findings 1–3 are the same root problem seen from two angles: the site writes
**titles and ledes as full editorial sentences**, and those sentences overflow
what Google renders. The team has already started fixing this for descriptions
(recent commits tightened `afamelanotide`, `bivamelagon`, `resomelagon`); this
audit maps the remaining work.

---

## Finding 1 — Titles overflow the SERP

**What Google shows:** roughly the first **~580 px**, which works out to about
**60 characters** for a typical title. Everything past that is replaced with an
ellipsis, and Google may rewrite an over-long title on its own.

**What we have:** 39 of ~60 rendered titles are over 60 characters; the longest
is 121. Because `PageLayout` appends ` — melanocortin.com` (19 chars), an
article title only has ~41 characters of usable budget before the brand — and on
the long titles the brand is the first thing truncated away, so the suffix costs
budget without ever being seen.

A second problem compounds it: the site's title pattern is
`Term (full expansion): descriptive clause`. The parenthetical expansion plus
the clause push the **distinguishing keywords to the back**, exactly where the
truncation falls. On `α-MSH (alpha-melanocyte-stimulating hormone): the body's
broad-spectrum melanocortin signal`, a searcher sees `α-MSH (alpha-melanocyte-
stimulating hormone): the body's broad-spec…` — the payload is cut.

### Worst offenders (rendered length incl. suffix)

| Chars | Page | Current title |
| ---: | --- | --- |
| 121 | `oral-peptides` | Why oral and sublingual peptides mostly don't work: route, bioavailability, and the case for injection |
| 110 | `alpha-msh` | α-MSH (alpha-melanocyte-stimulating hormone): the body's broad-spectrum melanocortin signal |
| 109 | `tcmcb07` | TCMCB07 (mifomelatide): the MC4R antagonist that treats wasting — setmelanotide in reverse |
| 106 | `bremelanotide` | Bremelanotide (PT-141): from a tanning peptide's side effect to an approved desire drug |
| 103 | `beta-msh` | β-MSH (beta-melanocyte-stimulating hormone): the POMC peptide tied to human appetite |
| 103 | `glp1-appetite` | How GLP-1 drugs (Ozempic, Wegovy) work on appetite — and the melanocortin connection |
| 100 | `pomc-deficiency` | POMC & leptin-receptor deficiency: when the appetite signal is missing from birth |
| 98 | `afamelanotide` | Afamelanotide (Scenesse): the approved drug that treats light by building a tan |
| 98 | `epp` | Erythropoietic protoporphyria: the light disease melanocortins learned to treat |
| 98 | `melanotan` | Melanotan and Melanotan II: what they are, why they tan you, and the real risks |

(Full list: 39 pages between 66 and 121 chars. Everything with a `<-- LONG`
flag in the generator output.)

### Recommendation

Two changes, in order of leverage:

1. **Trim or drop the brand suffix in `PageLayout`.** The title is not the only
   place the brand appears — Google renders the site name separately from the
   favicon/`og:site_name`/breadcrumb (`WebSite` schema is already emitted). Dropping
   ` — melanocortin.com` from content-page `<title>` tags returns 19 characters to
   every page for a one-line edit in `src/layouts/PageLayout.astro`. (Keep the
   brand on the home page and the hub/landing pages if desired.)

2. **Front-load keywords and cut the editorial clause** on titles still over ~60
   after step 1. Keep the recognisable name and the primary query term; move the
   "story" into the description/lede where it already lives. Suggested rewrites:

   | Page | Proposed title (≤ ~60) |
   | --- | --- |
   | `oral-peptides` | Why oral & sublingual peptides don't work |
   | `alpha-msh` | α-MSH (alpha-MSH): the broad-spectrum melanocortin |
   | `tcmcb07` | TCMCB07 (mifomelatide): the MC4R antagonist for wasting |
   | `bremelanotide` | Bremelanotide (PT-141): the approved desire drug |
   | `beta-msh` | β-MSH (beta-MSH): the appetite-linked POMC peptide |
   | `glp1-appetite` | GLP-1 drugs, appetite & the melanocortin connection |
   | `pomc-deficiency` | POMC & leptin-receptor deficiency obesity |
   | `afamelanotide` | Afamelanotide (Scenesse): the MC1R drug for EPP |
   | `epp` | Erythropoietic protoporphyria (EPP) & melanocortins |
   | `melanotan` | Melanotan & Melanotan II: how they tan, and the risks |
   | `acth` | ACTH: the melanocortin that runs the stress axis |
   | `asip` | ASIP (agouti protein): the pigment off-switch |
   | `gamma-msh` | γ-MSH (gamma-MSH): the MC3R-selective melanocortin |
   | `setmelanotide` | Setmelanotide (Imcivree): the MC4R obesity drug |
   | `sexual-function` | Melanocortins & sexual function: desire in the brain |
   | `shu9119` | SHU9119: the MC4R antagonist that maps appetite |
   | `bardet-biedl` | Bardet–Biedl syndrome & the MC4R appetite circuit |
   | `hypothalamic-obesity` | Hypothalamic obesity: the broken hunger brake |
   | `melanocortin-agonists` | Melanocortin agonists: the drugs that switch it on |
   | `structures` | What a melanocortin receptor looks like |

   These are starting points, not final copy — they preserve the house voice
   while putting the queryable term first and fitting the budget. The remaining
   long titles (`vitiligo`, `binding-matrix`, `resomelagon`, `addisons-disease`,
   `pf-07258669`, `bivamelagon`, `cachexia`, `pomc`, `topical-tanning`,
   `pipeline`, `pl-9643`, `effects`, `receptor-antibodies`, `pt-141-vs-melanotan`,
   `dose-curve`, `dersimelagon`, `pl-8177`, `agrp`, `selectivity`) follow the
   same recipe.

---

## Finding 2 — Meta descriptions are 1.3×–2.3× too long

**What Google shows:** roughly **155–160 characters** of description before
truncation (a little more on mobile, less when a date prefix is shown).

**What we have:** 56 of ~60 descriptions exceed 160 characters; the median is
~270 and the longest (`sexual-function`) is **368**. Every one of these is
truncated in the SERP, and the cut usually lands mid-sentence.

Longest offenders:

| Chars | Page |
| ---: | --- |
| 368 | `sexual-function` |
| 335 | `bremelanotide` |
| 333 | `cachexia` |
| 325 | `asip` |
| 324 | `topical-tanning` |
| 319 | `addisons-disease` |
| 313 | `pl-8177`, `vitiligo` |
| 312 | `receptor-antibodies` |

**Important coupling — this is an editorial change, not a mechanical one.** In
`PageLayout`, the `description` prop renders in **two** places: the
`<meta name="description">` tag *and* the visible `.page-lede` paragraph under
the H1. Shortening a description therefore also shortens the on-page lede. The
team's recent "tighten meta description" commits accepted exactly this — after
tightening, `afamelanotide`'s lede is a single 167-char sentence that reads
cleanly on the page. So the fix is good practice, but each rewrite needs an
editor's eye, not a find-and-replace.

### Recommendation

- **Target 150–160 characters** for the description/lede, leading with the
  answer. The three already-tightened pages (`afamelanotide` 167, `resomelagon`
  196, `bivamelagon` 205) are the model; nudge even those toward ~155.
- Work through the list by **traffic priority**, not alphabetically — the drug
  pages (`setmelanotide`, `bremelanotide`, `melanotan`, `afamelanotide`), the
  condition pages, and the hub pages first.
- If a longer on-page lede is wanted for reading flow, the cleanest structural
  fix is to **decouple the two**: add an optional `lede` prop to `PageLayout`
  that falls back to `description`, so the meta description can be a tight
  ~155-char summary while the visible lede stays as long as the editor likes.
  This removes the tension between SEO and prose for good. (Optional; the simple
  path is just to tighten both together as the team is already doing.)

---

## Finding 3 — The brand suffix (see Finding 1, rec 1)

Called out separately because it is the single highest-leverage edit: one change
in `src/layouts/PageLayout.astro` (`title={`${title} — melanocortin.com`}` →
`title={title}`) reclaims 19 characters on ~50 pages at once and brings a dozen
titles under budget without touching their copy. Google already derives the site
name from the `WebSite` JSON-LD and `og:site_name`, so nothing is lost.

---

## Finding 4 — A couple of thin/generic titles

- `glossary` → `Glossary — melanocortin.com` (27 chars). Accurate but spends no
  budget on intent. Consider `Melanocortin glossary: peptides, receptors & drugs`.
- `about` → `Editorial standards`. Fine for users; consider adding the brand
  context for the SERP, e.g. `Editorial standards & sourcing`.

Low priority — these pages are navigational, not acquisition targets.

---

## Finding 5 — Dormant stub route (latent)

`src/pages/receptors/[mc].astro` generates a page per receptor that lacks
`detailed: true`, with `description={receptor.name}` (e.g. "Melanocortin 3
receptor", ~23 chars) and a `status="Stub — full page in development"` banner.
**Today all five receptors are `detailed: true`, so this route emits zero
pages** — there is no live thin-content problem. Flagging it only so that if a
sixth receptor or a non-detailed entry is ever added, it doesn't silently ship a
thin, indexable stub. If that happens, give stubs a `<meta name="robots"
content="noindex,follow">` until the full page lands. `BaseLayout` has no
`robots`/`noindex` hook today; adding one would make this (and any future
intentionally-unindexed page) possible.

---

## What's already right

The technical foundation is solid and should not be disturbed:

- **Canonical URLs** on every page, `trailingSlash: 'never'`, routing and sitemap
  consistent with slash-free canonicals.
- **Sitemap with real per-URL `<lastmod>`** derived from git history — a genuine
  freshness signal, not a static stamp.
- **`robots.txt`** allows all and points at the sitemap index.
- **Open Graph + Twitter** cards complete, with a per-page OG image (manifest +
  `default.png` fallback) at the correct 1200×630.
- **JSON-LD graph** — `Organization`, `WebSite`, `WebPage`/`MedicalWebPage`,
  `BreadcrumbList`, plus `speakable` and `about`/`sameAs` entity grounding for
  answer engines. The `Drug` → `Substance` remap to dodge Google's Product
  rich-result validator is a nice touch.
- **Unique titles and descriptions** across all pages (no duplicate-meta issue).
- Static output, strong CSP and security headers.

---

## Suggested order of work

1. **Drop the brand suffix in `PageLayout`** (Finding 3) — one line, biggest single win.
2. **Rewrite the ~20 titles still over 60 chars** after step 1 (Finding 1, rec 2).
3. **Tighten descriptions to ~155 chars**, highest-traffic pages first (Finding 2) —
   optionally after adding a `lede`/`description` split so prose and SEO stop competing.
4. Polish the generic titles (Finding 4).
5. Add a `noindex` hook to `BaseLayout` for future stubs (Finding 5) — only if/when needed.
