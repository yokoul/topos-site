---
title: Topos s'ouvre
description: Le dépôt passe en public, v0.1.0 est taguée, topos.red est en ligne. Ce qu'il y a dedans, et ce qui manque encore.
date: 2026-08-23
author: Yan
template: doc
---

Aujourd'hui le dépôt de Topos passe en public, la première release est taguée, et ce site existe. Voilà ce que ça veut dire concrètement.

## Ce qui est en ligne

- **Le code**, sous MIT : tracking 2D/3D, sorties PSN, OSC, ADM-OSC, WebSocket, calibration au télémètre, dashboard, mode simulation pour tester sans matériel. 296 tests, CI sur Python 3.11 et 3.12.
- **Le firmware** des ancres et **les boîtiers** en OpenSCAD + STL, sous CERN-OHL-P.
- **Le guide complet**, de la commande des modules à la calibration en salle, importé ici depuis le dépôt à chaque construction du site — il ne peut pas dériver du code.
- **La roadmap**, y compris ce qu'on ne fera pas.

## Ce qui manque

Les photos. Les boîtiers imprimés, les ancres posées sur le plateau, un tag sur un performer. Elles arrivent — il faut être au théâtre pour les faire correctement. Les vidéos aussi.

Les traductions du guide en français et en chinois. L'anglais est là ; le reste vient page par page.

## Ce qu'on sait déjà devoir changer

Topos tourne en production au Douze Dix-Huit depuis le printemps. Deux choses sont ressorties des premiers spectacles.

Le **setup** demande encore trop d'étapes pour tenir la promesse des cinq minutes. On a une liste ; elle deviendra des issues.

L'**Art-Net** — piloter des projecteurs motorisés directement depuis Topos — a marché en passant par Soma, et a échoué en direct. Gérer les fixtures côté Topos empile des couches d'erreur, et ce n'est pas le rôle d'un traducteur spatial. On va probablement recentrer Topos sur ce qu'il fait bien, les positions, et laisser le pilotage des projecteurs à la console ou à Soma. Rien n'est retiré tant que la voie n'est pas claire.

## Pourquoi ouvrir maintenant

Parce que ça marche, pas parce que c'est fini. Un théâtre de quartier qui veut du tracking n'a pas le budget des solutions fermées, et n'a pas besoin de leur complexité. Si Topos peut servir à un autre plateau que le nôtre, autant le savoir tôt — et autant que ce plateau nous dise ce qui cloche.

Les questions vont dans les [Discussions](https://github.com/yokoul/topos/discussions), les retours de salle dans un [rapport de salle](https://github.com/yokoul/topos/issues/new?template=venue-report.yml).
