import dotenv from 'dotenv'
import server from './src/server'
import { LogError, LogSuccess } from './src/utils/logger'

// * Configuration for .env file
dotenv.config()

const port: string | number = process.env.PORT || 8000

// * EXECUTE SERVER
server.listen(port, () =>
  LogSuccess(`[SERVER ON]: Running in http://localhost:${port}/api`)
)

// * Control SERVER ERROR
server.on('error', (error) => {
  LogError(`[SERVER ERROR]: ${error}`)
})
