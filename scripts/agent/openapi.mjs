import { API_VERSION } from './api.mjs';

const localizedString = { $ref: '#/components/schemas/LocalizedString' };
const localizedUrl = { $ref: '#/components/schemas/LocalizedUrl' };
const stringList = { type: 'array', items: { type: 'string' } };
const nullableUrl = { type: ['string', 'null'], format: 'uri' };

const schemas = {
  LocalizedString: {
    type: 'object',
    description: 'The same text in English and French.',
    required: ['en', 'fr'],
    properties: { en: { type: 'string' }, fr: { type: 'string' } },
  },
  LocalizedUrl: {
    type: 'object',
    description: 'The English and French URL of the same page.',
    required: ['en', 'fr'],
    properties: { en: { type: 'string', format: 'uri' }, fr: { type: 'string', format: 'uri' } },
  },
  ApiIndex: {
    type: 'object',
    required: ['name', 'description', 'version', 'openapi', 'documentation', 'resources'],
    properties: {
      name: { type: 'string' },
      description: { type: 'string' },
      version: { type: 'string' },
      openapi: { type: 'string', format: 'uri' },
      documentation: { type: 'string', format: 'uri' },
      resources: {
        type: 'array',
        items: {
          type: 'object',
          required: ['href', 'summary'],
          properties: { href: { type: 'string', format: 'uri' }, summary: { type: 'string' } },
        },
      },
    },
  },
  Service: {
    type: 'object',
    required: ['id', 'serviceType', 'title', 'description', 'url', 'markdownUrl'],
    properties: {
      id: { type: 'string', examples: ['fullstack'] },
      serviceType: { type: 'string' },
      title: localizedString,
      description: localizedString,
      url: localizedUrl,
      markdownUrl: localizedUrl,
    },
  },
  Profile: {
    type: 'object',
    required: ['name', 'brand', 'jobTitle', 'summary', 'description', 'url', 'email', 'address', 'languages', 'sameAs', 'services'],
    properties: {
      name: { type: 'string', examples: ['Fabien Chung'] },
      alternateName: stringList,
      brand: { type: 'string', examples: ['Solo Developing'] },
      jobTitle: { type: 'string' },
      summary: localizedString,
      description: { type: 'string' },
      url: { type: 'string', format: 'uri' },
      email: { type: 'string', format: 'email' },
      address: {
        type: 'object',
        required: ['addressLocality', 'addressRegion', 'addressCountry'],
        properties: {
          addressLocality: { type: 'string' },
          addressRegion: { type: 'string' },
          addressCountry: { type: 'string', description: 'ISO 3166-1 alpha-2 country code.' },
        },
      },
      languages: { type: 'array', items: { type: 'string', enum: ['en', 'fr'] } },
      areaServed: stringList,
      sameAs: { type: 'array', items: { type: 'string', format: 'uri' } },
      knowsAbout: stringList,
      services: { type: 'array', items: { $ref: '#/components/schemas/Service' } },
    },
  },
  ProjectComponent: {
    type: 'object',
    required: ['id', 'title', 'description', 'tags', 'url'],
    properties: {
      id: { type: 'string' },
      title: localizedString,
      description: localizedString,
      tags: stringList,
      url: nullableUrl,
    },
  },
  Project: {
    type: 'object',
    required: ['id', 'name', 'status', 'url', 'role', 'period', 'tagline', 'tags', 'components'],
    properties: {
      id: { type: 'string', examples: ['hiiba'] },
      name: { type: 'string' },
      status: { type: 'string', enum: ['live', 'mvp', 'ended'] },
      url: nullableUrl,
      role: localizedString,
      period: localizedString,
      tagline: localizedString,
      tags: stringList,
      components: { type: 'array', items: { $ref: '#/components/schemas/ProjectComponent' } },
    },
  },
  ProjectList: {
    type: 'object',
    required: ['projects'],
    properties: { projects: { type: 'array', items: { $ref: '#/components/schemas/Project' } } },
  },
  Article: {
    type: 'object',
    required: ['id', 'kind', 'title', 'summary', 'author', 'datePublished', 'dateModified', 'tags', 'image', 'url', 'markdownUrl'],
    properties: {
      id: { type: 'string' },
      kind: { type: 'string', enum: ['article', 'short'], description: 'Long-form article or short post.' },
      title: localizedString,
      summary: localizedString,
      author: { type: 'string' },
      datePublished: { type: 'string', format: 'date' },
      dateModified: { type: 'string', format: 'date' },
      tags: stringList,
      image: nullableUrl,
      url: localizedUrl,
      markdownUrl: localizedUrl,
    },
  },
  ArticleList: {
    type: 'object',
    required: ['articles'],
    properties: {
      articles: {
        type: 'array',
        description: 'Newest first.',
        items: { $ref: '#/components/schemas/Article' },
      },
    },
  },
  Problem: {
    type: 'object',
    description: 'RFC 9457 problem details, with a machine-readable `code` and a `hint` on how to recover.',
    required: ['type', 'title', 'status', 'detail', 'code', 'hint'],
    properties: {
      type: { type: 'string', format: 'uri-reference' },
      title: { type: 'string' },
      status: { type: 'integer' },
      detail: { type: 'string' },
      code: { type: 'string', enum: ['not_found', 'method_not_allowed'] },
      hint: { type: 'string' },
      documentation: { type: 'string', format: 'uri' },
    },
  },
};

