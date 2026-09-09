/**
 * One definition of "a project", shared by the builder (tools/build.mjs), the
 * dev server's dashboard API (tools/serve.mjs) and the dashboard page itself.
 *
 * Every project lives at sites/car-wash/<slug>/ and is built into _site/<slug>/,
 * so they all end up on one origin. Nothing here ever starts a dev server or
 * claims a port: a project is "opened" by pointing the browser at /<slug>/.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const SITES = path.join(ROOT, 'sites', 'car-wash');
export const OUT = path.join(ROOT, '_site');

/** Three ways a folder can become a page, in the order build.mjs prefers them. */
export function kindOf(slug) {
  const dir = path.join(SITES, slug);
  if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) return null;
  if (isNextApp(dir)) return 'next';
  if (fs.existsSync(path.join(dir, 'index.html'))) return 'verbatim';
  if (fs.existsSync(path.join(dir, 'site.json'))) return 'config';
  return null;
}

export function isNextApp(dir) {
  if (!fs.existsSync(dir)) return false;
  if (fs.readdirSync(dir).some((f) => /^next\.config\./.test(f))) return true;
  const pkgFile = path.join(dir, 'package.json');
  if (!fs.existsSync(pkgFile)) return false;
  try {
    const pkg = JSON.parse(fs.readFileSync(pkgFile, 'utf8'));
    return Boolean({ ...pkg.dependencies, ...pkg.devDependencies }.next);
  } catch { return false; }
}

export function slugs() {
  if (!fs.existsSync(SITES)) return [];
  return fs.readdirSync(SITES, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith('_') && !d.name.startsWith('.'))
    .map((d) => d.name)
    .filter((name) => kindOf(name))
    .sort();
}

const readJson = (file) => {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch { return null; }
};

// "car-wash-template1" -> "Car Wash Template 1". Only a fallback: a site.json
// business name is always the better label when there is one.
const humanize = (slug) => slug
  .replace(/[-_]+/g, ' ')
  .replace(/([a-z])(\d)/gi, '$1 $2')
  .replace(/\b\w/g, (c) => c.toUpperCase());

/** Newest mtime under dir, ignoring build artefacts — tells us if out/ is stale. */
export function newestMtime(dir, skip = new Set(['node_modules', '.next', 'out'])) {
  let latest = 0;
  if (!fs.existsSync(dir)) return latest;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (skip.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    latest = Math.max(latest, entry.isDirectory() ? newestMtime(full, skip) : fs.statSync(full).mtimeMs);
  }
  return latest;
}

/** Has this project been built into _site/ yet, and is that build still current? */
export function statusOf(slug) {
  const dir = path.join(SITES, slug);
  const built = path.join(OUT, slug, 'index.html');
  if (!fs.existsSync(built)) return { built: false, builtAt: null, stale: true };
  const builtAt = fs.statSync(built).mtimeMs;
  return { built: true, builtAt, stale: newestMtime(dir) > builtAt };
}

export function describe(slug) {
  const dir = path.join(SITES, slug);
  const kind = kindOf(slug);
  const site = readJson(path.join(dir, 'site.json'));
  const pkg = readJson(path.join(dir, 'package.json'));

  let name = site?.business?.name || humanize(slug);
  let description = '';
  if (site) {
    description = [site.business?.category, site.contact?.city].filter(Boolean).join(' · ');
  } else if (pkg?.description) {
    description = pkg.description;
  }
  if (!description) {
    description = kind === 'next' ? 'Next.js app, statically exported.' : 'Static page.';
  }

  return {
    slug,
    name,
    kind,                       // next | config | verbatim
    label: kind === 'next' ? 'Next.js' : 'Static',
    description,
    url: `/${slug}/`,
    // A Next app has a real install + compile step, so the dashboard warns
    // that the first build takes a while.
    heavy: kind === 'next',
  };
}

export function listProjects({ withStatus = false } = {}) {
  return slugs().map((slug) => (withStatus ? { ...describe(slug), ...statusOf(slug) } : describe(slug)));
}

/**
 * Copies the hand-written dashboard + launcher into _site/, baking the project
 * list into them. The pages then work in two modes: against the dev server they
 * call /__api/* to build on demand, and on GitHub Pages (no API) they fall back
 * to this baked-in list and just link to the already-built pages.
 */
export function writeShell() {
  const data = JSON.stringify(listProjects()).replace(/</g, '\u003c');
  let wrote = false;
  for (const name of ['index.html', 'launcher.html']) {
    const src = path.join(SITES, name);
    if (!fs.existsSync(src)) continue;
    const html = fs.readFileSync(src, 'utf8').replace(
      /(<script id="project-data" type="application\/json">)[\s\S]*?(<\/script>)/,
      (_m, open, close) => `${open}${data}${close}`,
    );
    fs.mkdirSync(OUT, { recursive: true });
    fs.writeFileSync(path.join(OUT, name), html);
    if (name === 'index.html') wrote = true;
  }
  return wrote;
}
