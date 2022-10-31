import { Get, Query, Route, Tags, Path } from 'tsoa'
import { BasicResponse } from './types'
import { IHelloController } from './interfaces'
import { LogSuccess } from '../utils/logger'

@Route('/api/hello')
@Tags('HelloController')
export class HelloController implements IHelloController {
  /**
   * Endpoint: It returns a promise that resolves to an object with a message property
   * @param {string} [name] - Name of user to be greeted
   * @returns {BasicResponse} A Promise of a BasicResponse object.
   */
  @Get('/')
  public async getMessage(@Query() name?: string ): Promise<BasicResponse> {
    LogSuccess('[/api/hello GET Request]')
    return {
      message: `Hello ${name || 'Anonimous!'}`
    }
  }
}
