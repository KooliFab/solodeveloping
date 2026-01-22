
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, ShoppingCart, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Smartphone } from 'lucide-react';
import { promoBannerConfig } from '@/config/promoBanner';

const Hero = ({ handleBuyNow, handleDownloadApp, scrollToSection }) => {
  const { t, i18n } = useTranslation();

  // Add extra padding if banner is active
  const paddingTop = promoBannerConfig.isActive ? 'pt-40' : 'pt-32';

  return (
    <section
      aria-labelledby="hero-heading"
      className={`${paddingTop} pb-20 relative overflow-hidden`}
    >
      <div className="blob-animation" aria-hidden="true"></div>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center md:gap-12">
          {/* Title - order 1 on mobile, left column on desktop */}
          <div className="w-full md:w-1/2 order-1 mb-6 md:mb-0">
            <h1 id="hero-heading" className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-gray-800">
              {t('hero.title')}
            </h1>

            {/* Subtitle and buttons - shown on desktop only (after title in same column) */}
            <div className="hidden md:block">
              <p className="text-xl text-gray-600 mb-8" role="doc-subtitle">
                {t('hero.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
                {t && i18n && i18n.language === 'fr' ? (
                  <>
                    <Button
                      onClick={() => handleBuyNow('Version Française', import.meta.env.VITE_AMAZON_ASIN_FR)}
                      size="lg"
                      className="rounded-full bg-primary hover:bg-primary/90 text-white"
                      aria-label={t('hero.frenchVersion')}
                    >
                      <span className="mr-2 text-xl">🇫🇷</span> {t('hero.frenchVersion')}
                    </Button>
                    <Button
                      onClick={() => handleBuyNow('English Version', import.meta.env.VITE_AMAZON_ASIN_EN)}
                      size="lg"
                      className="rounded-full bg-primary hover:bg-primary/90 text-white"
                      aria-label={t('hero.englishVersion')}
                    >
                      <span className="mr-2 text-xl">🇬🇧</span> {t('hero.englishVersion')}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => handleBuyNow('English Version', import.meta.env.VITE_AMAZON_ASIN_EN)}
                      size="lg"
                      className="rounded-full bg-primary hover:bg-primary/90 text-white"
                      aria-label={t('hero.englishVersion')}
                    >
                      <span className="mr-2 text-xl">🇬🇧</span> {t('hero.englishVersion')}
                    </Button>
                    <Button
                      onClick={() => handleBuyNow('Version Française', import.meta.env.VITE_AMAZON_ASIN_FR)}
                      size="lg"
                      className="rounded-full bg-primary hover:bg-primary/90 text-white"
                      aria-label={t('hero.frenchVersion')}
                    >
                      <span className="mr-2 text-xl">🇫🇷</span> {t('hero.frenchVersion')}
                    </Button>
                  </>
                )}
                <Button
                  onClick={() => handleDownloadApp(t('hero.downloadApp'))}
                  size="lg"
                  variant="outline"
                  className="rounded-full border-primary text-primary hover:bg-primary/10"
                  aria-label={t('hero.downloadApp')}
                >
                  <Smartphone className="mr-2 h-5 w-5" aria-hidden="true" /> {t('hero.downloadApp')}
                </Button>
              </div>
            </div>
          </div>

          {/* Image - order 2 on mobile, right column on desktop */}
          <div className="w-full md:w-1/2 relative mb-10 md:mb-0 order-2">
            <div className="relative floating">
              <img
                src="/illustrations/home_header.webp"
                alt={t('hero.imageAlt')}
                className="rounded-3xl book-shadow max-w-full mx-auto"
                width="600"
                height="400"
                loading="eager"
                fetchpriority="high"
                itemProp="image"
              />
              <div className="absolute -bottom-6 -right-6 bg-white rounded-full p-3 shadow-lg">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
            </div>
          </div>

          {/* Subtitle and buttons - order 3 on mobile (after image), hidden on desktop */}
          <div className="w-full order-3 md:hidden">
            <p className="text-xl text-gray-600 mb-8" role="doc-subtitle">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              {t && i18n && i18n.language === 'fr' ? (
                <>
                  <Button
                    onClick={() => handleBuyNow('Version Française', import.meta.env.VITE_AMAZON_ASIN_FR)}
                    size="lg"
                    className="rounded-full bg-primary hover:bg-primary/90 text-white"
                    aria-label={t('hero.frenchVersion')}
                  >
                    <span className="mr-2 text-xl">🇫🇷</span> {t('hero.frenchVersion')}
                  </Button>
                  <Button
                    onClick={() => handleBuyNow('English Version', import.meta.env.VITE_AMAZON_ASIN_EN)}
                    size="lg"
                    className="rounded-full bg-primary hover:bg-primary/90 text-white"
                    aria-label={t('hero.englishVersion')}
                  >
                    <span className="mr-2 text-xl">🇬🇧</span> {t('hero.englishVersion')}
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => handleBuyNow('English Version', import.meta.env.VITE_AMAZON_ASIN_EN)}
                    size="lg"
                    className="rounded-full bg-primary hover:bg-primary/90 text-white"
                    aria-label={t('hero.englishVersion')}
                  >
                    <span className="mr-2 text-xl">🇬🇧</span> {t('hero.englishVersion')}
                  </Button>
                  <Button
                    onClick={() => handleBuyNow('Version Française', import.meta.env.VITE_AMAZON_ASIN_FR)}
                    size="lg"
                    className="rounded-full bg-primary hover:bg-primary/90 text-white"
                    aria-label={t('hero.frenchVersion')}
                  >
                    <span className="mr-2 text-xl">🇫🇷</span> {t('hero.frenchVersion')}
                  </Button>
                </>
              )}
              <Button
                onClick={() => handleDownloadApp(t('hero.downloadApp'))}
                size="lg"
                variant="outline"
                className="rounded-full border-primary text-primary hover:bg-primary/10"
                aria-label={t('hero.downloadApp')}
              >
                <Smartphone className="mr-2 h-5 w-5" aria-hidden="true" /> {t('hero.downloadApp')}
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-16">
          <button
            onClick={() => scrollToSection('book')}
            className="scroll-down flex flex-col items-center text-gray-500 hover:text-primary transition-colors"
            aria-label={t('hero.scrollToExplore')}
          >
            <span className="text-sm mb-2">{t('hero.scrollToExplore')}</span>
            <ChevronDown className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
