import { assert } from 'chai'
import UserModel from '@models/user'

describe('Creating records', () => {
  it('saves an user', () => {
    UserModel.create({ name: 'Joe' })
  })
})
