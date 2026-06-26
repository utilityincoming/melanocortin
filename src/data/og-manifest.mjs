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
  { slug: 'glp1-appetite', eyebrow: 'APPETITE · GLP-1', title: 'GLP-1 drugs & the appetite system' },
  { slug: 'explorer', eyebrow: 'INTERACTIVE', title: 'Receptor–ligand explorer' },
  { slug: 'dose-curve', eyebrow: 'INTERACTIVE', title: 'Dose, delivery & the side-effect peak' },
  { slug: 'glossary', eyebrow: 'REFERENCE', title: 'Glossary' },
  { slug: 'about', eyebrow: 'ABOUT', title: 'Editorial standards' },
];
