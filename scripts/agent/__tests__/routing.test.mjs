// @vitest-environment node
// The server has no SPA fallback any more: a URL is served only if react-snap
// prerendered it, or if .htaccess redirects it. These checks keep new routes
// from silently turning into 404s, and the old soft-404 setup from coming back.
import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const read = (file) => fs.readFileSync(path.join(rootDir, file), 'utf8');

const packageJson = JSON.parse(read('package.json'));
const htaccess = read('public/.htaccess');
const appRoutes = [...read('src/App.jsx').matchAll(/<Route path="([^"]+)"/g)].map((match) => match[1]);

const normalize = (route) => route.replace(/\/+$/, '') || '/';
const prerendered = new Set(packageJson.reactSnap.include.map(normalize));
// Path redirects only: the host-conditional www rule matches every path.
const redirected = [...htaccess.matchAll(/^\s*RewriteRule \^(\S+?)\$ \S+ \[R=301/gm)]
  .map((match) => match[1])
  .filter((pattern) => pattern !== '(.*)')
  .map((pattern) => new RegExp(`^${pattern}$`));

describe('static routes', () => {
  const staticRoutes = appRoutes.filter((route) => route !== '*' && !route.includes(':'));

  it.each(staticRoutes)('%s is prerendered or redirected', (route) => {
    const isRedirected = redirected.some((pattern) => pattern.test(route.slice(1)));
    expect(prerendered.has(normalize(route)) || isRedirected).toBe(true);
  });

  it('does not prerender /404 as a page (it must answer with a 404 status)', () => {
    expect(prerendered.has('/404')).toBe(false);
  });
});

describe('.htaccess', () => {
  it('has no catch-all SPA fallback to index.html', () => {
    expect(htaccess).not.toMatch(/RewriteRule\s+\^\s+index\.html/);
  });

  it('serves the prerendered not-found page with a real 404 status', () => {
    expect(htaccess).toMatch(/^ErrorDocument 404 \/404\.html$/m);
    expect(fs.existsSync(path.join(rootDir, 'public/404.html'))).toBe(false);
  });

  it('does not rely on REDIRECT_STATUS, which LiteSpeed (Hostinger) does not set', () => {
    for (const file of ['public/.htaccess', 'public/api/.htaccess', 'public/api/errors/.htaccess']) {
      expect(read(file), file).not.toMatch(/%\{ENV:REDIRECT_STATUS\}/);
    }
  });

  it('never answers a direct error-document request with a 404 (it would loop on LiteSpeed)', () => {
    expect(htaccess).not.toMatch(/RewriteRule \^\(?404\\\.html[^\n]*R=404/);
    expect(htaccess).toMatch(/<FilesMatch "\^\(404\\\.html\|404\\\.md\|200\\\.html\)\$">\s*Header set X-Robots-Tag "noindex"/);
  });

  it('negotiates Markdown with Vary: Accept and a UTF-8 text/markdown type', () => {
    expect(htaccess).toMatch(/^AddType text\/markdown \.md$/m);
    expect(htaccess).toMatch(/^AddCharset utf-8 \.md$/m);
    expect(htaccess).toMatch(/Header merge Vary "Accept"/);
  });

  it('runs the post-prerender generator in build and deploy', () => {
    expect(packageJson.scripts.postbuild).toContain('scripts/agent/build-agent-files.mjs');
    expect(packageJson.scripts.deploy).toMatch(
      /react-snap && node scripts\/agent\/build-agent-files\.mjs && node scripts\/check-dist-secrets\.mjs && node deploy\.js/,
    );
  });
});

describe('index.html', () => {
  const indexHtml = read('index.html');

  it('leaves the title and description to each page so they are not duplicated', () => {
    expect(indexHtml).not.toMatch(/<title>/);
    expect(indexHtml).not.toMatch(/name="description"/);
  });

  it('links agents to llms.txt, the API catalog and the OpenAPI document', () => {
    expect(indexHtml).toContain('<link rel="describedby" type="text/plain" href="/llms.txt" />');
    expect(indexHtml).toContain('<link rel="api-catalog" href="/.well-known/api-catalog" />');
    expect(indexHtml).toContain('href="/openapi.json"');
  });
});

describe('llms.txt', () => {
  const llms = read('public/llms.txt');
  const h2Sections = llms.split(/^## /m).slice(1);

  it('starts with an H1 and a blockquote summary', () => {
    expect(llms).toMatch(/^# .+\n\n> /);
  });

  it('only has headings for H2 file lists made of [name](url) items', () => {
    expect(llms.match(/^#{1,6} /gm).filter((heading) => heading !== '## ')).toEqual(['# ']);
    for (const section of h2Sections) {
      const items = section.split('\n').slice(1).filter((line) => line.trim());
      expect(items.length, section.split('\n')[0]).toBeGreaterThan(0);
      items.forEach((item) => expect(item).toMatch(/^- \[[^\]]+\]\([^)\s]+\)(: .+)?$/));
    }
  });

  it('lists the developer resources', () => {
    expect(llms).toContain('## Developer resources');
    expect(llms).toContain('(https://solodeveloping.com/openapi.json)');
  });
});
