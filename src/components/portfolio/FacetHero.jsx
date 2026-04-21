import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const shouldEnableHeroAnimations = () => {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
  return hasFinePointer && window.innerWidth >= 768;
};

/**
 * Hero section for facet service pages (/fullstack, /mobile-developer, /ai-developer).
 * Mirrors the main Hero visually (parallax, GSAP text reveals, feature cards)
 * but reads all content from the facet's i18n prefix and uses the facet accent color.
 */
const FacetHero = ({ facet }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const bgLayerRef = useRef(null);
  const gridRef = useRef(null);

  const prefix = facet.i18nPrefix;
  const accent = facet.accentColor;

  const tags = t(`${prefix}.hero.tags`, { returnObjects: true }) || [];
  const features = t(`${prefix}.hero.features`, { returnObjects: true }) || [];

  const handleSecondaryCta = () => {
    const currentLang = i18n.language;
    const langPrefix = currentLang === 'fr' ? '/fr' : '';
    navigate(`${langPrefix}/about#recommendations`);
  };

  useEffect(() => {
    if (!shouldEnableHeroAnimations()) return undefined;

    let isCancelled = false;
    let animationContext;

    const initAnimations = async () => {
      const [{ default: gsap }, { ScrollTrigger }, { splitTextAdvanced }] =
        await Promise.all([
          import('gsap'),
          import('gsap/ScrollTrigger'),
          import('@/utils/textSplit'),
        ]);

      if (isCancelled || !heroRef.current) return;

      gsap.registerPlugin(ScrollTrigger);

      animationContext = gsap.context(() => {
        const tl = gsap.timeline({
          defaults: { ease: 'power4.out' },
          delay: 0.2,
        });

        const titleElements = titleRef.current?.querySelectorAll('.hero-title-line');

        titleElements?.forEach((line, index) => {
          const isGradientLine = line.classList.contains('facet-gradient-line');

          if (isGradientLine) {
            tl.fromTo(
              line,
              { opacity: 0, y: 60 },
              { opacity: 1, y: 0, duration: 1, ease: 'power4.out' },
              index * 0.3
            );
          } else {
            const split = splitTextAdvanced(line);
            tl.fromTo(
              split.chars,
              { opacity: 0, y: 120, rotateX: -90, transformOrigin: '50% 100%' },
              { opacity: 1, y: 0, rotateX: 0, duration: 1.2, stagger: 0.03, ease: 'power4.out' },
              index * 0.3
            );
          }
        });

        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1 },
          '-=0.6'
        );

        gsap.to(bgLayerRef.current, {
          y: () => window.innerHeight * 0.3,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });

        gsap.to(gridRef.current, {
          y: () => window.innerHeight * 0.15,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });

        gsap.to(heroRef.current, {
          opacity: 0.4,
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }, heroRef);
    };

    initAnimations();

    return () => {
      isCancelled = true;
      if (animationContext) {
        animationContext.revert();
      }
    };
  }, []);

  return (
    <section
      id="about"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Gradient background with parallax — accent color per facet */}
      <div
        ref={bgLayerRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, ${accent}33 0%, ${accent}0d 40%, transparent 70%)`,
          willChange: 'transform',
        }}
      />

      {/* Animated grid with parallax */}
      <div
        ref={gridRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, ${accent}10 1px, transparent 1px), linear-gradient(to bottom, ${accent}10 1px, transparent 1px)`,
          backgroundSize: '6rem 6rem',
          willChange: 'transform',
        }}
      />

      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
          }}
        />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 mx-auto py-20">
        <div className="max-w-7xl mx-auto">

          {/* Main headline */}
          <div ref={titleRef} className="mb-10 space-y-2">
            <h1 className="font-display font-bold tracking-tight leading-[0.9] perspective-1000">
              <div className="hero-title-line text-6xl md:text-8xl lg:text-9xl mb-4 text-foreground">
                {t(`${prefix}.hero.title1`)}
              </div>
              <div
                className="hero-title-line facet-gradient-line text-6xl md:text-8xl lg:text-9xl mb-4 bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(to right, ${accent}cc, ${accent}, ${accent}cc)`,
                }}
              >
                {t(`${prefix}.hero.title2`)}
              </div>
            </h1>
          </div>

          {/* Subtitle with proof points */}
          <div ref={subtitleRef} className="mb-16 max-w-4xl">
            <div className="flex flex-wrap gap-6 text-lg md:text-xl text-muted-foreground font-mono mb-8">
              {Array.isArray(tags) && tags.map((tag) => (
                <span key={tag} className="flex items-center gap-2">
                  <span className="dot-live text-xs leading-none select-none" style={{ color: accent }}>●</span>
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-2xl md:text-3xl lg:text-4xl text-muted-foreground font-light leading-relaxed">
              <span className="text-foreground font-medium">{t(`${prefix}.hero.experience`)}</span>{' '}
              <span className="text-foreground font-medium">{t(`${prefix}.hero.promise`)}</span>{' '}
              <span className="font-semibold" style={{ color: accent }}>{t(`${prefix}.hero.action`)}</span>
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-6 items-start mb-20">
            <Button
              size="lg"
              onClick={() => {
                document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative overflow-hidden bg-transparent font-mono px-10 py-8 text-lg rounded-lg transition-all duration-300 tracking-widest uppercase"
              style={{
                border: `2px solid ${accent}`,
                color: accent,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `${accent}1a`;
                e.currentTarget.style.boxShadow = `0 0 40px ${accent}59, inset 0 0 30px ${accent}0d`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <span className="relative z-10 flex items-center gap-3">
                <span className="opacity-50 font-mono">&gt;_</span>
                {t(`${prefix}.hero.ctaPrimary`)}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={handleSecondaryCta}
              className="group border border-border/50 text-muted-foreground font-mono px-10 py-8 text-lg rounded-lg transition-all duration-300 backdrop-blur-sm tracking-widest uppercase"
              onMouseEnter={(e) => {
                e.currentTarget.style.color = accent;
                e.currentTarget.style.borderColor = `${accent}80`;
                e.currentTarget.style.background = `${accent}0d`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '';
                e.currentTarget.style.borderColor = '';
                e.currentTarget.style.background = '';
              }}
            >
              <span className="font-mono opacity-40 mr-2 text-sm group-hover:opacity-70 transition-opacity">&lt;/&gt;</span>
              {t(`${prefix}.hero.ctaSecondary`)}
            </Button>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
            {Array.isArray(features) && features.map((feature) => (
              <div
                key={feature.title}
                className="group relative p-8 rounded-3xl bg-card/30 backdrop-blur-md transition-all duration-500 hover:bg-card/50"
                style={{
                  border: `1px solid ${accent}33`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${accent}80`;
                  e.currentTarget.style.boxShadow = `0 0 30px ${accent}1a`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `${accent}33`;
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 font-bold font-mono text-sm group-hover:scale-110 transition-transform duration-300"
                  style={{ background: `${accent}1a`, color: accent, border: `1px solid ${accent}33` }}
                >
                  {feature.icon || '//'}
                </div>
                <h3 className="font-bold text-xl mb-2 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>

                {/* Glow effect on hover */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `linear-gradient(to bottom right, transparent, ${accent}0d)` }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center text-muted-foreground">
          <span className="text-sm mb-3 font-mono tracking-wider">SCROLL</span>
          <div className="scroll-down">
            <div className="w-[2px] h-16 bg-gradient-to-b to-transparent" style={{ backgroundImage: `linear-gradient(to bottom, ${accent}, transparent)` }} />
          </div>
        </div>
      </div>
    </section>
  );
};

FacetHero.propTypes = {
  facet: PropTypes.shape({
    i18nPrefix: PropTypes.string.isRequired,
    accentColor: PropTypes.string.isRequired,
  }).isRequired,
};

export default FacetHero;
