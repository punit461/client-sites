/**
 * One place for the paths and the base prefix that every other tool reads.
 *
 * `basePrefix` is the path the whole bundle is served under. On GitHub Pages
 * for a repo called client-sites that is "/client-sites"; on a custom domain
 * (or a user/org Pages site) it is "". The preview server mounts _site/ at the
 * same prefix, so what you show a client is byte-identical to what goes live.
 *
 * Override it per command with the BASE_PREFIX environment variable — CI sets
 * it from the repo name so renaming the repo needs no edit here.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const configFile = path.join(ROOT, 'client-sites.config.json');
const config = fs.existsSync(configFile)
  ? JSON.parse(fs.readFileSync(configFile, 'utf8'))
  : {};

/** "" | "/one" | "/one/two" — never a trailing slash, always a leading one. */
export function normalizePrefix(value) {
  const trimmed = String(value ?? '').trim().replace(/\/+$/, '');
  if (!trimmed || trimmed === '/') return '';
  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
}

export const SITES_DIR = path.join(ROOT, 'sites');
export const DASHBOARD_DIR = path.join(ROOT, 'dashboard');
export const OUT_DIR = path.join(ROOT, config.outDir || '_site');
export const RELEASES_DIR = path.join(ROOT, 'releases');
export const MANIFEST_FILE = path.join(DASHBOARD_DIR, 'src', 'generated', 'projects.json');

export const BASE_PREFIX = normalizePrefix(process.env.BASE_PREFIX ?? config.basePrefix ?? '');
export const TITLE = config.title || 'Client Sites';
export const TAGLINE = config.tagline || '';
export const PREVIEW_PORT = Number(process.env.PORT || 4321);

export const isWin = process.platform === 'win32';
export const npm = isWin ? 'npm.cmd' : 'npm';
