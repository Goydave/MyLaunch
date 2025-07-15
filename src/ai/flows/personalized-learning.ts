
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
    videos: z.array(VideoSchema).max(4).describe("A list of 2-4 recommended YouTube videos for this step. Use the provided tools to find relevant videos."),
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

// Mock YouTube search tool
const searchYoutube = ai.defineTool(
    {
        name: 'searchYoutube',
        description: 'Searches YouTube for videos based on a query and returns a list of relevant videos with their titles and IDs.',
        inputSchema: z.object({
            query: z.string().describe('The search query for YouTube.'),
        }),
        outputSchema: z.array(VideoSchema),
    },
    async ({ query }) => {
        // In a real application, this would call the YouTube Data API.
        // For this example, we'll return some mock data based on keywords.
        console.log(`Searching YouTube for: ${query}`);
        const lowerCaseQuery = query.toLowerCase();
        if (lowerCaseQuery.includes('saas')) {
             return [
                { title: "How to Build a SaaS with Next.js, Stripe, and Supabase", videoId: "pVKu4Se_s_k" },
                { title: "The Perfect Tech Stack for a SaaS in 2024", videoId: "i2z4g5f2k1o" },
                { title: "From 0 to $1M ARR: A SaaS Founder's Story", videoId: "l_5sI5z2-wE" },
            ];
        }
        if (lowerCaseQuery.includes('marketing')) {
            return [
                { title: "Digital Marketing for Beginners: The Ultimate Guide", videoId: "nU-IIXBWlS4" },
                { title: "SEO for Beginners: A Complete Tutorial", videoId: "xs-H1vHwA9A" },
                { title: "How to Create a Social Media Marketing Strategy", videoId: "q42YX11z-hQ" },
            ];
        }
        return [
            { title: "How to learn anything, fast!", videoId: "kX0tgpSdv4c" },
            { title: "The First 20 Hours -- How to Learn Anything", videoId: "5MgBikgcWnY" },
        ];
    }
);

export async function personalizedLearningPath(
  input: PersonalizedLearningPathInput
): Promise<PersonalizedLearningPathOutput> {
  return personalizedLearningPathFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedLearningPathPrompt',
  input: {schema: PersonalizedLearningPathInputSchema},
  output: {schema: PersonalizedLearningPathOutputSchema},
  tools: [searchYoutube],
  prompt: `You are an AI Learning Mentor. Your primary goal is to create a comprehensive, factual, and high-quality step-by-step learning roadmap.

  The user wants to learn about: {{{learningTopic}}}

  First, break down the learning topic into a structured roadmap with 3 to 7 distinct steps. For each step, create a clear title and a concise description.
  
  Then, for each step in the roadmap, you MUST use the 'searchYoutube' tool to find 2-4 highly-rated, relevant YouTube video tutorials. Your search query for the tool should be specific to the step's title.
  
  You must also provide a list of 2-4 high-quality supplementary resources, such as articles, official documentation, or essential tools. For these, it is CRITICAL that you provide the real title and a valid, working URL.

  Your output must be a well-structured JSON object that adheres to the defined schema. The accuracy and validity of the links and IDs are of the utmost importance.
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
