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

// Simplified flow that takes a single prompt and returns a single string.
// This removes conversational history and tools to isolate the problem.

const chatPrompt = ai.definePrompt({
    name: 'simpleChatPrompt',
    system: stripIndents`
        You are an AI Co-founder, a helpful and friendly AI for the MyLaunch application.
        Your goal is to help users build their startup ideas.
        - You are conversational and friendly.
        - Answer the user's prompt directly and concisely.
    `,
});

const simpleChatFlow = ai.defineFlow(
    {
        name: 'simpleChatFlow',
        inputSchema: z.string(),
        outputSchema: z.string(),
    },
    async (prompt) => {
        const result = await chatPrompt(prompt);
        const output = result?.output;

        if (!output) {
            return "I'm sorry, I encountered an issue and couldn't generate a response. Please try again.";
        }
        
        return output.text || "I'm not sure how to respond to that. Could you try rephrasing?";
    }
);

export async function chat(prompt: string): Promise<string> {
    const response = await simpleChatFlow(prompt);
    return response;
}

// Re-exporting these types to avoid breaking other parts of the app that might reference them.
// They are not used in the simplified flow.
const MessageSchema = z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string(),
});
export type Message = z.infer<typeof MessageSchema>;
