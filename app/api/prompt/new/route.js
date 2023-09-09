import Prompt from '@models/prompt';
import Tag from '@models/tag';
import { connectToDatabase } from '@utils/database';

export const POST = async (request) => {
  const { userId, prompt, tags } = await request.json();

  try {
    await connectToDatabase();
    const newPrompt = new Prompt({ creator: userId, prompt, tags });
    await newPrompt.save();

    tags.forEach(async (tag) => {
      const tagExists = await Tag.findOne({ name: tag });

      if (!tagExists) {
        const newTag = new Tag({ name: tag });
        await newTag.save();
      }
    });
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response('Failed to create a new prompt', { status: 500 });
  }
};
