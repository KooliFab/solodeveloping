import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// accent: brand color lightened for legibility on black; glow: brand color bleeding around the scene.
const projects = [
  { key: 'hiiba', title: 'Hiiba', link: 'https://hiiba.ae', stack: 'Flutter · Next.js · Postgres', icon: '/icons/apps/hiiba.png', accent: '#F472B6', glow: '#D6246E' },
  { key: 'spotter', title: 'ZeLoop Spotter', link: 'https://spotter.zeloop.net', stack: 'Flutter Web PWA · VeChain', icon: '/icons/apps/spotter.png', accent: '#D97BE4', glow: '#9C0B9C' },
  { key: 'barcode', title: 'BarcodeVibe', link: 'https://barcodevibe.com', stack: 'Flutter · React · Astro', icon: '/icons/apps/barcodevibe.png', accent: '#FB8A6E', glow: '#E4432D' },
];

// Floating label, styled like the chips on each product's own landing page.
const Pill = ({ children, dot, className = '' }) => (
  <span className={`absolute z-30 inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-white/95 px-3 py-1.5 text-[11px] sm:text-xs font-semibold text-neutral-800 shadow-[0_10px_30px_-8px_rgba(0,0,0,0.35)] ${className}`}>
    <span className="h-2 w-2 rounded-full shrink-0" style={{ background: dot }} aria-hidden="true" />
    {children}
  </span>
);

// Soft inner shade that eases the light scene into the dark page.
const Vignette = () => (
  <div aria-hidden="true" className="absolute inset-0 z-40 rounded-[2rem] pointer-events-none shadow-[inset_0_0_60px_rgba(5,5,10,0.28)]" />
);

const Phone = ({ src, alt, width = 620, height = 1342, className = '', eager = false }) => (
  <div className={`absolute z-20 rounded-[1.6rem] border-[5px] border-neutral-900 bg-neutral-900 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.55)] ${className}`}>
    <img src={src} width={width} height={height} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" className="block w-full aspect-[9/19] object-cover object-top rounded-[1.25rem]" />
  </div>
);

// Each project is shown inside its own brand world: palette, imagery and
// product vocabulary taken from the product's landing page.
const ProjectVisual = ({ project, t }) => {
  const tags = t(`showcase.${project}.tags`, { returnObjects: true });
  const tag = (i) => (Array.isArray(tags) ? tags[i] : '');
  const scene = 'relative z-10 w-full aspect-[5/4] overflow-hidden rounded-[2rem] ring-1 ring-white/10 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)]';

  if (project === 'hiiba') {
    // Giving: two people handing over a lamp, the app on top.
    return (
      <div className={`${scene} bg-[#FDF2F7]`}>
        <img src="/images/projects/hiiba-giving.webp" width="1000" height="750" loading="eager" decoding="async" alt={t('showcase.hiiba.photoAlt')} className="absolute inset-0 h-full w-full object-cover object-[35%_center]" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#D6246E]/45 via-transparent to-transparent" />
        <Phone src="/images/projects/hiiba-app.webp" alt={t('showcase.hiiba.alt')} eager className="right-[4%] top-[46%] w-[24%] rotate-[6deg]" />
        <Pill dot="#D6246E" className="left-[5%] top-[7%]">{tag(0)}</Pill>
        <Pill dot="#22c55e" className="left-[5%] bottom-[8%]">{tag(1)}</Pill>
        <Vignette />
      </div>
    );
  }

  if (project === 'spotter') {
    // Recycling: brand purple, an illustrated bottle drop and the Spotter dashboard.
    return (
      <div className={`${scene} bg-gradient-to-br from-[#FBF4FC] to-[#EBD2F1]`}>
        <div aria-hidden="true" className="absolute -left-[12%] -bottom-[25%] h-[85%] aspect-square rounded-full bg-[#9C0B9C]/15" />
        <div aria-hidden="true" className="absolute right-[8%] -top-[20%] h-[55%] aspect-square rounded-full bg-[#9C0B9C]/10" />
        <img src="/images/projects/zeloop-recycle.webp" width="395" height="408" loading="lazy" decoding="async" alt="" className="absolute left-[5%] bottom-[4%] w-[46%] z-10" />
        <Phone src="/images/projects/spotter-dashboard.webp" width={620} height={1343} alt={t('showcase.spotter.alt')} className="right-[8%] top-[8%] w-[30%] -rotate-[4deg]" />
        <Pill dot="#9C0B9C" className="left-[6%] top-[9%]">{tag(0)}</Pill>
        <Pill dot="#22c55e" className="right-[5%] bottom-[9%]">{tag(1)}</Pill>
        <Vignette />
      </div>
    );
  }

  // Groceries & savings: cream canvas, grocery illustrations, price chips.
  return (
    <div className={`${scene} bg-[#FBF3EE]`}>
      <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-[80%] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E4432D]/10 blur-2xl" />
      <img src="/images/projects/barcodevibe-tote.webp" width="512" height="512" loading="lazy" decoding="async" alt="" className="absolute right-[3%] top-[6%] w-[30%] rotate-[6deg] mix-blend-multiply" />
      <img src="/images/projects/barcodevibe-best-price.webp" width="512" height="512" loading="lazy" decoding="async" alt="" className="absolute left-[2%] bottom-[2%] w-[32%] -rotate-[4deg] rounded-2xl mix-blend-multiply" />
      <Phone src="/images/projects/barcodevibe-feed.webp" alt={t('showcase.barcode.alt')} className="left-1/2 top-[8%] w-[31%] -translate-x-1/2" />
      <Pill dot="#E4432D" className="left-[4%] top-[12%]">{tag(0)}</Pill>
      <Pill dot="#F59E0B" className="right-[4%] top-[58%]">{tag(1)}</Pill>
      <Pill dot="#8B5CF6" className="right-[8%] bottom-[8%]">{tag(2)}</Pill>
      <Vignette />
    </div>
  );
};

