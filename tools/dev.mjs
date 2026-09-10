/**
 * Runs the dashboard with hot reload — for working on the dashboard itself.
 *
 * The project cards link to /<category>/<project>/, which only exist in a
 * build, so they will 404 here. To look at a site, either work on it directly
 * (cd sites/<category>/<project> && npm run dev) or build the bundle and use
 * `npm run preview`, which serves exactly what goes live.
 */
import fs from 'node:fs';
import path from 'node:path';
import { spawn, execFileSync } from 'node:child_process';
import { DASHBOARD_DIR, isWin, npm } from './config.mjs';
import { writeManifest } from './manifest.mjs';

writeManifest();

if (!fs.existsSync(path.join(DASHBOARD_DIR, 'node_modules'))) {
  const lock = fs.existsSync(path.join(DASHBOARD_DIR, 'package-lock.json'));
  console.log(`Installing the dashboard's dependencies (${lock ? 'npm ci' : 'npm install'})...`);
  execFileSync(npm, lock ? ['ci'] : ['install'], { cwd: DASHBOARD_DIR, stdio: 'inherit', shell: isWin });
}

console.log('\n  Dashboard with hot reload. Project links need a build — see npm run preview.\n');

const child = spawn(npm, ['run', 'dev'], { cwd: DASHBOARD_DIR, stdio: 'inherit', shell: isWin });
child.on('exit', (code) => process.exit(code ?? 0));
