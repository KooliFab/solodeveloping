import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Calendar, ExternalLink, Clock } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const ShortArticleListItem = ({ article, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  const title = article.title[currentLang] || article.title['en'];
  const subtitle = article.subtitle?.[currentLang] || article.subtitle?.['en'] || '';
  const content = article.content[currentLang] || article.content['en'];
  const coverImage = article.coverImage || null;
  const date = new Date(article.date).toLocaleDateString(currentLang, { year: 'numeric', month: 'long', day: 'numeric' });
  
  // Calculate read time
  const wordCount = content.split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));
  
  const langPrefix = currentLang === 'fr' ? '/fr' : '';
  const slug = article.slug?.[currentLang] || article.slug?.['en'] || article.id;
  const permalinkPath = `${langPrefix}/shorts/${slug}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="border-b border-white/10 last:border-0 hover:bg-white/5 transition-colors cursor-pointer py-5 px-4 rounded-lg -mx-4"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div>
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 text-xs text-primary mb-2 font-medium">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <time dateTime={article.date}>{date}</time>
              </div>
              <span className="text-primary/40">•</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{readTime} min read</span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              {title}
            </h3>
            {subtitle && (
              <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">
                {subtitle}
              </p>
            )}
          </div>
          <button
            className="p-2 mt-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors flex-shrink-0"
            aria-label={isExpanded ? "Collapse article" : "Expand article"}
            aria-expanded={isExpanded}
          >
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>

        {/* SEO Note: We keep the content in the DOM and animate its height/opacity,
            so search engines can index it properly even when "hidden" */}
        <motion.div
          initial={false}
          animate={{
            height: isExpanded ? "auto" : 0,
            opacity: isExpanded ? 1 : 0,
            marginTop: isExpanded ? 16 : 0
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
          style={{ visibility: isExpanded ? 'visible' : 'hidden' }}
        >
          {/* Add a tiny delay to visibility hidden so the height animation plays nicely */}
          <div className="pt-4 border-t border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent rounded-t-xl">
            {coverImage && (
              <img 
                src={coverImage} 
                alt={title} 
                className="float-right ml-6 mb-4 mt-2 max-h-40 w-auto rounded-xl shadow-lg border border-white/10"
              />
            )}
            <div
              className="prose prose-invert prose-base prose-editorial max-w-none text-zinc-300
                prose-a:text-primary prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                prose-strong:text-white prose-strong:font-bold
                prose-ul:list-disc prose-ul:list-outside prose-ul:pl-5
                prose-li:text-zinc-400 prose-li:marker:text-primary prose-li:mt-2
                prose-p:leading-relaxed prose-img:rounded-lg prose-img:max-h-96 prose-img:mx-auto prose-img:my-4"
              style={{
                visibility: 'visible' // Override the parent visibility for accessibility/SEO, though visually clipped by height: 0
              }}
            >
              <ReactMarkdown
                components={{
                  h2: ({node, children, ...props}) => (
                    <h2 className="text-2xl mt-8 mb-4 font-sans font-bold text-foreground" {...props}>
                      {children}
                    </h2>
                  ),
                  h3: ({node, children, ...props}) => (
                    <h3 className="text-xl mt-6 mb-3 font-sans font-bold text-foreground" {...props}>
                      {children}
                    </h3>
                  ),
                  ul: ({node, children, ...props}) => (
                    <ul className="list-disc list-outside pl-5 my-4 space-y-2" {...props}>
                      {children}
                    </ul>
                  ),
                  li: ({node, children, ...props}) => (
                    <li className="text-zinc-400 marker:text-primary leading-relaxed" {...props}>
                      {children}
                    </li>
                  ),
                  strong: ({node, children, ...props}) => (
                    <strong className="text-white font-bold" {...props}>
                      {children}
                    </strong>
                  ),
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          </div>

          {/* Permalink button */}
          <div className="mt-4 pt-3 border-t border-white/5">
            <Link
              to={permalinkPath}
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-2 text-xs font-medium text-primary/70 hover:text-primary transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              {currentLang === 'fr' ? 'Lire en pleine page' : 'Read full page'}
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.article>
  );
};

export default ShortArticleListItem;
