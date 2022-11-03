import { LogError, LogSuccess } from '../../utils/logger'
import { IAuth } from '../entities/interfaces/Auth.interface'
import { IUser } from '../entities/interfaces/User.interface'
import { userEntity } from '../entities/User.entity'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// * CRUD for Users

/**
 * This function returns all users from the database that have not been deleted.
 * @returns An array of objects.
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

/**
 * It takes in a string, and returns a promise that resolves to either an object or undefined
 * @param {string} id - string - The ID of the user you want to get
 * @returns A promise that resolves to a user object or undefined.
 */
export const getUserByID = async (id: string): Promise<any | undefined> => {
  try {
    let userModel = userEntity()

    return await userModel.findById(id)
  } catch (error) {
    LogError(`[ORM ERROR]: Getting User By ID ${error}`)
  }
}

/**
 * This function deletes a user from the database by their ID.
 * @param {string} id - string - The ID of the user you want to delete
 * @returns The userModel.findByIdAndDelete(id) is returning a promise.
 */
export const deleteUserDB = async (id: string): Promise<any | undefined> => {
  try {
    let userModel = userEntity()
    return await userModel.findByIdAndDelete(id)
  } catch (error) {
    LogError(`[ORM ERROR]: Deleting User By ID ${error}`)
  }
}

/**
 * This function creates a user in the database using the userEntity() function and the user object
 * passed in as an argument.
 * @param {any} user - any
 * @returns The user object
 */
export const createUserDB = async (user: any): Promise<any | undefined> => {
  try {
    let userModel = userEntity()
    return await userModel.create(user)
  } catch (error) {
    LogError(`[ORM ERROR]: Creating User ${error}`)
  }
}

/**
 * This function takes in a user id and a user object and updates the user in the database.
 * @param {string} id - string - the id of the user
 * @param {any} user - any
 * @returns The userModel.findByIdAndUpdate(id, user) is returning a promise.
 */
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

export const registerDB = async (user: IUser): Promise<any | undefined> => {
  try {
    let userModel = userEntity()
    return await userModel.create(user)
  } catch (error) {
    LogError(`[ORM ERROR]: Creating User ${error}`)
  }
}

export const loginUserDB = async (auth: IAuth): Promise<any | undefined> => {
  try {
    let userModel = userEntity()
    userModel.findOne(
      { email: auth.email },
      (err: any, user: IUser) => {
        if (err) {
          // TODO: USER NOT FOUND (500)
        }

        if (!user) {
          // TODO: USER NOT FOUND (404)
        }

        // Decrypt password
        let validPassword = bcrypt.compareSync(auth.password, user.password)

        if (!validPassword) {
          // TODO: ERROR 401
        }

        // CREATE JWT
        // TODO: SECRET must be in .env file
        let token = jwt.sign({ email: user.email }, 'SECRETWORD', {
          expiresIn: '2h'
        })

        return token
      })
  } catch (error) {
    LogError(`[ORM ERROR]: Login ${error}`)
  }
}

export const logoutUserDB = async (auth: IAuth): Promise<any | undefined> => {
  // TODO
}
