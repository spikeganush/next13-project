import Prompt from '@models/prompt';
import { connectToDatabase } from '@utils/database';

export const GET = async (request, { params }) => {
  try {
    await connectToDatabase;

    const prompt = await Prompt.findById(params.id).populate('creator');

    if (!prompt) {
      return new Response('Prompt not found', { status: 404 });
    }
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch all prompts', { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  const { prompt, tags } = await request.json();
  try {
    await connectToDatabase;

    const existingPrompt = await Prompt.findById(params.id);

    existingPrompt.prompt = prompt || existingPrompt.prompt;
    existingPrompt.tags = tags || existingPrompt.tags;

    await existingPrompt.save();

    return new Response('Successfully updated the prompt', { status: 200 });
  } catch (error) {
    return new Response('Failed to update prompt', { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToDatabase;

    await Prompt.findByIdAndRemove(params.id);

    return new Response('Successfully deleted the prompt', { status: 200 });
  } catch (error) {
    return new Response('Failed to delete prompt', { status: 500 });
  }
};
