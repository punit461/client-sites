/**
 * Starts the dashboard: http://localhost:4321
 *
 * There is only one process to start, because there is only one origin. Every
 * project — the Next.js apps included — is statically exported by
 * tools/build.mjs into _site/<slug>/ and served from that same origin, so no
 * project gets a dev-server port of its own to run, keep alive, or clash with
 * another project. Clicking a project on the dashboard builds it on demand and
 * opens it in its own tab.
 *
 * To hack on a Next template with hot reload, `cd` into it and run its own
 * `npm run dev`; that's a standalone workflow, unrelated to this preview.
 *
 * Run from the repo root:  npm run start:all
 * Press Ctrl+C to stop.
 */
import { spawn, execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const isWin = process.platform === 'win32';
const npm = isWin ? 'npm.cmd' : 'npm';

const tasks = [
  { name: 'Dashboard: http://localhost:4321', cwd: ROOT, args: ['run', 'serve'] },
];

const children = tasks.map((t) => {
  console.log(`\n>>> ${t.name}`);
  return spawn(npm, t.args, { cwd: t.cwd, stdio: 'inherit', shell: isWin });
});

const pids = children.map((c) => c.pid);

function shutdown() {
  console.log('\n\nStopping all projects...');
  if (isWin) {
    for (const pid of pids) {
      try { execFileSync('taskkill', ['/pid', String(pid), '/t', '/f'], { stdio: 'ignore' }); }
      catch { /* already gone */ }
    }
  } else {
    for (const c of children) c.kill('SIGTERM');
  }
  process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

console.log('\nAll projects started. Press Ctrl+C to stop them all.');
