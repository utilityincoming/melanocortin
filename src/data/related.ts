// Central internal-linking graph for the content cluster.
// PAGES = one canonical title + blurb per destination (edit copy in one place).
// RELATED = adjacency list keyed by page slug (path without leading/trailing slash).
// Keep relationships roughly reciprocal so the cluster links back on itself.

export interface PageMeta {
  href: string;
  title: string;
  blurb: string;
}

export const PAGES: Record<string, PageMeta> = {
  system: {
    href: '/system',
    title: 'The melanocortin system',
    blurb: 'How one precursor, POMC, becomes the peptides that signal across pigment, stress, appetite, and inflammation.',
  },
  receptors: {
    href: '/receptors',
    title: 'The five receptors',
    blurb: 'MC1R through MC5R — where each one lives, what binds it, and what it controls.',
  },
  'receptors/mc1r': {
    href: '/receptors/mc1r',
    title: 'MC1R — the pigment switch',
    blurb: 'The receptor behind eumelanin, tanning, and much of skin-cancer risk.',
  },
  'receptors/mc3r': {
    href: '/receptors/mc3r',
    title: 'MC3R — energy partitioning',
    blurb: 'The quieter appetite receptor and its role in how the body divides energy.',
  },
  'receptors/mc4r': {
    href: '/receptors/mc4r',
    title: 'MC4R — the appetite rheostat',
    blurb: 'The brain’s master switch for hunger and body weight.',
  },
  therapeutics: {
    href: '/therapeutics',
    title: 'Therapeutics & the frontier',
    blurb: 'Every approved melanocortin drug and the pipeline pushing behind them.',
  },
  effects: {
    href: '/effects',
    title: 'Why they make you queasy & tan',
    blurb: 'The nausea and skin-darkening that come built into the mechanism, not by accident.',
  },
  melanotan: {
    href: '/melanotan',
    title: 'Melanotan & Melanotan II',
    blurb: 'The tanning peptides — the real pharmacology and the documented risks.',
  },
  bremelanotide: {
    href: '/bremelanotide',
    title: 'Bremelanotide (PT-141)',
    blurb: 'The approved desire drug that began as a tanning peptide’s side effect.',
  },
  setmelanotide: {
    href: '/setmelanotide',
    title: 'Setmelanotide (Imcivree)',
    blurb: 'The MC4R drug that repairs a specific break in the appetite circuit.',
  },
  'pt-141-vs-melanotan': {
    href: '/pt-141-vs-melanotan',
    title: 'PT-141 vs Melanotan',
    blurb: 'Same molecular family, opposite jobs — the confusion cleared up.',
  },
  'hypothalamic-obesity': {
    href: '/hypothalamic-obesity',
    title: 'Hypothalamic obesity',
    blurb: 'When a brain injury physically severs the appetite brake.',
  },
  'glp1-appetite': {
    href: '/glp1-appetite',
    title: 'GLP-1 drugs & appetite',
    blurb: 'Where Ozempic and Wegovy plug into the melanocortin circuit.',
  },
  pipeline: {
    href: '/pipeline',
    title: 'The melanocortin pipeline',
    blurb: 'A dated snapshot of the drugs moving through development.',
  },
  'dose-curve': {
    href: '/dose-curve',
    title: 'Dose, delivery & the peak',
    blurb: 'An interactive model of why timing drives the side effects.',
  },
  explorer: {
    href: '/explorer',
    title: 'Receptor–ligand explorer',
    blurb: 'An interactive map of what binds which receptor, and how.',
  },
};

export const RELATED: Record<string, string[]> = {
  melanotan: ['pt-141-vs-melanotan', 'bremelanotide', 'effects', 'receptors/mc1r'],
  bremelanotide: ['pt-141-vs-melanotan', 'melanotan', 'effects', 'receptors/mc4r'],
  setmelanotide: ['hypothalamic-obesity', 'glp1-appetite', 'receptors/mc4r', 'effects'],
  'pt-141-vs-melanotan': ['melanotan', 'bremelanotide', 'effects'],
  'hypothalamic-obesity': ['setmelanotide', 'glp1-appetite', 'receptors/mc4r'],
  'glp1-appetite': ['setmelanotide', 'hypothalamic-obesity', 'receptors/mc4r', 'therapeutics'],
  effects: ['dose-curve', 'receptors/mc1r', 'receptors/mc4r', 'therapeutics'],
  therapeutics: ['setmelanotide', 'bremelanotide', 'pipeline', 'effects'],
};
