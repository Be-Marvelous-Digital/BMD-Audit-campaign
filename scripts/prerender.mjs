import { readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');
const serverEntry = resolve(root, 'dist-ssr/entry-server.js');

const { renderHome, buildStructuredData } = await import(serverEntry);

const PRELOAD_FONTS = [/^syne-latin-wght-normal-.*\.woff2$/, /^dm-sans-latin-wght-normal-.*\.woff2$/];

async function fontPreloads() {
  const assets = await readdir(resolve(dist, 'assets'));
  return PRELOAD_FONTS.map((pattern) => assets.find((name) => pattern.test(name)))
    .filter(Boolean)
    .map((name) => `<link rel="preload" href="/assets/${name}" as="font" type="font/woff2" crossorigin />`)
    .join('');
}

async function inlineStylesheets(html) {
  const links = [...html.matchAll(/<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/g)];
  let output = html;
  for (const [tag, href] of links) {
    const css = await readFile(resolve(dist, `.${href}`), 'utf8');
    output = output.replace(tag, `<style>${css}</style>`);
  }
  return output;
}

async function inject(file, html, headExtra = '') {
  const path = resolve(dist, file);
  const template = await readFile(path, 'utf8');
  if (!template.includes('<!--app-html-->')) throw new Error(`Missing app placeholder in ${file}`);
  const withContent = template
    .replace('<!--app-html-->', html)
    .replace('<!--structured-data-->', `${await fontPreloads()}${headExtra}`);
  await writeFile(path, await inlineStylesheets(withContent));
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
