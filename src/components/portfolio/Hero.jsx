import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Code2, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { splitTextAdvanced } from '@/utils/textSplit';

/**
 * Hero section with dramatic text reveals and parallax
 * Main landing page hero component
 */
const Hero = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const bgLayerRef = useRef(null);
  const gridRef = useRef(null);

  const handleSecondaryCta = () => {
    const currentLang = i18n.language;
    const prefix = currentLang === 'fr' ? '/fr' : '';
    navigate(`${prefix}/about#recommendations`);
  };

  useEffect(() => {
    // Import ScrollTrigger dynamically
    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger);

      // Check if mobile - skip text splitting animation to prevent cropping
      const isMobile = window.innerWidth < 768;

      // Timeline for entrance animations
      const tl = gsap.timeline({
        defaults: { ease: 'power4.out' },
        delay: 0.2
      });

      // Only run character-by-character animation on desktop
      // On mobile, the text splitting causes cropping due to white-space: nowrap
      if (!isMobile) {
        // Split text for character-by-character animation
        const titleElements = titleRef.current?.querySelectorAll('.hero-title-line');

        // Animate each title line with stagger
        titleElements?.forEach((line, index) => {
          const isGradientLine = line.classList.contains('bg-gradient-to-r');
          
          if (isGradientLine) {
            // Simple fade-in for gradient text (text-splitting breaks gradient)
            tl.fromTo(
              line,
              {
                opacity: 0,
                y: 60,
              },
              {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power4.out'
              },
              index * 0.3
            );
          } else {
            // Character-by-character animation for regular text
            const split = splitTextAdvanced(line);

            tl.fromTo(
              split.chars,
              {
                opacity: 0,
                y: 120,
                rotateX: -90,
                transformOrigin: '50% 100%'
              },
              {
                opacity: 1,
                y: 0,
                rotateX: 0,
                duration: 1.2,
                stagger: 0.03,
                ease: 'power4.out'
              },
              index * 0.3
            );
          }
        });
      } else {
        // Simple fade-in for mobile without text splitting
        const titleElements = titleRef.current?.querySelectorAll('.hero-title-line');
        tl.fromTo(
          titleElements,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.2 }
        );
      }

      // Subtitle fade in
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1 },
        '-=0.6'
      );

      // Parallax effect on background layers
      gsap.to(bgLayerRef.current, {
        y: () => window.innerHeight * 0.3,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });

      // Grid parallax - slower
      gsap.to(gridRef.current, {
        y: () => window.innerHeight * 0.15,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });

      // Fade out hero on scroll
      gsap.to(heroRef.current, {
        opacity: 0.4,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });

    });
  }, []);

  return (
    <section
      id="about"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Gradient background with parallax */}
      <div
        ref={bgLayerRef}
        className="absolute inset-0 bg-gradient-radial from-electric-500/20 via-electric-500/5 to-background pointer-events-none"
        style={{ willChange: 'transform' }}
      />

      {/* Animated grid with parallax */}
      <div
        ref={gridRef}
        className="absolute inset-0 bg-[linear-gradient(to_right,#22c55e10_1px,transparent_1px),linear-gradient(to_bottom,#22c55e10_1px,transparent_1px)] bg-[size:6rem_6rem] pointer-events-none"
        style={{ willChange: 'transform' }}
      />

      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}
        />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 mx-auto py-20">
        <div className="max-w-7xl mx-auto">
          {/* Main headline - Agency style large typography */}
          <div ref={titleRef} className="mb-10 space-y-2">
            <h1 className="font-display font-bold tracking-tight leading-[0.9] perspective-1000">
              <div className="hero-title-line text-6xl md:text-8xl lg:text-9xl mb-4 text-foreground">
                {t('hero.title1')}
              </div>
              <div className="hero-title-line text-6xl md:text-8xl lg:text-9xl mb-4 bg-gradient-to-r from-electric-400 via-electric-500 to-electric-600 bg-clip-text text-transparent">
                {t('hero.title2')}
              </div>
            </h1>
          </div>

          {/* Subtitle with proof points */}
          <div ref={subtitleRef} className="mb-16 max-w-4xl">
            <div className="flex flex-wrap gap-6 text-lg md:text-xl text-muted-foreground font-mono mb-8">
              <span className="flex items-center gap-2">
                <span className="dot-live text-electric-500 text-xs leading-none select-none">●</span>
                {t('hero.tag1')}
              </span>
              <span className="flex items-center gap-2">
                <span className="dot-live text-electric-500 text-xs leading-none select-none">●</span>
                {t('hero.tag2')}
              </span>
              <span className="flex items-center gap-2">
                <span className="dot-live text-electric-500 text-xs leading-none select-none">●</span>
                {t('hero.tag3')}
              </span>
              <span className="flex items-center gap-2">
                <span className="dot-live text-electric-500 text-xs leading-none select-none">●</span>
                {t('hero.tag4')}
              </span>
            </div>

            <p className="text-2xl md:text-3xl lg:text-4xl text-muted-foreground font-light leading-relaxed">
              <span className="text-foreground font-medium">{t('hero.experience')}</span>{' '}
              <span className="text-foreground font-medium">{t('hero.promise')}</span>{' '}
              <span className="text-electric-500 font-semibold">{t('hero.action')}</span>
            </p>
          </div>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 items-start mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <Button
              size="lg"
              onClick={() => {
                document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative overflow-hidden bg-transparent border-2 border-electric-500 text-electric-500 font-mono px-10 py-8 text-lg rounded-lg transition-all duration-300 hover:bg-electric-500/10 hover:shadow-[0_0_40px_rgba(34,197,94,0.35),inset_0_0_30px_rgba(34,197,94,0.05)] tracking-widest uppercase phosphor-glow"
            >
              <span className="relative z-10 flex items-center gap-3">
                <span className="opacity-50 font-mono">&gt;_</span>
                {t('hero.ctaPrimary')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={handleSecondaryCta}
              className="group border border-border/50 text-muted-foreground hover:text-electric-500 hover:border-electric-500/50 font-mono px-10 py-8 text-lg rounded-lg transition-all duration-300 hover:bg-electric-500/5 tracking-widest backdrop-blur-sm uppercase"
            >
              <span className="font-mono opacity-40 mr-2 text-sm group-hover:opacity-70 transition-opacity">&lt;/&gt;</span>
              {t('hero.ctaSecondary')}
            </Button>
          </motion.div>

          {/* Feature highlights - glass cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
          >
            {[
              {
                icon: Zap,
                title: t('hero.feature1Title'),
                description: t('hero.feature1Desc')
              },
              {
                icon: Sparkles,
                title: t('hero.feature2Title'),
                description: t('hero.feature2Desc')
              },
              {
                icon: Code2,
                title: t('hero.feature3Title'),
                description: t('hero.feature3Desc')
              }
            ].map((feature, index) => (
              <div
                key={feature.title}
                className="group relative p-8 rounded-3xl bg-card/30 backdrop-blur-md border border-electric-500/20 hover:border-electric-500/50 transition-all duration-500 hover:bg-card/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.1)]"
              >
                <feature.icon className="w-10 h-10 text-electric-500 mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="font-bold text-xl mb-2 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>

                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-electric-500/0 via-electric-500/0 to-electric-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <div className="flex flex-col items-center text-muted-foreground">
          <span className="text-sm mb-3 font-mono tracking-wider">{t('hero.scrollLabel')}</span>
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            <div className="w-[2px] h-16 bg-gradient-to-b from-electric-500 to-transparent" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
