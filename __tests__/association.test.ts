import { IBlogPostModel } from '@typings/blogPost'
import { ICommentModel } from '@typings/comment'
import { IUserModel } from '@typings/user'
import UserModel from '@models/user'
import BlogPostModel from '@models/blogPost'
import CommentModel from '@models/comment'

describe('Association', () => {
  let joe: IUserModel
  let blogPost: IBlogPostModel
  let comment: ICommentModel

  beforeEach(done => {
    joe = new UserModel({ name: 'Joe' })
    blogPost = new BlogPostModel({ title: 'JS is great', content: 'Hello' })
    comment = new CommentModel({ content: 'Congrats on great post ' })

    joe.blogPosts?.push(blogPost)
    blogPost.comments!.push(comment)
    comment.user = joe

    Promise.all([joe.save(), blogPost.save(), comment.save()])
      .then(() => {
        done()
      })
      .catch(done)
  })
})
