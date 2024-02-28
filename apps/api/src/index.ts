import express, { Express } from 'express'
import dotenv from 'dotenv'
import { routes } from './router'
import { passport } from './auth/passport.setup'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3001

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(passport.initialize())
app.use('/api', routes)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
