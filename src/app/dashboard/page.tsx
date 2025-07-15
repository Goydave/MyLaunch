
import {
  ArrowUp,
  Lightbulb,
  Rocket,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { AINotifications } from '@/components/dashboard/ai-notifications';
import type { Project } from "@/app/workspace/page";

const initialProjects: Project[] = [
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


export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Growth Score</CardTitle>
            <ArrowUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12.5%</div>
            <p className="text-xs text-muted-foreground">
              +2.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Idea Surge</CardTitle>
            <Lightbulb className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+5 New Ideas</div>
            <p className="text-xs text-muted-foreground">
              +1 since last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Build Suggestions
            </CardTitle>
            <Rocket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3 Actionable Steps</div>
            <p className="text-xs text-muted-foreground">
              For your top project
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Community Hype
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+235</div>
            <p className="text-xs text-muted-foreground">
              upvotes on last launch
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Active Projects</CardTitle>
              <CardDescription>
                An overview of your current ventures.
              </CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link href="/workspace">
                View All
                <ArrowUp className="h-4 w-4 rotate-45" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead className="hidden sm:table-cell">Stage</TableHead>
                  <TableHead className="text-right">Hype Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {initialProjects.slice(0,3).map((project) => (
                   <TableRow key={project.id}>
                    <TableCell>
                      <div className="font-medium">{project.title}</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        {project.description}
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge className="text-xs" variant={project.stage === 'Launched' ? 'default' : 'secondary'}>
                        {project.stage}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                        {project.stage === 'Launched' ? `🔥 ${project.id * 1337}` : project.stage === 'MVP Build' ? `🚀 ${project.id * 233}` : `💡 ${project.id * 97}`}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <AINotifications projects={initialProjects} />
      </div>
    </div>
  );
}
