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
| **Heartbeat** | `~/Library/Logs/apps/topos-site.last-run`, touché à chaque passage réussi |

Un push sur `main` est en ligne dans les 5 minutes. « Lancer » dans le dashboard force un rebuild immédiat.

## Statut dans le dashboard

Ce daemon n'est pas un serveur : il sort dès son travail fait, donc il n'a aucun
PID entre deux passages. Le dashboard le traite comme un **job périodique**
(`"kind": "periodic"` dans `apps.config.json`) et juge sa santé sur la fraîcheur
du fichier `heartbeatPath` plutôt que sur la présence d'un process :

- **vert** — dernier passage il y a moins de 3 intervalles (15 min) et sorti en 0 ;
- **rouge** — plus aucun passage depuis 15 min (job mort), dernier passage en échec, ou daemon déchargé ;
- **jaune** — `kind: periodic` sans `heartbeatPath` : la fraîcheur n'est pas suivie.

C'est `deploy.sh` qui écrit ce heartbeat (fonction `beat`), **y compris quand il
n'y a rien à déployer** — sans quoi le fichier ne serait touché qu'aux rares
rebuilds et le job passerait pour mort. Avant cette bascule, topos-site
s'affichait en rouge en permanence alors que le site tournait.

## Cloudflare (zone topos.red)

Zero Trust → Networks → Tunnels → le tunnel d'always → Public Hostname :
`topos.red` → `http://localhost:8080`, puis `www.topos.red` → idem.
Cloudflare crée les CNAME vers `<id>.cfargotunnel.com` tout seul ; ne pas créer d'autre enregistrement A/CNAME sur ces noms.

## Lancé le 23 août 2026

Site indexable, repos `topos` et `topos-site` publics. Pour masquer à nouveau : `NOINDEX = true` + `Disallow: /`.
