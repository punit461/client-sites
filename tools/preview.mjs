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
import { contentType, resolveFile } from './static.mjs';

if (!fs.existsSync(path.join(OUT_DIR, 'index.html'))) {
  console.error(`Nothing built yet in ${path.relative(ROOT, OUT_DIR)}/ — run "npm run build" first.`);
  process.exit(1);
}

const send = (res, status, type, body) => {
  res.writeHead(status, { 'Content-Type': type, 'Cache-Control': 'no-store' });
  res.end(body);
};

createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split('?')[0]);

  // Everything lives under the base prefix, exactly as it will in production.
  if (BASE_PREFIX && urlPath !== BASE_PREFIX && !urlPath.startsWith(`${BASE_PREFIX}/`)) {
    res.writeHead(302, { Location: `${BASE_PREFIX}/` });
    return res.end();
  }
  const relPath = BASE_PREFIX ? urlPath.slice(BASE_PREFIX.length) || '/' : urlPath;

  const file = resolveFile(OUT_DIR, relPath);
  if (!file) {
    const notFound = path.join(OUT_DIR, '404.html');
    if (fs.existsSync(notFound)) {
      return send(res, 404, 'text/html; charset=utf-8', fs.readFileSync(notFound));
    }
    return send(res, 404, 'text/html; charset=utf-8',
      `<h1>404</h1><p>Nothing built at <code>${relPath}</code>.</p>
       <p><a href="${BASE_PREFIX}/">Back to the dashboard</a> — or run <code>npm run build</code>.</p>`);
  }

  res.writeHead(200, { 'Content-Type': contentType(file), 'Cache-Control': 'no-store' });
  return fs.createReadStream(file).pipe(res);
}).listen(PREVIEW_PORT, () => {
  console.log(`\n  Serving ${path.relative(ROOT, OUT_DIR)}/ exactly as it will be published:`);
  console.log(`\n    http://localhost:${PREVIEW_PORT}${BASE_PREFIX}/\n`);
  console.log('  Ctrl+C to stop.\n');
});
