'use server';

/**
 * @fileOverview A flow for generating creative and catchy names for project ideas.
 *
 * - generateIdeaNames - A function that generates idea names.
 * - IdeaNameInput - The input type for the generateIdeaNames function.
 * - IdeaNameOutput - The return type for the generateIdeaNames function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IdeaNameInputSchema = z.object({
  ideaDescription: z
    .string()
    .describe('A description of the project idea.'),
});

export type IdeaNameInput = z.infer<typeof IdeaNameInputSchema>;

const IdeaNameOutputSchema = z.object({
  ideaNames: z
    .array(z.string())
    .describe('An array of creative and catchy names for the project idea.'),
});

export type IdeaNameOutput = z.infer<typeof IdeaNameOutputSchema>;

export async function generateIdeaNames(input: IdeaNameInput): Promise<IdeaNameOutput> {
  return ideaNameGeneratorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'ideaNameGeneratorPrompt',
  input: {schema: IdeaNameInputSchema},
  output: {schema: IdeaNameOutputSchema},
  prompt: `You are a creative branding expert. Generate 5 catchy and creative names for the following project idea:\n\n{{{ideaDescription}}}`,
});

const ideaNameGeneratorFlow = ai.defineFlow(
  {
    name: 'ideaNameGeneratorFlow',
    inputSchema: IdeaNameInputSchema,
    outputSchema: IdeaNameOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
