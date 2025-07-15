// src/ai/schemas/business-idea.ts
import {z} from 'genkit';

export const BusinessIdeaInputSchema = z.object({
  interests: z.string().describe("A comma-separated list of the user's interests or skills (e.g., 'AI, sustainability, gaming')."),
});
export type BusinessIdeaInput = z.infer<typeof BusinessIdeaInputSchema>;

export const BusinessIdeaSchema = z.object({
    title: z.string().describe("A catchy and descriptive title for the business idea."),
    description: z.string().describe("A one-paragraph summary of the business idea, explaining what it is and who it's for."),
    rationale: z.string().describe("A brief, compelling reason why this is a good idea right now, connecting it to current market trends or economic conditions."),
});
export type BusinessIdea = z.infer<typeof BusinessIdeaSchema>;


export const BusinessIdeaOutputSchema = z.object({
  ideas: z.array(BusinessIdeaSchema).length(3).describe("A list of 3 unique and innovative business ideas."),
});
export type BusinessIdeaOutput = z.infer<typeof BusinessIdeaOutputSchema>;
