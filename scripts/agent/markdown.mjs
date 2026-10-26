import TurndownService from 'turndown';
import { JSDOM } from 'jsdom';

// Elements that carry layout, interaction or decoration but no page content.
const NON_CONTENT_SELECTORS = [
  'script',
  'style',
  'noscript',
  'template',
  'svg',
  'iframe',
  'video',
  'form',
  'button',
  'nav',
  '[aria-hidden="true"]',
  '.select-none',
];

const LABELS = {
  en: { by: 'By', published: 'Published', updated: 'Updated', source: 'Source', otherLanguage: 'Version française', guide: 'Site guide for AI agents' },
  fr: { by: 'Par', published: 'Publié le', updated: 'Mis à jour le', source: 'Source', otherLanguage: 'English version', guide: 'Guide du site pour les agents IA' },
};

const createTurndown = () => {
  const service = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
    bulletListMarker: '-',
    emDelimiter: '_',
  });
  service.keep(['sup', 'sub']);
  return service;
};

const tidy = (markdown) => markdown
  .replace(/[ \t]+\n/g, '\n')
  .replace(/\n{3,}/g, '\n\n')
  .trim();

// Root-relative links and images in authored Markdown become absolute, so the
// document stays usable once an agent has copied it out of its original URL.
export const absolutizeMarkdown = (markdown, siteUrl) => markdown
  .replace(/\]\(\//g, `](${siteUrl}/`)
  .replace(/(src|href)="\//g, `$1="${siteUrl}/`);

/**
 * Reads what the Markdown mirror needs from a prerendered HTML page:
 * title, description, canonical URL and the alternate-language URL.
 */
export const readPageMeta = (html, pageUrl) => {
  const { document } = new JSDOM(html, { url: pageUrl }).window;
  const lang = document.documentElement.getAttribute('lang') === 'fr' ? 'fr' : 'en';
  const otherLang = lang === 'fr' ? 'en' : 'fr';
  const canonical = document.querySelector('link[rel="canonical"]')?.href || pageUrl;
  const alternate = document.querySelector(`link[rel="alternate"][hreflang="${otherLang}"]`)?.href;

  return {
    lang,
    title: document.title.trim(),
    description: document.querySelector('meta[name="description"]')?.getAttribute('content')?.trim() || '',
    canonical,
    alternate: alternate && alternate !== canonical ? alternate : null,
  };
};

const ITEM_TAGS = new Set(['A', 'SPAN', 'DIV']);
const MAX_ITEM_LENGTH = 80;

const isShortItem = (node) => node.nodeType === 1
  && ITEM_TAGS.has(node.tagName)
  && !node.querySelector('h1, h2, h3, h4, h5, h6, p, ul, ol, img')
  && node.textContent.trim().length > 0
  && node.textContent.trim().length <= MAX_ITEM_LENGTH;

// Flex rows of links, chips and icon labels have no separators in the HTML,
// so they would run together ("GitHubLinkedIn"). Runs of two or more short
// sibling items become Markdown lists instead.
const listifyItemRuns = (document, root) => {
  [...root.querySelectorAll('div, p, section, article')].reverse().forEach((container) => {
    const nodes = [...container.childNodes].filter((node) => !(node.nodeType === 3 && !node.textContent.trim()));
    if (nodes.some((node) => node.nodeType === 3)) return;

    let run = [];
    const flush = () => {
      if (run.length >= 2) {
        const list = document.createElement('ul');
        run[0].before(list);
        run.forEach((item) => {
          const entry = document.createElement('li');
          entry.append(item);
          list.append(entry);
        });
      }
      run = [];
    };

    nodes.forEach((node) => {
      if (isShortItem(node)) {
        run.push(node);
      } else {
        flush();
      }
    });
    flush();
  });
};

const footer = ({ lang, canonical, alternate, siteUrl }) => {
  const labels = LABELS[lang];
  const lines = ['---', '', `- ${labels.source}: ${canonical}`];
  if (alternate) lines.push(`- ${labels.otherLanguage}: ${alternate}`);
  lines.push(`- ${labels.guide}: ${siteUrl}/llms.txt`);
  return lines.join('\n');
};

/**
 * Converts a prerendered page to Markdown: the document title becomes the H1,
 * the meta description its summary, and the <main> content follows with its
 * headings shifted one level down. Navigation, forms and decoration are dropped.
 */
export const htmlPageToMarkdown = (html, { pageUrl, siteUrl }) => {
  const meta = readPageMeta(html, pageUrl);
  const { document } = new JSDOM(html, { url: meta.canonical }).window;
  const root = document.querySelector('main') || document.querySelector('#main-content') || document.body;

  root.querySelectorAll(NON_CONTENT_SELECTORS.join(',')).forEach((node) => node.remove());

  root.querySelectorAll('img').forEach((img) => {
    if (!img.getAttribute('alt')?.trim()) {
      img.remove();
    } else {
      img.setAttribute('src', img.src);
    }
  });

  root.querySelectorAll('a[href]').forEach((link) => {
    // In-page anchors are scroll shortcuts ("Explore my work"), not content.
    if (link.getAttribute('href').startsWith('#')) {
      link.remove();
      return;
    }
    link.setAttribute('href', link.href);
    // Cards wrapped in a link would turn into a multi-line link label.
    if (link.querySelector('div, p')) {
      link.textContent = link.textContent.replace(/\s+/g, ' ').trim();
    }
  });

  listifyItemRuns(document, root);

  // Headings split across block-level spans ("From ideas to" / "applications.")
  // would otherwise run together once converted to a single line.
  root.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((heading) => {
    if (!heading.querySelector('a')) {
      heading.textContent = [...heading.childNodes]
        .map((node) => node.textContent.replace(/\s+/g, ' ').trim())
        .filter(Boolean)
        .join(' ');
    }
  });

  root.querySelectorAll('h1, h2, h3, h4, h5').forEach((heading) => {
    const level = Number(heading.tagName[1]) + 1;
    const demoted = document.createElement(`h${level}`);
    demoted.append(...heading.childNodes);
    heading.replaceWith(demoted);
  });

  const parts = [`# ${meta.title}`];
  if (meta.description) parts.push(`> ${meta.description}`);
  parts.push(createTurndown().turndown(root.innerHTML));
  parts.push(footer({ ...meta, siteUrl }));

  return `${tidy(parts.join('\n\n'))}\n`;
};

/**
 * Builds the Markdown mirror of an article from its authored Markdown source,
 * which is cleaner than converting the rendered HTML back.
 */
export const articleToMarkdown = (post, lang, { canonical, alternate, siteUrl }) => {
  const labels = LABELS[lang];
  const parts = [`# ${post.title[lang]}`];

  if (post.subtitle?.[lang]) parts.push(`> ${post.subtitle[lang]}`);

  const byline = [`${labels.by} ${post.author}`, `${labels.published} ${post.date}`];
  if (post.lastModified && post.lastModified !== post.date) {
    byline.push(`${labels.updated} ${post.lastModified}`);
  }
  parts.push(`_${byline.join(' · ')}_`);

  parts.push(absolutizeMarkdown(post.content[lang].trim(), siteUrl));
  parts.push(footer({ lang, canonical, alternate, siteUrl }));

  return `${tidy(parts.join('\n\n'))}\n`;
};

/**
 * Markdown body served with HTTP 404 to agents that ask for text/markdown.
 */
export const notFoundMarkdown = (siteUrl) => `# 404 — Page not found

There is no page at this address on ${siteUrl.replace(/^https?:\/\//, '')}. The URL may be mistyped, or the page may have moved.

Where to go next:

- [llms.txt](${siteUrl}/llms.txt): site guide for AI agents, with every key page
- [Sitemap](${siteUrl}/sitemap.xml): every public URL
- [Home page in Markdown](${siteUrl}/index.html.md)
- [Developer resources](${siteUrl}/developers.md): public API, OpenAPI description and Markdown access
- [Public API description (OpenAPI)](${siteUrl}/openapi.json)
`;
