import { readdir, stat, access, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

const root = 'public';
const groups = {
  'assets/editorial': ['evidence', 'investigation', 'scope'].flatMap((name) => [
    `${name}.webp`,
    `${name}-600.webp`,
  ]),
  'assets/inner': [
    'search',
    'methodology',
    'monitoring',
    'teams',
    'api',
    'pricing',
    'about',
    'scanning',
    'contact',
  ].map((name) => `${name}.webp`),
  'assets/use-cases': ['bug-bounty.webp', 'vulnerability-research.webp', 'osint.webp'],
  'assets/brand': ['favicon.svg', 'logo.svg'],
  'assets/partners': [
    'ibm.svg',
    'microsoft.svg',
    'google.svg',
    'samsung.svg',
    'openai.svg',
    'adobe.svg',
  ],
  'assets/illustrations/api': ['api-layers.webp', 'api-layers-360.webp', 'api-layers-600.webp'],
  'assets/illustrations/closing': ['desktop', '1024', '768', '430', '390', '360', '320'].flatMap(
    (size) => [`start-${size}.webp`, `start-${size}-dark.webp`],
  ),
  'assets/illustrations/walkthrough': ['query', 'results', 'host'].flatMap((scene) => [
    `step-${scene}.webp`,
    `step-${scene}-dark.webp`,
    ...[360, 600].flatMap((width) => [
      `step-${scene}-${width}.webp`,
      `step-${scene}-dark-${width}.webp`,
    ]),
  ]),
};

const expected = new Set(
  Object.entries(groups).flatMap(([folder, files]) => files.map((name) => `${folder}/${name}`)),
);

async function allFiles(directory) {
  const output = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const pathname = join(directory, entry.name);
    if (entry.isDirectory()) output.push(...(await allFiles(pathname)));
    else if (entry.isFile()) output.push(relative(root, pathname).split('\\').join('/'));
  }
  return output;
}

const actual = new Set(await allFiles(join(root, 'assets')));
const corrupt = [];
for (const filename of actual) {
  const data = await readFile(join(root, filename));
  if (filename.endsWith('.webp')) {
    if (
      data.length < 40 ||
      data.toString('ascii', 0, 4) !== 'RIFF' ||
      data.toString('ascii', 8, 12) !== 'WEBP'
    ) {
      corrupt.push(filename);
    }
  } else if (filename.endsWith('.svg')) {
    const svg = data.toString('utf8');
    if (!/<svg[\s>]/i.test(svg) || /<script[\s>]|<foreignObject[\s>]|\son\w+\s*=/i.test(svg)) {
      corrupt.push(filename);
    }
  }
}
const missing = [...expected].filter((path) => !actual.has(path));
const unexpected = [...actual].filter((path) => !expected.has(path));
const localFonts = [
  'fonts/instrument-sans-latin.woff2',
  'fonts/ibm-plex-mono-latin.woff2',
  'fonts/ibm-plex-mono-latin-1.woff2',
  'fonts/LICENSE-Instrument-Sans.txt',
  'fonts/LICENSE-IBM-Plex-Mono.txt',
];
for (const filename of localFonts) {
  try {
    await access(join(root, filename));
    if ((await stat(join(root, filename))).size === 0) missing.push(filename);
  } catch {
    missing.push(filename);
  }
}

if (missing.length || unexpected.length || corrupt.length) {
  for (const filename of missing) console.error('Missing asset:', filename);
  for (const filename of unexpected) console.error('Unregistered asset:', filename);
  for (const filename of corrupt) console.error('Corrupt/unsafe asset:', filename);
  process.exitCode = 1;
} else {
  console.log(
    `Verified ${expected.size} images/logos and ${localFonts.length} font/license files.`,
  );
}
