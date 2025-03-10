
import { createClient } from '@sanity/client';

export const sanityClient = createClient({
	projectId: 'ypovfwnv',
	dataset: 'production',
	apiVersion: '2025-03-10',
	useCdn: true, // set to `false` to bypass the edge cache
});
