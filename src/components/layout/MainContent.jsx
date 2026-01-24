
import React from 'react';
import Hero from '@/components/sections/Hero';
import BookSection from '@/components/sections/BookSection';
import AppSection from '@/components/sections/AppSection';
import BenefitsSection from '@/components/sections/BenefitsSection';
import FaqSection from '@/components/sections/FaqSection';
import CtaSection from '@/components/sections/CtaSection';

const MainContent = ({ handleBuyNow, handleDownloadApp, scrollToSection }) => {
  return (
    <main>
      <Hero
        handleBuyNow={handleBuyNow}
        handleDownloadApp={handleDownloadApp}
        scrollToSection={scrollToSection}
      />
      <BookSection handleBuyNow={handleBuyNow} />
      <AppSection handleDownloadApp={handleDownloadApp} />
      <BenefitsSection />
      <FaqSection />
      <CtaSection
        handleBuyNow={handleBuyNow}
      />
    </main>
  );
};

export default MainContent;
