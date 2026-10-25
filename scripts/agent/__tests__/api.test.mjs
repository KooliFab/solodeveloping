// @vitest-environment node
import { describe, it, expect, beforeAll } from 'vitest';
import SwaggerParser from '@apidevtools/swagger-parser';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
import { buildJsonFiles, loadSiteData } from '../build-agent-files.mjs';
import { buildOpenApi } from '../openapi.mjs';

const SITE = 'https://solodeveloping.com';

let files;
let data;

beforeAll(async () => {
  data = await loadSiteData();
  files = buildJsonFiles(data, SITE);
});

const collectStrings = (value, path = '$', found = []) => {
  if (value === undefined || value === '') found.push(path);
  if (value && typeof value === 'object') {
    Object.entries(value).forEach(([key, child]) => collectStrings(child, `${path}.${key}`, found));
  }
  return found;
};

describe('OpenAPI document', () => {
  it('is a valid OpenAPI 3.1 description', async () => {
    const spec = structuredClone(buildOpenApi({ siteUrl: SITE }));
    await expect(SwaggerParser.validate(spec)).resolves.toBeTruthy();
    expect(spec.openapi).toBe('3.1.0');
    expect(spec.servers).toEqual([{ url: SITE }]);
  });

  it('documents every resource listed by the API index', () => {
    const spec = files['openapi.json'];
    const indexPaths = files['api/index.json'].resources.map(({ href }) => new URL(href).pathname);
    expect(Object.keys(spec.paths).sort()).toEqual(['/api/', ...indexPaths].sort());
  });
});

describe('API documents', () => {
  const validator = () => {
    const ajv = new Ajv2020({ strict: false, allErrors: true });
    addFormats(ajv);
    ajv.addSchema({ $id: 'openapi', components: files['openapi.json'].components });
    return ajv;
  };

  it.each([
    ['api/index.json', 'ApiIndex'],
    ['api/profile.json', 'Profile'],
    ['api/projects.json', 'ProjectList'],
    ['api/articles.json', 'ArticleList'],
    ['api/errors/404.json', 'Problem'],
    ['api/errors/405.json', 'Problem'],
  ])('%s matches the %s schema', (file, schema) => {
    const validate = validator().getSchema(`openapi#/components/schemas/${schema}`);
    const valid = validate(files[file]);
    expect(validate.errors ?? []).toEqual([]);
    expect(valid).toBe(true);
  });

  it('has no missing or empty values (every translation key resolved)', () => {
    for (const file of ['api/profile.json', 'api/projects.json', 'api/articles.json']) {
      expect(collectStrings(files[file]), file).toEqual([]);
    }
  });

  it('lists every product, service and article from the site data', () => {
    expect(files['api/projects.json'].projects).toHaveLength(data.founderProducts.length);
    expect(files['api/profile.json'].services.map((service) => service.id)).toEqual(data.facets.map((facet) => facet.id));
    expect(files['api/articles.json'].articles).toHaveLength(data.blogPosts.length + data.shortArticles.length);
  });

  it('links articles to their HTML and Markdown URLs, newest first', () => {
    const { articles } = files['api/articles.json'];
    const pwa = articles.find((article) => article.id === 'progressive-web-app-with-flutter');
    expect(pwa.url).toEqual({ en: `${SITE}/articles/flutter-pwa-guide`, fr: `${SITE}/fr/articles/guide-flutter-pwa` });
    expect(pwa.markdownUrl).toEqual({ en: `${SITE}/articles/flutter-pwa-guide.md`, fr: `${SITE}/fr/articles/guide-flutter-pwa.md` });
    const dates = articles.map((article) => article.datePublished);
    expect(dates).toEqual([...dates].sort().reverse());
  });

  it('serves errors as RFC 9457 problem details with a code and a hint', () => {
    expect(files['api/errors/404.json']).toMatchObject({ type: 'about:blank', title: 'Not Found', status: 404, code: 'not_found' });
    expect(files['api/errors/405.json']).toMatchObject({ type: 'about:blank', title: 'Method Not Allowed', status: 405, code: 'method_not_allowed' });
    expect(files['api/errors/404.json'].hint).toContain(`${SITE}/openapi.json`);
  });
});

describe('API catalog (RFC 9727)', () => {
  it('is a linkset anchored at the well-known URI that lists the API with its description', () => {
    const { linkset } = files['.well-known/api-catalog'];
    expect(linkset[0]).toEqual({
      anchor: `${SITE}/.well-known/api-catalog`,
      item: [{ href: `${SITE}/api/`, title: 'Solo Developing public API' }],
    });
    expect(linkset[1].anchor).toBe(`${SITE}/api/`);
    expect(linkset[1]['service-desc'][0].href).toBe(`${SITE}/openapi.json`);
  });
});
