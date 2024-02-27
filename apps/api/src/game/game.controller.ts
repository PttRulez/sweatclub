import express, { Request, Response } from 'express';
import { bearerGuard } from 'src/guards/bearer-guard';
import validateSchema from 'src/guards/validate-schema-guard';
import gameService from './game.service';
import { CreateGameType, GameSchema } from 'contracts';

const routes = express.Router();

routes.get('/', async (_, res: Response) => {
		const games = await gameService.getAllGames();
		res.json({ games })
})

routes.post('/', bearerGuard, validateSchema(GameSchema), async (req: Request<{}, 
	{}, CreateGameType>, res, _) => {
	const game = await gameService.createNewGame(req.body);
	
	if (!game) {
		res.status(500).send();
	}
	res.status(201).json(game);
})

export { routes as gameController };