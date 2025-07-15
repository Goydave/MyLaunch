
// src/ai/flows/chat.ts
'use server';
/**
 * @fileOverview A conversational AI copilot for MyLaunch app.
 *
 * - chat - The main function that handles the conversational chat logic.
 * - Message - The type for a single message in the chat history.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { generateIdeaNames } from './idea-name-generator';
import { suggestFeatures } from './feature-suggestion';
import { generateProductDescription } from './content-generation';
import { stripIndents } from 'common-tags';

const MessageSchema = z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string(),
});
export type Message = z.infer<typeof MessageSchema>;

const ChatInputSchema = z.array(MessageSchema);
export type ChatInput = z.infer<typeof ChatInputSchema>;


const ideaNameTool = ai.defineTool(
    {
        name: 'generateIdeaNames',
        description: 'Generates creative and catchy names for a project idea. Use this when the user asks for names or to name something.',
        inputSchema: z.object({ ideaDescription: z.string() }),
        outputSchema: z.array(z.string()),
    },
    async ({ ideaDescription }) => {
        const result = await generateIdeaNames({ ideaDescription });
        return result.ideaNames;
    }
);

const featureSuggestionTool = ai.defineTool(
    {
        name: 'suggestFeatures',
        description: 'Suggests a list of relevant and useful features for an MVP (Minimum Viable Product) based on a project idea. Use this when the user asks for feature ideas or what to build.',
        inputSchema: z.object({ projectIdea: z.string() }),
        outputSchema: z.array(z.string()),
    },
    async ({ projectIdea }) => {
        const result = await suggestFeatures({ projectIdea });
        return result.suggestedFeatures;
    }
);

const productDescriptionTool = ai.defineTool(
    {
        name: 'generateProductDescription',
        description: 'Generates a short, catchy description and a detailed description for a product. Use this when the user asks for a description, marketing copy, or content for their project.',
        inputSchema: z.object({ projectIdea: z.string() }),
        outputSchema: z.object({ shortDescription: z.string(), longDescription: z.string() }),
    },
    async ({ projectIdea }) => {
        return await generateProductDescription({ projectIdea });
    }
);

const chatPrompt = ai.definePrompt({
    name: 'chatPrompt',
    tools: [ideaNameTool, featureSuggestionTool, productDescriptionTool],
    system: stripIndents`
        You are an AI Co-founder, a helpful and friendly AI for the MyLaunch application.
        Your goal is to help users build their startup ideas.
        - You are conversational and friendly.
        - You have access to tools to help the user.
        - Based on the user's prompt, you should decide whether to use a tool or to respond directly.
        - If you use a tool, present the output in a clear, readable format. For lists, use markdown formatting.
        - For example, if a tool returns an array of strings, format it as a numbered or bulleted list.
        - If a tool returns an object with descriptions, format it with clear headings.
        - Keep the conversation in context. The user may refer to things you've discussed before.
        - If the user's request is ambiguous, ask for clarification.
    `,
});

const chatFlow = ai.defineFlow(
    {
        name: 'chatFlow',
        inputSchema: ChatInputSchema,
        outputSchema: z.string(),
    },
    async (messages) => {
        const validMessages = messages.filter(m => m.content);
        if (validMessages.length === 0) {
            return "Hello! How can I help you today?";
        }

        const result = await chatPrompt(validMessages.map(m => ({ ...m, role: m.role === 'assistant' ? 'model' : 'user' })));
        const output = result?.output;

        if (!output) {
            return "I'm sorry, I encountered an issue and couldn't generate a response. Please try again.";
        }
        
        if (output.toolRequests.length > 0) {
            const toolRequest = output.toolRequests[0];
            const toolResponse = await toolRequest.run();

            if (toolRequest.name === 'generateProductDescription' && typeof toolResponse === 'object' && toolResponse !== null && 'shortDescription' in toolResponse) {
                 return stripIndents`
                    Here's a description for your project:

                    **Short Description:**
                    ${(toolResponse as any).shortDescription}

                    **Detailed Description:**
                    ${(toolResponse as any).longDescription}
                `;
            }

            if(Array.isArray(toolResponse)) {
                return stripIndents`
                    Here are some ideas for you:

                    ${toolResponse.map((item: string) => `- ${item}`).join('\n')}
                `;
            }

            return `I have used the ${toolRequest.name} tool and here is the result: ${JSON.stringify(toolResponse, null, 2)}`;
        }
        
        return output.text || "I'm not sure how to respond to that. Could you try rephrasing?";
    }
);

export async function chat(messages: Message[]): Promise<string> {
    const response = await chatFlow(messages);
    return response;
}
