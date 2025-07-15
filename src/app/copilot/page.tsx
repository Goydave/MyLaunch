// src/app/copilot/page.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Bot, Loader2, Send, Sparkles, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { type Message, chat } from "@/ai/flows/chat";

const formSchema = z.object({
  prompt: z.string().min(1, "Message cannot be empty."),
});

type FormValues = z.infer<typeof formSchema>;

export default function CopilotPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { prompt: "" },
  });
  
  useEffect(() => {
    if(scrollAreaRef.current) {
        scrollAreaRef.current.scrollTo({
            top: scrollAreaRef.current.scrollHeight,
            behavior: "smooth"
        });
    }
  }, [messages]);


  const handleSubmit = async (values: FormValues) => {
    const userMessage: Message = { role: "user", content: values.prompt };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    form.reset();

    try {
      const updatedHistory: Message[] = [...messages, userMessage];
      const response = await chat(updatedHistory);
      const assistantMessage: Message = { role: "assistant", content: response };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = {
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh_-_theme(space.14))]">
        {/* Header */}
        <header className="p-4 border-b">
            <h1 className="text-lg font-semibold md:text-xl">Gemini Assistant</h1>
            <p className="text-muted-foreground text-sm">
                Your creative partner, powered by Gemini.
            </p>
        </header>

        {/* Chat Area */}
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-6 max-w-4xl mx-auto">
                {messages.length === 0 && (
                    <div className="text-center text-muted-foreground pt-16">
                        <Sparkles className="mx-auto h-12 w-12 mb-4" />
                        <h2 className="text-xl font-semibold">Chat with Gemini</h2>
                        <p className="mt-2">Ask me to generate project names, suggest features, write product descriptions, or anything else to help build your startup!</p>
                    </div>
                )}
                {messages.map((message, index) => (
                    <div key={index} className={cn("flex items-start gap-4", message.role === "user" ? "justify-end" : "justify-start")}>
                        {message.role === 'assistant' && (
                            <Avatar className="w-8 h-8 border">
                                <AvatarFallback><Bot /></AvatarFallback>
                            </Avatar>
                        )}
                        <div className={cn("max-w-2xl rounded-lg p-3", message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        </div>
                         {message.role === 'user' && (
                            <Avatar className="w-8 h-8 border">
                               <AvatarFallback><User /></AvatarFallback>
                            </Avatar>
                        )}
                    </div>
                ))}
                 {isLoading && (
                    <div className="flex items-start gap-4">
                         <Avatar className="w-8 h-8 border">
                            <AvatarFallback><Bot /></AvatarFallback>
                        </Avatar>
                        <div className="max-w-2xl rounded-lg p-3 bg-muted flex items-center space-x-2">
                             <Loader2 className="h-5 w-5 animate-spin text-primary" />
                             <span className="text-sm text-muted-foreground">Thinking...</span>
                        </div>
                    </div>
                )}
            </div>
        </ScrollArea>
        
        {/* Input Form */}
        <div className="p-4 border-t bg-background">
            <div className="max-w-4xl mx-auto">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="flex items-center gap-4">
                        <FormField
                            control={form.control}
                            name="prompt"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormControl>
                                        <Textarea
                                            placeholder="e.g., 'Give me 5 names for an AI-powered fitness app'"
                                            className="min-h-0 resize-none"
                                            {...field}
                                            rows={1}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' && !e.shiftKey) {
                                                    e.preventDefault();
                                                    form.handleSubmit(handleSubmit)();
                                                }
                                            }}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={isLoading} size="icon">
                            <Send className="h-4 w-4" />
                            <span className="sr-only">Send</span>
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    </div>
  );
}
