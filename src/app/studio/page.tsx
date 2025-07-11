import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const templates = [
  {
    name: "Startup",
    description: "Sleek, modern, and professional. Perfect for your new tech venture.",
    image: "https://placehold.co/600x400.png",
    dataAiHint: "startup office"
  },
  {
    name: "Creator",
    description: "A personal, stylish template to showcase your portfolio and content.",
    image: "https://placehold.co/600x400.png",
    dataAiHint: "artist portfolio"
  },
  {
    name: "Agency",
    description: "Showcase your services and client work with this clean, corporate template.",
    image: "https://placehold.co/600x400.png",
    dataAiHint: "creative agency"
  },
  {
    name: "Solo Dev",
    description: "A minimal, dark-themed template to get your side project noticed.",
    image: "https://placehold.co/600x400.png",
    dataAiHint: "developer desk"
  },
];

export default function StudioPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold md:text-2xl">Launch Studio</h1>
          <p className="text-muted-foreground text-sm">One-tap deploy of your public-facing page.</p>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold">Choose a Template</h2>
          <p className="text-muted-foreground text-sm">Select a pre-built template for your landing page.</p>
        </div>
        <div className="grid gap-4 md:gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {templates.map((template) => (
            <Card key={template.name} className="flex flex-col">
              <CardHeader className="p-0">
                <Image
                  src={template.image}
                  alt={template.name}
                  width={600}
                  height={400}
                  className="rounded-t-lg aspect-video object-cover"
                  data-ai-hint={template.dataAiHint}
                />
              </CardHeader>
              <CardContent className="p-4 flex-grow flex flex-col">
                <h3 className="text-md font-semibold">{template.name}</h3>
                <p className="text-sm text-muted-foreground flex-grow mt-1">{template.description}</p>
                <Button variant="outline" className="w-full mt-4">
                  Preview
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Launch Your Page</CardTitle>
            <CardDescription>Once you've selected and customized a template, you can deploy it with one click.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-center gap-4 p-6 bg-muted/50 rounded-lg">
                <div className="flex-grow">
                    <h3 className="font-semibold">Your startup.mylaunch.app is ready!</h3>
                    <p className="text-sm text-muted-foreground">Select a template to get started.</p>
                </div>
                <Button>
                    Deploy Page <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
