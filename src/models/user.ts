import mongoose from 'mongoose'
import { IUser, IUserModel } from '@typings/user'

const UserSchema = new mongoose.Schema<IUser>({
  name: String,
})

const modelName = 'User'

const UserModel = mongoose.model<IUserModel>(modelName, UserSchema)

export default (mongoose.models.User as typeof UserModel) || UserModel
