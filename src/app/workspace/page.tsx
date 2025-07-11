import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const projects = [
  {
    title: "AI-Powered Note Taker",
    description: "An intelligent assistant that transcribes and summarizes meetings.",
    status: "In Progress",
    progress: 75,
    stage: "MVP Build",
    image: "https://placehold.co/600x400.png",
    dataAiHint: "artificial intelligence abstract"
  },
  {
    title: "Creator-First Platform",
    description: "A digital marketplace for creators to sell their work directly to fans.",
    status: "On Hold",
    progress: 30,
    stage: "Ideation",
    image: "https://placehold.co/600x400.png",
    dataAiHint: "digital art"
  },
  {
    title: "HyperLocal Delivery",
    description: "24/7 delivery service designed for small towns and rural areas.",
    status: "Launched",
    progress: 100,
    stage: "Launched",
    image: "https://placehold.co/600x400.png",
    dataAiHint: "delivery scooter"
  },
    {
    title: "Fitness Gamification App",
    description: "Turn your workouts into an epic adventure with quests and rewards.",
    status: "In Progress",
    progress: 50,
    stage: "Prototyping",
    image: "https://placehold.co/600x400.png",
    dataAiHint: "fitness tracker"
  },
  {
    title: "Sustainable Marketplace",
    description: "Connect with eco-friendly brands and products.",
    status: "Planning",
    progress: 10,
    stage: "Validation",
    image: "https://placehold.co/600x400.png",
    dataAiHint: "eco friendly"
  },
  {
    title: "VR Language Learning",
    description: "Immerse yourself in virtual worlds to learn new languages.",
    status: "Completed",
    progress: 100,
    stage: "Launched",
    image: "https://placehold.co/600x400.png",
    dataAiHint: "virtual reality"
  },
];

export default function WorkspacePage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold md:text-2xl">Launch Workspace</h1>
          <p className="text-muted-foreground text-sm">Turn your ideas into MVPs.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> New Project
        </Button>
      </div>
      <div className="grid gap-4 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <Card key={index}>
            <CardHeader className="relative">
              <Image
                alt={project.title}
                className="aspect-video w-full rounded-md object-cover"
                height="338"
                src={project.image}
                width="600"
                data-ai-hint={project.dataAiHint}
              />
               <div className="absolute top-6 right-6">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      aria-haspopup="true"
                      size="icon"
                      variant="outline"
                      className="h-8 w-8 bg-white/80 backdrop-blur-sm"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>View Analytics</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-500">Archive</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <Badge variant="secondary" className="mb-2">{project.stage}</Badge>
              <CardTitle className="text-lg">{project.title}</CardTitle>
              <CardDescription className="mt-1 line-clamp-2">{project.description}</CardDescription>
            </CardContent>
            <CardFooter>
              <div className="flex w-full flex-col gap-2 text-sm">
                <div className="flex justify-between">
                  <span>Progress</span>
                  <span className="text-muted-foreground">{project.progress}%</span>
                </div>
                <Progress value={project.progress} aria-label={`${project.progress}% complete`} />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
