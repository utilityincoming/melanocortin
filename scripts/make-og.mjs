// Generates the default social/OG card (1200×630) in the brand identity.
// Run locally (`node scripts/make-og.mjs`) and commit public/og/default.png —
// rasterising locally avoids depending on fonts in the CI build environment.
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
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

  <text x="90" y="150" font-family="Consolas, 'Courier New', monospace" font-size="22" letter-spacing="4" fill="#9a531f">POMC · MC1R&#8211;MC5R · THE MELANOCORTIN AXIS</text>

  <circle cx="106" cy="248" r="30" fill="url(#dot)"/>
  <text x="156" y="268" font-family="Georgia, 'Times New Roman', serif" font-size="60" font-weight="bold" fill="#1c1812">melanocortin.com</text>

  <text x="90" y="378" font-family="Georgia, 'Times New Roman', serif" font-size="54" font-weight="bold" fill="#1c1812">The melanocortin system, explained.</text>
  <text x="90" y="438" font-family="Georgia, 'Times New Roman', serif" font-size="30" fill="#564d3f">One precursor protein. The five receptors.</text>
  <text x="90" y="480" font-family="Georgia, 'Times New Roman', serif" font-size="30" fill="#564d3f">The therapeutics that target them.</text>

  <rect x="90" y="540" width="120" height="4" rx="2" fill="#9a531f"/>
  <text x="90" y="584" font-family="Consolas, 'Courier New', monospace" font-size="19" letter-spacing="2" fill="#6f6555">Citation-first · research-grade, not medical</text>
</svg>`;

await mkdir('public/og', { recursive: true });
await sharp(Buffer.from(svg)).png().toFile('public/og/default.png');
const meta = await sharp('public/og/default.png').metadata();
console.log(`OG written: ${meta.width}x${meta.height}, ${meta.channels}ch`);
