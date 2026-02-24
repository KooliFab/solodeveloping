import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { blogPosts } from '@/data/blogPosts';

const ArticleSuggestions = ({ currentSlug }) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  // Get 3 random posts that are not the current one
  const suggestions = blogPosts
    .filter(post => !Object.values(post.slug).includes(currentSlug))
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  if (suggestions.length === 0) return null;

  return (
    <div className="border-t border-white/10 pt-16 mt-16">
      <h3 className="text-2xl font-bold mb-8">
        {currentLang === 'fr' ? 'À lire aussi' : 'Continue Reading'}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {suggestions.map((post) => {
          const title = post.title[currentLang] || post.title['en'];
          const date = new Date(post.date).toLocaleDateString(currentLang, { year: 'numeric', month: 'long', day: 'numeric' });
          const slug = post.slug[currentLang] || post.slug['en'];
          const langPrefix = currentLang === 'fr' ? '/fr' : '';
          const linkPath = `${langPrefix}/articles/${slug}`;

          return (
            <Link 
              key={post.id} 
              to={linkPath}
              className="group block space-y-4"
            >
              <div className="aspect-video rounded-xl overflow-hidden border border-white/10 relative">
                <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/0 transition-colors z-10" />
                <img 
                  src={post.coverImage} 
                  alt={title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <time className="text-xs text-primary mb-2 block">{date}</time>
                <h4 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2">
                  {title}
                </h4>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ArticleSuggestions;
