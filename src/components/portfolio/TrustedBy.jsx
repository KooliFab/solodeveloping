import { motion } from 'framer-motion';
import { ExternalLink, Users } from 'lucide-react';
import { trustedByExperiences } from '@/data/trustedByExperiences';

// ─── Experience row card ──────────────────────────────────────────────────────
const ExperienceCard = ({ exp, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -16 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: index * 0.07 }}
    className="group relative rounded-xl border border-border/40 bg-card/30 backdrop-blur-sm
               hover:border-electric-500/25 hover:bg-card/60 transition-all duration-300 p-5 md:p-6"
  >
    <div className="flex flex-col sm:flex-row sm:items-start gap-4">

      {/* Left column: company + meta */}
      <div className="flex-1 min-w-0">
        {/* Top row: company, role, years */}
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 mb-2">
          <span className="font-bold text-base text-foreground group-hover:text-electric-500 transition-colors duration-300">
            {exp.company}
          </span>
          <span className="text-muted-foreground/40 text-xs hidden sm:inline">·</span>
          <span className="text-sm text-muted-foreground">{exp.role}</span>
          <span className="text-muted-foreground/40 text-xs hidden sm:inline">·</span>
          <span className="text-xs font-mono text-electric-500">{exp.years}</span>
        </div>

        {/* Domain badge */}
        <p className="text-xs font-mono text-muted-foreground/50 mb-2 uppercase tracking-wide">
          {exp.domain}
        </p>

        {/* Description */}
        <p className="text-xs text-muted-foreground leading-relaxed mb-3 max-w-2xl">
          {exp.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5">
          {exp.tags.map(tag => (
            <span
              key={tag}
              className="px-2.5 py-0.5 text-xs font-mono rounded-full
                         bg-electric-500/8 text-electric-500/80 border border-electric-500/20
                         group-hover:bg-electric-500/12 group-hover:text-electric-500
                         transition-colors duration-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Right: external link */}
      {exp.link && (
        <a
          href={exp.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 self-start sm:self-center p-2 rounded-lg border border-border/50
                     text-muted-foreground hover:text-electric-500 hover:border-electric-500/30
                     transition-all duration-200"
          aria-label={`Voir ${exp.company}`}
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      )}
    </div>
  </motion.div>
);

// ─── Section ─────────────────────────────────────────────────────────────────
const TrustedBy = () => {
  return (
    <section id="experience" className="py-24 px-4 bg-background/50">
      <div className="container mx-auto max-w-5xl">

        {/* Section header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-7xl md:text-8xl font-bold font-display text-foreground/[0.06] mb-0 leading-none select-none">
            EXPÉRIENCES
          </p>
          <div className="-mt-4 md:-mt-6">
            <div className="flex items-center gap-3 mb-3">
              <Users className="w-5 h-5 text-electric-500" />
              <span className="text-sm font-mono text-electric-500 uppercase tracking-widest">
                Lead Developer & Prestataire
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
              Ils m'ont fait{' '}
              <span className="text-electric-500">confiance</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Missions en tant que lead developer et prestataire technique pour
              des startups et scale-ups — de la spec à la production.
            </p>
          </div>
        </motion.div>

        {/* Experience list */}
        <div className="flex flex-col gap-3">
          {trustedByExperiences.map((exp, index) => (
            <ExperienceCard key={exp.id} exp={exp} index={index} />
          ))}
        </div>

        {/* Earlier experience note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 pl-6 border-l border-border/40"
        >
          <p className="text-xs text-muted-foreground/60 font-mono">
            Expériences antérieures — Latécoère (Aéronautique · PHP · 2009–2012)
            · Orange Telecom (Web · 2007–2009)
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default TrustedBy;
