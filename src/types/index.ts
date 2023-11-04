
import type { PortableTextBlock, Slug } from 'sanity';

export interface DataRepository {
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

export interface DataWork {
	builtAt: string;
	description: PortableTextBlock;
	gallery?: string[];
	language: string[];
	logo: string;
	name: string;
	slug: Slug;
}

export interface DataFooter {
	socialLinks: {
		name: string;
		newTab: boolean;
		url: string;
	}[];
}

export interface DataNavbar {
	links: {
		name: string;
		newTab: boolean;
		page: string;
	}[];
}
