import { LogError, LogSuccess } from 'src/utils/logger'
import { userEntitiy } from '../entities/User.entity'

// * CRUD

/**
 * This function returns all users from the database that have not been deleted.
 * @returns An array of users
 */
export const getAllUsers = async (): Promise<any[] | undefined> => {
  try {
    let userModel = userEntitiy()

    // Search all users
    return await userModel.find({ isDelete: false })
  } catch (error) {
    LogError(`[ORM ERROR]: Getting All Users ${error}`)
  }
}

// TODO: getUserByID, getUserByEmail, deleteUser, deleteUserByID, createUser, updateUser
