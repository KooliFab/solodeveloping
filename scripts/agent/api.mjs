import { markdownPathFor } from '../../src/lib/markdownPath.js';

export const API_VERSION = '1.0.0';
export const LANGS = ['en', 'fr'];

const lookup = (object, keyPath) => keyPath
  .split('.')
  .reduce((value, key) => (value == null ? undefined : value[key]), object);

const localized = (translations, keyPath) => Object.fromEntries(
  LANGS.map((lang) => [lang, lookup(translations[lang], keyPath) ?? null]),
);

const localizedPaths = (enPath, frPath) => ({ en: enPath, fr: frPath });

const absolute = (siteUrl, paths) => Object.fromEntries(
  Object.entries(paths).map(([lang, path]) => [lang, `${siteUrl}${path}`]),
);

const markdownUrls = (siteUrl, paths) => Object.fromEntries(
  Object.entries(paths).map(([lang, path]) => [lang, `${siteUrl}${markdownPathFor(path)}`]),
);

export const API_RESOURCES = [
  { path: '/api/profile', summary: 'Who Fabien Chung is, how to reach him and the services offered.' },
  { path: '/api/projects', summary: 'Products Fabien Chung founded or co-founded, with their technical components.' },
  { path: '/api/articles', summary: 'Published articles and short posts, with HTML and Markdown URLs.' },
];

export const buildApiIndex = ({ siteUrl }) => ({
  name: 'Solo Developing public API',
  description: 'Read-only JSON data about Fabien Chung (Solo Developing): profile, services, products and articles. No authentication required.',
  version: API_VERSION,
  openapi: `${siteUrl}/openapi.json`,
  documentation: `${siteUrl}/developers`,
  resources: API_RESOURCES.map(({ path, summary }) => ({ href: `${siteUrl}${path}`, summary })),
});

export const buildProfile = ({ siteUrl, profile, facets, translations }) => ({
  name: profile.name,
  alternateName: profile.alternateName,
  brand: profile.brand,
  jobTitle: profile.jobTitle,
  summary: localized(translations, 'meta.description'),
  description: profile.description,
  url: `${siteUrl}/`,
  email: profile.email,
  address: profile.address,
  languages: profile.languages,
  areaServed: profile.areaServed,
  sameAs: profile.sameAs,
  knowsAbout: profile.knowsAbout,
  services: facets.map((facet) => {
    const paths = localizedPaths(facet.seo.path, `/fr${facet.seo.path}`);
    return {
      id: facet.id,
      serviceType: lookup(translations.en, `${facet.i18nPrefix}.seo.serviceType`),
      title: localized(translations, `${facet.i18nPrefix}.seo.title`),
      description: localized(translations, `${facet.i18nPrefix}.seo.description`),
      url: absolute(siteUrl, paths),
      markdownUrl: markdownUrls(siteUrl, paths),
    };
  }),
});

export const buildProjects = ({ founderProducts, translations }) => ({
  projects: founderProducts.map((product) => {
    const base = `founderProducts.items.${product.translationKey}`;
    return {
      id: product.translationKey,
      name: product.title,
      status: product.status,
      url: product.link,
      role: localized(translations, `${base}.role`),
      period: localized(translations, `${base}.year`),
      tagline: localized(translations, `${base}.tagline`),
      tags: product.tags,
      components: product.technicalProjects.map((component) => ({
        id: component.translationKey,
        title: localized(translations, `${base}.projects.${component.translationKey}.title`),
        description: localized(translations, `${base}.projects.${component.translationKey}.description`),
        tags: component.tags,
        url: component.link,
      })),
    };
  }),
});

const articleEntry = (siteUrl, post, kind, section) => {
  const paths = localizedPaths(`/${section}/${post.slug.en}`, `/fr/${section}/${post.slug.fr}`);
  return {
    id: post.id,
    kind,
    title: post.title,
    summary: post.subtitle,
    author: post.author,
    datePublished: post.date,
    dateModified: post.lastModified || post.date,
    tags: post.tags || [],
    image: post.coverImage ? `${siteUrl}${post.coverImage}` : null,
    url: absolute(siteUrl, paths),
    markdownUrl: markdownUrls(siteUrl, paths),
  };
};

export const buildArticles = ({ siteUrl, blogPosts, shortArticles }) => ({
  articles: [
    ...blogPosts.map((post) => articleEntry(siteUrl, post, 'article', 'articles')),
    ...shortArticles.map((post) => articleEntry(siteUrl, post, 'short', 'shorts')),
  ].sort((a, b) => b.datePublished.localeCompare(a.datePublished)),
});

// RFC 9457 problem details, served by the web server for API errors.
export const buildProblem = ({ siteUrl, status }) => {
  const help = `List the available resources at ${siteUrl}/api/ or read the API description at ${siteUrl}/openapi.json.`;
  const problems = {
    404: { title: 'Not Found', code: 'not_found', detail: 'No API resource exists at this path.', hint: help },
    405: { title: 'Method Not Allowed', code: 'method_not_allowed', detail: 'This API is read-only.', hint: `Use GET or HEAD. ${help}` },
  };
  return {
    type: 'about:blank',
    status: Number(status),
    ...problems[status],
    documentation: `${siteUrl}/openapi.json`,
  };
};

// RFC 9457 problem details for any other unknown URL, served instead of the
// HTML 404 page to clients that ask for JSON (see the root .htaccess).
export const buildSiteNotFound = ({ siteUrl }) => ({
  type: 'about:blank',
  status: 404,
  title: 'Not Found',
  code: 'not_found',
  detail: 'No page or resource exists at this path.',
  hint: `Every page is listed in ${siteUrl}/llms.txt and ${siteUrl}/sitemap.xml. JSON data is available from the API at ${siteUrl}/api/.`,
  documentation: `${siteUrl}/developers`,
});

// RFC 9727 API catalog (application/linkset+json, RFC 9264).
export const buildApiCatalog = ({ siteUrl }) => ({
  linkset: [
    {
      anchor: `${siteUrl}/.well-known/api-catalog`,
      item: [{ href: `${siteUrl}/api/`, title: 'Solo Developing public API' }],
    },
    {
      anchor: `${siteUrl}/api/`,
      'service-desc': [
        { href: `${siteUrl}/openapi.json`, type: 'application/vnd.oai.openapi+json;version=3.1' },
        { href: `${siteUrl}/openapi.yaml`, type: 'application/vnd.oai.openapi;version=3.1' },
      ],
      'service-doc': [
        { href: `${siteUrl}/developers`, type: 'text/html' },
        { href: `${siteUrl}/llms.txt`, type: 'text/plain' },
      ],
    },
  ],
});
