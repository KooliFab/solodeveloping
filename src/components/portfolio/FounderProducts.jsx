import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Code2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { founderProducts } from '@/data/founderProducts';

const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const onChange = () => setIsMobile(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [breakpoint]);
  return isMobile;
};

// Accent colors per product — using inline styles for dynamic values
const ACCENT = {
  green:  '#22c55e',
  blue:   '#3b82f6',
  amber:  '#f59e0b',
  purple: '#8b5cf6',
  orange: '#f97316',
  pink:   '#ec4899',
  red:    '#ef4444',
};

// ─── Technical sub-project card ──────────────────────────────────────────────
const TechCard = ({ tech, accent, index, pKey }) => {
  const { t } = useTranslation();
  return (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.3, delay: index * 0.07 }}
    className="relative rounded-xl bg-background/70 p-5 md:p-6 flex flex-col gap-3 transition-all duration-300"
    style={{ border: `1px solid ${accent}25` }}
    onMouseEnter={e => (e.currentTarget.style.borderColor = `${accent}50`)}
    onMouseLeave={e => (e.currentTarget.style.borderColor = `${accent}25`)}
  >
    {/* Header */}
    <div className="flex items-start justify-between gap-2">
      <h4 className="text-sm font-bold leading-snug">{t(`founderProducts.items.${pKey}.projects.${tech.translationKey}.title`)}</h4>
      {tech.link && (
        <a
          href={tech.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 text-muted-foreground transition-colors"
          style={{ '--hover-color': accent }}
          onMouseEnter={e => (e.currentTarget.style.color = accent)}
          onMouseLeave={e => (e.currentTarget.style.color = '')}
        >
          <ExternalLink className="w-3.5 h-4" />
        </a>
      )}
    </div>

    {/* Description */}
    <p className="text-xs text-muted-foreground leading-relaxed flex-1">
      {t(`founderProducts.items.${pKey}.projects.${tech.translationKey}.description`)}
    </p>

    {/* Tags */}
    <div className="flex flex-wrap gap-1.5 pt-1">
      {tech.tags.map(tag => (
        <span
          key={tag}
          className="px-2 py-0.5 text-[10px] font-mono rounded-full font-medium"
          style={{
            background: `${accent}12`,
            color: accent,
            border: `1px solid ${accent}28`,
          }}
        >
          {tag}
        </span>
      ))}
    </div>
  </motion.div>
  );
};

