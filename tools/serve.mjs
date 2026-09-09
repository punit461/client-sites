/**
 * Local preview server: serves _site/ on http://localhost:4321 and exposes a
 * small API the dashboard uses to build a project on demand.
 *
 * Every project is reachable at /<slug>/ on this one origin. Nothing here ever
 * starts `next dev` or allocates a per-project port: "opening a project" means
 * building it into _site/<slug>/ and pointing a browser tab at it.
 *
 *   GET  /__api/projects           the project list with build status
 *   GET  /__api/build/<slug>       run a build, streaming the log back (SSE)
 *   POST /__api/build/<slug>       run a build, one JSON reply when it finishes
 *        ?force=1                  rebuild even when the export looks current
 */
import { createServer } from 'node:http';
import { spawn, execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, OUT, listProjects, kindOf, slugs, writeShell } from './projects.mjs';

const PORT = Number(process.env.PORT || 4321);
const BUILD = path.join(ROOT, 'tools', 'build.mjs');

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.mjs': 'text/javascript', '.json': 'application/json', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.gif': 'image/gif',
  '.svg': 'image/svg+xml', '.txt': 'text/plain; charset=utf-8', '.ico': 'image/x-icon',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.map': 'application/json',
};

// ------------------------------------------------------------------ builds
/**
 * One build per project at a time. A second request for a project that is
 * already building attaches to the run in progress instead of starting a
 * competing `next build` over the same out/ directory.
 */
const runs = new Map();

function startBuild(slug, { force = false } = {}) {
  const current = runs.get(slug);
  if (current && !current.finished) return current;
  // An EventSource reconnects a few seconds after the stream ends; without this
  // it would re-trigger the very build it just watched finish.
  if (current && !force && Date.now() - current.endedAt < 3000) return current;

  const args = [BUILD, slug, '--no-clean'];
  if (force) args.push('--force');

  const run = {
    slug, log: '', finished: false, ok: null, code: null,
    startedAt: Date.now(), endedAt: null, listeners: new Set(),
  };
  runs.set(slug, run);

  const emit = (text) => {
    run.log += text;
    for (const l of run.listeners) l.onLog(text);
  };
  const finish = (code) => {
    if (run.finished) return;
    run.finished = true;
    run.code = code;
    run.ok = code === 0;
    run.endedAt = Date.now();
    for (const l of run.listeners) l.onDone(run);
    run.listeners.clear();
  };

  console.log(`  building ${slug}${force ? ' (forced)' : ''}...`);
  const child = spawn(process.execPath, args, { cwd: ROOT });
  child.stdout.on('data', (c) => emit(c.toString()));
  child.stderr.on('data', (c) => emit(c.toString()));
  child.on('error', (err) => { emit(`\nfailed to start the build: ${err.message}\n`); finish(1); });
  child.on('close', (code) => {
    emit(`\n${code === 0 ? 'Build finished.' : `Build failed (exit ${code}).`}\n`);
    console.log(`  ${slug}: ${code === 0 ? 'built' : `FAILED (exit ${code})`}`);
    finish(code);
  });

  return run;
}

const runSummary = (run) => ({
  slug: run.slug,
  ok: run.ok,
  code: run.code,
  running: !run.finished,
  ms: (run.endedAt || Date.now()) - run.startedAt,
  url: `/${run.slug}/`,
});

// ------------------------------------------------------------------ helpers
const json = (res, status, body) => {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(JSON.stringify(body));
};

/** Static site.json pages are cheap to re-render, so keep the edit-and-refresh
 *  loop: rebuild that one project when its page is requested. Next apps are
 *  far too slow for that — the dashboard builds those on demand instead. */
const lastAuto = new Map();
function autoRebuild(slug) {
  if (kindOf(slug) !== 'config') return;
  if (Date.now() - (lastAuto.get(slug) || 0) < 800) return;
  lastAuto.set(slug, Date.now());
  try {
    execFileSync(process.execPath, [BUILD, slug, '--no-clean'], { stdio: 'inherit' });
  } catch {
    console.log(`  ${slug} did not rebuild — serving the last good build.`);
  }
}

// ------------------------------------------------------------------ startup
// Build once so the dashboard has something to list; existing Next exports are
// reused, so this is fast unless a template actually changed.
try {
  execFileSync(process.execPath, [BUILD, '--no-clean'], { stdio: 'inherit' });
} catch {
  console.log('\nBuild reported errors — serving whatever did build.\n');
}

// ------------------------------------------------------------------ server
createServer((req, res) => {
  const [rawPath, rawQuery = ''] = req.url.split('?');
  const url = decodeURIComponent(rawPath);
  const query = new URLSearchParams(rawQuery);

  // ---- dashboard API
  if (url === '/__api/projects') {
    const projects = listProjects({ withStatus: true }).map((p) => {
      const run = runs.get(p.slug);
      return { ...p, building: Boolean(run && !run.finished), lastBuild: run ? runSummary(run) : null };
    });
    return json(res, 200, { projects });
  }

  if (url.startsWith('/__api/build/')) {
    const slug = url.slice('/__api/build/'.length).replace(/\/$/, '');
    if (!slugs().includes(slug)) return json(res, 404, { error: `unknown project "${slug}"` });
    const force = query.get('force') === '1';

    // POST: build, then a single JSON reply. Kept for callers without EventSource.
    if (req.method === 'POST') {
      const run = startBuild(slug, { force });
      if (run.finished) return json(res, 200, { ...runSummary(run), log: run.log });
      const listener = { onLog() {}, onDone: (r) => json(res, 200, { ...runSummary(r), log: r.log }) };
      run.listeners.add(listener);
      req.on('close', () => run.listeners.delete(listener));
      return undefined;
    }

    // GET: stream the log so a slow `next build` shows progress as it happens.
    const run = startBuild(slug, { force });
    res.writeHead(200, {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no',
    });
    const send = (event, data) => res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
    send('start', runSummary(run));
    if (run.log) send('log', run.log);
    if (run.finished) { send('done', runSummary(run)); return res.end(); }

    const listener = {
      onLog: (text) => send('log', text),
      onDone: (r) => { send('done', runSummary(r)); res.end(); },
    };
    run.listeners.add(listener);
    const keepAlive = setInterval(() => res.write(': ping\n\n'), 15000);
    req.on('close', () => { clearInterval(keepAlive); run.listeners.delete(listener); });
    res.on('close', () => clearInterval(keepAlive));
    return undefined;
  }

  // ---- static files out of _site/
  const isDocument = url.endsWith('/') || url.endsWith('.html') || path.extname(url) === '';
  const slug = url.split('/').filter(Boolean)[0];
  if (isDocument) {
    if (slug) autoRebuild(slug);
    // Editing the dashboard itself only needs a refresh — no full rebuild.
    else writeShell();
  }

  let file = path.join(OUT, url);
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  if (!file.startsWith(OUT) || !fs.existsSync(file)) {
    // A project that exists but has not been built yet is a normal state now,
    // so say so rather than showing a bare 404.
    const known = slug && slugs().includes(slug);
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end(known
      ? `<h1>Not built yet</h1><p>"${slug}" has not been built into _site/ yet.</p>
         <p><a href="/">Open the dashboard</a> and build it, or run
         <code>node tools/build.mjs ${slug}</code>.</p>`
      : '<h1>404</h1><p><a href="/">Back to the dashboard</a></p>');
  }

  res.writeHead(200, {
    'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream',
    'Cache-Control': 'no-store',
  });
  return fs.createReadStream(file).pipe(res);
}).listen(PORT, () => console.log(`\n  Dashboard: http://localhost:${PORT}\n`));
