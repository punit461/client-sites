/**
 * Serving static files the way a static host does, shared by the preview
 * server and the dev server so the two can never drift apart on what a URL
 * resolves to.
 */
import fs from 'node:fs';
import path from 'node:path';

export const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml', '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif',
  '.webp': 'image/webp', '.avif': 'image/avif', '.woff': 'font/woff', '.woff2': 'font/woff2',
  '.ttf': 'font/ttf', '.otf': 'font/otf', '.map': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
};

export const contentType = (file) =>
  TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream';

/**
 * dir/foo/ -> dir/foo/index.html, dir/foo -> dir/foo.html, as static hosts do.
 * Returns null for anything that does not exist or tries to escape `dir`.
 */
export function resolveFile(dir, urlPath) {
  const target = path.join(dir, urlPath);
  // Nothing outside the served directory, whatever ".." the URL contains. The
  // trailing separator stops a sibling like _site-old from matching.
  const root = path.resolve(dir);
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

export function sendFile(res, file) {
  res.writeHead(200, { 'Content-Type': contentType(file), 'Cache-Control': 'no-store' });
  return fs.createReadStream(file).pipe(res);
}

export function sendHtml(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(body);
}
