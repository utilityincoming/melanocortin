// Derived selectivity view-model, shared by the /selectivity hub and the
// per-ligand pages at /selectivity/<id>. Everything here is computed from the
// cited binding data (src/data/binding.ts) — no new numbers are introduced.
//
// The "selectivity window" is the fold-gap between a ligand's tightest and
// second-tightest curated receptor: window = 10^(p_top − p_second). A big
// window means a relatively clean, single-target molecule; a window near 1–2×
// means it grips several receptors almost equally.
import { bindingRows, toNanomolar } from './binding';
import { receptorIds, receptorTag, KIND_LABEL } from './ligands';
import type { ReceptorId } from './ligands';

// Fixed p-value domain so bar lengths are comparable across ligands.
export const P_MIN = 4.5;
export const P_MAX = 10.5;
export const widthPct = (p: number) =>
  Math.max(4, Math.round(((p - P_MIN) / (P_MAX - P_MIN)) * 100));

export type Verdict = 'single' | 'broad' | 'modest' | 'selective' | 'high';
export const VERDICT_LABEL: Record<Verdict, string> = {
  single: 'One receptor only',
  broad: 'Broadly non-selective',
  modest: 'Modest preference',
  selective: 'Selective',
  high: 'Highly selective',
};

export const fmtFold = (f: number) => (f >= 10 ? `${Math.round(f)}×` : `${f.toFixed(1)}×`);

export interface RowView {
  rid: ReceptorId;
  tag: string;
  has: boolean;
  p: number;
  display: string;
  nm: string;
  action: 'agonist' | 'antagonist' | null;
  species: 'mouse' | 'rat' | null;
  width: number;
  primary: boolean;
}

export interface LigandView {
  id: string;
  name: string;
  kind: string;
  kindLabel: string;
  role: string;
  href?: string;
  action: 'agonist' | 'antagonist' | 'mixed';
  primary?: ReceptorId;
  primaryTag: string;
  window: number;
  windowDisplay: string;
  verdict: Verdict;
  verdictLabel: string;
  secondRid: string;
  rows: RowView[];
}

export function buildLigands(): LigandView[] {
  return bindingRows.map((row) => {
    const curated = receptorIds
      .map((rid) => ({ rid, cell: row.cells[rid] }))
      .filter((x) => x.cell) as { rid: ReceptorId; cell: NonNullable<(typeof row.cells)[ReceptorId]> }[];

    const sorted = [...curated].sort((a, b) => b.cell.p - a.cell.p);
    const primary = sorted[0]?.rid;
    const action = curated.every((c) => c.cell.action === 'agonist')
      ? 'agonist'
      : curated.every((c) => c.cell.action === 'antagonist')
        ? 'antagonist'
        : 'mixed';

    let window = 0;
    let verdict: Verdict = 'single';
    if (sorted.length >= 2) {
      window = Math.pow(10, sorted[0].cell.p - sorted[1].cell.p);
      verdict = window < 3 ? 'broad' : window < 10 ? 'modest' : window < 50 ? 'selective' : 'high';
    }

    const rows: RowView[] = receptorIds.map((rid) => {
      const c = row.cells[rid];
      return {
        rid,
        tag: receptorTag[rid],
        has: !!c,
        p: c?.p ?? 0,
        display: c?.display ?? '',
        nm: c ? toNanomolar(c.p) : '',
        action: c?.action ?? null,
        species: c?.species ?? null,
        width: c ? widthPct(c.p) : 0,
        primary: rid === primary,
      };
    });

    return {
      id: row.id,
      name: row.name,
      kind: row.kind,
      kindLabel: KIND_LABEL[row.kind],
      role: row.role,
      href: row.href,
      action,
      primary,
      primaryTag: primary ? receptorTag[primary] : '',
      window,
      windowDisplay: window ? fmtFold(window) : '',
      verdict,
      verdictLabel: VERDICT_LABEL[verdict],
      secondRid: sorted[1]?.rid ?? '',
      rows,
    };
  });
}

/** Spectrum order: most selective first; single-value ligands last. */
export function bySelectivity(ligands: LigandView[]): LigandView[] {
  return [...ligands].sort((a, b) => {
    if (!a.window && !b.window) return 0;
    if (!a.window) return 1;
    if (!b.window) return -1;
    return b.window - a.window;
  });
}

// ── Per-receptor view: who binds a given receptor, and who is selective FOR it ──

export interface ReceptorLigand {
  id: string;
  name: string;
  href?: string;
  kindLabel: string;
  /** This ligand's binding at the receptor in question. */
  p: number;
  display: string;
  nm: string;
  width: number;
  action: 'agonist' | 'antagonist' | null;
  species: 'mouse' | 'rat' | null;
  /** Is this receptor the ligand's tightest (primary) target? */
  isPrimary: boolean;
  /** The ligand's overall selectivity window + verdict (context for ranking). */
  window: number;
  windowDisplay: string;
  verdict: Verdict;
  verdictLabel: string;
}

export interface ReceptorSelectivityView {
  rid: ReceptorId;
  tag: string;
  /** Every ligand with a curated value here, tightest first. */
  binders: ReceptorLigand[];
  /** Ligands whose tightest target is THIS receptor — i.e. selective for it. */
  selectiveFor: ReceptorLigand[];
}

export function buildReceptors(): ReceptorSelectivityView[] {
  const ligands = buildLigands();
  return receptorIds.map((rid) => {
    const binders: ReceptorLigand[] = [];
    for (const l of ligands) {
      const row = l.rows.find((r) => r.rid === rid);
      if (!row?.has) continue;
      binders.push({
        id: l.id,
        name: l.name,
        href: l.href,
        kindLabel: l.kindLabel,
        p: row.p,
        display: row.display,
        nm: row.nm,
        width: row.width,
        action: row.action,
        species: row.species,
        isPrimary: l.primary === rid,
        window: l.window,
        windowDisplay: l.windowDisplay,
        verdict: l.verdict,
        verdictLabel: l.verdictLabel,
      });
    }
    binders.sort((a, b) => b.p - a.p);
    // Selective-for: tightest target is this receptor. A single-value ligand
    // (window 0 but genuinely selective, e.g. γ-MSH at MC3R) ranks at the top.
    const selectiveFor = binders
      .filter((b) => b.isPrimary)
      .sort((a, b) => (b.window || Infinity) - (a.window || Infinity));
    return { rid, tag: receptorTag[rid], binders, selectiveFor };
  });
}
