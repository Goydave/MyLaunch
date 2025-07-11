// src/app/workspace/page.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
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
import { ProjectDialog } from "@/components/workspace/project-dialog";
import { useToast } from "@/hooks/use-toast";

export type Project = {
  id: number;
  title: string;
  description: string;
  stage: "Ideation" | "Validation" | "Prototyping" | "MVP Build" | "Launched";
  progress: number;
  image: string;
  dataAiHint: string;
};

const initialProjects: Project[] = [
  {
    id: 1,
    title: "AI Note Taker",
    description: "An intelligent assistant that transcribes and summarizes your meetings.",
    stage: "MVP Build",
    progress: 75,
    image: "https://placehold.co/600x400.png",
    dataAiHint: "artificial intelligence"
  },
  {
    id: 2,
    title: "Creator Platform",
    description: "A digital marketplace for creators to sell their work directly to fans.",
    stage: "Ideation",
    progress: 30,
    image: "https://placehold.co/600x400.png",
    dataAiHint: "digital art"
  },
  {
    id: 3,
    title: "HyperLocal Delivery",
    description: "24/7 delivery service designed for small towns and rural areas.",
    stage: "Launched",
    progress: 100,
    image: "https://placehold.co/600x400.png",
    dataAiHint: "delivery scooter"
  },
    {
    id: 4,
    title: "Fitness Gamified",
    description: "Turn your workouts into an epic adventure with quests and rewards.",
    stage: "Prototyping",
    progress: 50,
    image: "https://placehold.co/600x400.png",
    dataAiHint: "fitness tracker"
  },
  {
    id: 5,
    title: "Eco Marketplace",
    description: "A hub to connect with eco-friendly brands and sustainable products.",
    stage: "Validation",
    progress: 15,
    image: "https://placehold.co/600x400.png",
    dataAiHint: "eco friendly"
  },
  {
    id: 6,
    title: "VR Language App",
    description: "Immerse yourself in virtual worlds to learn new languages conversationally.",
    stage: "Launched",
    progress: 100,
    image: "https://placehold.co/600x400.png",
    dataAiHint: "virtual reality"
  },
];

export default function WorkspacePage() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const { toast } = useToast();

  const handleAddNew = () => {
    setEditingProject(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setIsDialogOpen(true);
  };

  const handleArchive = (projectId: number) => {
    setProjects(projects.filter(p => p.id !== projectId));
    toast({
      title: "Project Archived",
      description: "The project has been successfully archived.",
    })
  };

  const handleSaveProject = (projectData: Omit<Project, 'id' | 'image' | 'dataAiHint'>) => {
    if (editingProject) {
      // Update existing project
      const updatedProjects = projects.map(p => 
        p.id === editingProject.id ? { ...p, ...projectData } : p
      );
      setProjects(updatedProjects);
      toast({
        title: "Project Updated",
        description: "Your project details have been saved.",
      })
    } else {
      // Add new project
      const newProject: Project = {
        ...projectData,
        id: Date.now(),
        image: "https://placehold.co/600x400.png",
        dataAiHint: "new project"
      };
      setProjects([newProject, ...projects]);
      toast({
        title: "Project Created!",
        description: "Your new project is ready to go.",
      })
    }
    setIsDialogOpen(false);
    setEditingProject(null);
  };

  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold md:text-2xl">Launch Workspace</h1>
            <p className="text-muted-foreground text-sm">This is where your ideas take flight.</p>
          </div>
          <Button onClick={handleAddNew}>
            <PlusCircle className="mr-2 h-4 w-4" /> New Project
          </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
              <CardHeader className="relative p-0 h-48">
                <Image
                  alt={project.title}
                  className="object-cover w-full h-full"
                  src={project.image}
                  width="600"
                  height="400"
                  data-ai-hint={project.dataAiHint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 right-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => handleEdit(project)}>Edit Project</DropdownMenuItem>
                      <DropdownMenuItem>View Analytics</DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleArchive(project.id)}
                        className="text-destructive focus:text-destructive focus:bg-destructive/10"
                      >
                        Archive
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="absolute bottom-0 p-4">
                  <Badge variant={project.stage === 'Launched' ? 'default' : 'secondary'}>{project.stage}</Badge>
                  <CardTitle className="text-lg text-white mt-1">{project.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <p className="text-sm text-muted-foreground line-clamp-2 h-10">{project.description}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <div className="flex w-full flex-col gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Progress</span>
                    <span className="text-muted-foreground">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} aria-label={`${project.progress}% complete`} className="h-2" />
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      <ProjectDialog 
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSave={handleSaveProject}
        project={editingProject}
      />
    </>
  );
}
