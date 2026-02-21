export const projects = [
  {
    id: 1,
    title: "pwa_installer",
    category: "Web App",
    description:
      "Librairie Flutter open source publiée sur pub.dev. Simplifie le déclenchement du bandeau d'installation PWA depuis Flutter Web — une fonctionnalité non supportée nativement par le framework.",
    image: "/projects/pwa-installer.jpg",
    tags: ["Flutter", "Dart", "PWA", "pub.dev", "Open Source"],
    metrics: {
      version: "v0.2.0",
      platform: "pub.dev",
      type: "Library",
    },
    link: "https://pub.dev/packages/pwa_installer",
    github: "https://github.com/KooliFab",
  },
  {
    id: 2,
    title: "Myride901",
    category: "Mobile",
    description:
      "Application de suivi et d'entretien de véhicules. Lead developer mobile & backend, management d'une équipe de 2 développeurs. Architecture Flutter + backend Laravel PHP sur AWS avec base MySQL.",
    image: "/projects/myride901.jpg",
    tags: ["Flutter", "Laravel PHP", "MySQL", "AWS", "Fastlane"],
    metrics: {
      team: "2 devs",
      active: "2021+",
      infra: "AWS",
    },
    link: "https://www.myride901.com",
    github: null,
  },
  {
    id: 3,
    title: "Hiiba",
    category: "Mobile",
    description:
      "Marketplace de dons d'objets basée aux Émirats Arabes Unis. Co-fondateur, Product Owner & développeur principal. Application Flutter multiplateforme pour connecter donneurs et receveurs dans une économie circulaire.",
    image: "/projects/hiiba.jpg",
    tags: ["Flutter", "Firebase", "Marketplace", "UAE"],
    metrics: {
      role: "Co-founder",
      region: "UAE",
      status: "Beta",
    },
    link: "https://hiiba.ae",
    github: null,
  },
  {
    id: 4,
    title: "BarcodeVibe",
    category: "Mobile",
    description:
      "Application PWA de suivi de prix par scan de code-barres. Détecte la shrinkflation : quand un produit rétrécit sans que son prix baisse. Accessible sans installation via le navigateur.",
    image: "/projects/barcodevibe.jpg",
    tags: ["Flutter", "PWA", "Firebase", "Barcode Scanner"],
    metrics: {
      type: "PWA",
      feature: "Anti-shrink",
      status: "MVP",
    },
    link: "#",
    github: null,
  },
];
