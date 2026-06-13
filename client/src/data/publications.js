export const PUBLICATIONS = [
  {
    id: 1,
    format: "Tutoriel long",
    titre: "Git & GitHub pour débutants — de zéro au premier push",
    duree: "22 min",
    description: "On part de zéro : installation de Git, premier dépôt, commits, branches et push sur GitHub.",
    contenuTextuel: `Intro : « Si t'as jamais utilisé Git, cette vidéo est pour toi. »
→ Pourquoi versionner son code ?
→ Installation Git + config (name, email)
→ git init, git add, git commit
→ Créer un dépôt GitHub et faire le premier push
→ Les branches : créer, switcher, merger
→ Outro : « La prochaine fois on voit les Pull Requests »`,
    contenuVisuel: "Screencast terminal + VS Code. Texte surligné à chaque commande tapée. Thumbnail : fond sombre, logo Git, titre blanc en gras.",
    maquette: "Thumbnail 1280×720 : fond #1e1e2e, logo Git centré, titre 'Git pour débutants' en blanc, badge '22 min' en bas à droite.",
    justification: "Format long car Git demande une pratique guidée. La cible débutante a besoin de voir chaque étape. Cohérent avec la ligne pédagogique de TutoBox.",
  },
  {
    id: 2,
    format: "Short",
    titre: "var vs let vs const en 45 secondes",
    duree: "< 60 sec",
    description: "Une astuce rapide pour ne plus jamais confondre les trois façons de déclarer une variable en JavaScript.",
    contenuTextuel: `« var c'est old school, évite-le. let c'est pour les valeurs qui changent. const c'est pour ce qui ne bouge pas. Retiens ça et t'es bon. »`,
    contenuVisuel: "Écran splitté : 3 colonnes par mot-clé. Code animé ligne par ligne. Sous-titres grands et lisibles. Format vertical 9:16.",
    maquette: "Vidéo verticale 1080×1920. Fond sombre. 3 blocs : var=rouge, let=jaune, const=vert. Texte centré en gros.",
    justification: "Sujet simple résumable en une phrase — parfait pour YouTube Shorts et capter de nouveaux abonnés.",
  },
  {
    id: 3,
    format: "Récap",
    titre: "Récap semaine 8 — Les bases de React",
    duree: "5 min",
    description: "Résumé des deux vidéos de la semaine sur React : composants, useState, useEffect.",
    contenuTextuel: `Intro : « Cette semaine on a vu React, voilà ce que t'as appris. »
→ Rappel vidéo 1 : les composants et les props
→ Rappel vidéo 2 : useState et useEffect
→ Les 3 points clés à retenir
→ Aperçu de la semaine prochaine
Outro : « Like si t'as tout compris, commente si t'as une question. »`,
    contenuVisuel: "Montage dynamique avec extraits des 2 vidéos de la semaine. Texte récap affiché à l'écran. Ton détendu, pas de slides.",
    maquette: "Thumbnail : fond dégradé indigo, logo React, 'RÉCAP S8' en gros, sous-titre 'React les bases' en petit.",
    justification: "Crée un rendez-vous hebdomadaire et fidélise l'audience. Aide les retardataires à rattraper sans tout regarder.",
  },
  {
    id: 4,
    format: "Visuelle",
    titre: "Grid vs Flexbox — quand utiliser quoi ?",
    duree: "4 min",
    description: "Vidéo 100% visuelle avec schémas animés pour comprendre la différence entre CSS Grid et Flexbox.",
    contenuTextuel: `→ 'Flexbox = 1 dimension (ligne OU colonne)'
→ 'Grid = 2 dimensions (lignes ET colonnes)'
→ Exemples : navbar → Flexbox / dashboard → Grid
→ Règle simple : 'composant = Flexbox, layout = Grid'`,
    contenuVisuel: "Motion design : boîtes CSS qui s'organisent en live. Palette TutoBox (indigo/blanc). 100% screen + animations, pas de visage.",
    maquette: "Thumbnail : fond blanc, deux colonnes — 'FLEX' en indigo, 'GRID' en violet. Flèche entre les deux.",
    justification: "Certains concepts sont mieux compris visuellement. Diversifie la chaîne et touche les apprenants visuels.",
  },
];