// Quantitative binding/potency matrix for the melanocortin receptors.
//
// Every value is a curated affinity (pKi / pKd) or functional potency (pIC50)
// taken from the IUPHAR/BPS Guide to PHARMACOLOGY (guidetopharmacology.org),
// which traces each figure to a primary paper (PMID given per cell). Values are
// human unless a `species` flag says otherwise. Higher p = tighter binding /
// greater potency (p = −log10 of the molar affinity, so p 9 ≈ 1 nM, p 6 ≈ 1 µM).
// These are representative literature values, not a meta-analysis; assay system
// and radioligand differ between sources. Blank cells = no curated value.
import type { Ligand, ReceptorId } from './ligands';

export type Param = 'pKi' | 'pKd' | 'pIC50';
export type BindAction = 'agonist' | 'antagonist';

export interface Cell {
  p: number; // representative value (midpoint of any range); drives size + colour
  display: string; // e.g. "8.4" or "7.4–8.0"
  param: Param;
  action: BindAction;
  species?: 'mouse' | 'rat'; // omitted = human
  pmid: number;
}

export interface BindingRow {
  id: string;
  name: string;
  kind: Ligand['kind'];
  role: string; // short descriptor for the row
  href?: string;
  cells: Partial<Record<ReceptorId, Cell>>;
}

const A = 'agonist' as const;
const X = 'antagonist' as const;

export const bindingRows: BindingRow[] = [
  {
    id: 'a-msh', name: 'α-MSH', kind: 'endogenous', role: 'broad agonist', href: '/alpha-msh',
    cells: {
      MC1R: { p: 8.4, display: '8.4', param: 'pIC50', action: A, pmid: 12007532 },
      MC3R: { p: 8.2, display: '8.0–8.4', param: 'pKi', action: A, pmid: 10358030 },
      MC4R: { p: 7.7, display: '7.4–8.0', param: 'pKi', action: A, pmid: 10493100 },
      MC5R: { p: 6.9, display: '6.9', param: 'pKd', action: A, pmid: 12007532 },
    },
  },
  {
    id: 'g-msh', name: 'γ-MSH', kind: 'endogenous', role: 'MC3R-preferring', href: '/gamma-msh',
    cells: {
      MC3R: { p: 8.5, display: '8.5', param: 'pKd', action: A, pmid: 10358030 },
    },
  },
  {
    id: 'acth', name: 'ACTH', kind: 'endogenous', role: 'the only MC2R ligand', href: '/acth',
    cells: {
      MC1R: { p: 8.6, display: '8.6', param: 'pKi', action: A, pmid: 7774675 },
      MC2R: { p: 9.8, display: '9.8', param: 'pKd', action: A, species: 'mouse', pmid: 8754753 },
      MC3R: { p: 7.1, display: '7.1', param: 'pKi', action: A, pmid: 7774675 },
      MC4R: { p: 6.2, display: '6.2', param: 'pKi', action: A, pmid: 8884876 },
      MC5R: { p: 5.0, display: '5.0', param: 'pKi', action: A, pmid: 7774675 },
    },
  },
  {
    id: 'afamelanotide', name: 'Afamelanotide', kind: 'approved', role: 'superpotent, broad', href: '/afamelanotide',
    cells: {
      MC1R: { p: 10.0, display: '10.0', param: 'pIC50', action: A, pmid: 12007532 },
      MC3R: { p: 8.9, display: '8.9', param: 'pKi', action: A, pmid: 10493100 },
      MC4R: { p: 8.65, display: '8.5–8.8', param: 'pKi', action: A, pmid: 10493100 },
      MC5R: { p: 9.0, display: '9.0', param: 'pIC50', action: A, pmid: 12007532 },
    },
  },
  {
    id: 'melanotan-2', name: 'Melanotan II', kind: 'unapproved', role: 'broad agonist', href: '/melanotan',
    cells: {
      MC1R: { p: 9.4, display: '9.4', param: 'pIC50', action: A, pmid: 12007532 },
      MC3R: { p: 8.3, display: '8.3', param: 'pKi', action: A, pmid: 10493100 },
      MC4R: { p: 8.5, display: '8.2–8.8', param: 'pKi', action: A, pmid: 2535874 },
      MC5R: { p: 9.0, display: '9.0', param: 'pIC50', action: A, pmid: 12007532 },
    },
  },
  {
    id: 'bremelanotide', name: 'Bremelanotide', kind: 'approved', role: 'MC4R-preferring', href: '/bremelanotide',
    cells: {
      MC1R: { p: 8.2, display: '8.2', param: 'pKi', action: A, pmid: 22335602 },
      MC3R: { p: 7.3, display: '7.3', param: 'pKi', action: A, pmid: 22335602 },
      MC4R: { p: 9.6, display: '9.6', param: 'pKi', action: A, pmid: 22335602 },
      MC5R: { p: 7.8, display: '7.8', param: 'pKi', action: A, pmid: 22335602 },
    },
  },
  {
    id: 'setmelanotide', name: 'Setmelanotide', kind: 'approved', role: 'MC4R drug, broad binder', href: '/setmelanotide',
    cells: {
      MC1R: { p: 8.4, display: '8.4', param: 'pKi', action: A, pmid: 19646498 },
      MC3R: { p: 8.0, display: '8.0', param: 'pKi', action: A, pmid: 19646498 },
      MC4R: { p: 8.7, display: '8.7', param: 'pKi', action: A, pmid: 19646498 },
      MC5R: { p: 6.4, display: '6.4', param: 'pKi', action: A, pmid: 19646498 },
    },
  },
  {
    id: 'agrp', name: 'AgRP', kind: 'endogenous', role: 'blocks MC3R/MC4R', href: '/agrp',
    cells: {
      MC3R: { p: 7.7, display: '7.7', param: 'pIC50', action: X, pmid: 9819197 },
      MC4R: { p: 9.3, display: '9.3', param: 'pIC50', action: X, pmid: 9299416 },
      MC5R: { p: 6.5, display: '6.5', param: 'pIC50', action: X, pmid: 9892020 },
    },
  },
  {
    id: 'asip', name: 'Agouti (ASIP)', kind: 'endogenous', role: 'the pigment brake', href: '/asip',
    cells: {
      MC1R: { p: 8.6, display: '8.6', param: 'pKd', action: X, species: 'mouse', pmid: 7935841 },
      MC3R: { p: 6.7, display: '6.7', param: 'pIC50', action: X, species: 'mouse', pmid: 9454589 },
      MC4R: { p: 7.3, display: '7.3', param: 'pKd', action: X, species: 'mouse', pmid: 9454589 },
      MC5R: { p: 4.9, display: '4.9', param: 'pKd', action: X, species: 'mouse', pmid: 9454589 },
    },
  },
];

