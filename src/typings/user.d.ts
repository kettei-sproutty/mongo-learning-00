import mongoose from 'mongoose'
import { IPost } from './schema'

export interface IUser {
  name: string
  postCount?: readonly number = 0
  posts?: IPost[]
  likes?: number
}

export interface IUserModel extends IUser, mongoose.Document {}
