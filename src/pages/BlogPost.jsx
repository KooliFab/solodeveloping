import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import { blogPosts } from '@/data/blogPosts';

const BlogPost = () => {
  const { slug } = useParams();
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'en';
  
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  // Get content safely based on language, fallback to English
  const title = post.title[currentLang] || post.title['en'];
  const subtitle = post.subtitle[currentLang] || post.subtitle['en'];
  const content = post.content[currentLang] || post.content['en'];

  // Calculate read time (approximate)
  const wordCount = content.split(/\s+/).length;
  const readTime = Math.ceil(wordCount / 200);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="pt-24 pb-16 px-6">
        <article className="max-w-3xl mx-auto space-y-8">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-4 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </Link>
          </motion.div>

          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                {title}
              </h1>
              {subtitle && (
                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                  {subtitle}
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground border-b border-primary/10 pb-8">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                <time dateTime={post.date}>{new Date(post.date).toLocaleDateString(currentLang, { year: 'numeric', month: 'long', day: 'numeric' })}</time>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>{readTime} min read</span>
              </div>
            </div>
          </motion.header>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="prose prose-invert prose-lg max-w-none 
              prose-headings:text-foreground prose-headings:font-bold 
              prose-p:text-muted-foreground prose-p:leading-relaxed
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground
              prose-img:rounded-xl prose-img:shadow-2xl prose-img:border prose-img:border-primary/10
              prose-code:text-primary prose-code:bg-primary/5 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-muted/50 prose-pre:border prose-pre:border-primary/10
              prose-blockquote:border-l-primary prose-blockquote:bg-primary/5 prose-blockquote:py-1 prose-blockquote:not-italic
              prose-li:text-muted-foreground"
          >
            {/* Hero Image */}
            {post.coverImage && (
              <div className="mb-10 rounded-2xl overflow-hidden shadow-2xl border border-primary/20 bg-muted/20">
                <img 
                  src={post.coverImage} 
                  alt={title} 
                  className="w-full h-auto object-cover max-h-[500px] mb-0" // mb-0 to override prose default
                />
              </div>
            )}
            
            <ReactMarkdown
              components={{
                // Custom renderer for images to make them responsive and styled
                img: ({node, ...props}) => (
                  <span className="block my-8">
                    <img 
                      {...props} 
                      className="rounded-xl shadow-lg w-full border border-primary/10"
                      loading="lazy"
                    />
                  </span>
                ),
                // Custom renderer for links to open external links in new tab
                a: ({node, ...props}) => (
                  <a {...props} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline" />
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </motion.div>
        </article>
      </main>
    </div>
  );
};

export default BlogPost;
