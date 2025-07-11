
"use client";

import * as React from "react";

export type Plan = "Free" | "Pro" | "Enterprise";

type PlanProviderState = {
  plan: Plan;
  setPlan: (plan: Plan) => void;
};

const initialState: PlanProviderState = {
  plan: "Free",
  setPlan: () => null,
};

const PlanProviderContext = React.createContext<PlanProviderState>(initialState);

export function PlanProvider({
  children,
  defaultPlan = "Free",
  storageKey = "mylaunch-plan",
}: {
  children: React.ReactNode;
  defaultPlan?: Plan;
  storageKey?: string;
}) {
  const [plan, setPlan] = React.useState<Plan>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem(storageKey) as Plan) || defaultPlan;
    }
    return defaultPlan;
  });

  const value = {
    plan,
    setPlan: (plan: Plan) => {
      if (typeof window !== "undefined") {
        localStorage.setItem(storageKey, plan);
      }
      setPlan(plan);
    },
  };

  return (
    <PlanProviderContext.Provider value={value}>
      {children}
    </PlanProviderContext.Provider>
  );
}

export const usePlan = () => {
  const context = React.useContext(PlanProviderContext);

  if (context === undefined)
    throw new Error("usePlan must be used within a PlanProvider");

  return context;
};
