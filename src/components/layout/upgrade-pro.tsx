
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";
import Link from "next/link";

interface UpgradeProProps {
    featureName: string;
}

export function UpgradePro({ featureName }: UpgradeProProps) {
    return (
        <div className="flex flex-1 items-center justify-center p-8">
            <Card className="w-full max-w-md text-center">
                <CardHeader>
                    <div className="mx-auto bg-primary/10 p-3 rounded-full">
                      <Lock className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="mt-4">Upgrade to Pro</CardTitle>
                    <CardDescription>
                       The "{featureName}" is a premium feature. Please upgrade your plan to access it.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild>
                        <Link href="/billing">Upgrade Your Plan</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
