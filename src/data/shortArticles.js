export const shortArticles = [
  {
    id: "why-i-dont-build-saas-around-ai-api-keys",
    slug: {
      en: "why-i-dont-build-saas-around-ai-api-keys",
      fr: "why-i-dont-build-saas-around-ai-api-keys",
    },
    title: {
      en: "Why I Don't Build SaaS Apps Around AI API Keys",
      fr: "Pourquoi je ne crée pas de SaaS basés sur des clés API d'IA",
    },
    subtitle: {
      en: "Business risk, big tech competition, security, and cost — the reasons behind my choice",
      fr: "Risque commercial, concurrence des géants de la tech, sécurité et coûts — les raisons de mon choix",
    },
    date: "2026-02-24",
    author: "Fabien Chung",
    coverImage: "/images/blog/ai-api-keys/cover.png",
    content: {
      en: `Right now, it feels like every new SaaS product hitting the market is just a thin wrapper around an OpenAI or Anthropic API key. The barrier to entry has never been lower, which means the noise has never been louder. Slapping a sleek UI onto a Large Language Model (LLM) might get you a working prototype in a weekend, but building a sustainable, defensible business around it is a completely different story. 

While the hype cycle pushes founders to integrate generative AI into everything, here is why I flat-out refuse to build SaaS products where a third-party AI API key is the core value proposition.

## You're Building on Someone Else's Foundation

When your entire product is just a prompt interface for an external LLM, you have absolutely no defensible moat. You aren't building a proprietary technology; you are renting a brain from Big Tech. 

The velocity of companies like OpenAI, Anthropic, and Google is staggering. They are shipping updates, expanding context windows, and releasing native features at a pace that indie hackers and small startups simply cannot match. If your SaaS exists solely to summarize documents, generate marketing copy, or chat with PDFs, you are just one platform update away from obsolescence. Big tech can—and will—replicate, deprecate, or absorb your product's entire feature set overnight. You are building your castle on rented land, and the landlord can evict you at any time.

## The Business Risk is Real Before You Even Have Users

Traditional software unit economics make sense: you pay a relatively fixed cost for servers, and as you scale, your margins improve. AI API wrappers flip this model upside down in the worst way possible. 

With API-based AI SaaS, you are paying per token. Every single time a user interacts with your core feature, you bleed cash. Before you even have the chance to validate product-market fit or figure out if users actually *want* your SaaS, your costs are scaling linearly with usage. I prefer to spend as little as possible before reaching scale. Tying my baseline operational costs to a variable, unpredictable third-party meter from day one is a massive, unnecessary business risk.

## A Security Surface You Don't Control

![A massive corporate server vault towering over a small indie developer's laptop, symbolizing the risk of relying on Big Tech AI providers](/images/blog/ai-api-keys/security.png)

Managing an application that relies heavily on AI API keys introduces a host of security nightmares. Exposing your core product to the public means you are constantly battling rate-limit abuse, malicious actors, and prompt injection attacks. 

If someone figures out how to jailbreak your prompt or spam your endpoints, they aren't just breaking your app—they are running up your API bill. You are held entirely responsible for the financial and reputational fallout, yet you have to rely entirely on a third party's security posture to actually patch the underlying model. Handing over control of your application's fundamental logic and security to an external API is a liability I am not willing to accept.

## What I Do Instead

This doesn't mean I ignore AI entirely; it just means I treat it appropriately. Instead of wrapping an API and praying for a business, I take a different approach:

* **Validate the core problem first:** Build lean. Create software that solves a painful, real-world problem using traditional logic, databases, and code. If the product cannot survive without an LLM, it probably isn't a strong business to begin with.
* **Treat AI as a feature, not the product:** Once the core software has users, traction, and predictable revenue, you can carefully layer AI in to enhance the user experience—not to replace the core functionality. 
* **Leverage open-source and local models:** When AI is genuinely required to solve a problem, I look toward open-source models that can be self-hosted. Controlling the infrastructure means controlling the costs, the data privacy, and the execution.

If your product can be destroyed by a single API pricing change or a new ChatGPT feature, you haven't built a business. You've built a vulnerability.`,
      fr: `En ce moment, on a l'impression que chaque nouveau SaaS qui arrive sur le marché n'est qu'une simple surcouche ("wrapper") autour d'une clé API OpenAI ou Anthropic. La barrière à l'entrée n'a jamais été aussi basse, ce qui signifie que le bruit n'a jamais été aussi fort. Plaquer une belle interface utilisateur sur un grand modèle de langage (LLM) peut vous donner un prototype fonctionnel en un week-end, mais construire une entreprise pérenne et défendable autour de cela est une toute autre histoire.

Alors que la tendance pousse les fondateurs à intégrer l'IA générative partout, voici pourquoi je refuse catégoriquement de créer des produits SaaS dont la proposition de valeur principale repose sur la clé API d'une IA tierce.

## Vous construisez sur les fondations de quelqu'un d'autre

Lorsque l'intégralité de votre produit n'est qu'une interface à prompts pour un LLM externe, vous n'avez absolument aucun avantage concurrentiel défendable. Vous ne construisez pas une technologie propriétaire ; vous louez un cerveau aux géants de la tech ("Big Tech").

La vélocité d'entreprises comme OpenAI, Anthropic et Google est stupéfiante. Elles déploient des mises à jour, étendent les fenêtres de contexte et publient des fonctionnalités natives à un rythme que les "indie hackers" et les petites startups ne peuvent tout simplement pas égaler. Si votre SaaS n'existe que pour résumer des documents, générer du texte marketing ou discuter avec des PDF, vous êtes à une mise à jour d'être obsolète. La Big Tech peut — et va — reproduire, déprécier ou absorber l'ensemble des fonctionnalités de votre produit du jour au lendemain. Vous construisez votre château sur un terrain loué, et le propriétaire peut vous expulser à tout moment.

## Le risque commercial est réel avant même d'avoir des utilisateurs

L'économie unitaire des logiciels traditionnels a du sens : vous payez un coût relativement fixe pour les serveurs et, à mesure que vous grandissez, vos marges s'améliorent. Les "wrappers" d'API d'IA renversent ce modèle de la pire façon possible.

Avec un SaaS d'IA basé sur une API, vous payez au token. Chaque fois qu'un utilisateur interagit avec votre fonctionnalité principale, vous perdez de l'argent. Avant même d'avoir la chance de valider l'adéquation produit-marché ou de découvrir si les utilisateurs *veulent* vraiment de votre SaaS, vos coûts augmentent de façon linéaire avec l'utilisation. Je préfère dépenser le moins possible avant d'atteindre une taille critique. Lier mes coûts opérationnels de base à un compteur tiers variable et imprévisible dès le premier jour est un risque commercial énorme et inutile.

## Une surface de sécurité que vous ne contrôlez pas

![A massive corporate server vault towering over a small indie developer's laptop, symbolizing the risk of relying on Big Tech AI providers](/images/blog/ai-api-keys/security.png)

Gérer une application qui s'appuie fortement sur des clés API d'IA introduit son lot de cauchemars en matière de sécurité. Exposer votre produit principal au public signifie que vous vous battez constamment contre les abus de limites de requêtes (rate-limit), les acteurs malveillants et les attaques par injection de prompts.

Si quelqu'un découvre comment contourner (jailbreak) votre prompt ou spammer vos API, il ne fait pas que casser votre application — il fait grimper votre facture d'API. Vous êtes tenu entièrement responsable des retombées financières et réputationnelles, mais vous devez vous fier totalement à la posture de sécurité d'un tiers pour corriger le modèle sous-jacent. Céder le contrôle de la logique fondamentale et de la sécurité de votre application à une API externe est une responsabilité que je ne suis pas prêt à accepter.

## Ce que je fais à la place

Cela ne signifie pas que j'ignore totalement l'IA ; cela signifie simplement que je l'utilise de manière appropriée. Au lieu d'envelopper une API et de prier pour en faire un business, j'adopte une approche différente :

* **Validez d'abord le problème principal :** Créez des logiciels de façon "lean" (frugale). Résolvez un vrai problème concret en utilisant la logique traditionnelle, des bases de données et du code. Si le produit ne peut survivre sans un LLM, ce n'est probablement pas une affaire solide à la base.
* **Traitez l'IA comme une fonctionnalité, pas comme le produit :** Une fois que le logiciel principal a des utilisateurs, de la traction et des revenus prévisibles, vous pouvez prudemment ajouter une couche d'IA pour améliorer l'expérience utilisateur — et non pour remplacer la fonctionnalité principale.
* **Tirez parti des modèles open source et locaux :** Lorsque l'IA est véritablement nécessaire pour résoudre un problème, je me tourne vers des modèles open source qui peuvent être auto-hébergés. Contrôler l'infrastructure signifie contrôler les coûts, la confidentialité des données et l'exécution.

Si votre produit peut être détruit par un simple changement de tarification d'API ou une nouvelle fonctionnalité de ChatGPT, vous n'avez pas construit une entreprise. Vous avez construit une vulnérabilité.`,
    },
  },
];
