import { readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';

// Guard against unexpectedly shipping a much larger first-page payload.
// Additional feature chunks load on demand and are covered by browser tests.
const budgets = {
  js: 400 * 1024,
  css: 100 * 1024,
};
const html = await readFile('dist/index.html', 'utf8');
let problems = [];

for (const [extension, limit] of Object.entries(budgets)) {
  const matches = [...html.matchAll(new RegExp('assets/(index-[\\w-]+\\.' + extension + ')', 'g'))];
  const files = [...new Set(matches.map((match) => match[1]))];
  if (files.length !== 1) {
    problems.push(`Expected one entry ${extension} bundle, found ${files.length}`);
    continue;
  }
  const bytes = (await stat(join('dist/assets', files[0]))).size;
  console.log(
    `Entry ${extension.toUpperCase()}: ${(bytes / 1024).toFixed(1)} KiB / ${limit / 1024} KiB budget`,
  );
  if (bytes > limit) problems.push(`${files[0]} exceeds the entry-size budget`);
}

if (problems.length > 0) {
  for (const error of problems) console.error(error);
  process.exitCode = 1;
}