// ─── Product Card (Stackable & Expandable) ────────────────────────────────────
const ProductCard = ({ product, isExpanded, isTabMode, onClick, layoutId, wrapperStyle, wrapperClass, wrapperAnimate }) => {
  const { t } = useTranslation();
  const accent = ACCENT[product.color] || ACCENT.green;
  const pKey = product.translationKey;

  if (isTabMode) {
    return (
      <motion.div 
        layoutId={layoutId}
        onClick={onClick}
        className={`bg-background overflow-hidden flex flex-col justify-center transition-colors duration-300 hover:bg-muted/10 cursor-pointer shrink-0 relative z-10 w-48 md:w-56 lg:w-64 ${wrapperClass || ''}`}
        style={{ 
          border: `1px solid ${accent}40`, 
          borderRight: 'none',
          borderTopLeftRadius: '1.5rem',
          borderBottomLeftRadius: '1.5rem',
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          ...wrapperStyle
        }}
        initial={{
          borderTopLeftRadius: '1.5rem',
          borderBottomLeftRadius: '1.5rem',
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
        }}
        animate={{
          borderTopLeftRadius: '1.5rem',
          borderBottomLeftRadius: '1.5rem',
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          ...wrapperAnimate,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30, borderTopRightRadius: { duration: 0 }, borderBottomRightRadius: { duration: 0 }, borderTopLeftRadius: { duration: 0 }, borderBottomLeftRadius: { duration: 0 } }}
      >
        <motion.div className="flex items-center gap-3 px-4 py-4 md:px-5 md:py-5">
          <div 
            className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-sm font-bold font-mono shrink-0"
            style={{ background: `${accent}15`, color: accent }}
          >
            {String(product.id).padStart(2, '0')}
          </div>
          <span className="font-display font-medium text-sm md:text-base whitespace-nowrap overflow-hidden text-ellipsis" style={{ color: accent }}>
            {product.title}
          </span>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      layoutId={layoutId}
      onClick={onClick}
      className={`overflow-hidden bg-background flex flex-col w-full transition-colors duration-300 ${
        isExpanded ? 'shadow-2xl' : 'h-[8rem] sm:h-[10rem] cursor-pointer shadow-xl'
      } ${wrapperClass || ''}`}
      style={{ 
        border: `1px solid ${accent}40`, 
        borderRadius: '1.5rem',
        boxShadow: `0 20px 40px -15px ${accent}20`,
        ...wrapperStyle
      }}
      initial={{
        borderTopLeftRadius: '1.5rem',
        borderBottomLeftRadius: '1.5rem',
        borderTopRightRadius: '1.5rem',
        borderBottomRightRadius: '1.5rem',
      }}
      animate={{
        borderTopLeftRadius: '1.5rem',
        borderBottomLeftRadius: '1.5rem',
        borderTopRightRadius: '1.5rem',
        borderBottomRightRadius: '1.5rem',
        ...wrapperAnimate,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30, borderTopRightRadius: { duration: 0 }, borderBottomRightRadius: { duration: 0 }, borderTopLeftRadius: { duration: 0 }, borderBottomLeftRadius: { duration: 0 } }}
    >
      {/* ── Card header (always visible) ── */}
      <motion.div layout="position" className="w-full text-left">
        <div className={`px-6 md:px-12 transition-all duration-300 ${isExpanded ? 'pt-8 pb-8 md:pt-12 md:pb-12' : 'py-4 md:py-6'}`}>
          <div className="flex items-start gap-4 md:gap-8">

            {/* Left: number indicator */}
            <motion.div
              layout="position"
              className={`hidden md:flex flex-shrink-0 rounded-2xl items-center justify-center font-bold font-mono transition-all duration-300 ${
                isExpanded ? 'w-16 h-16 text-xl mt-1' : 'w-12 h-12 text-lg'
              }`}
              style={{ background: `${accent}15`, color: accent, border: `1px solid ${accent}30` }}
            >
              {String(product.id).padStart(2, '0')}
            </motion.div>

            {/* Center: content */}
            <div className="flex-1 min-w-0">
              {/* Meta row */}
              <motion.div layout="position" className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-2 md:mb-3">
                <span className="text-xs md:text-sm font-mono font-medium" style={{ color: accent }}>
                  {t(`founderProducts.items.${pKey}.year`)}
                </span>
                <span className="text-muted-foreground/40 text-xs md:text-sm">·</span>
                <span className="text-xs md:text-sm text-muted-foreground font-medium uppercase tracking-wider">
                  {t(`founderProducts.items.${pKey}.role`)}
                </span>
                {/* Status badge — visible in expanded + collapsed */}
                <span
                  className="inline-flex items-center gap-1 px-2 py-0.5 font-mono text-[10px] rounded border"
                  style={{
                    color:        product.status === 'live' ? accent : '#f59e0b',
                    borderColor:  product.status === 'live' ? `${accent}40` : '#f59e0b40',
                    background:   product.status === 'live' ? `${accent}08` : '#f59e0b08',
                  }}
                >
                  <span className={product.status === 'live' ? 'dot-live' : ''}>●</span>
                  <span className="uppercase tracking-widest ml-0.5">
                    {product.status === 'live' ? 'LIVE' : 'MVP'}
                  </span>
                </span>
              </motion.div>

              {/* Title */}
              <motion.h3
                layout="position"
                className={`font-bold font-display transition-all duration-300 ${
                  isExpanded ? 'text-4xl md:text-5xl lg:text-6xl mb-4' : 'text-2xl md:text-3xl lg:text-4xl'
                }`}
                style={{ color: accent }}
              >
                {product.title}
              </motion.h3>

              {/* Expanded Only Content */}
              <div
                className={`transition-all duration-300 ${isExpanded ? 'opacity-100 h-auto' : 'opacity-0 h-0 overflow-hidden'}`}
              >
                <div className="pt-2 md:pt-4">
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6 max-w-4xl">
                    {t(`founderProducts.items.${pKey}.tagline`)}
                  </p>
                  
                  {/* Product tags */}
                  <div className="flex flex-wrap gap-2 md:gap-3 mb-4">
                    {product.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-mono rounded-full font-medium"
                        style={{
                          background: `${accent}15`,
                          color: accent,
                          border: `1px solid ${accent}30`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: actions (Only show link when expanded) */}
            {product.link && (
              <div 
                className={`flex items-center gap-3 flex-shrink-0 pt-2 transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
              >
                <a
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex p-4 md:p-5 rounded-2xl border border-border/50 text-muted-foreground transition-all duration-300 hover:scale-105"
                  onMouseEnter={e => {
                    e.currentTarget.style.color = accent;
                    e.currentTarget.style.borderColor = `${accent}50`;
                    e.currentTarget.style.background = `${accent}15`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = '';
                    e.currentTarget.style.borderColor = '';
                    e.currentTarget.style.background = 'transparent';
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="w-6 h-6 md:w-8 md:h-8" />
                </a>
              </div>
            )}
          </div>
        </div>
      </motion.div>
      {/* ── Technical sub-projects ── */}
      <div
        className={`px-6 py-8 md:px-12 md:py-12 flex flex-col bg-gradient-to-t from-black/5 to-transparent transition-all duration-300 ${isExpanded ? 'opacity-100 h-auto' : 'opacity-0 h-0 overflow-hidden'}`}
        style={{ borderTop: `1px solid ${accent}25` }}
      >
        {/* Sub-section label */}
        <div className="flex items-center gap-4 mb-8">
          <Code2 className="w-5 h-5 md:w-6 md:h-6" style={{ color: accent }} />
          <span
            className="text-sm md:text-base font-mono uppercase tracking-widest font-bold"
            style={{ color: accent }}
          >
            {t('founderProducts.techComponents')}
          </span>
          <div
            className="flex-1 h-px opacity-50"
            style={{ background: `linear-gradient(to right, ${accent}60, transparent)` }}
          />
        </div>

        {/* Tech project grid */}
        <div
          className={`grid gap-4 md:gap-6 ${
            product.technicalProjects.length === 1
              ? 'grid-cols-1 max-w-2xl'
              : product.technicalProjects.length === 2
              ? 'grid-cols-1 sm:grid-cols-2 max-w-4xl'
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {product.technicalProjects.map((tech, i) => (
            <TechCard key={tech.translationKey} tech={tech} accent={accent} index={i} pKey={pKey} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// ─── Section ─────────────────────────────────────────────────────────────────
const FounderProducts = () => {
  const { t } = useTranslation();
  const [expandedId, setExpandedId] = useState(null);
  const isMobile = useIsMobile();

  const handleCardClick = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="products" className="py-24 bg-background relative">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl mb-12 md:mb-16 relative z-10 text-center">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center justify-center gap-2 mb-5 px-4 py-2 rounded-md border border-electric-500/30 bg-electric-500/5">
            <span className="font-mono text-electric-500 text-base font-bold phosphor-glow select-none">&gt;</span>
            <span className="text-sm font-mono text-electric-500 tracking-widest font-bold phosphor-glow">
              {t('founderProducts.badge')}
            </span>
            <span className="cursor-blink text-electric-500 font-mono text-sm select-none ml-0.5">█</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold font-display mb-6">
            {t('founderProducts.title1')}{' '}
            <span className="text-electric-500">{t('founderProducts.title2')}</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {isMobile
              ? t('founderProducts.subtitleMobile')
              : t('founderProducts.subtitleDesktop')}
          </p>
        </motion.div>
      </div>

      {/* Stacked Product List */}
      <div className="w-full px-4 md:px-8 xl:px-12 mx-auto max-w-[1400px] relative z-10 pb-16 flex justify-center">
        {isMobile ? (
          /* ── Mobile: simple vertical list, all expanded ── */
          <div className="w-full flex flex-col gap-8">
            {founderProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <ProductCard
                  product={product}
                  isExpanded={true}
                  onClick={() => {}}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          /* ── Desktop: stacked / expandable cards ── */
          expandedId === null ? (
            <div
              className="w-full max-w-5xl relative transition-all duration-500 ease-out"
              style={{ height: `${160 + founderProducts.length * 100}px` }}
            >
              {founderProducts.map((product, index) => {
                const stackYOffset = index * 100;
                const scale = 1 - index * 0.02;

                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isExpanded={false}
                    isTabMode={false}
                    layoutId={`desktop-${product.id}`}
                    onClick={() => handleCardClick(product.id)}
                    wrapperClass="absolute left-0 right-0 w-full"
                    wrapperAnimate={{ top: stackYOffset, scale, zIndex: index + 1 }}
                  />
                );
              })}
            </div>
          ) : (
            <div className="w-full max-w-6xl flex flex-row transition-all duration-500 isolate">
              {/* Tabs Column (Unexpanded Cards) */}
              <div className="hidden md:flex flex-col gap-2 relative z-20 mt-12 mb-20 mr-[-1px]">
                {founderProducts.map((product) => {
                  if (product.id === expandedId) return null;
                  return (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isExpanded={false}
                      isTabMode={true}
                      layoutId={`desktop-${product.id}`}
                      onClick={() => handleCardClick(product.id)}
                    />
                  );
                })}
              </div>
              
              {/* Expanded Card */}
              <div className="flex-1 min-w-0 relative z-10 drop-shadow-2xl flex flex-col items-stretch">
                {founderProducts.map((product) => {
                  if (product.id !== expandedId) return null;
                  return (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isExpanded={true}
                      isTabMode={false}
                      layoutId={`desktop-${product.id}`}
                      onClick={() => handleCardClick(null)}
                      wrapperClass="w-full flex-1 mb-20 relative"
                    />
                  );
                })}
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default FounderProducts;
