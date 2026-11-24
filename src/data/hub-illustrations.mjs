// Decorative motifs shared by the hub pages and their social previews.
export const hubIllustrations = {
  home: {
    line: 'M30 84h180M30 116h180M30 148h180M75 29v26m-12-13h24m43-13v26m-12-13h24m43-13v26m-12-13h24',
    pigment: [[62, 100], [110, 100], [158, 100], [89, 132], [137, 132], [185, 132]],
  },
  system: {
    line: 'M44 90h44m24 0h24m24 0h24M100 84V48h48m0 48v36h48',
    pigment: [[32, 90], [100, 90], [148, 90], [196, 90], [148, 48], [196, 132]],
  },
  pomc: {
    line: 'M120 40v35H60v35m60-35h60v35M60 122v32m120-32v32',
    pigment: [[120, 34], [60, 116], [180, 116], [60, 160], [180, 160]],
  },
  receptors: {
    line: 'M20 62h200M20 118h200M48 55v70m36-70v70m36-70v70m36-70v70m36-70v70',
    pigment: [[48, 90], [84, 90], [120, 90], [156, 90], [192, 90]],
  },
};

export function hubMotif({ line, pigment }) {
  return `<path d="${line}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    ${pigment.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="6" fill="currentColor"/>`).join('')}`;
}
