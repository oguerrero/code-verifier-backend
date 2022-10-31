import { LogError, LogSuccess } from '../../utils/logger'
import { userEntity } from '../entities/User.entity'

// * CRUD

/**
 * This function returns all users from the database that have not been deleted.
 * @returns An array of users
 */
export const getAllUsersDB = async (): Promise<any[] | undefined> => {
  try {
    let userModel = userEntity()

    // Search all users
    return await userModel.find({ isDelete: false })
  } catch (error) {
    LogError(`[ORM ERROR]: Getting All Users ${error}`)
  }
}

// getUserByID
export const getUserByID = async (id: string): Promise<any | undefined> => {
  try {
    let userModel = userEntity()

    return await userModel.findById(id)
  } catch (error) {
    LogError(`[ORM ERROR]: Getting User By ID ${error}`)
  }
}

// deleteUser
export const deleteUserDB = async (id: string): Promise<any | undefined> => {
  try {
    let userModel = userEntity()
    return await userModel.findByIdAndDelete(id)
  } catch (error) {
    LogError(`[ORM ERROR]: Deleting User By ID ${error}`)
  }
}

// createUser
export const createUserDB = async (user: any): Promise<any | undefined> => {
  try {
    let userModel = userEntity()
    return await userModel.create(user)
  } catch (error) {
    LogError(`[ORM ERROR]: Creating User ${error}`)
  }
}

// updateUser
export const updateUserDB = async (
  id: string,
  user: any
): Promise<any | undefined> => {
  try {
    let userModel = userEntity()
    return await userModel.findByIdAndUpdate(id, user)
  } catch (error) {
    LogError(`[ORM ERROR]: Updating User ${error}`)
  }
}

// TODO:
// getUserByEmail
