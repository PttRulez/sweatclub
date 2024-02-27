import { z } from 'zod';
import { GameDifficulty, GameGenre } from '../enums';

export const GameSchema = z.object({
	averageGameTime: z.string(),
  difficulty: z.nativeEnum(GameDifficulty),
  description: z.string(),
  genre: z.nativeEnum(GameGenre),
  name: z.string(),
  maxPlayers: z.number(),
  minPlayers: z.number()
})

export type CreateGameType = z.infer<typeof GameSchema>;
