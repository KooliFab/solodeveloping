import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Calendar } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const ShortArticleCard = ({ article, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  const title = article.title[currentLang] || article.title['en'];
  const content = article.content[currentLang] || article.content['en'];
  const date = new Date(article.date).toLocaleDateString(currentLang, { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-panel rounded-2xl overflow-hidden border border-white/10 hover:border-primary/30 transition-colors cursor-pointer"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="p-6">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-xs text-primary mb-2">
              <Calendar className="w-3 h-3" />
              <time dateTime={article.date}>{date}</time>
            </div>
            <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
              {title}
            </h3>
          </div>
          <button
            className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors flex-shrink-0"
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
          <div
            className="prose prose-invert prose-sm max-w-none text-zinc-300
              prose-a:text-primary prose-a:font-medium prose-a:no-underline hover:prose-a:underline
              prose-p:leading-relaxed"
            style={{
              visibility: 'visible' // Override the parent visibility for accessibility/SEO, though visually clipped by height: 0
            }}
          >
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </motion.div>
      </div>
    </motion.article>
  );
};

export default ShortArticleCard;
