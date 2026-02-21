export const founderProducts = [
  {
    id: 1,
    title: 'ZeLoop',
    role: 'Co-fondateur & Lead Developer',
    year: '2018 — Présent',
    tagline:
      'Réseau social écologique qui récompense les gestes éco-responsables en cryptomonnaie — déployé sous 4 marques distinctes.',
    color: 'green',
    link: 'https://zeloop.net',
    tags: ['Flutter', 'Firebase', 'Blockchain', 'White Label', 'ML'],
    technicalProjects: [
      {
        title: 'White Label Architecture',
        description:
          'Un seul codebase Flutter déployé sous 4 identités visuelles — newBin, StopMego, Cherry et Eau de Paris. Système de thèmes dynamiques et configuration par client.',
        tags: ['Flutter', 'Firebase', 'Theme Engine', 'Marque Blanche'],
        link: null,
      },
      {
        title: 'Reward Engine API',
        description:
          'API REST générique de récompense par cryptomonnaie. 4 blockchains — Ethereum, EOS, Binance Smart Chain et VeChain. Smart contracts en Solidity & C++.',
        tags: ['REST API', 'Solidity', 'C++', 'Ethereum', 'VeChain'],
        link: 'https://spotter.zeloop.net',
      },
      {
        title: 'ZeLoop Spotter',
        description:
          'Application de terrain pour les collecteurs de déchets, intégrée à la blockchain VeChain. Mini-app web Flutter déployée sans store.',
        tags: ['Flutter Web', 'VeChain', 'PWA'],
        link: 'https://spotter.zeloop.net',
      },
    ],
  },
  {
    id: 2,
    title: 'LOVT',
    role: 'Co-fondateur & Product Owner',
    year: '2024 — Présent',
    tagline:
      'Marketplace de services dédiée aux jeunes — 2 000 inscriptions en 1 mois grâce à une stratégie PWA sans passage par les stores.',
    color: 'blue',
    link: 'https://lovt.ca',
    tags: ['Flutter', 'PWA', 'Firebase', 'Analytics', 'Growth'],
    technicalProjects: [
      {
        title: 'Flutter PWA Strategy',
        description:
          'Déploiement en quelques semaines, zéro store. Après optimisation du lazy loading : 3× plus d\'inscriptions tout en réduisant les lectures Firebase sous le seuil du free tier.',
        tags: ['Flutter Web', 'PWA', 'Firebase', 'Lazy Loading'],
        link: 'https://lovt.web.app',
      },
      {
        title: 'pwa_installer',
        description:
          'Librairie Dart open source publiée sur pub.dev. Déclenche nativement le bandeau d\'installation PWA depuis Flutter Web — fonctionnalité absente du framework par défaut.',
        tags: ['Dart', 'pub.dev', 'Open Source', 'v0.2.0'],
        link: 'https://pub.dev/packages/pwa_installer',
      },
    ],
  },
  {
    id: 3,
    title: 'Cogni',
    role: 'Co-fondateur & Lead Developer',
    year: '2023 — Présent',
    tagline:
      'Application compagnon du livre physique "Les Aventures de Cogni" — génère un nombre infini d\'épisodes interactifs avec des énigmes aléatoires.',
    color: 'amber',
    link: 'https://cognibook.com',
    tags: ['Flutter', 'PWA', 'Firebase', 'EdTech'],
    technicalProjects: [
      {
        title: 'Generative Episode Engine',
        description:
          'Moteur de génération d\'épisodes et d\'énigmes aléatoires lié au livre physique. Chaque session offre une expérience unique — le contenu ne s\'épuise jamais.',
        tags: ['Flutter Web', 'Firebase', 'PWA', 'Génératif'],
        link: 'https://cognibook.web.app',
      },
    ],
  },
  {
    id: 4,
    title: 'Hiiba',
    role: 'Co-fondateur & Lead Developer',
    year: '2024 — Présent',
    tagline:
      'Première marketplace de dons d\'objets aux Émirats Arabes Unis — connecte donneurs et receveurs dans une économie circulaire locale.',
    color: 'purple',
    link: 'https://hiiba.ae',
    tags: ['Flutter', 'Firebase', 'Marketplace', 'UAE'],
    technicalProjects: [
      {
        title: 'Flutter Marketplace App',
        description:
          'Application multiplateforme iOS, Android et Web. Gestion des annonces, matching géolocalisé, notifications push et système de messagerie intégré.',
        tags: ['Flutter', 'Firebase', 'iOS', 'Android', 'Géolocalisation'],
        link: 'https://hiiba.ae',
      },
    ],
  },
  {
    id: 5,
    title: 'BarcodeVibe',
    role: 'Solopreneur',
    year: '2025 — En cours',
    tagline:
      'Tracker de prix par scan de code-barres — détecte la shrinkflation en temps réel quand un produit rétrécit sans que son prix baisse.',
    color: 'orange',
    link: null,
    tags: ['Flutter', 'PWA', 'Firebase', 'Barcode'],
    technicalProjects: [
      {
        title: 'Shrinkflation Scanner',
        description:
          'PWA Flutter qui suit l\'historique des prix produit par produit et alerte quand le grammage diminue sans baisse de prix — un problème grand public, sous-détecté.',
        tags: ['Flutter Web', 'Firebase', 'Barcode Scanner', 'PWA'],
        link: null,
      },
    ],
  },
];
