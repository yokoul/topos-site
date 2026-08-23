---
title: Project status
description: Where topos stands today, and what this site will become.
sidebar:
  order: 0
---

topos is a UWB spatial tracking service for live performance, built by a technical stage manager at [Douze Dix-Huit](https://douzedixhuit.ch) and used there in production. It is **beta software running on real shows**, under active development.

This site is being built. Here is what it will hold, in order of arrival:

1. **Docs** — the complete guide, from buying the hardware to calibrating in the venue. Imported straight from the [topos repository](https://github.com/yokoul/topos/tree/main/docs), so it never drifts from the code.
2. **Hardware** — the shopping list, the printable cases (STL and OpenSCAD sources), the anchor firmware.
3. **Tutorials** — short videos: tracking in five minutes, laser-meter calibration.
4. **Journal and community** — a devlog, GitHub Discussions, a public roadmap.

Until then, everything lives in the repository: code, firmware, guide, and an `--simulate` mode that runs the whole chain without any hardware.

```bash
git clone https://github.com/yokoul/topos.git && cd topos
python3 -m venv .venv && source .venv/bin/activate
pip install -e ".[dev]"
python -m topos.main --simulate circle   # then open http://localhost:7070
```

## Licences

Code is MIT. Hardware (cases, schematics) is CERN-OHL-P v2. Documentation and media are CC BY-SA 4.0.
