// src/ai/flows/chat.ts
'use server';
/**
 * @fileOverview A conversational AI copilot for MyLaunch app.
 *
 * - chat - The main function that handles the conversational chat logic.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {stripIndents} from 'common-tags';
import { generateProductDescriptionTool } from './content-generation';
import { suggestFeaturesTool } from './feature-suggestion';
import { generateIdeaNamesTool } from './idea-name-generator';


const MessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string(),
});
export type Message = z.infer<typeof MessageSchema>;

const chatPrompt = ai.definePrompt(
  {
    name: 'copilotChatPrompt',
    tools: [
      generateProductDescriptionTool, 
      suggestFeaturesTool, 
      generateIdeaNamesTool
    ],
    system: stripIndents`
      You are an AI co-founder, a helpful and encouraging expert in startups, product development, and marketing.
      Your goal is to help users develop their ideas.
      If you are asked to generate product names, features, or descriptions, you MUST use the provided tools.
      Do not ask for information if you can derive it.
      Provide a helpful and concise response.
    `,
  },
);

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: z.array(MessageSchema),
    outputSchema: z.string(),
  },
  async (messages) => {

    const validMessages = messages.filter(m => m.content);

    // Map to the role 'model' for the assistant's messages
    const result = await chatPrompt(validMessages.map(m => ({ ...m, role: m.role === 'assistant' ? 'model' : 'user' })));
    const output = result.output;
    
    if (!output) {
      return "I'm not sure how to respond to that. Could you please rephrase?";
    }

    // If the model wants to call a tool
    if (output.toolRequest) {
      const toolResponse = await output.toolRequest.call();
      
      // Handle the output of specific tools to format them nicely
      switch (output.toolRequest.name) {
        case 'generateIdeaNamesTool':
          const ideas = toolResponse.result?.ideaNames || [];
          return `Here are some names I came up with:\n\n- ${ideas.join('\n- ')}`;
        case 'suggestFeaturesTool':
          const features = toolResponse.result?.suggestedFeatures || [];
          return `Based on your idea, here are a few key features for your MVP:\n\n- ${features.join('\n- ')}`;
        case 'generateProductDescriptionTool':
            const description = toolResponse.result;
            return `Here's a product description:\n\n**Short:** ${description?.shortDescription}\n\n**Long:** ${description?.longDescription}`
        default:
          // For any other tool, just return the string representation of the result
          return JSON.stringify(toolResponse.result, null, 2);
      }
    }

    // If the model just returned text
    return output.text || "I'm sorry, I encountered an issue. Please try again.";
  }
);

export async function chat(messages: Message[]): Promise<string> {
    const response = await chatFlow(messages);
    return response;
}
