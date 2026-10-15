// The POMC cleavage cascade — the data behind the interactive tree on /pomc.
//
// One precursor (pro-opiomelanocortin) is cut, step by step, into a family of
// peptides. Two prohormone convertases do the branching work:
//   • PC1/3 makes the first cuts and is present in every POMC-expressing tissue.
//   • PC2 makes the second round of cuts and is present only where the smaller
//     melanocortins (α-MSH, β-MSH, γ-MSH) and β-endorphin are needed — the
//     hypothalamus, the skin, and the intermediate lobe of the pituitary — but
//     NOT in anterior-pituitary corticotrophs.
//
// That single fact — which convertases a tissue carries — is why the anterior
// pituitary pours out ACTH while the brain and skin make α-MSH from the very
// same gene. The `enzyme` on each node is the convertase that liberates it from
// its parent; a node is "PC2-dependent" when any PC2 cut lies on its path from
// POMC. The tree computes that cumulatively, so a tissue without PC2 simply
// stops at the PC1/3 products.
//
// Finishing enzymes (carboxypeptidase E, the amidating enzyme PAM, and an
// N-acetyltransferase for α-MSH) trim and cap the mature peptides after these
// cuts; they are described in the page prose rather than drawn as branches.

export type Enzyme = 'none' | 'PC1/3' | 'PC2';

export type PomcClass =
  | 'precursor'
  | 'intermediate'
  | 'melanocortin'
  | 'opioid'
  | 'other';

export interface PomcNode {
  id: string;
  /** Display name (may contain unicode, e.g. α-MSH). */
  name: string;
  /** Alternative names / shorthand. */
  aka?: string;
  /** The convertase that cuts this peptide out of its parent. */
  enzyme: Enzyme;
  /** Functional family, used for the colour key. */
  nodeClass: PomcClass;
  /** One line shown under the node in the tree. */
  tagline: string;
  /** Paragraph shown in the detail panel. */
  detail: string;
  /** Receptor activity summary, for melanocortins. */
  receptors?: string;
  /** Internal page link, when one exists. */
  href?: string;
  children?: PomcNode[];
}

export const CLASS_LABEL: Record<PomcClass, string> = {
  precursor: 'Precursor',
  intermediate: 'Processing intermediate',
  melanocortin: 'Melanocortin',
  opioid: 'Opioid peptide',
  other: 'Other fragment',
};

