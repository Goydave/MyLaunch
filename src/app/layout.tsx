import type {Metadata} from 'next';
import './globals.css';
import { AppShell } from '@/components/layout/app-shell';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/hooks/use-theme';
import { PlanProvider } from '@/hooks/use-plan';
import { UserProvider } from '@/hooks/use-user';

export const metadata: Metadata = {
  title: 'MyLaunch MVP',
  description: 'Launch your projects, ideas, brands, or businesses — from your pocket.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider defaultTheme="light">
          <UserProvider>
            <PlanProvider>
              <AppShell>
                {children}
              </AppShell>
              <Toaster />
            </PlanProvider>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
