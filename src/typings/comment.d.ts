import mongoose from 'mongoose'
import { IUserModel } from './user'

export interface IComment {
  content: string
  user: string | IUserModel
}

export interface ICommentModel extends IComment, mongoose.Document {}
