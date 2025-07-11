
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const plans = [
    {
        name: "Free",
        price: "$0",
        period: "/ month",
        description: "For individuals and small teams getting started.",
        features: [
            "5 Projects",
            "Basic AI Copilot access",
            "Community support",
        ],
        cta: "Current Plan",
        variant: "outline"
    },
    {
        name: "Pro",
        price: "$29",
        period: "/ month",
        description: "For growing teams that need more power and support.",
        features: [
            "Unlimited Projects",
            "Advanced AI Copilot",
            "Pitch Deck Generator",
            "Priority email support",
            "Launch Studio access"
        ],
        cta: "Upgrade to Pro",
        variant: "default"
    },
    {
        name: "Enterprise",
        price: "Custom",
        period: "",
        description: "For large organizations with custom needs.",
        features: [
            "Everything in Pro",
            "Dedicated Account Manager",
            "Custom integrations",
            "24/7 priority support",
            "On-premise deployment option"
        ],
        cta: "Contact Sales",
        variant: "outline"
    },
]


export default function BillingPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
       <div>
        <h1 className="text-lg font-semibold md:text-2xl">Billing & Plans</h1>
        <p className="text-muted-foreground text-sm">
          Choose the plan that's right for your team.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
            <Card key={plan.name} className={`flex flex-col ${plan.name === 'Pro' ? 'border-primary' : ''}`}>
                <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="flex items-baseline pt-4">
                        <span className="text-3xl font-bold">{plan.price}</span>
                        {plan.period && <span className="text-sm text-muted-foreground">{plan.period}</span>}
                    </div>
                </CardHeader>
                <CardContent className="flex-grow">
                    <ul className="space-y-3">
                        {plan.features.map((feature) => (
                            <li key={feature} className="flex items-center">
                                <Check className="h-4 w-4 mr-2 text-primary" />
                                <span className="text-sm text-muted-foreground">{feature}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
                <CardContent>
                     <Button className="w-full" variant={plan.variant as any}>
                        {plan.cta}
                    </Button>
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}
