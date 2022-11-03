import { Delete, Get, Post, Put, Query, Route, Tags } from 'tsoa'
import { IUser } from '../domain/entities/interfaces/User.interface'
import { IAuthController } from './interfaces'
import { IAuth } from '../domain/entities/interfaces/Auth.interface'
import { LogSuccess, LogWarning } from '../utils/logger'
import { getUserByID, loginUserDB, registerDB } from '../domain/orm/User.orm'
import { AuthResponse, ErrorResponse } from './types'

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
        message: 'Please provide a valid user to register'
      }
      return response
    }
    LogSuccess(`[/api/auth/register] Register new user ${user} request`)
    await registerDB(user).then((r) => {
      response = { status: 201, message: `User ${user.name} created` }
    })
    return response
  }

  @Post('/login')
  public async loginUser(auth: IAuth): Promise<any> {
    let response: AuthResponse | ErrorResponse | undefined

    if (!auth) {
      LogWarning(`[/api/auth/login] Auth is not valid`)
      response = {
        status: 400,
        error: 'LOGIN ERROR: EMAIL OR PASSWORD ARE REQUIRED',
        message: 'Please provide a valid email or password to login'
      }
      return response
    }

    LogSuccess(`[/api/auth/register]Login request`)
    let data = await loginUserDB(auth)
    response = {
      status: 201,
      token: data.token,
      message: `Welcome, ${data.user.name}`
    }
    return response
  }

  @Get('/me')
  public async userData(@Query() id: string): Promise<any> {
    let response: any = ''

    if (!id) {
      LogWarning(`[/api/auth/me] id not valid`)
      response = {
        status: 400,
        error: 'LOGIN ERROR: id not found',
        message: 'Please provide a valid id'
      }
      return response
    }

    LogSuccess(`[/api/users] GET user by ID: ${id} request`)
    response = await getUserByID(id)
    response.password = ''
    return response
  }

  @Post('/logout')
  public async logoutUser(): Promise<any> {
    // TODO: close session
    let response: any = ''
    throw new Error('Method not implemented.')
  } 
}
