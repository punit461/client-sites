/**
 * One definition of "a project", shared by the builder, the manifest generator,
 * the preview server and the scaffolder.
 *
 * The tree is exactly two levels deep and every leaf is a standalone Next.js
 * app that is statically exported:
 *
 *     sites/<category>/<project>/     ->  _site/<category>/<project>/
 *
 * That shape is the whole point: a project never imports from the repo around
 * it, so delivering one is "copy the folder out, npm install, npm run build".
 * Anything shared lives in tools/ and only runs at build time.
 */
import fs from 'node:fs';
import path from 'node:path';
import { SITES_DIR } from './config.mjs';

const hidden = (name) => name.startsWith('_') || name.startsWith('.') || name === 'node_modules';

const readJson = (file) => {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch { return null; }
};

const dirNames = (dir) => (fs.existsSync(dir)
  ? fs.readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isDirectory() && !hidden(e.name))
    .map((e) => e.name)
    .sort()
  : []);

/** "car-wash-template1" -> "Car Wash Template 1" (fallback when no title is set). */
export const humanize = (slug) => slug
  .replace(/[-_]+/g, ' ')
  .replace(/([a-z])(\d)/gi, '$1 $2')
  .replace(/\s+/g, ' ')
  .trim()
  .replace(/\b\w/g, (c) => c.toUpperCase());

/** A folder is a project only if it is a Next.js app. Nothing else is built. */
export function isNextApp(dir) {
  if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) return false;
  if (fs.readdirSync(dir).some((f) => /^next\.config\.(ts|js|mjs|cjs)$/.test(f))) return true;
  const pkg = readJson(path.join(dir, 'package.json'));
  return Boolean(pkg && { ...pkg.dependencies, ...pkg.devDependencies }.next);
}

/**
 * Newest mtime under dir, ignoring build artefacts — tells us if out/ is stale.
 * .build-stamp.json is written just after a build, so counting it would make
 * every project look changed and defeat the whole check.
 */
export function newestMtime(
  dir,
  skip = new Set(['node_modules', '.next', 'out', '.build-stamp.json']),
) {
  let latest = 0;
  if (!fs.existsSync(dir)) return latest;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (skip.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    latest = Math.max(latest, entry.isDirectory()
      ? newestMtime(full, skip)
      : fs.statSync(full).mtimeMs);
  }
  return latest;
}

export function describeProject(category, name) {
  const dir = path.join(SITES_DIR, category, name);
  const pkg = readJson(path.join(dir, 'package.json')) || {};
  const meta = readJson(path.join(dir, 'project.json')) || {};

  return {
    id: `${category}/${name}`,
    category,
    name,
    title: meta.title || humanize(name),
    client: meta.client || '',
    status: meta.status || 'draft',
    tags: Array.isArray(meta.tags) ? meta.tags : [],
    notes: meta.notes || '',
    description: meta.description || pkg.description || 'Next.js app, statically exported.',
    dir,
    relDir: path.posix.join('sites', category, name),
    /** Where it lands in the build, relative to the base prefix. */
    route: `/${category}/${name}/`,
  };
}

export function describeCategory(category) {
  const dir = path.join(SITES_DIR, category);
  const meta = readJson(path.join(dir, 'category.json')) || {};
  const projects = dirNames(dir)
    .filter((name) => isNextApp(path.join(dir, name)))
    .map((name) => describeProject(category, name));

  return {
    id: category,
    name: meta.name || humanize(category),
    description: meta.description || '',
    projects,
  };
}

/** Every category folder, including ones that are still empty. */
export function listCategories() {
  return dirNames(SITES_DIR).map(describeCategory);
}

export function listProjects() {
  return listCategories().flatMap((c) => c.projects);
}

export function findProject(id) {
  const parts = String(id).split(path.win32.sep).join('/').split('/').filter(Boolean);
  const [category, name, ...rest] = parts;
  if (!category || !name || rest.length) return null;
  if (!isNextApp(path.join(SITES_DIR, category, name))) return null;
  return describeProject(category, name);
}

/**
 * Structural lint. Two of these matter enough to fail a build:
 * a project that cannot export, and a project pinned to one URL — the second
 * would hand a client a site whose assets only load under our Pages path.
 */
export function checkProject(project) {
  const problems = [];
  const pkgFile = path.join(project.dir, 'package.json');
  const pkg = readJson(pkgFile);

  if (!pkg) problems.push({ level: 'error', msg: 'no readable package.json' });
  else {
    if (!{ ...pkg.dependencies, ...pkg.devDependencies }.next) {
      problems.push({ level: 'error', msg: 'next is not a dependency' });
    }
    if (!pkg.scripts?.build) problems.push({ level: 'error', msg: 'no "build" script' });
    if (!pkg.description) problems.push({ level: 'warn', msg: 'package.json has no description (used as the card subtitle)' });
  }

  const configFile = fs.readdirSync(project.dir).find((f) => /^next\.config\.(ts|js|mjs|cjs)$/.test(f));
  if (!configFile) problems.push({ level: 'error', msg: 'no next.config.* — cannot be exported' });
  else {
    const config = fs.readFileSync(path.join(project.dir, configFile), 'utf8');
    if (!/output\s*:\s*["']export["']/.test(config)) {
      problems.push({ level: 'error', msg: `${configFile} does not set output: "export"` });
    }
    if (/basePath\s*:\s*["']\//.test(config)) {
      problems.push({ level: 'error', msg: `${configFile} hardcodes basePath — use process.env.NEXT_PUBLIC_BASE_PATH so the project can also be delivered on its own domain` });
    }
    if (!/NEXT_PUBLIC_BASE_PATH/.test(config)) {
      problems.push({ level: 'warn', msg: `${configFile} ignores NEXT_PUBLIC_BASE_PATH — it will not work under the dashboard's sub-path` });
    }
  }

  if (!fs.existsSync(path.join(project.dir, 'project.json'))) {
    problems.push({ level: 'warn', msg: 'no project.json (title, client and status fall back to defaults)' });
  }
  return problems;
}
