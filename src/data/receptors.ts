export interface Receptor {
  id: string;
  slug: string;
  name: string;
  tissue: string;
  ligands: string;
  function: string;
  whenItFails: string;
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
    function:
      'Regulates exocrine secretion — notably sebum and lipid production — and contributes to immune modulation.',
    whenItFails:
      'Knockout models show defective sebaceous secretion and altered thermoregulation; human role still being mapped.',
    detailed: true,
  },
];
