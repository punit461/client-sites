/** Local preview: builds, then serves _site/ on http://localhost:4321. */
import { createServer } from 'node:http';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, '_site');
const PORT = Number(process.env.PORT || 4321);

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.json': 'application/json', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.png': 'image/png', '.webp': 'image/webp', '.gif': 'image/gif', '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8', '.ico': 'image/x-icon',
};

let lastBuild = 0;
function build({ force = false } = {}) {
  if (!force && Date.now() - lastBuild < 800) return;   // debounce asset bursts
  lastBuild = Date.now();
  try {
    execFileSync(process.execPath, [path.join(ROOT, 'tools/build.mjs'), '--no-clean'],
      { stdio: 'inherit' });
  } catch {
    console.log('\nBuild reported errors — serving whatever did build.\n');
  }
}

build({ force: true });

createServer((req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0]);
  let file = path.join(OUT, url);
  // Rebuild only when a page (not an asset) is requested, so editing
  // site.json needs nothing more than a browser refresh.
  const isDocument = url.endsWith('/') || url.endsWith('.html') || path.extname(url) === '';
  if (isDocument) build();
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  if (!file.startsWith(OUT) || !fs.existsSync(file)) {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    return res.end('<h1>404</h1><p><a href="/">Back to the index</a></p>');
  }
  res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
}).listen(PORT, () => console.log(`\n  http://localhost:${PORT}\n`));
