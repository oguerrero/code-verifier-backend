import { IUser } from '../domain/entities/interfaces/User.interface'

export type UserResponse = {
  users: IUser[]
  totalPages: number
  currentPage: number
}
