export interface Term {
  term: string;
  def: string;
  /** Optional internal link to the page that covers this term in depth. */
  href?: string;
}

/** Glossary of melanocortin terms. Kept unsorted here for readability;
 *  the page sorts and groups them alphabetically. */
export const terms: Term[] = [
  {
    term: 'ACTH',
    def: 'Adrenocorticotropic hormone. A POMC-derived peptide secreted by the pituitary that drives adrenal cortisol release; the only natural agonist of MC2R.',
    href: '/receptors/mc2r',
  },
  {
    term: 'Adenylyl cyclase',
    def: 'The membrane enzyme that the melanocortin receptors switch on (via Gs) to convert ATP into the second messenger cyclic AMP.',
  },
  {
    term: 'Afamelanotide',
    def: 'A synthetic α-MSH analogue and MC1R agonist (brand Scenesse) that builds protective eumelanin; approved for erythropoietic protoporphyria.',
    href: '/therapeutics#afamelanotide',
  },
  {
    term: 'Agonist',
    def: 'A molecule that binds a receptor and switches it on. α-MSH and ACTH are the natural melanocortin agonists.',
  },
  {
    term: 'Agouti signalling protein (ASIP)',
    def: 'An endogenous antagonist of MC1R in the skin; the mechanism behind banded ("agouti") coat colour in mammals.',
  },
  {
    term: 'AgRP',
    def: 'Agouti-related peptide. An endogenous antagonist of MC3R and MC4R, and an inverse agonist at MC4R; released by hunger-promoting neurons.',
    href: '/receptors/mc4r',
  },
  {
    term: 'Antagonist',
    def: 'A molecule that binds a receptor and blocks an agonist without activating it. The melanocortin system is unusual in having natural antagonists (agouti, AgRP).',
  },
  {
    term: 'Arcuate nucleus',
    def: 'A hypothalamic region containing the POMC and AgRP/NPY neurons that sense leptin and set appetite via downstream MC4R neurons.',
  },
  {
    term: 'Bardet–Biedl syndrome (BBS)',
    def: 'A genetic ciliopathy featuring obesity, among other features; a melanocortin-pathway-related obesity indication for setmelanotide.',
  },
  {
    term: 'Bremelanotide',
    def: 'A non-selective melanocortin receptor agonist (brand Vyleesi) approved for hypoactive sexual desire disorder; acts via central MC4R circuits.',
    href: '/therapeutics#bremelanotide',
  },
  {
    term: 'cAMP',
    def: 'Cyclic adenosine monophosphate. The intracellular second messenger raised by all five melanocortin receptors; activates protein kinase A.',
  },
  {
    term: 'Cortisol',
    def: 'The principal human glucocorticoid stress hormone, released from the adrenal cortex when ACTH activates MC2R.',
  },
  {
    term: 'Dersimelagon',
    def: 'An investigational oral, selective MC1R agonist (MT-7117) in trials for erythropoietic protoporphyria and systemic sclerosis.',
    href: '/therapeutics',
  },
  {
    term: 'Erythropoietic protoporphyria (EPP)',
    def: 'A rare inherited disorder in which protoporphyrin IX accumulates and makes sunlight painful; the indication for afamelanotide.',
  },
  {
    term: 'Eumelanin',
    def: 'The brown-black pigment that absorbs UV and protects DNA; favoured when MC1R signalling is strong.',
    href: '/receptors/mc1r',
  },
  {
    term: 'Familial glucocorticoid deficiency (FGD)',
    def: 'An inherited failure of the adrenal cortex to make cortisol in response to ACTH; type 1 from MC2R mutations, type 2 from MRAP mutations.',
    href: '/receptors/mc2r',
  },
  {
    term: 'GPCR',
    def: 'G-protein-coupled receptor. The seven-transmembrane receptor class to which all five melanocortin receptors belong.',
  },
  {
    term: 'Gs',
    def: 'The stimulatory G-protein that melanocortin receptors couple to, activating adenylyl cyclase and raising cAMP.',
  },
  {
    term: 'His-Phe-Arg-Trp',
    def: 'The core four-amino-acid motif (HFRW) shared by the melanocortin peptides and required for receptor binding.',
  },
  {
    term: 'HPA axis',
    def: 'The hypothalamic–pituitary–adrenal axis: the CRH → ACTH → cortisol stress circuit, whose final receptor step is MC2R.',
    href: '/receptors/mc2r',
  },
  {
    term: 'Hypoactive sexual desire disorder (HSDD)',
    def: 'Persistent, distressing low sexual desire; bremelanotide is approved for the acquired, generalised form in premenopausal women.',
  },
  {
    term: 'Inverse agonist',
    def: 'A molecule that pushes a receptor below its baseline (constitutive) activity. AgRP acts this way at MC4R.',
  },
  {
    term: 'Leptin',
    def: 'A hormone released by fat tissue in proportion to energy stores; activates POMC neurons, feeding α-MSH into the MC4R appetite circuit.',
    href: '/receptors/mc4r',
  },
  {
    term: 'MC1R',
    def: 'Melanocortin 1 receptor. On melanocytes; the switch between protective eumelanin and reddish pheomelanin.',
    href: '/receptors/mc1r',
  },
  {
    term: 'MC2R',
    def: 'Melanocortin 2 receptor. The adrenal ACTH receptor; requires the accessory protein MRAP to function.',
    href: '/receptors/mc2r',
  },
  {
    term: 'MC3R',
    def: 'Melanocortin 3 receptor. Hypothalamic and peripheral; governs energy partitioning and the timing of growth and puberty.',
    href: '/receptors/mc3r',
  },
  {
    term: 'MC4R',
    def: 'Melanocortin 4 receptor. The central rheostat of appetite and body weight; the target of setmelanotide.',
    href: '/receptors/mc4r',
  },
  {
    term: 'MC5R',
    def: 'Melanocortin 5 receptor. Regulates exocrine glands, most notably sebaceous (sebum) secretion.',
    href: '/receptors/mc5r',
  },
  {
    term: 'Melanin',
    def: 'The pigment family produced by melanocytes, comprising eumelanin and pheomelanin.',
  },
  {
    term: 'Melanocortin',
    def: 'The family of POMC-derived peptides — α-, β-, γ-MSH and ACTH — that act on the melanocortin receptors.',
    href: '/system',
  },
  {
    term: 'Melanocyte',
    def: 'The pigment-producing skin cell on which MC1R sits and in which melanin is synthesised.',
  },
  {
    term: 'MITF',
    def: 'Microphthalmia-associated transcription factor. The master regulator of melanocyte pigment genes, driven downstream of MC1R/cAMP.',
  },
  {
    term: 'Monogenic obesity',
    def: 'Obesity caused by a single gene defect in the leptin–melanocortin pathway; MC4R mutations are the commonest such cause.',
    href: '/receptors/mc4r',
  },
  {
    term: 'MRAP',
    def: 'Melanocortin-2-receptor accessory protein. A chaperone that escorts MC2R to the cell surface; mutations cause FGD type 2.',
    href: '/receptors/mc2r',
  },
  {
    term: 'MSH',
    def: 'Melanocyte-stimulating hormone. The α, β, and γ melanocortin peptides cut from POMC.',
  },
  {
    term: 'PCSK1',
    def: 'The gene encoding prohormone convertase 1/3; deficiency disrupts POMC processing and causes early-onset obesity.',
  },
  {
    term: 'Paraventricular nucleus (PVN)',
    def: 'The hypothalamic region densely expressing MC4R, where α-MSH and AgRP compete to set appetite.',
    href: '/receptors/mc4r',
  },
  {
    term: 'Pheomelanin',
    def: 'The reddish-yellow pigment that is a poor UV shield and can generate free radicals; favoured when MC1R signalling is weak.',
    href: '/receptors/mc1r',
  },
  {
    term: 'POMC',
    def: 'Pro-opiomelanocortin. The single precursor protein cleaved into the melanocortin peptides (and β-endorphin).',
    href: '/system',
  },
  {
    term: 'Prohormone convertase',
    def: 'Enzymes (chiefly PC1/3 and PC2) that cut POMC at paired basic residues; their tissue distribution decides which peptides are made.',
    href: '/system',
  },
  {
    term: 'Setmelanotide',
    def: 'An MC4R agonist (brand Imcivree) approved for rare genetic and acquired hypothalamic obesity.',
    href: '/therapeutics#setmelanotide',
  },
  {
    term: 'Steroidogenesis',
    def: 'The synthesis of steroid hormones such as cortisol; switched on in the adrenal cortex by ACTH acting through MC2R.',
  },
];
