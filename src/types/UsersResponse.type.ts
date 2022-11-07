import { IUser } from '../domain/entities/interfaces/User.interface'

/**
 * UserResponse is an object with a users property that is an array of IUser objects, a totalPages
 * property that is a number, and a currentPage property that is a number.
 * @property {IUser[]} users - an array of users
 * @property {number} totalPages - The total number of pages of users
 * @property {number} currentPage - The current page number
 */
export type UserResponse = {
  users: IUser[]
  totalPages: number
  currentPage: number
}
