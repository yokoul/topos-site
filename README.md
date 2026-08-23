# topos.red

Site public de [topos](https://github.com/yokoul/topos) — tracking UWB open hardware pour le spectacle vivant.

Astro + Starlight, statique, trois langues (en · fr · zh), servi par Caddy sur le serveur `always` derrière un tunnel Cloudflare. Un push sur `main` est en ligne dans les 5 minutes.

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

Pull-based sur `always` : voir [`ops/README.md`](ops/README.md). GitHub Actions ne fait que vérifier le build.

Pour masquer le site aux moteurs (avant une refonte, par exemple) : `NOINDEX = true` dans `astro.config.mjs` et `Disallow: /` dans `public/robots.txt`.

## Licences

Code du site : MIT. Contenu (textes, images, vidéos) : CC BY-SA 4.0. Voir `LICENSE` et `LICENSE-CONTENT`.
