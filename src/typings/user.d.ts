import mongoose from 'mongoose'
import { IBlogPostModel } from './blogPost'
import { IPost } from './schema'

export interface IUser {
  name: string
  postCount?: readonly number = 0
  posts?: IPost[]
  likes?: number
  blogPosts?: (string | IBlogPostModel)[]
}

export interface IUserModel extends IUser, mongoose.Document {}
