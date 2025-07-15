'use server';
/**
 * @fileOverview An AI flow for generating business ideas based on user interests and market trends.
 *
 * - generateBusinessIdeas - A function that suggests business ideas.
 * - BusinessIdeaInput - The input type for the function.
 * - BusinessIdeaOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const BusinessIdeaInputSchema = z.object({
  interests: z.string().describe("A comma-separated list of the user's interests or skills (e.g., 'AI, sustainability, gaming')."),
});
export type BusinessIdeaInput = z.infer<typeof BusinessIdeaInputSchema>;

export const BusinessIdeaSchema = z.object({
    title: z.string().describe("A catchy and descriptive title for the business idea."),
    description: z.string().describe("A one-paragraph summary of the business idea, explaining what it is and who it's for."),
    rationale: z.string().describe("A brief, compelling reason why this is a good idea right now, connecting it to current market trends or economic conditions."),
});
export type BusinessIdea = z.infer<typeof BusinessIdeaSchema>;


const BusinessIdeaOutputSchema = z.object({
  ideas: z.array(BusinessIdeaSchema).length(3).describe("A list of 3 unique and innovative business ideas."),
});
export type BusinessIdeaOutput = z.infer<typeof BusinessIdeaOutputSchema>;

export async function generateBusinessIdeas(input: BusinessIdeaInput): Promise<BusinessIdeaOutput> {
  return businessIdeaGeneratorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'businessIdeaGeneratorPrompt',
  input: {schema: BusinessIdeaInputSchema},
  output: {schema: BusinessIdeaOutputSchema},
  prompt: `You are a savvy venture capitalist and market analyst with a keen eye for emerging trends. Your task is to generate 3 innovative and timely business ideas for a user based on their stated interests.

  The current market is characterized by [You can insert dynamic market data here, but for now, let's assume]: a growing creator economy, a strong focus on AI integration in everyday tools, a demand for sustainable and eco-friendly products, and a permanent shift towards flexible/remote work.

  User's Interests: {{{interests}}}

  For each idea, provide:
  1.  A catchy **Title**.
  2.  A clear **Description** of the product or service.
  3.  A strong **Rationale** explaining why this idea is particularly relevant and has high potential in the current economic climate. Ground your rationale in market trends.

  Be creative, specific, and insightful. The ideas should be actionable and inspiring.
  `,
});

const businessIdeaGeneratorFlow = ai.defineFlow(
  {
    name: 'businessIdeaGeneratorFlow',
    inputSchema: BusinessIdeaInputSchema,
    outputSchema: BusinessIdeaOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('Failed to get a response from the AI for business ideas.');
    }
    return output;
  }
);
