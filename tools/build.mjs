/**
 * Builds the whole bundle into _site/ — the folder that goes live.
 *
 *     _site/                      the dashboard (dashboard/)
 *     _site/<category>/<project>/ every site, statically exported
 *
 * Each project is exported with basePath = <base prefix>/<category>/<project>,
 * which is why the same source folder can also be delivered on its own: build
 * it with no NEXT_PUBLIC_BASE_PATH (tools/release.mjs does exactly that) and
 * every URL becomes root-relative again.
 *
 *   node tools/build.mjs                          everything, from scratch
 *   node tools/build.mjs car-wash/template1       one project, leaving the rest
 *   node tools/build.mjs --dashboard              just the dashboard shell
 *   node tools/build.mjs --check                  lint every project, build nothing
 *   node tools/build.mjs --force                  ignore the "export is current" check
 *   node tools/build.mjs --keep                   do not wipe _site/ first
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import {
  ROOT, OUT_DIR, DASHBOARD_DIR, BASE_PREFIX, isWin, npm,
} from './config.mjs';
import {
  listProjects, findProject, newestMtime, checkProject,
} from './projects.mjs';
import { copyDir, flattenPrefetchPayloads } from './fsx.mjs';
import { writeManifest } from './manifest.mjs';

const args = process.argv.slice(2);
const checkOnly = args.includes('--check');
const force = args.includes('--force');
const keep = args.includes('--keep');
const dashboardOnly = args.includes('--dashboard');
const only = args.find((a) => !a.startsWith('-'));

const rel = (p) => path.relative(ROOT, p).split(path.sep).join('/') || '.';

function install(dir, label) {
  if (fs.existsSync(path.join(dir, 'node_modules'))) return;
  const lock = fs.existsSync(path.join(dir, 'package-lock.json'));
  console.log(`  installing dependencies for ${label} (${lock ? 'npm ci' : 'npm install'})...`);
  execFileSync(npm, lock ? ['ci'] : ['install'], { cwd: dir, stdio: 'inherit', shell: isWin });
}

/**
 * A stamp beside the project records the basePath its out/ was built with.
 * Without it, an export made for localhost would be silently republished under
 * the Pages prefix with every asset URL wrong.
 */
const stampFile = (dir) => path.join(dir, '.build-stamp.json');

const readStamp = (dir) => {
  try { return JSON.parse(fs.readFileSync(stampFile(dir), 'utf8')); } catch { return null; }
};

function exportApp({ dir, label, basePath, outDir, preserve }) {
  install(dir, label);

  const exportDir = path.join(dir, 'out');
  const stamp = readStamp(dir);
  const reason = !fs.existsSync(exportDir) ? 'no export yet'
    : force ? 'forced'
      : !stamp ? 'no build stamp'
        : stamp.basePath !== basePath ? `base path changed (${stamp.basePath || '/'} -> ${basePath || '/'})`
          : newestMtime(dir) > stamp.builtAt ? 'source changed'
            : null;

  if (reason) {
    console.log(`  building ${label} [${basePath || '/'}] — ${reason}`);
    fs.rmSync(exportDir, { recursive: true, force: true });
    execFileSync(npm, ['run', 'build'], {
      cwd: dir,
      stdio: 'inherit',
      shell: isWin,
      env: { ...process.env, NEXT_PUBLIC_BASE_PATH: basePath },
    });
  } else {
    console.log(`  ${label} export is current — reusing out/`);
  }

  if (!fs.existsSync(exportDir)) {
    throw new Error(`${label}: next build produced no out/ — check output: "export" in its next.config`);
  }
  flattenPrefetchPayloads(exportDir);
  fs.writeFileSync(stampFile(dir), `${JSON.stringify({ basePath, builtAt: Date.now() }, null, 2)}\n`);

  // The dashboard is published at the root of the bundle, so wiping outDir
  // wholesale would delete every project already built beside it.
  if (preserve) {
    for (const entry of fs.readdirSync(outDir)) {
      if (preserve.has(entry)) continue;
      fs.rmSync(path.join(outDir, entry), { recursive: true, force: true });
    }
  } else {
    fs.rmSync(outDir, { recursive: true, force: true });
  }
  copyDir(exportDir, outDir);
}

// ------------------------------------------------------------------ lint
function lint(projects) {
  let errors = 0;
  for (const project of projects) {
    const problems = checkProject(project);
    const errs = problems.filter((p) => p.level === 'error');
    const warns = problems.filter((p) => p.level === 'warn');
    errors += errs.length;
    console.log(`[${errs.length ? 'FAIL' : warns.length ? 'warn' : ' ok '}] ${project.id}`);
    for (const p of [...errs, ...warns]) console.log(`         ${p.level}: ${p.msg}`);
  }
  return errors;
}

// ------------------------------------------------------------------ run
const projects = only
  ? [findProject(only)].filter(Boolean)
  : listProjects();

if (only && !projects.length) {
  console.error(`No project "${only}". Run "npm run list" to see what exists.`);
  process.exit(1);
}

if (checkOnly) {
  const errors = lint(projects);
  console.log(`\n${projects.length} project(s), ${errors} error(s).`);
  process.exit(errors ? 1 : 0);
}

const errors = lint(projects);
if (errors) {
  console.error('\nFix the errors above before building — a broken project would ship to a client.');
  process.exit(1);
}

const fullBuild = !only && !dashboardOnly;
if (fullBuild && !keep) fs.rmSync(OUT_DIR, { recursive: true, force: true });
fs.mkdirSync(OUT_DIR, { recursive: true });

console.log(`\nBase prefix: ${BASE_PREFIX || '(root)'} — everything below is relative to it.\n`);

if (!only) {
  writeManifest();
  exportApp({
    dir: DASHBOARD_DIR,
    label: 'dashboard',
    basePath: BASE_PREFIX,
    outDir: OUT_DIR,
    preserve: new Set(listProjects().map((project) => project.category)),
  });
  // The dashboard owns the root of the bundle, so a category folder must not
  // share its name with one of the dashboard's own routes (/about, /privacy...).
  const dashboardRoutes = new Set(fs.readdirSync(path.join(DASHBOARD_DIR, 'out')));
  for (const category of new Set(listProjects().map((p) => p.category))) {
    if (dashboardRoutes.has(category)) {
      console.error('');
      console.error(`Category "${category}" collides with the dashboard's own /${category} route.`);
      console.error('Rename the category folder or that dashboard route.');
      process.exit(1);
    }
  }
}

if (!dashboardOnly) {
  for (const project of projects) {
    exportApp({
      dir: project.dir,
      label: project.id,
      basePath: `${BASE_PREFIX}${project.route}`.replace(/\/$/, ''),
      outDir: path.join(OUT_DIR, project.category, project.name),
    });
  }
}

// GitHub Pages runs Jekyll unless told not to, and Jekyll drops _next/.
fs.writeFileSync(path.join(OUT_DIR, '.nojekyll'), '');

console.log(`\nBuilt into ${rel(OUT_DIR)}/`);
if (fullBuild) {
  console.log(`  ${BASE_PREFIX || ''}/                     dashboard`);
  for (const project of projects) console.log(`  ${BASE_PREFIX}${project.route}   ${project.title}`);
  console.log('\nPreview exactly what will be live:  npm run preview');
}
