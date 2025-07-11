
// src/app/pitch-deck/page.tsx
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
import { Loader2, Wand2 } from "lucide-react";
import { generatePitchDeck, type PitchDeckOutput } from "@/ai/flows/pitch-deck-generator";
import { usePlan } from "@/hooks/use-plan";
import { UpgradePro } from "@/components/layout/upgrade-pro";

const formSchema = z.object({
  projectIdea: z.string().min(20, "Please provide a detailed description of your project idea (at least 20 characters)."),
  targetAudience: z.string().min(10, "Describe your target audience."),
});

type FormValues = z.infer<typeof formSchema>;

export default function PitchDeckPage() {
  const { plan } = usePlan();
  const [pitchDeck, setPitchDeck] = useState<PitchDeckOutput | null>(null);
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
    setPitchDeck(null);

    try {
      const result = await generatePitchDeck(values);
      setPitchDeck(result);
    } catch (e) {
      setError("Failed to generate the pitch deck. Please try again.");
    }
    setIsLoading(false);
  };

  const renderPitchDeck = () => {
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

    if (pitchDeck) {
      return (
        <Accordion type="single" collapsible className="w-full" defaultValue="problem">
          {Object.entries(pitchDeck).map(([key, value]) => (
            <AccordionItem value={key} key={key}>
              <AccordionTrigger className="text-md font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1')}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground whitespace-pre-wrap">{value}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )
    }

    return <p className="text-sm text-muted-foreground">Your AI-generated pitch deck will appear here.</p>;
  }
  
  if (plan === "Free") {
    return <UpgradePro featureName="Pitch Deck Generator" />;
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div>
        <h1 className="text-lg font-semibold md:text-2xl">AI Pitch Deck Generator</h1>
        <p className="text-muted-foreground text-sm">
          Generate compelling content for your startup's pitch deck.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
            <CardDescription>
              Provide the core details of your project.
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
                      Generating Deck...
                    </>
                  ) : (
                    <>
                      <Wand2 className="mr-2 h-4 w-4" />
                      Generate Pitch Deck
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
                <CardTitle>Generated Pitch Deck</CardTitle>
                <CardDescription>Click on each section to see the AI-generated content.</CardDescription>
            </CardHeader>
            <CardContent>
                {renderPitchDeck()}
            </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
