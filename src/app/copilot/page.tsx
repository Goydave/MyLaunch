
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Loader2, Sparkles, Youtube, BookOpen } from "lucide-react";
import { personalizedLearningPath, type PersonalizedLearningPathOutput } from "@/ai/flows/personalized-learning";
import { Skeleton } from "@/components/ui/skeleton";

const formSchema = z.object({
  learningTopic: z.string().min(5, "Please describe what you want to learn."),
});

type FormValues = z.infer<typeof formSchema>;

export default function CopilotPage() {
  const [roadmap, setRoadmap] = useState<PersonalizedLearningPathOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      learningTopic: "",
    },
  });

  const handleSubmit = async (values: FormValues) => {
    setIsLoading(true);
    setError(null);
    setRoadmap(null);

    try {
      const result = await personalizedLearningPath({learningTopic: values.learningTopic});
      if (result && result.roadmap) {
        setRoadmap(result);
      } else {
        setError("Failed to generate a roadmap. The AI might be busy, please try again.");
      }
    } catch (e) {
       setError("An error occurred while generating the roadmap. Please try again later.");
       console.error(e);
    }
    setIsLoading(false);
  };
  
  const renderLoadingSkeleton = () => (
    <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
             <Card key={i}>
                <CardHeader>
                    <Skeleton className="h-6 w-2/5" />
                </CardHeader>
                <CardContent className="space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                    <div className="pt-4">
                        <Skeleton className="h-5 w-1/4 mb-2" />
                        <div className="space-y-2">
                             <Skeleton className="h-8 w-full" />
                             <Skeleton className="h-8 w-full" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        ))}
    </div>
  );

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">AI Copilot (Learning Path Test)</h1>
        <p className="text-muted-foreground text-lg mt-2">
          Tell us what you want to master, and we'll generate a personalized roadmap for you.
        </p>
      </div>

      <Card className="max-w-2xl mx-auto w-full">
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="flex items-center gap-4">
              <FormField
                control={form.control}
                name="learningTopic"
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormControl>
                      <Input 
                        placeholder="e.g., 'Learn how to build a SaaS product' or 'Master digital marketing'" 
                        {...field}
                        className="h-12 text-base"
                      />
                    </FormControl>
                    <FormMessage className="pl-2" />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} size="lg" className="h-12">
                {isLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Sparkles className="mr-2" />
                )}
                Generate Roadmap
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <div className="max-w-4xl mx-auto w-full mt-4">
        {isLoading && renderLoadingSkeleton()}
        {error && <p className="text-center text-red-500">{error}</p>}
        {roadmap && (
            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-center">Your Roadmap to Mastering: {form.getValues('learningTopic')}</h2>
                {roadmap.roadmap.map((step, index) => (
                    <Card key={index} className="overflow-hidden">
                        <CardHeader>
                            <CardTitle className="text-xl">{index + 1}. {step.title}</CardTitle>
                            <CardDescription>{step.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="videos">
                                    <AccordionTrigger className="text-lg font-semibold">
                                        <div className="flex items-center gap-2">
                                            <Youtube className="text-red-600" /> Recommended Videos
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                                        {step.videos.map(video => (
                                            <a key={video.videoId} href={`https://www.youtube.com/watch?v=${video.videoId}`} target="_blank" rel="noopener noreferrer" className="block group">
                                                <div className="relative aspect-video overflow-hidden rounded-lg">
                                                    <img src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`} alt={video.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                                                </div>
                                                <p className="mt-2 text-sm font-medium group-hover:text-primary">{video.title}</p>
                                            </a>
                                        ))}
                                    </AccordionContent>
                                </AccordionItem>
                                 <AccordionItem value="resources">
                                    <AccordionTrigger className="text-lg font-semibold">
                                         <div className="flex items-center gap-2">
                                            <BookOpen className="text-sky-600" /> Additional Resources
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pt-4">
                                       <ul className="space-y-2 list-disc list-inside">
                                         {step.resources.map(resource => (
                                             <li key={resource.url}>
                                                 <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                                    {resource.title}
                                                 </a>
                                             </li>
                                         ))}
                                       </ul>
                                    </AccordionContent>
                                </AccordionItem>
                             </Accordion>
                        </CardContent>
                    </Card>
                ))}
            </div>
        )}
      </div>
    </div>
  );
}
