
import { createClient } from '@sanity/client';

export const sanityClient = createClient({
	projectId: 'ypovfwnv',
	dataset: 'production',
	apiVersion: '2023-11-01',
	useCdn: false, // set to `false` to bypass the edge cache
});
