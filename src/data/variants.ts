import type { ReceptorId } from './ligands';

/** Citation shape. Structurally identical to the `Reference` interface consumed
 *  by <References>, so a variant's `sources` array drops straight into that
 *  component — but declared here to keep the data layer free of component deps. */
export interface Citation {
  authors: string;
  title: string;
  source: string;
  year: string;
  url: string;
}

/**
 * Gene / variant model for the melanocortin genetics layer.
 *
 * Scope: the leptin–melanocortin pathway genes that carry the two vulnerability
 * stories this site cares about — pigmentation / UV-skin risk (MC1R, ASIP) and
 * appetite / body-weight regulation (MC4R, POMC, LEPR, PCSK1). Several genes sit
 * on BOTH axes, which is the point: this is where "skin mutations" and "obesity
 * mutations" turn out to be the same pathway.
 *
 * RESEARCH-GRADE, NOT DIAGNOSTIC. Every row describes what the published
 * literature *associates* with a variant at the population level. Nothing here
 * is a personal risk score, and the UI must never present it as one. Genotype
 * questions about an individual belong with a genetic counsellor.
 *
 * Every `frequency` note and external ID (clinvar / dbSNP / OMIM) must be
 * verified against the live source before a variant is published — the seed
 * values below are starting points, not audited facts.
 */

/** Genes covered by the genetics layer. Superset of ReceptorId (the five
 *  receptors) plus the non-receptor pathway genes. */
export type Gene =
  | ReceptorId // 'MC1R' | 'MC2R' | 'MC3R' | 'MC4R' | 'MC5R'
  | 'POMC'
  | 'LEPR'
  | 'PCSK1'
  | 'ASIP'
  | 'AGRP'
  | 'MRAP';

/** Which vulnerability story the variant speaks to. `both` = genuinely
 *  pleiotropic (e.g. POMC deficiency: obesity + pigment + adrenal). */
export type Axis = 'skin' | 'metabolic' | 'adrenal' | 'both';

/** Molecular direction of effect on the gene product. */
export type Consequence =
  | 'loss-of-function'
  | 'partial-loss'
  | 'gain-of-function'
  | 'altered-signaling'
  | 'protective'
  | 'regulatory';

/** How the allele acts at the trait level. `risk-allele` = additive common
 *  variant, not Mendelian. */
export type Inheritance =
  | 'dominant'
  | 'recessive'
  | 'codominant'
  | 'risk-allele'
  | 'protective-allele';

/**
 * Honest strength-of-evidence tag. Drives a visible badge so readers can tell a
 * textbook variant from a single-cohort signal.
 *  - established: reproduced, mechanism understood, in clinical databases
 *  - strong:      multiple independent cohorts agree
 *  - emerging:    real but limited replication / small n
 *  - contested:   published both ways; effect size or direction disputed
 */
export type Evidence = 'established' | 'strong' | 'emerging' | 'contested';

export interface Variant {
  /** Stable slug, `<gene>-<protein-change>`, lowercase. */
  id: string;
  gene: Gene;
  /** Set when `gene` is one of the five receptors, so the page can link to
   *  /receptors/<slug>. Left undefined for POMC, LEPR, etc. */
  receptor?: ReceptorId;
  /** Canonical protein change, human-readable. e.g. 'p.Arg151Cys (R151C)'. */
  variant: string;
  /** dbSNP identifier, when one exists. */
  rsid?: string;
  /** Coding-level HGVS, optional (kept short in UI). */
  hgvs?: string;
  /** ClinVar variation ID / OMIM allelic-variant number for the reference tab. */
  clinvar?: string;
  omim?: string;
  axis: Axis;
  consequence: Consequence;
  inheritance: Inheritance;
  /** Qualitative population-frequency note. Prefer ancestry-aware phrasing over
   *  a single global AF. Verify vs gnomAD before publishing. */
  frequency: string;
  /** One-line phenotype association, population-level and non-diagnostic. */
  phenotype: string;
  /** Short mechanistic "why" — how the molecular change produces the trait. */
  mechanism: string;
  evidence: Evidence;
  /** Citations; drops straight into the <References> component. */
  sources: Citation[];
}

