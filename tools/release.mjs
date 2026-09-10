/**
 * Takes one project out of the repo and builds it as a standalone site.
 *
 *   npm run release -- car-wash/shine-auto-spa
 *   npm run release -- car-wash/shine-auto-spa --base-path /shine
 *   npm run release -- car-wash/shine-auto-spa --out ../handover/shine
 *
 * The copy is built with no NEXT_PUBLIC_BASE_PATH, so every URL in it is
 * root-relative and releases/<project>/out/ can be uploaded as-is to any
 * static host — Netlify, Vercel, cPanel, S3, a client's own GitHub Pages.
 *
 * It is a copy on purpose: the client gets a frozen snapshot, and later work in
 * sites/ cannot change what they were given.
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { ROOT, RELEASES_DIR, isWin, npm, normalizePrefix } from './config.mjs';
import { findProject, listProjects, checkProject } from './projects.mjs';
import { copyDir, flattenPrefetchPayloads, BUILD_ARTEFACTS } from './fsx.mjs';

const argv = process.argv.slice(2);
const flags = new Map();
const positional = [];
for (let i = 0; i < argv.length; i += 1) {
  const arg = argv[i];
  if (!arg.startsWith('--')) { positional.push(arg); continue; }
  const next = argv[i + 1];
  if (next && !next.startsWith('--')) { flags.set(arg.slice(2), next); i += 1; }
  else flags.set(arg.slice(2), true);
}
const flag = (name) => (typeof flags.get(name) === 'string' ? flags.get(name) : undefined);

const project = positional[0] ? findProject(positional[0]) : null;
if (!project) {
  console.error('Usage: npm run release -- <category>/<project> [--base-path /sub] [--out <dir>] [--force]');
  console.error('');
  console.error('Projects:');
  for (const p of listProjects()) console.error(`  ${p.id}`);
  process.exit(1);
}

const errors = checkProject(project).filter((p) => p.level === 'error');
if (errors.length) {
  console.error(`${project.id} is not in a releasable state:`);
  for (const e of errors) console.error(`  ${e.msg}`);
  process.exit(1);
}

const basePath = normalizePrefix(flag('base-path') || '');
const outDir = path.resolve(ROOT, flag('out') || path.join(RELEASES_DIR, project.name));
const rel = (p) => path.relative(ROOT, p).split(path.sep).join('/');

if (fs.existsSync(outDir)) {
  if (!flags.has('force')) {
    console.error(`${rel(outDir)} already exists. Re-run with --force to replace it.`);
    process.exit(1);
  }
  console.log(`Replacing ${rel(outDir)} (--force)`);
  try {
    fs.rmSync(outDir, { recursive: true, force: true });
  } catch (err) {
    // Windows refuses to remove a directory that is some process's working
    // directory — usually a terminal or an editor still sitting inside it.
    console.error(`\nCould not replace ${rel(outDir)}: ${err.code || err.message}`);
    console.error('Close anything open in that folder (a shell, an editor, a dev server) and try again.');
    process.exit(1);
  }
}

console.log(`\nReleasing ${project.id}`);
console.log(`  from      ${project.relDir}`);
console.log(`  into      ${rel(outDir)}`);
console.log(`  base path ${basePath || '(domain root)'}\n`);

copyDir(project.dir, outDir, { skip: BUILD_ARTEFACTS });
// The repo's own bookkeeping is not the client's business.
fs.rmSync(path.join(outDir, 'project.json'), { force: true });

const lock = fs.existsSync(path.join(outDir, 'package-lock.json'));
console.log(`Installing dependencies (${lock ? 'npm ci' : 'npm install'})...`);
execFileSync(npm, lock ? ['ci'] : ['install'], { cwd: outDir, stdio: 'inherit', shell: isWin });

console.log('\nBuilding...');
execFileSync(npm, ['run', 'build'], {
  cwd: outDir,
  stdio: 'inherit',
  shell: isWin,
  env: { ...process.env, NEXT_PUBLIC_BASE_PATH: basePath },
});

const exportDir = path.join(outDir, 'out');
flattenPrefetchPayloads(exportDir);
if (!fs.existsSync(path.join(exportDir, 'index.html'))) {
  console.error('\nThe build produced no out/index.html — nothing to hand over.');
  process.exit(1);
}

// If the client hosts this on GitHub Pages, Jekyll would strip _next/ without
// it — and they have no build tooling of ours to add it later.
fs.writeFileSync(path.join(exportDir, '.nojekyll'), '');

const pages = [];
(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '_next') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.html')) pages.push(rel(full).replace(`${rel(exportDir)}/`, ''));
  }
}(exportDir));

fs.writeFileSync(path.join(outDir, 'HANDOVER.md'), `# ${project.title}

Static site. \`out/\` is the whole thing — HTML, CSS, JS and fonts, no server,
no database, no build step for whoever hosts it.

Built for: **${basePath || 'the root of a domain'}**

## Putting it live

Upload the **contents of \`out/\`** (not the folder itself) to the web root.

- **Netlify / Cloudflare Pages / Vercel** — drag \`out/\` onto the dashboard, or
  point the project at this folder with build command \`npm run build\` and
  publish directory \`out\`.
- **cPanel / shared hosting / FTP** — copy the contents of \`out/\` into
  \`public_html/\`.
- **GitHub Pages** — commit the contents of \`out/\` to the branch Pages serves,
  keeping the \`.nojekyll\` file so \`_next/\` is not stripped.
- **S3 / Azure Static Web Apps** — sync \`out/\`, index document \`index.html\`,
  error document \`404.html\`.

${basePath
  ? `Because it was built for \`${basePath}\`, it must be served from that path.\nTo move it to a domain root, rebuild with \`npm run build\`.`
  : 'To serve it from a sub-folder instead, rebuild with\n`NEXT_PUBLIC_BASE_PATH=/that-folder npm run build`\n(on Windows Git Bash, prefix that with `MSYS_NO_PATHCONV=1`).'}

## Rebuilding after an edit

    npm install
    npm run build      # writes out/

## Pages in this build

${pages.sort().map((p) => `- ${p}`).join('\n')}
`);

console.log(`\nDone.\n`);
console.log(`  Upload the contents of:  ${rel(exportDir)}/`);
console.log(`  Instructions for the client:  ${rel(path.join(outDir, 'HANDOVER.md'))}\n`);
