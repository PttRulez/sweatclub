import { z } from 'zod';

export const PlaceSchema = z.object({
	address: z.string(),
	contactInfo: z.string().optional(),
	description: z.string(),
	geo: z.string().optional(),
	name: z.string(),
	public: z.boolean(),
	schedule: z.string()
})

export type CreatePlaceDto = z.infer<typeof PlaceSchema>;
