import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const AboutUsSection = () => {
  const { t } = useTranslation();
  
  return (
    <section id="about-us" className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-800">{t('aboutUsSection.title')}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('aboutUsSection.subtitle')}
          </p>
          <div className="w-20 h-1 bg-[hsl(var(--primary))] mx-auto mt-8"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col items-center text-center"
          >
            <div className="bg-primary/10 p-4 rounded-full mb-4">
              <Users className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-700">{t('aboutUsSection.teamTitle')}</h3>
            <p className="text-gray-600 leading-relaxed">
              {t('aboutUsSection.teamDesc')}
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center text-center"
          >
            <div className="bg-secondary/10 p-4 rounded-full mb-4">
              <Target className="h-10 w-10 text-secondary" />
            </div>
             <h3 className="text-xl font-semibold mb-2 text-gray-700">{t('aboutUsSection.missionTitle')}</h3>
            <p className="text-gray-600 leading-relaxed">
              {t('aboutUsSection.missionDesc')}
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center text-center"
          >
            <div className="bg-accent/10 p-4 rounded-full mb-4">
              <Heart className="h-10 w-10 text-accent" />
            </div>
             <h3 className="text-xl font-semibold mb-2 text-gray-700">{t('aboutUsSection.beliefTitle')}</h3>
            <p className="text-gray-600 leading-relaxed">
              {t('aboutUsSection.beliefDesc')}
            </p>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 flex justify-center"
        >
          <img
            className="rounded-full w-48 h-48 object-cover shadow-lg border-4 border-white"
            alt="Cogni the Corgi Mascot"
            src="/images/aboutUs/team.png"
            width="192"
            height="192"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUsSection;
