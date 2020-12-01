import { IComment, ICommentModel } from '@typings/comment'
import mongoose, { Schema } from 'mongoose'

const CommentSchema = new Schema<IComment>({
  content: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
})

const modelName = 'Comment'

const CommentModel = mongoose.model<ICommentModel>(modelName, CommentSchema)

export default (mongoose.models.Comment as typeof CommentModel) || CommentModel
