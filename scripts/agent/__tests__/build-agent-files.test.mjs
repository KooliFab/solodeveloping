// @vitest-environment node
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import YAML from 'yaml';
import { buildAgentFiles, buildPageMarkdown, findPageRoutes, loadSiteData } from '../build-agent-files.mjs';

const SITE = 'https://solodeveloping.com';

const pageHtml = ({ lang = 'en', title, canonical, body }) => `<!DOCTYPE html><html lang="${lang}"><head>
<title>${title}</title><meta name="description" content="${title} description">
<link rel="canonical" href="${canonical}"></head><body><main>${body}</main></body></html>`;

describe('buildAgentFiles', () => {
  let distDir;

  beforeAll(async () => {
    distDir = await fs.mkdtemp(path.join(os.tmpdir(), 'agent-dist-'));
    const pages = {
      '': pageHtml({ title: 'Home', canonical: `${SITE}/`, body: '<h1>Home</h1>' }),
      fr: pageHtml({ lang: 'fr', title: 'Accueil', canonical: `${SITE}/fr`, body: '<h1>Accueil</h1>' }),
      about: pageHtml({ title: 'About', canonical: `${SITE}/about`, body: '<h1>About</h1>' }),
      'articles/flutter-pwa-guide': pageHtml({ title: 'PWA', canonical: `${SITE}/articles/flutter-pwa-guide`, body: '<p>rendered html</p>' }),
      404: pageHtml({ title: 'Not found', canonical: `${SITE}/404`, body: '<h1>404</h1>' }),
      'assets/nested': pageHtml({ title: 'Asset', canonical: SITE, body: '' }),
    };
    for (const [dir, html] of Object.entries(pages)) {
      await fs.mkdir(path.join(distDir, dir), { recursive: true });
      await fs.writeFile(path.join(distDir, dir, 'index.html'), html);
    }
    await buildAgentFiles(distDir, SITE);
  });

  afterAll(async () => {
    await fs.rm(distDir, { recursive: true, force: true });
  });

  const read = (file) => fs.readFile(path.join(distDir, file), 'utf8');

  it('finds prerendered pages, skipping the 404 copy and asset folders', async () => {
    expect(await findPageRoutes(distDir)).toEqual(['/', '/about', '/articles/flutter-pwa-guide', '/fr/']);
  });

  it('writes Markdown mirrors at the llms.txt URLs', async () => {
    expect(await read('index.html.md')).toMatch(/^# Home\n/);
    expect(await read('fr/index.html.md')).toMatch(/^# Accueil\n/);
    expect(await read('about.md')).toMatch(/^# About\n/);
    await expect(read('404/index.html.md')).rejects.toThrow();
  });

  it('builds article mirrors from the authored Markdown, not the rendered HTML', async () => {
    const markdown = await read('articles/flutter-pwa-guide.md');
    expect(markdown).toMatch(/^# Flutter PWA Guide/);
    expect(markdown).not.toContain('rendered html');
  });

  it('writes the Markdown 404 body and every JSON document', async () => {
    expect(await read('404.md')).toContain('llms.txt');
    for (const file of ['404.json', 'api/index.json', 'api/profile.json', 'api/projects.json', 'api/articles.json', 'api/errors/404.json', 'api/errors/405.json', 'openapi.json', 'api/openapi.json', '.well-known/api-catalog']) {
      expect(JSON.parse(await read(file)), file).toBeTypeOf('object');
    }
  });

  it('publishes the same OpenAPI description as JSON and YAML at both locations', async () => {
    const spec = JSON.parse(await read('openapi.json'));
    expect(JSON.parse(await read('api/openapi.json'))).toEqual(spec);
    for (const file of ['openapi.yaml', 'api/openapi.yaml']) {
      const yaml = await read(file);
      expect(yaml, file).toMatch(/^openapi: 3\.1\.0\n/);
      expect(YAML.parse(yaml), file).toEqual(spec);
    }
  });
});

describe('buildPageMarkdown', () => {
  it('matches French and short-post routes to their source posts', async () => {
    const data = await loadSiteData();
    const html = pageHtml({ lang: 'fr', title: 'x', canonical: `${SITE}/fr/shorts/why-i-dont-build-saas-around-ai-api-keys`, body: '' });
    const markdown = buildPageMarkdown('/fr/shorts/why-i-dont-build-saas-around-ai-api-keys', html, data, SITE);
    expect(markdown).toMatch(/^# Pourquoi je ne crée pas de SaaS/);
  });
});
