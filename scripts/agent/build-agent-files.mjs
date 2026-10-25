#!/usr/bin/env node
// Writes the machine-readable side of the site into the prerendered build:
// Markdown mirrors of every page, the Markdown 404 body, the static JSON API,
// its OpenAPI description and the RFC 9727 API catalog.
// Run after react-snap: `node scripts/agent/build-agent-files.mjs [distDir]`.
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { LANGUAGE_ROOTS, markdownPathFor } from '../../src/lib/markdownPath.js';
import { articleToMarkdown, htmlPageToMarkdown, notFoundMarkdown, readPageMeta } from './markdown.mjs';
import {
  buildApiCatalog,
  buildApiIndex,
  buildArticles,
  buildProblem,
  buildProfile,
  buildProjects,
} from './api.mjs';
import { buildOpenApi } from './openapi.mjs';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

export const SITE_URL = (process.env.VITE_SITE_URL || 'https://solodeveloping.com').replace(/\/+$/, '');

// Prerendered files that are not pages of their own.
const SKIPPED_DIRS = new Set(['404', 'assets', 'api', 'locales', 'images', 'icons', 'illustrations']);

const importData = async (file) => import(pathToFileURL(path.join(rootDir, 'src/data', file)).href);

export const loadSiteData = async () => {
  const [{ profile }, { facets }, { founderProducts }, { blogPosts }, { shortArticles }] = await Promise.all([
    importData('profile.js'),
    importData('facets.js'),
    importData('founderProducts.js'),
    importData('blogPosts.js'),
    importData('shortArticles.js'),
  ]);
  const readTranslations = async (lang) => JSON.parse(
    await fs.readFile(path.join(rootDir, 'public/locales', lang, 'translation.json'), 'utf8'),
  );
  const translations = { en: await readTranslations('en'), fr: await readTranslations('fr') };
  return { profile, facets, founderProducts, blogPosts, shortArticles, translations };
};

// Every prerendered `<route>/index.html` under distDir, as URL paths ("/", "/fr/", "/about").
export const findPageRoutes = async (distDir, relative = '') => {
  const routes = [];
  const entries = await fs.readdir(path.join(distDir, relative), { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isFile() && entry.name === 'index.html') {
      routes.push(relative === '' ? '/' : `/${relative}${LANGUAGE_ROOTS.includes(`/${relative}`) ? '/' : ''}`);
    } else if (entry.isDirectory() && !(relative === '' && SKIPPED_DIRS.has(entry.name))) {
      routes.push(...await findPageRoutes(distDir, path.posix.join(relative, entry.name)));
    }
  }

  return routes.sort();
};

const findArticle = (route, { blogPosts, shortArticles }) => {
  const match = route.match(/^(?:\/(fr))?\/(articles|shorts)\/([^/]+)$/);
  if (!match) return null;
  const [, fr, section, slug] = match;
  const lang = fr ? 'fr' : 'en';
  const posts = section === 'articles' ? blogPosts : shortArticles;
  const post = posts.find((candidate) => candidate.slug[lang] === slug && candidate.content?.[lang]);
  return post ? { post, lang } : null;
};

export const buildPageMarkdown = (route, html, data, siteUrl = SITE_URL) => {
  const pageUrl = `${siteUrl}${route}`;
  const article = findArticle(route, data);

  if (article) {
    const meta = readPageMeta(html, pageUrl);
    return articleToMarkdown(article.post, article.lang, { ...meta, siteUrl });
  }

  return htmlPageToMarkdown(html, { pageUrl, siteUrl });
};

export const buildJsonFiles = (data, siteUrl = SITE_URL) => ({
  'api/index.json': buildApiIndex({ siteUrl }),
  'api/profile.json': buildProfile({ siteUrl, ...data }),
  'api/projects.json': buildProjects(data),
  'api/articles.json': buildArticles({ siteUrl, ...data }),
  'api/errors/404.json': buildProblem({ siteUrl, status: 404 }),
  'api/errors/405.json': buildProblem({ siteUrl, status: 405 }),
  'openapi.json': buildOpenApi({ siteUrl }),
  '.well-known/api-catalog': buildApiCatalog({ siteUrl }),
});

const writeFile = async (distDir, relativePath, content) => {
  const target = path.join(distDir, relativePath);
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, content, 'utf8');
};

export const buildAgentFiles = async (distDir, siteUrl = SITE_URL) => {
  const data = await loadSiteData();
  const written = [];

  for (const route of await findPageRoutes(distDir)) {
    const html = await fs.readFile(path.join(distDir, route, 'index.html'), 'utf8');
    const target = markdownPathFor(route).slice(1);
    await writeFile(distDir, target, buildPageMarkdown(route, html, data, siteUrl));
    written.push(target);
  }

  await writeFile(distDir, '404.md', notFoundMarkdown(siteUrl));
  written.push('404.md');

  for (const [target, document] of Object.entries(buildJsonFiles(data, siteUrl))) {
    await writeFile(distDir, target, `${JSON.stringify(document, null, 2)}\n`);
    written.push(target);
  }

  return written;
};

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const distDir = path.resolve(process.argv[2] || path.join(rootDir, 'dist'));
  const written = await buildAgentFiles(distDir);
  console.log(`🤖 Agent files written to ${path.relative(rootDir, distDir) || distDir}: ${written.length}`);
  written.forEach((file) => console.log(`   ${file}`));
}
