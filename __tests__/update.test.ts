import UserModel from '@models/user'
import { IUserModel } from '@typings/user'
import { expect } from 'chai'

describe('Updating record', () => {
  let joe: IUserModel

  beforeEach(done => {
    joe = new UserModel({ name: 'Joe', postCount: 0 })
    joe
      .save()
      .then(() => done())
      .catch(done)
  })

  it('instance type using set and save', () => {
    joe.set('name', 'Alex')
    joe
      .save()
      .then(() => UserModel.find({}))
      .then(users => {
        expect(users).to.have.lengthOf(1)
        expect(users[0]!.name).to.be.equals('Alex')
      })
  })

  it('a model class can uodate', done => {
    UserModel.update({ name: 'Joe' }, { name: 'Alex' })
      .then(() => UserModel.find({ name: 'Alex' }))
      .then(users => {
        expect(users).to.have.lengthOf(1)
        done()
      })
      .catch(done)
  })

  it('a model class can update one record', done => {
    UserModel.findOneAndUpdate({ name: 'Joe' }, { name: 'Alex' })
      .then(() => UserModel.find({ name: 'Alex' }))
      .then(users => {
        expect(users).to.have.lengthOf(1)
        done()
      })
      .catch(done)
  })

  it('a model class can find a record Id and Update', done => {
    UserModel.findByIdAndUpdate(joe._id, { name: 'Alex' })
      .then(() => UserModel.find({ name: 'Alex' }))
      .then(users => {
        expect(users).to.have.lengthOf(1)
        done()
      })
      .catch(done)
  })

  it('A user can have their postcount increment by 1', done => {
    UserModel.findOneAndUpdate({ name: 'Joe' }, { $inc: { postCount: 1 } })
      .then(() => UserModel.findOne({ name: 'Joe' }))
      .then(user => {
        expect(user).to.exist
        expect(user!.postCount).to.be.equals(1)
        done()
      })
      .catch(done)
  })
})
