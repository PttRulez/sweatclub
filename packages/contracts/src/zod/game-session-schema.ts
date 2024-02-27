import { z } from 'zod';
import { GameStatus } from '../enums';

export const GameSessionSchema = z.object({
	conditionsToPlay: z.string().optional(),
	datetime: z.preprocess((arg) => {
  	if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
	}, z.date()),
	description: z.string().optional(),
	gameId: z.number(),
	miminalParticipantsNumber: z.number(),
	maximalParticipantsNumber: z.number(),
	placeId: z.number(),
	status: z.nativeEnum(GameStatus)
})

export type CreateGameSessionDto = z.infer<typeof GameSessionSchema>;