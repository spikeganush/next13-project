import { Schema, model, models } from 'mongoose';

const PostSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  post: {
    type: String,
    required: [true, 'Post is required.'],
  },
  tags: {
    type: Array,
    required: [true, 'Tag is required.'],
  },
});

const Post = models.Post || model('Post', PostSchema);

export default Post;
