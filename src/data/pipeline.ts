// Melanocortin therapeutics pipeline — a dated snapshot.
// Pipeline information dates quickly; verified against current sources and
// reviewed at the year shown on the page. `stage` is the furthest reached.
export const stages = ['Preclinical', 'Phase 1', 'Phase 2', 'Phase 3', 'Approved'] as const;

export type Status = 'approved' | 'active' | 'discontinued';

export interface PipelineEntry {
  name: string;
  target: string;
  indication: string;
  sponsor: string;
  stage: number; // index into `stages` (furthest reached)
  status: Status;
  since?: string; // approval year, year-only by site policy
  note?: string;
  href?: string;
}

export const pipeline: PipelineEntry[] = [
  {
    name: 'Setmelanotide',
    target: 'MC4R agonist',
    indication: 'Rare genetic & hypothalamic obesity',
    sponsor: 'Rhythm',
    stage: 4,
    status: 'approved',
    since: '2020',
    note: 'Expanded to acquired hypothalamic obesity in 2026 (Phase 3 TRANSCEND)',
    href: '/setmelanotide',
  },
  {
    name: 'Afamelanotide',
    target: 'MC1R agonist',
    indication: 'Erythropoietic protoporphyria',
    sponsor: 'Clinuvel',
    stage: 4,
    status: 'approved',
    since: '2019',
    href: '/afamelanotide',
  },
  {
    name: 'Bremelanotide',
    target: 'Non-selective MCR agonist',
    indication: 'Hypoactive sexual desire disorder',
    sponsor: 'Palatin',
    stage: 4,
    status: 'approved',
    since: '2019',
    href: '/bremelanotide',
  },
  {
    name: 'Repository corticotropin',
    target: 'Pan-MCR agonist (ACTH)',
    indication: 'Infantile spasms · MS relapses · sarcoidosis',
    sponsor: 'Mallinckrodt',
    stage: 4,
    status: 'approved',
    since: '1952',
    href: '/therapeutics#corticotropin',
  },
  {
    name: 'Dersimelagon',
    target: 'Oral MC1R agonist',
    indication: 'Erythropoietic protoporphyria / XLP',
    sponsor: 'Tanabe',
    stage: 3,
    status: 'active',
    note: 'Phase 3 INSPIRE met its primary endpoint (2026); would be the first oral EPP therapy if approved',
    href: '/dersimelagon',
  },
  {
    name: 'Bremelanotide + tirzepatide',
    target: 'MC4R agonist + GLP-1/GIP',
    indication: 'Obesity (combination)',
    sponsor: 'Palatin',
    stage: 2,
    status: 'active',
    note: 'Phase 2 (BMT-801) met its primary endpoint in 2025; low-dose MC4R activation added to a GLP-1 also curbed weight regain',
    href: '/glp1-appetite',
  },
  {
    name: 'PL-9643',
    target: 'Ophthalmic MC agonist',
    indication: 'Dry eye disease',
    sponsor: 'Palatin',
    stage: 3,
    status: 'active',
    note: 'MELODY-1 Phase 3 hit its co-primary symptom endpoint; remaining MELODY trials ongoing',
    href: '/pl-9643',
  },
  {
    name: 'PL-8177',
    target: 'Oral MC1R agonist',
    indication: 'Ulcerative colitis',
    sponsor: 'Palatin',
    stage: 2,
    status: 'active',
    note: 'Positive Phase 2 topline (2025); Palatin capped enrollment to out-license and refocus on its obesity program',
    href: '/pl-8177',
  },
  {
    name: 'PL-7737',
    target: 'Oral MC4R agonist',
    indication: 'Obesity',
    sponsor: 'Palatin',
    stage: 1,
    status: 'active',
    note: 'Oral MC4R agonist entering the clinic (2026) as an obesity monotherapy and GLP-1 add-on',
    href: '/glp1-appetite',
  },
  {
    name: 'Mifomelatide (TCMCB07)',
    target: 'MC3R/MC4R antagonist',
    indication: 'Cancer cachexia / wasting',
    sponsor: 'Kalohexis',
    stage: 2,
    status: 'active',
    note: 'Appetite-restoring — the mirror of MC4R agonism; Phase 2 in metastatic colorectal-cancer cachexia',
    href: '/tcmcb07',
  },
  {
    name: 'Dersimelagon (immunology)',
    target: 'Oral MC1R agonist',
    indication: 'Diffuse cutaneous systemic sclerosis',
    sponsor: 'Tanabe',
    stage: 2,
    status: 'active',
    note: 'Repurposing MC1R’s anti-inflammatory action',
    href: '/therapeutics',
  },
  {
    name: 'Dual MC3R/MC4R agonists',
    target: 'Dual MC3R/MC4R agonist',
    indication: 'Obesity',
    sponsor: 'Research',
    stage: 0,
    status: 'active',
    note: 'Weight loss shown in primate studies',
    href: '/receptors/mc3r',
  },
  {
    name: 'Biased / next-gen MC4R agonists',
    target: 'Biased MC4R agonist',
    indication: 'Obesity (cardiovascular-sparing)',
    sponsor: 'Research',
    stage: 0,
    status: 'active',
    note: 'Aiming for efficacy without the blood-pressure liability',
    href: '/effects',
  },
  {
    name: 'Bremelanotide (intranasal)',
    target: 'Non-selective MCR agonist',
    indication: 'Erectile dysfunction',
    sponsor: 'Palatin',
    stage: 2,
    status: 'discontinued',
    note: 'Intranasal program halted over blood-pressure increases (~2008); later reformulated subcutaneously',
    href: '/bremelanotide',
  },
];
