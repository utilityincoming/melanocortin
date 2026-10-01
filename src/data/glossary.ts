export interface Term {
  term: string;
  def: string;
  /** Optional internal link to the page that covers this term in depth. */
  href?: string;
}

/** Glossary of melanocortin terms. Kept unsorted here for readability;
 *  the page sorts and groups them alphabetically. Definitions are written
 *  to stand alone; the href points to the page that carries the citations. */
export const terms: Term[] = [
  // ── Peptides and ligands ──────────────────────────────────────────────
  {
    term: 'ACTH',
    def: 'Adrenocorticotropic hormone. A 39-amino-acid POMC-derived peptide secreted by the pituitary that drives adrenal cortisol release; the only natural agonist of MC2R, and also active at the other four receptors.',
    href: '/acth',
  },
  {
    term: 'α-MSH',
    def: 'Alpha-melanocyte-stimulating hormone. The 13-amino-acid prototypical melanocortin, cut from within ACTH; the natural agonist of MC1R, MC3R, MC4R and MC5R, driving pigment, satiety and anti-inflammatory signalling.',
    href: '/alpha-msh',
  },
  {
    term: 'β-MSH',
    def: 'Beta-melanocyte-stimulating hormone. A 22-amino-acid melanocortin cut from β-lipotropin in humans; a second natural ligand for MC4R. Rodents lack the cleavage site and do not make it.',
    href: '/beta-msh',
  },
  {
    term: 'γ-MSH',
    def: 'Gamma-melanocyte-stimulating hormone. Melanocortins (γ1, γ2, γ3) cut from the N-terminal fragment of POMC; relatively selective for MC3R and best known for a role in sodium balance and blood pressure.',
    href: '/gamma-msh',
  },
  {
    term: 'β-endorphin',
    def: 'The opioid peptide cut from the C-terminal end of β-lipotropin alongside γ-lipotropin; a POMC product that is not a melanocortin and does not act on melanocortin receptors.',
    href: '/system',
  },
  {
    term: 'β-lipotropin',
    def: 'The C-terminal fragment of POMC released alongside ACTH. In tissues with PC2 it is cut into γ-lipotropin (the source of β-MSH) and β-endorphin.',
    href: '/beta-msh',
  },
  {
    term: 'Agouti signalling protein (ASIP)',
    def: 'A 131-amino-acid secreted protein made in the hair follicle and skin; the endogenous antagonist and inverse agonist of MC1R, and the mechanism behind banded ("agouti") coat colour. Expressed everywhere, it also blocks MC4R and causes obesity.',
    href: '/asip',
  },
  {
    term: 'AgRP',
    def: 'Agouti-related peptide. The brain’s hunger peptide: an endogenous antagonist of MC3R and MC4R and an inverse agonist at MC4R, released by neurons in the arcuate nucleus when energy stores are low.',
    href: '/agrp',
  },
  {
    term: 'β-defensin',
    def: 'A family of small antimicrobial proteins, one of which (CBD103 in dogs, HBD3 in humans) binds MC1R with high affinity and blocks it; the cause of dominant black coat colour in dogs and a second natural brake on MC1R besides ASIP.',
    href: '/asip',
  },
  {
    term: 'Melanocortin',
    def: 'The family of POMC-derived peptides — α-, β-, γ-MSH and ACTH — that share the His-Phe-Arg-Trp core and act on the melanocortin receptors. Also used loosely for drugs that mimic them.',
    href: '/system',
  },
  {
    term: 'MSH',
    def: 'Melanocyte-stimulating hormone. The α, β, and γ melanocortin peptides cut from POMC; named for the first effect observed, darkening of pigment cells.',
    href: '/alpha-msh',
  },
  {
    term: 'His-Phe-Arg-Trp',
    def: 'The core four-amino-acid motif (HFRW, the "message") shared by all melanocortin peptides and required for binding every melanocortin receptor. In receptor structures it sits in a U-shaped turn in a calcium-assisted pocket.',
    href: '/structures',
  },
  {
    term: 'Message–address',
    def: 'Schwyzer’s model of ACTH: the shared His-Phe-Arg-Trp "message" that activates MC1R and MC3R–MC5R, plus a basic Lys-Lys-Arg-Arg-Pro "address" (residues 15–19) that only MC2R requires. Explains why the MSH peptides cannot trigger cortisol.',
    href: '/receptors/mc2r',
  },
  {
    term: 'POMC',
    def: 'Pro-opiomelanocortin. The single 241-amino-acid precursor protein cleaved into ACTH, the MSH peptides and β-endorphin; which products are made depends on the tissue’s prohormone convertases.',
    href: '/system',
  },
  {
    term: 'Prohormone convertase',
    def: 'Enzymes (chiefly PC1/3 and PC2) that cut POMC at pairs of basic amino acids. PC1/3 releases ACTH and β-lipotropin; PC2 cuts further to α-MSH, β-MSH, γ-MSH and β-endorphin, so a tissue’s enzymes decide its peptides.',
    href: '/system',
  },
  {
    term: 'PCSK1',
    def: 'The gene encoding prohormone convertase 1/3. Deficiency disrupts POMC processing (and that of other prohormones) and causes early-onset obesity with endocrine deficits; an indication for setmelanotide.',
    href: '/setmelanotide',
  },

  // ── Receptors and accessory proteins ─────────────────────────────────
  {
    term: 'MC1R',
    def: 'Melanocortin 1 receptor. On melanocytes and immune cells; the switch between protective eumelanin and reddish pheomelanin, and a major route for melanocortin anti-inflammatory signalling. Its variants underlie red hair and much skin-cancer risk.',
    href: '/receptors/mc1r',
  },
  {
    term: 'MC2R',
    def: 'Melanocortin 2 receptor. The adrenal ACTH receptor at the bottom of the HPA axis; the smallest of the family, responds only to ACTH, and cannot reach the cell surface without the accessory protein MRAP.',
    href: '/receptors/mc2r',
  },
  {
    term: 'MC3R',
    def: 'Melanocortin 3 receptor. Hypothalamic and peripheral; governs energy partitioning, meal timing, the timing of growth and puberty, and sodium balance via γ-MSH. Newly a drug target through dual MC3R/MC4R agonists.',
    href: '/receptors/mc3r',
  },
  {
    term: 'MC4R',
    def: 'Melanocortin 4 receptor. The central rheostat of appetite and body weight, read by α-MSH and β-MSH and opposed by AgRP; the commonest single-gene cause of obesity when it fails, and the target of setmelanotide.',
    href: '/receptors/mc4r',
  },
  {
    term: 'MC5R',
    def: 'Melanocortin 5 receptor. Regulates exocrine glands, most notably sebaceous (sebum) secretion; also nudges fuel use in muscle and fat and supports regulatory immunity. The only melanocortin receptor with no drug in development.',
    href: '/receptors/mc5r',
  },
  {
    term: 'MRAP',
    def: 'Melanocortin-2-receptor accessory protein (MRAP1). A small single-pass membrane protein forming an antiparallel dimer that escorts MC2R to the cell surface and lets it bind ACTH; mutations cause familial glucocorticoid deficiency type 2.',
    href: '/receptors/mc2r',
  },
  {
    term: 'MRAP2',
    def: 'The paralogue of MRAP. Rather than enabling MC2R, it modulates MC4R and MC3R signalling and oligomerisation; its variants are linked to obesity, not adrenal disease. Easy to confuse with MRAP1 — the two have opposite jobs.',
    href: '/structures',
  },
  {
    term: 'Attractin',
    def: 'A large membrane protein that acts as a low-affinity co-receptor for ASIP (but not AgRP). Mice lacking it are immune to both the yellow coat and the obesity of ectopic agouti expression.',
    href: '/asip',
  },
  {
    term: 'GPCR',
    def: 'G-protein-coupled receptor. The seven-transmembrane receptor class to which all five melanocortin receptors belong; agonist binding swings helix 6 outward so a G protein can couple.',
    href: '/structures',
  },
  {
    term: 'Gs',
    def: 'The stimulatory G-protein that all five melanocortin receptors couple to, activating adenylyl cyclase and raising cyclic AMP.',
    href: '/system',
  },
  {
    term: 'Adenylyl cyclase',
    def: 'The membrane enzyme that the melanocortin receptors switch on (via Gs) to convert ATP into the second messenger cyclic AMP.',
  },
  {
    term: 'cAMP',
    def: 'Cyclic adenosine monophosphate. The intracellular second messenger raised by all five melanocortin receptors; activates protein kinase A, which in melanocytes drives MITF and pigment genes, and in the adrenal drives steroidogenesis.',
  },
  {
    term: 'Kir7.1',
    def: 'An inwardly rectifying potassium channel that MC4R gates directly, without a G protein: α-MSH closes it and depolarises the neuron, AgRP opens it. A second, G-protein-independent arm of MC4R signalling.',
    href: '/receptors/mc4r',
  },
  {
    term: 'Calcium pocket',
    def: 'A calcium ion found inside the melanocortin receptor binding pocket in every structure solved so far; it bridges the receptor and the peptide’s His-Phe-Arg-Trp core and is required for high-affinity binding.',
    href: '/structures',
  },
  {
    term: 'Cryo-EM',
    def: 'Cryo-electron microscopy. The technique that produced every melanocortin receptor structure between 2020 and 2023 — MC4R first, then MC1R, then MC2R (with MRAP1), MC3R and MC5R.',
    href: '/structures',
  },
  {
    term: 'Constitutive activity',
    def: 'Signalling by a receptor with nothing bound. Melanocortin receptors have some; an inverse agonist such as AgRP or ASIP lowers it, which is why those ligands do more than block α-MSH.',
    href: '/structures',
  },
  {
    term: 'Nanobody',
    def: 'A small single-domain antibody fragment. An engineered nanobody that switches MC4R on by itself has been reported — an antibody-shaped agonist for a peptide receptor.',
    href: '/structures',
  },

  // ── Pharmacology ─────────────────────────────────────────────────────
  {
    term: 'Agonist',
    def: 'A molecule that binds a receptor and switches it on. α-MSH and ACTH are the natural melanocortin agonists; setmelanotide, afamelanotide and bremelanotide are synthetic ones.',
    href: '/melanocortin-agonists',
  },
  {
    term: 'Antagonist',
    def: 'A molecule that binds a receptor and blocks an agonist without activating it. The melanocortin system is unusual in having natural antagonists (ASIP, AgRP); synthetic ones include SHU9119 and the cachexia drug mifomelatide.',
    href: '/binding-matrix',
  },
  {
    term: 'Inverse agonist',
    def: 'A molecule that pushes a receptor below its baseline (constitutive) activity rather than merely blocking agonists. AgRP acts this way at MC4R and ASIP at MC1R.',
    href: '/agrp',
  },
  {
    term: 'Partial agonist',
    def: 'An agonist that activates a receptor less than fully even at saturating concentration. Several melanocortin drugs are full agonists at their target and partial agonists at the receptors they spill onto.',
    href: '/dose-curve',
  },
  {
    term: 'Pan-agonist',
    def: 'An agonist active at several or all melanocortin receptors. α-MSH itself, bremelanotide, melanotan II and the eye drop PL-9643 are pan-agonists (none activate MC2R).',
    href: '/binding-matrix',
  },
  {
    term: 'Selectivity',
    def: 'How much a drug prefers one receptor over the others. The melanocortin field’s central problem: the five receptors share almost the same pocket, so an MC4R appetite drug tends to reach MC1R and darken skin.',
    href: '/mc1r-selectivity',
  },
  {
    term: 'Biased agonism',
    def: 'An agonist that activates one signalling arm of a receptor (for example cAMP) more than another (for example β-arrestin or Kir7.1). Pursued at MC4R to separate weight loss from blood-pressure effects.',
    href: '/effects',
  },
  {
    term: 'Dual MC3R/MC4R agonist',
    def: 'A drug designed to activate both central appetite receptors at once. In 2026 an oral dual agonist cut body weight in obese primates more than MC4R agonism alone; a preclinical obesity strategy.',
    href: '/receptors/mc3r',
  },
  {
    term: 'Affinity (Ki)',
    def: 'How tightly a ligand binds a receptor, expressed as the concentration at which half the receptors are occupied; lower is tighter. The binding matrix tabulates it across the five receptors.',
    href: '/binding-matrix',
  },
  {
    term: 'Potency (EC50)',
    def: 'The concentration of an agonist that produces half its maximal effect; lower is more potent. Distinct from affinity and from efficacy, the size of the maximal effect.',
    href: '/dose-curve',
  },
  {
    term: 'SHU9119',
    def: 'A cyclic synthetic peptide that is an antagonist at MC3R and MC4R and an agonist at MC1R and MC5R. The classic laboratory tool for blocking central melanocortin signalling, and the mirror image of setmelanotide in the MC4R pocket.',
    href: '/shu9119',
  },
  {
    term: 'Melanotan II',
    def: 'An unapproved, grey-market cyclic α-MSH analogue sold for tanning; a non-selective agonist that darkens skin via MC1R and causes nausea, flushing and spontaneous erections via MC4R. The parent compound of bremelanotide.',
    href: '/melanotan',
  },
  {
    term: 'Hyperpigmentation',
    def: 'Darkening of skin, hair or moles from MC1R activation. The signature side effect of every non-selective melanocortin agonist, from setmelanotide to melanotan II, and the design problem receptor-sparing agonists aim to solve.',
    href: '/effects',
  },

  // ── Pigment biology ──────────────────────────────────────────────────
  {
    term: 'Melanin',
    def: 'The pigment family produced by melanocytes, comprising dark eumelanin and reddish pheomelanin; which is made depends on MC1R activity.',
    href: '/receptors/mc1r',
  },
  {
    term: 'Eumelanin',
    def: 'The brown-black pigment that absorbs UV and protects DNA; favoured when MC1R signalling is strong.',
    href: '/receptors/mc1r',
  },
  {
    term: 'Pheomelanin',
    def: 'The reddish-yellow pigment that is a poor UV shield and can generate free radicals; favoured when MC1R signalling is weak or blocked by ASIP.',
    href: '/receptors/mc1r',
  },
  {
    term: 'Pigment type-switching',
    def: 'The melanocyte’s switch between making eumelanin and pheomelanin, set by the balance of α-MSH (accelerator) and ASIP (brake) at MC1R. Alternating during hair growth, it produces the banded agouti hair.',
    href: '/asip',
  },
  {
    term: 'Melanocyte',
    def: 'The pigment-producing cell at the base of the epidermis and in hair follicles on which MC1R sits and in which melanin is synthesised.',
    href: '/receptors/mc1r',
  },
  {
    term: 'MITF',
    def: 'Microphthalmia-associated transcription factor. The master regulator of melanocyte pigment genes, switched on downstream of MC1R → cAMP → protein kinase A.',
    href: '/receptors/mc1r',
  },
  {
    term: 'Lethal yellow',
    def: 'A dominant mouse agouti allele in which a rearrangement expresses agouti protein in every tissue. The mice are uniformly yellow, obese, diabetic and tumour-prone — the finding that first tied melanocortin antagonism to body weight.',
    href: '/asip',
  },
  {
    term: 'Inhibitor cystine knot',
    def: 'A tight, disulfide-braced protein fold otherwise known from spider and cone-snail toxins. ASIP and AgRP are the only mammalian proteins that adopt it.',
    href: '/asip',
  },
  {
    term: 'Erythropoietic protoporphyria (EPP)',
    def: 'A rare inherited disorder in which protoporphyrin IX accumulates and makes sunlight painful within minutes; the indication for afamelanotide and the lead indication for dersimelagon.',
    href: '/afamelanotide',
  },
  {
    term: 'Vitiligo',
    def: 'An autoimmune loss of melanocytes causing patches of depigmented skin. Afamelanotide, combined with UVB phototherapy, is in Phase 3 as a repigmenting therapy.',
    href: '/afamelanotide',
  },

  // ── Appetite and metabolism ──────────────────────────────────────────
  {
    term: 'Arcuate nucleus',
    def: 'A hypothalamic region containing the POMC and AgRP/NPY neurons that sense leptin and set appetite via downstream MC4R neurons.',
    href: '/receptors/mc4r',
  },
  {
    term: 'Paraventricular nucleus (PVN)',
    def: 'The hypothalamic region densely expressing MC4R, where α-MSH and AgRP compete to set appetite and energy expenditure.',
    href: '/receptors/mc4r',
  },
  {
    term: 'Leptin',
    def: 'A hormone released by fat tissue in proportion to energy stores; activates POMC neurons and silences AgRP neurons, feeding α-MSH into the MC4R appetite circuit.',
    href: '/receptors/mc4r',
  },
  {
    term: 'LEPR',
    def: 'The leptin receptor gene. Loss-of-function variants cause severe early-onset obesity because POMC neurons never receive the leptin signal; an approved indication for setmelanotide, which supplies the missing downstream signal.',
    href: '/setmelanotide',
  },
  {
    term: 'Hyperphagia',
    def: 'Pathologically increased hunger and food-seeking, the hallmark of melanocortin-pathway obesity. Reducing it, not weight alone, is a primary outcome in setmelanotide trials.',
    href: '/setmelanotide',
  },
  {
    term: 'Monogenic obesity',
    def: 'Obesity caused by a single gene defect in the leptin–melanocortin pathway (LEPR, POMC, PCSK1, MC4R and others); MC4R variants are the commonest cause.',
    href: '/genetics',
  },
  {
    term: 'Hypothalamic obesity',
    def: 'Rapid, treatment-resistant weight gain after damage to the hypothalamus, most often from a craniopharyngioma or its surgery. Setmelanotide was approved for the acquired form in 2026 — the first MC4R agonist for a non-genetic obesity.',
    href: '/hypothalamic-obesity',
  },
  {
    term: 'Craniopharyngioma',
    def: 'A benign tumour near the pituitary and hypothalamus, usually in childhood; its removal is the commonest cause of acquired hypothalamic obesity.',
    href: '/hypothalamic-obesity',
  },
  {
    term: 'Bardet–Biedl syndrome (BBS)',
    def: 'A genetic ciliopathy featuring obesity, retinal degeneration, extra digits and kidney disease. Its obesity runs through impaired leptin–melanocortin signalling, and it is an approved indication for setmelanotide.',
    href: '/setmelanotide',
  },
  {
    term: 'GLP-1',
    def: 'Glucagon-like peptide-1, the gut hormone mimicked by semaglutide and tirzepatide. It acts upstream of the melanocortin appetite circuit, which is why MC4R agonists are being tested as GLP-1 add-ons.',
    href: '/glp1-appetite',
  },
  {
    term: 'Cachexia',
    def: 'The wasting of muscle and fat in cancer and other chronic illness, driven partly by inflammation over-activating MC4R. Blocking MC4R restores appetite; mifomelatide is in Phase 2 for it.',
    href: '/tcmcb07',
  },
  {
    term: 'Lipolysis',
    def: 'The breakdown of stored fat into fatty acids and glycerol. α-MSH drives it in fat cells via MC5R, and in rodents ACTH does so via MC2R — a peripheral arm of melanocortin metabolism.',
    href: '/receptors/mc5r',
  },

  // ── Adrenal axis ─────────────────────────────────────────────────────
  {
    term: 'HPA axis',
    def: 'The hypothalamic–pituitary–adrenal axis: the CRH → ACTH → cortisol stress circuit, whose final receptor step is MC2R on the adrenal cortex.',
    href: '/receptors/mc2r',
  },
  {
    term: 'Cortisol',
    def: 'The principal human glucocorticoid stress hormone, released from the adrenal cortex when ACTH activates MC2R.',
    href: '/acth',
  },
  {
    term: 'Steroidogenesis',
    def: 'The synthesis of steroid hormones such as cortisol; switched on in the adrenal cortex by ACTH acting through MC2R, Gs, cAMP and protein kinase A.',
    href: '/receptors/mc2r',
  },
  {
    term: 'Familial glucocorticoid deficiency (FGD)',
    def: 'An inherited failure of the adrenal cortex to make cortisol in response to ACTH, presenting in childhood with hypoglycaemia and deep pigmentation; type 1 from MC2R mutations, type 2 from MRAP mutations.',
    href: '/receptors/mc2r',
  },
  {
    term: 'Synacthen test',
    def: 'The short ACTH stimulation (cosyntropin) test: a dose of synthetic ACTH(1–24) is given and the cortisol rise measured. A blunted response confirms adrenal insufficiency. The one melanocortin "drug" every hospital uses.',
    href: '/receptors/mc2r',
  },
  {
    term: 'Tetracosactide',
    def: 'Synthetic ACTH(1–24), also called cosyntropin; the shortest fragment of ACTH with full adrenal activity. Used diagnostically in the Synacthen test and, as a depot, therapeutically.',
    href: '/therapeutics#corticotropin',
  },
  {
    term: 'Repository corticotropin',
    def: 'A long-acting gel of natural ACTH (brand Acthar), approved since 1952 for infantile spasms, multiple sclerosis relapses and several inflammatory conditions. The original melanocortin drug.',
    href: '/therapeutics#corticotropin',
  },
  {
    term: 'Congenital adrenal hyperplasia (CAH)',
    def: 'An inherited block in cortisol synthesis that sends ACTH soaring and drives adrenal androgen overproduction. The lead indication for atumelnant, an MC2R antagonist that cuts the adrenal response at its receptor.',
    href: '/receptors/mc2r',
  },
  {
    term: 'Cushing’s syndrome',
    def: 'Chronic cortisol excess. The ACTH-dependent forms, from pituitary or ectopic tumours, are a second target for MC2R antagonists.',
    href: '/receptors/mc2r',
  },
  {
    term: 'Atumelnant',
    def: 'CRN04894. An oral, non-peptide MC2R antagonist in Phase 3 for congenital adrenal hyperplasia and in trials for ACTH-dependent Cushing’s syndrome; the first drug built to block a melanocortin receptor at the adrenal.',
    href: '/pipeline',
  },

  // ── Inflammation ─────────────────────────────────────────────────────
  {
    term: 'Resolution (of inflammation)',
    def: 'The active process by which inflamed tissue returns to normal — clearing dead cells and debris, not merely switching cytokines off. Melanocortins are pro-resolving, which distinguishes them from classic anti-inflammatories.',
    href: '/inflammation',
  },
  {
    term: 'Efferocytosis',
    def: 'The clearance of dying cells by macrophages. Melanocortin agonists at MC1R and MC3R increase it, which is the cellular signature of a pro-resolving drug.',
    href: '/inflammation',
  },
  {
    term: 'Uveitis',
    def: 'Inflammation inside the eye. α-MSH helps maintain the eye’s immune privilege, melanocortin agonists suppress autoimmune uveitis in mice via MC1R and MC5R, and PL-8177 holds an orphan designation for the non-infectious form.',
    href: '/pl-8177',
  },
  {
    term: 'Dry eye disease',
    def: 'A chronic, partly inflammatory disorder of the ocular surface. The indication for PL-9643, a melanocortin pan-agonist eye drop that met its symptom but not its sign endpoint in Phase 3.',
    href: '/pl-9643',
  },
  {
    term: 'Ulcerative colitis',
    def: 'An inflammatory disease of the colon lining. The lead indication for PL-8177, an oral MC1R agonist that acts on the colon without being absorbed.',
    href: '/pl-8177',
  },
  {
    term: 'Gut-restricted',
    def: 'A drug formulated to act within the gut and not enter the bloodstream. PL-8177’s polymer coating releases it in the colon; in a human microdose study it appeared in faeces but not plasma or urine.',
    href: '/oral-peptides',
  },

  // ── Drugs ────────────────────────────────────────────────────────────
  {
    term: 'Setmelanotide',
    def: 'An MC4R agonist (brand Imcivree) approved for obesity from POMC, PCSK1 or LEPR deficiency and Bardet–Biedl syndrome, and since 2026 for acquired hypothalamic obesity. Given daily by injection; darkens skin via MC1R.',
    href: '/setmelanotide',
  },
  {
    term: 'Afamelanotide',
    def: 'A superpotent synthetic α-MSH analogue and MC1R agonist (brand Scenesse), given as a subcutaneous implant; builds protective eumelanin and is approved for erythropoietic protoporphyria. In Phase 3 for vitiligo.',
    href: '/afamelanotide',
  },
  {
    term: 'Bremelanotide',
    def: 'PT-141. A non-selective melanocortin agonist (brand Vyleesi) approved for hypoactive sexual desire disorder in premenopausal women; acts via central MC4R circuits. Also in Phase 2 combined with tirzepatide for obesity.',
    href: '/bremelanotide',
  },
  {
    term: 'PT-141',
    def: 'The development code of bremelanotide, still widely used on the grey market, where it is sold alongside its parent compound melanotan II.',
    href: '/pt-141-vs-melanotan',
  },
  {
    term: 'Dersimelagon',
    def: 'MT-7117. An oral, selective, non-peptide MC1R agonist whose Phase 3 trial in erythropoietic protoporphyria met its endpoint; under FDA priority review in 2026, and in Phase 2 for systemic sclerosis.',
    href: '/dersimelagon',
  },
  {
    term: 'Bivamelagon',
    def: 'LB54640. An oral small-molecule MC4R agonist from Rhythm, in Phase 2 for acquired hypothalamic obesity with Phase 3 planned; an oral alternative to setmelanotide.',
    href: '/bivamelagon',
  },
  {
    term: 'Mifomelatide',
    def: 'TCMCB07. A cyclic peptide antagonist of MC3R and MC4R that restores appetite; in Phase 2 for cancer cachexia. The mirror image of the MC4R agonists.',
    href: '/tcmcb07',
  },
  {
    term: 'PF-07258669',
    def: 'Pfizer’s oral small-molecule MC4R antagonist for appetite loss, which reached Phase 1 and was discontinued for business rather than safety reasons.',
    href: '/pf-07258669',
  },
  {
    term: 'PL-8177',
    def: 'Palatin’s oral, gut-restricted MC1R agonist for ulcerative colitis; a small Phase 2 showed remission in a third of patients. Available for partnering.',
    href: '/pl-8177',
  },
  {
    term: 'PL-9643',
    def: 'A melanocortin pan-agonist eye drop for dry eye disease, now sublicensed to Altanispac. Phase 3 MELODY-1 met its symptom endpoint but not its sign endpoint.',
    href: '/pl-9643',
  },
  {
    term: 'Hypoactive sexual desire disorder (HSDD)',
    def: 'Persistent, distressing low sexual desire not explained by another condition; bremelanotide is approved for the acquired, generalised form in premenopausal women.',
    href: '/bremelanotide',
  },

  // ── Conditions and misc ──────────────────────────────────────────────
  {
    term: 'Natriuresis',
    def: 'Excretion of sodium in the urine. γ-MSH is natriuretic through MC3R, and mice lacking either develop salt-sensitive hypertension.',
    href: '/gamma-msh',
  },
  {
    term: 'Salt-sensitive hypertension',
    def: 'Blood pressure that rises with dietary sodium. In rodents, breaking the γ-MSH–MC3R loop (no receptor, no peptide, or a blocker) produces it.',
    href: '/gamma-msh',
  },
  {
    term: 'Tyr221Cys',
    def: 'A rare human POMC variant falling inside the β-MSH sequence that weakens its action at MC4R; enriched among obese children, who are hyperphagic and tall for age. Evidence that β-MSH matters in people.',
    href: '/beta-msh',
  },
  {
    term: 'Oral peptide',
    def: 'A peptide drug taken by mouth. Usually digested before absorption, so most melanocortin peptides are injected; exceptions act locally in the gut (PL-8177) or are not peptides at all (dersimelagon, bivamelagon).',
    href: '/oral-peptides',
  },
  {
    term: 'Red hair variants',
    def: 'Loss-of-function MC1R alleles (R151C, R160W, D294H and others) that weaken the eumelanin switch, producing red hair, fair skin that burns, and raised melanoma risk regardless of visible pigmentation.',
    href: '/genetics',
  },
];
