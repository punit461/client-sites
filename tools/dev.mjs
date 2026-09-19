/**
 * The dashboard with hot reload, and every built site reachable from the same
 * origin — so clicking a project card opens the actual site instead of the
 * dashboard's 404.
 *
 * One address, one port to remember:
 *
 *     http://localhost:3000<base prefix>/            the dashboard, hot reloading
 *     http://localhost:3000<base prefix>/<cat>/<proj>/   that site's export
 *
 * How it works: Next's dev server runs on a private port, and a small router in
 * front of it serves /<category>/<project>/ straight from that project's out/
 * and passes everything else through (including the HMR socket). No project
 * ever gets a port of its own, and nothing is proxied to the public internet.
 *
 * The router runs under the same base prefix as a real build, which is the
 * point: the URLs you click here are the URLs that go live, and a project's
 * export stays valid when you switch between `npm run dev` and `npm run build`
 * instead of being rebuilt for a different path each time.
 *
 * Sites are served from their last build. A project you have never built shows
 * a page saying so, with the command to run — dev does not silently kick off a
 * minute-long Next build behind an HTTP request.
 *
 *   npm run dev
 *   PORT=4000 npm run dev
 */
import { createServer } from 'node:http';
import http from 'node:http';
import net from 'node:net';
import fs from 'node:fs';
import path from 'node:path';
import { spawn, execFileSync } from 'node:child_process';
import { DASHBOARD_DIR, BASE_PREFIX, isWin, npm } from './config.mjs';
import { listProjects, newestMtime } from './projects.mjs';
import { writeManifest } from './manifest.mjs';
import { resolveFile, sendFile, sendHtml } from './static.mjs';

const PORT = Number(process.env.PORT || 3000);

// ---------------------------------------------------------------- setup
writeManifest();

if (!fs.existsSync(path.join(DASHBOARD_DIR, 'node_modules'))) {
  const lock = fs.existsSync(path.join(DASHBOARD_DIR, 'package-lock.json'));
  console.log(`Installing the dashboard's dependencies (${lock ? 'npm ci' : 'npm install'})...`);
  execFileSync(npm, lock ? ['ci'] : ['install'], { cwd: DASHBOARD_DIR, stdio: 'inherit', shell: isWin });
}

/** An OS-assigned free port, so dev never collides with whatever else is running. */
const freePort = () =>
  new Promise((resolve, reject) => {
    const probe = net.createServer();
    probe.once('error', reject);
    probe.listen(0, '127.0.0.1', () => {
      const { port } = probe.address();
      probe.close(() => resolve(port));
    });
  });

const INTERNAL = await freePort();

/**
 * What each project is currently serving. `stamp` is written by tools/build.mjs
 * and records the base path its out/ was built for; if that does not match what
 * we are serving under, every asset URL inside it would be wrong.
 */
function survey() {
  return listProjects().map((project) => {
    const exportDir = path.join(project.dir, 'out');
    const stampFile = path.join(project.dir, '.build-stamp.json');
    let stamp = null;
    try { stamp = JSON.parse(fs.readFileSync(stampFile, 'utf8')); } catch { /* never built */ }

    const expected = `${BASE_PREFIX}${project.route}`.replace(/\/$/, '');
    const built = fs.existsSync(path.join(exportDir, 'index.html'));

    return {
      ...project,
      exportDir,
      built,
      expected,
      wrongPath: built && stamp ? stamp.basePath !== expected : false,
      stale: built && stamp ? newestMtime(project.dir) > stamp.builtAt : false,
    };
  });
}

/** Rebuilt on each request so adding or building a project needs no restart. */
const findProjectFor = (relPath) =>
  survey().find((p) => relPath === p.route.slice(0, -1) || relPath.startsWith(p.route));

