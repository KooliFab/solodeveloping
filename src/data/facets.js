/**
 * Facet service pages configuration.
 * Each facet defines a dedicated URL for a specific service offering,
 * targeting a distinct audience (recruiters, clients, prospects).
 */

export const facets = [
  {
    id: 'fullstack',
    slug: 'fullstack',
    // Show all skill categories — full stack means everything
    skillCategoryIds: ['mobile', 'web', 'backend', 'blockchain', 'opensource'],
    // Show all products
    productIds: [1, 2, 3, 4, 5],
    accentColor: '#22c55e', // electric green — same as site primary
    i18nPrefix: 'facets.fullstack',
    seo: { path: '/fullstack' },
  },
  {
    id: 'mobile-developer',
    slug: 'mobile-developer',
    skillCategoryIds: ['mobile', 'backend', 'opensource'],
    productIds: [1, 2, 3, 4, 5], // all products have a mobile component
    accentColor: '#3b82f6', // blue
    i18nPrefix: 'facets.mobile',
    seo: { path: '/mobile-developer' },
  },
  {
    id: 'ai-developer',
    slug: 'ai-developer',
    skillCategoryIds: ['web', 'backend'],
    productIds: [1, 4], // ZeLoop (ML reward engine) + Cogni (generative engine)
    accentColor: '#a855f7', // purple
    i18nPrefix: 'facets.ai',
    seo: { path: '/ai-developer' },
  },
];

export const getFacetBySlug = (slug) => facets.find((f) => f.slug === slug);
