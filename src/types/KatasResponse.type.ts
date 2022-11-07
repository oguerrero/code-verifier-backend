import { IKata } from '../domain/entities/interfaces/Kata.interface'

/**
 * `KatasResponse` is an object with three properties: `katas`, `totalPages`, and `currentPage`.
 * 
 * `katas` is an array of `IKata` objects.
 * 
 * `totalPages` and `currentPage` are both numbers.
 * @property {IKata[]} katas - An array of katas
 * @property {number} totalPages - The total number of pages that exist for the given query.
 * @property {number} currentPage - number
 */
export type KatasResponse = {
  katas: IKata[]
  totalPages: number
  currentPage: number
}
