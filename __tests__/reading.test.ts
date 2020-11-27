import UserModel from '@models/user'
import { IUserModel } from '@typings/user'
import { expect } from 'chai'

describe('reading users out of the database', () => {
  let joe: IUserModel

  beforeEach(done => {
    joe = new UserModel({ name: 'Joe' })
    joe
      .save()
      .then(() => done())
      .catch(done)
  })

  it('finds all users with a name of "Joe"', done => {
    UserModel.find({ name: 'Joe' })
      .then(users => {
        expect(users).to.have.lengthOf(1)
        //.toString() becouse _id is of type { Object (_bsontype, id) }
        expect(users[0]!._id.toString()).to.be.equals(joe._id.toString())
        done()
      })
      .catch(done)
  })

  it('find an user with a particular "_id"', done => {
    UserModel.findOne({ name: 'Joe' })
      .then(user => {
        expect(user).to.exist
        expect(user!.name).to.be.equals('Joe')
        done()
      })
      .catch(done)
  })
})
