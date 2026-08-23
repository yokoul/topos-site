#!/usr/bin/env node
/**
 * Importe la documentation depuis le dépôt topos (source de vérité unique).
 *
 *   node scripts/sync-docs.mjs            # depuis GitHub (main)
 *   TOPOS_DIR=../topos node scripts/sync-docs.mjs   # depuis un clone local
 *
 * Chaque entrée de MAP prend un fichier Markdown du dépôt topos, retire son H1
 * (Starlight le génère depuis le frontmatter), retire la table des matières
 * manuelle, et l'écrit avec frontmatter dans src/content/docs/<locale>/...
 *
 * Phase 0 : le script existe, il n'est pas encore branché dans le build.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const RAW = 'https://raw.githubusercontent.com/yokoul/topos/main';
const LOCAL = process.env.TOPOS_DIR;

const MAP = [
	{
		src: 'docs/guide.md',
		dest: 'src/content/docs/en/venue/guide.md',
		title: 'Installation & usage guide',
		description: 'From hardware procurement to production calibration.',
	},
	{
		src: 'docs/auto_calibration.md',
		dest: 'src/content/docs/en/venue/auto-calibration.md',
		title: 'Fixture auto-calibration',
		description: 'Point-and-record workflow for moving heads.',
	},
];

async function fetchSource(path) {
	if (LOCAL) return readFile(join(LOCAL, path), 'utf8');
	const res = await fetch(`${RAW}/${path}`);
	if (!res.ok) throw new Error(`${path}: HTTP ${res.status}`);
	return res.text();
}

function transform(md, { title, description }) {
	let body = md.replace(/^# .*\n/, ''); // H1 → frontmatter
	body = body.replace(/^## Table of Contents[\s\S]*?(?=^## )/m, ''); // TOC manuelle
	body = body.replace(/^---\s*$/gm, ''); // séparateurs horizontaux (Starlight les rend lourds)
	const fm = [
		'---',
		`title: ${JSON.stringify(title)}`,
		`description: ${JSON.stringify(description)}`,
		'# Fichier généré par scripts/sync-docs.mjs — ne pas éditer ici, éditer dans le dépôt topos.',
		'---',
		'',
	].join('\n');
	return fm + body.trim() + '\n';
}

for (const entry of MAP) {
	const md = await fetchSource(entry.src);
	await mkdir(dirname(entry.dest), { recursive: true });
	await writeFile(entry.dest, transform(md, entry));
	console.log(`✓ ${entry.src} → ${entry.dest}`);
}
