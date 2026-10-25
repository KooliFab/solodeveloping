import { describe, it, expect } from 'vitest';
import { markdownPathFor } from '../markdownPath';

describe('markdownPathFor', () => {
  it.each([
    ['/', '/index.html.md'],
    ['', '/index.html.md'],
    ['/fr', '/fr/index.html.md'],
    ['/fr/', '/fr/index.html.md'],
    ['/about', '/about.md'],
    ['/about/', '/about.md'],
    ['/fr/about', '/fr/about.md'],
    ['/articles/flutter-pwa-guide', '/articles/flutter-pwa-guide.md'],
    ['//articles//x/', '/articles/x.md'],
  ])('%s -> %s', (pathname, expected) => {
    expect(markdownPathFor(pathname)).toBe(expected);
  });
});
