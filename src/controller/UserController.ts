import { LogError, LogSuccess, LogWarning } from '../utils/logger'
import { Delete, Get, Post, Put, Query, Route, Tags } from 'tsoa'
import { IUserController } from './interfaces'
import {
  createUserDB,
  deleteUserDB,
  getAllUsersDB,
  getUserByID,
  updateUserDB
} from '../domain/orm/User.orm'

// ORM - Users Collection

@Route('/api/users')
@Tags('UserController')
export class UserController implements IUserController {
  /**
   * If the id is present, then get the user by id, otherwise get all users
   * @param {string} [id] - string -&gt; this is the parameter that is passed in the query string
   * @returns The response from the database.
   */
  @Get('/')
  public async getUser(@Query() id?: string): Promise<any> {
    let response: any = ''

    // GET USER BY ID
    if (id) {
      LogSuccess(`[/api/users] GET user by ID: ${id} request`)
      response = await getUserByID(id)
      return response
    }

    // GET ALL USERS
    LogSuccess('[/api/users] GET all users request')
    response = await getAllUsersDB()
    return response
  }

  /**
   * It takes a query parameter, and if it's defined, it will delete a user from the database
   * @param {string} [id] - string - this is the parameter that is passed in the URL.
   * @returns The response object is being returned.
   */
  @Delete('/')
  public async deleteUser(@Query() id?: string): Promise<any> {
    let response: any = ''

    if (!id) {
      LogWarning(`[/api/users] DELETE user by ID: id undefined`)
      response = {
        status: 400,
        message: 'Please provide a valid ID to remove from DB'
      }
      return response
    }

    LogSuccess(`[/api/users] DELETE user by ID: ${id} request`)
    await deleteUserDB(id).then((r) => {
      response = {
        status: 204,
        message: `User removed from DB with ID: ${id}`
      }
      return response
    })
  }

  /**
   * It creates a user in the database if the user is valid
   * @param {any} user - any = {
   * @returns The response object is being returned.
   */
  @Post('/')
  public async createUser(@Query() user: any): Promise<any> {
    let response: any = ''

    if (!user) {
      LogWarning(`[/api/users] POST user undefined`)
      response = {
        status: 400,
        message: 'Please provide a valid user to create'
      }
      return response
    }

    LogSuccess(`[/api/users] POST user: ${user} request`)
    await createUserDB(user).then((r) => {
      response = { status: 201, message: `User ${user.name} created` }
      return response
    })
  }

  @Put('/')
  /**
   * It updates a user in the database
   * @param {string} id - string - the id of the user to update
   * @param {any} user - any
   * @returns The response object is being returned.
   */
  public async updateUser(@Query() id: string, user: any): Promise<any> {
    let response: any = ''

    if (!id) {
      LogWarning(`[/api/users] PUT user undefined`)
      response = {
        status: 400,
        message: 'Please provide a valid user to update'
      }
      return response
    }

    LogSuccess(`[/api/users] PUT user: ${user.name} request`)
    await updateUserDB(id, user).then((r) => {
      response = { status: 204, message: `User ${user.name} updated` }
      return response
    })
  }
}