// Approximate molar affinity from a p-value: nM = 10^(9 − p).
export function toNanomolar(p: number): string {
  const nM = Math.pow(10, 9 - p);
  if (nM >= 1000) return `${(nM / 1000).toPrecision(2)} µM`;
  if (nM >= 10) return `${nM.toPrecision(2)} nM`;
  if (nM >= 1) return `${nM.toPrecision(2)} nM`;
  return `${nM.toPrecision(2)} nM`;
}

// Primary sources, keyed by PMID (each cell points at one).
export const bindingRefs: Record<number, string> = {
  12007532: 'MacNeil DJ, Howard AD, Guan X et al. (2002) The role of melanocortins in body weight regulation. Eur J Pharmacol 440:141–57.',
  10358030: 'Oosterom J, Nijenhuis WA, Schaaper WM et al. (1999) Conformation of the core sequence in melanocortin peptides directs MC3/MC4 selectivity. J Biol Chem 274:16853–60.',
  10493100: 'Adan RA, Szklarczyk AW, Oosterom J et al. (1999) Characterization of melanocortin receptor ligands on cloned brain melanocortin receptors. Eur J Pharmacol 378:249–58.',
  7774675: 'Schiöth HB, Muceniece R, Wikberg JE, Chhajlani V (1995) Characterisation of melanocortin receptor subtypes by radioligand binding. Eur J Pharmacol 288:311–17.',
  8754753: 'Kapas S, Cammas FM, Hinson JP, Clark AJ (1996) Agonist and receptor binding properties of ACTH peptides using the cloned mouse ACTH receptor. Endocrinology 137:3291–4.',
  8884876: 'Schiöth HB, Muceniece R, Wikberg JE (1996) Characterisation of the melanocortin 4 receptor by radioligand binding. Pharmacol Toxicol 79:161–5.',
  19646498: 'Kumar KG, Sutton GM, Dong JZ et al. (2009) Analysis of the therapeutic functions of novel melanocortin receptor agonists in MC3R- and MC4R-deficient mice. Peptides 30:1892–900.',
  22335602: 'Conde-Frieboes K, Thøgersen H, Lau JF et al. (2012) Characterization of long-acting, MC4R-selective α-MSH analogues. J Med Chem 55:1969–77.',
  2535874: 'Al-Obeidi F, Hruby VJ, Castrucci AM, Hadley ME (1989) Design of potent linear α-melanotropin 4-10 analogues. J Med Chem 32:174–79.',
  9819197: 'Rosenfeld RD, Zeni L, Welcher AA et al. (1998) Characterization of bacterially expressed human agouti-related protein. Biochemistry 37:16041–52.',
  9299416: 'Fong TM, Mao C, MacNeil T et al. (1997) ART (agouti-related transcript) as an antagonist of MC-3 and MC-4 receptors. Biochem Biophys Res Commun 237:629–31.',
  9892020: 'Yang YK, Thompson DA, Dickinson CJ et al. (1999) Characterization of agouti-related protein binding to melanocortin receptors. Mol Endocrinol 13:148–55.',
  7935841: 'Lu D, Willard D, Patel IR et al. (1994) Agouti protein is an antagonist of the melanocyte-stimulating-hormone receptor. Nature 371:799–802.',
  9454589: 'Kiefer LL, Veal JM, Mountjoy KG, Wilkison WO (1998) Melanocortin receptor binding determinants in the agouti protein. Biochemistry 37:991–7.',
};
