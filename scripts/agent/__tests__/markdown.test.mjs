// @vitest-environment node
import { describe, it, expect } from 'vitest';
import {
  absolutizeMarkdown,
  articleToMarkdown,
  htmlPageToMarkdown,
  notFoundMarkdown,
} from '../markdown.mjs';

const SITE = 'https://example.test';

const page = (main, { lang = 'en', head = '' } = {}) => `<!DOCTYPE html><html lang="${lang}"><head>
  <title>Example page | Brand</title>
  <meta name="description" content="What this page is about.">
  <link rel="canonical" href="${SITE}/about">
  <link rel="alternate" hreflang="en" href="${SITE}/about">
  <link rel="alternate" hreflang="fr" href="${SITE}/fr/about">
  ${head}
</head><body><nav><a href="/">Home</a></nav><main>${main}</main><footer>Outside main</footer></body></html>`;

describe('htmlPageToMarkdown', () => {
  const convert = (main, options) => htmlPageToMarkdown(page(main, options), { pageUrl: `${SITE}/about`, siteUrl: SITE });

  it('uses the document title as H1 and the description as summary', () => {
    const markdown = convert('<p>Body text</p>');
    expect(markdown.startsWith('# Example page | Brand\n\n> What this page is about.\n\nBody text')).toBe(true);
  });

  it('demotes page headings below the title and joins headings split across spans', () => {
    const markdown = convert('<h1><span class="block">From ideas to</span><span class="block">applications.</span></h1><h2>Section</h2>');
    expect(markdown).toContain('## From ideas to applications.');
    expect(markdown).toContain('### Section');
  });

  it('keeps only <main> and drops navigation, forms, decoration and in-page anchors', () => {
    const markdown = convert(`
      <p class="select-none">PROD</p>
      <div aria-hidden="true">glow</div>
      <svg><text>icon</text></svg>
      <form><label>Name</label><input></form>
      <button>Send</button>
      <a href="#contact">Jump to contact</a>
      <p>Kept</p>`);
    expect(markdown).toContain('Kept');
    for (const dropped of ['Home', 'Outside main', 'PROD', 'glow', 'icon', 'Name', 'Send', 'Jump to contact']) {
      expect(markdown).not.toContain(dropped);
    }
  });

  it('makes links and images absolute and drops decorative images', () => {
    const markdown = convert('<p><a href="/articles">Articles</a></p><img src="/a.webp" alt="A screenshot"><img src="/b.webp" alt="">');
    expect(markdown).toContain(`[Articles](${SITE}/articles)`);
    expect(markdown).toContain(`![A screenshot](${SITE}/a.webp)`);
    expect(markdown).not.toContain('b.webp');
  });

  it('turns runs of short sibling items into lists', () => {
    const markdown = convert('<div><a href="https://github.com/x">GitHub</a><a href="https://linkedin.com/x">LinkedIn</a></div><div><span>Chip one</span><span>Chip two</span></div>');
    expect(markdown).toContain('-   [GitHub](https://github.com/x)\n-   [LinkedIn](https://linkedin.com/x)');
    expect(markdown).toContain('-   Chip one\n-   Chip two');
  });

  it('flattens links that wrap block content', () => {
    const markdown = convert('<div><a href="https://app.test/"><div><span>App name</span></div></a></div>');
    expect(markdown).toContain('[App name](https://app.test/)');
  });

  it('ends with the canonical URL, the other language and llms.txt', () => {
    const markdown = convert('<p>Body</p>');
    expect(markdown).toContain(`- Source: ${SITE}/about`);
    expect(markdown).toContain(`- Version française: ${SITE}/fr/about`);
    expect(markdown).toContain(`- Site guide for AI agents: ${SITE}/llms.txt`);
    expect(markdown.endsWith('\n')).toBe(true);
  });

  it('localizes the footer for French pages', () => {
    const markdown = convert('<p>Corps</p>', { lang: 'fr' });
    expect(markdown).toContain('- Guide du site pour les agents IA:');
  });
});

describe('articleToMarkdown', () => {
  const post = {
    title: { en: 'My post', fr: 'Mon article' },
    subtitle: { en: 'A subtitle', fr: 'Un sous-titre' },
    author: 'Fabien Chung',
    date: '2026-01-02',
    lastModified: '2026-02-03',
    content: { en: '\nIntro with ![img](/images/a.webp "small") and [link](/about).\n', fr: 'Bonjour' },
  };

  it('renders the authored Markdown with title, summary and byline', () => {
    const markdown = articleToMarkdown(post, 'en', { canonical: `${SITE}/articles/my-post`, alternate: `${SITE}/fr/articles/mon-article`, siteUrl: SITE });
    expect(markdown).toMatch(/^# My post\n\n> A subtitle\n\n_By Fabien Chung · Published 2026-01-02 · Updated 2026-02-03_\n\nIntro with/);
    expect(markdown).toContain(`![img](${SITE}/images/a.webp "small")`);
    expect(markdown).toContain(`[link](${SITE}/about)`);
    expect(markdown).toContain(`- Version française: ${SITE}/fr/articles/mon-article`);
  });

  it('uses French labels for French articles', () => {
    const markdown = articleToMarkdown(post, 'fr', { canonical: `${SITE}/fr/articles/mon-article`, alternate: null, siteUrl: SITE });
    expect(markdown).toContain('_Par Fabien Chung · Publié le 2026-01-02 · Mis à jour le 2026-02-03_');
    expect(markdown).not.toContain('English version');
  });
});

describe('absolutizeMarkdown', () => {
  it('rewrites root-relative Markdown and HTML references only', () => {
    expect(absolutizeMarkdown('[a](/x) [b](https://other.test/y) <img src="/z.png">', SITE))
      .toBe(`[a](${SITE}/x) [b](https://other.test/y) <img src="${SITE}/z.png">`);
  });
});

describe('notFoundMarkdown', () => {
  it('explains the error and points agents to llms.txt, the sitemap and the API', () => {
    const markdown = notFoundMarkdown(SITE);
    expect(markdown.startsWith('# 404')).toBe(true);
    expect(markdown.length).toBeGreaterThan(20);
    expect(markdown).toContain(`${SITE}/llms.txt`);
    expect(markdown).toContain(`${SITE}/sitemap.xml`);
    expect(markdown).toContain(`${SITE}/openapi.json`);
    expect(markdown).toContain(`${SITE}/developers.md`);
  });
});