// The cascade, in N-terminal → C-terminal order of the precursor.
export const POMC_TREE: PomcNode = {
  id: 'pomc',
  name: 'POMC',
  aka: 'pro-opiomelanocortin',
  enzyme: 'none',
  nodeClass: 'precursor',
  tagline: 'one inert precursor protein',
  detail:
    'Pro-opiomelanocortin is a single prohormone — a long, biologically inert chain that has to be cut to do anything. After its signal peptide is removed, the ~241-residue precursor is processed inside secretory granules by prohormone convertases that snip the chain at specific pairs of basic amino acids. Which peptides a cell ends up releasing depends entirely on which convertases that cell carries.',
  children: [
    {
      id: 'npp',
      name: 'pro-γ-MSH',
      aka: 'N-terminal peptide of POMC (NPP)',
      enzyme: 'PC1/3',
      nodeClass: 'intermediate',
      tagline: 'the N-terminal fragment',
      detail:
        'The N-terminal piece of POMC, released by PC1/3. It is itself a processing intermediate: it holds γ-MSH inside it, which only appears once PC2 makes a further cut. The fragment has signalling roles of its own in adrenal growth, but its best-known cargo is γ-MSH.',
      children: [
        {
          id: 'g-msh',
          name: 'γ-MSH',
          aka: 'gamma-melanocyte-stimulating hormone',
          enzyme: 'PC2',
          nodeClass: 'melanocortin',
          tagline: 'the MC3R-leaning melanocortin',
          detail:
            'Liberated from the N-terminal fragment by PC2. γ-MSH is the most receptor-selective of the natural melanocortins, leaning toward MC3R, where its physiological job is tied to sodium handling and blood-pressure control rather than pigment or appetite.',
          receptors: 'MC3R-selective; weaker at MC1R/MC4R/MC5R',
          href: '/gamma-msh',
        },
      ],
    },
    {
      id: 'jp',
      name: 'Joining peptide',
      aka: 'JP',
      enzyme: 'PC1/3',
      nodeClass: 'other',
      tagline: 'the spacer between the halves',
      detail:
        'A short connecting peptide that sits between the N-terminal fragment and ACTH in the precursor, released by PC1/3. It has no melanocortin-receptor activity of its own and is largely a structural remnant of the cut, though it is sometimes used as a marker of POMC processing.',
    },
    {
      id: 'acth',
      name: 'ACTH',
      aka: 'adrenocorticotropic hormone, ACTH(1–39)',
      enzyme: 'PC1/3',
      nodeClass: 'melanocortin',
      tagline: 'the stress-axis hormone',
      detail:
        'The 39-residue hormone released by PC1/3, and the dominant POMC product of the anterior pituitary. ACTH is the final messenger of the stress axis: it is the only melanocortin that meaningfully activates MC2R on the adrenal cortex to drive cortisol. Because its first 13 residues are α-MSH, ACTH also carries pigment-signalling activity — the reason very high ACTH (as in Addison’s disease) darkens the skin.',
      receptors: 'The only natural MC2R agonist; also activates MC1R/MC3R/MC4R/MC5R',
      href: '/acth',
      children: [
        {
          id: 'a-msh',
          name: 'α-MSH',
          aka: 'acetyl-ACTH(1–13)-amide',
          enzyme: 'PC2',
          nodeClass: 'melanocortin',
          tagline: 'the broad-spectrum signal',
          detail:
            'The classic pigment-and-appetite melanocortin, cut from the front of ACTH by PC2 and then finished — trimmed, amidated at the C-terminus, and acetylated at the N-terminus — which stabilises it and sharpens its activity. It carries the His-Phe-Arg-Trp core that every melanocortin drug copies, and is a potent agonist at four of the five receptors. It is made in the brain and skin, not the anterior pituitary.',
          receptors: 'Broad agonist: MC1R, MC3R, MC4R, MC5R (not MC2R)',
          href: '/alpha-msh',
        },
        {
          id: 'clip',
          name: 'CLIP',
          aka: 'corticotropin-like intermediate lobe peptide, ACTH(18–39)',
          enzyme: 'PC2',
          nodeClass: 'other',
          tagline: 'the leftover tail of ACTH',
          detail:
            'The C-terminal remainder of ACTH after α-MSH is cut away, produced by PC2 wherever α-MSH is made. CLIP has no melanocortin-receptor activity; it is named for the intermediate lobe of the pituitary, where it was first found, and has been studied for roles in insulin secretion and sleep.',
        },
      ],
    },
    {
      id: 'b-lph',
      name: 'β-lipotropin',
      aka: 'β-LPH',
      enzyme: 'PC1/3',
      nodeClass: 'intermediate',
      tagline: 'the C-terminal half',
      detail:
        'The C-terminal half of POMC, released by PC1/3 alongside ACTH. Like the N-terminal fragment, it is an intermediate: it holds both γ-lipotropin and β-endorphin, which PC2 separates where it is present. In the anterior pituitary, processing largely stops here.',
      children: [
        {
          id: 'g-lph',
          name: 'γ-lipotropin',
          aka: 'γ-LPH, β-LPH(1–58)',
          enzyme: 'PC2',
          nodeClass: 'intermediate',
          tagline: 'carries β-MSH',
          detail:
            'The front part of β-lipotropin, cut by PC2. It is itself the source of β-MSH, liberated by a further PC2 cut.',
          children: [
            {
              id: 'b-msh',
              name: 'β-MSH',
              aka: 'beta-melanocyte-stimulating hormone',
              enzyme: 'PC2',
              nodeClass: 'melanocortin',
              tagline: 'the human-brain melanocortin',
              detail:
                'A broad melanocortin cut from γ-lipotropin by PC2. Humans make β-MSH in the brain and it contributes to appetite control through MC4R; notably, common lab rodents do not produce a functional β-MSH, which is one reason it was under-appreciated for years.',
              receptors: 'Broad agonist across MC1R/MC3R/MC4R/MC5R',
              href: '/beta-msh',
            },
          ],
        },
        {
          id: 'b-endorphin',
          name: 'β-endorphin',
          aka: 'β-LPH(61–91)',
          enzyme: 'PC2',
          nodeClass: 'opioid',
          tagline: 'the endogenous opioid',
          detail:
            'Not a melanocortin at all, but an opioid peptide — released from the C-terminal end of β-lipotropin by PC2. β-endorphin acts on the μ-opioid receptor in pain and reward circuits, a reminder of how much functional range one gene packs: the same precursor that sets skin colour and appetite also releases a natural painkiller.',
          href: '/glossary#beta-endorphin',
        },
      ],
    },
  ],
};

export interface Tissue {
  id: string;
  label: string;
  short: string;
  /** Which convertases this tissue carries. */
  enzymes: Enzyme[];
  note: string;
}

export const TISSUES: Tissue[] = [
  {
    id: 'anterior',
    label: 'Anterior pituitary',
    short: 'PC1/3 only',
    enzymes: ['PC1/3'],
    note: 'Corticotrophs of the anterior pituitary carry PC1/3 but little or no PC2. Processing largely stops at ACTH and β-lipotropin — which is exactly why the pituitary’s job is the stress axis, not pigment.',
  },
  {
    id: 'brain-skin',
    label: 'Hypothalamus · skin · intermediate lobe',
    short: 'PC1/3 + PC2',
    enzymes: ['PC1/3', 'PC2'],
    note: 'These tissues carry both convertases, so PC2 makes the second round of cuts: ACTH becomes α-MSH, β-lipotropin yields β-endorphin, and the smaller melanocortins (α-, β-, γ-MSH) appear. Same gene, a different set of products.',
  },
];
