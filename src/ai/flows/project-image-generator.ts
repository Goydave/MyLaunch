// src/ai/flows/project-image-generator.ts
'use server';
/**
 * @fileOverview An AI flow for generating a hero image for a project.
 *
 * - generateProjectImage - A function that handles project image generation.
 * - ProjectImageInput - The input type for the generateProjectImage function.
 * - ProjectImageOutput - The return type for the generateProjectImage function.
 */

import {ai} from '@/ai/genkit';
import { ProjectImageInputSchema, ProjectImageOutputSchema, type ProjectImageInput, type ProjectImageOutput } from '@/ai/schemas/project-image';

export { type ProjectImageInput, type ProjectImageOutput };

export async function generateProjectImage(input: ProjectImageInput): Promise<ProjectImageOutput> {
  return generateProjectImageFlow(input);
}

const generateProjectImageFlow = ai.defineFlow(
  {
    name: 'generateProjectImageFlow',
    inputSchema: ProjectImageInputSchema,
    outputSchema: ProjectImageOutputSchema,
  },
  async (input) => {
    const { media } = await ai.generate({
        model: 'googleai/gemini-2.0-flash-preview-image-generation',
        prompt: `Generate a visually stunning, high-quality hero image for a project titled "${input.title}". The project is about: "${input.description}". The image should be abstract and conceptual, suitable for a project card. Do NOT include any text or logos in the image. The image must have a professional, modern aesthetic.`,
        config: {
            responseModalities: ['TEXT', 'IMAGE'],
        },
    });

    if (!media?.url) {
      throw new Error('Failed to generate project image.');
    }

    return {
      imageUrl: media.url,
    };
  }
);
