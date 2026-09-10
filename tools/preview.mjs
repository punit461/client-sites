/**
 * Serves the built bundle — nothing else. No compiling, no watching, no API.
 *
 * _site/ is mounted at the same base prefix it was built for, so the URLs you
 * click here are the URLs that go live. If a page is missing, the answer is to
 * build it, not to restart this.
 *
 *   npm run preview           http://localhost:4321<base prefix>/
 *   PORT=5000 npm run preview
 */
import { createServer } from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { OUT_DIR, BASE_PREFIX, PREVIEW_PORT, ROOT } from './config.mjs';

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml', '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif',
  '.webp': 'image/webp', '.avif': 'image/avif', '.woff': 'font/woff', '.woff2': 'font/woff2',
  '.ttf': 'font/ttf', '.otf': 'font/otf', '.map': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
};

if (!fs.existsSync(path.join(OUT_DIR, 'index.html'))) {
  console.error(`Nothing built yet in ${path.relative(ROOT, OUT_DIR)}/ — run "npm run build" first.`);
  process.exit(1);
}

const send = (res, status, type, body) => {
  res.writeHead(status, { 'Content-Type': type, 'Cache-Control': 'no-store' });
  res.end(body);
};

/** out/foo/ -> out/foo/index.html, out/foo -> out/foo.html — as static hosts do. */
function resolveFile(urlPath) {
  const target = path.join(OUT_DIR, urlPath);
  // Nothing outside the build directory is ever served, whatever ".." the URL
  // contains. The trailing separator stops a sibling like _site-old matching.
  const root = path.resolve(OUT_DIR);
  const resolved = path.resolve(target);
  if (resolved !== root && !resolved.startsWith(root + path.sep)) return null;
  if (fs.existsSync(target) && fs.statSync(target).isDirectory()) {
    const index = path.join(target, 'index.html');
    return fs.existsSync(index) ? index : null;
  }
  if (fs.existsSync(target) && fs.statSync(target).isFile()) return target;
  const asHtml = `${target}.html`;
  return fs.existsSync(asHtml) ? asHtml : null;
}

createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split('?')[0]);

  // Everything lives under the base prefix, exactly as it will in production.
  if (BASE_PREFIX && urlPath !== BASE_PREFIX && !urlPath.startsWith(`${BASE_PREFIX}/`)) {
    res.writeHead(302, { Location: `${BASE_PREFIX}/` });
    return res.end();
  }
  const relPath = BASE_PREFIX ? urlPath.slice(BASE_PREFIX.length) || '/' : urlPath;

  const file = resolveFile(relPath);
  if (!file) {
    const notFound = path.join(OUT_DIR, '404.html');
    if (fs.existsSync(notFound)) {
      return send(res, 404, 'text/html; charset=utf-8', fs.readFileSync(notFound));
    }
    return send(res, 404, 'text/html; charset=utf-8',
      `<h1>404</h1><p>Nothing built at <code>${relPath}</code>.</p>
       <p><a href="${BASE_PREFIX}/">Back to the dashboard</a> — or run <code>npm run build</code>.</p>`);
  }

  res.writeHead(200, {
    'Content-Type': TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream',
    'Cache-Control': 'no-store',
  });
  return fs.createReadStream(file).pipe(res);
}).listen(PREVIEW_PORT, () => {
  console.log(`\n  Serving ${path.relative(ROOT, OUT_DIR)}/ exactly as it will be published:`);
  console.log(`\n    http://localhost:${PREVIEW_PORT}${BASE_PREFIX}/\n`);
  console.log('  Ctrl+C to stop.\n');
});
