#!/usr/bin/env node
// Checks the agent-facing HTTP behaviour of a deployed build:
// Markdown negotiation, real 404s (HTML, Markdown and JSON bodies), the JSON
// API and its error format, the OpenAPI document (JSON and YAML), the API
// catalog, the trust and developer pages, llms.txt and sitemap links.
//
//   node scripts/agent/verify-agent-ready.mjs https://solodeveloping.com
//   node scripts/agent/verify-agent-ready.mjs http://127.0.0.1:8088
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';

const PUBLIC_ORIGIN = 'https://solodeveloping.com';
const baseUrl = (process.argv[2] || PUBLIC_ORIGIN).replace(/\/+$/, '');
const MISSING_PATH = '/some-path-that-does-not-exist';

// A known hosting limitation: reported, but does not fail the run.
class CheckWarning extends Error {}

// Absolute links in llms.txt and the sitemap point at production; test them
// against the server under test instead.
const local = (url) => url.replace(PUBLIC_ORIGIN, baseUrl);

const request = (path, { accept, method = 'GET', redirect = 'follow' } = {}) => fetch(
  path.startsWith('http') ? path : `${baseUrl}${path}`,
  { method, redirect, headers: accept ? { Accept: accept } : {} },
);

const header = (response, name) => response.headers.get(name) || '';
const varyIncludesAccept = (response) => header(response, 'vary')
  .split(',')
  .some((value) => value.trim().toLowerCase() === 'accept');

