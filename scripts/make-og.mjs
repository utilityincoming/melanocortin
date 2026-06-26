// Renders per-page social/OG cards (1200×630) in the brand identity.
// Run locally (`node scripts/make-og.mjs`) and commit public/og/*.png —
// rasterising locally avoids depending on fonts in the CI build environment.
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { ogPages } from '../src/data/og-manifest.mjs';

const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Greedy word-wrap to a max characters-per-line, capped at `maxLines`.
function wrap(text, maxChars, maxLines) {
  const words = text.split(' ');
  const lines = [];
  let line = '';
  for (const w of words) {
    if ((line + ' ' + w).trim().length > maxChars && line) {
      lines.push(line);
      line = w;
    } else {
      line = (line + ' ' + w).trim();
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, maxLines);
}

function card({ eyebrow, title }) {
  const lines = wrap(title, 24, 3);
  const fontSize = lines.length >= 3 ? 56 : 64;
  const lineH = fontSize + 10;
  const blockTop = 372 - ((lines.length - 1) * lineH) / 2;
  const titleSvg = lines
    .map(
      (l, i) =>
        `<text x="90" y="${blockTop + i * lineH}" font-family="Georgia, 'Times New Roman', serif" font-size="${fontSize}" font-weight="bold" fill="#1c1812">${esc(l)}</text>`
    )
    .join('\n  ');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="wash" cx="16%" cy="-5%" r="85%">
      <stop offset="0%" stop-color="#f8e6c9"/>
      <stop offset="58%" stop-color="#faf6ee" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="dot" cx="35%" cy="30%" r="75%">
      <stop offset="0%" stop-color="#e6ab63"/>
      <stop offset="55%" stop-color="#c9742a"/>
      <stop offset="100%" stop-color="#5f3219"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="#faf6ee"/>
  <rect width="1200" height="630" fill="url(#wash)"/>
  <rect x="0" y="0" width="1200" height="630" fill="none" stroke="#e0d8c8" stroke-width="2"/>

  <circle cx="104" cy="86" r="17" fill="url(#dot)"/>
  <text x="132" y="95" font-family="Georgia, 'Times New Roman', serif" font-size="30" font-weight="bold" fill="#1c1812">melanocortin.com</text>

  <text x="90" y="210" font-family="Consolas, 'Courier New', monospace" font-size="22" letter-spacing="4" fill="#9a531f">${esc(eyebrow)}</text>

  ${titleSvg}

  <rect x="90" y="492" width="120" height="4" rx="2" fill="#9a531f"/>
  <text x="90" y="540" font-family="Consolas, 'Courier New', monospace" font-size="19" letter-spacing="2" fill="#6f6555">Citation-first · research-grade, not medical</text>
</svg>`;
}

await mkdir('public/og', { recursive: true });

const jobs = [
  ...ogPages.map((p) => ({ name: p.slug, svg: card(p) })),
  {
    name: 'default',
    svg: card({
      eyebrow: 'POMC · MC1R–MC5R · THE MELANOCORTIN AXIS',
      title: 'The melanocortin system, explained.',
    }),
  },
];

for (const j of jobs) {
  await sharp(Buffer.from(j.svg)).png().toFile(`public/og/${j.name}.png`);
}
console.log(`OG cards written: ${jobs.length} → public/og/`);
