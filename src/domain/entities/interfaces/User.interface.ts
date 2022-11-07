import { IKata } from "./Kata.interface"

/* Defining the interface for the User model. */
export interface IUser {
  name: string
  email: string
  password: string
  age: Number
  katas: string[]
}
