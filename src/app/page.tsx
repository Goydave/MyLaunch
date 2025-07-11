import {
  Activity,
  ArrowUp,
  CircleDollarSign,
  Lightbulb,
  Plus,
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

export default function Home() {
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
                <TableRow>
                  <TableCell>
                    <div className="font-medium">AI-Powered Note Taker</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      An intelligent assistant for meetings
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge className="text-xs" variant="secondary">
                      MVP Build
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">🚀 1,204</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Creator-First Platform</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      A marketplace for digital creators
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge className="text-xs" variant="secondary">
                      Ideation
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">💡 890</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">HyperLocal Delivery</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      24/7 delivery service for small towns
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge className="text-xs" variant="outline">
                      Launched
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">🔥 10,432</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Live AI Notifications</CardTitle>
            <CardDescription>
              Your copilot is keeping an eye on things for you.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center gap-4">
              <Lightbulb className="h-8 w-8 text-primary" />
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  Your pitch deck is missing a CTA - fix it?
                </p>
                <p className="text-sm text-muted-foreground">5 min ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Rocket className="h-8 w-8 text-primary" />
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  Your launch date is close. Schedule pre-launch tweets?
                </p>
                <p className="text-sm text-muted-foreground">1 hour ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Users className="h-8 w-8 text-primary" />
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  You just hit 200 early signups! Ready for Phase 2?
                </p>
                <p className="text-sm text-muted-foreground">3 hours ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
