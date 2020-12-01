import { IBlogPostModel } from '@typings/blogPost'
import { ICommentModel } from '@typings/comment'
import { IUserModel } from '@typings/user'
import UserModel from '@models/user'
import BlogPostModel from '@models/blogPost'
import CommentModel from '@models/comment'
import { expect } from 'chai'

describe('Association', () => {
  let joe: IUserModel
  let blogPost: IBlogPostModel
  let comment: ICommentModel

  beforeEach(done => {
    joe = new UserModel({ name: 'Joe' })
    blogPost = new BlogPostModel({ content: 'Hello', title: 'JS is great' })
    comment = new CommentModel({ content: 'Congrats on great post ' })

    comment.user = joe
    blogPost.comments!.push(comment)
    joe.blogPosts?.push(blogPost)

    Promise.all([joe.save(), comment.save(), blogPost.save()])
      .then(() => {
        done()
      })
      .catch(done)
  })

  it('saves a relation between a user and a blogpost', done => {
    UserModel.findOne({ name: 'Joe' })
      .populate('blogPosts')
      .then(user => {
        done()
        expect(user?.blogPosts).to.have.lengthOf(1)
      })
  })

  it('saves a full relation tree', done => {
    UserModel.findOne({ name: 'Joe' })
      .populate({
        path: 'blogPosts',
        populate: {
          path: 'comments',
          model: 'Comment',
        },
      })
      .then(user => {
        expect(user).to.exist
        expect(user!.blogPosts).to.have.lengthOf(1)
        if (!user?.blogPosts) throw ''
        expect((user!.blogPosts[0] as IBlogPostModel).comments).to.have.lengthOf(1)
        expect(typeof (user!.blogPosts[0] as IBlogPostModel)).to.be.not.equals('string')
        done()
      })
      .catch(done)
  })
})
