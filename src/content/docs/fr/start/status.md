---
title: État du projet
description: Où en est topos aujourd'hui, et ce que ce site va devenir.
sidebar:
  order: 0
---

topos est un service de tracking spatial UWB pour le spectacle vivant, conçu par un régisseur technique du [Douze Dix-Huit](https://douzedixhuit.ch) et utilisé là-bas en production. C'est un **logiciel en beta qui tourne sur de vrais spectacles**, en développement actif.

Ce site est en construction. Ce qui est déjà là, et ce qui arrive :

- **Docs** — le guide complet, de l'achat du matériel à la calibration en salle, importé directement depuis le [dépôt topos](https://github.com/yokoul/topos/tree/main/docs) pour qu'il ne dérive jamais du code. En anglais pour l'instant ; traductions française et chinoise à venir.
- **[Matériel](/fr/hardware/)** — liste d'achat, boîtiers à imprimer (STL et sources OpenSCAD), firmware des ancres.
- *À venir* — tutos (vidéos courtes : le tracking en cinq minutes, la calibration au télémètre), photos d'atelier, journal, Discussions GitHub, roadmap publique.

Le reste vit dans le dépôt, dont un mode `--simulate` qui fait tourner toute la chaîne sans matériel :

```bash
git clone https://github.com/yokoul/topos.git && cd topos
python3 -m venv .venv && source .venv/bin/activate
pip install -e ".[dev]"
python -m topos.main --simulate circle   # puis ouvrir http://localhost:7070
```

## Licences

Le code est sous MIT. Le matériel (boîtiers, schémas) sous CERN-OHL-P v2. La documentation et les médias sous CC BY-SA 4.0.
