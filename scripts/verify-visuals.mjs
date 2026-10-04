import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';

const manifest = JSON.parse(await readFile('src/visuals/SOURCE-MANIFEST.json', 'utf8'));
const engines = manifest.filter((entry) => entry.to.endsWith('.js'));
const failures = [];
for (const entry of engines) {
  const contents = await readFile(resolve(entry.to));
  const actual = createHash('sha256').update(contents).digest('hex');
  if (actual !== entry.sha256) failures.push(entry.to);
}
if (failures.length) {
  console.error('Supplied rendering engines changed:', failures.join(', '));
  process.exitCode = 1;
} else {
  console.log(`${engines.length} supplied rendering/data modules match the original archive.`);
}
