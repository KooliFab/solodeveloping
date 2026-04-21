#!/bin/bash
cat << 'PATCH' > temp.patch
--- src/data/shortArticles.js
+++ src/data/shortArticles.js
@@ -10,8 +10,8 @@
     id: 1,
     title: {
       en: "Flutter 3.24 is now available!",
       fr: "Flutter 3.24 est maintenant disponible !"
     },
     content: {
-      en: "Flutter 3.24 brings exciting new features including early access to the new Flutter GPU API for advanced graphics, improved web multi-window support, and iOS 18 readiness. The framework continues its push towards better performance and more powerful capabilities across all platforms.",
-      fr: "Flutter 3.24 apporte de nouvelles fonctionnalités passionnantes, notamment un accès anticipé à la nouvelle API Flutter GPU pour des graphismes avancés, une prise en charge améliorée du multi-fenêtrage web et la préparation pour iOS 18. Le framework poursuit sa poussée vers de meilleures performances et des capacités plus puissantes sur toutes les plateformes."
+      en: "Flutter 3.24 brings exciting new features including early access to the new Flutter GPU API for advanced graphics, improved web multi-window support, and iOS 18 readiness. The framework continues its push towards better performance and more powerful capabilities across all platforms.\n\n![Flutter Logo](https://storage.googleapis.com/cms-storage-bucket/0dbfcc7a59cd1cf16282.png)",
+      fr: "Flutter 3.24 apporte de nouvelles fonctionnalités passionnantes, notamment un accès anticipé à la nouvelle API Flutter GPU pour des graphismes avancés, une prise en charge améliorée du multi-fenêtrage web et la préparation pour iOS 18. Le framework poursuit sa poussée vers de meilleures performances et des capacités plus puissantes sur toutes les plateformes.\n\n![Flutter Logo](https://storage.googleapis.com/cms-storage-bucket/0dbfcc7a59cd1cf16282.png)"
     },
PATCH
patch src/data/shortArticles.js < temp.patch
rm temp.patch
