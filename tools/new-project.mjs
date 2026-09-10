/**
 * Starts a new project by copying an existing one.
 *
 *   npm run new -- car-wash/shine-auto-spa --from car-wash/car-wash-template1
 *   npm run new -- laundry/laundry-template1 --from car-wash/car-wash-template1
 *   npm run new -- dental/bright-smile --title "Bright Smile Dental" --client "Bright Smile"
 *
 * A new category is created the moment you name one — `sites/<category>/` and a
 * category.json for its display name, nothing else to register.
 *
 * Copying rather than templating is deliberate: the copy has no link back, so
 * editing it can never break another client's live site.
 */
import fs from 'node:fs';
import path from 'node:path';
import { SITES_DIR, ROOT } from './config.mjs';
import { findProject, listProjects, listCategories, humanize, isNextApp } from './projects.mjs';
import { copyDir, BUILD_ARTEFACTS } from './fsx.mjs';
import { writeManifest } from './manifest.mjs';

// --flag value pairs, plus whatever is left over as the positional target.
const flags = new Map();
const positional = [];
const argv = process.argv.slice(2);
for (let i = 0; i < argv.length; i += 1) {
  const arg = argv[i];
  if (!arg.startsWith('--')) { positional.push(arg); continue; }
  const next = argv[i + 1];
  if (next && !next.startsWith('--')) { flags.set(arg.slice(2), next); i += 1; }
  else flags.set(arg.slice(2), true);
}
const flag = (name) => (typeof flags.get(name) === 'string' ? flags.get(name) : undefined);
const target = positional[0];

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const STATUSES = ['template', 'draft', 'in-review', 'approved', 'delivered'];

function die(message, ...extra) {
  console.error(message);
  for (const line of extra) console.error(line);
  process.exit(1);
}

if (!target || !target.includes('/')) {
  die('Usage: npm run new -- <category>/<project> [--from <category>/<project>] [--title "..."] [--client "..."]',
    '',
    'Existing projects:',
    ...listProjects().map((p) => `  ${p.id}`));
}

const [category, name, ...rest] = target.split('/').filter(Boolean);
if (rest.length) die(`"${target}" is too deep — the tree is exactly sites/<category>/<project>/.`);
if (!SLUG.test(category)) die(`Category "${category}" must be lowercase words joined by dashes.`);
if (!SLUG.test(name)) die(`Project "${name}" must be lowercase words joined by dashes.`);

const dir = path.join(SITES_DIR, category, name);
if (fs.existsSync(dir)) die(`sites/${category}/${name} already exists.`);

// --from, or the first project already in this category.
const fromId = flag('from');
const source = fromId
  ? findProject(fromId)
  : listCategories().find((c) => c.id === category)?.projects[0];

if (fromId && !source) {
  die(`No project "${fromId}".`, '', 'Available:', ...listProjects().map((p) => `  ${p.id}`));
}
if (!source) {
  die(`Category "${category}" has nothing to copy from yet — say which project to start from:`,
    '',
    `  npm run new -- ${category}/${name} --from <category>/<project>`,
    '',
    'Available:',
    ...listProjects().map((p) => `  ${p.id}`));
}
if (!isNextApp(source.dir)) die(`${source.id} is not a Next.js app.`);

const status = flag('status') || 'draft';
if (!STATUSES.includes(status)) die(`--status must be one of: ${STATUSES.join(', ')}`);

// ---------------------------------------------------------------- write
copyDir(source.dir, dir, { skip: BUILD_ARTEFACTS });

const pkgFile = path.join(dir, 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgFile, 'utf8'));
pkg.name = name;
pkg.version = '0.1.0';
if (flag('description')) pkg.description = flag('description');
fs.writeFileSync(pkgFile, `${JSON.stringify(pkg, null, 2)}\n`);

const title = flag('title') || humanize(name);
fs.writeFileSync(path.join(dir, 'project.json'), `${JSON.stringify({
  title,
  client: flag('client') || '',
  status,
  tags: [],
  notes: `Copied from ${source.id}.`,
}, null, 2)}\n`);

const categoryFile = path.join(SITES_DIR, category, 'category.json');
if (!fs.existsSync(categoryFile)) {
  fs.writeFileSync(categoryFile, `${JSON.stringify({
    name: humanize(category),
    description: '',
  }, null, 2)}\n`);
}

writeManifest();

// ---------------------------------------------------------------- report
const rel = path.relative(ROOT, dir).split(path.sep).join('/');
console.log(`
Created ${rel}   (copy of ${source.id})

  title    ${title}
  client   ${flag('client') || '(none yet)'}
  status   ${status}

Next:
  cd ${rel} && npm install && npm run dev     work on it, hot reload
  npm run build                               add it to the bundle at /${category}/${name}/
  npm run release -- ${category}/${name}          hand the finished site to the client
`);
