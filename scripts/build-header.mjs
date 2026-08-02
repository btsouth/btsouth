import { writeFile } from 'node:fs/promises';

// Southbound Software palette (see southboundsoftware.com brand assets).
const themes = {
  light: { background: '#f1efe8', ink: '#151817', rule: '#d9d5c9', muted: '#5d625e' },
  dark: { background: '#171c1b', ink: '#f8f7f2', rule: '#2c3331', muted: '#8b918d' },
};

const signalRed = '#e34b2d';
const sans = 'Segoe UI, DejaVu Sans, Arial, sans-serif';
const mono = 'JetBrains Mono, ui-monospace, DejaVu Sans Mono, monospace';
const tagline = 'independent software · practical tools for the agent era';

function header({ background, ink, rule, muted }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="320" viewBox="0 0 1440 320" role="img" aria-label="Southbound Software - ${tagline}">
  <rect width="1440" height="320" fill="${background}"/>
  <g transform="translate(64 54) scale(4.2)" fill="none" stroke-linecap="square" stroke-linejoin="miter">
    <path d="M15.75 2v31M7.5 25l8.25 8.5L24 25" stroke="${signalRed}" stroke-width="2.6"/>
    <path d="M3 2h25" stroke="${ink}" stroke-width="2"/>
  </g>
  <text x="238" y="158" fill="${ink}" font-family="${sans}" font-size="68" font-weight="800" letter-spacing="-2.4">SOUTHBOUND SOFTWARE</text>
  <path d="M64 250h1312" stroke="${rule}" stroke-width="2"/>
  <text x="64" y="294" fill="${muted}" font-family="${mono}" font-size="24">${tagline}</text>
</svg>
`;
}

for (const [name, theme] of Object.entries(themes)) {
  await writeFile(`assets/header-${name}.svg`, header(theme));
}