// ---------------------------------------------------------------- next dev
/**
 * Next refuses to start a second dev server for the same directory, and it
 * records the first one in .next/dev/lock. A hard kill of this script (rather
 * than Ctrl+C) leaves that server orphaned, so without this the next
 * `npm run dev` would die with "Another next dev server is already running".
 *
 * So: adopt a live one, delete a stale lock, and only then start our own.
 */
const LOCK = path.join(DASHBOARD_DIR, '.next', 'dev', 'lock');

const answersOnPrefix = (port) =>
  new Promise((resolve) => {
    const req = http.get(
      { host: '127.0.0.1', port, path: `${BASE_PREFIX}/`, timeout: 2500 },
      (res) => { res.resume(); resolve((res.statusCode ?? 500) < 400); },
    );
    req.on('timeout', () => { req.destroy(); resolve(false); });
    req.on('error', () => resolve(false));
  });

async function existingDevServer() {
  let lock = null;
  try { lock = JSON.parse(fs.readFileSync(LOCK, 'utf8')); } catch { return null; }
  if (!lock?.port) return null;

  if (await answersOnPrefix(lock.port)) return lock;

  // Nothing listening, or it is serving a different base path: the lock is of
  // no use to us. Drop it so Next does not refuse to start.
  try { fs.rmSync(LOCK, { force: true }); } catch { /* not ours to remove */ }
  return null;
}

const adopted = await existingDevServer();
let child = null;
const devPort = adopted ? adopted.port : INTERNAL;

if (adopted) {
  console.log(`\n  Reusing the dashboard dev server already running (pid ${adopted.pid}, port ${adopted.port}).`);
} else {
  console.log(`\n  Starting the dashboard (Next dev on private port ${INTERNAL})...`);
  child = spawn(npm, ['run', 'dev', '--', '--port', String(INTERNAL)], {
    cwd: DASHBOARD_DIR,
    stdio: ['inherit', 'pipe', 'inherit'],
    shell: isWin,
    // The dashboard must run under the same prefix the router serves, or its
    // own links and assets would sit at a different path from the sites
    // beside it.
    env: { ...process.env, NEXT_PUBLIC_BASE_PATH: BASE_PREFIX, PORT: String(INTERNAL) },
  });
}

// Next prints its own "ready on localhost:<private port>" banner, which would
// send you to an address where the project links do not work. Swallow the URLs
// it advertises and print ours instead.
let announced = false;
const announce = () => { if (!announced) { announced = true; banner(); } };

if (child) {
  child.stdout.on('data', (chunk) => {
    const text = String(chunk);
    if (/https?:\/\/(localhost|\d+\.\d+\.\d+\.\d+):\d+/.test(text)) {
      announce();
      return;
    }
    process.stdout.write(text);
  });
  child.on('exit', (code) => process.exit(code ?? 0));
}

function banner() {
  const ready = survey();
  console.log(`\n  Dashboard + every built site, one origin:\n`);
  console.log(`    http://localhost:${PORT}${BASE_PREFIX}/\n`);
  for (const p of ready) {
    const note = !p.built ? 'not built yet — npm run build ' + p.id
      : p.wrongPath ? 'built for a different path — npm run build ' + p.id
        : p.stale ? 'source changed since its build' : 'ready';
    console.log(`    ${`${BASE_PREFIX}${p.route}`.padEnd(46)} ${note}`);
  }
  console.log(`\n  The dashboard hot-reloads. A site changes only when you rebuild it.`);
  console.log(`  Ctrl+C to stop.\n`);
}

// ---------------------------------------------------------------- router
const proxy = (req, res) => {
  const upstream = http.request(
    { host: '127.0.0.1', port: devPort, path: req.url, method: req.method, headers: req.headers },
    (up) => {
      res.writeHead(up.statusCode ?? 502, up.headers);
      up.pipe(res);
    },
  );
  upstream.on('error', () => {
    sendHtml(res, 503,
      `<meta http-equiv="refresh" content="1">
       <body style="font:15px system-ui;padding:3rem">The dashboard is still compiling — retrying…</body>`);
  });
  req.pipe(upstream);
};

