import mongoose from 'mongoose'
import { IUser, IUserModel } from '@typings/user'
import PostSchema from './post'

const nameValidator = (name: string): boolean => name.length >= 3

const UserSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Name is required'],
    validate: [nameValidator, 'Name must be at least three characters'],
  },
  likes: { type: Number, default: 0 },
  posts: { type: [PostSchema], default: [] },
})

UserSchema.virtual('postCount').get(function (this: IUser) {
  return this.posts?.length || 0
})

const modelName = 'User'

const UserModel = mongoose.model<IUserModel>(modelName, UserSchema)

export default (mongoose.models.User as typeof UserModel) || UserModel
