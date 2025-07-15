
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
  learningTopic: z.string().describe('The topic the user wants to learn about.'),
});
export type PersonalizedLearningPathInput = z.infer<typeof PersonalizedLearningPathInputSchema>;

const VideoSchema = z.object({
    title: z.string().describe("The title of the YouTube video."),
    videoId: z.string().describe("The unique ID of the YouTube video."),
});

const ResourceSchema = z.object({
    title: z.string().describe("The title of the resource (e.g., article, tool, documentation)."),
    url: z.string().describe("The full URL to the resource."),
});

const RoadmapStepSchema = z.object({
    title: z.string().describe("The title of this step in the learning roadmap."),
    description: z.string().describe("A detailed description of what to learn in this step and why it's important."),
    videos: z.array(VideoSchema).max(4).describe("A list of 2-4 recommended YouTube videos for this step."),
    resources: z.array(ResourceSchema).max(4).describe("A list of 2-4 supplementary resources like articles or tools."),
});

const PersonalizedLearningPathOutputSchema = z.object({
  roadmap: z
    .array(RoadmapStepSchema)
    .min(3)
    .max(7)
    .describe('An array of steps that form the learning roadmap.'),
});
export type PersonalizedLearningPathOutput = z.infer<typeof PersonalizedLearningPathOutputSchema>;

export async function personalizedLearningPath(
  input: PersonalizedLearningPathInput
): Promise<PersonalizedLearningPathOutput> {
  return personalizedLearningPathFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedLearningPathPrompt',
  input: {schema: PersonalizedLearningPathInputSchema},
  output: {schema: PersonalizedLearningPathOutputSchema},
  prompt: `You are an AI Learning Mentor. Your goal is to create a comprehensive, step-by-step learning roadmap for a user based on their desired learning topic.

  The user wants to learn about: {{{learningTopic}}}

  Generate a structured learning roadmap with 3 to 7 distinct steps. For each step, provide:
  1. A clear, actionable title.
  2. A concise description of the step's objective.
  3. A list of 2-4 highly-rated, relevant YouTube video tutorials. Provide the real title and the correct YouTube video ID.
  4. A list of 2-4 high-quality supplementary resources, such as articles, official documentation, or essential tools. Provide the title and a valid URL.

  Your output must be a well-structured JSON object that adheres to the defined schema.
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
