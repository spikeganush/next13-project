import Post from '@models/post';
import Tag from '@models/tag';
import { connectToDatabase } from '@utils/database';

export const POST = async (request) => {
  const { userId, post, tags } = await request.json();

  try {
    await connectToDatabase();
    const newPost = new Post({ creator: userId, post, tags });
    await newPost.save();

    tags.forEach(async (tag) => {
      const tagExists = await Tag.findOne({ name: tag });

      if (!tagExists) {
        const newTag = new Tag({ name: tag });
        await newTag.save();
      }
    });
    return new Response(JSON.stringify(newPost), { status: 201 });
  } catch (error) {
    return new Response('Failed to create a new post', { status: 500 });
  }
};