// ---------------------------------------------------------------------------
// Seed rows. Representative, not exhaustive — enough to exercise every field
// and cover both axes plus the pleiotropic middle. Expand per gene over time.
// ---------------------------------------------------------------------------

// Shared MC1R citations — the two papers that cover the whole allele series, so
// the page bibliography dedupes them rather than repeating one per variant.
const MC1R_VALVERDE: Citation = {
  authors: 'Valverde P, et al.',
  title: 'Variants of the melanocyte-stimulating hormone receptor are associated with red hair and fair skin.',
  source: 'Nat Genet',
  year: '1995',
  url: 'https://pubmed.ncbi.nlm.nih.gov/7581459/',
};
const MC1R_BEAUMONT: Citation = {
  authors: 'Beaumont KA, et al.',
  title: 'Receptor function, dominant negative activity and phenotype correlations for MC1R variant alleles.',
  source: 'Hum Mol Genet',
  year: '2007',
  url: 'https://pubmed.ncbi.nlm.nih.gov/17616515/',
};

// Shared MC4R protective-variant citation — studied V103I and I251L together.
const MC4R_STUTZMANN: Citation = {
  authors: 'Stutzmann F, et al.',
  title:
    'Non-synonymous polymorphisms in melanocortin-4 receptor protect against obesity: the two facets of a Janus obesity gene.',
  source: 'Hum Mol Genet',
  year: '2007',
  url: 'https://pubmed.ncbi.nlm.nih.gov/17519222/',
};

