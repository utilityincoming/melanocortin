// The full site index: every public page, grouped for readers and crawlers.
// Rendered on the homepage (with blurbs) and in the footer of every page
// (titles only). Titles and blurbs come from PAGES in related.ts, so there is
// one place to edit copy; this file only decides grouping and order.
//
// Why this exists: Search Console showed most pages "Discovered – currently
// not indexed" and a dozen "unknown to Google" despite a clean sitemap. The
// homepage linked to 13 pages and several pages had 1–3 internal inbound links.
// A sitewide index gives every page a link from every other page.

import { PAGES, type PageMeta } from './related';

export interface IndexSection {
  title: string;
  pages: PageMeta[];
}

const pick = (...slugs: string[]): PageMeta[] =>
  slugs.map((s) => {
    const p = PAGES[s];
    if (!p) throw new Error(`siteindex: unknown page slug "${s}"`);
    return p;
  });

export const SITE_INDEX: IndexSection[] = [
  {
    title: 'The system',
    pages: pick('system', 'why-melanocortins', 'genetics', 'inflammation', 'effects', 'structures'),
  },
  {
    title: 'The receptors',
    pages: pick(
      'receptors',
      'receptors/mc1r',
      'receptors/mc2r',
      'receptors/mc3r',
      'receptors/mc4r',
      'receptors/mc5r',
    ),
  },
  {
    title: 'The peptides',
    pages: pick('alpha-msh', 'beta-msh', 'gamma-msh', 'acth', 'agrp', 'asip'),
  },
  {
    title: 'The drugs',
    pages: pick(
      'therapeutics',
      'melanocortin-agonists',
      'setmelanotide',
      'afamelanotide',
      'bremelanotide',
      'melanotan',
      'pt-141-vs-melanotan',
      'dersimelagon',
      'bivamelagon',
      'pl-8177',
      'pl-9643',
      'tcmcb07',
      'shu9119',
      'pf-07258669',
      'pipeline',
    ),
  },
  {
    title: 'Conditions & questions',
    pages: pick('hypothalamic-obesity', 'glp1-appetite', 'mc1r-pain', 'oral-peptides', 'mc1r-selectivity', 'dose-curve'),
  },
  {
    title: 'Data & tools',
    pages: pick('binding-matrix', 'explorer', 'glossary'),
  },
  {
    title: 'About',
    pages: pick('about', 'fearfully-and-wonderfully-made'),
  },
];

/** Every indexed page, flat, in section order. */
export const ALL_PAGES: PageMeta[] = SITE_INDEX.flatMap((s) => s.pages);
