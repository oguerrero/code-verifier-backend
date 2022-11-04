// * ROOT ROUTER

import express, { Request, Response } from 'express'
import { LogInfo } from '../utils/logger'
import userRouter from './UserRouter'
import authRouter from './AuthRouter'

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
server.use('/users', userRouter) // http://localhost:8000/api/user --> UserRouter
server.use('/auth', authRouter) // http://localhost:8000/api/auth --> AuthRouter
// More Routes

export default server