const SelectedWork = () => {
  const { t } = useTranslation();

  return (
    <section id="products" aria-labelledby="selected-work-title" className="relative bg-background scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <h2 id="selected-work-title" className="sr-only">{t('showcase.title')}</h2>
        {projects.map((project, index) => (
          <article key={project.key} className={`grid items-center gap-10 lg:gap-16 border-t border-white/10 py-12 md:py-12 ${index === 1 ? 'md:grid-cols-[1.2fr_1fr]' : index === 2 ? 'md:grid-cols-[1fr_1.15fr]' : 'md:grid-cols-2'}`}>
            <div className={index === 1 ? 'md:col-start-2 md:row-start-1' : ''}>
              <div className="flex items-center gap-3 mb-5">
                <img src={project.icon} width="40" height="40" alt="" loading="lazy" decoding="async" className="h-10 w-10 rounded-xl bg-white object-cover" style={{ boxShadow: `0 6px 24px -6px ${project.glow}` }} />
                <p className="font-mono text-xs tracking-[0.16em] uppercase" style={{ color: project.accent }}>
                  {String(index + 1).padStart(2, '0')} / {t(`showcase.${project.key}.meta`)}
                </p>
              </div>
              <h3 className={`font-display font-bold tracking-tight text-4xl sm:text-5xl lg:text-[80px] leading-[1.05] mb-5 ${project.key === 'spotter' ? 'max-w-[380px]' : project.key === 'barcode' ? 'md:text-[36px] lg:text-[48px] xl:text-[64px]' : ''}`}>{project.title}</h3>
              <p className="text-lg lg:text-[28px] text-muted-foreground leading-relaxed max-w-md">{t(`showcase.${project.key}.description`)}</p>
              <div className="w-10 h-px my-6" style={{ background: project.accent }} aria-hidden="true" />
              {project.key === 'hiiba' && (
                <div className="text-base lg:text-xl text-muted-foreground mb-4 leading-relaxed">
                  <p className="mb-3">{t('showcase.hiiba.role')}</p>
                  <p className="font-semibold text-foreground">{t('showcase.hiiba.scopeTitle')}</p>
                  <p>{t('showcase.hiiba.scope')}</p>
                </div>
              )}
              {project.key === 'barcode' && <p className="text-base lg:text-xl text-muted-foreground mb-2">{t('showcase.barcode.scope')}</p>}
              <p className="text-base lg:text-xl text-muted-foreground">{project.stack}</p>
              <a href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`${t('showcase.discover')} — ${project.title}`} className="inline-flex items-center gap-3 text-base lg:text-xl font-medium mt-7 hover:brightness-125 transition" style={{ color: project.accent }}>
                {t('showcase.discover')}<ArrowRight className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
            <div className={`relative ${index === 1 ? 'md:col-start-1 md:row-start-1' : ''}`}>
              {/* Brand glow spilling onto the black page, so the light scene doesn't sit on it like a sticker. */}
              <div aria-hidden="true" className="absolute inset-[2%] rounded-[2rem] opacity-70 blur-[50px] pointer-events-none" style={{ background: project.glow }} />
              <div aria-hidden="true" className="absolute -inset-[15%] rounded-full opacity-25 blur-[100px] pointer-events-none" style={{ background: project.glow }} />
              <ProjectVisual project={project.key} t={t} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default SelectedWork;
