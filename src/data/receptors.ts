export interface Receptor {
  id: string;
  slug: string;
  name: string;
  tissue: string;
  ligands: string;
  function: string;
  whenItFails: string;
  /** Second-messenger coupling (reference-grade fact for the facts box). */
  signalling?: string;
  /** Accessory / chaperone protein dependence (the MRAP story). */
  accessory?: string;
  /** Chromosomal locus of the human gene. */
  gene?: string;
  /** True when a hand-written full page exists at /receptors/<slug>.astro
   *  (so the dynamic [mc] stub route skips it to avoid a route collision). */
  detailed?: boolean;
}

export const receptors: Receptor[] = [
  {
    id: 'MC1R',
    slug: 'mc1r',
    name: 'Melanocortin 1 receptor',
    tissue: 'Melanocytes (skin & hair); immune cells',
    ligands: 'α-MSH, ACTH (agonists); agouti signalling protein (antagonist)',
    signalling: 'Gs → cAMP → PKA, driving the pigment regulator MITF toward eumelanin',
    accessory: 'None obligatory',
    gene: '16q24.3',
    function:
      'Switches melanocytes from red/yellow pheomelanin toward brown/black eumelanin — the master control of pigmentation and UV response.',
    whenItFails:
      'Loss-of-function variants drive red hair, fair skin, and raised melanoma risk.',
    detailed: true,
  },
  {
    id: 'MC2R',
    slug: 'mc2r',
    name: 'Melanocortin 2 receptor',
    tissue: 'Adrenal cortex',
    ligands: 'ACTH only (uniquely selective)',
    signalling: 'Gs → cAMP → PKA, driving adrenal steroidogenesis',
    accessory: 'MRAP — required to reach the cell surface',
    gene: '18p11.21',
    function:
      'The ACTH receptor — drives adrenal steroidogenesis and cortisol output at the bottom of the HPA stress axis.',
    whenItFails:
      'Mutations cause familial glucocorticoid deficiency; the receptor needs the accessory protein MRAP to reach the cell surface.',
    detailed: true,
  },
  {
    id: 'MC3R',
    slug: 'mc3r',
    name: 'Melanocortin 3 receptor',
    tissue: 'Hypothalamus; gut, heart, immune cells',
    ligands: 'α-, β-, γ-MSH, ACTH; AgRP (antagonist)',
    signalling: 'Gs → cAMP',
    accessory: 'MRAP2 (modulatory)',
    gene: '20q13.2',
    function:
      'Tunes energy partitioning, the timing of puberty and growth, and natriuresis; a brake complementing MC4R.',
    whenItFails:
      'Disruption shifts fat mass and feeding rhythm; a key modulator of the linear-growth/puberty axis.',
    detailed: true,
  },
  {
    id: 'MC4R',
    slug: 'mc4r',
    name: 'Melanocortin 4 receptor',
    tissue: 'Hypothalamus & wider CNS',
    ligands: 'α-MSH (agonist); AgRP (inverse agonist)',
    signalling: 'Gs → cAMP; also gates the Kir7.1 K⁺ channel independently of G-protein',
    accessory: 'MRAP2 (modulatory)',
    gene: '18q21.32',
    function:
      'The central rheostat of appetite and body weight — and the target of the anti-obesity agent setmelanotide.',
    whenItFails:
      'The most common monogenic cause of severe early-onset obesity in humans.',
    detailed: true,
  },
  {
    id: 'MC5R',
    slug: 'mc5r',
    name: 'Melanocortin 5 receptor',
    tissue: 'Exocrine glands (sebaceous, lacrimal); immune cells',
    ligands: 'α-MSH, ACTH',
    signalling: 'Gs → cAMP',
    accessory: 'MRAP / MRAP2 can modulate',
    gene: '18p11.21',
    function:
      'Regulates exocrine secretion — notably sebum and lipid production — and contributes to immune modulation.',
    whenItFails:
      'Knockout models show defective sebaceous secretion and altered thermoregulation; human role still being mapped.',
    detailed: true,
  },
];
