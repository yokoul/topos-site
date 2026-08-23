import { defineCollection, z } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: z.object({
				/** Pastille d'état affichée sous le hero (« Beta · en production… »). */
				state: z.string().optional(),
				/** Journal : date de publication et auteur. */
				date: z.coerce.date().optional(),
				author: z.string().optional(),
			}),
		}),
	}),
};
