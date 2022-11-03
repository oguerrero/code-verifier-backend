import express, { Request, Response } from 'express'
import { AuthController } from '../controller/AuthController'
import { IUser } from '../domain/entities/interfaces/User.interface'

// BCRYPT
import bcrypt from 'bcrypt'
import { IAuth } from '../domain/entities/interfaces/Auth.interface'

let authRouter = express.Router()

authRouter.route('/register').post(async (req: Request, res: Response) => {
  console.log(req?.body)
  let { name, email, password, age } = req.body
  console.log(name, email, password, age)
  let hashedPassword = ''
  if (!name || !email || !password || !age) return

  // Cypher password
  hashedPassword = bcrypt.hashSync(password, 8)

  // Use Interface for User
  let user: IUser = {
    name,
    email,
    password: hashedPassword,
    age
  }

  const controller: AuthController = new AuthController()
  // Obtain Response
  const response = await controller.registerUser(user)
  // Send response to client
  return res.status(response.status).send(response)
})

authRouter.route('/login').post(async (req: Request, res: Response) => {
  let { email, password } = req.body
  if (!email || !password) return

  const controller: AuthController = new AuthController()

  let auth: IAuth = {
    email,
    password
  }
  // Obtain Response
  const response = await controller.loginUser(auth)
  // Send response to client
  return res.status(response.status).send(response)
})

export default authRouter
