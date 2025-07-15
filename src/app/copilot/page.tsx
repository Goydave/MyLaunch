
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Loader2, Sparkles } from "lucide-react";
import { chat, type ChatOutput } from "@/ai/flows/chat";
import { usePlan } from "@/hooks/use-plan";
import { UpgradePro } from "@/components/layout/upgrade-pro";

const formSchema = z.object({
  projectIdea: z.string().min(20, "Please provide a detailed description of your project idea (at least 20 characters)."),
  targetAudience: z.string().min(10, "Describe your target audience."),
});

type FormValues = z.infer<typeof formSchema>;

export default function CopilotPage() {
  const { plan } = usePlan();
  const [response, setResponse] = useState<ChatOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectIdea: "",
      targetAudience: "",
    },
  });

  const handleSubmit = async (values: FormValues) => {
    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      const result = await chat(values);
      setResponse(result);
    } catch (e) {
      setError("Failed to get a response from the AI. Please try again.");
    }
    setIsLoading(false);
  };

  const renderResponse = () => {
    if (isLoading) {
      return (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
             <div key={i} className="space-y-2 rounded-lg border p-4">
                <div className="h-6 w-1/3 bg-muted rounded animate-pulse" />
                <div className="h-4 w-full bg-muted rounded animate-pulse" />
                <div className="h-4 w-4/5 bg-muted rounded animate-pulse" />
            </div>
          ))}
        </div>
      );
    }

    if (error) {
        return <p className="text-sm text-destructive">{error}</p>
    }

    if (response) {
      return (
        <Accordion type="single" collapsible className="w-full" defaultValue="problem">
          {Object.entries(response).map(([key, value]) => (
            <AccordionItem value={key} key={key}>
              <AccordionTrigger className="text-md font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1')}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground whitespace-pre-wrap">{value}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )
    }

    return <p className="text-sm text-muted-foreground">Your AI co-founder's response will appear here.</p>;
  }

  // The pitch-deck functionality requires a Pro plan. We will keep this check here for now.
  if (plan === "Free") {
    return <UpgradePro featureName="Advanced AI Copilot" />;
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div>
        <h1 className="text-lg font-semibold md:text-2xl">AI Co-founder</h1>
        <p className="text-muted-foreground text-sm">
          Your partner in brainstorming, validation, and strategy.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
            <CardDescription>
              Provide the core details of your project for the AI to analyze.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="projectIdea"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Idea</FormLabel>
                      <FormControl>
                        <Textarea placeholder="e.g., A mobile app that uses AI to create personalized workout plans..." {...field} rows={5} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="targetAudience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target Audience</FormLabel>
                      <FormControl>
                        <Textarea placeholder="e.g., Busy professionals aged 25-40 who want to stay fit but lack time." {...field} rows={3}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Thinking...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Ask AI Co-founder
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        <div className="lg:col-span-2">
           <Card>
            <CardHeader>
                <CardTitle>AI Co-founder Response</CardTitle>
                <CardDescription>Click on each section to see the AI-generated content.</CardDescription>
            </CardHeader>
            <CardContent>
                {renderResponse()}
            </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
