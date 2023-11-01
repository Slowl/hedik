import { sanityIntegration } from '@sanity/astro';
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';

const {
	VITE_SANITY_STUDIO_PROJECT_ID,
	VITE_SANITY_STUDIO_DATASET,
} = loadEnv(process.env.NODE_ENV, process.cwd(), '');

export default defineConfig({
	integrations: [
		sanityIntegration({
			projectId: VITE_SANITY_STUDIO_PROJECT_ID,
			dataset: VITE_SANITY_STUDIO_DATASET,
			apiVersion: '2023-11-01',
			useCdn: false,
		}),
	],
});
