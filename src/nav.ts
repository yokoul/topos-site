/** Navigation principale de topos.red — partagée par le Header, le menu mobile et le pied de page. */

const LABELS: Record<string, Record<string, string>> = {
	en: { project: 'Project', docs: 'Docs', hardware: 'Hardware', gallery: 'Gallery', community: 'Community', journal: 'Journal' },
	fr: { project: 'Projet', docs: 'Docs', hardware: 'Matériel', gallery: 'Galerie', community: 'Communauté', journal: 'Journal' },
	'zh-CN': { project: '项目', docs: '文档', hardware: '硬件', gallery: '图库', community: '社区', journal: '日志' },
};

export interface NavItem {
	href: string;
	label: string;
	active: boolean;
}

export function mainNav(locale: string | undefined, lang: string, id: string): NavItem[] {
	const base = `/${locale ?? 'en'}`;
	const l = LABELS[lang] ?? LABELS.en;
	return [
		{ href: `${base}/project/`, label: l.project, active: id.endsWith('/project') },
		{ href: `${base}/start/01-hardware/`, label: l.docs, active: /\/(start|venue|reference)\//.test(id) },
		{ href: `${base}/hardware/`, label: l.hardware, active: id.endsWith('/hardware') },
		{ href: `${base}/gallery/`, label: l.gallery, active: id.endsWith('/gallery') },
		{ href: `${base}/community/`, label: l.community, active: id.endsWith('/community') || id.endsWith('/roadmap') },
		{ href: `${base}/journal/`, label: l.journal, active: id.includes('/journal') },
	];
}
