---
title: État du projet
description: Où en est topos aujourd'hui, et ce que ce site va devenir.
sidebar:
  order: 0
---

topos est un service de tracking spatial UWB pour le spectacle vivant, conçu par un régisseur technique du [Douze Dix-Huit](https://douzedixhuit.ch) et utilisé là-bas en production. C'est un **logiciel en beta qui tourne sur de vrais spectacles**, en développement actif.

Ce site est en construction. Voici ce qu'il contiendra, dans l'ordre d'arrivée :

1. **Docs** — le guide complet, de l'achat du matériel à la calibration en salle. Importé directement depuis le [dépôt topos](https://github.com/yokoul/topos/tree/main/docs), pour qu'il ne dérive jamais du code.
2. **Matériel** — la liste d'achat, les boîtiers à imprimer (STL et sources OpenSCAD), le firmware des ancres.
3. **Tutos** — des vidéos courtes : le tracking en cinq minutes, la calibration au télémètre.
4. **Journal et communauté** — un devlog, les Discussions GitHub, une roadmap publique.

D'ici là, tout vit dans le dépôt : code, firmware, guide, et un mode `--simulate` qui fait tourner toute la chaîne sans matériel.

```bash
git clone https://github.com/yokoul/topos.git && cd topos
python3 -m venv .venv && source .venv/bin/activate
pip install -e ".[dev]"
python -m topos.main --simulate circle   # puis ouvrir http://localhost:7070
```

## Licences

Le code est sous MIT. Le matériel (boîtiers, schémas) sous CERN-OHL-P v2. La documentation et les médias sous CC BY-SA 4.0.
