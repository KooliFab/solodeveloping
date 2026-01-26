
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const languages = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

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
      // Add /fr prefix if switching to French
      newPath = hasFrPrefix ? currentPath : `/fr${currentPath}`;
    }
    
    // Navigate to the new path
    window.location.href = newPath;
  };

  const currentLanguage = languages.find(lang => lang.code === i18n.language)?.name || i18n.language;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="text-gray-700 hover:text-primary">
          <Globe className="h-4 w-4 mr-1" />
          {currentLanguage}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem 
            key={lang.code} 
            onClick={() => changeLanguage(lang.code)}
            className={i18n.language === lang.code ? 'bg-accent/10' : ''}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
