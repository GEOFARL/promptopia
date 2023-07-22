import { connectToDB } from '@/utils/database';

import Prompt from '@/models/Prompt';

export const GET = async (req, res, { params }) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({ creator: params.id }).populate(
      'creator'
    );

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response('Error fetching posts', { status: 500 });
  }
};