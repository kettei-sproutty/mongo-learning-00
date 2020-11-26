import mongoose from 'mongoose'

export interface IUser {
  name: string
}

export interface IUserModel extends IUser, mongoose.Document {}
