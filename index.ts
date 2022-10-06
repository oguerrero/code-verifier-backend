import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'

// Configuration for .env file
dotenv.config()

// Create Express APP
const app: Express = express()
const port: string | number = process.env.PORT || 8000

// Routes
app.get('/', (req, res) => {
  res.send(
    'TEST APP EXPRESS + TS + NODEMON + CONCURRENTLY + JEST + SWAGGER + MONGOOSE'
  )
})

app.get('/hello', (req, res) => {
    res.send(
      'Hello'
    )
  })

// Execute Server and Listen to PORT
app.listen(port, () =>
  console.log(`>>> Express server running in http://localhost:${port}`)
)
