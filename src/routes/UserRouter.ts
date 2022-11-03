import { UserController } from '../controller/UserController'
import express, { Request, Response } from 'express'
import { LogInfo } from '../utils/logger'

// Router from Express
let userRouter = express.Router()

// GET ALL USERS -> http://localhost:8000/api/users
// GET USER BY ID -> http://localhost:8000/api/users?id=63444dd120b8a6007532476d
userRouter
  .route('/')
  // GET
  .get(async (req: Request, res: Response) => {
    // Obtain Query Param
    let id: any = req?.query?.id
    LogInfo(`Query Param ${id}`)
    // Controller instance
    const controller: UserController = new UserController()
    // Obtain Response
    const response = await controller.getUser(id)
    // Send response to client
    return res.status(200).send(response)
  })
  // DELETE
  .delete(async (req: Request, res: Response) => {
    // Obtain Query Param
    let id: any = req?.query?.id
    LogInfo(`Query Param ${id}`)
    // Controller instance
    const controller: UserController = new UserController()
    // Obtain Response
    const response = await controller.deleteUser(id)
    // Send response to client
    return res.status(response.status).send(response)
  })
  // UPDATE / PUT
  .put(async (req: Request, res: Response) => {
    // Obtain Query Param
    let id: any = req?.query?.id
    let name: any = req?.query?.name
    let email: any = req?.query?.email
    let age: any = req?.query?.age

    // Controller instance
    const controller: UserController = new UserController()

    // Obtain Response
    let user = {
      name,
      email,
      age
    }

    const response = await controller.updateUser(id, user)
    // Send response to client
    return res.status(response.status).send(response)
  })

export default userRouter
