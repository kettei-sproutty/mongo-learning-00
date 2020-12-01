import { expect } from 'chai'
import UserModel from '@models/user'
import BlogPostModel from '@models/blogPost'
import { beforeEach } from 'mocha'
import { IUserModel } from '@typings/user'
import { IBlogPostModel } from '@typings/blogPost'

describe('Middleware', () => {
  let joe: IUserModel
  let blogPost: IBlogPostModel
  beforeEach(done => {
    joe = new UserModel({ name: 'Joe' })
    blogPost = new BlogPostModel({ content: 'Hello', title: 'JS is great' })

    joe.blogPosts?.push(blogPost)

    Promise.all([joe.save(), blogPost.save()])
      .then(() => {
        done()
      })
      .catch(done)
  })

  it('Users clean up dangling blogposts on delete', done => {
    joe
      .remove()
      .then(() => BlogPostModel.countDocuments())
      .then(count => {
        expect(count).to.be.equals(0)
        done()
      })
      .catch(done)
  })
})
