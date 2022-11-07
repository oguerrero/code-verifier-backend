import mongoose from 'mongoose'
import { IKata } from './interfaces/Kata.interface'

/**
 * It returns a mongoose model called Katas, which is a schema of type IKata.
 * @returns A function that returns a mongoose model.
 */
export const kataEntity = () => {
  let kataSchema = new mongoose.Schema<IKata>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    level: { type: String, required: true },
    intents: { type: Number, required: true },
    stars: { type: Number, required: true },
    creator: { type: String, required: true }, 
    solution: { type: String, required: true },
    participants: { type: [], required: true }
  })

  return mongoose.models.Katas || mongoose.model<IKata>('Katas', kataSchema)
}
