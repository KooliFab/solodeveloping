import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
import { Calendar, ArrowRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { blogPosts } from '@/data/blogPosts';

const BlogList = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  const langPrefix = currentLang === 'fr' ? '/fr' : '';
  const canonicalUrl = currentLang === 'fr' ? 'https://solodeveloping.com/fr/articles' : 'https://solodeveloping.com/articles';

  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Articles | Solo Developing",
    "description": "Thoughts on software engineering, architecture, and developer experience.",
    "url": canonicalUrl,
    "publisher": {
      "@type": "Organization",
      "name": "Solo Developing",
      "logo": {
        "@type": "ImageObject",
        "url": "https://solodeveloping.com/vite.svg"
      }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO 
        title="Articles | Solo Developing"
        description="Thoughts on software engineering, architecture, and developer experience."
        path="/articles"
        schema={schema}
      />
      <Navbar />
      
      <main className="pt-24 px-6 pb-20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Articles</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Thoughts on software engineering, architecture, and developer experience.
            </p>
          </motion.div>

          {/* Featured/Latest Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {blogPosts.map((post, index) => {
              const title = post.title[currentLang] || post.title['en'];
              const subtitle = post.subtitle[currentLang] || post.subtitle['en'];
              const slug = post.slug[currentLang] || post.slug['en'];
              const linkPath = `${langPrefix}/articles/${slug}`;
              
              return (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-panel rounded-2xl overflow-hidden border border-white/10 hover:border-primary/30 transition-all group flex flex-col h-full"
                >
                  <Link to={linkPath} className="block overflow-hidden h-48 relative">
                    <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors z-10" />
                    <img 
                      src={post.coverImage} 
                      alt={title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                  
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-xs text-primary mb-3">
                      <Calendar className="w-3 h-3" />
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString(currentLang, { year: 'numeric', month: 'long', day: 'numeric' })}
                      </time>
                    </div>
                    
                      <h2 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                        <Link to={linkPath}>
                        {title}
                      </Link>
                    </h2>
                    
                    {subtitle && (
                      <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-1">
                        {subtitle}
                      </p>
                    )}
                    
                    <Link 
                      to={linkPath}
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors mt-auto"
                    >
                      Read Article <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </div>

          {blogPosts.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-xl">No posts available yet. Check back soon!</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogList;
