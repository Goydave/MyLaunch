
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Wand2, Rocket, PartyPopper, ArrowUpRight } from "lucide-react";
import { generateLandingPage, type LandingPageOutput } from "@/ai/flows/landing-page-generator";
import { usePlan } from "@/hooks/use-plan";
import { UpgradePro } from "@/components/layout/upgrade-pro";
import Image from "next/image";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "@/hooks/use-toast";


const formSchema = z.object({
  projectIdea: z.string().min(10, "Please describe your project idea in at least 10 characters."),
  branding: z.string().min(5, "Describe your brand's feel (e.g., 'modern and sleek', 'fun and quirky')."),
});

type FormValues = z.infer<typeof formSchema>;

export default function StudioPage() {
  const { plan } = usePlan();
  const [isClient, setIsClient] = useState(false);
  const [landingPage, setLandingPage] = useState<LandingPageOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [isDeployed, setIsDeployed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectIdea: "",
      branding: "",
    },
  });

  const handleSubmit = async (values: FormValues) => {
    setIsLoading(true);
    setError(null);
    setLandingPage(null);
    setIsDeployed(false);

    try {
      const result = await generateLandingPage(values);
      setLandingPage(result);
    } catch (e) {
      setError("Failed to generate the landing page. The AI might be having a moment. Please try again.");
    }
    setIsLoading(false);
  };
  
  const handleDeploy = () => {
    setIsDeploying(true);
    toast({
        title: "Deploying your site...",
        description: "Your launch page is going live. This will take a few seconds."
    })
    setTimeout(() => {
        setIsDeploying(false);
        setIsDeployed(true);
        toast({
            title: "Success!",
            description: "Your new landing page is now live.",
        })
    }, 2500);
  }

  if (!isClient) {
    return null; // Render nothing on the server and during initial client render
  }

  if (plan === "Free") {
    return <UpgradePro featureName="Launch Studio" />;
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div>
        <h1 className="text-lg font-semibold md:text-2xl">Launch Studio</h1>
        <p className="text-muted-foreground text-sm">One-tap AI deployment of your public-facing page.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* INPUT & CONTROLS */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Launch Control</CardTitle>
            <CardDescription>
              Describe your idea, and let AI build your site.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="projectIdea"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Idea</FormLabel>
                      <FormControl>
                        <Textarea placeholder="e.g., A marketplace for sustainable, eco-friendly products..." {...field} rows={4} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="branding"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Branding & Vibe</FormLabel>
                      <FormControl>
                        <Textarea placeholder="e.g., 'Minimal, clean, and trustworthy' or 'Vibrant, bold, and energetic'" {...field} rows={2}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 animate-spin" />
                      Building Your Site...
                    </>
                  ) : (
                    <>
                      <Wand2 className="mr-2" />
                      Generate Site
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        {/* PREVIEW */}
        <div className="lg:col-span-2">
           <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Live Preview</CardTitle>
                <CardDescription>Your AI-generated landing page appears here.</CardDescription>
              </div>
              <Button onClick={handleDeploy} disabled={!landingPage || isDeploying || isDeployed}>
                {isDeploying && <Loader2 className="mr-2 animate-spin" />}
                {isDeployed ? <><PartyPopper className="mr-2" />Deployed!</> : <><Rocket className="mr-2"/>Launch Page</>}
              </Button>
            </CardHeader>
            <CardContent>
                {renderPreview()}
            </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );

  function renderPreview() {
     if (isLoading) {
      return (
        <div className="space-y-4 rounded-lg border-2 border-dashed p-8 text-center animate-pulse">
            <div className="mx-auto h-16 w-16 bg-muted rounded-full"></div>
            <div className="h-8 w-3/4 mx-auto bg-muted rounded"></div>
            <div className="h-4 w-1/2 mx-auto bg-muted rounded"></div>
            <div className="h-40 w-full bg-muted rounded-lg"></div>
        </div>
      )
    }

    if(isDeployed && landingPage) {
        return (
             <Alert className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
                <PartyPopper className="h-4 w-4 text-green-600 dark:text-green-400" />
                <AlertTitle className="text-green-800 dark:text-green-200">Congratulations! Your Site is Live!</AlertTitle>
                <AlertDescription className="text-green-700 dark:text-green-300">
                    Your page is now available at a temporary preview URL.
                    <Button variant="link" asChild className="p-0 h-auto ml-2 text-green-700 dark:text-green-300">
                        <a href="#" target="_blank" rel="noopener noreferrer">
                           startup.mylaunch.app <ArrowUpRight className="inline h-4 w-4"/>
                        </a>
                    </Button>
                </AlertDescription>
            </Alert>
        )
    }

    if (error) {
        return <p className="text-sm text-center text-destructive">{error}</p>
    }

    if (landingPage) {
      return (
        <div className="space-y-8 rounded-lg border p-4 sm:p-8">
            <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">{landingPage.headline}</h2>
                <p className="mx-auto max-w-xl text-muted-foreground mt-2">{landingPage.subheadline}</p>
            </div>
            
            {landingPage.heroImageUrl && (
                <div className="overflow-hidden rounded-lg shadow-lg">
                    <Image 
                        src={landingPage.heroImageUrl}
                        alt="AI-generated hero image for the landing page"
                        width={1200}
                        height={600}
                        className="aspect-video w-full object-cover"
                    />
                </div>
            )}

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {landingPage.features.map((feature, index) => (
                    <div key={index}>
                        <h3 className="font-semibold">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
      )
    }

    return (
        <div className="flex items-center justify-center h-full rounded-lg border-2 border-dashed p-8 text-center">
          <p className="text-sm text-muted-foreground">Fill out the form to generate your beautiful landing page.</p>
        </div>
    );
  }
}
