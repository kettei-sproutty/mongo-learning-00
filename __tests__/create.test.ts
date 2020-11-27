import UserModel from '@models/user'
import { IUser } from '@typings/user'
import { expect } from 'chai'

describe('Creating records', () => {
  it('saves an user', done => {
    const joeData: IUser = { name: 'Joe' }
    const joe = new UserModel(joeData)
    const saving = joe.save()

    saving
      .then(joe => {
        expect(!joe.isNew).to.be.true
        done()
      })
      .catch(done)
  })
})
