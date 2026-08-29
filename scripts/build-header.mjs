import { writeFile } from 'node:fs/promises';

// btso.dev palette (see https://btso.dev).
const themes = {
  light: { background: '#faf9f6', ink: '#1b1d1f', rule: '#e3e0d6', muted: '#97999c' },
  dark: { background: '#0b0b0d', ink: '#e6e6ea', rule: '#1e1e26', muted: '#5f5f68' },
};

const signalRed = '#e34b2d';
const mono = 'JetBrains Mono, ui-monospace, DejaVu Sans Mono, monospace';
const tagline = 'solo builder · practical tools · omarchy daily driver';

function header({ background, ink, rule, muted }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="320" viewBox="0 0 1440 320" role="img" aria-label="btso.dev - ${tagline}">
  <rect width="1440" height="320" fill="${background}"/>
  <rect x="64" y="86" width="56" height="56" rx="14" fill="${signalRed}"/>
  <text x="86" y="123" fill="${background === '#faf9f6' ? '#0b0b0d' : '#0b0b0d'}" font-family="${mono}" font-size="40" font-weight="700">b</text>
  <text x="152" y="132" fill="${ink}" font-family="${mono}" font-size="64" font-weight="600" letter-spacing="-2">btso.dev</text>
  <path d="M64 236h1312" stroke="${rule}" stroke-width="2"/>
  <text x="64" y="286" fill="${muted}" font-family="${mono}" font-size="24">${tagline}</text>
</svg>
`;
}

for (const [name, theme] of Object.entries(themes)) {
  await writeFile(`assets/header-${name}.svg`, header(theme));
}
