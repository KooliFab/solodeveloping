import React, { useEffect, useState, useRef, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '@/components/layout/Header';
import PromoBanner from '@/components/layout/PromoBanner';
import { getSectionMeta } from '@/lib/utils/metaUtils';
import LanguagePathDetector from '@/components/LanguagePathDetector';
import { trackPageVisit } from '@/utils/slackNotifier';
import { trackEvent } from '@/utils/analytics';

// Lazy load MainContent for better performance
const MainContent = lazy(() => import('@/components/layout/MainContent'));

const HomePage = ({ handleBuyNow, handleDownloadApp, scrollToSection }) => {
  const { t, i18n } = useTranslation();
  const [searchParams] = useSearchParams();
  const [currentLang, setCurrentLang] = useState(i18n.language);
  const hasTrackedQR = useRef(false);

  // Extract QR tracking parameter
  const qrSource = searchParams.get('qr') || '';

  // Track QR code scan and auto-scroll sequence
  useEffect(() => {
    if (qrSource && !hasTrackedQR.current) {
      hasTrackedQR.current = true;

      // Send Slack notification for QR code scan
      trackPageVisit('Home Page - QR Code Scan', {
        'QR Source': qrSource,
        'Campaign': 'Flyer Campaign',
        'Type': qrSource.includes('friend') ? 'Friend Referral' : 'Location',
      });

      // Track with Google Analytics
      trackEvent('qr_code_scan', {
        qr_source: qrSource,
        campaign: 'flyer_campaign',
        event_category: 'qr_tracking',
      });

      // First scroll to free-story section quickly, then scroll back to top
      setTimeout(() => {
        const freeStorySection = document.getElementById('free-story');
        if (freeStorySection) {
          // Quick scroll to free-story section (no smooth animation)
          freeStorySection.scrollIntoView({
            behavior: 'auto',
            block: 'start'
          });
          
          // Then scroll back to top smoothly after a brief pause
          setTimeout(() => {
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
          }, 200);
        }
      }, 500);
    }
  }, [qrSource]);

  // Update currentLang when language changes
  useEffect(() => {
    const handleLanguageChanged = () => {
      setCurrentLang(i18n.language);
    };

    i18n.on('languageChanged', handleLanguageChanged);

    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [i18n]);

  // Get meta information using utility function
  const meta = getSectionMeta(t, 'website', {
    ogImage: '/illustrations/home_header.webp',
    ogType: 'website'
  });

  // SEO configuration
  const baseUrl = "https://cognibook.com";
  const alternateUrls = {
    en: baseUrl,
    es: `${baseUrl}?lang=es`,
    fr: `${baseUrl}?lang=fr`
  };
  
  const currentUrl = `${baseUrl}${currentLang !== 'en' ? `?lang=${currentLang}` : ''}`;

  // Comprehensive JSON-LD structured data for better SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": t('meta.website.structuredData.name'),
    "description": t('meta.website.structuredData.description'),
    "image": "/illustrations/home_header.webp",
    "brand": {
      "@type": "Brand",
      "name": "Cogni"
    },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "price": t('meta.website.structuredData.offers.price'),
      "priceCurrency": t('meta.website.structuredData.offers.priceCurrency')
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": t('meta.website.structuredData.aggregateRating.ratingValue'),
      "reviewCount": t('meta.website.structuredData.aggregateRating.reviewCount')
    },
    "hasPart": [
      {
        "@type": "Book",
        "name": t('meta.website.structuredData.book.name'),
        "description": t('meta.website.structuredData.book.description'),
        "image": "/images/book/book.webp",
        "audience": {
          "@type": "PeopleAudience",
          "suggestedMinAge": "3",
          "suggestedMaxAge": "10"
        },
        "educationalUse": "Primary Education"
      },
      {
        "@type": "SoftwareApplication",
        "name": t('meta.website.structuredData.app.name'),
        "description": t('meta.website.structuredData.app.description'),
        "image": "/images/app/en/smartphone-en.webp",
        "applicationCategory": "EducationalApplication",
        "operatingSystem": "iOS, Android"
      }
    ]
  };

  // FAQ Schema for better SEO
  const faqSchema = { 
    "@context": "https://schema.org", 
    "@type": "FAQPage", 
    "mainEntity": [ 
      { 
        "@type": "Question", 
        "name": t('faq.ageQuestion'), 
        "acceptedAnswer": { 
          "@type": "Answer", 
          "text": t('faq.ageAnswer') 
        } 
      },
      { 
        "@type": "Question", 
        "name": t('faq.contentQuestion'), 
        "acceptedAnswer": { 
          "@type": "Answer", 
          "text": t('faq.contentAnswer') 
        } 
      },
      { 
        "@type": "Question", 
        "name": t('faq.languagesQuestion'), 
        "acceptedAnswer": { 
          "@type": "Answer", 
          "text": t('faq.languagesAnswer') 
        } 
      },
      { 
        "@type": "Question", 
        "name": t('faq.appQuestion'), 
        "acceptedAnswer": { 
          "@type": "Answer", 
          "text": t('faq.appAnswer') 
        } 
      }
    ] 
  };

  return (
    <>
      <LanguagePathDetector />
      <Helmet>
        {/* Basic Meta Tags */}
        <html lang={currentLang} />
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={t('meta.website.keywords')} />
        <meta name="author" content={t('meta.website.author')} />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="theme-color" content="#8B5CF6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={t('header.title')} />
        
        {/* Open Graph / Social Media */}
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.ogDescription || meta.description} />
        <meta property="og:type" content={meta.ogType || 'website'} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:image" content={meta.ogImage} />
        <meta property="og:site_name" content={t('header.title')} />
        <meta property="og:locale" content={currentLang} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.ogDescription || meta.description} />
        <meta name="twitter:image" content={meta.ogImage} />
        
        {/* Canonical and alternate language URLs */}
        <link rel="canonical" href={currentUrl} />
        {Object.entries(alternateUrls).map(([lang, url]) => (
          currentLang !== lang && (
            <link key={lang} rel="alternate" hreflang={lang} href={url} />
          )
        ))}
        <link rel="alternate" hreflang="x-default" href={baseUrl} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        
        {/* FAQ Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <PromoBanner />
      <Header handleBuyNow={handleBuyNow} scrollToSection={scrollToSection} />

      <Suspense fallback={<div className="loading-spinner">Loading...</div>}>
        <MainContent 
          handleBuyNow={handleBuyNow} 
          handleDownloadApp={handleDownloadApp} 
          scrollToSection={scrollToSection} 
        />
      </Suspense>
    </>
  );
};

export default HomePage;