export const variants: Variant[] = [
  // --- MC1R: the skin / UV-risk axis --------------------------------------
  // The classic allele series, ordered by codon. Two functional grades:
  //   "R" (red) alleles  — strong loss-of-function; the red-hair/fair-skin core
  //   "r" (weak) alleles — partial loss; milder, dose-dependent effects
  // MC1R is among the most polymorphic genes in the genome, so this is a
  // representative — not exhaustive — panel of the best-characterised variants.
  //
  // Nearly every allele's function traces to one source (Beaumont 2007, the
  // definitive phenotype-correlation panel); the classic three also to their
  // original red-hair report (Valverde 1995). Shared so the page bibliography
  // dedupes them to two entries.
  {
    id: 'mc1r-v60l',
    gene: 'MC1R',
    receptor: 'MC1R',
    variant: 'p.Val60Leu (V60L)',
    rsid: 'rs1805005',
    axis: 'skin',
    consequence: 'partial-loss',
    inheritance: 'risk-allele',
    frequency: 'Common weak "r" allele in European-ancestry populations.',
    phenotype: 'Milder fair-skin / freckling tendency; weaker melanoma-risk signal than the "R" alleles.',
    mechanism: 'Partially reduced receptor signalling — a weak allele, so effects are modest and dose-dependent.',
    evidence: 'strong',
    sources: [MC1R_BEAUMONT],
  },
  {
    id: 'mc1r-d84e',
    gene: 'MC1R',
    receptor: 'MC1R',
    variant: 'p.Asp84Glu (D84E)',
    rsid: 'rs1805006',
    axis: 'skin',
    consequence: 'loss-of-function',
    inheritance: 'risk-allele',
    frequency: 'Rare "R" allele in European-ancestry populations.',
    phenotype: 'Red-hair/fair-skin phenotype; carries the elevated melanoma risk typical of the strong alleles.',
    mechanism: 'A strong "R" allele: markedly reduced signalling shifts melanocytes toward pheomelanin.',
    evidence: 'established',
    sources: [MC1R_VALVERDE, MC1R_BEAUMONT],
  },
  {
    id: 'mc1r-v92m',
    gene: 'MC1R',
    receptor: 'MC1R',
    variant: 'p.Val92Met (V92M)',
    rsid: 'rs2228479',
    axis: 'skin',
    consequence: 'partial-loss',
    inheritance: 'risk-allele',
    frequency: 'Common variant across European and Asian populations.',
    phenotype: 'Weak "r" allele; small effect on pigmentation with an uncertain, at most modest, melanoma signal.',
    mechanism: 'Partial reduction in receptor signalling — one of the mildest common alleles.',
    evidence: 'strong',
    sources: [MC1R_BEAUMONT],
  },
  {
    id: 'mc1r-r142h',
    gene: 'MC1R',
    receptor: 'MC1R',
    variant: 'p.Arg142His (R142H)',
    rsid: 'rs11547464',
    axis: 'skin',
    consequence: 'loss-of-function',
    inheritance: 'risk-allele',
    frequency: 'Rare "R" allele in European-ancestry populations.',
    phenotype: 'Red hair and fair sun-sensitive skin; melanoma-risk associated as a strong allele.',
    mechanism: 'Strong "R" allele with impaired G-protein coupling, sharply lowering eumelanin output.',
    evidence: 'established',
    sources: [MC1R_BEAUMONT],
  },
  {
    id: 'mc1r-r151c',
    gene: 'MC1R',
    receptor: 'MC1R',
    variant: 'p.Arg151Cys (R151C)',
    rsid: 'rs1805007',
    axis: 'skin',
    consequence: 'loss-of-function',
    inheritance: 'risk-allele',
    frequency: 'Common "R" allele in European-ancestry populations; rare elsewhere.',
    phenotype:
      'Red hair, fair sun-sensitive skin, freckling; associated with elevated melanoma and basal-cell carcinoma risk.',
    mechanism:
      'Impairs MC1R coupling to cAMP, biasing melanocytes toward red/yellow pheomelanin and away from photoprotective eumelanin.',
    evidence: 'established',
    sources: [MC1R_VALVERDE, MC1R_BEAUMONT],
  },
  {
    id: 'mc1r-i155t',
    gene: 'MC1R',
    receptor: 'MC1R',
    variant: 'p.Ile155Thr (I155T)',
    rsid: 'rs1110400',
    axis: 'skin',
    consequence: 'loss-of-function',
    inheritance: 'risk-allele',
    frequency: 'Rare high-penetrance "R" allele in European-ancestry populations.',
    phenotype:
      'Red hair and fair sun-sensitive skin; melanoma-risk associated — one of the high-penetrance alleles, not a weak one.',
    mechanism:
      'A strong "R" allele: sharply reduced signalling, grouped with the rare high-penetrance D84E and R142H rather than the weak "r" alleles (V60L, V92M, R163Q).',
    evidence: 'established',
    sources: [MC1R_BEAUMONT],
  },
  {
    id: 'mc1r-r160w',
    gene: 'MC1R',
    receptor: 'MC1R',
    variant: 'p.Arg160Trp (R160W)',
    rsid: 'rs1805008',
    axis: 'skin',
    consequence: 'loss-of-function',
    inheritance: 'risk-allele',
    frequency: 'Common "R" allele in European-ancestry populations.',
    phenotype: 'Red-hair phenotype and increased UV skin sensitivity; melanoma-risk associated.',
    mechanism: 'One of the three classic strong "R" alleles (with R151C and D294H) that most reduce eumelanin signalling.',
    evidence: 'established',
    sources: [MC1R_VALVERDE, MC1R_BEAUMONT],
  },
  {
    id: 'mc1r-r163q',
    gene: 'MC1R',
    receptor: 'MC1R',
    variant: 'p.Arg163Gln (R163Q)',
    rsid: 'rs885479',
    axis: 'skin',
    consequence: 'partial-loss',
    inheritance: 'risk-allele',
    frequency: 'The most common MC1R variant in East Asian populations; less frequent in Europeans.',
    phenotype:
      'Weak "r" allele whose pigmentation and skin-cancer associations are disputed — reported both ways across cohorts and ancestries.',
    mechanism: 'Only modestly alters signalling; the small effect size makes its phenotypic role hard to pin down.',
    evidence: 'contested',
    sources: [MC1R_BEAUMONT],
  },
  {
    id: 'mc1r-d294h',
    gene: 'MC1R',
    receptor: 'MC1R',
    variant: 'p.Asp294His (D294H)',
    rsid: 'rs1805009',
    axis: 'skin',
    consequence: 'loss-of-function',
    inheritance: 'risk-allele',
    frequency: '"R" allele in European-ancestry populations.',
    phenotype:
      'Red hair, fair skin, and among the strongest single-allele melanoma associations — the third of the classic "R" trio.',
    mechanism:
      'Mis-trafficked and under-expressed at the cell surface, so little signal gets through even when α-MSH is present.',
    evidence: 'established',
    sources: [MC1R_VALVERDE, MC1R_BEAUMONT],
  },

  // --- ASIP: the pigment brake (completes the skin axis) -------------------
  {
    id: 'asip-pigment-locus',
    gene: 'ASIP',
    variant: 'ASIP-region (20q11.22) pigmentation haplotype (rs1015362 / rs4911414)',
    rsid: 'rs1015362',
    axis: 'skin',
    consequence: 'regulatory',
    inheritance: 'risk-allele',
    frequency: 'Common intergenic variants tagging the ASIP locus in European-ancestry populations.',
    phenotype:
      'Associated with fair skin, red/blond hair, freckling, and increased melanoma and basal-cell carcinoma risk.',
    mechanism:
      'ASIP is the natural MC1R antagonist — the pigment brake. These intergenic variants tag a haplotype near ASIP that raises its expression, pushing melanocytes toward pheomelanin and phenocopying MC1R loss even when MC1R itself is intact.',
    evidence: 'strong',
    sources: [
      {
        authors: 'Gudbjartsson DF, et al.',
        title: 'ASIP and TYR pigmentation variants associate with cutaneous melanoma and basal cell carcinoma.',
        source: 'Nat Genet',
        year: '2008',
        url: 'https://pubmed.ncbi.nlm.nih.gov/18488027/',
      },
    ],
  },

  // --- MC4R: the appetite / body-weight axis ------------------------------
  {
    id: 'mc4r-v103i',
    gene: 'MC4R',
    receptor: 'MC4R',
    variant: 'p.Val103Ile (V103I)',
    rsid: 'rs2229616',
    axis: 'metabolic',
    consequence: 'protective',
    inheritance: 'protective-allele',
    frequency: 'Common variant in European-ancestry populations (a few percent of alleles).',
    phenotype: 'Associated with modestly LOWER obesity risk — the common resilience allele, replicated in large meta-analyses.',
    mechanism:
      'Blunts AgRP inverse-agonism at MC4R, so the satiety brake is less easily released — a small effect, but common enough to matter at the population scale.',
    evidence: 'strong',
    sources: [MC4R_STUTZMANN],
  },
  {
    id: 'mc4r-r165w',
    gene: 'MC4R',
    receptor: 'MC4R',
    variant: 'p.Arg165Trp (R165W)',
    rsid: 'rs13447332',
    axis: 'metabolic',
    consequence: 'loss-of-function',
    inheritance: 'dominant',
    frequency: 'Rare; recurrent among monogenic-obesity cohorts.',
    phenotype: 'Early-onset obesity with hyperphagia; heterozygotes affected.',
    mechanism:
      'Disrupts the central appetite rheostat — loss of MC4R signalling in the hypothalamus removes a key satiety brake.',
    evidence: 'established',
    sources: [
      {
        authors: 'Farooqi IS, et al.',
        title: 'Clinical spectrum of obesity and mutations in the melanocortin 4 receptor gene.',
        source: 'N Engl J Med',
        year: '2003',
        url: 'https://pubmed.ncbi.nlm.nih.gov/12646665/',
      },
    ],
  },
  {
    id: 'mc4r-i251l',
    gene: 'MC4R',
    receptor: 'MC4R',
    variant: 'p.Ile251Leu (I251L)',
    rsid: 'rs52820871',
    axis: 'metabolic',
    consequence: 'protective',
    inheritance: 'protective-allele',
    frequency: 'Low-frequency variant; enriched in leaner individuals.',
    phenotype: 'Associated with LOWER obesity risk and reduced BMI — a resilience allele.',
    mechanism:
      'Enhances MC4R signalling / surface expression, strengthening the satiety brake rather than weakening it.',
    evidence: 'strong',
    sources: [MC4R_STUTZMANN],
  },

  // --- POMC: the pleiotropic middle (both axes + adrenal) ------------------
  {
    id: 'pomc-deficiency',
    gene: 'POMC',
    variant: 'Biallelic loss-of-function (POMC deficiency)',
    omim: '609734',
    axis: 'both',
    consequence: 'loss-of-function',
    inheritance: 'recessive',
    frequency: 'Very rare; a handful of families worldwide.',
    phenotype:
      'Severe early-onset obesity, adrenal insufficiency, and — in fair-skinned backgrounds — red hair: the whole pathway failing at once.',
    mechanism:
      'POMC is the precursor for both α-MSH (appetite + pigment via MC4R/MC1R) and ACTH (adrenal via MC2R); losing it hits all three receptors upstream. Responsive to setmelanotide.',
    evidence: 'established',
    sources: [
      {
        authors: 'Krude H, et al.',
        title: 'Severe early-onset obesity, adrenal insufficiency and red hair pigmentation caused by POMC mutations.',
        source: 'Nat Genet',
        year: '1998',
        url: 'https://pubmed.ncbi.nlm.nih.gov/9620771/',
      },
    ],
  },

  // --- LEPR: upstream of the melanocortin appetite circuit -----------------
  {
    id: 'lepr-deficiency',
    gene: 'LEPR',
    variant: 'Biallelic loss-of-function (leptin-receptor deficiency)',
    omim: '614963',
    axis: 'metabolic',
    consequence: 'loss-of-function',
    inheritance: 'recessive',
    frequency: 'Very rare; enriched in consanguineous pedigrees.',
    phenotype: 'Severe early-onset obesity with hyperphagia and hypogonadotropic hypogonadism.',
    mechanism:
      'Removes the leptin signal that drives POMC neurons, collapsing the melanocortin satiety tone downstream. Responsive to setmelanotide.',
    evidence: 'established',
    sources: [
      {
        authors: 'Clément K, et al.',
        title: 'A mutation in the human leptin receptor gene causes obesity and pituitary dysfunction.',
        source: 'Nature',
        year: '1998',
        url: 'https://pubmed.ncbi.nlm.nih.gov/9537324/',
      },
    ],
  },

  // --- PCSK1: the enzyme that makes the signal -----------------------------
  {
    id: 'pcsk1-deficiency',
    gene: 'PCSK1',
    variant: 'Biallelic loss-of-function (PC1/3 deficiency)',
    omim: '600955',
    axis: 'metabolic',
    consequence: 'loss-of-function',
    inheritance: 'recessive',
    frequency:
      'Severe congenital form very rare; separately, common PCSK1 variants modestly raise polygenic obesity risk.',
    phenotype:
      'Severe early-onset obesity with malabsorptive diarrhoea and multiple endocrine defects — the enzyme processes many prohormones, so its loss reaches well beyond appetite.',
    mechanism:
      'PC1/3 is the convertase that cleaves POMC into α-MSH (and processes proinsulin, proglucagon, and more); without it POMC stays uncut and the melanocortin satiety signal is never made. The third gene responsive to setmelanotide.',
    evidence: 'established',
    sources: [
      {
        authors: 'Jackson RS, et al.',
        title:
          'Obesity and impaired prohormone processing associated with mutations in the human prohormone convertase 1 gene.',
        source: 'Nat Genet',
        year: '1997',
        url: 'https://pubmed.ncbi.nlm.nih.gov/9207799/',
      },
    ],
  },
];

// --- helpers ---------------------------------------------------------------

/** All variants for one gene, e.g. the MC1R allele series. */
export const variantsByGene = (gene: Gene): Variant[] =>
  variants.filter((v) => v.gene === gene);

/** Variants on a given vulnerability axis; `both` rows appear under skin AND
 *  metabolic so the pleiotropic genes surface on either view. */
export const variantsByAxis = (axis: Exclude<Axis, 'both'>): Variant[] =>
  variants.filter((v) => v.axis === axis || v.axis === 'both');

export const EVIDENCE_LABEL: Record<Evidence, string> = {
  established: 'Established',
  strong: 'Strong',
  emerging: 'Emerging',
  contested: 'Contested',
};
