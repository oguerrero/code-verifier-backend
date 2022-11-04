import { LogError, LogSuccess } from '../../utils/logger'
import { IAuth } from '../entities/interfaces/Auth.interface'
import { IUser } from '../entities/interfaces/User.interface'
import { userEntity } from '../entities/User.entity'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import dotenv from 'dotenv'
import { UserResponse } from '@/types/UsersResponse.type'
dotenv.config()
const secret: string | undefined = process.env.SECRETKEY

// * CRUD for Users

/**
 * This function returns all users from the database that have not been deleted.
 * @returns An array of objects.
 */
export const getAllUsersDB = async (
  page: number,
  limit: number
): Promise<UserResponse | undefined> => {
  try {
    let userModel = userEntity()

    let response: UserResponse = {
      users: [],
      totalPages: 1,
      currentPage: 1
    }

    // GET USERS
    await userModel
      .find({ isDeleted: false }, { password: 0, __v : 0 } )
      .limit(limit)
      .skip((page - 1) * limit)
      .then((users: IUser[]) => {
        response.users = users
      })

    // COUNTING TOTAL PAGES
    await userModel.countDocuments().then((total: number) => {
      response.totalPages = Math.ceil(total / limit)
      response.currentPage = page
    })

    return response
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

    return await userModel.findById(id, { password: 0, __v : 0 } )
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
    LogError(`[ORM ERROR]: Register User ${error}`)
  }
}

export const loginUserDB = async (auth: IAuth): Promise<any | undefined> => {
  try {
    let userModel = userEntity()

    let userFound: IUser | undefined = undefined
    let token = undefined

    // Get user
    await userModel
      .findOne({ email: auth.email })
      .then((user: IUser) => {
        userFound = user
      })
      .catch((error) => {
        console.error(`[ORM_ERROR] - USER NOT FOUND ON LOGIN`)
        throw new Error(`[ORM_ERROR] - USER NOT FOUND ON LOGIN: ${error}`)
      })

    // Decrypt password and check if is valid
    let validPassword = bcrypt.compareSync(auth.password, userFound!.password)

    if (!validPassword) {
      console.error(`[ORM_ERROR] - PASSWORD NOT VALID`)
      throw new Error(`[ORM_ERROR] - PASSWORD NOT VALID ON LOGIN:`)
    }

    // CREATE JWT
    token = jwt.sign({ email: userFound!.email }, secret!, {
      expiresIn: '2h'
    })

    return {
      user: userFound,
      token
    }
  } catch (error) {
    LogError(`[ORM ERROR]: Login ${error}`)
  }
}

export const logoutUserDB = async (auth: IAuth): Promise<any | undefined> => {
  // TODO
}
