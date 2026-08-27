// Cross-property links into the sister sites in our network. We deep-link only
// to pages we have verified exist, so a network link never 404s.
//   - peptidehormone.com : research-grade molecule monographs (pharmacology, dosing)
//   - Tan Lines (melanotanii.com): the cultural and historical record of Melanotan II
// The commercial sourcing directory (americanpeptide.com) is intentionally left
// out here, to keep this reference property non-commercial.
//
// Keyed by this site's page slug (path without leading/trailing slash), matching
// the convention in related.ts. NetworkLinks.astro renders these where present.

export interface NetworkLink {
  href: string;
  site: string; // sister-site label, e.g. "Tan Lines"
  title: string; // destination page title
  blurb: string; // why a reader would follow it
}

export const NETWORK: Record<string, NetworkLink[]> = {
  melanotan: [
    {
      href: 'https://melanotanii.com/articles/whats-in-the-vial',
      site: 'Tan Lines',
      title: "You can't know what's in the vial",
      blurb:
        'Our sister site on why gray-market Melanotan II is an unregulated injectable of unknown purity, sterility, and dose.',
    },
    {
      href: 'https://melanotanii.com/articles/melanotan-1-vs-melanotan-2',
      site: 'Tan Lines',
      title: 'Melanotan I vs Melanotan II',
      blurb:
        'Two peptides from the same lab, almost the same molecule, opposite fates. A study in receptor selectivity.',
    },
  ],
  'pt-141-vs-melanotan': [
    {
      href: 'https://melanotanii.com/articles/the-accident-inside-melanotan',
      site: 'Tan Lines',
      title: 'The second drug hiding inside Melanotan II',
      blurb:
        'The Arizona self-experiment that turned a tanning peptide into an approved libido drug.',
    },
    {
      href: 'https://peptidehormone.com/hormones/pt-141',
      site: 'peptidehormone.com',
      title: 'Bremelanotide (PT-141): the monograph',
      blurb:
        'The research-grade reference entry, with the pharmacology and dosing detail.',
    },
  ],
  bremelanotide: [
    {
      href: 'https://peptidehormone.com/hormones/pt-141',
      site: 'peptidehormone.com',
      title: 'Bremelanotide (PT-141): the monograph',
      blurb:
        'The research-grade reference entry, with the pharmacology and dosing detail.',
    },
    {
      href: 'https://melanotanii.com/articles/the-accident-inside-melanotan',
      site: 'Tan Lines',
      title: 'The second drug hiding inside Melanotan II',
      blurb:
        'How an eight-hour side effect in a tanning-peptide trial became an approved drug.',
    },
  ],
  'receptors/mc1r': [
    {
      href: 'https://melanotanii.com/articles/why-redheads-burn-mc1r',
      site: 'Tan Lines',
      title: 'Why redheads burn: the MC1R pigment switch',
      blurb:
        'The same receptor read as a melanoma-risk gene, and the keyhole every Melanotan was cut to fit.',
    },
  ],
  'mc1r-pain': [
    {
      href: 'https://melanotanii.com/articles/why-redheads-burn-mc1r',
      site: 'Tan Lines',
      title: 'Why redheads burn: the MC1R pigment switch',
      blurb:
        'The pigment side of the same MC1R variants that reach into pain and anaesthesia.',
    },
  ],
  effects: [
    {
      href: 'https://melanotanii.com/articles/the-side-effect-ledger',
      site: 'Tan Lines',
      title: 'The Melanotan II side-effect ledger',
      blurb:
        'What the tanning peptides are actually documented to do, separated from forum lore.',
    },
    {
      href: 'https://melanotanii.com/articles/tanorexia-the-opioid-your-skin-makes',
      site: 'Tan Lines',
      title: 'Tanorexia: the opioid your skin makes',
      blurb:
        'Why a tan is hard to give up, and what it shares with the nausea built into these agonists.',
    },
  ],
  afamelanotide: [
    {
      href: 'https://melanotanii.com/articles/middle-ground-agonist-already-exists',
      site: 'Tan Lines',
      title: 'The middle-ground agonist already exists',
      blurb:
        'Afamelanotide as the approved, rigorously tested melanocortin drug locked inside a rare-disease label.',
    },
  ],
  receptors: [
    {
      href: 'https://melanotanii.com/articles/one-hormone-five-receptors',
      site: 'Tan Lines',
      title: 'One hormone, five receptors',
      blurb:
        "Why Melanotan II's scattershot effects - tan, appetite, libido - are the whole receptor family answering at once.",
    },
  ],
};

/** Network links for a page slug, or an empty array when it has none. */
export function networkFor(slug: string): NetworkLink[] {
  return NETWORK[slug] ?? [];
}
