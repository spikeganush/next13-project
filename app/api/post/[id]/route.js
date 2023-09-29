import Post from '@models/post';
import Tag from '@models/tag';
import { connectToDatabase } from '@utils/database';

export const GET = async (request, { params }) => {
  try {
    await connectToDatabase();

    const post = await Post.findById(params.id).populate('creator');

    if (!post) {
      return new Response('Post not found', { status: 404 });
    }
    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch all posts', { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  const { post, tags } = await request.json();
  try {
    await connectToDatabase();

    const existingPost = await Post.findById(params.id);

    existingPost.post = post || existingPost.post;
    existingPost.tags = tags || existingPost.tags;

    await existingPost.save();

    return new Response('Successfully updated the post', { status: 200 });
  } catch (error) {
    return new Response('Failed to update post', { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToDatabase();

    const post = await Post.findById(params.id);
    const posts = await Post.find();
    // return all the tags in each array tags inside each post in one array
    const postTags = post.tags;
    const allTags = posts.map((post) => post.tags).flat();
    const tagsCount = {};
    allTags.forEach((tag) => {
      tagsCount[tag] = (tagsCount[tag] || 0) + 1;
    });
    const tagsTodelete = postTags.filter((tag) => tagsCount[tag] === 1);
    console.log({ tagsTodelete });
    // find the tags in the tags collection and delete them
    await Tag.deleteMany({ name: { $in: tagsTodelete } });
    await Post.findByIdAndRemove(params.id);

    return new Response('Successfully deleted the post', { status: 200 });
  } catch (error) {
    return new Response('Failed to delete post', { status: 500 });
  }
};
