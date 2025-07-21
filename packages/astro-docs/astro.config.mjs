// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';
import starlightThemeNova from 'starlight-theme-nova'

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			plugins: [starlightThemeNova()],
			title: 'Recast',
			description: 'Build components once. Use everywhere.',
			logo: {
				light: './src/assets/logo-light.svg',
				dark: './src/assets/logo-dark.svg',
			},
			favicon: '/favicon.svg',
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/reactivepixels/recast' },
				{ icon: 'external', label: 'npm', href: 'https://www.npmjs.com/package/@rpxl/recast' }
			],
			sidebar: [
				{
					label: 'Getting Started',
					items: [
						{ label: 'Introduction', slug: 'index' },
						{ label: 'Installation', slug: 'installation' },
						{ label: 'Quickstart', slug: 'quickstart' },
					],
				},
				{
					label: 'Core Concepts',
					items: [
						{ label: 'Styles', slug: 'concepts/styles' },
						{ label: 'Variants & Modifiers', slug: 'concepts/variants-and-modifiers' },
						{ label: 'Composition', slug: 'concepts/composition' },
					],
				},
				{
					label: 'API Reference',
					items: [
						{ label: 'recast.styles()', slug: 'api/recast-styles' },
						{ label: 'recast.compose()', slug: 'api/recast-compose' },
					],
				},
			],
			customCss: ['./src/styles/global.css'],
		}),
	],
	vite: {
		plugins: [tailwindcss()],
	},
});
