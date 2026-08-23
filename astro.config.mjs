// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';

// Lancement (phase 4, 23 août 2026) : site indexable. Remettre à true pour masquer aux moteurs.
const NOINDEX = false;

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
				Header: './src/components/Header.astro',
				MobileMenuFooter: './src/components/MobileMenuFooter.astro',
				Footer: './src/components/Footer.astro',
			},
			head: [
				{ tag: 'meta', attrs: { property: 'og:image', content: 'https://topos.red/og.png' } },
				{ tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
				{ tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
				{ tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
				{ tag: 'meta', attrs: { name: 'twitter:image', content: 'https://topos.red/og.png' } },
				...(NOINDEX ? [{ tag: 'meta', attrs: { name: 'robots', content: 'noindex, nofollow' } }] : []),
			],
			sidebar: [
				{
					label: 'Start',
					translations: { fr: 'Commencer', 'zh-CN': '开始' },
					items: [{ autogenerate: { directory: 'start' } }],
				},
				{
					label: 'In the venue',
					translations: { fr: 'En salle', 'zh-CN': '在场馆' },
					items: [{ autogenerate: { directory: 'venue' } }],
				},
				{
					label: 'Reference',
					translations: { fr: 'Référence', 'zh-CN': '参考' },
					items: [{ autogenerate: { directory: 'reference' } }],
				},
			],
		}),
		sitemap(),
	],
});
