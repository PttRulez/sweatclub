import express, { Request } from 'express';
import { bearerGuard } from 'src/guards/bearer-guard';
import validateSchema from 'src/guards/validate-schema-guard';
import { CreateGameSessionDto, GameSessionSchema } from 'contracts';
import gameSessionService from './game-session.service';

const routes = express.Router();

routes.get('/', async (_, res, __) => {
	const gameSessions = await gameSessionService.getAllGameSessions();
	res.json({ gameSessions })
})

routes.post('/', bearerGuard, validateSchema(GameSessionSchema), async (req: Request<{}, {}, CreateGameSessionDto>, res, __) => {
	try {
		const gameSession = await gameSessionService.createNewGame(req.body);

		if (!gameSession) {
			res.status(500).send('Hui pizda')
		} else {
			res.status(201).json({ gameSession })
		}
		
	} catch (e) {
		res.status(500).json({ message: 'pizda rulyu'})
	}
	
})

export { routes as gameSessionController };