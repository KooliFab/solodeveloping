import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, Hand, BookOpenCheck, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { BenefitCard } from '@/components/ui/benefit-card';
import { BenefitPieChart } from '@/components/ui/benefit-pie-chart';
import { calculateIconPositions } from '@/lib/benefit-utils';

const BenefitsSection = () => {
  const { t } = useTranslation();

  // Define benefits data with consistent structure
  const benefitItems = [
    {
      id: 'cognitive',
      title: t('benefitsSection.cognitiveTitle'),
      description: t('benefitsSection.cognitiveDesc'),
      icon: Brain,
      iconColor: 'text-[hsl(var(--benefit-icon-cognitive))]',
      pieColor: '#6366f1',
      iconForPieChart: Hand,
      delay: 0.1
    },
    {
      id: 'motor',
      title: t('benefitsSection.motorTitle'),
      description: t('benefitsSection.motorDesc'),
      icon: Hand,
      iconColor: 'text-[hsl(var(--benefit-icon-motor))]',
      pieColor: '#8b5cf6',
      iconForPieChart: BookOpenCheck,
      delay: 0.2
    },
    {
      id: 'language',
      title: t('benefitsSection.languageTitle'),
      description: t('benefitsSection.languageDesc'),
      icon: BookOpenCheck,
      iconColor: 'text-[hsl(var(--benefit-icon-language))]',
      pieColor: '#ec4899',
      iconForPieChart: Heart,
      delay: 0.3
    },
    {
      id: 'social',
      title: t('benefitsSection.socialTitle'),
      description: t('benefitsSection.socialDesc'),
      icon: Heart,
      iconColor: 'text-[hsl(var(--benefit-icon-social))]',
      pieColor: '#4fd1c5',
      iconForPieChart: Brain,
      delay: 0.4
    }
  ];

  // Calculate positions for icons on the pie chart
  const [iconPositions, setIconPositions] = useState(calculateIconPositions());

  // Recalculate icon positions on window resize
  useEffect(() => {
    const handleResize = () => {
      setIconPositions(calculateIconPositions());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section id="benefits" className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-8 md:mb-12 lg:mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-800">{t('benefitsSection.title')}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('benefitsSection.description')}
          </p>

          <div className="w-20 h-1 bg-[hsl(var(--primary))] mx-auto mt-8"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-11 gap-6 md:gap-8 items-center">
          {/* Left Column */}
          <div className="lg:col-span-4 space-y-6 md:space-y-8">
            <BenefitCard
              icon={benefitItems[0].icon}
              title={benefitItems[0].title}
              description={benefitItems[0].description}
              iconColor={benefitItems[0].iconColor}
              delay={benefitItems[0].delay}
            />
            <BenefitCard
              icon={benefitItems[2].icon}
              title={benefitItems[2].title}
              description={benefitItems[2].description}
              iconColor={benefitItems[2].iconColor}
              delay={benefitItems[2].delay}
            />
          </div>

          {/* Center Column (Pie Chart) */}
          <div className="lg:col-span-3 flex justify-center items-center my-8 lg:my-0">
            <BenefitPieChart
              data={benefitItems.map(item => ({
                ...item,
                title: item.id,
                value: 25, // Equal distribution
                color: item.pieColor,
                icon: item.iconForPieChart
              }))}
              iconPositions={iconPositions}
              className="flex justify-center items-center"
            />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-4 space-y-6 md:space-y-8">
            <BenefitCard
              icon={benefitItems[1].icon}
              title={benefitItems[1].title}
              description={benefitItems[1].description}
              iconColor={benefitItems[1].iconColor}
              delay={benefitItems[1].delay}
            />
            <BenefitCard
              icon={benefitItems[3].icon}
              title={benefitItems[3].title}
              description={benefitItems[3].description}
              iconColor={benefitItems[3].iconColor}
              delay={benefitItems[3].delay}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
