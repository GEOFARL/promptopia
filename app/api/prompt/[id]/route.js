import Prompt from '@/models/Prompt';
import { connectToDB } from '@/utils/database';

export const GET = async (req, res, { params }) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate('creator');

    if (!prompt) {
      return new Response('Prompt not found', { status: 404 });
    }

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response('Error fetching posts', { status: 500 });
  }
};

export const PATCH = async (req, res, { params }) => {
  const { prompt, tag } = await req.json();
  try {
    await connectToDB();

    const existingPrompt = await Prompt.findById(params.id).populate('creator');

    if (!existingPrompt) {
      return new Response('Prompt not found', { status: 404 });
    }

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (err) {
    return new Response('Failed to update prompt', { status: 500 });
  }
};

export const DELETE = async (req, res, { params }) => {
  try {
    await connectToDB();

    await Prompt.findByIdAndRemove(params.id);

    return new Response('Prompt deleted successfully', { status: 200 });
  } catch (err) {
    return new Response('Failed to delete prompt', { status: 500 });
  }
};
