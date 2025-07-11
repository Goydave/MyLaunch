
// src/components/dashboard/ai-notifications.tsx
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import type { Project } from "@/app/workspace/page";
import { Lightbulb, Rocket, Users, FileText } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export const initialProjects: Project[] = [
  {
    id: 1,
    title: "AI Note Taker",
    description: "An intelligent assistant that records, transcribes, and summarizes your meetings, so you never miss a key decision. Turns hours of audio into actionable insights in seconds.",
    stage: "MVP Build",
    progress: 75,
    image: "https://placehold.co/600x400.png",
    dataAiHint: "artificial intelligence"
  },
  {
    id: 2,
    title: "Creator Platform",
    description: "A digital marketplace that empowers artists and creators to sell their work directly to fans, bypassing traditional gatekeepers and fostering a direct connection with their audience.",
    stage: "Ideation",
    progress: 30,
    image: "https://placehold.co/600x400.png",
    dataAiHint: "digital art"
  },
  {
    id: 3,
    title: "HyperLocal Delivery",
    description: "A 24/7 delivery service designed for small towns and rural areas, bringing the convenience of city living to underserved communities with a focus on supporting local businesses.",
    stage: "Launched",
    progress: 100,
    image: "https://placehold.co/600x400.png",
    dataAiHint: "delivery scooter"
  },
    {
    id: 4,
    title: "Fitness Gamified",
    description: "Turn your workouts into an epic adventure. An app that uses game mechanics, quests, and rewards to make fitness fun, motivating you to level up your health.",
    stage: "Prototyping",
    progress: 50,
    image: "https://placehold.co/600x400.png",
    dataAiHint: "fitness tracker"
  },
  {
    id: 5,
    title: "Eco Marketplace",
    description: "A curated hub connecting conscious consumers with truly sustainable and eco-friendly brands. Shop with confidence, knowing every product meets the highest ethical standards.",
    stage: "Validation",
    progress: 15,
    image: "https://placehold.co/600x400.png",
    dataAiHint: "eco friendly"
  },
  {
    id: 6,
    title: "VR Language App",
    description: "Immerse yourself in virtual worlds to learn new languages through conversation, not conjugation. Practice speaking with AI-powered characters in realistic scenarios.",
    stage: "Launched",
    progress: 100,
    image: "https://placehold.co/600x400.png",
    dataAiHint: "virtual reality"
  },
];


const getAINotifications = (projects: Project[]) => {
    const notifications = [];
    
    const ideationProject = projects.find(p => p.stage === 'Ideation');
    if (ideationProject) {
        notifications.push({
            icon: Lightbulb,
            text: `Your project "${ideationProject.title}" is in the idea phase. Time to create a pitch deck?`,
            link: "/pitch-deck",
            cta: "Create Deck"
        });
    }

    const mvpProject = projects.find(p => p.stage === 'MVP Build');
    if (mvpProject) {
        notifications.push({
            icon: Rocket,
            text: `"${mvpProject.title}" is ready for the spotlight. Let's generate a landing page!`,
            link: "/studio",
            cta: "Launch Studio"
        });
    }
    
    const launchedProject = projects.find(p => p.stage === 'Launched');
    if (launchedProject) {
         notifications.push({
            icon: Users,
            text: `You've launched "${launchedProject.title}"! Get feedback from your first users.`,
            link: "/workspace",
            cta: "View Project"
        });
    }
    
    if (notifications.length < 3) {
         notifications.push({
            icon: FileText,
            text: `Feeling stuck? Let's brainstorm some new features for your projects.`,
            link: "/copilot",
            cta: "Go to Copilot"
        });
    }

    return notifications.slice(0, 3);
}


export function AINotifications({ projects }: { projects: Project[] }) {
    const notifications = getAINotifications(projects);

    return (
        <Card>
          <CardHeader>
            <CardTitle>Live AI Notifications</CardTitle>
            <CardDescription>
              Your copilot is keeping an eye on things for you.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
             {notifications.map((notification, index) => (
                <div key={index} className="flex items-start gap-4">
                    <notification.icon className="h-8 w-8 text-primary mt-1" />
                    <div className="grid gap-1 flex-1">
                        <p className="text-sm font-medium leading-normal">
                        {notification.text}
                        </p>
                         <Button variant="link" size="sm" asChild className="p-0 h-auto justify-start w-fit">
                            <Link href={notification.link}>
                               {notification.cta}
                            </Link>
                        </Button>
                    </div>
                </div>
            ))}
          </CardContent>
        </Card>
    );
}
