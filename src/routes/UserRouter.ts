import { UserController } from '../controller/UserController'
import express, { Request, Response } from 'express'
import { LogInfo } from '../utils/logger'
import { verifyToken } from '../middlewares/verifyToken.middleware'

// Router from Express
let userRouter = express.Router()

// GET ALL USERS -> http://localhost:8000/api/users
// GET USER BY ID -> http://localhost:8000/api/users?id=63444dd120b8a6007532476d
userRouter
  .route('/')
  // GET
  .get(verifyToken, async (req: Request, res: Response) => {
    // Obtain Query Param
    let id: any = req?.query?.id
    let page: any = req?.query?.page || 1
    let limit: any = req?.query?.limit || 10
    // Controller instance
    const controller: UserController = new UserController()
    // Obtain Response
    const response = await controller.getUser(page, limit, id)
    // Send response to client
    return res.status(200).send(response)
  })
  // DELETE
  .delete(verifyToken, async (req: Request, res: Response) => {
    // Obtain Query Param
    let id: any = req?.query?.id
    // Controller instance
    const controller: UserController = new UserController()
    // Obtain Response
    const response = await controller.deleteUser(id)
    // Send response to client
    return res.status(response.status).send(response)
  })
  // UPDATE / PUT
  .put(verifyToken, async (req: Request, res: Response) => {
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

userRouter
  .route('/katas')
  // GET
  .get(verifyToken, async (req: Request, res: Response) => {
    // Obtain Query Param
    let id: any = req?.query?.id
    let page: any = req?.query?.page || 1
    let limit: any = req?.query?.limit || 10
    // Controller instance
    const controller: UserController = new UserController()
    // Obtain Response
    const response = await controller.getUserKatas(page, limit, id)
    // Send response to client
    return res.status(200).send(response)
  })

export default userRouter
