import { IPost } from '@typings/schema'
import { Schema } from 'mongoose'

const PostSchema = new Schema<IPost>({
  title: { type: String, required: [true, 'Title is required'] },
})

export default PostSchema
