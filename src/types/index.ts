
import type { PortableTextBlock, Slug } from 'sanity';

export interface Repository {
	created_at: Date;
	description?: string;
	homepage?: string;
	html_url: string;
	id: number;
	language: string;
	name: string
	updated_at: Date;
	[key: string]: any;
}

export interface Work {
	name: string;
	slug: Slug;
	builtAt: string;
	language: string[];
	logo: string;
	description: PortableTextBlock; 
}