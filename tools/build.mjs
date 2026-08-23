/**
 * Builds every folder under sites/ into _site/, which GitHub Pages serves.
 *
 * Two kinds of site folder are supported on purpose:
 *   sites/<slug>/site.json    -> rendered with the shared template (the fast path)
 *   sites/<slug>/index.html   -> copied verbatim (hand-built or one-off designs)
 * If both exist, index.html wins — a hand edit should never be silently
 * overwritten by a regenerated template.
 *
 *   node tools/build.mjs            build everything
 *   node tools/build.mjs <slug>     build one site
 *   node tools/build.mjs --check    validate configs, write nothing
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { render } from './template.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITES = path.join(ROOT, 'sites');
const OUT = path.join(ROOT, '_site');

const args = process.argv.slice(2);
const checkOnly = args.includes('--check');
const noClean = args.includes('--no-clean');
const only = args.find((a) => !a.startsWith('-'));

const REQUIRED = [['business.name', 'the business name']];
const WARN_IF_MISSING = [
  ['whatsapp.number', 'no WhatsApp number — the main CTA will be missing'],
  ['contact.phone', 'no phone number'],
  ['business.tagline', 'no tagline'],
  ['gallery.0.src', 'no images at all — the page will look bare'],
];

const dig = (obj, dotted) => dotted.split('.').reduce((o, k) => (o == null ? o : o[k]), obj);

function copyDir(from, to) {
  if (!fs.existsSync(from)) return 0;
  fs.mkdirSync(to, { recursive: true });
  let n = 0;
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const src = path.join(from, entry.name);
    const dest = path.join(to, entry.name);
    if (entry.isDirectory()) n += copyDir(src, dest);
    else { fs.copyFileSync(src, dest); n++; }
  }
  return n;
}

function slugs() {
  if (!fs.existsSync(SITES)) return [];
  return fs.readdirSync(SITES, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith('_') && !d.name.startsWith('.'))
    .map((d) => d.name)
    .filter((name) => (only ? name === only : true))
    .sort();
}

function buildSite(slug) {
  const dir = path.join(SITES, slug);
  const outDir = path.join(OUT, slug);
  const configPath = path.join(dir, 'site.json');
  const handBuilt = path.join(dir, 'index.html');
  const problems = [];
  let site = null;

  if (fs.existsSync(handBuilt)) {
    if (!checkOnly) { copyDir(dir, outDir); }
    return { slug, mode: 'verbatim', problems, title: slug };
  }

  if (!fs.existsSync(configPath)) {
    problems.push({ level: 'error', msg: 'no site.json and no index.html' });
    return { slug, mode: 'skipped', problems };
  }

  try {
    site = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  } catch (err) {
    problems.push({ level: 'error', msg: `site.json is not valid JSON: ${err.message}` });
    return { slug, mode: 'skipped', problems };
  }

  for (const [field, label] of REQUIRED) {
    if (!dig(site, field)) problems.push({ level: 'error', msg: `missing ${label} (${field})` });
  }
  for (const [field, msg] of WARN_IF_MISSING) {
    if (!dig(site, field)) problems.push({ level: 'warn', msg });
  }
  // A brief handed over with TODOs still in it must never reach a client's inbox.
  const leftoverTodos = JSON.stringify(site).match(/TODO[^"]*/g) || [];
  for (const todo of leftoverTodos) {
    problems.push({ level: 'error', msg: `unfilled placeholder: ${todo.slice(0, 60)}` });
  }

  if (problems.some((p) => p.level === 'error')) return { slug, mode: 'blocked', problems, site };

  if (!checkOnly) {
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'index.html'), render(site, {
      demoBanner: site.meta?.demo_banner !== false,
      portfolioUrl: '../',
    }));
    copyDir(path.join(dir, 'assets'), path.join(outDir, 'assets'));
    if (site.meta?.noindex !== false) {
      fs.writeFileSync(path.join(outDir, 'robots.txt'), 'User-agent: *\nDisallow: /\n');
    }
  }
  return { slug, mode: 'rendered', problems, title: site.business?.name || slug, site };
}

function portfolioIndex(results) {
  const live = results.filter((r) => r.mode === 'rendered' || r.mode === 'verbatim');
  const cards = live.map((r) => `
      <a class="card" href="./${r.slug}/">
        <strong>${(r.title || r.slug).replace(/</g, '&lt;')}</strong>
        <span>${(r.site?.business?.category || '').replace(/</g, '&lt;')}${r.site?.contact?.city ? ' · ' + r.site.contact.city.replace(/</g, '&lt;') : ''}</span>
      </a>`).join('');
  return `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>Sample sites</title>
<style>
:root{--bg:#fff;--fg:#14181d;--muted:#5b6672;--line:#e3e7ec;--surface:#f6f7f9}
@media(prefers-color-scheme:dark){:root{--bg:#0e1116;--fg:#e8ecf1;--muted:#9aa6b3;--line:#28303a;--surface:#171c23}}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--fg);font:17px/1.6 system-ui,-apple-system,'Segoe UI',sans-serif;padding:clamp(2rem,6vw,4rem) clamp(1rem,5vw,2rem)}
main{max-width:900px;margin:0 auto}
h1{font-size:clamp(1.6rem,4vw,2.2rem);margin:0 0 .3rem}
p.sub{color:var(--muted);margin:0 0 2.5rem}
.grid{display:grid;gap:.8rem;grid-template-columns:repeat(auto-fill,minmax(240px,1fr))}
.card{display:flex;flex-direction:column;gap:.25rem;padding:1.1rem 1.2rem;border:1px solid var(--line);
border-radius:12px;text-decoration:none;color:inherit;background:var(--surface)}
.card:hover{border-color:var(--muted)}
.card span{color:var(--muted);font-size:.88rem}
footer{margin-top:3rem;color:var(--muted);font-size:.85rem}
</style></head>
<body><main>
<h1>Sample sites</h1>
<p class="sub">${live.length} demo${live.length === 1 ? '' : 's'} built for local businesses. Each one is a proposal, not an official site.</p>
<div class="grid">${cards}</div>
<footer>These pages are unaffiliated samples, hidden from search engines, and taken down on request.</footer>
</main></body></html>
`;
}

// ---------------------------------------------------------------- run
const names = slugs();
if (!names.length) {
  console.log('No sites yet. Add one at sites/<slug>/site.json');
  process.exit(0);
}
if (!checkOnly) {
  // The dev server passes --no-clean: wiping _site mid-request would 404 the
  // assets the browser is still fetching for the page it just loaded.
  if (!noClean) fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });
}

const results = names.map(buildSite);
let errors = 0;
for (const r of results) {
  const errs = r.problems.filter((p) => p.level === 'error');
  const warns = r.problems.filter((p) => p.level === 'warn');
  errors += errs.length;
  const tag = errs.length ? 'FAIL' : warns.length ? 'warn' : ' ok ';
  console.log(`[${tag}] ${r.slug} (${r.mode})`);
  for (const p of [...errs, ...warns]) console.log(`         ${p.level}: ${p.msg}`);
}

if (!checkOnly && !only) {
  fs.writeFileSync(path.join(OUT, 'index.html'), portfolioIndex(results));
  fs.writeFileSync(path.join(OUT, '.nojekyll'), '');
  fs.writeFileSync(path.join(OUT, 'robots.txt'), 'User-agent: *\nDisallow: /\n');
}

console.log(`\n${results.length} site(s), ${errors} error(s).`);
process.exit(errors ? 1 : 0);
