// FeatureSuggestion flow implemented that provides feature suggestions based on the user's project idea.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FeatureSuggestionInputSchema = z.object({
  projectIdea: z.string().describe('The user\u2019s project idea.'),
});
export type FeatureSuggestionInput = z.infer<typeof FeatureSuggestionInputSchema>;

const FeatureSuggestionOutputSchema = z.object({
  suggestedFeatures: z
    .array(z.string())
    .describe('A list of suggested features for the MVP.'),
});
export type FeatureSuggestionOutput = z.infer<typeof FeatureSuggestionOutputSchema>;

export async function suggestFeatures(input: FeatureSuggestionInput): Promise<FeatureSuggestionOutput> {
  return suggestFeaturesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'featureSuggestionPrompt',
  input: {schema: FeatureSuggestionInputSchema},
  output: {schema: FeatureSuggestionOutputSchema},
  prompt: `You are an AI copilot designed to help users brainstorm key features for their MVP (Minimum Viable Product).

  Based on the project idea provided, suggest a list of features that would be relevant and useful for the user's MVP.
  Return the features as a list of strings.

  Project Idea: {{{projectIdea}}}
  `,
});

const suggestFeaturesFlow = ai.defineFlow(
  {
    name: 'suggestFeaturesFlow',
    inputSchema: FeatureSuggestionInputSchema,
    outputSchema: FeatureSuggestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
