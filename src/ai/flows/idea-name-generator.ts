
'use server';

/**
 * @fileOverview A tool for generating creative and catchy names for project ideas.
 *
 * - generateIdeaNamesTool - A tool that generates idea names.
 * - IdeaNameInput - The input type for the generateIdeaNames tool.
 * - IdeaNameOutput - The return type for the generateIdeaNames tool.
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

const prompt = ai.definePrompt({
  name: 'ideaNameGeneratorPrompt',
  input: {schema: IdeaNameInputSchema},
  output: {schema: IdeaNameOutputSchema},
  prompt: `You are a creative branding expert. Generate 5 catchy and creative names for the following project idea:\n\n{{{ideaDescription}}}`,
});

export const generateIdeaNamesTool = ai.defineTool(
  {
    name: 'generateIdeaNamesTool',
    description: 'Generates 5 catchy and creative names for a project idea.',
    inputSchema: IdeaNameInputSchema,
    outputSchema: IdeaNameOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);

export async function generateIdeaNames(input: IdeaNameInput): Promise<IdeaNameOutput> {
  return generateIdeaNamesTool(input);
}
