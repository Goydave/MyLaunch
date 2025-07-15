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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Check, Loader2, Sparkles, History, PlusCircle, ThumbsUp, ThumbsDown, AlertTriangle, Lightbulb, Target, Scale, Users, Shield, Wand2, Search } from "lucide-react";
import { chat, type CoFounderOutput } from "@/ai/flows/chat";
import { generateBusinessIdeas, type BusinessIdeaOutput } from "@/ai/flows/business-idea-generator";
import type { BusinessIdea } from "@/ai/schemas/business-idea";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


const analysisSchema = z.object({
  businessIdea: z.string().min(20, "Please provide a detailed description of your business idea (at least 20 characters)."),
  targetAudience: z.string().min(10, "Describe your target audience."),
  revenueModel: z.string().min(5, "Briefly describe how you'll make money."),
});

const suggestionSchema = z.object({
    interests: z.string().min(5, "Please list some of your interests or skills."),
});


type AnalysisFormValues = z.infer<typeof analysisSchema>;
type SuggestionFormValues = z.infer<typeof suggestionSchema>;
type CopilotMode = "analyze" | "suggest";

export default function CopilotPage() {
  const { user } = useUser();
  const [sessions, setSessions] = useState<CopilotSession[]>([]);
  const [activeSession, setActiveSession] = useState<CopilotSession | null>(null);
  const [response, setResponse] = useState<CoFounderOutput | null>(null);
  const [suggestedIdeas, setSuggestedIdeas] = useState<BusinessIdeaOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isHistoryLoading, setIsHistoryLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<CopilotMode>("analyze");

  const analysisForm = useForm<AnalysisFormValues>({
    resolver: zodResolver(analysisSchema),
    defaultValues: { businessIdea: "", targetAudience: "", revenueModel: "" },
  });

  const suggestionForm = useForm<SuggestionFormValues>({
    resolver: zodResolver(suggestionSchema),
    defaultValues: { interests: "" },
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

  const handleAnalysisSubmit = async (values: AnalysisFormValues) => {
    if (!user) {
      toast({ title: "Authentication Error", description: "You must be logged in.", variant: "destructive" });
      return;
    }
    
    setIsLoading(true);
    commonReset();

    try {
      const result = await chat(values);
      setResponse(result);
      if(user) {
        getUserCopilotSessions(user.uid).then(setSessions);
      }
    } catch (e) {
      setError("Failed to get a response from the AI. Please try again.");
      console.error(e);
    }
    setIsLoading(false);
  };
  
  const handleSuggestionSubmit = async (values: SuggestionFormValues) => {
    setIsLoading(true);
    commonReset();

    try {
      const result = await generateBusinessIdeas(values);
      setSuggestedIdeas(result);
    } catch (e) {
      setError("Failed to get business ideas from the AI. Please try again.");
      console.error(e);
    }
    setIsLoading(false);
  }

  const commonReset = () => {
    setError(null);
    setResponse(null);
    setSuggestedIdeas(null);
    setActiveSession(null);
  }
  
  const handleSelectSession = (session: CopilotSession) => {
    setMode("analyze");
    setActiveSession(session);
    analysisForm.reset(session.prompt);
    setResponse(session.response);
    setSuggestedIdeas(null);
    setError(null);
  }
  
  const handleNewAnalysis = () => {
    setActiveSession(null);
    setResponse(null);
    setSuggestedIdeas(null);
    analysisForm.reset({ businessIdea: "", targetAudience: "", revenueModel: "" });
    suggestionForm.reset({ interests: "" });
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
        {[...Array(2)].map((_, i) => (
            <Card key={i}>
                <CardHeader><Skeleton className="h-6 w-1/2" /></CardHeader>
                <CardContent className="space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                </CardContent>
            </Card>
        ))}
    </div>
  );
  
  const renderSuggestedIdeas = () => {
    if (!suggestedIdeas) return null;
    return (
        <div className="space-y-6">
             <h3 className="text-lg font-semibold text-center">Top 3 Business Ideas For You</h3>
             {suggestedIdeas.ideas.map((idea: BusinessIdea, index: number) => (
                 <Card key={index}>
                     <CardHeader>
                         <CardTitle className="flex items-center gap-2"><Lightbulb className="text-primary"/>{idea.title}</CardTitle>
                     </CardHeader>
                     <CardContent>
                         <p className="text-sm text-muted-foreground mb-4">{idea.description}</p>
                         <p className="text-sm border-l-2 border-primary pl-3 text-foreground/80">{idea.rationale}</p>
                     </CardContent>
                 </Card>
             ))}
        </div>
    )
  }

  const renderResponse = () => {
    if (isLoading) return renderLoadingSkeleton();
    if (error) return <p className="text-center text-sm text-destructive">{error}</p>;
    if (suggestedIdeas) return renderSuggestedIdeas();
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
          Get elite-level analysis for your idea, or let the AI suggest one for you.
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <History className="h-5 w-5" />
              <CardTitle className="text-lg">Analysis History</CardTitle>
            </div>
             <Button variant="outline" size="sm" onClick={handleNewAnalysis} disabled={!activeSession && !response && !suggestedIdeas}>
              <PlusCircle className="mr-2 h-4 w-4" />
              New
            </Button>
          </div>
          <CardDescription>
            Only your deep analysis sessions are saved here. Idea suggestions are not saved.
          </CardDescription>
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
          <Tabs value={mode} onValueChange={(value) => setMode(value as CopilotMode)}>
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="analyze">Analyze My Idea</TabsTrigger>
                <TabsTrigger value="suggest">Suggest Ideas</TabsTrigger>
            </TabsList>
            <TabsContent value="analyze">
                <CardHeader>
                    <CardTitle>{activeSession ? "Viewing Session" : "Analyze Your Idea"}</CardTitle>
                    <CardDescription>
                    {activeSession ? "This is a saved session." : "Provide the core details of your business idea."}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...analysisForm}>
                    <form onSubmit={analysisForm.handleSubmit(handleAnalysisSubmit)} className="space-y-4">
                        <FormField
                        control={analysisForm.control}
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
                        control={analysisForm.control}
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
                        control={analysisForm.control}
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
                        {isLoading ? ( <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Analyzing...</>
                        ) : ( <><Wand2 className="mr-2 h-4 w-4" />Get Analysis</> )}
                        </Button>
                    </form>
                    </Form>
                </CardContent>
            </TabsContent>
            <TabsContent value="suggest">
                 <CardHeader>
                    <CardTitle>Suggest Business Ideas</CardTitle>
                    <CardDescription>
                        Don't have an idea? Let our AI suggest some based on your interests.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...suggestionForm}>
                         <form onSubmit={suggestionForm.handleSubmit(handleSuggestionSubmit)} className="space-y-4">
                            <FormField
                            control={suggestionForm.control}
                            name="interests"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Your Interests or Skills</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="e.g., AI, sustainable fashion, video games, cooking..." {...field} rows={4} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                             <Button type="submit" disabled={isLoading} className="w-full">
                                {isLoading ? ( <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Generating...</>
                                ) : ( <><Search className="mr-2 h-4 w-4" />Suggest Ideas</> )}
                            </Button>
                         </form>
                    </Form>
                </CardContent>
            </TabsContent>
          </Tabs>
        </Card>
        
        <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                  <CardTitle>AI Co-Founder Report</CardTitle>
                  <CardDescription>Your AI-powered insights appear below.</CardDescription>
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
