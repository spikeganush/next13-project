import { Schema, model, models } from 'mongoose';

const tagSchema = new Schema({
  name: {
    type: String,
    unique: [true, 'Tag already exists'],
    required: [true, 'Tag is required'],
  },
});

const Tag = models.Tag || model('Tag', tagSchema);

export default Tag;
