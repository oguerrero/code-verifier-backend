import { BasicResponse } from '../controller/types'
import express, { Request, Response } from 'express'
import { HelloController } from '../controller/HelloController'
import { LogInfo } from '../utils/logger'

// Router from Express
let helloRouter = express.Router()

// GET -> http://localhost:8000/api/hello?name=Oscar
helloRouter.route('/').get(async (req: Request, res: Response) => {
  // GET query param
  let name: any = req?.query?.name
  LogInfo(`Query Param: ${name}`)
  // HelloController Instance
  const controller: HelloController = new HelloController()
  // Obtain Response
  const response: BasicResponse = await controller.getMessage(name)
  // Send response to client
  return res.send(response)
})

export default helloRouter