import { IKata } from '../domain/entities/interfaces/Kata.interface'

export type KatasResponse = {
  katas: IKata[]
  totalPages: number
  currentPage: number
}
