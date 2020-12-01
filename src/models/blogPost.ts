import { IBlogPost, IBlogPostModel } from '@typings/blogPost'
import mongoose, { Schema } from 'mongoose'

const BlogPostSchema = new Schema<IBlogPost>({
  title: { type: String, requried: true },
  content: { type: String, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
})

const modelName = 'BlogPost'

const BlogPostModel = mongoose.model<IBlogPostModel>(modelName, BlogPostSchema)

export default (mongoose.models.BlogPost as typeof BlogPostModel) || BlogPostModel
