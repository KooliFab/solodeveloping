
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
  { code: 'es', name: 'Español' },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    
    // Update URL to reflect language change
    const currentPath = window.location.pathname;
    const pathSegments = currentPath.split('/');
    const supportedLanguages = ['en', 'fr', 'es'];
    
    // Check if the first segment is a language code
    const firstSegment = pathSegments[1] || '';
    const hasLangInPath = supportedLanguages.includes(firstSegment);
    
    let newPath;
    if (hasLangInPath) {
      // Replace existing language code
      pathSegments[1] = lng === 'en' ? '' : lng;
      newPath = pathSegments.filter(Boolean).join('/');
    } else {
      // Add language code (except for English which is default)
      newPath = lng === 'en' ? currentPath : `/${lng}${currentPath}`;
    }
    
    // Ensure path starts with slash
    newPath = newPath.startsWith('/') ? newPath : `/${newPath}`;
    
    // Update URL without page reload
    window.history.pushState({}, '', newPath);
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
