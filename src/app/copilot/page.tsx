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
import { Skeleton } from "@/components/ui/skeleton";

const formSchema = z.object({
  prompt: z.string().min(10, "Please describe your idea or question (at least 10 characters)."),
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
      if (result) {
        setResponse(result);
      } else {
        setError("Failed to get a response from the AI. Please try again.");
      }
    } catch (e) {
       setError("An error occurred while communicating with the AI. Please try again later.");
       console.error(e);
    }
    setIsLoading(false);
  };
  
  const renderLoadingSkeleton = () => (
    <div className="space-y-4">
      <Skeleton className="h-6 w-1/3" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  );
  
  const renderResponse = () => {
    if (isLoading) {
        return renderLoadingSkeleton();
    }
    if (error) {
        return <p className="text-destructive">{error}</p>
    }
    if(response) {
        return <p className="whitespace-pre-wrap">{response}</p>
    }
    return (
        <div className="text-center text-muted-foreground p-8">
            <Sparkles className="mx-auto h-12 w-12 mb-4" />
            <p>Your AI-powered co-founder is ready to help. Ask it anything!</p>
        </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">AI Co-founder</h1>
        <p className="text-muted-foreground text-lg mt-2">
          Your partner in brainstorming, validation, and strategy.
        </p>
      </div>

     <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto w-full">
        <Card className="md:col-span-1">
             <CardHeader>
                <CardTitle>Your Prompt</CardTitle>
                <CardDescription>
                    What's on your mind? Ask for startup names, feature ideas, or a product description!
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
                            <FormControl>
                              <Textarea 
                                placeholder="e.g., 'Suggest some names for a fitness app that also tracks nutrition.'" 
                                {...field}
                                rows={6}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" disabled={isLoading} size="lg" className="w-full">
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
        
        <Card className="md:col-span-2">
            <CardHeader>
                <CardTitle>AI Response</CardTitle>
                <CardDescription>The AI's answer will appear below.</CardDescription>
            </CardHeader>
            <CardContent className="min-h-[200px]">
                {renderResponse()}
            </CardContent>
        </Card>
     </div>
    </div>
  );
}
