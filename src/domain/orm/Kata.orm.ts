import { KatasResponse } from '../../types/KatasResponse.type'
import { LogError, LogSuccess } from '../../utils/logger'
import { IKata } from '../entities/interfaces/Kata.interface'
import { kataEntity } from '../entities/Kata.entity'

// * CRUD for Katas

/**
 * It gets all the katas from the database, and returns them in a response object.
 * 
 * The response object has the following properties:
 * 
 * katas: An array of katas.
 * totalPages: The total number of pages.
 * currentPage: The current page.
 * The function takes two parameters:
 * 
 * page: The current page.
 * limit: The number of katas per page.
 * The function returns a promise that resolves to a response object.
 * 
 * The function uses the following Mongoose methods:
 * 
 * find: Finds all the katas that match the query.
 * limit: Limits the number of katas returned.
 * skip: Skips the first n katas.
 * countDocuments: Counts the total number of katas.
 * The function uses the following Mongoose model:
 * @param {number} page - number,
 * @param {number} limit - number = 10
 * @returns A promise that resolves to an object with the following properties:
 * katas: An array of katas
 * totalPages: A number
 * currentPage: A number
 */
export const getAllKatasDB = async (
  page: number,
  limit: number
): Promise<KatasResponse | undefined> => {
  try {
    let kataModel = kataEntity()

    let response: KatasResponse = {
      katas: [],
      totalPages: 1,
      currentPage: 1
    }

    // GET KATAS
    await kataModel
      .find({ isDeleted: false }, { __v: 0 })
      .limit(limit)
      .skip((page - 1) * limit)
      .then((katas: IKata[]) => {
        response.katas = katas
      })

    // COUNTING TOTAL PAGES
    await kataModel.countDocuments().then((total: number) => {
      response.totalPages = Math.ceil(total / limit)
      response.currentPage = page
    })

    return response
  } catch (error) {
    LogError(`[ORM ERROR]: Getting All Katas ${error}`)
  }
}

/**
 * It takes an ID as a string, and returns a promise that resolves to a kata object or undefined
 * @param {string} id - string
 * @returns A promise that resolves to an object or undefined.
 */
export const getKataByID = async (id: string): Promise<any | undefined> => {
  try {
    let kataModel = kataEntity()

    return await kataModel.findById(id, { __v: 0 })
  } catch (error) {
    LogError(`[ORM ERROR]: Getting User By ID ${error}`)
  }
}

/**
 * It deletes a kata from the database by its id
 * @param {string} id - string
 * @returns The return value is the deleted document.
 */
export const deleteKataDB = async (id: string): Promise<any | undefined> => {
  try {
    let kataModel = kataEntity()
    return await kataModel.findByIdAndDelete(id)
  } catch (error) {
    LogError(`[ORM ERROR]: Deleting Kata By ID ${error}`)
  }
}

/**
 * It creates a new kata in the database
 * @param {IKata} kata - IKata
 * @returns The return value is a promise.
 */
export const createKataDB = async (kata: IKata): Promise<any | undefined> => {
  try {
    let kataModel = kataEntity()
    return await kataModel.create(kata)
  } catch (error) {
    LogError(`[ORM ERROR]: Register Kata ${error}`)
  }
}

/**
 * This function takes an id and a kata object and updates the kata in the database with the id and the
 * kata object.
 * @param {string} id - string,
 * @param {IKata} kata - IKata
 * @returns The updated kata
 */
export const updateKataDB = async (
  id: string,
  kata: IKata
): Promise<any | undefined> => {
  try {
    let kataModel = kataEntity()
    return await kataModel.findByIdAndUpdate(id, kata)
  } catch (error) {
    LogError(`[ORM ERROR]: Updating Kata ${error}`)
  }
}
