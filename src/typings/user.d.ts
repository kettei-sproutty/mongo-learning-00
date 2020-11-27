import mongoose from 'mongoose'

export interface IUser {
  name: string
  postCount?: number
}

export interface IUserModel extends IUser, mongoose.Document {}
