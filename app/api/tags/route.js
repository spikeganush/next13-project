import Tag from '@models/tag';
import { connectToDatabase } from '@utils/database';

export const GET = async () => {
  try {
    await connectToDatabase();
    const tags = await Tag.find();
    return new Response(JSON.stringify(tags), { status: 200 });
  } catch (error) {
    return new Response('Failed to get tags', { status: 500 });
  }
};
