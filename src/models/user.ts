import mongoose, { HookNextFunction } from 'mongoose'
import { IUser, IUserModel } from '@typings/user'
import PostSchema from './post'
import BlogPostModel from '@models/blogPost'

const nameValidator = (name: string): boolean => name.length >= 3

const UserSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Name is required'],
    validate: [nameValidator, 'Name must be at least three characters'],
  },
  likes: { type: Number, default: 0 },
  posts: { type: [PostSchema], default: [] },
  blogPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BlogPost' }],
})

UserSchema.virtual('postCount').get(function (this: IUserModel) {
  return this.posts?.length || 0
})

UserSchema.pre('remove', function (this: IUserModel, next: HookNextFunction) {
  BlogPostModel.deleteMany({ _id: { $in: this.blogPosts } })
    .then(() => next())
    .catch(next)
})

const modelName = 'User'

const UserModel = mongoose.model<IUserModel>(modelName, UserSchema)

export default (mongoose.models.User as typeof UserModel) || UserModel
