import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { SITE_URL } from '@/constants/site';

const SEO = ({ titleKey, descriptionKey, title, description, path = '', image, alternates, type = 'website', author, publishedTime, schema, keywords, tags }) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  // Base URL - ensure no trailing slash
  const siteUrl = SITE_URL;

  // Construct canonical URL
  // If path is root '/', for default lang it's just siteUrl + '/'
  // for fr it's siteUrl + '/fr/'
  // Clean path to ensure it starts with / if not empty
  const cleanPath = path.startsWith('/') ? path : `/${path}`;

  // Format the path for the URL construction
  // We want to avoid double slashes like //about
  const pathForUrl = cleanPath === '/' ? '' : cleanPath;

  const canonicalUrl = currentLang === 'fr'
    ? `${siteUrl}/fr${pathForUrl}`
    : `${siteUrl}${pathForUrl}`;

  // Construct alternate URLs
  // If alternates are provided (for localized slugs), use them, otherwise use standard path logic
  const urlEn = alternates?.en || `${siteUrl}${pathForUrl}`;
  const urlFr = alternates?.fr || `${siteUrl}/fr${pathForUrl}`;

  // Get metadata content (prioritize direct props, then translation keys)
  const metaTitle = title || (titleKey ? t(titleKey) : 'Solo Developing');
  const metaDescription = description || (descriptionKey ? t(descriptionKey) : '');

  // Ensure OG image is always an absolute URL
  const absoluteImage = image
    ? image.startsWith('http')
      ? image
      : `${siteUrl}${image.startsWith('/') ? image : `/${image}`}`
    : null;

  // OG locale
  const ogLocale = currentLang === 'fr' ? 'fr_FR' : 'en_US';

  // Keywords string (accepts array or string)
  const keywordsStr = Array.isArray(keywords)
    ? keywords.join(', ')
    : keywords || '';

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      {keywordsStr && <meta name="keywords" content={keywordsStr} />}
      <meta name="author" content={author || 'Fabien Chung'} />

      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Hreflang Tags */}
      <link rel="alternate" hreflang="en" href={urlEn} />
      <link rel="alternate" hreflang="fr" href={urlFr} />
      <link rel="alternate" hreflang="x-default" href={urlEn} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:site_name" content="Solo Developing" />
      <meta property="og:locale" content={ogLocale} />
      {absoluteImage && <meta property="og:image" content={absoluteImage} />}
      {absoluteImage && <meta property="og:image:width" content="1200" />}
      {absoluteImage && <meta property="og:image:height" content="630" />}
      {absoluteImage && <meta property="og:image:alt" content={metaTitle} />}

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:site" content="@solodeveloping" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={metaTitle} />
      <meta property="twitter:description" content={metaDescription} />
      {absoluteImage && <meta property="twitter:image" content={absoluteImage} />}
      {absoluteImage && <meta property="twitter:image:alt" content={metaTitle} />}

      {/* Article Specific */}
      {author && <meta property="article:author" content={author} />}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {tags && tags.map(tag => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}

      {/* Schema Markup - accepts a single object or an array of schemas */}
      {schema && (Array.isArray(schema) ? schema : [schema]).map((s, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
};

SEO.propTypes = {
  titleKey: PropTypes.string,
  descriptionKey: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  path: PropTypes.string,
  image: PropTypes.string,
  alternates: PropTypes.shape({ en: PropTypes.string, fr: PropTypes.string }),
  type: PropTypes.string,
  author: PropTypes.string,
  publishedTime: PropTypes.string,
  schema: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.object)]),
  keywords: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  tags: PropTypes.arrayOf(PropTypes.string),
};

export default SEO;
