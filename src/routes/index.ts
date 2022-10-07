/**
 * Root Router
 * Redirections to Routers
 */

import express, { Request, Response } from 'express'
import helloRouter from './HelloRouter'
import { LogInfo } from '../utils/logger'
import goodbyeRouter from './GoodByeRouter'

// Server Instance
let server = express()

// Router Instance
let rootRouter = express.Router()

// Activate for requests to http://localhost:8000/api
// GET -> http://localhost:8000/api/
rootRouter.get('/', (req: Request, res: Response) => {
  LogInfo('GET: http://localhost:8000/api')
  res.send(
    'TEST APP EXPRESS + TS + NODEMON + CONCURRENTLY + JEST + SWAGGER + MONGOOSE'
  )
})

// Redirections to Routers
server.use('/', rootRouter) // http://localhost:8000/api/
server.use('/hello', helloRouter) // http://localhost:8000/api/hello --> HelloRouter
server.use('/goodbye', goodbyeRouter) // http://localhost:8000/api/hello --> HelloRouter
// More Routes

export default server
