export const blogPosts = [
  {
    id: "first-flutter-package",
    slug: {
      en: "first-flutter-package-pwa-installer",
      fr: "premiere-librairie-flutter-pwa-installer",
    },
    title: {
      en: "I'm publishing my first Flutter package! 🚀",
      fr: "Je publie ma première librairie Flutter ! 🚀",
    },
    subtitle: {
      en: "How I solved the PWA installation and In-App browsers nightmare.",
      fr: "Comment j'ai résolu le cauchemar de l'installation PWA et des navigateurs In-App.",
    },
    seoTitle: {
      en: "My First Flutter Package on pub.dev: pwa_installer",
      fr: "Ma première librairie Flutter sur pub.dev : pwa_installer",
    },
    seoDescription: {
      en: "How I turned a copy-paste hack into a Flutter pub.dev package. pwa_installer handles PWA install prompts and In-App Browser detection on iOS & Android.",
      fr: "Comment j'ai publié pwa_installer, le package Flutter qui guide les utilisateurs vers l'installation PWA pour leur offrir la meilleure expérience possible.",
    },
    tags: [
      "Flutter",
      "Dart",
      "pub.dev",
      "PWA",
      "pwa_installer",
      "Progressive Web App",
      "In-App Browser",
      "Flutter package",
      "Open Source",
      "Flutter Web",
    ],
    date: "2026-03-09",
    lastModified: "2026-03-09",
    author: "Fabien Chung",
    coverImage: "/images/blog/first-package/flutter-pwa-installer-package-hero.webp",
    content: {
      en: `
For a long time, my developer routine when faced with a new need came down to this: I looked for a solution, I found the right tool on pub.dev, I typed \`flutter pub add\`... and I moved on. We are so used to consuming these libraries for free that we almost forget the unknown author who took the time to develop them.

But when there was no miracle package, I fell back into another routine well known to developers: the famous \`utils.dart\` file or the specific Widget that we drag from one project to another.

For me, it was managing the installation of my PWAs (Progressive Web Apps). I first coded it for a side-project then included it in my LOVT app, then I copied it for a client mission and so on.

Until the day I had to fix a bug on iOS detection in project A, and I realized with weariness that I had to go apply this same fix manually in projects B and C.

That was the signal.

![Developer copy-pasting code between Flutter projects](/images/blog/first-package/developer-copy-paste-code-reuse.gif "small")

I spent years taking advantage of the community's open source work (thanks to the maintainers of \`url_launcher\` or \`device_info_plus\` who save my life on a daily basis). It was time for me to "return the elevator" and transform my personal "hack" into a clean, centralized, and shareable solution.

Here is the story of my first package on pub.dev.

---

## The problem: The nightmare of PWAs and "In-App Browsers"

If you read [my previous article on PWAs](http://solodeveloping.com/articles/flutter-pwa-guide), you know that I love this technology for its deployment speed. But it comes with two major pains for the user experience:

1. **Installation is invisible:** On iOS (and sometimes Android), there is no magic "Install" button. You have to explain to the user to click on "Share" then "Add to Home Screen". Without a visual tutorial, no one does it.
2. **The social network trap (In-App Browsers):** This is the critical point. If a user clicks on your app's link from Instagram, TikTok, or Facebook, your PWA opens in their internal browser.
   - Consequence 1: Cookies and sessions often drop.
   - Consequence 2: Permissions (camera, microphone, geolocation) are often blocked or bugged.

For an app like mine that requires access, it's fatal. The user thinks the app doesn't work.

![PWA not working in an in-app browser](/images/blog/first-package/pwa-not-working-in-app-browser.gif "small")

## The solution: pwa_installer

So I decided to create a package that handles all this automatically.

The goal was simple: offer a single Widget that detects the user's environment and acts accordingly.

- **On a classic browser (Chrome/Safari):** It displays a beautiful instruction page adapted to the OS (iOS or Android) to guide the installation.
- **On a Desktop:** You can choose to block access ("Mobile only") or let them use the application without having to install it.
- **On an In-App Browser (TikTok/Insta):** It detects the User Agent and proposes (or forces) a redirection to the system browser (Chrome/Safari) to guarantee that the app works.

<div style="display:flex;gap:16px;justify-content:center;margin:2rem 0">
  <img src="/images/blog/first-package/pwa-install-prompt-android-guide.webp" alt="PWA install prompt guide for Android devices" style="flex:1;min-width:0;border-radius:12px" />
  <img src="/images/blog/first-package/pwa-desktop-qr-code-redirect.webp" alt="Desktop QR code to redirect users to mobile PWA" style="flex:1;min-width:0;border-radius:12px" />
  <img src="/images/blog/first-package/in-app-browser-detection-redirect.webp" alt="In-app browser detection and redirect to system browser" style="flex:1;min-width:0;border-radius:12px" />
</div>

---

## Demystification: A package is just code

After researching how to publish a package, I realized that it ultimately wasn't that complicated.
The structure is the same as for a classic Flutter application:
- A \`pubspec.yaml\` file
- A \`lib\` folder
- Dart code.

That's it. Any developer can do it, even a junior. The barrier is not technical, it is psychological.

---

## The challenge of Abstraction

This is where things get tough. When this code was in my LOVT project, it was "hardcoded": the LOVT logo, LOVT colors, and LOVT texts.

To make it a library, I had to do a lot of abstraction work. This translated into four main axes.

**The logo: a \`Widget?\`, not a \`String\`.** The first temptation would have been to accept a path to an asset. But that's too restrictive — every app loads images differently (assets, network, SVG…). By accepting a \`Widget?\`, we let the app pass whatever it wants. If \`null\`, the area is simply omitted.

**The labels: \`PwaInstallerLabels\` and the \`copyWith\` pattern.** i18n is often the poor cousin of UI libraries. The \`PwaInstallerLabels\` class centralizes the 30+ required strings (iOS 26+, iOS legacy, Android, Desktop QR…) with English defaults. The \`copyWith\` pattern lets you override only what you need, without rewriting the entire object.

**The theme: three levels of customization.** \`PwaInstallerTheme\` offers two ready-to-use presets (\`defaultTheme\` dark, \`lightTheme\`), a \`fromContext\` factory that automatically reads the app's Material \`ColorScheme\`, and a \`copyWith\` to adjust any token (color, gradient, borderRadius, padding).

**Custom screens: builder functions.** For cases where the theme isn't enough, each screen can be fully replaced. The \`onDismiss\` passed as a parameter is \`null\` when \`forceInstall: true\` — that's the signal to hide the "Continue without installing" button.

\`\`\`dart
PwaInstaller.init(
  // forceInstall: true = the user is blocked until installation.
  // They cannot access the app from the browser.
  forceInstall: true,
);

runApp(
  MaterialApp(
    home: PwaInstaller(
      // You can pass whatever you want: Image.asset, SvgPicture, NetworkImage...
      logo: Image.asset('assets/logo.png'),
      appName: 'My App',

      // Inherits the app's Material theme (defaultTheme / lightTheme)
      // but individual values can also be overridden with copyWith().
      theme: PwaInstallerTheme.fromContext(context).copyWith(
        accentColor: Colors.deepPurple,
      ),

      // All view labels can be overridden with copyWith().
      // Ideal for translating into multiple languages.
      labels: const PwaInstallerLabels().copyWith(
        titleAdd: 'Add ',
        titleToHomeScreen: 'to Home Screen',
      ),

      // If the theme isn't enough, the entire screen can be replaced.
      customMobileScreen: (context, onDismiss) => MyCustomInstallScreen(
        onDismiss: onDismiss,
      ),

      child: MyHomePage(),
    ),
  ),
);
\`\`\`

This is the most technically interesting step: moving from "product" code to "tool" code. Every design decision — \`Widget?\` over \`String\`, \`copyWith\` over a 30-parameter constructor, builder functions for custom screens — is a conscious choice to keep the API simple on the surface while remaining flexible in depth.



## The "Pre-Flight Checklist": My checks before takeoff

Publishing on pub.dev implies a certain rigor that I imposed on myself. You don't publish "dirty" code. Here is the checklist I followed to be as professional as possible:

**1. The ruthless Linter 🧹**
I configured my \`analysis_options.yaml\` file to be strict. The goal: zero warnings. No unused variables, no forgotten prints. Clean code inspires confidence.

**2. The Documentation (The real one) 📚**
There are two types of docs and both are essential:
- The \`README.md\`: This is the marketing showcase. I included Gifs, screenshots, and a "Copy-Paste" example so the user understands what the lib is for in 10 seconds.
- The Dart Doc (\`///\`): I documented every public property. This is what allows your IDE to display help when you hover over a variable.

**3. The \`example\` folder is not an option 📱**
For a visual library like mine, the \`example\` folder is vital. I had to create a complete mini-app inside the package. It's extra work, but it allows developers to clone the repo and test the redirection or display immediately.

**4. The hunt for "Pub Points" with Pana 💯**
The pub.dev site awards a score out of 140 to your package. This score is calculated by a tool called \`pana\`.
I ran it locally several times to fix small details (code formatting, description length) and aim for the 130+/140 score upon release. It's a guarantee of quality for those who discover the library.

**5. The safety net: Dry Run 🚀**
Before pressing the red button, the magic command:
\`flutter pub publish --dry-run\`
It simulates the publication and verifies that everything is green. It's the last check before the big jump.

---

## Conclusion

That's it, it's online.

![Flutter package published on pub.dev](/images/blog/first-package/flutter-package-pubdev-launch.gif "medium")

Seeing your name and your package on the pub.dev list brings a particular satisfaction. It's a mix of pride and humility.

I know this is only a V1 and there might be edge cases I haven't covered. But that's the Open Source game. I'm ready to receive feedback and Issues on GitHub.

"If you develop PWAs with Flutter and you encounter difficulties with installation or In-App browsers, go take a look at \`pwa_installer\`. I hope it will save you as much time as it did for me."

Happy coding! 🚀

---

- The package: [https://pub.dev/packages/pwa_installer](https://pub.dev/packages/pwa_installer)
- GitHub repo: [https://github.com/KooliFab/pwa_installer](https://github.com/KooliFab/pwa_installer)
`,
      fr: `
Pendant longtemps, ma routine de développeur face à un nouveau besoin se résumait à ça : imaginer la solution, trouver le package open-source qui allait faire le gros du travail, taper machinalement \`flutter pub add\` ou \`npm install\` dans mon terminal... et passer à la suite. On est tellement habitués à consommer ces librairies gratuitement qu'on en oublie presque l'auteur inconnu qui a pris le temps de les développer.

Mais quand il n'y avait pas de package miracle, je retombais dans une autre routine bien connue des développeurs : le fameux fichier \`utils\` ou la classe spécifique que l'on traîne d'un projet à l'autre.

Pour moi, c'était la gestion de l'installation de mes PWA (Progressive Web Apps). Je l'ai d'abord codée pour un side-project puis inclus dans mon app LOVT, puis je l'ai copiée pour une mission client et ainsi de suite.

![Développeur copiant-collant du code entre projets Flutter](/images/blog/first-package/developer-copy-paste-code-reuse.gif "small")

Jusqu'au jour où j'ai dû corriger un bug sur la détection iOS dans le projet A, et que j'ai réalisé avec lassitude que je devais aller appliquer ce même correctif manuellement dans les projets B et C.

C'était le signal. Au lieu de continuer à bricoler dans mon coin, pourquoi ne pas en faire une librairie ?

Après tout, j'ai passé des années à profiter du travail open source de la communauté (merci aux mainteneurs de \`url_launcher\` ou \`device_info_plus\` qui me sauvent la vie au quotidien). Il était temps pour moi de "renvoyer l'ascenseur" et de transformer mon "hack" personnel en une solution propre, centralisée et partageable.

Voici l'histoire de ma première librairie sur pub.dev.

---

## Le problème : Le cauchemar des PWA et des "In-App Browsers"

Si vous avez lu [mon précédent article sur les PWA](http://solodeveloping.com/fr/articles/guide-flutter-pwa), vous savez que j'adore cette technologie pour sa rapidité de déploiement. Mais elle vient avec deux douleurs majeures pour l'expérience utilisateur :

1. **L'installation est invisible :** Sur iOS (et parfois Android), il n'y a pas de bouton magique "Installer". Il faut expliquer à l'utilisateur de cliquer sur "Partager" puis "Sur l'écran d'accueil". Sans un tutoriel visuel, personne ne le fait.
2. **Le piège des réseaux sociaux (In-App Browsers) :** C'est le point critique. Si un utilisateur clique sur le lien de votre app depuis Instagram, TikTok ou Facebook, votre PWA s'ouvre dans leur navigateur interne.
   - Conséquence 1 : Les cookies et sessions sautent souvent.
   - Conséquence 2 : Les permissions (caméra, micro, géolocalisation) sont souvent bloquées ou buggées.

Pour une app comme la mienne qui nécessite des accès, c'est fatal. L'utilisateur pense que l'app ne marche pas.

![PWA ne fonctionnant pas dans un navigateur in-app](/images/blog/first-package/pwa-not-working-in-app-browser.gif "small")

## La solution : pwa_installer

J'ai donc décidé de créer un package qui gère tout ça automatiquement.

L'objectif était simple : proposer un Widget unique qui détecte l'environnement de l'utilisateur et agit en conséquence.

- **Sur un navigateur classique (Chrome/Safari) :** Il affiche une belle page d'instruction adaptée à l'OS (iOS ou Android) pour guider l'installation.
- **Sur un Desktop :** On peut choisir de bloquer l'accès ("Mobile only") ou de laisser passer utiliser l'application sans avoir à l'installer.
- **Sur un In-App Browser (TikTok/Insta) :** Il détecte le User Agent et propose (ou force) une redirection vers le navigateur système (Chrome/Safari) pour garantir que l'app fonctionne.

<div style="display:flex;gap:16px;justify-content:center;margin:2rem 0">
  <img src="/images/blog/first-package/pwa-install-prompt-android-guide.webp" alt="Guide d'installation PWA pour appareils Android" style="flex:1;min-width:0;border-radius:12px" />
  <img src="/images/blog/first-package/pwa-desktop-qr-code-redirect.webp" alt="QR code desktop pour rediriger vers la PWA mobile" style="flex:1;min-width:0;border-radius:12px" />
  <img src="/images/blog/first-package/in-app-browser-detection-redirect.webp" alt="Détection de navigateur in-app et redirection vers le navigateur système" style="flex:1;min-width:0;border-radius:12px" />
</div>

---

## Démystification : Un package, c'est juste du code

Après avoir recherché comment publier un package, je me suis rendu compte que ce n'était finalement pas si compliqué que ça.
La structure est la même que pour une application Flutter classique :
- Un fichier \`pubspec.yaml\`
- Un dossier \`lib\`
- Du code Dart.

C'est tout. N'importe quel développeur peut le faire, même un junior. La barrière n'est pas technique, elle est psychologique.

---

## Le défi de l'Abstraction

C'est là que les choses se corsent. Quand ce code était dans mon projet LOVT, il était "hardcodé" : le logo de LOVT, les couleurs de LOVT, les textes de LOVT.

Pour en faire une librairie, j'ai dû faire un gros travail d'abstraction. Ça s'est traduit par quatre axes principaux.

**Le logo : un \`Widget?\`, pas une \`String\`.** La première tentation aurait été d'accepter un chemin vers un asset. Mais c'est trop restrictif — chaque app charge ses images différemment (assets, réseau, SVG…). En acceptant un \`Widget?\`, on laisse l'app passer ce qu'elle veut. Si \`null\`, la zone est simplement omise.

**Les textes : \`PwaInstallerLabels\` et le pattern \`copyWith\`.** L'i18n est souvent le parent pauvre des librairies UI. La classe \`PwaInstallerLabels\` centralise les 30+ chaînes nécessaires (iOS 26+, iOS legacy, Android, Desktop QR…) avec des valeurs par défaut en anglais. Le pattern \`copyWith\` permet de ne surcharger que ce dont on a besoin, sans réécrire l'objet entier.

**Le thème : trois niveaux de personnalisation.** \`PwaInstallerTheme\` propose deux presets prêts à l'emploi (\`defaultTheme\` dark, \`lightTheme\`), une factory \`fromContext\` qui lit automatiquement le \`ColorScheme\` Material de l'app, et un \`copyWith\` pour ajuster n'importe quel token (couleur, gradient, borderRadius, padding).

**Les écrans custom : des builder functions.** Pour les cas où le thème ne suffit pas, chaque écran peut être entièrement remplacé. Le \`onDismiss\` passé en paramètre est \`null\` quand \`forceInstall: true\` — c'est le signal pour cacher le bouton "Continuer sans installer".

\`\`\`dart
PwaInstaller.init(
  // forceInstall: true = l'utilisateur est bloqué jusqu'à l'installation.
  // et ne peut pas accéder à l'application depuis le navigateur.
  forceInstall: true,
);

runApp(
  MaterialApp(
    home: PwaInstaller(
      // L'app passe ce qu'elle veut : Image.asset, SvgPicture, NetworkImage...
      logo: Image.asset('assets/logo.png'),
      appName: 'My App',

      // Hérite du thème Material de l'app, (defaultTheme / lightTheme)
      // mais on peut aussi surcharger les valeurs une par une avec copyWith().
      theme: PwaInstallerTheme.fromContext(context).copyWith(
        accentColor: Colors.deepPurple,
      ),

      // Tout les labels de la vue peuvent être surchargés avec copyWith().
      // Idéal si on veut traduire en plusieurs langues.
      labels: const PwaInstallerLabels().copyWith(
        titleAdd: 'Ajouter ',
        titleToHomeScreen: 'à l\'écran d\'accueil',
      ),

      // Si le thème ne suffit pas, on peut remplacer l'écran entièrement.
      customMobileScreen: (context, onDismiss) => MyCustomInstallScreen(
        onDismiss: onDismiss,
      ),

      child: MyHomePage(),
    ),
  ),
);
\`\`\`

C'est l'étape la plus intéressante techniquement : passer d'un code "produit" à un code "outil". Chaque décision de design — \`Widget?\` plutôt que \`String\`, \`copyWith\` plutôt qu'un constructeur à 30 paramètres, des builder functions pour les écrans custom — est un choix conscient pour garder l'API simple en surface tout en restant flexible en profondeur.


## La "Pre-Flight Checklist" : Mes vérifications avant le décollage

Publier sur pub.dev implique une certaine rigueur que je me suis imposée. On ne publie pas du code "sale". Voici la checklist que j'ai suivie pour être le plus professionnel possible :

**1. Le Linter impitoyable 🧹**
J'ai configuré mon fichier \`analysis_options.yaml\` pour être strict. L'objectif : zéro warning. Pas de variables non utilisées, pas de print oubliés. Un code propre inspire confiance.

**2. La Documentation (La vraie) 📚**
Il y a deux types de docs et les deux sont indispensables :
- Le \`README.md\` : C'est la vitrine marketing. J'ai inclus des Gifs, des captures d'écran et un exemple "Copier-Coller" pour que l'utilisateur comprenne en 10 secondes à quoi sert la lib.
- La Dart Doc (\`///\`) : J'ai documenté chaque propriété publique. C'est ce qui permet à votre IDE de vous afficher l'aide quand vous survolez une variable.

**3. Le dossier \`example\` n'est pas une option 📱**
Pour une librairie visuelle comme la mienne, le dossier \`example\` est vital. J'ai dû créer une mini-app complète à l'intérieur du package. C'est du travail en plus, mais cela permet aux développeurs de cloner le repo et de tester la redirection ou l'affichage immédiatement.

**4. La chasse aux "Pub Points" avec Pana 💯**
Le site pub.dev attribue une note sur 140 à votre package. Cette note est calculée par un outil appelé \`pana\`.
Je l'ai fait tourner en local plusieurs fois pour corriger les petits détails (formatage du code, longueur de la description) et viser le score de 130+/140 dès la sortie. C'est un gage de qualité pour ceux qui découvriront la librairie.

**5. Le filet de sécurité : Dry Run 🚀**
Avant d'appuyer sur le bouton rouge, la commande magique :
\`flutter pub publish --dry-run\`
Elle simule la publication et vérifie que tout est vert. C'est le dernier check avant le grand saut.

---

## Conclusion

Ça y est, c'est en ligne.

![Publication du package Flutter sur pub.dev](/images/blog/first-package/flutter-package-pubdev-launch.gif "medium")

Voir son package publié sur pub.dev procure une satisfaction particulière. C'est un mélange de fierté et d'humilité.

Je sais que ce n'est qu'une V1 et il y aura peut-être des cas particuliers que je n'ai pas couverts. Mais ça fais partie du jeu. Je suis prêt à recevoir les retours et les Issues sur GitHub.

"Si vous développez des PWA avec Flutter et que vous rencontrez des difficultés avec l'installation ou les navigateurs In-App, allez jeter un œil à \`pwa_installer\`. J'espère qu'elle vous fera gagner autant de temps qu'à moi."

Happy coding! 🚀

---

- La librairie: [https://pub.dev/packages/pwa_installer](https://pub.dev/packages/pwa_installer)
- Le repo GitHub: [https://github.com/KooliFab/pwa_installer](https://github.com/KooliFab/pwa_installer)
`,
    },
  },
  {
    id: "the-power-of-lazy-loading",
    slug: {
      en: "flutter-firebase-lazy-loading",
      fr: "flutter-firebase-lazy-loading",
    },
    title: {
      en: "Flutter Lazy Loading: Save Firebase Costs & Boost Speed",
      fr: "Flutter & Firebase : Économisez avec le Lazy Loading",
    },
    subtitle: {
      en: "Learn how to implement lazy loading in Flutter with Firebase to dramatically reduce database reads, save costs, and improve app performance.",
      fr: "Découvrez comment implémenter le lazy loading sur Flutter et Firebase pour réduire les lectures en base de données et optimiser vos coûts.",
    },
    date: "2024-10-07",
    author: "Fabien Chung",
    coverImage:
      "/images/blog/lazy-loading/flutter-firebase-lazy-loading-tutorial.webp",
    content: {
      en: `
During the development of my latest application, **LOVT**, I used my trusty stack of **Flutter + Firebase**, a powerful and ideal combination for projects in the market testing phase, with the goal of moving quickly.

## Why use Flutter and Firebase?

Flutter is a well-known framework for building cross-platform applications from a single codebase. For our project, we used Flutter Web to make the application quickly accessible.

Firebase, on the other hand, is an extremely popular backend service among developers, offering a turnkey solution with a database, removing the need for infrastructure management. This is particularly useful for us as our Flutter application is hosted and uses its database.

Firebase includes a free tier plan with quotas to follow, such as the number of reads and writes to the database, as well as the amount of files stored and downloaded.

This combo is ideal for testing a market, attracting new users, and focusing on the product, with the advantage of being free (up to a certain point).

![Firebase cost savings with Flutter lazy loading](/images/blog/lazy-loading/flutter-lazy-loading-money.gif)

## The Firebase Read Quota Challenge

LOVT is an app that allows users to view service offers and requests. It features an introduction phase to present the app, followed by a list of services. The idea is to give a preview to non-registered users. Once signed up or logged in, users can access the details of each service and contact the relevant individuals.

![Flutter app fetching all Firebase documents without lazy loading](/images/blog/lazy-loading/flutter-app-without-lazy-loading.gif)

After a soft launch to our early adopter community, I quickly realized that the initial acquisition flow was going to be problematic.

Loading the service list twice (once before logging in and again after) would soon cause us to hit the Firebase quota limit. Ten services displayed equals to ten database reads. Considering the potential growth in the number of services and registered users, we were likely to exceed the 50,000 daily read limit.

## Implementing Lazy Loading in Flutter

To prevent this potential overload, I thought it was the perfect time to implement lazy loading.

Lazy loading allows data to be loaded only when needed. For large volumes of data, it boosts performance and reduces memory usage by avoiding loading everything at once. In our case, although we didn't yet have a huge amount of data, I used it to gradually load the list of services, anticipating a future increase in volume.

For the existing UI, it was sufficient to load only six results at a time, allowing users to see a full list on the first display. To view more services, they simply needed to scroll down to load six more.

![Flutter app implementing lazy loading pagination with Firebase](/images/blog/lazy-loading/flutter-app-with-lazy-loading.gif)

From a coding perspective, it looks like this:

In my repository class, I build the Firestore query by limiting the number of results to 6.

\`\`\`dart
Future<PaginatedJobPosts> getJobsAvailable(
      {DocumentSnapshot? lastDocument, int limit = 6}) async {

    try {

// Define a query with a limit
      Query query = _firestore.collection("jobPosts").limit(limit);

      if (lastDocument != null) {
        query = query.startAfterDocument(lastDocument); // continue after the last document
      }

// Map the data from firestore
      final querySnapshot = await query
          .withConverter<JobPost>(
            fromFirestore: (snapshot, _) => JobPost.fromMap(snapshot.data()!),
            toFirestore: (job, _) => job.toMap(),
          )
          .get();

// Prepare the data to return
      final jobs = querySnapshot.docs.map((doc) => doc.data()).toList();

      final lastDoc =
          querySnapshot.docs.isNotEmpty ? querySnapshot.docs.last : null;

// Return an object PaginatedJobPosts to be manipulated in the view
      return PaginatedJobPosts(jobs, lastDoc);

    } catch (e) {
      debugPrint("Error fetching jobs: $e");
      return PaginatedJobPosts([], null);
    }
  }
\`\`\`

Then, in the view, I display the query results and handle loading additional data.

\`\`\`dart
// NotificationListener to handle scroll down event
return NotificationListener<ScrollNotification>(
      onNotification: (ScrollNotification scrollInfo) {

       // Check if it is the bottom of the list
        if (scrollInfo.metrics.pixels == scrollInfo.metrics.maxScrollExtent &&
            !isLoadingMore) {
          _loadMoreJobs(); // Request more results from firebase
        }
        return false;
      },

      // Load the list view
      child: ListView.builder(
        itemCount: _allJobs.length + (_hasMoreData ? 1 : 0),
        itemBuilder: (context, index) {

          if (index == _allJobs.length) {
            return const Center(child: CircularProgressIndicator());
          }

          return Container(
            margin: const EdgeInsets.symmetric(horizontal: 6, vertical: 4),
            child: JobPostCard(
              jobPost: _allJobs[index],
              onTap: () => context.goNamed(
                AppRoute.jobDetail.name,
                pathParameters: {'id': index.toString()},
                extra: _allJobs[index],
              ),
            ),
          );
        },
      ),
    );
\`\`\`

\`\`\`dart
Future<void> _loadMoreJobs() async {
    // Manage loader
    if (ref.read(loadingNotifierProvider) || !_hasMoreData) return;
    ref.read(loadingNotifierProvider.notifier).setLoading(true);

    // Call repository to get more results
    final paginatedJobs =
        await ref.read(getJobsAvailableProvider(_lastDocument).future);

    if (paginatedJobs.jobs.isEmpty) {
      _hasMoreData = false;
    } else {
      _allJobs.addAll(paginatedJobs.jobs);
      _lastDocument = paginatedJobs.lastDocument;
    }

    // Manage loader
    ref.read(loadingNotifierProvider.notifier).setLoading(false);
  }
\`\`\`

Code details [here](http://github.com/KooliFab/lazyloading)

By applying this loading limit, the number of database reads significantly decreased. Firebase only counts the elements returned in the query, meaning that if you load six results, it counts as six reads — far fewer than if you were to load all the data at once.

## Firebase Read Quota Reduction Results

Did the implementation of lazy loading actually help?

Thanks to a highly effective TikTok campaign, we experienced a significant spike in acquisitions, allowing us to test and confirm the effectiveness of this optimization.

So, how did the performance compare before and after lazy loading?

**Before optimization:** With around 200 sign-ups, we were close to 43,000 readings in the database.

![High Firebase database reads before Flutter lazy loading optimization](/images/blog/lazy-loading/firebase-reads-before-lazy-loading.webp)

**After optimization:** With nearly 650 sign-ups, the peak number of reads dropped to around 37,000. This means we tripled the number of sign-ups while reducing the read quota!

![Reduced Firebase database reads after Flutter lazy loading optimization](/images/blog/lazy-loading/firebase-reads-after-lazy-loading.webp)

## Benefits of Lazy Loading in Flutter

**- Cost reduction:** We stayed within Firebase's free tier.

**- Performance improvement:** Faster load times for users.

**- Memory savings:** By avoiding loading the entire list of services at once.

**- Scalability:** The app can handle more users without increasing costs.

In summary, lazy loading has proven to be very effective for our app. Not only did it allow us to stay within Firebase's free tier, but it also gave us better scalability margins.

For a startup like LOVT, with limited resources, every way to optimize and save matters. The trio of Flutter, Firebase, and lazy loading is validated on my end. What do you think?

![Successful Flutter and Firebase lazy loading implementation](/images/blog/lazy-loading/flutter-lazy-loading-success.gif)
`,
      fr: `
Dans le cadre du développement de ma dernière application, **LOVT**, j'ai utilisé ma bonne vieille stack **Flutter + Firebase**, une combinaison puissante et parfaite pour des projets en phase de test de marché avec pour objectif d'avancer rapidement.

## Pourquoi utiliser Flutter et Firebase ?

Flutter est un framework réputé pour créer des applications multiplateformes à partir d'un code source unique. Pour notre projet, nous avons utilisé Flutter Web afin de rendre l'application accessible rapidement.

Firebase, quant à lui, est un service backend extrêmement populaire auprès des développeurs, offrant une solution clé en main avec une base de données, sans nécessiter la gestion de l'infrastructure. Cela nous est particulièrement utile puisque notre application Flutter est hébergée et utilise sa base de données.

Firebase inclut un plan gratuit (le fameux "free tier") avec des quotas à respecter, comme le nombre de lectures et d'écritures dans la base de données, ainsi que la quantité de fichiers stockés et téléchargés.

Ce combo est idéal pour tester un marché, attirer de nouveaux utilisateurs et se concentrer sur le produit, avec l'avantage d'être gratuit (jusqu'à un certain seuil).

![](/images/blog/lazy-loading/flutter-lazy-loading-money.gif)

## Le défi des quotas de lecture Firebase

LOVT est une application permettant aux utilisateurs de visualiser des offres et demandes de services. Elle propose une phase d'introduction pour présenter l'application, suivie d'une liste de services. Le but ici est de donner un aperçu aux non inscrits. Une fois inscrits ou connectés, les utilisateurs peuvent accéder aux détails de chaque service et contacter les personnes concernés.

![Application Flutter récupérant tous les documents Firebase sans lazy loading](/images/blog/lazy-loading/flutter-app-without-lazy-loading.gif)

Suite à un lancement progressif auprès de notre communauté de premiers utilisateurs, je me suis rendu compte que le parcours d'acquisition initial allait poser problème.

En chargeant la liste de services deux fois (une fois avant la connexion et une autre fois après) on allait vite atteindre la limite de quota définie par Firebase. Pour dix services affichés, cela correspond a dix lectures en base de données. En prenant l'hypothèse que le nombre de services créés et que le nombre d'inscrits allait augmenter drastiquement, il était probable qu'on allait dépasser la limite de 50 000 lectures quotidienne.

## L’optimisation avec le Lazy Loading

Pour éviter cette surcharge potentielle, je me suis dit que ce serait l'occasion parfaite pour coder du lazy loading (chargement progressif).

Le lazy loading permet de charger les données uniquement quand cela est nécessaire. Pour de gros volumes de données, cela améliore les performances et réduit l'utilisation de la mémoire en évitant de tout charger d'un coup. Dans notre cas, bien que nous n'ayons pas encore un volume important de données, je l'ai utilisé pour charger progressivement la liste des services, en prévision d'une augmentation future.

Par rapport à l'UI existante, il était suffisant de charger seulement six résultats à la fois, ce qui permettrait à l'utilisateur de voir une liste complète dès le premier affichage. Pour voir davantage de services, il lui suffirait de faire défiler vers le bas pour en charger six nouveaux.

![](/images/blog/lazy-loading/flutter-app-with-lazy-loading.gif)

Du point de vue code cela ressemble à ça:

Dans ma classe de repository, je construis la requête Firestore en limitant le nombre de résultats à 6.

\`\`\`dart
Future<PaginatedJobPosts> getJobsAvailable(
      {DocumentSnapshot? lastDocument, int limit = 6}) async {
  try {
    // Define a query with a limit
    Query query = _firestore.collection("jobPosts").limit(limit);

    if (lastDocument != null) {
      query = query.startAfterDocument(lastDocument);
    }

    // Map the data from firestore
    final querySnapshot = await query
        .withConverter<JobPost>(
          fromFirestore: (snapshot, _) => JobPost.fromMap(snapshot.data()!),
          toFirestore: (job, _) => job.toMap(),
        )
        .get();

    // Prepare the data to return
    final jobs = querySnapshot.docs.map((doc) => doc.data()).toList();
    final lastDoc = querySnapshot.docs.isNotEmpty ? querySnapshot.docs.last : null;

    // Return an object PaginatedJobPosts to be manipulated in the view
    return PaginatedJobPosts(jobs, lastDoc);
  } catch (e) {
    debugPrint("Error fetching jobs: $e");
    return PaginatedJobPosts([], null);
  }
}
\`\`\`

Puis, dans la vue, je présente les résultats de la requête et je gère le chargement de données supplémentaires.

\`\`\`dart
// NotificationListener to handle scroll down event
return NotificationListener<ScrollNotification>(
  onNotification: (ScrollNotification scrollInfo) {
    // Check if it is the bottom of the list
    if (scrollInfo.metrics.pixels == scrollInfo.metrics.maxScrollExtent &&
        !isLoadingMore) {
      _loadMoreJobs(); // Request more results from firebase
    }
    return false;
  },
  // Load the list view
  child: ListView.builder(
    itemCount: _allJobs.length + (_hasMoreData ? 1 : 0),
    itemBuilder: (context, index) {
      if (index == _allJobs.length) {
        return const Center(child: CircularProgressIndicator());
      }
      return Container(
        margin: const EdgeInsets.symmetric(horizontal: 6, vertical: 4),
        child: JobPostCard(
          jobPost: _allJobs[index],
          onTap: () => context.goNamed(
            AppRoute.jobDetail.name,
            pathParameters: {'id': index.toString()},
            extra: _allJobs[index],
          ),
        ),
      );
    },
  ),
);
\`\`\`

\`\`\`dart
Future<void> _loadMoreJobs() async {
  // Manage loader
  if (ref.read(loadingNotifierProvider) || !_hasMoreData) return;
  ref.read(loadingNotifierProvider.notifier).setLoading(true);

  // Call repository to get more results
  final paginatedJobs =
      await ref.read(getJobsAvailableProvider(_lastDocument).future);

  if (paginatedJobs.jobs.isEmpty) {
    _hasMoreData = false;
  } else {
    _allJobs.addAll(paginatedJobs.jobs);
    _lastDocument = paginatedJobs.lastDocument;
  }

  // Manage loader
  ref.read(loadingNotifierProvider.notifier).setLoading(false);
}
\`\`\`

Le détail du code [ici](http://github.com/KooliFab/lazyloading).

En appliquant cette limite de chargement, le nombre de lectures en base de données a diminué de façon significative. En effet, Firebase comptabilise uniquement les éléments retournés dans la requête, ce qui signifie que si vous chargez 6 résultats, cela ne comptera que pour 6 lectures, beaucoup moins que si vous chargiez l'ensemble des données en une seule fois.

## Résultats : Réduction des lectures Firebase

Est-ce que l'implémentation du lazy loading a réellement porté ses fruits ?

Grâce à une campagne TikTok très efficace, nous avons connu un pic d'acquisitions important, ce qui nous a permis de tester et de valider l'efficacité de cette optimisation.

Alors, quelles ont été les performances avant et après l'implémentation du lazy loading ?

**Avant l'optimisation :** Avec environ 200 inscriptions, nous étions pas loin des 43 000 lectures en base de données.

![](/images/blog/lazy-loading/firebase-reads-before-lazy-loading.webp)

**Après l'optimisation :** Avec près de 650 inscriptions, le pic de lectures est descendu aux alentours des 37 000. Cela signifie que nous avons triplé le nombre d'inscriptions tout en réduisant le quota de lectures !

![](/images/blog/lazy-loading/firebase-reads-after-lazy-loading.webp)

## Les avantages du Lazy Loading dans Flutter

- **- Réduction des coûts :** Nous sommes restés dans le plan gratuit de Firebase.

- **- Amélioration des performances :** Temps de chargement plus rapides pour les utilisateurs.

- **- Économie de mémoire :** En évitant de charger toute la liste des services d'un coup.

- **- Évolutivité :** L'application peut gérer plus d'utilisateurs sans augmenter les coûts.


En somme, le lazy loading s’est révélé très efficace pour notre application. Non seulement il nous a permis de rester dans le free tier de Firebase, mais il a également offert une meilleure marge de manœuvre en termes de scalabilité.

Pour une startup comme LOVT, aux ressources limitées, chaque moyen d'optimiser et d'économiser compte. Le trio Flutter, Firebase et lazy loading est validé de mon côté. Qu'en pensez-vous ?

![](/images/blog/lazy-loading/flutter-lazy-loading-success.gif)
`,
    },
  },
  {
    id: "progressive-web-app-with-flutter",
    slug: {
      en: "flutter-pwa-guide",
      fr: "guide-flutter-pwa",
    },
    title: {
      en: "Flutter PWA Guide: Build & Deploy Web Apps Fast 🚀",
      fr: "Guide Flutter PWA : Déployez vos Web Apps Rapidement 🚀",
    },
    subtitle: {
      en: "Learn how to build and deploy a Progressive Web App (PWA) using Flutter. Bypass app stores for faster launches and easier distribution.",
      fr: "Découvrez comment créer et déployer une Progressive Web App (PWA) avec Flutter pour lancer vos applications sans passer par les stores.",
    },
    date: "2024-05-20",
    author: "Fabien Chung",
    coverImage: "/images/blog/pwa-flutter/flutter-pwa-hero.webp",
    content: {
      en: `
For a long time, I've set myself the challenge of launching mobile application projects faster by reducing the constraints that typically slow down the process.

The first constraint to overcome was developing for multiple platforms simultaneously. Flutter solved this by allowing me to work on a single codebase to create applications that work equally well on iOS and Android, significantly reducing development time.

Once development is completed, the second constraint that arises is publishing on Apple and Google stores. This process requires purchasing a license, submitting the application to their servers, preparing graphic elements and descriptions, then waiting for validation to finally be visible and downloadable by users. Even though verification and validation processes have been reduced, this doesn't eliminate the entire deployment process for each application update.

![Mobile App Publishing Process to do for each platform](/images/blog/pwa-flutter/flutter-pwa-multi-platform.webp)

These steps become particularly constraining when trying to quickly offer a testable version and efficiently iterate with our first users. By adding up development time, distribution time, and all external factors related to launching such as communication and marketing, we quickly see weeks, if not months, accumulate before really reaching our target audience.

## Why Build a Progressive Web App (PWA)?

The answer lies in PWAs (Progressive Web Apps), a technology that has been around for about a decade. PWAs allow access to an application directly from a web browser without going through the stores. Companies like Facebook and Google have long adopted this approach for their services. The goal is simple: offer universal access to users, regardless of their device. A PWA is essentially a website that looks and behaves like a mobile application.

![On the left, Google Maps from a browser, and on the right, the native app](/images/blog/pwa-flutter/flutter-pwa-diagram.webp)

Traditionally, PWA development required web development skills. The technologies typically used were React, Angular, or other frameworks like Next.js or Nuxt.js.

As a mobile platform specialist, I had never taken the leap until recently. Flutter's constant evolution and its active community have enabled complete support for the web (in addition to iOS and Android) and therefore the possibility of creating PWAs. This was perfect for me as I already master this framework.

![](/images/blog/pwa-flutter/flutter-pwa-yes-mccallister.gif)

## Flutter Web and PWA User Experience

Questions about user experience quality had already emerged when comparing native development to cross-platform development. What about for an application running from a web browser? Unsurprisingly, a PWA cannot completely replace a native application in terms of user experience.

Nevertheless, once installed on the home screen, the browser's address bar completely disappears and the application offers a much more immersive experience than most users would be able to distinguish from a native app. Flutter Web allows us to preserve a large part of the visual experience, and animations generally remain fluid thanks to Material and Cupertino widgets that faithfully reproduce the characteristic designs of iOS and Android.

![PWA installation differs from the classic method (left) but the result is rather convincing (right)](/images/blog/pwa-flutter/flutter-pwa-web-browser-demo.gif)

Even if installation can be complicated, the application remains functional from the browser, although the experience is slightly degraded. The goal here is not to offer the perfect experience, but rather to be quickly available to as many people as possible while offering an experience close enough to satisfy our users.

## Technical Constraints of Flutter PWAs

The web environment imposes certain unavoidable constraints compared to native applications.

First, the execution model fundamentally differs: a native application communicates directly with the operating system, while a PWA operates through a browser, adding a layer of abstraction that can affect performance.

Next, despite constant progress in web APIs, access to system functionalities remains more limited than in native. Browsers also impose strict restrictions on resource usage, which can compromise the performance of complex applications.

Finally, elaborate animations and sophisticated touch interactions may lose fluidity, particularly on devices with limited resources.

Of course, some differences persist. Performance can fluctuate depending on the browser used and the device's power, and typographic rendering doesn't always match the precision obtained in native.

![Despite the appearance of a native app, we are indeed in a web browser](/images/blog/pwa-flutter/flutter-pwa-performance.webp)


These constraints must be taken into account from the application's design stage, but they don't constitute an insurmountable obstacle for most use cases. The key is to adapt your interface and functionality to the capabilities of the web platform while taking advantage of its specific benefits.

## How to Build and Deploy a Flutter PWA

The Flutter community has done tremendous work to manage application execution in the web environment. From a technical standpoint, the Flutter source code, written in Dart, is compiled and optimized for JavaScript. Then a script initializes the Dart runtime environment and loads the application. Images, fonts, and other resources are optimized and packaged to be efficiently loaded in the browser.

![Flutter web architecture compiling Dart to JavaScript for PWAs](/images/blog/pwa-flutter/flutter-pwa-architecture.webp)

All of this occurs behind the scenes. The developer can focus on the code they already master! Then, to make their application available, deployment is incredibly simple:

1. Fill out the \`manifest.json\` file that corresponds to the app's presentation elements

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


And that's it! No submission to stores, no waiting for approval. For updates, it's even simpler: just redeploy the files, and users will have the new version on their next visit (or the next page refresh).

![On Android devices, some browsers automatically display the installation window](/images/blog/pwa-flutter/flutter-pwa-deployment.webp)

## Pros and Cons of Flutter PWAs

Using the PWA approach with Flutter enabled me to launch the LOVT application in record time. From the initial phase of feature specification to public deployment, the project only required a few weeks — a timeframe that would have been unthinkable with the traditional development and validation cycle of native applications.

This rapid execution provided a significant strategic advantage: the ability to test our concept in the real market without massive investment in time and resources. We were thus able to adopt a truly agile approach, collecting feedback from early users, identifying areas for improvement, and deploying fixes sometimes within just a few hours.

![Agile workflow enabled by Flutter PWA fast deployment](/images/blog/pwa-flutter/flutter-pwa-workflow.webp)


After several weeks of real-world usage, here is a detailed analysis of the advantages and disadvantages I've been able to observe with our Flutter PWA:

### Advantages

- **Ultra-fast deployment cycle:** Updates can be deployed in minutes, without waiting for store validation. This responsiveness allowed us to fix critical bugs and improve the user experience almost instantly. For a concrete example, we identified a registration issue related to TikTok and Facebook at 6 PM and deployed the fix before 8 PM the same day. We also avoided the multiple back-and-forths sometimes necessary to obtain Apple and Google’s approval, considerably shortening the time between development and making it available to users.

- **Financial and operational savings:** The absence of license fees ($99/year for Apple, $25 for Google) may seem anecdotal, but it's especially the saving of resources related to preparing store submissions that proved significant.  This lightness extends to the infrastructure level: thanks to our architecture based on Firebase, we have, to date, incurred no hosting or maintenance costs, thus optimizing our development and operation budget.

![Steve Jobs announcing zero server costs with Firebase and PWA](/images/blog/pwa-flutter/flutter-pwa-zero-steve-jobs.gif)

- **Extremely simplified distribution:** Sharing the application via a simple URL (https://lovt.web.app) proved to be very effective for virality. Combined with a QR code, we were able to facilitate account creation and application use during our organized events.

- **Universal accessibility:** Simultaneous availability on iOS and Android without distinction allowed us to reach a wider audience.  The application theoretically remains accessible on any device with a modern web browser, including older models that might not necessarily support the latest versions of native applications.

### Disadvantages

- **Absence from official stores:** Although access via URL simplifies direct sharing, the absence from official stores limits our potential visibility. In a word-of-mouth context, we found that new users naturally looked for the application on the App Store or Play Store before realizing it was accessible only via the web. We estimate that this absence from official distribution platforms represents a loss of organic acquisition of about 15% compared to a traditional application.

![Confused user searching for the app on the Apple App Store](/images/blog/pwa-flutter/flutter-pwa-where-is-it-travolta.gif)

- **Installation friction:** Although initial access is immediate, the process of installing a PWA on the home screen remains counter-intuitive for many users. Our statistics show that only 23% of regular users have actually “installed” the application, others using it directly via the browser. We had to create a specific tutorial to encourage installation.

- **Technical limitations of native APIs:** Permission management proved to be problematic in certain contexts. iOS and Android require user-validated permissions to access features like the camera or geolocation. Going through the browser, these validation mechanisms can malfunction depending on user actions, sometimes preventing the use of certain essential functionalities.

![choose between execution speed and user experience](/images/blog/pwa-flutter/flutter-pwa-permissions.webp)

## Conclusion: A Proven Alternative
In terms of execution speed, I haven't found anything better than developing PWAs to launch apps quickly.  No, it’s not perfect and will never be as refined as native apps, but it opens a new path for those who want to quickly test their ideas.

What truly convinced me? The ease of deployment and the absence of all constraints related to Apple and Google stores. This flexibility allowed me to focus on the essentials: developing features and responding to user feedback.

Of course, there are compromises to make. The technical limitations of the web are factors to consider depending on your product. For LOVT, these disadvantages were largely offset by the speed of market entry and update flexibility.

A PWA is perfect for testing your concept and refining your product. Once your idea is validated and your product is stable, you can migrate to a more traditional process. This mixed approach allows you to enjoy the best of both worlds: the initial speed of PWAs and the rich experience of native applications when your project is more mature.

In a future article, I’ll show you another interesting aspect of using PWAs.

![](/images/blog/pwa-flutter/flutter-pwa-spongebob.gif)
      `,
      fr: `
Depuis longtemps, je me suis fixé comme défi de lancer des projets d'applications mobiles plus rapidement en réduisant les contraintes qui ralentissent habituellement le processus.

La première contrainte à surmonter était le développement pour plusieurs plateformes en même temps. Flutter a résolu cela en me permettant de travailler sur une seule base de code pour créer des applications qui fonctionnent aussi bien sur iOS qu'Android, réduisant considérablement le temps de développement.

Une fois le développement terminé, la deuxième contrainte qui survient est la publication sur les stores d'Apple et de Google. Ce processus exige l'achat d'une licence, l'envoi de l'application sur leurs serveurs, la préparation des éléments graphiques et des descriptions, puis l'attente d'une validation pour enfin être visible et téléchargeable par les utilisateurs. Même si les processus de vérification et de validation ont été réduits, cela n’empêche pas tout un processus de déploiement pour chaque mise à jour de l’application.

![Processus de publication d'une application mobile classique sur les stores](/images/blog/pwa-flutter/flutter-pwa-app-store-publication-process-fr.webp)

Ces étapes deviennent particulièrement contraignantes lorsqu'on cherche à proposer rapidement une version testable et à itérer efficacement avec nos premiers utilisateurs. En additionnant le temps de développement, de diffusion et tous les facteurs externes liés au lancement comme la communication et le marketing, on voit rapidement s'accumuler les semaines, voire les mois, avant de toucher réellement son public cible.

## Pourquoi créer une Progressive Web App (PWA) ?

La réponse se trouve dans les PWA (Progressive Web Apps), une technologie qui existe depuis une bonne dizaine d'années maintenant. Les PWA permettent d'accéder à une application directement depuis un navigateur web, sans passer par les stores. Des entreprises comme Facebook et Google l'ont pourtant largement adoptée. L'objectif est simple : offrir un accès universel aux utilisateurs, quel que soit leur appareil. Une PWA, c’est essentiellement un site web qui ressemble et se comporte comme une application mobile.

![Comment fonctionne une Progressive Web App (PWA) comparé à une application native avec Google Maps](/images/blog/pwa-flutter/flutter-pwa-vs-native-app-diagram-fr.webp)

Traditionnellement, le développement de PWA nécessitait des compétences en développement web. Les technologies habituellement utilisées étaient React, Angular, ou d’autres frameworks comme Next.js ou Nuxt.js. En tant que spécialiste des plateformes mobiles, je n'avais donc jamais franchi le cap jusqu'à récemment. La constante évolution de Flutter et sa communauté active ont permis la prise en charge complète du web (en plus d'iOS et d'Android) et donc par la même occasion la possibilité de créer des PWA. Ce qui était parfait pour moi qui maîtrise déjà ce framework.

![Développeur enthousiaste d'utiliser Flutter pour le web](/images/blog/pwa-flutter/flutter-pwa-yes-mccallister.gif)

## L'expérience utilisateur avec Flutter Web et PWA

Une PWA ne peut remplacer complètement une application native en termes d'expérience utilisateur. Cependant, une fois installée sur l'écran d'accueil, la barre d'adresse du navigateur disparaît complètement et l'application offre une expérience bien plus immersive que la plupart des utilisateurs ne sauraient distinguer d’une app native.

![Comparaison de l'installation et l'expérience d'une application native et d'une PWA Flutter](/images/blog/pwa-flutter/flutter-pwa-installation-comparison-fr.webp)

Flutter Web nous permet de préserver une grande partie de l'expérience visuelle et les animations restent généralement fluides grâce aux widgets Material et Cupertino qui reproduisent fidèlement les designs caractéristiques d’iOS et d’Android.

![Démonstration fluide d'une PWA Flutter depuis un navigateur web](/images/blog/pwa-flutter/flutter-pwa-web-browser-demo.gif)

L'objectif ici n'est pas d'offrir l'expérience parfaite, mais plutôt d'être disponible rapidement pour un maximum de personnes tout en proposant une expérience suffisamment proche pour satisfaire nos utilisateurs.

## Contraintes techniques des PWA Flutter

L'environnement web impose certaines contraintes : le modèle d'exécution via navigateur peut affecter les performances (couche d'abstraction), et l'accès aux fonctionnalités système (caméra, localisation) reste plus limité qu'en natif.

Ces contraintes doivent être prises en compte dès la conception, mais elles ne constituent pas un obstacle insurmontable pour la plupart des cas d'utilisation.

## Comment compiler et déployer une PWA Flutter

Le code source Flutter (Dart) est compilé et optimisé vers JavaScript en arrière-plan. Un script initialise ensuite l'environnement d'exécution Dart et charge l'application. Les images, polices et autres ressources sont optimisées et empaquetées pour être chargées efficacement dans le navigateur.

Tout cela se déroule en coulisses. Le développeur peut donc se concentrer sur le code qu'il maîtrise déjà ! Ensuite, pour rendre son application disponible, le déploiement se fait de manière incroyablement simple :

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

![Installation pratique d'une PWA Flutter sur l'écran d'accueil d'un smartphone Android](/images/blog/pwa-flutter/flutter-pwa-android-home-screen-fr.webp)

Pas de soumission aux stores, pas d'attente d'approbation. Pour les mises à jour, c’est encore plus simple : il suffit de redéployer les fichiers, et les utilisateurs auront la nouvelle version à leur prochaine visite (ou au prochain rafraîchissement de la page).

![Déploiement d'une PWA Flutter sur Firebase Hosting](/images/blog/pwa-flutter/flutter-pwa-deployment.webp)

## Avantages et Inconvénients des PWA Flutter

L'approche PWA avec Flutter m'a permis de lancer l'application LOVT en un temps record (quelques semaines). Cette rapidité nous a offert un avantage stratégique : tester notre concept sur le marché réel sans investissement massif.

Après plusieurs semaines d'utilisation en conditions réelles, voici une analyse détaillée :

### Avantages

- **Cycle de déploiement ultra-rapide :** Mises à jour en quelques minutes (ex: correction d'un bug d'inscription en 2h).
- **Économies financières :** Pas de frais de licence ($99/an Apple) et économie de ressources sur la préparation des soumissions. Cette légèreté se prolonge au niveau de l’infrastructure : grâce à notre architecture basée sur Firebase, nous n’avons, jusqu’à aujourd’hui, supporté aucun coût d’hébergement ou de maintenance, optimisant ainsi notre budget de développement et d’exploitation.

![Steve Jobs annonçant zéro coût d'hébergement avec Firebase et PWA](/images/blog/pwa-flutter/flutter-pwa-zero-steve-jobs.gif)

- **Distribution simplifiée :** Partage via URL/QR code très efficace.
- **Accessibilité universelle :** iOS et Android sans distinction.

### Inconvénients

- **Absence des stores officiels :** Dans un contexte de bouche-à-oreille, nous avons constaté que de nouveaux utilisateurs cherchaient naturellement l’application sur l'App Store ou le Play Store avant de réaliser qu’elle n’était accessible que via le web. Cette situation a occasionné parfois une légère confusion. Nous estimons que cette absence des plateformes de distribution officielles représente une perte d’acquisition organique d’environ 15% par rapport à une application traditionnelle.

![Utilisateur confus cherchant la PWA Flutter sur l'App Store Apple](/images/blog/pwa-flutter/flutter-pwa-where-is-it-travolta.gif)

- **Friction à l'installation :** Nos statistiques démontrent que seuls 23% des utilisateurs réguliers ont véritablement « installé » l’application, les autres l’utilisant directement via leur navigateur.
- **Limitations techniques :** La gestion des permissions s'avère problématique dans certains contextes. Les navigateurs peuvent parfois dysfonctionner selon les actions des utilisateurs, empêchant l'utilisation de certaines fonctionnalités essentielles comme l'appareil photo ou la géolocalisation.

## Conclusion : Une alternative qui a fait ses preuves

C'est une excellente voie pour tester rapidement ses idées et affiner son produit avant de migrer éventuellement vers un processus plus traditionnel (natif) une fois le projet mature.

![](/images/blog/pwa-flutter/flutter-pwa-spongebob.gif)
      `,
    },
  },
];
