
"use client";

import { AppShell } from "@/components/layout/app-shell";
import { Toaster } from "@/components/ui/toaster";
import { useUser } from "@/hooks/use-user";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";


export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useUser();
  
  const isAuthPage = pathname === "/" || pathname === "/signup";

  useEffect(() => {
    if (loading) return; // Wait until authentication state is loaded

    if (!user && !isAuthPage) {
      router.push('/'); // Redirect to login if not authenticated and not on an auth page
    }
    if (user && isAuthPage) {
      router.push('/dashboard'); // Redirect to dashboard if authenticated and on an auth page
    }
  }, [user, loading, isAuthPage, router]);

  if (loading) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
    )
  }
  
  if (!user && !isAuthPage) {
      // Still loading or about to redirect, show a loader
      return (
        <div className="flex items-center justify-center min-h-screen">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      );
  }

  if (user && isAuthPage) {
      // Still loading or about to redirect, show a loader
      return (
        <div className="flex items-center justify-center min-h-screen">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      );
  }

  return (
    <>
      {isAuthPage || !user ? (
        children
      ) : (
        <AppShell>
          {children}
        </AppShell>
      )}
      <Toaster />
    </>
  );
}
