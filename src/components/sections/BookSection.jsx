
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Brain, ShoppingCart, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Youtube } from 'lucide-react';
import { LibraryBig } from 'lucide-react';
import { getSectionMeta } from '@/lib/utils/metaUtils';
import { leftContentAnimation, rightContentAnimation, decorativeElementAnimation } from '@/lib/utils/animationUtils';
import SectionHeader from '@/components/ui/SectionHeader';
import FeatureItem from '@/components/ui/FeatureItem';


const BookSection = ({ handleBuyNow }) => {
  const { t, i18n } = useTranslation();

  // Get meta information using utility function
  const meta = getSectionMeta(t, 'book', {
    ogImage: '/images/book/book.webp',
    ogType: 'product'
  });

  return (
    <section
      id="book"
      className="py-20 bg-gradient-to-b from-white to-purple-50"
      aria-labelledby="book-section-title"
      itemScope
      itemType="https://schema.org/Product"
    >
      <div className="container mx-auto px-4">
        <SectionHeader
          title={t('bookSection.title')}
          description={t('bookSection.description')}
        />

        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Book Image - shows first on mobile and desktop left */}
          <motion.div
            {...leftContentAnimation}
            className="md:w-1/2 w-full"
          >
            <div className="relative floating max-w-md mx-auto">
              <img
                src="/images/book/book.webp"
                alt="Cogni's Adventures Book Cover - Interactive children's book with educational content"
                className="rounded-2xl book-shadow max-w-full h-auto w-4/5 mx-auto"
                width="500"
                height="700"
                loading="lazy"
                itemProp="image"
                title="Cogni's Adventures Book"
              />
              <motion.div
                {...decorativeElementAnimation}
                className="absolute -top-6 -right-6 bg-accent text-white rounded-full p-4 shadow-lg"
              >
                <Star className="h-8 w-8" aria-hidden="true" />
              </motion.div>
            </div>
          </motion.div>

          {/* CTA Buttons - shows second on mobile (after image), hidden on desktop (will show in content section) */}
          <motion.div
            {...rightContentAnimation}
            className="w-full md:hidden px-4"
          >
            <div className="flex flex-col gap-4">
              {i18n.language === 'fr' ? (
                <>
                  <Button
                    onClick={() => handleBuyNow('Version Française', import.meta.env.VITE_AMAZON_ASIN_FR)}
                    size="lg"
                    className="rounded-full bg-primary hover:bg-primary/90 text-white h-14 text-base"
                    aria-label={t('bookSection.frenchVersion')}
                  >
                    <span className="mr-2 text-xl">🇫🇷</span> {t('bookSection.frenchVersion')}
                  </Button>
                  <Button
                    onClick={() => handleBuyNow('English Version', import.meta.env.VITE_AMAZON_ASIN_EN)}
                    size="lg"
                    variant="outline"
                    className="rounded-full border-primary text-primary hover:bg-primary/10 h-14 text-base"
                    aria-label={t('bookSection.englishVersion')}
                  >
                    <span className="mr-2 text-xl">🇬🇧</span> {t('bookSection.englishVersion')}
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => handleBuyNow('English Version', import.meta.env.VITE_AMAZON_ASIN_EN)}
                    size="lg"
                    className="rounded-full bg-primary hover:bg-primary/90 text-white h-14 text-base"
                    aria-label={t('bookSection.englishVersion')}
                  >
                    <span className="mr-2 text-xl">🇬🇧</span> {t('bookSection.englishVersion')}
                  </Button>
                  <Button
                    onClick={() => handleBuyNow('Version Française', import.meta.env.VITE_AMAZON_ASIN_FR)}
                    size="lg"
                    variant="outline"
                    className="rounded-full border-primary text-primary hover:bg-primary/10 h-14 text-base"
                    aria-label={t('bookSection.frenchVersion')}
                  >
                    <span className="mr-2 text-xl">🇫🇷</span> {t('bookSection.frenchVersion')}
                  </Button>
                </>
              )}
            </div>
          </motion.div>

          {/* Content Section - shows third on mobile, on desktop right */}
          <motion.div
            {...rightContentAnimation}
            className="md:w-1/2 w-full"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800" id="book-features-title" itemProp="name">
              {t('bookSection.bookTitle')}
            </h3>
            <div className="space-y-6">
              <FeatureItem
                icon={<LibraryBig aria-hidden="true" />}
                title={t('bookSection.seasonTitle')}
                description={t('bookSection.seasonDesc')}
                iconBgColor="bg-primary/10"
                iconColor="text-primary"
              />

              <FeatureItem
                icon={<Youtube aria-hidden="true" />}
                title={t('bookSection.multimediaTitle')}
                description={t('bookSection.multimediaDesc')}
                iconBgColor="bg-secondary/10"
                iconColor="text-secondary"
              />

              <FeatureItem
                icon={<Brain aria-hidden="true" />}
                title={t('bookSection.educationalTitle')}
                description={t('bookSection.educationalDesc')}
                iconBgColor="bg-accent/10"
                iconColor="text-accent"
              />
            </div>

            {/* CTA Buttons for desktop - hidden on mobile */}
            <div className="mt-10 hidden md:block">
              <div className="flex flex-col sm:flex-row gap-4">
                {i18n.language === 'fr' ? (
                  <>
                    <Button
                      onClick={() => handleBuyNow('Version Française', import.meta.env.VITE_AMAZON_ASIN_FR)}
                      size="lg"
                      className="rounded-full bg-primary hover:bg-primary/90 text-white flex-1"
                      aria-label={t('bookSection.frenchVersion')}
                    >
                      <span className="mr-2 text-xl">🇫🇷</span> {t('bookSection.frenchVersion')}
                    </Button>
                    <Button
                      onClick={() => handleBuyNow('English Version', import.meta.env.VITE_AMAZON_ASIN_EN)}
                      size="lg"
                      variant="outline"
                      className="rounded-full border-primary text-primary hover:bg-primary/10 flex-1"
                      aria-label={t('bookSection.englishVersion')}
                    >
                      <span className="mr-2 text-xl">🇬🇧</span> {t('bookSection.englishVersion')}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => handleBuyNow('English Version', import.meta.env.VITE_AMAZON_ASIN_EN)}
                      size="lg"
                      className="rounded-full bg-primary hover:bg-primary/90 text-white flex-1"
                      aria-label={t('bookSection.englishVersion')}
                    >
                      <span className="mr-2 text-xl">🇬🇧</span> {t('bookSection.englishVersion')}
                    </Button>
                    <Button
                      onClick={() => handleBuyNow('Version Française', import.meta.env.VITE_AMAZON_ASIN_FR)}
                      size="lg"
                      variant="outline"
                      className="rounded-full border-primary text-primary hover:bg-primary/10 flex-1"
                      aria-label={t('bookSection.frenchVersion')}
                    >
                      <span className="mr-2 text-xl">🇫🇷</span> {t('bookSection.frenchVersion')}
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

  );
};


export default BookSection;
