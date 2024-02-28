import { CreatePlaceDto, PlaceSchema } from 'contracts'
import express, { Request } from 'express'
import { bearerGuard } from 'src/guards/bearer-guard'
import validateSchema from 'src/guards/validate-schema-guard'
import placeService from './place.service'

const routes = express.Router()

routes.get('/', async (_, res) => {
  const places = await placeService.getAll()

  res.json({ places })
})

routes.post(
  '/',
  bearerGuard,
  validateSchema(PlaceSchema),
  async (req: Request<unknown, unknown, CreatePlaceDto>, res) => {
    const place = await placeService.createNewPlace({
      ...req.body,
      creatorId: req.user.id,
    })

    if (!place) {
      res.status(500).send()
    }
    res.status(201).json(place)
  }
)

export { routes as placeController }
