
// src/app/copilot/page.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Bot, Loader2, Send, Sparkles, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { chat } from "@/ai/flows/chat";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const formSchema = z.object({
  prompt: z.string().min(1, "Message cannot be empty."),
});

type FormValues = z.infer<typeof formSchema>;

export default function CopilotPage() {
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { prompt: "" },
  });

  const handleSubmit = async (values: FormValues) => {
    setIsLoading(true);
    setResponse(null);
    setError(null);
    form.reset();

    try {
      const result = await chat(values.prompt);
      if (typeof result === "string" && result.length > 0) {
        setResponse(result);
      } else {
         throw new Error("Received an invalid response from the AI.");
      }
    } catch (e: any) {
      console.error("Chat error:", e);
      setError("Sorry, I encountered an error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh_-_theme(space.14))]">
        {/* Header */}
        <header className="p-4 border-b">
            <h1 className="text-lg font-semibold md:text-xl">AI Co-founder</h1>
            <p className="text-muted-foreground text-sm">
                Your creative partner, powered by generative AI.
            </p>
        </header>

        {/* Content Area */}
        <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-6 max-w-4xl mx-auto">
                 <Card>
                    <CardHeader>
                        <CardTitle>AI Response</CardTitle>
                        <CardDescription>The AI's response will appear here.</CardDescription>
                    </CardHeader>
                    <CardContent className="min-h-[200px]">
                        {isLoading && (
                            <div className="flex items-center space-x-2">
                                <Loader2 className="h-5 w-5 animate-spin text-primary" />
                                <span className="text-sm text-muted-foreground">Thinking...</span>
                            </div>
                        )}
                        {error && <p className="text-sm text-destructive">{error}</p>}
                        {response && <p className="text-sm whitespace-pre-wrap">{response}</p>}
                         {!isLoading && !response && !error && (
                            <div className="text-center text-muted-foreground pt-10">
                                <Sparkles className="mx-auto h-12 w-12 mb-4" />
                                <p>Ask me anything to help build your startup!</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
        
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
