import { readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');
const serverEntry = resolve(root, 'dist-ssr/entry-server.js');

const { renderHome, buildStructuredData } = await import(serverEntry);

async function inject(file, html, headExtra = '') {
  const path = resolve(dist, file);
  const template = await readFile(path, 'utf8');
  if (!template.includes('<!--app-html-->')) throw new Error(`Missing app placeholder in ${file}`);
  const output = template
    .replace('<!--app-html-->', html)
    .replace('<!--structured-data-->', headExtra);
  await writeFile(path, output);
  console.log(`prerendered ${file}`);
}

await inject('index.html', renderHome(), `<script type="application/ld+json">${buildStructuredData()}</script>`);

const today = new Date().toISOString().slice(0, 10);
await writeFile(
  resolve(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://audit.bemarvelousdigital.sk/</loc>
    <lastmod>${today}</lastmod>
  </url>
</urlset>
`,
);

await rm(resolve(root, 'dist-ssr'), { recursive: true, force: true });
