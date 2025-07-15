
'use server';
/**
 * @fileOverview A simple, non-conversational AI copilot for MyLaunch app.
 *
 * - chat - The main function that handles the AI logic.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {stripIndents} from 'common-tags';

const chatPrompt = ai.definePrompt(
  {
    name: 'simpleCopilotPrompt',
    input: { schema: z.string() },
    output: { schema: z.string() },
    prompt: stripIndents`
      You are an AI co-founder, a helpful and encouraging expert in startups, product development, and marketing.
      Your goal is to help users develop their ideas.
      Provide a helpful and concise response to the following prompt.

      PROMPT:
      ---
      {{input}}
      ---
    `,
  },
);

const chatFlow = ai.defineFlow(
  {
    name: 'simpleChatFlow',
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (prompt) => {
    const result = await chatPrompt(prompt);
    const output = result.output;
    
    if (!output) {
      return "I'm not sure how to respond to that. Could you please rephrase?";
    }

    return output;
  }
);

export async function chat(prompt: string): Promise<string> {
    const response = await chatFlow(prompt);
    return response;
}
