#!/bin/bash
# Déploiement topos.red sur always — pull + build atomique.
#
#   ops/deploy.sh           # ne rebuild que si origin/main a bougé
#   ops/deploy.sh --force   # rebuild quoi qu'il arrive
#
# Caddy sert ~/apps/topos-site/dist ; on construit dans dist.next puis on
# bascule par rename, pour ne jamais servir un site à moitié construit.
# Lancé par le LaunchDaemon ch.oul.topos-site (toutes les 5 min + kickstart
# depuis dash.yokoul.xyz).
set -u
export PATH="/Users/may/.local/share/fnm/aliases/default/bin:/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin"
cd "$(dirname "$0")/.." || exit 1

log() { printf '%s topos-site: %s\n' "$(date '+%Y-%m-%d %H:%M:%S')" "$*"; }

# Battement de cœur : le dashboard n'a aucun moyen de dater le dernier passage
# d'un job périodique (launchctl ne donne que `runs`), donc on l'écrit nous-mêmes
# à chaque passage réussi — y compris « rien de neuf ». Un fichier qui vieillit
# au-delà de 3 intervalles = job mort, pastille rouge (cf. ch.oul.climate-poll).
HEARTBEAT="${HOME:-/Users/may}/Library/Logs/apps/topos-site.last-run"
beat() { mkdir -p "$(dirname "$HEARTBEAT")" && : >"$HEARTBEAT"; }

git fetch -q origin main || { log "git fetch échoué"; exit 1; }
local_rev=$(git rev-parse HEAD)
remote_rev=$(git rev-parse origin/main)

if [ "$local_rev" = "$remote_rev" ] && [ "${1:-}" != "--force" ] && [ -d dist ]; then
	beat
	exit 0 # rien de neuf, silence
fi

log "déploiement ${local_rev:0:7} → ${remote_rev:0:7}"
git pull -q --ff-only origin main || { log "git pull échoué"; exit 1; }
npm ci --no-audit --no-fund --silent || { log "npm ci échoué"; exit 1; }

# import des docs depuis le dépôt topos (= hook prebuild, qu'on n'a pas ici car
# on appelle astro directement pour choisir le dossier de sortie)
node scripts/sync-docs.mjs >/tmp/topos-site-build.log 2>&1 || {
	log "import des docs échoué — voir /tmp/topos-site-build.log"
	exit 1
}
rm -rf dist.next
npx astro build --outDir dist.next >>/tmp/topos-site-build.log 2>&1 || {
	log "build échoué — voir /tmp/topos-site-build.log"
	tail -20 /tmp/topos-site-build.log
	exit 1
}

[ -d dist ] && mv dist dist.prev
mv dist.next dist
rm -rf dist.prev
beat
log "en ligne : $(git rev-parse --short HEAD) — $(find dist -name '*.html' | wc -l | tr -d ' ') pages"
