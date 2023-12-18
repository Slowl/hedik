import { loadEnv } from 'vite';
import { defineConfig } from 'astro/config';
import { sanityIntegration } from '@sanity/astro';

const {
	VITE_SANITY_STUDIO_PROJECT_ID,
	VITE_SANITY_STUDIO_DATASET,
} = loadEnv(process.env.NODE_ENV, process.cwd(), '');

export default defineConfig({
	experimental: {
		contentCollectionCache: true,
	},
	integrations: [
		sanityIntegration({
			projectId: VITE_SANITY_STUDIO_PROJECT_ID,
			dataset: VITE_SANITY_STUDIO_DATASET,
			apiVersion: '2023-12-10',
			useCdn: false,
		}),
	],
	prefetch: {
		prefetchAll: true,
	},
});
