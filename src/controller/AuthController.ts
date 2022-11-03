import { Delete, Get, Post, Put, Query, Route, Tags } from 'tsoa'
import { IUser } from '../domain/entities/interfaces/User.interface'
import { IAuthController } from './interfaces'
import { IAuth } from '../domain/entities/interfaces/Auth.interface'
import { LogSuccess, LogWarning } from '../utils/logger'
import { createUserDB, loginUserDB, registerDB } from '../domain/orm/User.orm'

@Route('/api/auth')
@Tags('AuthController')
export class AuthController implements IAuthController {
  @Post('/register')
  public async registerUser(user: IUser): Promise<any> {
    let response: any = ''

    if (!user) {
      LogWarning(`[/api/auth] Register user is undefined`)
      response = {
        status: 400,
        message: 'Please provide a valid user to create'
      }
      return response
    }
    LogSuccess(`[/api/auth/register] Register new user ${user} request`)
    await registerDB(user).then((r) => {
      response = { status: 201, message: `User ${user.name} created` }
      return response
    })
  }

  @Post('/login')
  public async loginUser(auth: IAuth): Promise<any> {
    let response: any = ''

    if (!auth) {
      LogWarning(`[/api/auth/login] Auth is not valid`)
      response = {
        status: 400,
        message: 'Please provide a valid email or password to login'
      }
      return response
    }

    LogSuccess(`[/api/auth/register]Login request`)
    await loginUserDB(auth).then((r) => {
      response = { status: 201, message: `Successfull login`, token: r.token }
      return response
    })
  }

  @Post('/logout')
  public async logoutUser(): Promise<any> {
    // TODO: close session
    let response: any = ''
    throw new Error('Method not implemented.')
  }
}
