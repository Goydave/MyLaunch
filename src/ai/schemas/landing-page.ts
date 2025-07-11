// src/ai/schemas/landing-page.ts
import {z} from 'genkit';

export const LandingPageInputSchema = z.object({
  projectIdea: z.string().describe('A detailed description of the project idea.'),
  branding: z.string().describe("A description of the brand's desired feel and vibe (e.g., 'modern and sleek', 'fun and quirky')."),
});
export type LandingPageInput = z.infer<typeof LandingPageInputSchema>;

const FeatureSchema = z.object({
    title: z.string().describe("A short, catchy title for the feature."),
    description: z.string().describe("A one-sentence description of the feature's benefit."),
});

export const LandingPageOutputSchema = z.object({
  headline: z.string().describe("A powerful, attention-grabbing headline for the landing page."),
  subheadline: z.string().describe("A short, descriptive subheadline that expands on the headline."),
  heroImageUrl: z.string().describe("A data URI of a visually stunning, relevant hero image for the landing page. The image should be in PNG format. The aspect ratio must be 16:9."),
  features: z.array(FeatureSchema).length(3).describe("A list of the top 3 key features of the product."),
});
export type LandingPageOutput = z.infer<typeof LandingPageOutputSchema>;
