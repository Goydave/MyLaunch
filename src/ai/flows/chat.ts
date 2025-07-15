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
import { saveCopilotSession } from '@/services/firestore';
import { auth } from "firebase-admin";

const CoFounderInputSchema = z.object({
  businessIdea: z.string().describe('A detailed description of the business idea.'),
  targetAudience: z.string().describe('A description of the target audience for the product.'),
  revenueModel: z.string().describe('How the business plans to make money (e.g., subscriptions, ads, sales).'),
});
export type CoFounderInput = z.infer<typeof CoFounderInputSchema>;

const ExecutionStepSchema = z.object({
  title: z.string().describe("A concise title for this step."),
  description: z.string().describe("A one-sentence description of what this step entails."),
});

const CoFounderOutputSchema = z.object({
  executiveSummary: z.string().describe("A high-level, concise summary of the business idea and its potential. This should be a compelling elevator pitch that a VC would understand in 30 seconds."),
  
  marketAnalysis: z.object({
    targetAudiencePersona: z.string().describe("A detailed persona of the ideal customer, including demographics, needs, and pain points."),
    marketSize: z.string().describe("An estimated market size (TAM, SAM, SOM) analysis. Provide realistic, data-backed estimates if possible, or a qualitative assessment of the market's scale."),
    competitiveLandscape: z.string().describe("An overview of the key competitors, their strengths, weaknesses, and the project's differentiation."),
  }),

  productStrategy: z.object({
    coreFeatures: z.string().describe("A list of the 3-5 most critical features for the Minimum Viable Product (MVP)."),
    uniqueSellingProposition: z.string().describe("A clear statement on what makes this product unique and valuable in the market. Why will it win?"),
  }),
  
  riskAnalysis: z.object({
    potentialRisks: z.string().describe("A bulleted list of the top 3-5 potential risks (market, execution, technical, etc.)."),
    mitigationStrategies: z.string().describe("Actionable strategies to mitigate each of the identified risks."),
  }),

  executionPlan: z.array(ExecutionStepSchema).length(10).describe("A detailed 10-step execution plan from idea to first 100 users. Each step should be clear and actionable."),
  
  investmentVerdict: z.object({
      goNoGo: z.enum(["Go", "No-Go", "Proceed with Caution"]).describe("A final verdict from an investor's perspective."),
      justification: z.string().describe("A concise justification for the Go/No-Go verdict, highlighting the most critical factor for success or failure."),
  }),
});
export type CoFounderOutput = z.infer<typeof CoFounderOutputSchema>;

export async function chat(input: CoFounderInput): Promise<CoFounderOutput> {
  return coFounderFlow(input);
}

const prompt = ai.definePrompt({
  name: 'coFounderPrompt',
  input: {schema: CoFounderInputSchema},
  output: {schema: CoFounderOutputSchema},
  prompt: `You are a world-class venture capitalist, startup strategist, and product visionary combined. Your name is "Synapse". You have a reputation for providing brutally honest, exceptionally sharp, and deeply insightful analysis of business ideas. You think like a seasoned investor who has seen thousands of pitches.

  Your task is to conduct a comprehensive "due diligence" on the user's business idea. Go beyond surface-level feedback. I want a deep, structured analysis that uncovers true potential and hidden risks.

  Business Idea: {{{businessIdea}}}
  Target Audience: {{{targetAudience}}}
  Revenue Model: {{{revenueModel}}}

  Generate a response with the following structured sections:
  - **Executive Summary**: A powerful, concise elevator pitch. Make it compelling.
  - **Market Analysis**:
    - **Target Audience Persona**: Who is the ideal customer? Be specific.
    - **Market Size**: How big is this opportunity, really? Use TAM/SAM/SOM if you can estimate it.
    - **Competitive Landscape**: Who are the real competitors? What's our unfair advantage?
  - **Product Strategy**:
    - **Core MVP Features**: What are the absolute essential features to prove the concept?
    - **Unique Selling Proposition (USP)**: What is the single most compelling reason this will win?
  - **Risk Analysis**:
    - **Potential Risks**: What could kill this company? Be ruthless.
    - **Mitigation Strategies**: How can we proactively address these risks?
  - **Execution Plan**: A detailed, 10-step plan from today to the first 100 users. Make every step concrete.
  - **Investment Verdict**:
    - **Go/No-Go**: As an investor, would you fund this? Be decisive.
    - **Justification**: Why? What is the single most critical factor that drives your decision?

  Your tone should be professional, direct, and authoritative, but ultimately constructive. You are the user's secret weapon. Do not use fluff or generic business platitudes. Provide the kind of analysis that would be worth thousands of dollars.
  `,
});

const coFounderFlow = ai.defineFlow(
  {
    name: 'coFounderFlow',
    inputSchema: CoFounderInputSchema,
    outputSchema: CoFounderOutputSchema,
  },
  async (input, streamingCallback, context) => {
    // Note: The Genkit context doesn't directly provide the client's Firebase Auth UID.
    // We are simulating getting the user from the server's authentication state.
    const userId = context?.auth?.uid;

    if (!userId) {
      console.warn("Warning: No authenticated user ID found. Session will not be saved.");
    }
    
    const {output} = await prompt(input);

    if (!output) {
        throw new Error("Failed to get a response from the AI.");
    }

    // Save to Firestore if we have a user ID and a valid output.
    if (userId) {
      await saveCopilotSession(userId, input, output);
    }
    
    return output;
  }
);
