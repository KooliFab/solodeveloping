import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Code2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '@/components/layout/LanguageSwitcher';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { i18n, t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile nav after route changes.
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Get language prefix for URLs
  const langPrefix = i18n.language === 'fr' ? '/fr' : '';

  const navLinks = [
    { name: t('navbar.home'), path: `${langPrefix}/` },
    { name: t('navbar.about'), path: `${langPrefix}/about` },
    { name: t('navbar.blog'), path: `${langPrefix}/articles` },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-4 glass-panel' : 'py-6 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative w-10 h-10 flex items-center justify-center bg-primary/10 rounded-lg overflow-hidden group-hover:bg-primary/20 transition-colors border border-primary/20">
            <Code2 className="w-6 h-6 text-primary" />
            <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            SOLO<span className="text-primary">DEVELOPING</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;

            return (
              <Link
                key={link.name}
                to={link.path}
                className={`relative text-sm font-medium transition-colors hover:text-primary ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
                onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
              >
                {link.name}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary shadow-[0_0_10px_var(--primary)]" />
                )}
              </Link>
            );
          })}
          <LanguageSwitcher />
          <Link
            to={`${langPrefix}/#contact`}
            className="px-5 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-all duration-300 shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)]"
          >
            {t('navbar.hireMe')}
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden glass-panel border-t border-white/10">
          <div className="container px-6 py-8 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-lg font-medium text-foreground/80 hover:text-primary transition-colors"
                onClick={() => {
                  setIsOpen(false);
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-2">
              <LanguageSwitcher />
            </div>
            <Link
              to={`${langPrefix}/#contact`}
              onClick={() => setIsOpen(false)}
              className="mt-4 w-full py-3 bg-primary text-primary-foreground rounded-xl text-center font-bold inline-block"
            >
              {t('navbar.hireMe')}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default React.memo(Navbar);
