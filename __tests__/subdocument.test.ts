import UserModel from '@models/user'
import { IUser } from '@typings/user'
import { expect } from 'chai'

describe('Subdocuments', () => {
  it('can create a subdocument', done => {
    const joeDoc: IUser = {
      name: 'Joe',
      posts: [{ title: 'Hello World' }],
    }

    const joe = new UserModel(joeDoc)
    joe
      .save()
      .then(() => UserModel.findOne({ name: 'Joe' }))
      .then(user => {
        expect(user).to.exist
        expect(user!.posts).to.exist
        expect(user!.posts!).to.have.lengthOf(1)
        expect(user?.posts![0]?.title).to.be.equals('Hello World')
        done()
      })
      .catch(done)
  })

  it('Can add subdocuments to an existing record', done => {
    UserModel.create({ name: 'Joe', posts: [] }).then(() => {
      UserModel.findOneAndUpdate(
        { name: 'Joe' },
        { $push: { posts: { title: 'Hello World' } } },
        { new: true }
      ).then(joe => {
        expect(joe).to.exist
        if (!joe) throw 'Suppress ts Strict Null Check'
        expect(joe.posts).to.have.lengthOf(1)
        done()
      })
    })
  })

  it('Should remove an existing subdocument', done => {
    UserModel.create({ name: 'Joe', posts: [{ title: 'Hello World' }] }).then(() => {
      UserModel.findOneAndUpdate(
        { name: 'Joe' },
        { $pull: { posts: { title: 'Hello World' } } },
        { new: true }
      )
        .then(joe => {
          expect(joe).to.exist
          expect(joe?.posts).to.have.lengthOf(0)
          done()
        })
        .catch(done)
    })
  })
})
