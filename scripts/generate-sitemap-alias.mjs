import { copyFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const distDir = path.resolve('dist');
const entries = await readdir(distDir);

const numberedSitemaps = entries
  .filter((name) => /^sitemap-\d+\.xml$/.test(name))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

const indexSitemap = 'sitemap-index.xml';
const sourceName =
  numberedSitemaps.length === 1
    ? numberedSitemaps[0]
    : entries.includes(indexSitemap)
      ? indexSitemap
      : numberedSitemaps[0];

if (!sourceName) {
  throw new Error('No sitemap source file found in dist/.');
}

await copyFile(path.join(distDir, sourceName), path.join(distDir, 'sitemap.xml'));
console.log(`Created dist/sitemap.xml from ${sourceName}`);
