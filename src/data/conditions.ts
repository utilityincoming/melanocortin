// The conditions map: every disease the melanocortin system is being used to
// treat (or plainly explains), sorted by how strong the evidence is today.
//
// This is the data behind /conditions. It is deliberately a hand-kept list and
// not derived from pipeline.ts: the pipeline is organised by drug, this is
// organised by disease, and the tier is an editorial call about the *condition*
// (an approval for one disease does not lift a sister indication with it).
// When a pipeline entry moves stage, move its condition here in the same PR.
//
// `href` points at the dedicated condition page where one exists; where it does
// not, it points at the best existing page and `dedicated` is false, which is
// the standing backlog of condition pages still to write.

export type Tier = 'approved' | 'late' | 'mid' | 'mechanism';

export interface TierMeta {
  id: Tier;
  title: string;
  blurb: string;
}

export const TIERS: TierMeta[] = [
  {
    id: 'approved',
    title: 'Approved',
    blurb:
      'A melanocortin drug is licensed for the condition. The mechanism has survived randomised trials and a regulator.',
  },
  {
    id: 'late',
    title: 'Late-stage',
    blurb:
      'A Phase 3 trial is running or has read out, with no approval for this condition yet. Close, but not proven.',
  },
  {
    id: 'mid',
    title: 'Mid-stage',
    blurb:
      'Phase 2 or earlier data in patients. Enough to take seriously, not enough to lean on — several of these have already had a miss.',
  },
  {
    id: 'mechanism',
    title: 'Mechanism, not medicine',
    blurb:
      'The melanocortin system explains the condition, but nothing here is a therapy. Included because the biology is too clean to leave out.',
  },
];

export interface Condition {
  name: string;
  tier: Tier;
  /** The receptor the approach runs through. */
  receptor: string;
  /** What is actually being done, in one line. */
  approach: string;
  /** The honest one-line state of play. */
  status: string;
  href: string;
  /** False when `href` is a shared page rather than a page about this condition. */
  dedicated: boolean;
}