const errorResponse = (description) => ({
  description,
  content: { 'application/problem+json': { schema: { $ref: '#/components/schemas/Problem' } } },
});

const getOperation = ({ operationId, summary, description, schema }) => ({
  get: {
    operationId,
    summary,
    description,
    tags: ['Public data'],
    responses: {
      200: {
        description: 'OK',
        content: { 'application/json': { schema: { $ref: `#/components/schemas/${schema}` } } },
      },
      404: { $ref: '#/components/responses/NotFound' },
      405: { $ref: '#/components/responses/MethodNotAllowed' },
    },
  },
});

export const buildOpenApi = ({ siteUrl }) => ({
  openapi: '3.1.0',
  info: {
    title: 'Solo Developing API',
    version: API_VERSION,
    summary: 'Read-only public data about Fabien Chung (Solo Developing).',
    description: 'Static, read-only JSON describing Fabien Chung — the Montréal full-stack developer behind Solo Developing — with his services, products and articles. No authentication, no rate-limit keys. Every page of the site is also available as Markdown: request it with `Accept: text/markdown`, or append `.md` to the page URL (`index.html.md` for the home pages).',
    contact: { name: 'Fabien Chung', email: 'hello@solodeveloping.com', url: `${siteUrl}/` },
  },
  externalDocs: { description: 'Solo Developing developer resources', url: `${siteUrl}/developers` },
  servers: [{ url: siteUrl }],
  tags: [{ name: 'Public data', description: 'Content published on solodeveloping.com.' }],
  paths: {
    '/api/': getOperation({
      operationId: 'getApiIndex',
      summary: 'List the API resources',
      description: 'Entry point: the available resources and where this description lives.',
      schema: 'ApiIndex',
    }),
    '/api/profile': getOperation({
      operationId: 'getProfile',
      summary: 'Get the profile and services',
      description: 'Identity, contact details, expertise and the services offered, in English and French.',
      schema: 'Profile',
    }),
    '/api/projects': getOperation({
      operationId: 'listProjects',
      summary: 'List founded products',
      description: 'Products Fabien Chung founded or co-founded, with role, period and technical components.',
      schema: 'ProjectList',
    }),
    '/api/articles': getOperation({
      operationId: 'listArticles',
      summary: 'List articles',
      description: 'Articles and short posts, newest first, with links to their HTML and Markdown versions.',
      schema: 'ArticleList',
    }),
  },
  components: {
    schemas,
    responses: {
      NotFound: errorResponse('No resource exists at this path.'),
      MethodNotAllowed: errorResponse('The API is read-only: only GET and HEAD are allowed.'),
    },
  },
});
