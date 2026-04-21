import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import SEO from '@/components/SEO';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CodeBlock from '@/components/ui/CodeBlock';
import { blogPosts } from '@/data/blogPosts';
import { slugifyHeading } from '@/lib/utils';
import { SITE_URL } from '@/constants/site';

// New Components
import ReadingProgress from '@/components/blog/ReadingProgress';
import TableOfContents from '@/components/blog/TableOfContents';
import ArticleSuggestions from '@/components/blog/ArticleSuggestions';

const getNodeText = (node) => {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(getNodeText).join('');
  if (!node || typeof node !== 'object') return '';
  return getNodeText(node.props?.children);
};

const BlogPost = () => {
  const { slug } = useParams();
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'en';
  
  // Find post by checking all locale slugs
  const post = blogPosts.find(p => 
    Object.values(p.slug).includes(slug)
  );

  if (!post) {
    const fallback = currentLang === 'fr' ? '/fr/articles' : '/articles';
    return <Navigate to={fallback} replace />;
  }

  // Get content safely based on language, fallback to English
  const title = post.title[currentLang] || post.title['en'];
  const subtitle = post.subtitle[currentLang] || post.subtitle['en'];
  const content = post.content[currentLang] || post.content['en'];

  // SEO-specific overrides (keyword-optimised title & longer description)
  const seoTitle = post.seoTitle
    ? (post.seoTitle[currentLang] || post.seoTitle['en'])
    : title;
  const seoDescription = post.seoDescription
    ? (post.seoDescription[currentLang] || post.seoDescription['en'])
    : subtitle;

  // Calculate read time (approximate)
  const wordCount = content.split(/\s+/).length;
  const readTime = Math.ceil(wordCount / 200);

  // Calculate alternates for SEO
  const alternates = {
    en: `${SITE_URL}/articles/${post.slug.en}`,
    fr: `${SITE_URL}/fr/articles/${post.slug.fr}`,
  };

  const langPrefix = currentLang === 'fr' ? '/fr' : '';
  const canonicalUrl = currentLang === 'fr' ? alternates.fr : alternates.en;
  const absoluteCoverImage = `${SITE_URL}${post.coverImage}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": seoTitle,
    "description": seoDescription,
    "image": {
      "@type": "ImageObject",
      "url": absoluteCoverImage,
      "width": 1200,
      "height": 630,
    },
    "author": {
      "@type": "Person",
      "name": post.author,
      "url": SITE_URL
    },
    "publisher": {
      "@type": "Organization",
      "name": "Solo Developing",
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/favicon.png`
      }
    },
    "datePublished": post.date,
    "dateModified": post.lastModified || post.date,
    "inLanguage": currentLang === 'fr' ? 'fr-FR' : 'en-US',
    "wordCount": wordCount,
    ...(post.tags && { "keywords": post.tags.join(', ') }),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": currentLang === 'fr' ? `${SITE_URL}/fr` : SITE_URL
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": currentLang === 'fr' ? 'Articles' : 'Articles',
        "item": currentLang === 'fr' ? `${SITE_URL}/fr/articles` : `${SITE_URL}/articles`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": title,
        "item": canonicalUrl
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <ReadingProgress />
      
      <SEO
        title={seoTitle}
        description={seoDescription}
        path={`/articles/${slug}`}
        image={absoluteCoverImage}
        alternates={alternates}
        type="article"
        author={post.author}
        publishedTime={post.date}
        schema={[schema, breadcrumbSchema]}
        keywords={post.tags}
        tags={post.tags}
      />
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Breadcrumb & Back */}
        <div className="max-w-[1400px] mx-auto px-6 mb-8">
          <Link 
            to={`${langPrefix}/articles`} 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            {currentLang === 'fr' ? 'Retour aux articles' : 'Back to Articles'}
          </Link>
        </div>

        {/* Hero Section - Immersive */}
        <header className="max-w-[1400px] mx-auto px-6 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <div className="space-y-6 order-2 lg:order-1">
              <div className="flex flex-wrap gap-4 text-sm font-medium text-primary">
                <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                  Blog
                </span>
                <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 flex items-center gap-2">
                  <Clock className="w-3 h-3" /> {readTime} min read
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-balance font-extrabold tracking-tight leading-tight">
                {title}
              </h1>
              
              {subtitle && (
                <p className="text-xl text-muted-foreground leading-relaxed text-balance">
                  {subtitle}
                </p>
              )}

              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold">{post.author}</div>
                  <time className="text-sm text-muted-foreground" dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString(currentLang, { year: 'numeric', month: 'long', day: 'numeric' })}
                  </time>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="rounded-3xl overflow-hidden shadow-2xl border border-white/10 aspect-video relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-60 z-10" />
                <img
                  src={post.coverImage}
                  alt={title}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
            </div>
          </motion.div>
        </header>

        {/* Content Layout */}
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Content */}
          <article className="lg:col-span-9">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="prose prose-invert prose-lg max-w-none prose-editorial
                font-serif
                prose-headings:text-foreground prose-headings:font-bold prose-headings:font-sans prose-headings:scroll-mt-32
                prose-p:text-zinc-300 prose-p:leading-8 prose-p:text-pretty
                prose-a:text-primary prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                prose-strong:text-white prose-strong:font-bold
                prose-img:rounded-2xl prose-img:shadow-xl prose-img:border prose-img:border-white/10 prose-img:my-12
                prose-blockquote:border-l-primary prose-blockquote:bg-primary/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
                prose-li:text-zinc-400 prose-li:marker:text-primary
                prose-code:font-mono prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none"
            >
              <ReactMarkdown
                rehypePlugins={[rehypeRaw]}
                components={{
                  h2: ({node, children, ...props}) => {
                    const id = slugifyHeading(getNodeText(children));
                    return (
                      <h2 
                        id={id} 
                        className={`text-3xl lg:text-4xl mt-16 mb-6 font-sans font-bold text-foreground scroll-mt-32 ${props.className || ''}`}
                        {...props}
                      >
                        {children}
                      </h2>
                    );
                  },
                  h3: ({node, children, ...props}) => {
                    const id = slugifyHeading(getNodeText(children));
                    return (
                      <h3 
                        id={id} 
                        className={`text-2xl lg:text-3xl mt-12 mb-4 font-sans font-bold text-foreground scroll-mt-32 ${props.className || ''}`}
                        {...props}
                      >
                        {children}
                      </h3>
                    );
                  },
                  code: ({ node, inline, className, children, ...props }) => {
                    const match = /language-(\w+)/.exec(className || '');
                    const language = match ? match[1] : '';
                    const codeString = String(children).replace(/\n$/, '');

                    if (!inline && language) {
                      return (
                        <div className="my-8 rounded-xl overflow-hidden shadow-2xl border border-white/10">
                           <CodeBlock language={language}>{codeString}</CodeBlock>
                        </div>
                      );
                    }
                    return <code className={className} {...props}>{children}</code>;
                  },
                  img: ({node, ...props}) => (
                    <span className="block my-12 group">
                      <img
                        {...props}
                        alt={props.alt || ''}
                        className={`rounded-2xl shadow-2xl border border-white/10 group-hover:shadow-primary/10 transition-shadow duration-500 ${props.title === 'small' ? 'max-w-sm mx-auto block' : 'w-full'}`}
                        loading="lazy"
                        decoding="async"
                      />
                      {props.alt && (
                        <span className="block text-center text-sm text-muted-foreground mt-4 italic">
                          {props.alt}
                        </span>
                      )}
                    </span>
                  ),
                  a: ({node, children, ...props}) => (
                    <a {...props} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors border-b border-primary/30 hover:border-primary">
                      {children}
                    </a>
                  ),
                }}
              >
                {content}
              </ReactMarkdown>

            </motion.div>
            
            <ArticleSuggestions currentSlug={slug} />
          </article>

          {/* Right Sidebar (TOC) */}
          <aside className="lg:col-span-3 hidden lg:block">
            <TableOfContents content={content} />
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
