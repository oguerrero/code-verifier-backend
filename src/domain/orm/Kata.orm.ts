import { KatasResponse } from '../../types/KatasResponse.type'
import { LogError, LogSuccess } from '../../utils/logger'
import { IKata } from '../entities/interfaces/Kata.interface'
import { kataEntity } from '../entities/Kata.entity'

// * CRUD for Katas

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

export const getKataByID = async (id: string): Promise<any | undefined> => {
  try {
    let kataModel = kataEntity()

    return await kataModel.findById(id, { __v: 0 })
  } catch (error) {
    LogError(`[ORM ERROR]: Getting User By ID ${error}`)
  }
}

export const deleteKataDB = async (id: string): Promise<any | undefined> => {
  try {
    let kataModel = kataEntity()
    return await kataModel.findByIdAndDelete(id)
  } catch (error) {
    LogError(`[ORM ERROR]: Deleting Kata By ID ${error}`)
  }
}

export const createKataDB = async (kata: IKata): Promise<any | undefined> => {
  try {
    let kataModel = kataEntity()
    return await kataModel.create(kata)
  } catch (error) {
    LogError(`[ORM ERROR]: Register Kata ${error}`)
  }
}

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