const notBuiltPage = (p) => `<!doctype html>
<meta charset="utf-8"><title>${p.id} is not built</title>
<body style="font:16px/1.6 system-ui,-apple-system,'Segoe UI',sans-serif;max-width:40rem;margin:4rem auto;padding:0 1.5rem">
  <h1 style="font-size:1.5rem;margin:0 0 .5rem">${p.title} has not been built</h1>
  <p style="color:#555">A site is served from its last static export, and this one has
  ${p.wrongPath ? 'an export built for a different URL prefix' : 'no export yet'}.</p>
  <p>Build it, then reload this page:</p>
  <pre style="background:#f4f4f5;border-radius:8px;padding:1rem;overflow:auto"><code>npm run build ${p.id}</code></pre>
  <p><a href="${BASE_PREFIX}/">Back to the dashboard</a></p>
</body>`;

const server = createServer((req, res) => {
  const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);

  // Everything sits under the base prefix, exactly as in a build.
  if (BASE_PREFIX && urlPath !== BASE_PREFIX && !urlPath.startsWith(`${BASE_PREFIX}/`)) {
    res.writeHead(302, { Location: `${BASE_PREFIX}/` });
    return res.end();
  }
  const relPath = BASE_PREFIX ? urlPath.slice(BASE_PREFIX.length) || '/' : urlPath;

  const project = findProjectFor(relPath);
  if (!project) return proxy(req, res);          // the dashboard owns it

  if (!project.built || project.wrongPath) return sendHtml(res, 200, notBuiltPage(project));

  // Inside a project: strip its own route and serve from that project's out/.
  const withinProject = relPath.slice(project.route.length - 1) || '/';
  const file = resolveFile(project.exportDir, withinProject);
  if (file) return sendFile(res, file);

  const notFound = path.join(project.exportDir, '404.html');
  if (fs.existsSync(notFound)) {
    return sendHtml(res, 404, fs.readFileSync(notFound));
  }
  return sendHtml(res, 404,
    `<h1>404</h1><p>Nothing at <code>${withinProject}</code> in ${project.id}.</p>
     <p><a href="${BASE_PREFIX}/">Back to the dashboard</a></p>`);
});

// Next's hot-reload socket has to reach the dev server like any other request.
server.on('upgrade', (req, socket, head) => {
  const upstream = http.request({
    host: '127.0.0.1', port: devPort, path: req.url, method: req.method, headers: req.headers,
  });
  upstream.on('upgrade', (upRes, upSocket, upHead) => {
    socket.write(
      `HTTP/1.1 101 Switching Protocols\r\n${
        Object.entries(upRes.headers).map(([k, v]) => `${k}: ${v}`).join('\r\n')}\r\n\r\n`,
    );
    if (upHead?.length) upSocket.unshift(upHead);
    upSocket.pipe(socket);
    socket.pipe(upSocket);
    upSocket.on('error', () => socket.destroy());
    socket.on('error', () => upSocket.destroy());
  });
  upstream.on('error', () => socket.destroy());
  if (head?.length) upstream.write(head);
  upstream.end();
});

server.listen(PORT, () => {
  // An adopted server prints nothing, and a fresh one may skip its banner on a
  // warm cache — either way, say where things are once the port is up.
  if (adopted) announce();
  else setTimeout(announce, 4000);
});

function shutdown() {
  server.close();
  // Only stop the dev server if this process started it; an adopted one
  // belongs to whoever ran it and may still be in use.
  if (!child) process.exit(0);
  if (isWin && child.pid) {
    try { execFileSync('taskkill', ['/pid', String(child.pid), '/t', '/f'], { stdio: 'ignore' }); }
    catch { /* already gone */ }
  } else {
    child.kill('SIGTERM');
  }
  process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
