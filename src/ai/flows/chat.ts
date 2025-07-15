// src/ai/flows/chat.ts
'use server';
/**
 * @fileOverview A conversational AI copilot for MyLaunch app.
 *
 * - chat - The main function that handles the conversational chat logic.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { stripIndents } from 'common-tags';
import { personalizedLearningPath, PersonalizedLearningPathInput, PersonalizedLearningPathOutput } from './personalized-learning';

// Re-exporting these types to avoid breaking other parts of the app that might reference them.
const MessageSchema = z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string(),
});
export type Message = z.infer<typeof MessageSchema>;


// For debugging, this chat function now just wraps the working personalizedLearningPath flow.
export async function chat(prompt: string): Promise<PersonalizedLearningPathOutput> {
    const response = await personalizedLearningPath({ learningTopic: prompt });
    return response;
}