const expectMarkdown = async (path) => {
  const response = await request(path, { accept: 'text/markdown' });
  assert.equal(response.status, 200, `${path}: status`);
  assert.match(header(response, 'content-type'), /^text\/markdown\s*;\s*charset=utf-8/i, `${path}: content-type`);
  assert.ok(varyIncludesAccept(response), `${path}: Vary: Accept (got "${header(response, 'vary')}")`);
  const body = await response.text();
  assert.match(body, /^# \S/, `${path}: body starts with an H1`);
  return body;
};

const expectHtml = async (path, accept = 'text/html') => {
  const response = await request(path, { accept });
  assert.equal(response.status, 200, `${path}: status`);
  assert.match(header(response, 'content-type'), /^text\/html/i, `${path}: content-type`);
  assert.ok(varyIncludesAccept(response), `${path}: Vary: Accept`);
  return response;
};

const expectJson = async (path) => {
  const response = await request(path, { accept: 'application/json' });
  assert.equal(response.status, 200, `${path}: status`);
  assert.match(header(response, 'content-type'), /^application\/json/i, `${path}: content-type`);
  return response.json();
};

const expectProblem = async (path, status, code, method = 'GET') => {
  const response = await request(path, { accept: 'application/json', method });
  assert.equal(response.status, status, `${method} ${path}: status`);
  assert.match(header(response, 'content-type'), /^application\/problem\+json/i, `${method} ${path}: content-type`);
  const problem = await response.json();
  assert.equal(problem.status, status);
  assert.equal(problem.code, code);
  assert.ok(problem.hint?.length > 20, 'problem has a resolution hint');
};

const expectRedirect = async (path, location) => {
  const response = await request(path, { redirect: 'manual' });
  assert.equal(response.status, 301, `${path}: status`);
  assert.equal(new URL(header(response, 'location'), baseUrl).pathname, location, `${path}: location`);
};

const checks = {
  'Markdown negotiation on the homepage': async () => {
    const body = await expectMarkdown('/');
    assert.ok(body.length > 500, 'homepage Markdown has content');
  },
  'HTML still served for Accept: text/html and browsers': async () => {
    await expectHtml('/');
    await expectHtml('/', 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8');
    await expectHtml('/about');
  },
  'q=0 and higher-ranked HTML are honored': async () => {
    await expectHtml('/', 'text/markdown;q=0, text/html');
    await expectHtml('/', 'text/html, text/markdown;q=0.5');
  },
  '406 when neither HTML nor Markdown is acceptable': async () => {
    // Hostinger's CDN answers unknown Accept values from its cached HTML, so
    // check the server's own rule with a cache-busting query string.
    const response = await request(`/?accept-check=${Date.now()}`, { accept: 'application/pdf' });
    assert.equal(response.status, 406);
  },
  'Markdown negotiation on inner pages': async () => {
    for (const path of ['/about', '/about/', '/fr/', '/fr', '/fullstack', '/articles', '/articles/flutter-pwa-guide', '/fr/articles/guide-flutter-pwa', '/shorts/why-i-dont-build-saas-around-ai-api-keys']) {
      await expectMarkdown(path);
    }
  },
  'Markdown mirrors at their .md URLs': async () => {
    for (const path of ['/index.html.md', '/about.md', '/fr/index.html.md']) {
      const response = await request(path);
      assert.equal(response.status, 200, path);
      assert.match(header(response, 'content-type'), /^text\/markdown/i, path);
    }
  },
  'Unknown paths return 404 with a Markdown body for agents': async () => {
    const response = await request(`${MISSING_PATH}-${Date.now()}`, { accept: 'text/markdown' });
    assert.equal(response.status, 404);
    if (!/^text\/markdown/i.test(header(response, 'content-type'))) {
      // LiteSpeed applies the ErrorDocument rewrite to 404.md only some of the
      // time; the status is right and the HTML 404 page is still readable.
      throw new CheckWarning(`404 body is ${header(response, 'content-type') || 'untyped'}, not text/markdown`);
    }
    const body = await response.text();
    assert.ok(body.length >= 20);
    assert.match(body, /llms\.txt/);
  },
  'Unknown paths return 404 with the HTML page for browsers': async () => {
    for (const path of [MISSING_PATH, '/articles/not-an-article', '/fr/nope', '/assets/missing.js']) {
      const response = await request(path, { accept: 'text/html' });
      assert.equal(response.status, 404, path);
    }
    const body = await (await request(MISSING_PATH, { accept: 'text/html' })).text();
    assert.match(body, /noindex/, '404 page is not indexable');
    assert.doesNotMatch(body, /<title>\s*404 Not Found/i, 'prerendered 404 page, not the server default');
  },
  'Error documents requested directly are not indexable': async () => {
    // LiteSpeed cannot tell a direct request from the ErrorDocument pass, so
    // these stay reachable and are kept out of search results instead.
    for (const path of ['/404.html', '/404.md', '/200.html', '/api/errors/404.json']) {
      const response = await request(path);
      assert.ok(response.status < 500, `${path}: status ${response.status}`);
      assert.match(header(response, 'x-robots-tag'), /noindex/i, `${path}: X-Robots-Tag`);
    }
  },
  'Client routes and redirects still resolve': async () => {
    await expectHtml('/projects');
    await expectHtml('/fr/projects');
    await expectRedirect('/shorts', '/articles');
    await expectRedirect('/fr/shorts', '/fr/articles');
    await expectRedirect('/articles/the-power-of-lazy-loading', '/articles/flutter-firebase-lazy-loading');
    await expectRedirect('/articles/why-i-dont-build-saas-around-ai-api-keys', '/shorts/why-i-dont-build-saas-around-ai-api-keys');
  },
  'OpenAPI document is published': async () => {
    const spec = await expectJson('/openapi.json');
    assert.equal(spec.openapi, '3.1.0');
    assert.ok(Object.keys(spec.paths).length >= 4);
  },
  'OpenAPI document in YAML and under /api/': async () => {
    const spec = await expectJson('/openapi.json');
    assert.deepEqual(await expectJson('/api/openapi.json'), spec, '/api/openapi.json matches /openapi.json');
    for (const path of ['/openapi.yaml', '/api/openapi.yaml']) {
      const response = await request(path);
      assert.equal(response.status, 200, `${path}: status`);
      assert.match(header(response, 'content-type'), /^application\/yaml/i, `${path}: content-type`);
      assert.match(await response.text(), /^openapi: 3\.1\.0\n/, `${path}: OpenAPI 3.1 YAML`);
    }
    for (const path of ['/openapi.json', '/openapi.yaml', '/api/openapi.json', '/api/openapi.yaml']) {
      // A repeated header arrives joined ("*, *"), which browsers reject
      const response = await request(path, { method: 'HEAD' });
      assert.equal(header(response, 'access-control-allow-origin'), '*', `${path}: one CORS header`);
    }
  },
  'API resources return JSON': async () => {
    const index = await expectJson('/api/');
    await expectRedirect('/api', '/api/');
    for (const resource of index.resources) {
      await expectJson(local(resource.href));
    }
  },
  'API errors are JSON problem details': async () => {
    await expectProblem('/api/does-not-exist', 404, 'not_found');
    await expectProblem('/api/profile', 405, 'method_not_allowed', 'POST');
    const notAllowed = await request('/api/profile', { method: 'DELETE' });
    assert.match(header(notAllowed, 'allow'), /GET/, '405 lists the allowed methods');
  },
  'Unknown URLs return JSON problem details to JSON clients': async () => {
    for (const accept of ['application/json', 'application/json, text/plain, */*']) {
      const response = await request(`${MISSING_PATH}-${Date.now()}`, { accept });
      assert.equal(response.status, 404, `${accept}: status`);
      assert.match(header(response, 'content-type'), /^application\/problem\+json/i, `${accept}: content-type`);
      assert.ok(varyIncludesAccept(response), `${accept}: Vary: Accept`);
      const problem = await response.json();
      assert.equal(problem.code, 'not_found');
      assert.match(problem.hint, /llms\.txt/);
    }
  },
  'API catalog (RFC 9727)': async () => {
    const response = await request('/.well-known/api-catalog');
    assert.equal(response.status, 200);
    assert.match(header(response, 'content-type'), /^application\/linkset\+json;\s*profile="https:\/\/www\.rfc-editor\.org\/info\/rfc9727"/i);
    const catalog = await response.json();
    assert.ok(catalog.linkset[0].item.length > 0);
    const head = await request('/.well-known/api-catalog', { method: 'HEAD' });
    assert.match(header(head, 'link'), /rel="?api-catalog"?/);
    const home = await request('/', { accept: 'text/html' });
    assert.match(header(home, 'link'), /\/\.well-known\/api-catalog>;\s*rel="?api-catalog"?/);
  },
  'Homepage HTML is readable without JavaScript': async () => {
    const html = await (await request('/', { accept: 'text/html' })).text();
    const { document } = new JSDOM(html).window;
    assert.equal(document.querySelectorAll('h1').length, 1, 'one H1');
    assert.equal(document.querySelectorAll('title').length, 1, 'one title');
    assert.equal(document.querySelectorAll('meta[name="description"]').length, 1, 'one meta description');
    assert.ok(document.querySelector('link[rel="alternate"][type="text/markdown"]'), 'Markdown alternate link');
    document.querySelectorAll('script, style, noscript, svg').forEach((node) => node.remove());
    const text = document.body.textContent.replace(/\s+/g, ' ').trim();
    const ratio = text.length / html.length;
    console.log(`      text ${text.length} chars / html ${html.length} bytes = ${(ratio * 100).toFixed(2)}%`);
    assert.ok(text.length >= 500, 'at least 500 characters of text');
    assert.ok(ratio >= 0.05, 'content ratio of at least 5%');
  },
  'Homepage title names the brand': async () => {
    for (const path of ['/', '/fr/']) {
      const html = await (await request(path, { accept: 'text/html' })).text();
      assert.match(new JSDOM(html).window.document.title, /Solo Developing/, `${path}: title`);
    }
  },
  'Trust and developer pages have real content': async () => {
    for (const page of ['about', 'contact', 'privacy', 'developers']) {
      for (const path of [`/${page}`, `/fr/${page}`]) {
        const response = await expectHtml(path);
        const { document } = new JSDOM(await response.text()).window;
        assert.equal(document.querySelectorAll('h1').length, 1, `${path}: one H1`);
        const main = document.querySelector('main');
        main.querySelectorAll('script, style, svg, footer').forEach((node) => node.remove());
        const text = main.textContent.replace(/\s+/g, ' ').trim();
        assert.ok(text.length >= 500, `${path}: ${text.length} characters of text`);
        assert.ok((await expectMarkdown(path)).length >= 500, `${path}: Markdown has content`);
      }
    }
    const developers = await (await request('/developers', { accept: 'text/html' })).text();
    assert.match(new JSDOM(developers).window.document.title, /Solo Developing/, '/developers: title names the brand');
  },
  'llms.txt links resolve': async () => {
    const response = await request('/llms.txt');
    assert.equal(response.status, 200);
    assert.match(header(response, 'content-type'), /^text\/plain/i);
    const text = await response.text();
    assert.match(text, /^# \S/);
    const links = [...text.matchAll(/\]\((https:\/\/solodeveloping\.com[^)\s]*)\)/g)].map((match) => match[1]);
    assert.ok(links.length > 10);
    for (const link of links) {
      const linked = await request(local(link));
      assert.equal(linked.status, 200, link);
    }
  },
  'Sitemap URLs resolve': async () => {
    const xml = await (await request('/sitemap.xml')).text();
    const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
    assert.ok(urls.length > 10);
    for (const url of urls) {
      const response = await request(local(url), { accept: 'text/html' });
      assert.equal(response.status, 200, url);
    }
  },
};

let failures = 0;
let warnings = 0;
console.log(`Agent-readiness checks against ${baseUrl}\n`);
for (const [name, run] of Object.entries(checks)) {
  try {
    await run();
    console.log(`  ✓ ${name}`);
  } catch (error) {
    if (error instanceof CheckWarning) {
      warnings += 1;
      console.log(`  ⚠ ${name}\n      ${error.message}`);
      continue;
    }
    failures += 1;
    console.log(`  ✗ ${name}\n      ${error.message.split('\n')[0]}`);
  }
}
const passed = Object.keys(checks).length - failures - warnings;
console.log(`\n${passed} passed, ${failures} failed${warnings ? `, ${warnings} warning${warnings > 1 ? 's' : ''}` : ''}`);
process.exit(failures ? 1 : 0);
