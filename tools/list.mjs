/** Prints what exists, what state it is in, and what would fail a build. */
import fs from 'node:fs';
import path from 'node:path';
import { BASE_PREFIX, OUT_DIR } from './config.mjs';
import { listCategories, checkProject } from './projects.mjs';

const categories = listCategories();
if (!categories.length) {
  console.log('No categories yet. Create one with:  npm run new -- <category>/<project> --from <existing>');
  process.exit(0);
}

let projects = 0;
let errors = 0;

for (const category of categories) {
  console.log(`\n${category.name}  (sites/${category.id})`);
  if (!category.projects.length) console.log('  — empty —');

  for (const project of category.projects) {
    projects += 1;
    const problems = checkProject(project);
    const errs = problems.filter((p) => p.level === 'error');
    errors += errs.length;
    const built = fs.existsSync(path.join(OUT_DIR, project.category, project.name, 'index.html'));

    console.log(`  ${project.name}`);
    console.log(`      ${project.title}${project.client ? ` — ${project.client}` : ''}  [${project.status}]`);
    console.log(`      ${BASE_PREFIX}${project.route}${built ? '' : '   (not built yet)'}`);
    for (const p of problems) console.log(`      ${p.level}: ${p.msg}`);
  }
}

console.log(`\n${projects} project(s) in ${categories.length} categor${categories.length === 1 ? 'y' : 'ies'}, ${errors} error(s).`);
process.exit(errors ? 1 : 0);
