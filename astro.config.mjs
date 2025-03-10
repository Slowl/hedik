import { loadEnv } from 'vite';
import { defineConfig } from 'astro/config';
import sanity from '@sanity/astro';
import icon from 'astro-icon';

const {
	VITE_SANITY_STUDIO_PROJECT_ID,
	VITE_SANITY_STUDIO_DATASET,
} = loadEnv(process.env.NODE_ENV, process.cwd(), '');

export default defineConfig({
	image: { domains: ['https://cdn.sanity.io'] },
	vite: {
		build: {
			rollupOptions: {
				external: ['react'],
			}
		}
	},
	integrations: [
		icon({
			include: {
				noto: ['bear'],
				pixelarticons: ['chevron-right'],
				ri: ['github-fill', 'link-m', 'settings-3-line'],
				'simple-icons': [
					'javascript', 'typescript', 'html5', 'css3', 'react', 'nextdotjs', 'astro', 'nodedotjs',
					'firebase', 'supabase', 'redux', 'graphql', 'styledcomponents', 'materialdesign', 'sanity', 'strapi',
					'powershell', 'github', 'linkedin', 'twitter', 'spotify', 'steam', 'instagram', 'bluesky', 'youtubemusic', 'malt',
				],
			},
		}),
		sanity({
			projectId: VITE_SANITY_STUDIO_PROJECT_ID,
			dataset: VITE_SANITY_STUDIO_DATASET,
			apiVersion: '2025-03-10',
			useCdn: true,
		}),
	],
	prefetch: {
		prefetchAll: true,
	},
});
