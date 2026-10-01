import { Link } from 'react-router-dom';
import { ArrowRight, Github, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t, i18n } = useTranslation();
  const prefix = i18n.resolvedLanguage === 'fr' ? '/fr' : '';
  const scrollToSection = (event) => {
    const target = document.getElementById(event.currentTarget.hash.slice(1));
    if (!target) return;
    event.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 96;
    if (window.lenis) {
      window.lenis.scrollTo(top);
    } else {
      window.scrollTo({ top, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    }
  };

  return (
    <section id="about" className="relative overflow-hidden bg-background pt-36 pb-12 md:pt-44 md:pb-12">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#22c55e0b_1px,transparent_1px),linear-gradient(to_bottom,#22c55e0b_1px,transparent_1px)] bg-[size:6rem_6rem]" />
      <div aria-hidden="true" className="absolute -top-40 -left-40 h-[640px] w-[900px] rounded-full bg-[radial-gradient(closest-side,rgba(34,197,94,0.14),transparent)] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 md:px-8">
        <p className="font-mono text-electric-500 text-xs md:text-sm tracking-[0.2em] uppercase mb-7">
          {t('showcase.hero.eyebrow')}
        </p>
        <h1 className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-[112px] tracking-tight leading-[1.02]">
          <span className="block">{t('showcase.hero.title1')}</span>
          <span className="block text-electric-500">{t('showcase.hero.title2')}</span>
        </h1>
        <p className="max-w-3xl text-lg md:text-xl lg:text-[26px] text-muted-foreground leading-relaxed mt-6">
          {t('showcase.hero.description')}
        </p>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-6 mt-8">
          <a href="#products" onClick={scrollToSection} className="inline-flex items-center gap-3 rounded-xl bg-electric-500 px-6 py-4 font-semibold text-black hover:bg-electric-400 transition-colors">
            {t('showcase.hero.work')}<ArrowRight className="h-5 w-5" aria-hidden="true" />
          </a>
          <a href="#contact" onClick={scrollToSection} className="inline-flex items-center gap-2 text-sm hover:text-electric-500 transition-colors">
            {t('showcase.hero.contact')}<ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <div className="flex flex-wrap items-center gap-6 lg:ml-auto">
            <Link to={`${prefix}/about#recommendations`} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-electric-500 transition-colors">
              <MessageCircle className="h-4 w-4" aria-hidden="true" />{t('showcase.hero.recommendations')}
            </Link>
            <a href="https://github.com/KooliFab" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-electric-500 transition-colors">
              <Github className="h-4 w-4" aria-hidden="true" />GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
