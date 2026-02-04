import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const SEO = ({ titleKey, descriptionKey, title, description, path = '', image }) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  
  // Base URL - ensure no trailing slash
  const siteUrl = 'https://solodeveloping.com';
  
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
  const urlEn = `${siteUrl}${pathForUrl}`;
  const urlFr = `${siteUrl}/fr${pathForUrl}`;

  // Get metadata content (prioritize direct props, then translation keys)
  const metaTitle = title || (titleKey ? t(titleKey) : 'Solo Developing');
  const metaDescription = description || (descriptionKey ? t(descriptionKey) : '');

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      
      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Hreflang Tags */}
      <link rel="alternate" hreflang="en" href={urlEn} />
      <link rel="alternate" hreflang="fr" href={urlFr} />
      <link rel="alternate" hreflang="x-default" href={urlEn} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      {image && <meta property="og:image" content={image} />}
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={metaTitle} />
      <meta property="twitter:description" content={metaDescription} />
      {image && <meta property="twitter:image" content={image} />}
    </Helmet>
  );
};

export default SEO;
