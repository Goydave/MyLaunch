// src/ai/schemas/project-image.ts
import {z} from 'genkit';

export const ProjectImageInputSchema = z.object({
  title: z.string().describe('The title of the project.'),
  description: z.string().describe('A short description of the project.'),
});
export type ProjectImageInput = z.infer<typeof ProjectImageInputSchema>;

export const ProjectImageOutputSchema = z.object({
  imageUrl: z.string().describe('A data URI of a visually stunning hero image for the project. The image should be in PNG format.'),
});
export type ProjectImageOutput = z.infer<typeof ProjectImageOutputSchema>;
