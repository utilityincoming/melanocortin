import type { Receptor } from './receptors';

export type Action = 'agonist' | 'partial' | 'antagonist' | 'inverse' | null;

export type ReceptorId = 'MC1R' | 'MC2R' | 'MC3R' | 'MC4R' | 'MC5R';

export interface Ligand {
  id: string;
  name: string;
  kind: 'endogenous' | 'approved' | 'investigational' | 'unapproved';
  note: string;
  actions: Record<ReceptorId, Action>;
  href?: string;
}

export const ACTION_LABEL: Record<Exclude<Action, null>, string> = {
  agonist: 'Agonist',
  partial: 'Partial / weaker agonist',
  antagonist: 'Antagonist',
  inverse: 'Inverse agonist',
};

// Activity profiles. Where selectivity is approximate, the weaker activity is
// marked "partial" rather than overstated as a full agonist.
export const ligands: Ligand[] = [
  {
    id: 'a-msh',
    name: 'α-MSH',
    kind: 'endogenous',
    note: 'The broad-spectrum melanocortin agonist; the classic pigment and appetite signal.',
    actions: { MC1R: 'agonist', MC2R: null, MC3R: 'agonist', MC4R: 'agonist', MC5R: 'agonist' },
    href: '/system',
  },
  {
    id: 'b-msh',
    name: 'β-MSH',
    kind: 'endogenous',
    note: 'A POMC-derived melanocortin with broad agonist activity.',
    actions: { MC1R: 'agonist', MC2R: null, MC3R: 'agonist', MC4R: 'agonist', MC5R: 'agonist' },
    href: '/system',
  },
  {
    id: 'g-msh',
    name: 'γ-MSH',
    kind: 'endogenous',
    note: 'Relatively selective for MC3R; weaker at the other subtypes.',
    actions: { MC1R: 'partial', MC2R: null, MC3R: 'agonist', MC4R: 'partial', MC5R: 'partial' },
    href: '/receptors/mc3r',
  },
  {
    id: 'acth',
    name: 'ACTH',
    kind: 'endogenous',
    note: 'The only natural agonist of MC2R; also activates the other receptors.',
    actions: { MC1R: 'agonist', MC2R: 'agonist', MC3R: 'agonist', MC4R: 'agonist', MC5R: 'agonist' },
    href: '/receptors/mc2r',
  },
  {
    id: 'asip',
    name: 'Agouti (ASIP)',
    kind: 'endogenous',
    note: 'Endogenous antagonist at MC1R (coat colour) and MC4R.',
    actions: { MC1R: 'antagonist', MC2R: null, MC3R: null, MC4R: 'antagonist', MC5R: null },
    href: '/receptors/mc1r',
  },
  {
    id: 'agrp',
    name: 'AgRP',
    kind: 'endogenous',
    note: 'The hunger peptide; opposes α-MSH at MC3R and MC4R, where it is an inverse agonist.',
    actions: { MC1R: null, MC2R: null, MC3R: 'antagonist', MC4R: 'inverse', MC5R: null },
    href: '/receptors/mc4r',
  },
  {
    id: 'setmelanotide',
    name: 'Setmelanotide',
    kind: 'approved',
    note: 'MC4R agonist for rare genetic and hypothalamic obesity; partial MC1R activity drives its skin-darkening.',
    actions: { MC1R: 'partial', MC2R: null, MC3R: 'partial', MC4R: 'agonist', MC5R: 'partial' },
    href: '/therapeutics#setmelanotide',
  },
  {
    id: 'afamelanotide',
    name: 'Afamelanotide',
    kind: 'approved',
    note: 'A superpotent α-MSH analogue used for MC1R-driven pigmentation in erythropoietic protoporphyria.',
    actions: { MC1R: 'agonist', MC2R: null, MC3R: 'agonist', MC4R: 'agonist', MC5R: 'agonist' },
    href: '/therapeutics#afamelanotide',
  },
  {
    id: 'bremelanotide',
    name: 'Bremelanotide',
    kind: 'approved',
    note: 'Non-selective agonist; central MC4R activity underlies its use for sexual desire.',
    actions: { MC1R: 'agonist', MC2R: null, MC3R: 'agonist', MC4R: 'agonist', MC5R: 'agonist' },
    href: '/bremelanotide',
  },
  {
    id: 'dersimelagon',
    name: 'Dersimelagon',
    kind: 'investigational',
    note: 'Investigational oral, selective MC1R agonist (MT-7117).',
    actions: { MC1R: 'agonist', MC2R: null, MC3R: null, MC4R: null, MC5R: null },
    href: '/therapeutics',
  },
  {
    id: 'melanotan-2',
    name: 'Melanotan II',
    kind: 'unapproved',
    note: 'Unapproved grey-market tanning peptide; non-selective across MC1R/MC3R/MC4R/MC5R.',
    actions: { MC1R: 'agonist', MC2R: null, MC3R: 'agonist', MC4R: 'agonist', MC5R: 'agonist' },
    href: '/melanotan',
  },
];

export const KIND_LABEL: Record<Ligand['kind'], string> = {
  endogenous: 'Endogenous',
  approved: 'Approved drug',
  investigational: 'Investigational',
  unapproved: 'Unapproved',
};

export const receptorIds: ReceptorId[] = ['MC1R', 'MC2R', 'MC3R', 'MC4R', 'MC5R'];

// Short tissue tag per receptor for the explorer header/panel.
export const receptorTag: Record<ReceptorId, string> = {
  MC1R: 'skin · pigment',
  MC2R: 'adrenal · cortisol',
  MC3R: 'energy balance',
  MC4R: 'appetite · satiety',
  MC5R: 'exocrine glands',
};

export type { Receptor };
