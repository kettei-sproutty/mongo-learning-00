import UserModel from '@models/user'
import mongoose from 'mongoose'
import { expect } from 'chai'

describe('Validating records', () => {
  it('requires an user name', () => {
    const user = new UserModel({ postCount: 0, name: undefined })
    const validation = user.validateSync()
    expect(validation).to.exist
    const { message } = validation!.errors.name as mongoose.Error.ValidatorError
    expect(message).to.be.equal('Name is required')
  })

  it('requires an user name longer then 2', () => {
    const user = new UserModel({ name: 'T' })
    const validation = user.validateSync()
    expect(validation).to.exist
    const { message } = validation!.errors.name as mongoose.Error.ValidatorError
    expect(message).to.be.equal('Name must be at least three characters')
  })

  it('disallows invalid record from being saved', done => {
    const user = new UserModel({ name: 'U' })
    user.save().catch(error => {
      const { message } = error.errors.name as mongoose.Error.ValidationError
      expect(message).to.be.equal('Name must be at least three characters')
      done()
    })
  })
})
