# Déploiement topos.red sur `always`

Archi maison : `Cloudflare → tunnel cloudflared → Caddy :8080 → ~/apps/topos-site/dist`.
Pas de rsync, pas de serveur applicatif : Caddy sert les fichiers construits sur place.

| | |
|---|---|
| **Repo** | `~/apps/topos-site` (clone de `yokoul/topos-site`, branche `main`) |
| **Build** | `ops/deploy.sh` — pull + `astro build --outDir dist.next` + bascule atomique |
| **Daemon** | `ch.oul.topos-site` (`ops/ch.oul.topos-site.plist`) — au boot puis toutes les 5 min |
| **Route edge** | bloc `@topos` dans `~/apps/edge-proxy/Caddyfile` (`ops/Caddyfile.topos.snippet`) |
| **Hostnames** | `topos.red`, `www.topos.red` (www → apex) — Public Hostnames du tunnel → `http://localhost:8080` |
| **Dashboard** | entrée `ch.oul.topos-site` (`ops/apps-dashboard.entry.json`) : Redeploy / Git pull / Maintenance |
| **Maintenance** | flag `~/apps/edge-proxy/flags/topos-site.maintenance` → 503 + page générique |
| **Logs** | `~/Library/Logs/apps/topos-site.{out,err}.log`, build dans `/tmp/topos-site-build.log` |

Un push sur `main` est en ligne dans les 5 minutes. « Redeploy » dans le dashboard force un rebuild immédiat.

## Cloudflare (zone topos.red)

Zero Trust → Networks → Tunnels → le tunnel d'always → Public Hostname :
`topos.red` → `http://localhost:8080`, puis `www.topos.red` → idem.
Cloudflare crée les CNAME vers `<id>.cfargotunnel.com` tout seul ; ne pas créer d'autre enregistrement A/CNAME sur ces noms.

## Lancement (phase 4)

`NOINDEX = false` dans `astro.config.mjs`, `public/robots.txt` → `Allow: /`, et passer le repo GitHub en public.
