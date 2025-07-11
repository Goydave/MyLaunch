"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Wand2 } from "lucide-react";
import { generateIdeaNames } from "@/ai/flows/idea-name-generator";
import { suggestFeatures } from "@/ai/flows/feature-suggestion";
import { generateProductDescription } from "@/ai/flows/content-generation";

type AIOutput = string[] | { shortDescription: string; longDescription: string } | null;

export default function CopilotPage() {
  const [inputValue, setInputValue] = useState("");
  const [output, setOutput] = useState<AIOutput>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("name-generator");

  const handleGenerate = async () => {
    setIsLoading(true);
    setOutput(null);

    let result;
    try {
        if (activeTab === "name-generator") {
          result = await generateIdeaNames({ ideaDescription: inputValue });
          setOutput(result.ideaNames || []);
        } else if (activeTab === "feature-suggester") {
          result = await suggestFeatures({ projectIdea: inputValue });
          setOutput(result.suggestedFeatures || []);
        } else if (activeTab === "content-generator") {
          result = await generateProductDescription({ projectIdea: inputValue });
          setOutput(result);
        }
    } catch (error) {
        console.error("AI action failed:", error);
        setOutput([]);
    }


    setIsLoading(false);
  };
  
  const resetState = () => {
    setInputValue("");
    setOutput(null);
    setIsLoading(false);
  }

  const renderOutput = () => {
    if (isLoading) {
      return (
        <div className="space-y-2">
            <div className="h-4 w-full bg-muted rounded animate-pulse" />
            <div className="h-4 w-4/5 bg-muted rounded animate-pulse" />
            <div className="h-4 w-full bg-muted rounded animate-pulse" />
        </div>
      );
    }

    if (!output) {
      return <p className="text-sm text-muted-foreground">AI suggestions will appear here.</p>;
    }
    
    if (Array.isArray(output)) {
        return (
            <ul className="space-y-2 list-disc list-inside">
                {output.map((item, index) => <li key={index} className="text-sm">{item}</li>)}
            </ul>
        )
    }

    if(typeof output === 'object' && output !== null && 'shortDescription' in output) {
        return (
            <div className="space-y-4">
                <div>
                    <h4 className="font-semibold text-sm">Short Description</h4>
                    <p className="text-sm text-muted-foreground">{output.shortDescription}</p>
                </div>
                 <div>
                    <h4 className="font-semibold text-sm">Long Description</h4>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{output.longDescription}</p>
                </div>
            </div>
        )
    }

    return null;
  };

  const placeholders: { [key: string]: string } = {
    'name-generator': 'e.g., A social media app for pet owners...',
    'feature-suggester': 'e.g., A platform for local artists to sell prints...',
    'content-generator': 'e.g., A subscription box for eco-friendly products...',
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div>
        <h1 className="text-lg font-semibold md:text-2xl">AI Copilot</h1>
        <p className="text-muted-foreground text-sm">Your creative partner for brainstorming and content.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Generator</CardTitle>
            <CardDescription>Select a tool and provide some context.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs value={activeTab} onValueChange={(value) => { setActiveTab(value); resetState(); }}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="name-generator">Names</TabsTrigger>
                <TabsTrigger value="feature-suggester">Features</TabsTrigger>
                <TabsTrigger value="content-generator">Content</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="space-y-2">
                <label htmlFor="ai-input" className="text-sm font-medium">Project Idea or Description</label>
                <Textarea
                    id="ai-input"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={placeholders[activeTab]}
                    className="min-h-[100px]"
                />
            </div>

            <Button onClick={handleGenerate} disabled={isLoading || !inputValue} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Generate
                </>
              )}
            </Button>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>AI Suggestions</CardTitle>
            <CardDescription>Results from your AI Copilot.</CardDescription>
          </CardHeader>
          <CardContent>
            {renderOutput()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
