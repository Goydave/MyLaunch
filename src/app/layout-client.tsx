
"use client";

import { AppShell } from "@/components/layout/app-shell";
import { Toaster } from "@/components/ui/toaster";
import { usePathname } from "next/navigation";

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/" || pathname === "/signup";

  return (
    <>
      {isAuthPage ? (
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
