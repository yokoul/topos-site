#!/usr/bin/env node
/**
 * Importe la documentation depuis le dépôt topos — source de vérité unique.
 *
 *   node scripts/sync-docs.mjs                       # depuis GitHub (main)
 *   TOPOS_REF=site/phase-1 node scripts/sync-docs.mjs # autre branche
 *   TOPOS_DIR=../topos node scripts/sync-docs.mjs    # depuis un clone local
 *
 * Lancé automatiquement avant `astro build` et `astro dev` (scripts npm).
 * Les fichiers produits sont ignorés par git (voir .gitignore).
 *
 * - docs/guide.md est découpé par chapitre (## N. Titre) en une page par chapitre,
 *   réparties entre start/ (1–5), venue/ (6–8) et reference/ (9). Les ### deviennent
 *   des ##, le H1 et la table des matières manuelle sont retirés.
 * - docs/auto_calibration.md (rédigé en français) est publié tel quel en fr/ et,
 *   en attendant une traduction, en en/ avec un encart.
 * - README.md : sections Outputs + API → reference/outputs-api.md
 * - firmware/README.md → reference/firmware.md
 */
import { mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const REF = process.env.TOPOS_REF ?? 'main';
const RAW = `https://raw.githubusercontent.com/yokoul/topos/${REF}`;
const LOCAL = process.env.TOPOS_DIR;
const OUT = 'src/content/docs';
const BANNER = `# Généré par scripts/sync-docs.mjs depuis yokoul/topos@${REF} — ne pas éditer ici.`;

async function source(path) {
	if (LOCAL) return readFile(join(LOCAL, path), 'utf8');
	const res = await fetch(`${RAW}/${path}`);
	if (!res.ok) throw new Error(`${path}: HTTP ${res.status}`);
	return res.text();
}

function frontmatter(fields) {
	const lines = ['---'];
	for (const [k, v] of Object.entries(fields)) {
		if (v === undefined) continue;
		if (typeof v === 'object') {
			lines.push(`${k}:`);
			for (const [k2, v2] of Object.entries(v)) lines.push(`  ${k2}: ${JSON.stringify(v2)}`);
		} else lines.push(`${k}: ${JSON.stringify(v)}`);
	}
	lines.push(BANNER, '---', '');
	return lines.join('\n');
}

async function emit(path, fm, body) {
	const dest = join(OUT, path);
	await mkdir(dirname(dest), { recursive: true });
	await writeFile(dest, frontmatter(fm) + body.trim() + '\n');
	console.log(`✓ ${dest}`);
}

/** Nettoyages communs : séparateurs horizontaux, blocs de citation « Important » → aside. */
function clean(md) {
	return md
		.replace(/^---\s*$/gm, '')
		.replace(/^> \*\*(Important|Note|Warning|Tip)\*\*:?\s*(.*)$/gm, (_, kind, text) => {
			const type = { Important: 'caution', Note: 'note', Warning: 'danger', Tip: 'tip' }[kind];
			return `:::${type}\n${text}\n:::`;
		});
}

/** Remonte les titres d'un niveau (### → ##) et retire la numérotation « 7.1 ». */
function promote(md) {
	return md.replace(/^(#{3,6}) (?:\d+\.\d+\s+)?/gm, (_, h) => h.slice(1) + ' ');
}

// ── guide.md → pages par chapitre ───────────────────────────────────────────
const CHAPTERS = {
	1: { dir: 'start', file: '01-hardware', order: 1 },
	2: { dir: 'start', file: '02-anchors', order: 2 },
	3: { dir: 'start', file: '03-tags', order: 3 },
	4: { dir: 'start', file: '04-install', order: 4 },
	5: { dir: 'start', file: '05-first-launch', order: 5 },
	6: { dir: 'venue', file: '01-configure-tags', order: 1 },
	7: { dir: 'venue', file: '02-terrain-calibration', order: 2 },
	8: { dir: 'venue', file: '03-production', order: 3 },
	9: { dir: 'reference', file: '03-troubleshooting', order: 3 },
};

const guide = await source('docs/guide.md');
const parts = guide.split(/^## (?=\d+\. )/m).slice(1); // ignore H1 + TOC
for (const part of parts) {
	const m = part.match(/^(\d+)\. (.+)\n([\s\S]*)$/);
	if (!m) continue;
	const [, n, title, rest] = m;
	const ch = CHAPTERS[Number(n)];
	if (!ch) continue;
	const body = promote(clean(rest));
	const firstPara = body.split('\n').find((l) => l.trim() && !l.startsWith('#') && !l.startsWith('|'));
	await emit(`en/${ch.dir}/${ch.file}.md`, {
		title,
		description: firstPara?.replace(/[*`]/g, '').slice(0, 150),
		sidebar: { order: ch.order },
	}, body);
}

// ── auto_calibration.md (français) ──────────────────────────────────────────
const autocal = await source('docs/auto_calibration.md');
const autocalTitle = autocal.match(/^# (.+)$/m)?.[1] ?? 'Auto-calibration';
const autocalBody = clean(autocal.replace(/^# .*\n/, ''));
await emit('fr/venue/04-auto-calibration.md', {
	title: autocalTitle,
	description: 'Calibration automatique des projecteurs motorisés par relevé fiduciel.',
	sidebar: { order: 4 },
}, autocalBody);
await emit('en/venue/04-auto-calibration.md', {
	title: 'Fixture auto-calibration',
	description: 'Point-and-record calibration of moving heads. Currently documented in French.',
	sidebar: { order: 4 },
}, `:::note[In French for now]\nThis page is currently available in French only. A translation is welcome — [edit it on GitHub](https://github.com/yokoul/topos/blob/main/docs/auto_calibration.md).\n:::\n\n${autocalBody}`);

// ── README.md : Outputs + API ───────────────────────────────────────────────
const readme = await source('README.md');
function section(md, heading) {
	const re = new RegExp(`^## ${heading}\\n([\\s\\S]*?)(?=^## |\\Z)`, 'm');
	return md.match(re)?.[1]?.trim() ?? '';
}
await emit('en/reference/01-outputs-api.md', {
	title: 'Outputs & API',
	description: 'Output protocols, transports, coordinate systems, and the REST/WebSocket API.',
	sidebar: { order: 1 },
}, `## Outputs\n\n${section(readme, 'Outputs')}\n\n## Modes\n\n${section(readme, 'Modes')}\n\n## REST & WebSocket API\n\n${section(readme, 'API')}`);

// ── firmware/README.md ──────────────────────────────────────────────────────
const fw = await source('firmware/README.md');
await emit('en/reference/02-firmware.md', {
	title: 'Anchor firmware',
	description: 'ESP32-S3 anchor firmware: features, flashing, WiFi captive portal.',
	sidebar: { order: 2 },
}, clean(fw.replace(/^# .*\n/, '')));

// nettoyage d'éventuels restes d'anciens runs
await rm(join(OUT, 'en/venue/guide.md'), { force: true });
