'use server';
/**
 * @fileOverview AI-powered content generation tool for MyLaunch app.
 *
 * - generateProductDescriptionTool - A tool that generates product descriptions based on a project idea.
 * - GenerateProductDescriptionInput - The input type for the generateProductDescription function.
 * - GenerateProductDescriptionOutput - The return type for the generateProductDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProductDescriptionInputSchema = z.object({
  projectIdea: z.string().describe('The user-provided project idea.'),
});
export type GenerateProductDescriptionInput = z.infer<typeof GenerateProductDescriptionInputSchema>;

const GenerateProductDescriptionOutputSchema = z.object({
  shortDescription: z.string().describe('A short, catchy description of the product.'),
  longDescription: z.string().describe('A detailed description of the product.'),
});
export type GenerateProductDescriptionOutput = z.infer<typeof GenerateProductDescriptionOutputSchema>;


const prompt = ai.definePrompt({
  name: 'generateProductDescriptionPrompt',
  input: {schema: GenerateProductDescriptionInputSchema},
  output: {schema: GenerateProductDescriptionOutputSchema},
  prompt: `You are a marketing expert specializing in creating compelling product descriptions. Given a project idea, generate a short, catchy description and a detailed description for the product.

Project Idea: {{{projectIdea}}}
`,
});

export const generateProductDescriptionTool = ai.defineTool(
  {
    name: 'generateProductDescriptionTool',
    description: 'Generates short and long product descriptions based on a project idea.',
    inputSchema: GenerateProductDescriptionInputSchema,
    outputSchema: GenerateProductDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

export async function generateProductDescription(input: GenerateProductDescriptionInput): Promise<GenerateProductDescriptionOutput> {
  return generateProductDescriptionTool(input);
}
