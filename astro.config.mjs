// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';

// Phase 0 : le site est en ligne mais non indexé. Retirer NOINDEX au lancement (phase 4).
const NOINDEX = true;

export default defineConfig({
	site: 'https://topos.red',
	trailingSlash: 'always',
	integrations: [
		starlight({
			title: 'topos',
			description:
				'Open hardware UWB tracking for live performance. Real-time · Environment · Distance.',
			favicon: '/favicon.svg',
			defaultLocale: 'en',
			locales: {
				en: { label: 'English', lang: 'en' },
				fr: { label: 'Français', lang: 'fr' },
				zh: { label: '中文', lang: 'zh-CN' },
			},
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/yokoul/topos' }],
			editLink: { baseUrl: 'https://github.com/yokoul/topos-site/edit/main/' },
			customCss: ['./src/styles/topos.css'],
			components: {
				ThemeProvider: './src/components/ThemeProvider.astro',
				ThemeSelect: './src/components/ThemeSelect.astro',
				SiteTitle: './src/components/SiteTitle.astro',
				Hero: './src/components/Hero.astro',
				Footer: './src/components/Footer.astro',
			},
			head: NOINDEX
				? [{ tag: 'meta', attrs: { name: 'robots', content: 'noindex, nofollow' } }]
				: [],
			sidebar: [
				{
					label: 'Start',
					translations: { fr: 'Commencer', 'zh-CN': '开始' },
					items: [{ autogenerate: { directory: 'start' } }],
				},
				// Phase 1 : « En salle » (venue/) et « Référence » (reference/), alimentés par scripts/sync-docs.mjs
			],
		}),
		sitemap(),
	],
});
