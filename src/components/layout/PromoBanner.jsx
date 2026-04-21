import React from 'react';
import { useTranslation } from 'react-i18next';
import { promoBannerConfig } from '@/config/promoBanner';

const PromoBanner = () => {
  const { t } = useTranslation();

  // Don't render anything if banner is not active
  if (!promoBannerConfig.isActive) {
    return null;
  }

  const bannerText = t('promoBanner.text', promoBannerConfig.text);

  return (
    <>
      <style>
        {`
          @keyframes scroll-banner {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .banner-scroll {
            display: flex;
            animation: scroll-banner ${promoBannerConfig.scrollSpeed}s linear infinite;
          }

          .banner-scroll:hover {
            animation-play-state: paused;
          }
        `}
      </style>
      <div className={`fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r ${promoBannerConfig.backgroundColor} text-white py-2 overflow-hidden`}>
        <div className="banner-scroll">
          <div className="whitespace-nowrap inline-block px-4 text-center text-sm md:text-base font-medium">
            {bannerText}
          </div>
          <div className="whitespace-nowrap inline-block px-4 text-center text-sm md:text-base font-medium" aria-hidden="true">
            {bannerText}
          </div>
        </div>
      </div>
    </>
  );
};

export default PromoBanner;
