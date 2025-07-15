// src/ai/flows/chat.ts
'use server';
/**
 * @fileOverview An AI flow for the AI Business Co-founder.
 *
 * - chat - A function that provides a business analysis.
 * - CoFounderInput - The input type for the chat function.
 * - CoFounderOutput - The return type for the chat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CoFounderInputSchema = z.object({
  businessIdea: z.string().describe('A detailed description of the business idea.'),
  targetAudience: z.string().describe('A description of the target audience for the product.'),
  revenueModel: z.string().describe('How the business plans to make money (e.g., subscriptions, ads, sales).'),
});
export type CoFounderInput = z.infer<typeof CoFounderInputSchema>;

const CoFounderOutputSchema = z.object({
  executiveSummary: z.string().describe("A high-level, concise summary of the business idea and its potential. This should be a compelling elevator pitch."),
  strengthAnalysis: z.string().describe("An analysis of the key strengths of the business idea. What makes it strong?"),
  weaknessAnalysis: z.string().describe("A candid analysis of potential weaknesses, risks, or challenges the business might face."),
  nextSteps: z.string().describe("A list of 3-5 actionable next steps the founder should take to move the business idea forward."),
});
export type CoFounderOutput = z.infer<typeof CoFounderOutputSchema>;

export async function chat(input: CoFounderInput): Promise<CoFounderOutput> {
  return coFounderFlow(input);
}

const prompt = ai.definePrompt({
  name: 'coFounderPrompt',
  input: {schema: CoFounderInputSchema},
  output: {schema: CoFounderOutputSchema},
  prompt: `You are an expert AI Business Co-founder and startup strategist. 
  
  Your task is to provide a sharp, insightful, and honest analysis of the user's business idea.
  Your feedback should be encouraging but also realistic, like a true co-founder would be.

  Business Idea: {{{businessIdea}}}
  Target Audience: {{{targetAudience}}}
  Revenue Model: {{{revenueModel}}}

  Generate a response with the following sections:
  - Executive Summary: A powerful elevator pitch for the idea.
  - Strength Analysis: What are the strongest points? Why will this win?
  - Weakness Analysis: What are the biggest risks and challenges? Be honest.
  - Next Steps: What are the immediate, actionable next steps?
  
  Provide clear, concise, and valuable advice.
  `,
});

const coFounderFlow = ai.defineFlow(
  {
    name: 'coFounderFlow',
    inputSchema: CoFounderInputSchema,
    outputSchema: CoFounderOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
