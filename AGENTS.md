# AGENTS.md — topos-site (topos.red)

Site vitrine et documentation de **Topos** (tracking UWB pour le spectacle vivant).
Le code du produit vit dans le dépôt `yokoul/topos` — ici, uniquement le site.
`CLAUDE.md` est un lien symbolique vers ce fichier.

## Stack et décisions figées

- **Astro + Starlight**, trois locales : `en` (défaut), `fr`, `zh`. Zéro framework JS côté client.
- **Thème clair uniquement** : `ThemeProvider.astro` fixe `data-theme="light"`, sans script de bascule. Ne pas réintroduire de mode sombre.
- Direction visuelle « Plan de scène lisible » : encre/papier/point rouge, styles dans `src/styles/topos.css` (classes `tp-*`), polices auto-hébergées.
- Composants Starlight surchargés (Hero avec schéma de trilatération, Header, Footer…) dans `src/components/`.

## Contenu

- **Toute modification de contenu se fait dans les trois langues** — `src/content/docs/{en,fr,zh}/`. Pas de page qui n'existe qu'en français.
- Les pages `start/`, `venue/`, `reference/` sont **générées** par `scripts/sync-docs.mjs` depuis le dépôt topos (guide, auto-calibration, README, firmware) et ignorées par git : **ne jamais les éditer ici**, corriger la source dans `yokoul/topos`. Le script tourne en hook `prebuild`/`predev`.
- Pages éditées ici : `index`, `hardware`, `gallery`, `project`, `community`, `journal`.

## Images

- Captures d'écran : `src/assets/screens/*.png`, affichées par `<Shot name="…" alt="…" title="…">légende</Shot>`. Capture portrait : l'entourer de `<div class="tp-portrait">`.
- Photos d'atelier : `src/assets/photos/*.jpg`, affichées par `<Photo …>` (même API). Avant d'ajouter une photo : redimensionner à 2000 px max et **retirer l'EXIF** (sharp, déjà en dépendance, fait les deux par défaut).
- Toujours un `alt` descriptif, traduit dans chaque locale.

## Build, test, déploiement

```bash
npm run dev       # sync-docs + serveur local
npm run build     # sync-docs + build complet → dist/ (à lancer avant de commiter)
```

- Un push sur `main` est **en ligne dans les 5 minutes** : le serveur `always` (daemon `ch.oul.topos-site`) fait pull + build atomique. Détail dans `ops/README.md`. Ne pousser que du contenu prêt à être publié.
- Commits en français, unités logiques, comme l'historique existant.
