import express, { Express, Request, Response } from 'express'

// * Swagger
import swaggerUi from 'swagger-ui-express'

// * Security
import cors from 'cors'
import helmet from 'helmet'

// TODO: HTTPS

// * Root Router
import router from '../routes'
import mongoose from 'mongoose'

// * Create Express APP
const server: Express = express()

// * Swagger Config and Route
server.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: '/swagger.json',
      explorer: true
    }
  })
)

// * Define SERVER to use api and use rootRouter from index.ts
// From this point onover: https://localhost:8000/api/...
server.use('/api', router)

// * Static Server
server.use(express.static('public'))

// * Mongoose Conection
mongoose.connect('mongodb://localhost:27017/codeVerification')

// * Security config
server.use(helmet())
server.use(cors())

// * Content type:
server.use(express.urlencoded({ extended: true, limit: '50mb' }))
server.use(express.json({ limit: '50mb' }))

// * Redirection Config
// ? http://localhost:8000/ --> http://localhost:8000/api/
server.get('/', (req: Request, res: Response) => {
  res.redirect('/api')
})

export default server
