import express from 'express'
import { gameSessionController } from './game-session/game-session.controller'
import { authController } from './auth/auth.controller'
import { gameController } from './game/game.controller'
import { placeController } from './place/place.controller'

const routes = express.Router()

routes.use('/auth', authController)
routes.use('/game-session', gameSessionController)
routes.use('/game', gameController)
routes.use('/place', placeController)

export { routes }
