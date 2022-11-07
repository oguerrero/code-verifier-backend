import mongoose from 'mongoose'
import { IUser } from './interfaces/User.interface'

/**
 * If there's already a model called 'Users' in mongoose.models, return it, otherwise create a new
 * model called 'Users' using the userSchema and return it.
 * @returns The userSchema is being returned.
 */
export const userEntity = () => {
  let userSchema = new mongoose.Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    katas: { type: [], required: true}
  })

  return mongoose.models.Users || mongoose.model<IUser>('Users', userSchema)
}
