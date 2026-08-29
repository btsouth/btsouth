import { writeFile } from 'node:fs/promises';

const username = process.env.GITHUB_REPOSITORY_OWNER;
if (!username) throw new Error('GITHUB_REPOSITORY_OWNER is required.');

const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&type=owner`, {
  headers: { Accept: 'application/vnd.github+json', 'User-Agent': `${username}-profile-readme` },
});
if (!response.ok) throw new Error(`GitHub API returned ${response.status}.`);

const repositories = await response.json();
const stars = repositories
  .filter((repository) => !repository.fork)
  .reduce((total, repository) => total + repository.stargazers_count, 0);

// btso.dev palette (see https://btso.dev).
const themes = {
  light: { background: '#faf9f6', ink: '#1b1d1f', rule: '#e3e0d6', muted: '#97999c' },
  dark: { background: '#0b0b0d', ink: '#e6e6ea', rule: '#1e1e26', muted: '#5f5f68' },
};

const signalRed = '#e34b2d';
const mono = 'JetBrains Mono, ui-monospace, DejaVu Sans Mono, monospace';

function signal({ background, ink, rule, muted }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="720" height="64" viewBox="0 0 720 64" role="img" aria-label="${stars} stars across public work">
  <rect x="16" y="8" width="688" height="48" rx="6" fill="${background}" stroke="${rule}" stroke-width="2"/>
  <circle cx="44" cy="32" r="5" fill="${signalRed}"/>
  <text x="64" y="38" fill="${ink}" font-family="${mono}" font-size="16">${stars} stars across public work</text>
  <text x="676" y="37" fill="${muted}" font-family="${mono}" font-size="13" text-anchor="end">[ live weekly ]</text>
</svg>
`;
}

for (const [name, theme] of Object.entries(themes)) {
  await writeFile(`assets/signal-${name}.svg`, signal(theme));
}
