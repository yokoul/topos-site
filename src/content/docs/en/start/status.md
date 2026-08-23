---
title: Project status
description: Where topos stands today, and what this site will become.
sidebar:
  order: 0
---

topos is a UWB spatial tracking service for live performance, built by a technical stage manager at [Douze Dix-Huit](https://tech.ledouzedixhuit.ch/) and used there in production. It is **beta software running on real shows**, under active development.

This site is being built. What is already here, and what is coming:

- **Docs** — the complete guide, from buying the hardware to calibrating in the venue, imported straight from the [topos repository](https://github.com/yokoul/topos/tree/main/docs) so it never drifts from the code. English for now; French and Chinese translations to come.
- **[Hardware](/en/hardware/)** — shopping list, printable cases (STL and OpenSCAD sources), anchor firmware.
- *Coming* — tutorials (short videos: tracking in five minutes, laser-meter calibration), workshop photos, a devlog, GitHub Discussions, a public roadmap.

Everything else lives in the repository, including an `--simulate` mode that runs the whole chain without any hardware:

```bash
git clone https://github.com/yokoul/topos.git && cd topos
python3 -m venv .venv && source .venv/bin/activate
pip install -e ".[dev]"
python -m topos.main --simulate circle   # then open http://localhost:7070
```

## Licences

Code is MIT. Hardware (cases, schematics) is CERN-OHL-P v2. Documentation and media are CC BY-SA 4.0.
