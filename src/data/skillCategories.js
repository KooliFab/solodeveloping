// Each app gets a gradient-based icon (iOS style)
// gradFrom → gradTo define the gradient

export const skillCategories = [
  {
    id: 'mobile',
    label: 'Applications Mobile',
    meta: '7 ans · 10 apps',
    colSpan: 2, // wide cell in bento grid
    accentColor: '#22c55e',
    apps: [
      { name: 'ZeLoop',      initial: 'Z',  gradFrom: '#16a34a', gradTo: '#15803d', link: 'https://zeloop.net' },
      { name: 'LOVT',        initial: 'L',  gradFrom: '#2563eb', gradTo: '#1d4ed8', link: 'https://lovt.ca' },
      { name: 'Cogni',       initial: 'C',  gradFrom: '#d97706', gradTo: '#b45309', link: 'https://cognibook.com' },
      { name: 'Hiiba',       initial: 'H',  gradFrom: '#7c3aed', gradTo: '#6d28d9', link: 'https://hiiba.ae' },
      { name: 'BarcodeVibe', initial: 'B',  gradFrom: '#ea580c', gradTo: '#c2410c', link: null },
      { name: 'Myride901',   initial: 'M',  gradFrom: '#0284c7', gradTo: '#0369a1', link: 'https://www.myride901.com' },
      { name: 'OpenFleet',   initial: 'OF', gradFrom: '#dc2626', gradTo: '#b91c1c', link: 'https://www.openfleet.com' },
      { name: 'Koolicar',    initial: 'K',  gradFrom: '#0f766e', gradTo: '#0d6c64', link: 'https://www.youtube.com/c/koolicar/videos' },
      { name: 'Stepchain',   initial: 'S',  gradFrom: '#059669', gradTo: '#047857', link: 'https://www.stepchain.io' },
      { name: 'RecharjMe',   initial: 'R',  gradFrom: '#db2777', gradTo: '#be185d', link: 'https://recharjme.com' },
    ],
  },
  {
    id: 'web',
    label: 'Web & PWA',
    meta: '5 ans · 8 apps',
    colSpan: 1,
    accentColor: '#3b82f6',
    apps: [
      { name: 'LOVT',          initial: 'L',  gradFrom: '#2563eb', gradTo: '#1d4ed8', link: 'https://lovt.web.app' },
      { name: 'Cogni',         initial: 'C',  gradFrom: '#d97706', gradTo: '#b45309', link: 'https://cognibook.web.app' },
      { name: 'Spotter',       initial: 'Sp', gradFrom: '#16a34a', gradTo: '#15803d', link: 'https://spotter.zeloop.net' },
      { name: 'BarcodeVibe',   initial: 'B',  gradFrom: '#ea580c', gradTo: '#c2410c', link: null },
      { name: 'Onboarding x5', initial: '×5', gradFrom: '#64748b', gradTo: '#475569', link: 'https://pif-onboarding.web.app' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend & API',
    meta: 'Node.js · PHP · Flask',
    colSpan: 1,
    accentColor: '#8b5cf6',
    apps: [
      { name: 'Reward Engine', initial: 'RE', gradFrom: '#8b5cf6', gradTo: '#7c3aed', link: 'https://spotter.zeloop.net' },
      { name: 'Myride901',     initial: 'M',  gradFrom: '#0284c7', gradTo: '#0369a1', link: 'https://www.myride901.com' },
      { name: 'Stepchain',     initial: 'S',  gradFrom: '#059669', gradTo: '#047857', link: 'https://www.stepchain.io' },
      { name: 'RecharjMe',     initial: 'R',  gradFrom: '#db2777', gradTo: '#be185d', link: 'https://recharjme.com' },
    ],
  },
  {
    id: 'blockchain',
    label: 'Blockchain',
    meta: 'ETH · EOS · BSC · VeChain',
    colSpan: 1,
    accentColor: '#f59e0b',
    apps: [
      { name: 'ZeLoop',   initial: 'Z',  gradFrom: '#f59e0b', gradTo: '#d97706', link: 'https://zeloop.net' },
      { name: 'Reward E.', initial: 'RE', gradFrom: '#8b5cf6', gradTo: '#7c3aed', link: 'https://spotter.zeloop.net' },
      { name: 'Spotter',  initial: 'Sp', gradFrom: '#16a34a', gradTo: '#15803d', link: 'https://spotter.zeloop.net' },
      { name: 'Stepchain', initial: 'S', gradFrom: '#059669', gradTo: '#047857', link: 'https://www.stepchain.io' },
    ],
  },
  {
    id: 'opensource',
    label: 'Open Source',
    meta: 'pub.dev · Dart',
    colSpan: 1,
    accentColor: '#6366f1',
    apps: [
      { name: 'pwa_installer', initial: 'P', gradFrom: '#6366f1', gradTo: '#4f46e5', link: 'https://pub.dev/packages/pwa_installer' },
    ],
  },
];
