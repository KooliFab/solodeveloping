import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Brain, Code2, Zap, Database, Cloud } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';

const ExpertiseSection = () => {
  const { t } = useTranslation();
  
  const expertiseAreas = [
    {
      icon: Brain,
      title: t('expertise.aiTitle'),
      description: t('expertise.aiDescription'),
      highlights: [t('expertise.aiHighlight1'), t('expertise.aiHighlight2'), t('expertise.aiHighlight3')],
      color: 'from-electric-400 to-electric-600'
    },
    {
      icon: Smartphone,
      title: t('expertise.mobileTitle'),
      description: t('expertise.mobileDescription'),
      highlights: [t('expertise.mobileHighlight1'), t('expertise.mobileHighlight2'), t('expertise.mobileHighlight3')],
      color: 'from-purple-400 to-purple-600'
    },
    {
      icon: Code2,
      title: t('expertise.fullstackTitle'),
      description: t('expertise.fullstackDescription'),
      highlights: [t('expertise.fullstackHighlight1'), t('expertise.fullstackHighlight2'), t('expertise.fullstackHighlight3')],
      color: 'from-cyan-400 to-cyan-600'
    },
    {
      icon: Database,
      title: t('expertise.databaseTitle'),
      description: t('expertise.databaseDescription'),
      highlights: [t('expertise.databaseHighlight1'), t('expertise.databaseHighlight2'), t('expertise.databaseHighlight3')],
      color: 'from-green-400 to-green-600'
    },
    {
      icon: Cloud,
      title: t('expertise.cloudTitle'),
      description: t('expertise.cloudDescription'),
      highlights: [t('expertise.cloudHighlight1'), t('expertise.cloudHighlight2'), t('expertise.cloudHighlight3')],
      color: 'from-orange-400 to-orange-600'
    },
    {
      icon: Zap,
      title: t('expertise.performanceTitle'),
      description: t('expertise.performanceDescription'),
      highlights: [t('expertise.performanceHighlight1'), t('expertise.performanceHighlight2'), t('expertise.performanceHighlight3')],
      color: 'from-yellow-400 to-yellow-600'
    }
  ];
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger);

      // Heading reveal animation
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          {
            opacity: 0,
            y: 100
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 80%',
              end: 'bottom 60%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Stagger cards animation
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 80,
            rotateX: -15
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'bottom 60%',
              toggleActions: 'play none none reverse'
            },
            delay: index * 0.1
          }
        );
      });
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-4 bg-card/30">
      <div className="container mx-auto max-w-7xl">
        {/* Section header */}
        <div ref={headingRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-4">
            {t('expertise.title')} <span className="text-electric-500">{t('expertise.titleHighlight')}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('expertise.subtitle')}
          </p>
        </div>

        {/* Expertise grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {expertiseAreas.map((area, index) => {
            const Icon = area.icon;
            return (
              <div
                key={area.title}
                ref={(el) => (cardsRef.current[index] = el)}
                className="group relative"
                style={{ perspective: '1000px' }}
              >
                <div className="h-full p-6 rounded-2xl bg-card border border-border/50 hover:border-electric-500/50 transition-all duration-500 hover:shadow-lg hover:shadow-electric-500/10 hover:scale-105 hover:-translate-y-2">
                  {/* Icon */}
                  <div className="mb-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${area.color} p-2.5 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-full h-full text-white" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-3 group-hover:text-electric-500 transition-colors">
                    {area.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {area.description}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-2">
                    {area.highlights.map((highlight) => (
                      <div
                        key={highlight}
                        className="flex items-center text-xs text-muted-foreground"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-electric-500 mr-2" />
                        <span className="font-mono">{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-electric-500/0 to-electric-500/0 group-hover:from-electric-500/5 group-hover:to-electric-500/0 transition-all duration-500 pointer-events-none" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-muted-foreground mb-4">
            {t('expertise.ctaText')}
          </p>
          <a
            href="#contact"
            className="text-electric-500 font-semibold hover:underline inline-flex items-center gap-2"
          >
            {t('expertise.ctaLink')}
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
