// src/app/copilot/page.tsx
"use client";

import { useState, useEffect } from "react";
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Check, Loader2, Sparkles, History, PlusCircle, ThumbsUp, ThumbsDown, AlertTriangle, Lightbulb, Target, Scale, Users, Shield, Wand2 } from "lucide-react";
import { chat, type CoFounderOutput } from "@/ai/flows/chat";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { useUser } from "@/hooks/use-user";
import { toast } from "@/hooks/use-toast";
import { getUserCopilotSessions, type CopilotSession } from "@/services/firestore";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";


const formSchema = z.object({
  businessIdea: z.string().min(20, "Please provide a detailed description of your business idea (at least 20 characters)."),
  targetAudience: z.string().min(10, "Describe your target audience."),
  revenueModel: z.string().min(5, "Briefly describe how you'll make money."),
});

type FormValues = z.infer<typeof formSchema>;

export default function CopilotPage() {
  const { user } = useUser();
  const [sessions, setSessions] = useState<CopilotSession[]>([]);
  const [activeSession, setActiveSession] = useState<CopilotSession | null>(null);
  const [response, setResponse] = useState<CoFounderOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isHistoryLoading, setIsHistoryLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessIdea: "",
      targetAudience: "",
      revenueModel: "",
    },
  });
  
  useEffect(() => {
    if (user) {
      setIsHistoryLoading(true);
      getUserCopilotSessions(user.uid)
        .then(setSessions)
        .catch(() => {
          toast({
            title: "Error",
            description: "Could not load your session history.",
            variant: "destructive",
          });
        })
        .finally(() => setIsHistoryLoading(false));
    }
  }, [user]);

  const handleSubmit = async (values: FormValues) => {
    if (!user) {
      toast({
        title: "Authentication Error",
        description: "You must be logged in to use the AI Co-founder.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setResponse(null);
    setActiveSession(null); // Deselect any active session

    try {
      const result = await chat(values);
      setResponse(result);
      // After a successful generation, refresh the history
      if(user) {
        getUserCopilotSessions(user.uid).then(setSessions);
      }
    } catch (e) {
      setError("Failed to get a response from the AI. Please try again.");
      console.error(e);
    }
    setIsLoading(false);
  };
  
  const handleSelectSession = (session: CopilotSession) => {
    setActiveSession(session);
    form.reset(session.prompt);
    setResponse(session.response);
    setError(null);
  }
  
  const handleNewAnalysis = () => {
    setActiveSession(null);
    setResponse(null);
    form.reset({
      businessIdea: "",
      targetAudience: "",
      revenueModel: "",
    });
  }

  const renderLoadingSkeleton = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
            <CardHeader><Skeleton className="h-6 w-1/2" /></CardHeader>
            <CardContent className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
            </CardContent>
        </Card>
        <Card>
            <CardHeader><Skeleton className="h-6 w-1/2" /></CardHeader>
            <CardContent className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
            </CardContent>
        </Card>
        <Card className="lg:col-span-2">
            <CardHeader><Skeleton className="h-6 w-1/3" /></CardHeader>
            <CardContent className="space-y-3">
                {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-8 w-full" />)}
            </CardContent>
        </Card>
    </div>
  );

  const renderResponse = () => {
    if (isLoading) return renderLoadingSkeleton();
    if (error) return <p className="text-center text-sm text-destructive">{error}</p>;
    if (!response) return <p className="text-center text-sm text-muted-foreground">Your AI co-founder's analysis will appear here.</p>;

    const { executiveSummary, marketAnalysis, productStrategy, riskAnalysis, executionPlan, investmentVerdict } = response;

    return (
        <div className="space-y-6">
            <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-primary">
                        {investmentVerdict.goNoGo === 'Go' && <ThumbsUp />}
                        {investmentVerdict.goNoGo === 'No-Go' && <ThumbsDown />}
                        {investmentVerdict.goNoGo === 'Proceed with Caution' && <AlertTriangle />}
                        Investor Verdict: {investmentVerdict.goNoGo}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-primary/90">{investmentVerdict.justification}</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Executive Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">{executiveSummary}</p>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Target /> Market Analysis</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h4 className="font-semibold text-sm">Target Audience Persona</h4>
                            <p className="text-sm text-muted-foreground"><MarkdownRenderer content={marketAnalysis.targetAudiencePersona} /></p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-sm">Market Size (TAM/SAM/SOM)</h4>
                            <p className="text-sm text-muted-foreground"><MarkdownRenderer content={marketAnalysis.marketSize} /></p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-sm">Competitive Landscape</h4>
                            <p className="text-sm text-muted-foreground"><MarkdownRenderer content={marketAnalysis.competitiveLandscape} /></p>
                        </div>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Lightbulb /> Product Strategy</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h4 className="font-semibold text-sm">Core MVP Features</h4>
                            <p className="text-sm text-muted-foreground"><MarkdownRenderer content={productStrategy.coreFeatures} /></p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-sm">Unique Selling Proposition (USP)</h4>
                            <p className="text-sm text-muted-foreground"><MarkdownRenderer content={productStrategy.uniqueSellingProposition} /></p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Shield /> Risk Analysis</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <div>
                            <h4 className="font-semibold text-sm">Potential Risks</h4>
                            <p className="text-sm text-muted-foreground"><MarkdownRenderer content={riskAnalysis.potentialRisks} /></p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-sm">Mitigation Strategies</h4>
                            <p className="text-sm text-muted-foreground"><MarkdownRenderer content={riskAnalysis.mitigationStrategies} /></p>
                        </div>
                    </CardContent>
                </Card>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>10-Step Execution Plan</CardTitle>
                    <CardDescription>Your roadmap from idea to the first 100 users.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {executionPlan.map((step, index) => (
                        <div key={index} className="flex items-start gap-3">
                           <div className="flex items-center h-5">
                             <Checkbox id={`step-${index}`} className="mt-1" />
                           </div>
                           <div className="grid gap-0.5 leading-none">
                                <Label htmlFor={`step-${index}`} className="text-sm font-medium">
                                    {index + 1}. {step.title}
                                </Label>
                                <p className="text-sm text-muted-foreground">{step.description}</p>
                           </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div>
        <h1 className="text-lg font-semibold md:text-2xl">AI Business Co-Founder</h1>
        <p className="text-muted-foreground text-sm">
          Get elite-level analysis and a strategic roadmap for your business idea.
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <History className="h-5 w-5" />
              <CardTitle className="text-lg">Analysis History</CardTitle>
            </div>
             <Button variant="outline" size="sm" onClick={handleNewAnalysis} disabled={!activeSession}>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Analysis
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="w-full whitespace-nowrap">
            {isHistoryLoading ? (
              <div className="flex space-x-4 pb-4">
                {[...Array(4)].map((_, i) => <div key={i} className="h-10 w-40 bg-muted rounded animate-pulse" />)}
              </div>
            ) : sessions.length > 0 ? (
              <div className="flex w-max space-x-4 pb-4">
                {sessions.map(session => (
                  <Button
                    key={session.id}
                    variant={activeSession?.id === session.id ? "default" : "secondary"}
                    onClick={() => handleSelectSession(session)}
                    className="h-auto py-2 px-4 flex flex-col items-start"
                  >
                    <span className="font-semibold line-clamp-1 text-left">{session.prompt.businessIdea}</span>
                    <span className="text-xs text-muted-foreground">{formatDistanceToNow(new Date(session.createdAt), { addSuffix: true })}</span>
                  </Button>
                ))}
              </div>
            ) : (
               <p className="text-sm text-muted-foreground">No history yet. Your first analysis will appear here.</p>
            )}
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>{activeSession ? "Viewing Session" : "New Analysis"}</CardTitle>
            <CardDescription>
             {activeSession ? "This is a saved session. To start a new one, click 'New Analysis'." : "Provide the core details of your business idea."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="businessIdea"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Idea</FormLabel>
                      <FormControl>
                        <Textarea placeholder="e.g., A mobile app that uses AI to create personalized workout plans..." {...field} rows={5} disabled={!!activeSession} />
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
                        <Textarea placeholder="e.g., Busy professionals aged 25-40 who want to stay fit but lack time." {...field} rows={3} disabled={!!activeSession}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="revenueModel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Revenue Model</FormLabel>
                      <FormControl>
                        <Textarea placeholder="e.g., Monthly subscription, one-time purchase, ad-supported..." {...field} rows={2} disabled={!!activeSession}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading || !!activeSession} className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Wand2 className="mr-2 h-4 w-4" />
                      Get Co-Founder Analysis
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
                  <CardTitle>AI Co-Founder Due Diligence Report</CardTitle>
                  <CardDescription>Your analysis is saved automatically for future reference.</CardDescription>
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
