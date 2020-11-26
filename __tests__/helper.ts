import mongoose from 'mongoose'

mongoose.connect('mongodb://127.0.0.1:27017/users_test')
mongoose.connection.once('open', console.log).on('error', console.error)
