import { GameDifficulty, GameGenre } from 'contracts/src/enums';
import { PrismaGame } from './types';
import prisma from 'src/prisma';

const gameService = {
	createNewGame: async (data: CreateGameData): Promise<PrismaGame> => {
		const game = await prisma.game.create({
			data: {...data, rating: 0}
		})

		return game;
	},
	getAllGames: async (): Promise<PrismaGame[]> => {
		const games = await prisma.game.findMany();

		return games;
	}
}

interface CreateGameData {
	averageGameTime: string;
	difficulty: GameDifficulty;
	description: string;
	genre: GameGenre;
	name: string;
	maxPlayers: number;
	minPlayers: number;
}

export default gameService;