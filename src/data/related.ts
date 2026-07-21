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
  'alpha-msh': {
    href: '/alpha-msh',
    title: 'α-MSH — the prototype signal',
    blurb: 'The peptide cut from POMC that activates four of the five receptors, and the template every melanocortin drug copies.',
  },
  acth: {
    href: '/acth',
    title: 'ACTH — the stress-axis melanocortin',
    blurb: 'The one POMC peptide with its own receptor (MC2R), running the adrenal cortisol axis.',
  },
  agrp: {
    href: '/agrp',
    title: 'AgRP — the hunger signal',
    blurb: 'The peptide that fights α-MSH at MC4R to drive eating — antagonist and inverse agonist in one.',
  },
  'beta-msh': {
    href: '/beta-msh',
    title: 'β-MSH — the human-appetite peptide',
    blurb: 'A broad POMC melanocortin humans make in the brain but lab rodents largely don’t.',
  },
  'gamma-msh': {
    href: '/gamma-msh',
    title: 'γ-MSH — the MC3R-selective one',
    blurb: 'The selective melanocortin whose real job is sodium balance and blood pressure.',
  },
  asip: {
    href: '/asip',
    title: 'Agouti protein (ASIP) — the pigment brake',
    blurb: 'The natural MC1R blocker that switches skin and coat colour from dark to light.',
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
  'receptors/mc2r': {
    href: '/receptors/mc2r',
    title: 'MC2R — the ACTH receptor',
    blurb: 'The adrenal odd-one-out that answers only to ACTH and drives cortisol.',
  },
  'receptors/mc3r': {
    href: '/receptors/mc3r',
    title: 'MC3R — energy partitioning',
    blurb: 'The quieter appetite receptor and its role in how the body divides energy.',
  },
  'receptors/mc5r': {
    href: '/receptors/mc5r',
    title: 'MC5R — exocrine glands',
    blurb: 'The least-mapped receptor, governing sebaceous and other exocrine gland function.',
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
  'oral-peptides': {
    href: '/oral-peptides',
    title: 'Why oral peptides mostly don’t work',
    blurb: 'Route, bioavailability, and why every approved melanocortin peptide is injected.',
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
  afamelanotide: {
    href: '/afamelanotide',
    title: 'Afamelanotide (Scenesse)',
    blurb: 'The first approved EPP drug — an α-MSH copy that builds protective pigment via MC1R.',
  },
  dersimelagon: {
    href: '/dersimelagon',
    title: 'Dersimelagon (MT-7117)',
    blurb: 'The investigational oral MC1R agonist — the pill chasing afamelanotide’s target.',
  },
  'pl-8177': {
    href: '/pl-8177',
    title: 'PL-8177 — melanocortin for the gut',
    blurb: 'Palatin’s oral MC1R agonist for ulcerative colitis, acting locally on the colon.',
  },
  'pl-9643': {
    href: '/pl-9643',
    title: 'PL-9643 — a melanocortin eye drop',
    blurb: 'Palatin’s dry-eye candidate; met its co-primary symptom endpoint in Phase 3.',
  },
  tcmcb07: {
    href: '/tcmcb07',
    title: 'TCMCB07 — setmelanotide in reverse',
    blurb: 'An MC4R antagonist for cachexia — the appetite switch run backwards.',
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
  'alpha-msh': ['system', 'receptors/mc1r', 'receptors/mc4r', 'agrp'],
  acth: ['receptors/mc2r', 'alpha-msh', 'system'],
  agrp: ['alpha-msh', 'receptors/mc4r', 'asip', 'tcmcb07'],
  'beta-msh': ['alpha-msh', 'receptors/mc4r', 'system'],
  'gamma-msh': ['receptors/mc3r', 'alpha-msh', 'system'],
  asip: ['receptors/mc1r', 'agrp', 'alpha-msh', 'melanotan'],
  afamelanotide: ['receptors/mc1r', 'dersimelagon', 'melanotan', 'alpha-msh'],
  dersimelagon: ['afamelanotide', 'receptors/mc1r', 'pipeline', 'therapeutics'],
  'pl-8177': ['alpha-msh', 'receptors/mc1r', 'pl-9643', 'therapeutics'],
  'pl-9643': ['alpha-msh', 'pl-8177', 'therapeutics', 'pipeline'],
  tcmcb07: ['setmelanotide', 'agrp', 'receptors/mc4r', 'pipeline'],
  melanotan: ['pt-141-vs-melanotan', 'bremelanotide', 'afamelanotide', 'receptors/mc1r'],
  bremelanotide: ['pt-141-vs-melanotan', 'melanotan', 'oral-peptides', 'receptors/mc4r'],
  setmelanotide: ['hypothalamic-obesity', 'glp1-appetite', 'receptors/mc4r', 'tcmcb07'],
  'pt-141-vs-melanotan': ['melanotan', 'bremelanotide', 'effects'],
  'hypothalamic-obesity': ['setmelanotide', 'glp1-appetite', 'receptors/mc4r'],
  'glp1-appetite': ['setmelanotide', 'hypothalamic-obesity', 'receptors/mc4r', 'therapeutics'],
  effects: ['dose-curve', 'oral-peptides', 'alpha-msh', 'receptors/mc1r'],
  'oral-peptides': ['dose-curve', 'effects', 'bremelanotide', 'dersimelagon'],
  therapeutics: ['setmelanotide', 'afamelanotide', 'bremelanotide', 'pipeline'],
};
