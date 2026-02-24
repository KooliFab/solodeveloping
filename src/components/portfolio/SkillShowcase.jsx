import { motion } from 'framer-motion';
import { Smartphone, Globe, Server, Cpu, Package, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { skillCategories } from '@/data/skillCategories';

// ─── Icon map for each category ──────────────────────────────────────────────
const CATEGORY_ICONS = {
  mobile:     Smartphone,
  web:        Globe,
  backend:    Server,
  blockchain: Cpu,
  opensource: Package,
};

// ─── iOS-style app icon ───────────────────────────────────────────────────────
const AppIcon = ({ app, index }) => {
  const inner = (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="flex flex-col items-center gap-1.5 group/icon"
    >
      {/* Icon square */}
      <motion.div
        whileHover={{
          rotate: [0, -9, 7, -4, 2, 0],
          scale:  [1, 1.15, 1.1, 1.05, 1.02, 1],
          transition: { duration: 0.4, ease: 'easeInOut' },
        }}
        className="w-14 h-14 rounded-2xl flex items-center justify-center
                   text-white font-bold text-base select-none
                   shadow-md cursor-pointer overflow-hidden relative bg-white"
        style={{
          background: app.icon ? '#ffffff' : `linear-gradient(145deg, ${app.gradFrom}, ${app.gradTo})`,
          boxShadow: `0 4px 14px ${app.gradFrom}55`,
        }}
      >
        {app.icon ? (
          <img src={app.icon} alt={app.name} className="w-full h-full object-cover" />
        ) : (
          app.initial
        )}
      </motion.div>
      {/* Label */}
      <span className="text-[10px] font-mono text-muted-foreground text-center leading-tight max-w-[64px] truncate">
        {app.name}
      </span>
    </motion.div>
  );

  if (app.link) {
    return (
      <a href={app.link} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }
  return inner;
};

// ─── Bento category card ──────────────────────────────────────────────────────
const CategoryCard = ({ category, className = '', animDelay = 0 }) => {
  const { t } = useTranslation();
  const Icon = CATEGORY_ICONS[category.id] || Package;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: animDelay }}
      className={`relative rounded-2xl border border-border/40 bg-card/40 backdrop-blur-sm
                  overflow-hidden p-6 flex flex-col gap-5
                  hover:border-[var(--accent)]/40 transition-colors duration-300 ${className}`}
      style={{ '--accent': category.accentColor }}
    >
      {/* Subtle glow in top-right corner */}
      <div
        className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl opacity-20 pointer-events-none"
        style={{ background: category.accentColor }}
      />

      {/* Card header */}
      <div className="flex items-start justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: `${category.accentColor}18`, border: `1px solid ${category.accentColor}30` }}
          >
            <Icon className="w-4.5 h-4.5" style={{ color: category.accentColor, width: 18, height: 18 }} />
          </div>
          <div>
            <h3 className="text-sm font-bold leading-tight">
              {t(`skills.categories.${category.id}.label`)}
            </h3>
            <p className="text-xs font-mono mt-0.5" style={{ color: `${category.accentColor}cc` }}>
              {t(`skills.categories.${category.id}.meta`)}
            </p>
          </div>
        </div>
      </div>

      {/* App icons grid */}
      <div className="flex flex-wrap gap-x-4 gap-y-3 relative z-10">
        {category.apps.map((app, i) => (
          <AppIcon key={app.name} app={app} index={i} />
        ))}
      </div>
    </motion.div>
  );
};

// ─── Section ─────────────────────────────────────────────────────────────────
const SkillShowcase = () => {
  const { t } = useTranslation();
  // Split into bento layout: [mobile, web] on row 1, [backend, blockchain, opensource] on row 2
  const [mobile, web, backend, blockchain, opensource] = skillCategories;

  return (
    <section id="skills" className="py-24 px-4 bg-background/50">
      <div className="container mx-auto max-w-5xl">

        {/* Section header */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-7xl md:text-8xl font-bold font-display text-foreground/[0.06] mb-0 leading-none select-none">
            PROD
          </p>
          <div className="-mt-4 md:-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-electric-500 text-base font-bold phosphor-glow select-none">$</span>
              <span className="text-sm font-mono text-electric-500 uppercase tracking-widest phosphor-glow">
                {t('skills.badge')}
              </span>
              <span className="cursor-blink text-electric-500 font-mono text-sm select-none">█</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
              {t('skills.title1')}{' '}
              <span className="text-electric-500">{t('skills.title2')}</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              {t('skills.subtitle')}
            </p>
          </div>
        </motion.div>

        {/* ── Bento grid ── */}
        <div className="flex flex-col gap-4">

          {/* Row 1: Mobile (wide) + Web */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <CategoryCard category={mobile}  className="md:col-span-2" animDelay={0} />
            <CategoryCard category={web}     className="md:col-span-1" animDelay={0.08} />
          </div>

          {/* Row 2: Backend + Blockchain + Open Source */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <CategoryCard category={backend}    animDelay={0.1} />
            <CategoryCard category={blockchain} animDelay={0.17} />
            <CategoryCard category={opensource} animDelay={0.24} />
          </div>

        </div>
      </div>
    </section>
  );
};

export default SkillShowcase;
