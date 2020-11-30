import UserModel from '@models/user'
import { expect } from 'chai'

describe('Virtual types', () => {
  it('postCount return a number of posts', done => {
    UserModel.create({ name: 'Joe', posts: [{ title: 'Hello World' }] }).then(user => {
      expect(user).to.exist
      done()
    })
  })
})
