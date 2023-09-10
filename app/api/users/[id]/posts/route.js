import Post from '@models/post';
import { connectToDatabase } from '@utils/database';

export const GET = async (request, { params }) => {
  try {
    await connectToDatabase();

    const posts = await Post.find({ creator: params.id }).populate('creator');

    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch posts created by user', {
      status: 500,
    });
  }
};
