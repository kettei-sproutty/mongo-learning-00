import { after, before } from 'mocha'
import mongoose from 'mongoose'

const options: mongoose.ConnectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}

before(() => {
  mongoose.connect('mongodb://127.0.0.1:27017/users_test', options)
  mongoose.connection.once('open', console.log).on('error', console.error)
})

beforeEach(done => {
  const collections = Object.keys(mongoose.connection.collections)
  collections.map(collection => {
    if (!collection) return
    mongoose.connection.collections[collection]
      ?.drop()
      .then(() => null)
      .catch(() => null)
    done()
  })
})

after(done => {
  mongoose.connection.close(done)
})
