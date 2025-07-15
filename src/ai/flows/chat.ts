// src/ai/flows/chat.ts
'use server';
/**
 * @fileOverview A conversational AI copilot for MyLaunch app.
 *
 * - chat - The main function that handles the conversational chat logic.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {generateIdeaNames, IdeaNameOutput, IdeaNameInput} from './idea-name-generator';
import {suggestFeatures, FeatureSuggestionOutput, FeatureSuggestionInput} from './feature-suggestion';
import { generateProductDescription, GenerateProductDescriptionOutput, GenerateProductDescriptionInput } from './content-generation';
import { stripIndents } from 'common-tags';


export const MessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string(),
});
export type Message = z.infer<typeof MessageSchema>;

const ChatHistorySchema = z.array(MessageSchema);

const chatPrompt = ai.definePrompt(
  {
    name: 'copilotPrompt',
    tools: [generateIdeaNames, suggestFeatures, generateProductDescription],
    system: stripIndents`
      You are an AI co-founder, a helpful and encouraging expert in startups, product development, and marketing.
      Your goal is to help users develop their ideas.
      - If the user asks for names for their idea, use the generateIdeaNames tool.
      - If the user asks for feature suggestions, use the suggestFeatures tool.
      - If the user asks for a product description, use the generateProductDescription tool.
      - For anything else, provide a helpful and concise response.
      - You must call at most one tool per turn.
      - When presenting tool results like names or features, format them as a bulleted list.
    `,
  },
);

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatHistorySchema,
    outputSchema: z.string(),
  },
  async (messages) => {
    const validMessages = messages.filter(m => m.content);

    if (validMessages.length === 0) {
      return "Hello! What idea are you working on today?";
    }

    const result = await chatPrompt(validMessages.map(m => ({ ...m, role: m.role === 'assistant' ? 'model' : 'user' })));
    const output = result.output;

    if (!output) {
      return "I'm not sure how to respond to that. Could you please rephrase?";
    }
    
    // This is the critical section to handle tool outputs safely.
    if (output.toolRequest) {
        const toolResponse = await output.toolRequest.next();

        if (!toolResponse || !toolResponse.result) {
            return "There was an issue using my internal tools. Please try again.";
        }

        // Format the output of each tool into a clean string.
        if (toolResponse.name === 'generateIdeaNames') {
            const ideaNames = toolResponse.result as IdeaNameOutput;
            return `Here are some name ideas for you:\n\n- ${ideaNames.ideaNames.join('\n- ')}`;
        }
        if (toolResponse.name === 'suggestFeatures') {
            const features = toolResponse.result as FeatureSuggestionOutput;
            return `Here are some feature suggestions for your MVP:\n\n- ${features.suggestedFeatures.join('\n- ')}`;
        }
        if (toolResponse.name === 'generateProductDescription') {
            const description = toolResponse.result as GenerateProductDescriptionOutput;
            return `Here are some product descriptions:\n\n**Short:**\n${description.shortDescription}\n\n**Long:**\n${description.longDescription}`;
        }

        return "I've completed the task. What should we do next?";
    }
    
    // If it's a simple text response, just return it.
    if (output.text) {
      return output.text;
    }

    return "I'm sorry, I encountered an unexpected error. Please try again.";
  }
);


export async function chat(messages: Message[]): Promise<string> {
    const response = await chatFlow(messages);
    return response;
}
