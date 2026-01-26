import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  
  return (
    <footer id="footer" className="py-32 px-6 bg-black text-center relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="font-display text-[10vw] leading-[0.8] font-bold text-white mb-8 hover:text-green-500 transition-colors duration-500 cursor-pointer">
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
          href="https://www.linkedin.com/in/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors"
        >
          {t('footer.linkLinkedIn')}
        </a>
        <a
          href="https://github.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors"
        >
          {t('footer.linkGitHub')}
        </a>
        <a
          href="https://pub.dev/publishers/yourpublisher"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors"
        >
          {t('footer.linkPubDev')}
        </a>
        <a
          href="https://twitter.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors"
        >
          {t('footer.linkTwitter')}
        </a>
      </motion.div>

      <div className="mt-20 text-xs text-gray-800">
        {t('footer.copyright', { year: new Date().getFullYear() })}
      </div>
    </footer>
  );
};

export default Footer;
