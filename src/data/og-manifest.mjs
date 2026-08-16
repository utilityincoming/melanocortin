// Single source of truth for per-page social cards.
// Used by scripts/make-og.mjs (to render PNGs) and BaseLayout.astro (to pick
// the right /og/<slug>.png, falling back to default.png for anything not here).
// `slug`: '/' → 'home'; otherwise the path with '/' replaced by '-'
// (e.g. /receptors/mc4r → 'receptors-mc4r').
export const ogPages = [
  { slug: 'home', eyebrow: 'POMC · MC1R–MC5R · THE MELANOCORTIN AXIS', title: 'The melanocortin system, explained.' },
  { slug: 'system', eyebrow: 'OVERVIEW PILLAR', title: 'The melanocortin system' },
  { slug: 'receptors', eyebrow: 'THE FIVE RECEPTORS', title: 'MC1R through MC5R' },
  { slug: 'receptors-mc1r', eyebrow: 'RECEPTOR · MC1R', title: 'MC1R — the pigment switch' },
  { slug: 'receptors-mc2r', eyebrow: 'RECEPTOR · MC2R', title: 'MC2R — the ACTH receptor' },
  { slug: 'receptors-mc3r', eyebrow: 'RECEPTOR · MC3R', title: 'MC3R — energy partitioning' },
  { slug: 'receptors-mc4r', eyebrow: 'RECEPTOR · MC4R', title: 'MC4R — the appetite rheostat' },
  { slug: 'receptors-mc5r', eyebrow: 'RECEPTOR · MC5R', title: 'MC5R — the exocrine receptor' },
  { slug: 'therapeutics', eyebrow: 'PHARMACOLOGY', title: 'Therapeutics & the frontier' },
  { slug: 'effects', eyebrow: 'PHARMACOLOGY', title: 'Why these peptides make you queasy & tan' },
  { slug: 'melanotan', eyebrow: 'EXPLAINER', title: 'Melanotan & Melanotan II' },
  { slug: 'bremelanotide', eyebrow: 'EXPLAINER', title: 'Bremelanotide (PT-141)' },
  { slug: 'setmelanotide', eyebrow: 'EXPLAINER', title: 'Setmelanotide (Imcivree)' },
  { slug: 'pt-141-vs-melanotan', eyebrow: 'COMPARISON', title: 'PT-141 vs Melanotan' },
  { slug: 'hypothalamic-obesity', eyebrow: 'EXPLAINER', title: 'Hypothalamic obesity' },
  { slug: 'glp1-appetite', eyebrow: 'APPETITE · GLP-1', title: 'GLP-1 drugs & the appetite system' },
  { slug: 'explorer', eyebrow: 'INTERACTIVE', title: 'Receptor–ligand explorer' },
  { slug: 'dose-curve', eyebrow: 'INTERACTIVE', title: 'Dose, delivery & the side-effect peak' },
  { slug: 'pipeline', eyebrow: 'PIPELINE · 2026', title: 'The melanocortin pipeline' },
  { slug: 'glossary', eyebrow: 'REFERENCE', title: 'Glossary' },
  { slug: 'about', eyebrow: 'ABOUT', title: 'Editorial standards' },

  // Endogenous ligand cluster — the POMC agonists and the two natural brakes.
  { slug: 'alpha-msh', eyebrow: 'ENDOGENOUS LIGAND', title: 'α-MSH — the broad-spectrum signal' },
  { slug: 'beta-msh', eyebrow: 'ENDOGENOUS LIGAND', title: 'β-MSH — the appetite peptide' },
  { slug: 'gamma-msh', eyebrow: 'ENDOGENOUS LIGAND', title: 'γ-MSH — the MC3R signal' },
  { slug: 'acth', eyebrow: 'ENDOGENOUS LIGAND', title: 'ACTH — the stress-axis melanocortin' },
  { slug: 'agrp', eyebrow: 'ENDOGENOUS ANTAGONIST', title: 'AgRP — the hunger signal' },
  { slug: 'asip', eyebrow: 'ENDOGENOUS ANTAGONIST', title: 'ASIP — the pigment off-switch' },

  // Therapeutics — the drug explainers beyond the three flagships above.
  { slug: 'afamelanotide', eyebrow: 'EXPLAINER', title: 'Afamelanotide (Scenesse)' },
  { slug: 'dersimelagon', eyebrow: 'EXPLAINER', title: 'Dersimelagon (MT-7117)' },
  { slug: 'tcmcb07', eyebrow: 'EXPLAINER', title: 'TCMCB07 (mifomelatide)' },
  { slug: 'pl-8177', eyebrow: 'EXPLAINER', title: 'PL-8177 — oral gut agonist' },
  { slug: 'pl-9643', eyebrow: 'EXPLAINER', title: 'PL-9643 — the dry-eye drop' },

  // Pillars & route explainers.
  { slug: 'genetics', eyebrow: 'GENETICS PILLAR', title: 'Genetics of the system' },
  { slug: 'oral-peptides', eyebrow: 'EXPLAINER · ROUTE', title: "Why oral peptides don't work" },

  // Newer axis, mechanism & drug pages.
  { slug: 'inflammation', eyebrow: 'THE FOURTH AXIS', title: 'Melanocortin control of inflammation' },
  { slug: 'mc1r-pain', eyebrow: 'MC1R · PAIN', title: 'Red hair, MC1R & pain' },
  { slug: 'bivamelagon', eyebrow: 'EXPLAINER', title: 'Bivamelagon — oral MC4R agonist' },

  // Essay.
  { slug: 'fearfully-and-wonderfully-made', eyebrow: 'ESSAY', title: 'Fearfully and Wonderfully Made' },
];
