import UserModel from '@models/user'
import { IUserModel } from '@typings/user'
import { expect } from 'chai'

describe('reading users out of the database', () => {
  let joe: IUserModel
  let maria: IUserModel
  let alex: IUserModel
  let zac: IUserModel

  beforeEach(done => {
    joe = new UserModel({ name: 'Joe' })
    maria = new UserModel({ name: 'Maria' })
    alex = new UserModel({ name: 'Alex' })
    zac = new UserModel({ name: 'Zac' })

    Promise.all([joe.save(), zac.save(), maria.save(), alex.save()])
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

  it('can skip and limit the result set', done => {
    UserModel.find({})
      .sort({ name: 1 }) //asc (-1 for desc)
      .skip(1)
      .limit(2)
      .then(users => {
        expect(users).to.have.lengthOf(2)
        expect(users[0]?.name).to.be.eq('Joe')
        expect(users[1]?.name).to.be.eq('Maria')
        done()
      })
      .catch(done)
  })
})
