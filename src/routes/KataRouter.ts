import express, { Request, Response } from 'express'
import { KataController } from '../controller/KataController'

import { verifyToken } from '../middlewares/verifyToken.middleware'
// Body Parser (READ JSON FROM BODY IN REQUESTS)
import bodyParser from 'body-parser'
import { IKata } from '@/domain/entities/interfaces/Kata.interface'
// MiddleWare to read JSON
let jsonParser = bodyParser.json()

// Router from Express
let kataRouter = express.Router()

// GET ALL USERS -> http://localhost:8000/api/users
// GET USER BY ID -> http://localhost:8000/api/users?id=63444dd120b8a6007532476d
kataRouter
  .route('/')
  // GET
  .get(verifyToken, async (req: Request, res: Response) => {
    // Obtain Query Param
    let id: any = req?.query?.id
    let page: any = req?.query?.page || 1
    let limit: any = req?.query?.limit || 10
    // Controller instance
    const controller: KataController = new KataController()
    // Obtain Response
    const response = await controller.getKata(page, limit, id)
    // Send response to client
    return res.status(200).send(response)
  })
  // Create
  .post(verifyToken, jsonParser, async (req: Request, res: Response) => {
    let {
      name,
      description,
      level,
      intents,
      stars,
      creator,
      solution,
      participants
    } = req.body

    console.log(
      name,
      description,
      level,
      intents,
      stars,
      creator,
      solution,
      participants
    )

    if (
      !name ||
      !description ||
      !level ||
      !intents ||
      !stars ||
      !creator ||
      !solution ||
      !participants
    ) {
      return res.status(400).send({ message: 'REGISTER: Data missing' })
    }

    let kata: IKata = {
      name,
      description,
      level,
      intents,
      stars,
      creator,
      solution,
      participants
    }

    const controller: KataController = new KataController()
    // Obtain Response
    const response = await controller.createKata(kata)
    // Send response to client
    return res.status(response.status).send(response)
  })
  // UPDATE / PUT
  .put(verifyToken, jsonParser, async (req: Request, res: Response) => {
    // Obtain Query Param
    let id: any = req?.query?.id

    let {
      name,
      description,
      level,
      intents,
      stars,
      creator,
      solution,
      participants
    } = req.body

    if (
      !name ||
      !description ||
      !level ||
      intents > 0 ||
      stars > 0 ||
      !creator ||
      !solution ||
      !participants
    ) {
      return res.status(400).send({ message: 'UPDATE: Data missing' })
    }

    // Controller instance
    const controller: KataController = new KataController()

    let kata: IKata = {
      name,
      description,
      level,
      intents,
      stars,
      creator,
      solution,
      participants
    }

    const response = await controller.updateKata(id, kata)
    // Send response to client
    return res.status(response.status).send(response)
  })
  // DELETE
  .delete(verifyToken, async (req: Request, res: Response) => {
    // Obtain Query Param
    let id: any = req?.query?.id
    // Controller instance
    const controller: KataController = new KataController()
    // Obtain Response
    const response = await controller.deleteKata(id)
    // Send response to client
    return res.status(response.status).send(response)
  })

export default kataRouter
