// src/app/copilot/page.tsx
"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Sparkles, User, Bot } from "lucide-react";
import { chat, type Message } from "@/ai/flows/chat";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  prompt: z.string().min(1, "Message cannot be empty."),
});

type FormValues = z.infer<typeof formSchema>;

export default function CopilotPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const handleSubmit = async (values: FormValues) => {
    setIsLoading(true);
    setError(null);
    form.reset();
    
    const userMessage: Message = { role: 'user', content: values.prompt };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);

    try {
      const response = await chat(newMessages);
      if (typeof response === 'string' && response.length > 0) {
        const assistantMessage: Message = { role: 'assistant', content: response };
        setMessages(currentMessages => [...currentMessages, assistantMessage]);
      } else {
        setError("The AI returned an empty response. Please try again.");
      }
    } catch (e) {
       setError("An error occurred while communicating with the AI. Please try again later.");
       console.error(e);
    }
    setIsLoading(false);
  };
  
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">AI Co-founder</h1>
        <p className="text-muted-foreground text-lg mt-2">
          Your partner in brainstorming, validation, and strategy.
        </p>
      </div>

     <Card className="max-w-4xl mx-auto w-full h-[70vh] flex flex-col">
        <CardHeader>
            <CardTitle>Conversation</CardTitle>
            <CardDescription>
                Ask for startup names, feature ideas, or a product description!
            </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col gap-4 overflow-hidden">
            <ScrollArea className="flex-1 pr-4 -mr-4">
                <div className="space-y-6">
                    {messages.length === 0 && !isLoading && (
                         <div className="text-center text-muted-foreground p-8">
                            <Sparkles className="mx-auto h-12 w-12 mb-4" />
                            <p>Your AI-powered co-founder is ready to help. Ask it anything!</p>
                        </div>
                    )}
                    {messages.map((message, index) => (
                        <div key={index} className={cn("flex items-start gap-3", message.role === 'user' ? 'justify-end' : '')}>
                           {message.role === 'assistant' && <Bot className="w-6 h-6 text-primary flex-shrink-0" />}
                           <div className={cn("p-3 rounded-lg max-w-xl", message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                                <p className="whitespace-pre-wrap">{message.content}</p>
                           </div>
                           {message.role === 'user' && <User className="w-6 h-6 flex-shrink-0" />}
                        </div>
                    ))}
                    {isLoading && messages.at(-1)?.role === 'user' && (
                        <div className="flex items-start gap-3">
                            <Bot className="w-6 h-6 text-primary flex-shrink-0" />
                            <div className="p-3 rounded-lg bg-muted">
                                <Loader2 className="w-5 h-5 animate-spin" />
                            </div>
                        </div>
                    )}
                     {error && (
                        <div className="text-center text-destructive p-4">
                            <p>{error}</p>
                        </div>
                    )}
                </div>
            </ScrollArea>
        </CardContent>
        <CardContent className="pt-0">
             <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="flex items-start gap-3">
                  <FormField
                    control={form.control}
                    name="prompt"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Textarea 
                            placeholder="e.g., 'Suggest some names for a fitness app that also tracks nutrition.'" 
                            {...field}
                            rows={1}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    if (form.getValues("prompt").trim()) {
                                        form.handleSubmit(handleSubmit)();
                                    }
                                }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isLoading} size="lg">
                    {isLoading ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <>
                        <Sparkles className="mr-2" />
                        Ask AI
                      </>
                    )}
                  </Button>
                </form>
            </Form>
        </CardContent>
     </Card>
    </div>
  );
}
