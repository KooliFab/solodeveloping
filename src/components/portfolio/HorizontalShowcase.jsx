import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';

/**
 * Horizontal scrolling project showcase
 * Classic horizontal scroll - scroll horizontally within the section
 */
const HorizontalShowcase = () => {
  const { t, i18n } = useTranslation();
  const scrollContainerRef = useRef(null);
  
  const langPrefix = i18n.language === 'fr' ? '/fr' : '';

  const projects = [
    {
      id: 1,
      title: 'ZeLoop',
      category: 'Social · Eco · Blockchain',
      year: '2018 — Présent',
      description: 'Réseau social écologique qui récompense les gestes éco-responsables en cryptomonnaie. Co-fondateur & lead developer. Déployé en marque blanche pour 4 partenaires — newBin, StopMego, Cherry et Eau de Paris.',
      tags: ['Flutter', 'Firebase', 'Blockchain', 'White Label', 'Machine Learning'],
      color: 'from-green-500 to-emerald-600',
      link: 'https://zeloop.net',
      github: null
    },
    {
      id: 2,
      title: 'LOVT',
      category: 'Marketplace · Jobs',
      year: '2024 — Présent',
      description: 'Marketplace de services dédiée aux jeunes. Co-fondateur & Product Owner. 2 000 inscriptions en 1 mois grâce à une stratégie PWA Flutter — zéro store, déploiement en quelques semaines.',
      tags: ['Flutter', 'PWA', 'Firebase', 'Analytics', 'Growth'],
      color: 'from-blue-500 to-cyan-500',
      link: 'https://lovt.ca',
      github: null
    },
    {
      id: 3,
      title: 'Reward Engine API',
      category: 'Backend · Blockchain',
      year: '2018 — Présent',
      description: 'API REST générique de récompense par cryptomonnaie, le moteur technique derrière ZeLoop. Supporte 4 blockchains — Ethereum, EOS, Binance Smart Chain et VeChain. Smart contracts en Solidity & C++.',
      tags: ['Node.js', 'REST API', 'Solidity', 'C++', 'Ethereum', 'VeChain'],
      color: 'from-purple-500 to-violet-600',
      link: 'https://spotter.zeloop.net',
      github: null
    },
    {
      id: 4,
      title: 'OpenFleet',
      category: 'iOS Native · B2B',
      year: '2018 — 2020',
      description: 'Application iOS de gestion de flotte automobile B2B. Lead developer sur l\'intégration logicielle smartphone / boîtier véhicule. Architecture VIPER modulaire, sécurisation Bluetooth/BLE, déployé en marque blanche pour plusieurs clients entreprises.',
      tags: ['Swift', 'UIKit', 'BLE', 'VIPER', 'Protobuf', 'Realm'],
      color: 'from-orange-500 to-red-500',
      link: 'https://www.openfleet.com',
      github: null
    },
    {
      id: 5,
      title: 'Cogni',
      category: 'EdTech · PWA',
      year: '2023 — Présent',
      description: 'Application compagnon du livre physique "Les Aventures de Cogni". Génère un nombre infini d\'épisodes interactifs avec des énigmes aléatoires. Accessible directement depuis le navigateur — aucune installation requise.',
      tags: ['Flutter', 'PWA', 'Firebase', 'Flutter Web'],
      color: 'from-amber-500 to-yellow-500',
      link: 'https://cognibook.com',
      github: null
    }
  ];

  const scrollBy = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = window.innerWidth * 0.6;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative py-20 bg-background/50">
      {/* Section header */}
      <div className="container mx-auto px-4 mb-12">
        <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold font-display text-foreground/10">
          {t('horizontalShowcase.sectionTitle')}
        </h2>
        <div className="mt-6">
          <h3 className="text-4xl md:text-5xl font-bold font-display mb-4 leading-tight">
            {t('horizontalShowcase.introTitle')}
            <span className="bg-gradient-to-r from-electric-400 to-electric-600 bg-clip-text text-transparent ml-3">
              {t('horizontalShowcase.introTitleHighlight')}
            </span>
          </h3>
          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
            {t('horizontalShowcase.introDescription')}
          </p>
        </div>
      </div>

      {/* Navigation arrows */}
      <div className="container mx-auto px-4 mb-6 flex justify-end gap-3">
        <button
          onClick={() => scrollBy('left')}
          className="p-3 rounded-full border border-electric-500/30 text-electric-500 hover:bg-electric-500/10 transition-all duration-300"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => scrollBy('right')}
          className="p-3 rounded-full border border-electric-500/30 text-electric-500 hover:bg-electric-500/10 transition-all duration-300"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Horizontal scroll container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-8 overflow-x-auto px-4 md:px-8 pb-8 snap-x snap-mandatory scrollbar-thin scrollbar-track-transparent scrollbar-thumb-electric-500/30 hover:scrollbar-thumb-electric-500/50"
        style={{
          scrollbarWidth: 'thin',
          scrollPaddingLeft: '1rem'
        }}
      >
        {/* Project cards */}
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="project-card flex-shrink-0 w-[85vw] md:w-[45vw] md:min-w-[500px] max-w-[600px] group cursor-pointer snap-start"
          >
            <div className="relative h-full min-h-[450px] rounded-3xl overflow-hidden border border-electric-500/20 bg-card/50 backdrop-blur-sm hover:border-electric-500/50 transition-all duration-500 hover:shadow-[0_0_50px_rgba(34,197,94,0.2)]">
              {/* Background gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}
              />

              {/* Grid overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#22c55e08_1px,transparent_1px),linear-gradient(to_bottom,#22c55e08_1px,transparent_1px)] bg-[size:4rem_4rem]" />

              {/* Content */}
              <div className="relative h-full p-8 md:p-10 flex flex-col justify-between">
                {/* Header */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-sm font-mono text-electric-500 uppercase tracking-wider">
                      {project.category}
                    </span>
                    <span className="text-sm font-mono text-muted-foreground">
                      {project.year}
                    </span>
                  </div>

                  <h4 className="text-3xl md:text-4xl font-bold font-display mb-4 group-hover:text-electric-500 transition-colors duration-300">
                    {project.title}
                  </h4>

                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 text-sm bg-electric-500/10 text-electric-500 rounded-full font-mono border border-electric-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center gap-6 mt-6">
                  {project.github && (
                    <a
                      href={project.github}
                      className="flex items-center gap-2 text-foreground hover:text-electric-500 transition-colors group/link"
                    >
                      <Github className="w-5 h-5" />
                      <span className="text-sm font-medium">{t('horizontalShowcase.viewCode')}</span>
                      <ExternalLink className="w-4 h-4 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                    </a>
                  )}
                  <a
                    href={project.link}
                    className="flex items-center gap-2 text-foreground hover:text-electric-500 transition-colors group/link"
                  >
                    <span className="text-sm font-medium">{t('horizontalShowcase.liveDemo')}</span>
                    <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>

                {/* Number indicator */}
                <div className="absolute top-8 right-8 text-7xl font-bold text-electric-500/10 font-display">
                  {String(index + 1).padStart(2, '0')}
                </div>
              </div>

              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-electric-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          </div>
        ))}

        {/* End card - CTA */}
        <div className="flex-shrink-0 w-[85vw] md:w-[40vw] md:min-w-[400px] min-h-[450px] flex flex-col justify-center items-center text-center px-8 snap-start">
          <h3 className="text-4xl md:text-5xl font-bold font-display mb-6">
            {t('horizontalShowcase.ctaTitle')}
            <br />
            <span className="text-electric-500">{t('horizontalShowcase.ctaTitleHighlight')}</span>
          </h3>
          <p className="text-xl text-muted-foreground mb-8 max-w-md">
            {t('horizontalShowcase.ctaDescription')}
          </p>
          <Link 
            to={`${langPrefix}/#contact`}
            className="px-8 py-4 bg-electric-500 hover:bg-electric-600 text-white rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(34,197,94,0.5)]"
          >
            {t('horizontalShowcase.ctaButton')}
          </Link>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="container mx-auto px-4 mt-6 text-muted-foreground font-mono text-sm flex items-center gap-3">
        <span>{t('horizontalShowcase.scrollHint')}</span>
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </section>
  );
};

export default HorizontalShowcase;
