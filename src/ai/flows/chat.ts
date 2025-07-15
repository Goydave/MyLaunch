
'use server';
/**
 * @fileOverview An AI flow for the AI Co-founder, based on the pitch deck generator.
 *
 * - chat - A function that handles the content generation.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatInputSchema = z.object({
  projectIdea: z.string().describe('A detailed description of the project idea.'),
  targetAudience: z.string().describe('A description of the target audience for the product.'),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.object({
  problem: z.string().describe("A concise description of the problem the project solves. Frame it as a story or a relatable situation."),
  solution: z.string().describe("A clear explanation of how the project solves the problem. Highlight the key features and benefits."),
  marketSize: z.string().describe("An overview of the market size and opportunity (TAM, SAM, SOM). Provide estimated numbers if possible."),
  product: z.string().describe("A detailed look at the product, how it works, and its unique selling propositions (USPs)."),
  businessModel: z.string().describe("How the business will make money. (e.g., Subscription, Freemium, Transaction Fees, etc.)."),
  traction: z.string().describe("Any progress made so far (e.g., sign-ups, revenue, partnerships, user feedback). If none, describe the plan to get traction."),
  team: z.string().describe("A brief overview of the founding team, highlighting relevant experience. If a solo founder, explain why they are the right person."),
  financials: z.string().describe("Key financial projections for the next 3-5 years (e.g., revenue, users, key metrics). Keep it high-level."),
  theAsk: z.string().describe("What the company is asking for (e.g., '$500,000 in seed funding') and how the funds will be used (e.g., 'to hire 2 engineers and for marketing')."),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'coFounderPrompt',
  input: {schema: ChatInputSchema},
  output: {schema: ChatOutputSchema},
  prompt: `You are an expert startup advisor and AI co-founder. 
  
  Your task is to provide a comprehensive analysis of the user's idea, structured like a pitch deck.
  For each section, create concise, powerful, and persuasive text that would impress a venture capitalist.

  Project Idea: {{{projectIdea}}}
  Target Audience: {{{targetAudience}}}

  Generate content for the following sections:
  - Problem: What is the painful problem you're solving?
  - Solution: How do you solve it in a unique way?
  - Market Size: How big is the opportunity?
  - Product: How does your product work? What are the core features?
  - Business Model: How will you make money?
  - Traction: What progress have you made? (If none, what's the plan?)
  - Team: Why is this the right team to build this?
  - Financials: What are your high-level financial projections?
  - The Ask: What are you asking for and what will you use it for?
  
  Be specific and use strong, confident language. Avoid jargon.
  `,
});

const chatFlow = ai.defineFlow(
  {
    name: 'coFounderFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
