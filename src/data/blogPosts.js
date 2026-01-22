export const blogPosts = [
  {
    id: "progressive-web-app-with-flutter",
    slug: "progressive-web-app-with-flutter",
    title: {
      en: "Progressive Web App with Flutter: launch your applications quickly 🚀",
      fr: "Progressive Web Apps avec Flutter : pour lancer vos applications rapidement 🚀",
    },
    subtitle: {
      en: "Is there then a solution to shorten or eliminate steps?",
      fr: "Existe-t-il alors une solution pour raccourcir ou supprimer des étapes ?",
    },
    date: "2024-05-20", // Approximated date based on context or use current date
    author: "Fabien Chung",
    coverImage: "/images/blog/pwa-flutter/hero.jpg",
    content: {
      en: `
For a long time, I’ve set myself the challenge of launching mobile application projects faster by reducing the constraints that typically slow down the process.

The first constraint to overcome was developing for multiple platforms simultaneously. Flutter solved this by allowing me to work on a single codebase to create applications that work equally well on iOS and Android, significantly reducing development time.

Once development is completed, the second constraint that arises is publishing on Apple and Google stores. This process requires purchasing a license, submitting the application to their servers, preparing graphic elements and descriptions, then waiting for validation to finally be visible and downloadable by users. Even though verification and validation processes have been reduced, this doesn’t eliminate the entire deployment process for each application update.

![Multi-platform development](/images/blog/pwa-flutter/multi-platform.png)

These steps become particularly constraining when trying to quickly offer a testable version and efficiently iterate with our first users. By adding up development time, distribution time, and all external factors related to launching such as communication and marketing, we quickly see weeks, if not months, accumulate before really reaching our target audience.

**Is there then a solution to shorten or eliminate steps?**

The answer lies in PWAs (Progressive Web Apps), a technology that has been around for about a decade. PWAs allow access to an application directly from a web browser without going through the stores. Companies like Facebook and Google have long adopted this approach for their services. The goal is simple: offer universal access to users, regardless of their device. A PWA is essentially a website that looks and behaves like a mobile application.

![PWA Diagram](/images/blog/pwa-flutter/pwa_diagram.png)

Traditionally, PWA development required web development skills. The technologies typically used were React, Angular, or other frameworks like Next.js or Nuxt.js.

As a mobile platform specialist, I had never taken the leap until recently. Flutter’s constant evolution and its active community have enabled complete support for the web (in addition to iOS and Android) and therefore the possibility of creating PWAs. This was perfect for me as I already master this framework.

**What about user experience?**

Questions about user experience quality had already emerged when comparing native development to cross-platform development. What about for an application running from a web browser? Unsurprisingly, a PWA cannot completely replace a native application in terms of user experience.

Nevertheless, once installed on the home screen, the browser’s address bar completely disappears and the application offers a much more immersive experience than most users would be able to distinguish from a native app. Flutter Web allows us to preserve a large part of the visual experience, and animations generally remain fluid thanks to Material and Cupertino widgets that faithfully reproduce the characteristic designs of iOS and Android.

![PWA Demo](/images/blog/pwa-flutter/pwa_demo.gif)

Even if installation can be complicated, the application remains functional from the browser, although the experience is slightly degraded. The goal here is not to offer the perfect experience, but rather to be quickly available to as many people as possible while offering an experience close enough to satisfy our users.

**Technical constraints**

The web environment imposes certain unavoidable constraints compared to native applications.

First, the execution model fundamentally differs: a native application communicates directly with the operating system, while a PWA operates through a browser, adding a layer of abstraction that can affect performance.

Next, despite constant progress in web APIs, access to system functionalities remains more limited than in native. Browsers also impose strict restrictions on resource usage, which can compromise the performance of complex applications.

Finally, elaborate animations and sophisticated touch interactions may lose fluidity, particularly on devices with limited resources.

![Performance](/images/blog/pwa-flutter/performance.png)

Of course, some differences persist. Performance can fluctuate depending on the browser used and the device’s power, and typographic rendering doesn’t always match the precision obtained in native.

These constraints must be taken into account from the application’s design stage, but they don’t constitute an insurmountable obstacle for most use cases. The key is to adapt your interface and functionality to the capabilities of the web platform while taking advantage of its specific benefits.

**Development has been facilitated**

The Flutter community has done tremendous work to manage application execution in the web environment. From a technical standpoint, the Flutter source code, written in Dart, is compiled and optimized for JavaScript. Then a script initializes the Dart runtime environment and loads the application. Images, fonts, and other resources are optimized and packaged to be efficiently loaded in the browser.

![Architecture](/images/blog/pwa-flutter/architecture.png)

All of this occurs behind the scenes. The developer can focus on the code they already master! Then, to make their application available, deployment is incredibly simple:

1. Fill out the \`manifest.json\` file that corresponds to the app’s presentation elements

\`\`\`json
{
    "name": "LOVT",
    "short_name": "LOVT",
    "start_url": ".",
    "display": "standalone",
    "background_color": "#0175C2",
    "theme_color": "#0175C2",
    "description": "LOVT is the new app to find a job dedicated for youngs",
    "orientation": "portrait-primary",
    "prefer_related_applications": true,
    "icons": [
        {
            "src": "icons/Icon-192.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "any"
        },
        {
            "src": "icons/Icon-512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "any"
        },
        {
            "src": "icons/Icon-maskable-192.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "maskable"
        },
        {
            "src": "icons/Icon-maskable-512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable"
        }
    ],
    "screenshots": [
        {
            "src": "/images/narrow.png",
            "type": "image/png",
            "sizes": "400x780",
            "form_factor": "narrow",
            "label": "Application"
        },
        {
            "src": "/images/wide.png",
            "type": "image/png",
            "sizes": "400x375",
            "form_factor": "wide",
            "label": "Application"
        }
    ]
}
\`\`\`

2. Generate web files

\`\`\`bash
flutter build web --release --web-renderer html
\`\`\`

3. Configure deployment on the hosting platform (Firebase Hosting for us) by pointing to the generated web files

\`\`\`json
{
  "hosting": {
    "public": "build/web",
    "site": "lovt",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "**",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "no-cache, no-store, must-revalidate"
          }
        ]
      }
    ]
  }
}
\`\`\`

4. Deploy to the server

\`\`\`bash
firebase deploy
\`\`\`

![Deployment](/images/blog/pwa-flutter/deployment.jpg)

And that’s it! No submission to stores, no waiting for approval. For updates, it’s even simpler: just redeploy the files, and users will have the new version on their next visit (or the next page refresh).

**Goal achieved?**

Using the PWA approach with Flutter enabled me to launch the LOVT application in record time. From the initial phase of feature specification to public deployment, the project only required a few weeks — a timeframe that would have been unthinkable with the traditional development and validation cycle of native applications.

![Workflow](/images/blog/pwa-flutter/workflow.png)

This rapid execution provided a significant strategic advantage: the ability to test our concept in the real market without massive investment in time and resources. We were thus able to adopt a truly agile approach, collecting feedback from early users, identifying areas for improvement, and deploying fixes sometimes within just a few hours.

After several weeks of real-world usage, here is a detailed analysis of the advantages and disadvantages I’ve been able to observe with our Flutter PWA:

**Ultra-fast deployment cycle**
Updates can be deployed in minutes, without waiting for store validation. This responsiveness allowed us to fix critical bugs and improve the user experience almost instantly. For a concrete example, we identified a registration issue related to TikTok and Facebook at 6 PM and deployed the fix before 8 PM the same day.

**Financial and operational savings**
The absence of license fees ($99/year for Apple, $25 for Google) may seem anecdotal, but it’s especially the saving of resources related to preparing store submissions that proved significant.

**Extremely simplified distribution**
Sharing the application via a simple URL (https://lovt.web.app) proved to be very effective for virality. Combined with a QR code, we were able to facilitate account creation and application use during our organized events.

**Universal accessibility**
Simultaneous availability on iOS and Android without distinction allowed us to reach a wider audience.

**Absence from official stores**
In a word-of-mouth context, we found that new users naturally looked for the application on the App Store or Play Store before realizing it was accessible only via the web. We estimate that this absence from official distribution platforms represents a loss of organic acquisition of about 15% compared to a traditional application.

**Installation friction**
Our statistics show that only 23% of regular users have actually “installed” the application, others using it directly via the browser.

**Technical limitations of native APIs**
Permission management proved to be problematic in certain contexts. Browsers can sometimes malfunction depending on user actions, preventing the use of certain essential functionalities like camera or geolocation.

![Permissions](/images/blog/pwa-flutter/permissions.png)

**PWA with Flutter: an alternative that has proven itself**
In terms of execution speed, I haven’t found anything better than developing PWAs to launch apps quickly. It opens a new path for those who want to quickly test their ideas.

A PWA is perfect for testing your concept and refining your product. Once your idea is validated and your product is stable, you can migrate to a more traditional process. This mixed approach allows you to enjoy the best of both worlds: the initial speed of PWAs and the rich experience of native applications when your project is more mature.
      `,
      fr: `
Depuis longtemps, je me suis fixé comme défi de lancer des projets d’applications mobiles plus rapidement en réduisant les contraintes qui ralentissent habituellement le processus.

La première contrainte à surmonter était le développement pour plusieurs plateformes en même temps. Flutter a résolu cela en me permettant de travailler sur une seule base de code pour créer des applications qui fonctionnent aussi bien sur iOS que sur Android, réduisant ainsi considérablement le temps de développement.

Une fois le développement terminé, la deuxième contrainte qui survient est la publication sur les stores d’Apple et de Google. Ce processus exige l’achat d’une licence, l’envoi de l’application sur leurs serveurs, la préparation des éléments graphiques et des descriptions, puis l’attente d’une validation pour enfin être visible et téléchargeable par les utilisateurs.

![Multi-platform development](/images/blog/pwa-flutter/multi-platform.png)

Ces étapes deviennent particulièrement contraignantes lorsqu’on cherche à proposer rapidement une version testable et à itérer efficacement avec nos premiers utilisateurs. En additionnant le temps de développement, de diffusion et tous les facteurs externes liés au lancement comme la communication et le marketing, on voit rapidement s’accumuler les semaines, voire les mois, avant de toucher réellement son public cible.

**Existe-t-il alors une solution pour raccourcir ou supprimer des étapes ?**

La réponse se trouve dans les PWA (Progressive Web Apps), une technologie qui existe depuis une bonne dizaine d’années maintenant. Les PWA permettent d’accéder à une application directement depuis un navigateur web, sans passer par les stores. L’objectif est simple : offrir un accès universel aux utilisateurs, quel que soit leur appareil.

![PWA Diagram](/images/blog/pwa-flutter/pwa_diagram.png)

Traditionnellement, le développement de PWA nécessitait des compétences en développement web (React, Angular, Next.js...). En tant que spécialiste des plateformes mobiles, je n’avais donc jamais franchi le cap jusqu’à récemment. La constante évolution de Flutter a permis la prise en charge complète du web, ce qui était parfait pour moi qui maîtrise déjà ce framework.

**L’expérience utilisateur impactée ?**

Une PWA ne peut remplacer complètement une application native en termes d’expérience utilisateur. Cependant, une fois installée sur l’écran d’accueil, la barre d’adresse du navigateur disparaît complètement et l’application offre une expérience immersive. Flutter Web nous permet de préserver une grande partie de l’expérience visuelle et les animations restent généralement fluides.

![PWA Demo](/images/blog/pwa-flutter/pwa_demo.gif)

L’objectif ici n’est pas d’offrir l’expérience parfaite, mais plutôt d’être disponible rapidement pour un maximum de personnes tout en proposant une expérience suffisamment proche pour satisfaire nos utilisateurs.

**Des contraintes techniques fondamentales**

L’environnement web impose certaines contraintes : le modèle d’exécution via navigateur peut affecter les performances (couche d’abstraction), et l’accès aux fonctionnalités système (caméra, localisation) reste plus limité qu’en natif.

![Performance](/images/blog/pwa-flutter/performance.png)

Ces contraintes doivent être prises en compte dès la conception, mais elles ne constituent pas un obstacle insurmontable pour la plupart des cas d’utilisation.

**Simplification du développement**

Le code source Flutter (Dart) est compilé et optimisé vers JavaScript en arrière-plan. Le déploiement est incroyablement simple :

![Architecture](/images/blog/pwa-flutter/architecture.png)

1. Renseigner le fichier \`manifest.json\`

\`\`\`json
{
    "name": "LOVT",
    "short_name": "LOVT",
    "start_url": ".",
    "display": "standalone",
    "background_color": "#0175C2",
    "theme_color": "#0175C2",
    "description": "LOVT is the new app to find a job dedicated for youngs",
    "orientation": "portrait-primary",
    "prefer_related_applications": true,
    "icons": [
        {
            "src": "icons/Icon-192.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "any"
        },
        {
            "src": "icons/Icon-512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "any"
        },
        {
            "src": "icons/Icon-maskable-192.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "maskable"
        },
        {
            "src": "icons/Icon-maskable-512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable"
        }
    ],
    "screenshots": [
        {
            "src": "/images/narrow.png",
            "type": "image/png",
            "sizes": "400x780",
            "form_factor": "narrow",
            "label": "Application"
        },
        {
            "src": "/images/wide.png",
            "type": "image/png",
            "sizes": "400x375",
            "form_factor": "wide",
            "label": "Application"
        }
    ]
}
\`\`\`

2. Générer les fichiers web

\`\`\`bash
flutter build web --release --web-renderer html
\`\`\`

3. Configurer le déploiement (Firebase Hosting)

\`\`\`json
{
  "hosting": {
    "public": "build/web",
    "site": "lovt",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "**",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "no-cache, no-store, must-revalidate"
          }
        ]
      }
    ]
  }
}
\`\`\`

4. Déployer

\`\`\`bash
firebase deploy
\`\`\`

![Deployment](/images/blog/pwa-flutter/deployment.jpg)

Pas de soumission aux stores, pas d’attente d’approbation.

**Objectif atteint ?**

L’approche PWA avec Flutter m’a permis de lancer l’application LOVT en un temps record (quelques semaines). Cette rapidité nous a offert un avantage stratégique : tester notre concept sur le marché réel sans investissement massif.

![Workflow](/images/blog/pwa-flutter/workflow.png)

**Analyse des avantages et inconvénients :**

- **Cycle de déploiement ultra-rapide :** Mises à jour en quelques minutes (ex: correction d'un bug d'inscription en 2h).
- **Économies financières :** Pas de frais de licence ($99/an Apple) et économie de ressources sur la préparation des soumissions.
- **Distribution simplifiée :** Partage via URL/QR code très efficace.
- **Accessibilité universelle :** iOS et Android sans distinction.
- **Absence des stores officiels :** Perte d'acquisition organique estimée à 15%.
- **Friction à l’installation :** Processus peu intuitif pour les utilisateurs (seulement 23% d'installation).
- **Limitations techniques :** Problèmes potentiels avec les autorisations (caméra, géolocalisation) via navigateur.

![Permissions](/images/blog/pwa-flutter/permissions.png)

**PWA avec Flutter: une alternative qui a fait ses preuves**

C'est une excellente voie pour tester rapidement ses idées et affiner son produit avant de migrer éventuellement vers un processus plus traditionnel (natif) une fois le projet mature.
      `,
    },
  },
];