export const CONDITIONS: Condition[] = [
  // ---- Approved ----------------------------------------------------------
  {
    name: 'Erythropoietic protoporphyria (EPP)',
    tier: 'approved',
    receptor: 'MC1R',
    approach: 'Afamelanotide implant builds protective pigment without sunlight',
    status: 'Approved 2019. An oral MC1R agonist, dersimelagon, is under FDA review.',
    href: '/epp',
    dedicated: true,
  },
  {
    name: 'POMC, PCSK1 & LEPR deficiency obesity',
    tier: 'approved',
    receptor: 'MC4R',
    approach: 'Setmelanotide replaces the missing satiety signal at the receptor',
    status: 'Approved 2020 — the first therapy for these rare genetic obesities.',
    href: '/pomc-deficiency',
    dedicated: true,
  },
  {
    name: 'Bardet–Biedl syndrome',
    tier: 'approved',
    receptor: 'MC4R',
    approach: 'Setmelanotide, for the obesity and hunger of a ciliopathy',
    status: 'Approved 2022.',
    href: '/bardet-biedl',
    dedicated: true,
  },
  {
    name: 'Acquired hypothalamic obesity',
    tier: 'approved',
    receptor: 'MC4R',
    approach: 'Setmelanotide activates the MC4R that survives hypothalamic injury',
    status: 'Approved 2026 on the Phase 3 TRANSCEND trial.',
    href: '/hypothalamic-obesity',
    dedicated: true,
  },
  {
    name: 'Hypoactive sexual desire disorder',
    tier: 'approved',
    receptor: 'MC4R',
    approach: 'Bremelanotide acts on central desire circuits, on demand',
    status: 'Approved 2019 for premenopausal women only.',
    href: '/sexual-function',
    dedicated: true,
  },
  {
    name: 'Symptomatic sarcoidosis',
    tier: 'approved',
    receptor: 'MC2R and others',
    approach: 'Repository corticotropin — an older ACTH preparation',
    status: 'A 1950s label. Modern trials are small; one placebo-controlled study was underpowered.',
    href: '/sarcoidosis',
    dedicated: true,
  },
  {
    name: 'Acute MS relapse',
    tier: 'approved',
    receptor: 'MC2R and others',
    approach: 'The same ACTH gel, for exacerbations rather than the disease itself',
    status: 'Labelled for adults. A 35-person trial in steroid non-responders favoured it on one scale.',
    href: '/multiple-sclerosis-relapse',
    dedicated: true,
  },
  {
    name: 'Infantile spasms',
    tier: 'approved',
    receptor: 'MC2R and others',
    approach: 'Repository corticotropin in infants under two',
    status: 'A long-standing label. No dedicated page yet — the drug is on the therapeutics page.',
    href: '/therapeutics#corticotropin',
    dedicated: false,
  },

  // ---- Late-stage --------------------------------------------------------
  {
    name: 'X-linked protoporphyria (XLP)',
    tier: 'late',
    receptor: 'MC1R',
    approach: 'Dersimelagon, studied alongside EPP in the same programme',
    status: 'Phase 3 met its primary endpoint; FDA decision expected early 2027.',
    href: '/dersimelagon',
    dedicated: false,
  },
  {
    name: 'Vitiligo',
    tier: 'late',
    receptor: 'MC1R',
    approach: 'Afamelanotide added to narrowband UVB phototherapy',
    status: 'Phase 3 fully enrolled; topline expected late 2026.',
    href: '/vitiligo',
    dedicated: true,
  },
  {
    name: 'Congenital adrenal hyperplasia',
    tier: 'late',
    receptor: 'MC2R',
    approach: 'An oral antagonist blocks ACTH at the adrenal',
    status: 'Pivotal adult Phase 3 enrolling; no results yet.',
    href: '/congenital-adrenal-hyperplasia',
    dedicated: true,
  },
  {
    name: 'Dry eye disease',
    tier: 'late',
    receptor: 'Pan-MCR',
    approach: 'PL-9643, a melanocortin agonist eye drop',
    status: 'First Phase 3 hit its symptom endpoint and missed its sign endpoint.',
    href: '/dry-eye-disease',
    dedicated: true,
  },

  // ---- Mid-stage ---------------------------------------------------------
  {
    name: 'Cushing’s disease (ACTH-dependent)',
    tier: 'mid',
    receptor: 'MC2R',
    approach: 'The same adrenal antagonist, paired with cortisol replacement',
    status: 'Small early-phase cohorts only.',
    href: '/cushings-disease',
    dedicated: true,
  },
  {
    name: 'Cachexia',
    tier: 'mid',
    receptor: 'MC4R',
    approach: 'MC4R antagonists lift the brake on appetite',
    status: 'Mifomelatide (TCMCB07) is in Phase 2 in cancer cachexia.',
    href: '/cachexia',
    dedicated: true,
  },
  {
    name: 'Ulcerative colitis',
    tier: 'mid',
    receptor: 'MC1R',
    approach: 'PL-8177, an oral agonist released in the colon',
    status: 'A positive but very small Phase 2; the programme is seeking a partner.',
    href: '/ulcerative-colitis',
    dedicated: true,
  },
  {
    name: 'Rheumatoid arthritis',
    tier: 'mid',
    receptor: 'MC1R / MC3R',
    approach: 'Resomelagon, an oral biased agonist aimed at resolving inflammation',
    status: 'Phase 2b missed its primary endpoint in 2026, with a subgroup signal.',
    href: '/rheumatoid-arthritis',
    dedicated: true,
  },
  {
    name: 'Systemic sclerosis',
    tier: 'mid',
    receptor: 'MC1R',
    approach: 'Dersimelagon, repurposed for inflammation and fibrosis',
    status: 'Phase 2 proof-of-concept.',
    href: '/systemic-sclerosis',
    dedicated: true,
  },
  {
    name: 'Membranous nephropathy',
    tier: 'mid',
    receptor: 'MC1R / MC3R',
    approach: 'Resomelagon, following an old ACTH clue in the kidney',
    status: 'Phase 2a — the earliest programme on this list.',
    href: '/membranous-nephropathy',
    dedicated: true,
  },
  {
    name: 'Common obesity',
    tier: 'mid',
    receptor: 'MC4R',
    approach: 'Low-dose MC4R agonism added to a GLP-1 drug',
    status: 'One positive Phase 2 combination study; the field has a history of misses.',
    href: '/glp1-appetite',
    dedicated: false,
  },

  // ---- Mechanism only ----------------------------------------------------
  {
    name: 'Addison’s disease (the bronzing)',
    tier: 'mechanism',
    receptor: 'MC1R',
    approach: 'None — excess ACTH is overheard by the skin',
    status: 'Treated with hormone replacement, not through this system.',
    href: '/addisons-disease',
    dedicated: true,
  },
  {
    name: 'Red hair and the MC1R alleles',
    tier: 'mechanism',
    receptor: 'MC1R',
    approach: 'None — loss-of-function alleles shift pigment from eumelanin to pheomelanin',
    status: 'Genetics of complexion and melanoma risk; no drug programme.',
    href: '/red-hair-mc1r',
    dedicated: true,
  },
  {
    name: 'Red hair, pain & anaesthesia',
    tier: 'mechanism',
    receptor: 'MC1R',
    approach: 'None — a pigment gene with a second job in the nervous system',
    status: 'Genetics and physiology; no drug programme.',
    href: '/mc1r-pain',
    dedicated: true,
  },
];

export interface Dropped {
  name: string;
  what: string;
  why: string;
  href: string;
}

// The programmes that were tried and stopped. Kept on the hub on purpose: a
// field that only lists its wins is a brochure.
export const DROPPED: Dropped[] = [
  {
    name: 'LY2112688',
    what: 'MC4R agonist for common obesity',
    why: 'Raised blood pressure and heart rate in a 2009 trial, which set the whole approach back a decade.',
    href: '/effects',
  },
  {
    name: 'Intranasal bremelanotide',
    what: 'Erectile dysfunction',
    why: 'Halted over blood-pressure increases; the drug was later reformulated as an injection for a different condition.',
    href: '/bremelanotide',
  },
  {
    name: 'PF-07258669',
    what: 'Oral MC4R antagonist for appetite loss',
    why: 'Stopped in Phase 1 in 2025 for a business decision, not a safety finding.',
    href: '/pf-07258669',
  },
];
