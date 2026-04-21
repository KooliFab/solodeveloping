
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Sparkles, ShoppingCart, Menu, X } from 'lucide-react';
import LanguageSwitcher from '@/components/layout/LanguageSwitcher';
import { promoBannerConfig } from '@/config/promoBanner';

const Header = ({ handleBuyNow, scrollToSection }) => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Calculate top offset based on banner visibility
  const bannerHeight = promoBannerConfig.isActive ? '36px' : '0px';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = (section) => {
    scrollToSection(section);
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { id: 'book', label: 'header.navBook' },
    { id: 'app', label: 'header.navApp' },
    { id: 'benefits', label: 'header.navBenefits' },
    { id: 'about-us', label: 'header.navAbout' },
    { id: 'free-story', label: 'header.navFreeStory' },
  ];

  return (
    <>
      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMobileMenuOpen ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-transparent'}`}
        style={{ top: bannerHeight }}
      >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <Sparkles className="h-6 w-6 text-primary" />
            <h1 className="text-xl sm:text-2xl font-bold text-primary">{t('header.title')}</h1>
          </motion.div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <button 
                key={link.id}
                onClick={() => scrollToSection(link.id)} 
                className="text-gray-700 hover:text-primary font-medium transition-colors text-sm lg:text-base"
              >
                {t(link.label)}
              </button>
            ))}
          </nav>
          
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            
            {/* Desktop Buy Button */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="hidden md:block"
            >
              <Button onClick={() => handleBuyNow(t('header.buyNow'))} size="sm" className="bg-primary hover:bg-primary/90 text-white rounded-full">
                <ShoppingCart className="mr-2 h-4 w-4" /> {t('header.buyNow')}
              </Button>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="md:hidden"
            >
              <Button onClick={toggleMobileMenu} variant="ghost" size="icon" className="text-primary">
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed left-0 right-0 z-40 bg-white/95 backdrop-blur-md shadow-lg md:hidden"
            style={{ top: `calc(68px + ${bannerHeight})` }}
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <button 
                  key={link.id}
                  onClick={() => handleNavClick(link.id)} 
                  className="text-gray-700 hover:text-primary font-medium transition-colors text-left py-2"
                >
                  {t(link.label)}
                </button>
              ))}
              <Button onClick={() => { handleBuyNow(t('header.buyNow')); setIsMobileMenuOpen(false); }} className="w-full bg-primary hover:bg-primary/90 text-white rounded-full mt-4">
                <ShoppingCart className="mr-2 h-4 w-4" /> {t('header.buyNow')}
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
