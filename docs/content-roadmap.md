# Content roadmap & copy notes

A working editorial backlog for melanocortin.com. It has two jobs:

1. **Suggest content** — pages the site doesn't have yet but the field (and the
   pipeline data the site already tracks) clearly justifies.
2. **Note copy improvements** — specific, optional refinements to prose that is
   already in good shape, kept as *proposals* rather than silent rewrites so an
   editor can accept or reject each one.

Everything here is a suggestion. Nothing ships without the same bar every page
meets: a byline, a dated last-update, numbered citations, and plain statements
of uncertainty (see `/about`).

---

## 1. New pages the pipeline already implies

The `/pipeline` table lists agents and indications that currently have **no
dedicated page** — a reader who clicks through lands on a shared page where the
agent is only mentioned in passing. Each of these is a real, citeable page.

### High priority

- **`/atumelnant` (CRN04894) — the first clinical MC2R *antagonist*.**
  The pipeline routes Atumelnant to `/receptors/mc2r`, but it deserves its own
  page: it is the clearest example on the whole site of *blocking* a melanocortin
  receptor as a therapeutic strategy, in contrast to the agonists that dominate
  the field. Indications (congenital adrenal hyperplasia and ACTH-dependent
  Cushing's) tie directly into MC2R/ACTH biology the site already explains.
  A dedicated page also balances the "melanocortin = agonist" framing with the
  antagonist side of the ledger.

- **`/congenital-adrenal-hyperplasia` — a condition page.**
  CAH is Atumelnant's lead indication and a textbook MC2R/ACTH-axis disease, yet
  there is no condition page for it. It pairs naturally with the existing
  `/addisons-disease` page (loss vs. excess of the same axis) and gives the MC2R
  receptor page a downstream "what breaks" link, matching the pattern every other
  receptor page follows.

- **`/cushings-disease` — a condition page.**
  Same rationale: ACTH-dependent Cushing's is an MC2R-axis disease and a named
  pipeline indication. It is the natural counterpart to the adrenal-insufficiency
  pages and closes the loop on "too much ACTH signalling."

### Medium priority

- **`/dry-eye-disease`** — PL-9643's indication; the melanocortin
  anti-inflammatory story on the ocular surface. Currently only reachable via the
  drug page `/pl-9643`.
- **`/ulcerative-colitis`** — PL-8177's indication; gut mucosal
  resolution/inflammation, which connects to the existing `/inflammation` and
  `/resomelagon` resolution-pharmacology themes.
- **`/systemic-sclerosis`** — dersimelagon's immunology indication (diffuse
  cutaneous systemic sclerosis), currently only a line on `/therapeutics`.
- **`/membranous-nephropathy`** — one of resomelagon's indications and a
  historically interesting ACTH/corticotropin indication; good anchor for the
  "why corticotropin, mechanistically" question.

### Lower priority / watchlist

- **`/rm-718`** and **`/pl-7737`** — currently folded into `/bivamelagon` and
  `/glp1-appetite` respectively. Promote to their own pages only if/when each has
  enough distinct, citeable trial data to carry one; until then the current
  grouping is the honest call.
- **`/710go` (dual MC3R/MC4R agonists)** — folded into `/receptors/mc3r`.
  Worth a page if dual-agonism becomes a distinct story rather than a sub-section.

---

## 2. Condition & concept pages worth considering

Beyond the pipeline, these fill gaps in the "Conditions & questions" cluster and
are strong search-intent targets:

- **`/sarcoidosis` and `/multiple-sclerosis-relapse`** — the two best-known
  repository-corticotropin (Acthar) indications. The site explains corticotropin
  on `/therapeutics#corticotropin`; a condition page each would catch readers
  searching the disease rather than the drug.
- **`/red-hair-mc1r`** — MC1R variant biology (the "R alleles"), freckling, UV
  response, and the MC1R–pain link the site already covers at `/mc1r-pain`.
  High-interest, high-search, squarely on-topic for pigmentation.
- **`/melanotan-safety`** or a clearly-scoped explainer on *why* grey-market
  melanotan II is risky (mechanism-level, not a protocol) — the site's editorial
  stance makes this a natural, differentiated page versus the forums. Must stay
  strictly education-not-sourcing per the `/about` standards.
- **`/mc3r` physiology deep-dive** — MC3R is the least-understood receptor;
  a focused page on its emerging roles (fasting response, timing of puberty,
  rhythm) would be genuinely under-served content.

Each should follow the existing condition-page shape (lede → mechanism →
what the pipeline is doing → key takeaways → FAQ) so it slots into the site
without new patterns.

---

## 3. Enhancements to existing pages

- **Interlink the adrenal cluster.** `/receptors/mc2r`, `/acth`,
  `/addisons-disease`, and any new CAH/Cushing's pages should cross-link as a
  tight neighbourhood (the way the appetite pages already do). The MC2R page is
  currently the catch-all for several pipeline agents that would be better served
  by their own pages plus a short MC2R "see also."
- **Pipeline → page coverage check.** Add a lightweight note/convention that
  every `pipeline.ts` entry whose `href` points at a *shared* page is a candidate
  for a dedicated page, so the backlog above stays current as the table grows.
- **"Antagonists" as a first-class theme.** The site leans agonist-forward.
  SHU9119, PF-07258669, AgRP/ASIP, and Atumelnant are all antagonism stories; a
  short hub page or a clearer thread tying them together would sharpen the
  mechanism coverage.

---

## 4. Copy notes (proposals, not silent edits)

The site's prose is already tight, cited, and consistent in voice. These are
small, optional refinements — listed so an editor can take or leave each:

- **README opener.** *(Applied.)* The lede's second sentence was a long,
  em-dash-chained run; it is now split into three shorter sentences that keep
  every fact and the manifesto voice while easing the longest run. The rest of
  the README is left as-is deliberately — its density is part of the voice.
- **Consistency to keep enforcing.** Dates to the year only; "Last updated" vs.
  "Last reviewed" kept strictly distinct; grey-market compounds described as
  pharmacology, never products. These are already the house style in `/about` —
  worth a periodic grep when new pages land.
- **Homepage stat framing.** "3 in 24 months (2019–2020)" is accurate and
  compelling; if a future reviewer wants it airtight, note that the three
  approvals span mid-2019 to late-2020, which the phrasing already allows.

---

*This file is editorial planning, not published content. Move an item up only
when there is enough primary-source material to meet the page bar.*
