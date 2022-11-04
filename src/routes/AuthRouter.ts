import express, { Request, Response } from 'express'
import { AuthController } from '../controller/AuthController'
import { IUser } from '../domain/entities/interfaces/User.interface'
import { IAuth } from '../domain/entities/interfaces/Auth.interface'

// BCRYPT
import bcrypt from 'bcrypt'

// MiddleWare for JWT
import { verifyToken } from '../middlewares/verifyToken.middleware'

// Body Parser (READ JSON FROM BODY IN REQUESTS)
import bodyParser from 'body-parser'
// MiddleWare to read JSON
let jsonParser = bodyParser.json()

let authRouter = express.Router()

authRouter
  .route('/register')
  .post(jsonParser, async (req: Request, res: Response) => {
    let { name, email, password, age } = req?.body
    let hashedPassword = ''
    if (!name || !email || !password || !age) {
      return res.status(400).send({ message: 'REGISTER: Data missing' })
    }

    // Cypher password
    hashedPassword = bcrypt.hashSync(password, 8)

    // Use Interface for User
    let user: IUser = {
      name,
      email,
      password: hashedPassword,
      age,
      katas: []
    }

    const controller: AuthController = new AuthController()
    // Obtain Response
    const response = await controller.registerUser(user)
    // Send response to client
    return res.status(response.status).send(response)
  })

authRouter
  .route('/login')
  .post(jsonParser, async (req: Request, res: Response) => {
    let { email, password } = req.body
    if (!email || !password) {
      return res.status(400).send({ message: 'LOGIN: Data missing' })
    }

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

// ! PROTECTED ROUTE BY VerifyToken MiddleWare
authRouter.route('/me').get(verifyToken, async (req: Request, res: Response) => {
  // ID OF USER
  let id: any = req?.query?.id

  if (!id) {
    return res.status(401).send({
      message: 'You are unauthorized'
    })
  }

  const controller: AuthController = new AuthController()

  let response: any = await controller.userData(id) 
  
  return res.status(200).send(response)
})

export default authRouter
