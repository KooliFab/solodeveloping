import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const activeLanguage = i18n.language?.startsWith('fr') ? 'fr' : 'en';

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);

    // Update HTML lang attribute for accessibility and SEO
    document.documentElement.setAttribute('lang', lng);

    // Build new path based on selected language
    const currentPath = window.location.pathname;
    let newPath;

    // Check if current path has /fr prefix
    const hasFrPrefix = currentPath.startsWith('/fr');

    if (lng === 'en') {
      // Remove /fr prefix if switching to English
      newPath = hasFrPrefix ? currentPath.replace(/^\/fr/, '') || '/' : currentPath;
    } else if (lng === 'fr') {
      // Add /fr prefix if switching to French, avoid trailing slash on home
      const basePath = currentPath === '/' ? '' : currentPath;
      newPath = hasFrPrefix ? currentPath : `/fr${basePath}`;
    }

    // Navigate client-side without full page reload
    navigate(newPath);
  };

  return (
    <label className="inline-flex items-center gap-2 text-sm text-muted-foreground">
      <Globe className="h-4 w-4" aria-hidden="true" />
      <span className="sr-only">Language</span>
      <select
        value={activeLanguage}
        onChange={(event) => changeLanguage(event.target.value)}
        className="bg-transparent border border-border rounded-md px-2 py-1 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        aria-label="Switch language"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </label>
  );
};

export default LanguageSwitcher;
