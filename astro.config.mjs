import { sanityIntegration } from '@sanity/astro';
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import netlify from '@astrojs/netlify/functions';

const {
	VITE_SANITY_STUDIO_PROJECT_ID,
	VITE_SANITY_STUDIO_DATASET,
} = loadEnv(process.env.NODE_ENV, process.cwd(), '');

export default defineConfig({
	// adapter: nodejs({
  //   mode: 'middleware' // or 'standalone'
  // }),
	adapter: netlify(),
  output: 'hybrid',
	integrations: [
		sanityIntegration({
			projectId: VITE_SANITY_STUDIO_PROJECT_ID,
			dataset: VITE_SANITY_STUDIO_DATASET,
			apiVersion: '2023-11-01',
			useCdn: false,
		}),
	],
});
