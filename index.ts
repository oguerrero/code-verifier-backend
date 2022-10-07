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

app.get('/goodbye', (req, res) => {
  res.status(200).json({ data: { message: 'Goodbye world' } })
})

app.get('/hello', (req, res) => {
  console.log(req.query)
  if (req.query.name) res.status(200).json({ data: { message: `Hola, ${req.query.name}` } })
  else res.status(200).json({ data: { message: 'Hola, anonimo' } })
})

// Execute Server and Listen to PORT
app.listen(port, () =>
  console.log(`>>> Express server running in http://localhost:${port}`)
)
