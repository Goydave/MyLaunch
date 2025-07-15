
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
  FormLabel,
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
import { Loader2, Sparkles } from "lucide-react";
import { chat } from "@/ai/flows/chat";
import { ScrollArea } from "@/components/ui/scroll-area";

const formSchema = z.object({
  prompt: z.string().min(10, "Please enter a prompt with at least 10 characters."),
});

type FormValues = z.infer<typeof formSchema>;

export default function CopilotPage() {
  const [response, setResponse] = useState<string | null>(null);
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
    setResponse(null);

    try {
      const result = await chat(values.prompt);
      setResponse(result);
    } catch (e) {
       setError("An error occurred while communicating with the AI. Please try again later.");
       console.error(e);
    }
    setIsLoading(false);
  };
  
  const renderResponse = () => {
    if (isLoading) {
      return (
        <div className="space-y-4">
           <div className="space-y-2 rounded-lg border p-4 animate-pulse">
              <div className="h-4 w-full bg-muted rounded" />
              <div className="h-4 w-4/5 bg-muted rounded" />
              <div className="h-4 w-full bg-muted rounded" />
              <div className="h-4 w-3/5 bg-muted rounded" />
          </div>
        </div>
      );
    }

    if (error) {
        return <p className="text-sm text-center text-destructive">{error}</p>
    }

    if (response) {
      return (
        <Card>
            <CardHeader>
                <CardTitle>AI Response</CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-full max-h-[40vh]">
                    <p className="whitespace-pre-wrap text-sm text-muted-foreground">{response}</p>
                </ScrollArea>
            </CardContent>
        </Card>
      )
    }

    return (
        <div className="flex items-center justify-center h-full rounded-lg border-2 border-dashed p-8 text-center">
          <p className="text-sm text-muted-foreground">Your AI co-founder's response will appear here.</p>
        </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">AI Co-founder</h1>
        <p className="text-muted-foreground text-lg mt-2">
          Your partner in brainstorming, validation, and strategy.
        </p>
      </div>

     <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto w-full">
        <Card className="lg:col-span-1">
            <CardHeader>
                <CardTitle>Ask for Advice</CardTitle>
                <CardDescription>
                Ask anything! Get ideas for names, features, marketing copy, and more.
                </CardDescription>
            </CardHeader>
            <CardContent>
                 <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="prompt"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Question or Idea</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="e.g., 'Suggest some names for a fitness app that also tracks nutrition.'" 
                                {...field}
                                rows={5}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" disabled={isLoading} className="w-full">
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
        
        <div className="lg:col-span-2">
           {renderResponse()}
        </div>
     </div>
    </div>
  );
}
