import { IKata } from '../../domain/entities/interfaces/Kata.interface'
import { IAuth } from '../../domain/entities/interfaces/Auth.interface'
import { IUser } from '../../domain/entities/interfaces/User.interface'

export interface IUserController {
  getUser(page: number, limit: number, id?: string): Promise<any>
  deleteUser(id?: string): Promise<any>
  updateUser(id: string, user: any): Promise<any>
  getUserKatas(page: number, limit: number, id: string): Promise<any>
}

export interface IAuthController {
  registerUser(user: IUser): Promise<any>
  loginUser(auth: IAuth): Promise<any>
  userData(id: string): Promise<any>
  logoutUser(): Promise<any>
}

export interface IKataController {
  getKata(page: number, limit: number, id?: string): Promise<any>
  createKata(kata: IKata): Promise<any>
  updateKata(id: string, kata: IKata): Promise<any>
  deleteKata(id?: string): Promise<any>
}
