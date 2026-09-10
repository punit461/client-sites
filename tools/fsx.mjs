/** Recursive copy, shared by the builder, the scaffolder and the release tool. */
import fs from 'node:fs';
import path from 'node:path';

/** Everything that is regenerated and must never be copied into a new folder. */
export const BUILD_ARTEFACTS = [
  'node_modules', '.next', 'out', '.build-stamp.json', '.git', 'next-env.d.ts',
];

export function copyDir(from, to, { skip = [] } = {}) {
  const skipped = new Set(skip);
  fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    if (skipped.has(entry.name)) continue;
    const src = path.join(from, entry.name);
    const dest = path.join(to, entry.name);
    if (entry.isDirectory()) copyDir(src, dest, { skip });
    else fs.copyFileSync(src, dest);
  }
}

/**
 * Next 16 quirk, static export only: a nested route's prefetch payload is
 * written as a directory — about/__next.about/__PAGE__.txt — but the browser
 * asks for it flat, as about/__next.about.__PAGE__.txt. Every prefetch then
 * 404s and each navigation falls back to a full page load.
 *
 * So write the flat name alongside the directory. Purely additive: nothing is
 * moved or deleted, and when Next writes the flat name itself this becomes a
 * no-op that can be deleted.
 */
export function flattenPrefetchPayloads(root) {
  let written = 0;
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (!entry.isDirectory()) continue;
      if (entry.name.startsWith('__next.')) {
        for (const file of fs.readdirSync(full, { withFileTypes: true })) {
          if (!file.isFile()) continue;
          const flat = path.join(dir, `${entry.name}.${file.name}`);
          if (!fs.existsSync(flat)) { fs.copyFileSync(path.join(full, file.name), flat); written += 1; }
        }
      }
      if (entry.name !== '_next') walk(full);
    }
  };
  if (fs.existsSync(root)) walk(root);
  return written;
}
