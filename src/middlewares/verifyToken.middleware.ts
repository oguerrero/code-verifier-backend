import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import dotenv from 'dotenv'
dotenv.config()
const secret = process.env.SECRETKEY

/**
 * If the request header contains a JWT, verify it and if it's valid, continue to the next function.
 * @param {Request} req - Request - The request object
 * @param {Response} res - Response - The response object
 * @param {NextFunction} next - NextFunction - This is a function that will be called when the
 * middleware is done.
 * @returns A function that takes in a request, response, and next function.
 */
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Check header from request for 'x-access-token'
  let token: any = req.headers['x-access-token']

  // Verify if jwt exists
  if (!token) {
    return res
      .status(403)
      .send({ authenticationError: 'Missing JWT', message: 'Unauthorized' })
  }

  // Verify token
  // TODO: PASS SECRET
  jwt.verify(token, secret!, (err: any, decoded: any) => {
    if (err) {
      return res
        .status(500)
        .send({
          authenticationError: 'JWT verification failed',
          message: 'Failed to verify jwt'
        })
    }

    next()
  })
}
