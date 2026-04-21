
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Gamepad2, Sparkles, Rocket } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { BookHeart } from 'lucide-react';
import { Smartphone } from 'lucide-react';
import { getSectionMeta } from '@/lib/utils/metaUtils';
import { leftContentAnimation, rightContentAnimation, decorativeElementAnimation } from '@/lib/utils/animationUtils';
import SectionHeader from '@/components/ui/SectionHeader';
import FeatureItem from '@/components/ui/FeatureItem';

const AppSection = ({ handleDownloadApp }) => {
  const { t, i18n } = useTranslation();
  
  // Get meta information using utility function
  const meta = getSectionMeta(t, 'app', {
    ogImage: '/images/app/en/smartphone-en.webp',
    ogType: 'product'
  });

  return (
    
      <section id="app" className="py-20 bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4">
        <SectionHeader 
          title={t('appSection.title')} 
          description={t('appSection.description')} 
        />

        <div className="flex flex-col-reverse md:flex-row items-center gap-12">
          <motion.div
            {...leftContentAnimation}
            className="md:w-1/2"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
              {t('appSection.experienceTitle')}
            </h3>
            <div className="space-y-6">
              <FeatureItem
                icon={<Sparkles />}
                title={t('appSection.createStoryTitle')}
                description={t('appSection.createStoryDesc')}
                iconBgColor="bg-primary/10"
                iconColor="text-primary"
              />

              <FeatureItem
                icon={<Gamepad2 />}
                title={t('appSection.gamesTitle')}
                description={t('appSection.gamesDesc')}
                iconBgColor="bg-secondary/10"
                iconColor="text-secondary"
              />

              <FeatureItem
                icon={<BookHeart />}
                title={t('appSection.printStoryTitle')}
                description={t('appSection.printStoryDesc')}
                iconBgColor="bg-accent/10"
                iconColor="text-accent"
              />
            </div>

            <div className="mt-10">
              <Button onClick={() => handleDownloadApp(t('appSection.downloadButton'))} size="lg" className="rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                <Smartphone className="mr-2 h-5 w-5" /> {t('appSection.downloadButton')}
              </Button>
            </div>
          </motion.div>

          <motion.div
            {...rightContentAnimation}
            className="md:w-1/2 mb-10 md:mb-0"
          >
            <div className="relative floating max-w-md mx-auto">
              <img
                src="/images/app/en/smartphone-en.webp"
                alt={t('appSection.appImageAlt')}
                className="app-mockup max-w-full h-auto w-4/5 mx-auto"
                width="400"
                height="800"
                loading="lazy"
              />
              <motion.div
                {...decorativeElementAnimation}
                className="absolute -bottom-6 -left-6 bg-secondary text-white rounded-full p-4 shadow-lg"
              >
                <Rocket className="h-8 w-8" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
    
  );
};

export default AppSection;
