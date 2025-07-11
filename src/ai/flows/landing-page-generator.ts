// src/ai/flows/landing-page-generator.ts
'use server';
/**
 * @fileOverview An AI flow for generating a complete landing page for a startup.
 *
 * - generateLandingPage - A function that handles landing page content and image generation.
 * - LandingPageInput - The input type for the generateLandingPage function.
 * - LandingPageOutput - The return type for the generateLandingPage function.
 */

import {ai} from '@/ai/genkit';
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

export async function generateLandingPage(input: LandingPageInput): Promise<LandingPageOutput> {
  return generateLandingPageFlow(input);
}

const landingPageTextPrompt = ai.definePrompt({
  name: 'landingPageTextPrompt',
  input: {schema: LandingPageInputSchema},
  output: {schema: LandingPageOutputSchema.omit({ heroImageUrl: true })},
  prompt: `You are an expert copywriter and branding specialist. Your task is to generate the text content for a startup's landing page.

  Project Idea: {{{projectIdea}}}
  Branding/Vibe: {{{branding}}}

  Based on this, generate a compelling headline, a subheadline, and a list of 3 key features with titles and descriptions.
  The tone should match the requested branding.
  `,
});

const landingPageImagePrompt = ai.definePrompt({
    name: 'landingPageImagePrompt',
    input: {schema: z.object({
        headline: z.string(),
        subheadline: z.string(),
        branding: z.string(),
    })},
    prompt: `Generate a visually stunning, high-quality hero image for a website's landing page.
    The image should be abstract and conceptual, reflecting the branding and the website's purpose.
    Do NOT include any text or logos in the image.
    The image must have a professional, modern aesthetic.

    Website Headline: {{{headline}}}
    Website Subheadline: {{{subheadline}}}
    Branding/Vibe: {{{branding}}}
    `,
    config: {
        responseModalities: ['TEXT', 'IMAGE'],
    },
});


const generateLandingPageFlow = ai.defineFlow(
  {
    name: 'generateLandingPageFlow',
    inputSchema: LandingPageInputSchema,
    outputSchema: LandingPageOutputSchema,
  },
  async (input) => {
    // Generate text and image in parallel
    const textPromise = landingPageTextPrompt(input);
    
    const imageGenerationPromise = textPromise.then(async ({output: textOutput}) => {
        if (!textOutput) {
            throw new Error("Failed to generate landing page text.");
        }
        const { media } = await landingPageImagePrompt({
            headline: textOutput.headline,
            subheadline: textOutput.subheadline,
            branding: input.branding,
        });
        return media?.url;
    });

    const [textResult, imageUrl] = await Promise.all([textPromise, imageGenerationPromise]);

    if (!textResult.output) {
      throw new Error('Failed to generate landing page content.');
    }
     if (!imageUrl) {
      throw new Error('Failed to generate landing page image.');
    }

    return {
      ...textResult.output,
      heroImageUrl: imageUrl,
    };
  }
);
