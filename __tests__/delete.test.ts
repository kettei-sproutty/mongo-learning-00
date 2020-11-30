import UserModel from '@models/user'
import { IUserModel } from '@typings/user'
import { expect } from 'chai'

describe('Deleting a user', () => {
  let joe: IUserModel

  beforeEach(done => {
    joe = new UserModel({ name: 'Joe' })
    joe
      .save()
      .then(() => done())
      .catch(done)
  })

  it('model instance remove', done => {
    joe
      .remove()
      .then(() => UserModel.findOne({ name: 'Joe' }))
      .then(user => {
        expect(user).to.be.null
        done()
      })
      .catch(done)
  })

  /**@deprecated */
  // it('class method remove', done => {
  //   UserModel.remove({ name: 'Joe' })
  //     .then(() => done())
  //     .catch(done)
  // })

  it('class method remove', done => {
    UserModel.deleteOne({ name: 'Joe' })
      .then(() => done())
      .catch(done)
  })

  it('class method findOneAndRemove', done => {
    UserModel.findOneAndRemove({ name: 'Joe' })
      .then(() => UserModel.findOne({ name: 'Joe' }))
      .then(user => {
        expect(user).to.be.null
        done()
      })
      .catch(done)
  })

  it('class method findByIdAndRemove', done => {
    UserModel.findByIdAndRemove(joe._id)
      .then(() => UserModel.findOne({ _id: joe._id }))
      .then(user => {
        expect(user).to.be.null
        done()
      })
      .catch(done)
  })
})
