// Markdown mirror location of a page, following the llms.txt convention:
// directory-style URLs ("/", "/fr/") get "index.html.md", every other page
// gets ".md" appended ("/about" -> "/about.md").
// Shared by the SEO component and the build script that writes the files,
// so keep it free of imports.
export const LANGUAGE_ROOTS = ['/fr'];

export const markdownPathFor = (pathname) => {
  const clean = `/${pathname}`.replace(/\/{2,}/g, '/').replace(/\/+$/, '');

  if (clean === '' || LANGUAGE_ROOTS.includes(clean)) {
    return `${clean}/index.html.md`;
  }

  return `${clean}.md`;
};
