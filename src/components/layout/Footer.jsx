import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  
  return (
    <footer id="footer" className="py-20 px-6 bg-black text-center relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight font-bold text-white mb-8 hover:text-green-500 transition-colors duration-500 cursor-pointer">
          <a href={`mailto:${t('footer.email')}`}>
            {t('footer.ctaTitle')}
          </a>
        </h2>
      </motion.div>

      <motion.div
        className="flex flex-col md:flex-row justify-center gap-8 md:gap-16 text-sm font-mono text-gray-500 uppercase tracking-widest"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        <a
          href="https://www.linkedin.com/in/%F0%9F%92%BB-fabien-chung-a1793830/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors"
        >
          {t('footer.linkLinkedIn')}
        </a>
        <a
          href="https://github.com/KooliFab"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors"
        >
          {t('footer.linkGitHub')}
        </a>
        <a
          href="https://pub.dev/publishers/solodeveloping.com/packages"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors"
        >
          {t('footer.linkPubDev')}
        </a>
        <a
          href="https://medium.com/@fabien.chung"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors"
        >
          {t('footer.linkMedium')}
        </a>
      </motion.div>

      <div className="mt-12 text-xs text-gray-800">
        {t('footer.copyright', { year: new Date().getFullYear() })}
      </div>
    </footer>
  );
};

export default React.memo(Footer);
