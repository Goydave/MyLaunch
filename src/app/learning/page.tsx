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
import { Check, Loader2, ShieldCheck } from "lucide-react";
import { personalizedLearningPath } from "@/ai/flows/personalized-learning";

const formSchema = z.object({
  ideaDescription: z.string().min(10, "Please provide more details about your idea."),
  projectGoals: z.string().min(10, "What are the main goals for your project?"),
  currentProgress: z.string().min(10, "Describe your current progress."),
});

type FormValues = z.infer<typeof formSchema>;

export default function LearningPage() {
  const [learningPath, setLearningPath] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ideaDescription: "",
      projectGoals: "",
      currentProgress: "",
    },
  });

  const handleSubmit = async (values: FormValues) => {
    setIsLoading(true);
    setError(null);
    setLearningPath(null);

    try {
      const result = await personalizedLearningPath(values);

      if (result.learningPath) {
        setLearningPath(result.learningPath);
      } else {
        setError("Failed to generate a learning path. Please try again.");
      }
    } catch (e) {
       setError("Failed to generate a learning path. Please try again.");
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div>
        <h1 className="text-lg font-semibold md:text-2xl">Personalized Learning</h1>
        <p className="text-muted-foreground text-sm">
          Get an AI-generated learning path based on your goals.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Tell us about your project</CardTitle>
            <CardDescription>
              The more details you provide, the better the recommendations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="ideaDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Idea Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="e.g., A mobile app that connects local artists..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="projectGoals"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Goals</FormLabel>
                      <FormControl>
                        <Textarea placeholder="e.g., Launch an MVP in 3 months, get 100 beta users..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="currentProgress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Progress</FormLabel>
                      <FormControl>
                        <Textarea placeholder="e.g., I have a basic prototype and some mockups..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    "Generate Learning Path"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Custom Learning Path</CardTitle>
              <CardDescription>
                Here are the recommended micro-lessons to help you succeed.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
                    <div className="space-y-2">
                        <div className="h-4 w-48 bg-muted rounded animate-pulse" />
                        <div className="h-3 w-32 bg-muted rounded animate-pulse" />
                    </div>
                  </div>
                   <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
                    <div className="space-y-2">
                        <div className="h-4 w-48 bg-muted rounded animate-pulse" />
                        <div className="h-3 w-32 bg-muted rounded animate-pulse" />
                    </div>
                  </div>
                </div>
              )}
              {error && <p className="text-sm text-red-500">{error}</p>}
              {learningPath ? (
                <ul className="space-y-3">
                  {learningPath.map((lesson, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 mr-4 mt-1">
                        <ShieldCheck className="h-4 w-4 text-primary" />
                      </div>
                      <span className="flex-1 text-sm font-medium">{lesson}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                 !isLoading && <p className="text-sm text-muted-foreground">Your recommended lessons will appear here.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
