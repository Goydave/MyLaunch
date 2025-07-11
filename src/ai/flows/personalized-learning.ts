// src/ai/flows/personalized-learning.ts
'use server';
/**
 * @fileOverview A personalized learning path recommendation AI agent.
 *
 * - personalizedLearningPath - A function that recommends learning paths.
 * - PersonalizedLearningPathInput - The input type for the personalizedLearningPath function.
 * - PersonalizedLearningPathOutput - The return type for the personalizedLearningPath function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedLearningPathInputSchema = z.object({
  ideaDescription: z
    .string()
    .describe('The user inputted idea description.'),
  projectGoals: z.string().describe('The project goals of the user.'),
  currentProgress: z
    .string()
    .describe('The current progress of the project.'),
});
export type PersonalizedLearningPathInput = z.infer<
  typeof PersonalizedLearningPathInputSchema
>;

const PersonalizedLearningPathOutputSchema = z.object({
  learningPath: z
    .array(z.string())
    .describe('An array of recommended micro-lessons and learning paths.'),
});
export type PersonalizedLearningPathOutput = z.infer<
  typeof PersonalizedLearningPathOutputSchema
>;

export async function personalizedLearningPath(
  input: PersonalizedLearningPathInput
): Promise<PersonalizedLearningPathOutput> {
  return personalizedLearningPathFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedLearningPathPrompt',
  input: {schema: PersonalizedLearningPathInputSchema},
  output: {schema: PersonalizedLearningPathOutputSchema},
  prompt: `You are an AI assistant designed to provide personalized learning paths for users working on their projects.

  Based on the user's idea description, project goals, and current progress, recommend a list of relevant micro-lessons and learning paths.
  The learning paths should be tailored to help the user efficiently learn the necessary skills to bring their idea to life.

  Idea Description: {{{ideaDescription}}}
  Project Goals: {{{projectGoals}}}
  Current Progress: {{{currentProgress}}}

  Here's an example of a good learning path:
  [
    "How to find Product-Market Fit",
    "Build your MVP in 24 hours",
    "Creating a pitch deck that converts",
    "Monetizing your product"
  ]

  Return a JSON array of strings for the best learning path.
  `,
});

const personalizedLearningPathFlow = ai.defineFlow(
  {
    name: 'personalizedLearningPathFlow',
    inputSchema: PersonalizedLearningPathInputSchema,
    outputSchema: PersonalizedLearningPathOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
