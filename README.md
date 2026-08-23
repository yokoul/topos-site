# topos.red

Site public de [topos](https://github.com/yokoul/topos) — tracking UWB open hardware pour le spectacle vivant.

Astro + Starlight, statique, trois langues (en · fr · zh), déployé sur Alwaysdata derrière Cloudflare à chaque push sur `main`.

## Développer

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # → dist/
```

Le contenu est dans `src/content/docs/<locale>/`. L'anglais est la langue de repli : une page absente en `fr/` ou `zh/` affiche la version anglaise avec un bandeau.

Les docs techniques ne sont pas rédigées ici : `scripts/sync-docs.mjs` les importe depuis le dépôt topos (`docs/guide.md`, `docs/auto_calibration.md`). Pour corriger le guide, corrigez-le là-bas.

## Identité

Thème « Plan de scène, édition lisible » — tokens dans `src/styles/topos.css`. Site clair uniquement. Polices auto-hébergées (Fontsource) : Bricolage Grotesque pour les titres, Atkinson Hyperlegible pour le texte.

## Déploiement

`.github/workflows/deploy.yml` construit à chaque push et PR, et déploie `main` par rsync SSH. Secrets attendus dans l'environnement `production` :

| Secret | Valeur |
|---|---|
| `ALWAYSDATA_SSH_KEY` | clé privée de déploiement (ed25519) |
| `ALWAYSDATA_HOST` | `ssh-<compte>.alwaysdata.net` |
| `ALWAYSDATA_USER` | `<compte>` ou `<compte>_deploy` |
| `ALWAYSDATA_PATH` | `/home/<compte>/www/topos.red` |

Le site est en `noindex` tant que `NOINDEX = true` dans `astro.config.mjs` et que `public/robots.txt` interdit tout. Les deux se retirent au lancement.

## Licences

Code du site : MIT. Contenu (textes, images, vidéos) : CC BY-SA 4.0. Voir `LICENSE` et `LICENSE-CONTENT`.
