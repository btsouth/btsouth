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

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="720" height="64" viewBox="0 0 720 64" role="img" aria-label="${stars} stars across public work">
  <rect x="16" y="8" width="688" height="48" rx="12" fill="#100c09" stroke="#5b3a18"/>
  <circle cx="44" cy="32" r="5" fill="#f7a83b"/>
  <text x="64" y="38" fill="#f1e9df" font-family="JetBrains Mono, ui-monospace, monospace" font-size="16">★ ${stars} stars across public work</text>
  <text x="676" y="37" fill="#a2968a" font-family="JetBrains Mono, ui-monospace, monospace" font-size="13" text-anchor="end">[ live weekly ]</text>
</svg>
`;

await writeFile('assets/signal.svg', svg);
