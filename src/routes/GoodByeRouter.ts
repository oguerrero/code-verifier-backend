import express, { Request, Response } from 'express'
import { GoodByeController } from '../controller/GoodByeController'
import { LogInfo } from '../utils/logger'

// Router from Express
let goodbyeRouter = express.Router()

goodbyeRouter.route('/').get(async (req: Request, res: Response) => {
  let name: any = req?.query?.name
  LogInfo(`Query Param: ${name}`)
  const controller: GoodByeController = new GoodByeController()
  // Obtain Response
  const response = await controller.getMessage(name)
  // Send response to client
  return res.send(response)
})

export default goodbyeRouter
