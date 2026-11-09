import { rehypeHeadingIds, unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";

export default defineConfig({
	site: "https://jmuelbert.github.io/jm-github-standards",
	markdown: {
		processor: unified({
			rehypePlugins: [rehypeHeadingIds],
		}),
	},
	integrations: [
		starlight({
			title: "jm-github-standards",
			logo: {
				light: "./src/assets/light-logo.svg",
				dark: "./src/assets/dark-logo.svg",
				replacesTitle: true,
				alt: "jmuelbert Logo",
			},
			sidebar: [
				{
					label: "Getting Started",
					items: [
						{ label: "Introduction", link: "/" },
						{ label: "Getting Started", link: "/getting-started/" },
					],
				},
				{
					label: "Standards & Policies",
					items: [{ autogenerate: { directory: "policies" } }],
				},
				{
					label: "Workflows",
					// badge: 'Beta',
					items: [{ autogenerate: { directory: "workflows" } }],
				},
				{
					label: "Community",
					items: [{ autogenerate: { directory: "community" } }],
				},
			],
			defaultLocale: "root",
			locales: {
				root: { label: "English", lang: "en" },
				de: { label: "Deutsch", lang: "de" },
				es: { label: "Español", lang: "es" },
			},
			social: [
				{
					icon: "github",
					label: "GitHub",
					href: "https://github.com/jmuelbert/jm-github-standards",
				},
			],
			credits: true,
			lastUpdated: true,
			components: {
				Footer: "./src/components/Footer.astro",
			},
		}),
		sitemap(),
		mdx(),
	],
});
