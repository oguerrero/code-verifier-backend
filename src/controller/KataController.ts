import { IKata } from '../domain/entities/interfaces/Kata.interface'
import {
  createKataDB,
  deleteKataDB,
  getAllKatasDB,
  getKataByID,
  updateKataDB
} from '../domain/orm/Kata.orm'
import { LogSuccess, LogWarning } from '../utils/logger'
import { Delete, Get, Post, Put, Query, Route, Tags } from 'tsoa'
import { IKataController } from './interfaces'

@Route('/api/users')
@Tags('UserController')
export class KataController implements IKataController {
  @Get('/')
  public async getKata(
    @Query() page: number,
    @Query() limit: number,
    @Query() id?: string
  ): Promise<any> {
    let response: any = ''

    // GET KATA BY ID
    if (id) {
      LogSuccess(`[/api/katas] GET kata by ID: ${id} request`)
      response = await getKataByID(id)

      return response
    }

    // GET ALL KATAS
    LogSuccess('[/api/katas] GET all katas request')
    response = await getAllKatasDB(page, limit)
    return response
  }
  @Post('/')
  public async createKata(@Query() kata: IKata): Promise<any> {
    let response: any = ''

    if (!kata) {
      LogWarning(`[/api/auth] Register kata is undefined`)
      response = {
        status: 400,
        message: 'Please provide a valid kata to register'
      }
      return response
    }
    LogSuccess(`[/api/auth/register] Register new kata ${kata} request`)
    await createKataDB(kata).then((r) => {
      response = { status: 201, message: `Kata ${kata.name} created` }
    })
    return response
  }
  @Put('/')
  public async updateKata(
    @Query() id: string,
    @Query() kata: IKata
  ): Promise<any> {
    let response: any = ''

    if (!id) {
      LogWarning(`[/api/kata] PUT kata undefined`)
      response = {
        status: 400,
        message: 'Please provide a valid kata to update'
      }
      return response
    }

    LogSuccess(`[/api/kata] PUT kata: ${kata.name} request`)
    await updateKataDB(id, kata).then((r) => {
      response = { status: 204, message: `Kata ${kata.name} updated` }
    })
    return response
  }
  @Delete('/')
  public async deleteKata(@Query() id?: string | undefined): Promise<any> {
    let response: any = ''

    if (!id) {
      LogWarning(`[/api/katas] DELETE kata by ID: id undefined`)
      response = {
        status: 400,
        message: 'Please provide a valid ID to remove from DB'
      }
      return response
    }

    LogSuccess(`[/api/katas] DELETE kata by ID: ${id} request`)
    await deleteKataDB(id).then((r) => {
      response = {
        status: 204,
        message: `Kata removed from DB with ID: ${id}`
      }
    })
    return response
  }
}
