import { IGoodByeController } from './interfaces'
import { GoodByeResponse } from './types'
import { LogSuccess } from '../utils/logger'

export class GoodByeController implements IGoodByeController {
  public async getMessage(name?: string | undefined): Promise<GoodByeResponse> {
    LogSuccess('[/api/hello GET Request]')
    return {
      message: `Hello ${name || 'Anonimous!'}`,
      date: new Date()
    }
  }
}
