import mongoose from 'mongoose'
import { ICommentModel } from './comment'

export interface IBlogPost {
  title: string
  content: string
  comments?: (string | ICommentModel)[]
}

export interface IBlogPostModel extends IBlogPost, mongoose.Document {}
