import { BasicResponse } from './types'
import { IHelloController } from './interfaces'
import { LogSuccess } from '../utils/logger'

export class HelloController implements IHelloController {
  public async getMessage(name?: string | undefined): Promise<BasicResponse> {
    LogSuccess('[/api/hello GET Request]')
    return {
      message: `Hello ${name || 'Anonimous!'}`
    }
  }
}
