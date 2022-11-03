import { IUser } from '../../domain/entities/interfaces/User.interface'
import { BasicResponse } from '../types'

export interface IHelloController {
  getMessage(name?: string): Promise<BasicResponse>
}

export interface IGoodByeController {
  getMessage(name?: string): Promise<BasicResponse>
}

export interface IUserController {
  getUser(id?: string): Promise<any>
  deleteUser(id?: string): Promise<any>
  createUser(user: any): Promise<any>
  updateUser(id: string, user: any): Promise<any>
}

export interface IAuthController {
  registerUser(user: IUser): Promise<any>
  loginUser(auth: any): Promise<any>
}