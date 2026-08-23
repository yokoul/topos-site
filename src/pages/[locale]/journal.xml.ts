import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

const LOCALES = ['en', 'fr', 'zh'] as const;
const TITLES = { en: 'topos — journal', fr: 'topos — journal', zh: 'topos — 日志' };

export function getStaticPaths() {
	return LOCALES.map((locale) => ({ params: { locale } }));
}

export async function GET({ params, site }: APIContext) {
	const locale = params.locale as (typeof LOCALES)[number];
	const posts = (await getCollection('docs', (e) => e.id.startsWith(`${locale}/journal/`) && e.data.date))
		.sort((a, b) => (b.data.date as Date).getTime() - (a.data.date as Date).getTime());
	return rss({
		title: TITLES[locale],
		description: 'Open hardware UWB tracking for live performance — devlog.',
		site: site ?? 'https://topos.red',
		items: posts.map((p) => ({
			title: p.data.title,
			description: p.data.description,
			pubDate: p.data.date as Date,
			link: `/${p.id}/`,
		})),
	});
}
