"use client"

import { SessionProvider } from "next-auth/react"
import { Toaster } from 'sonner';
import { Suspense } from 'react';

// ClientComponentWrapper wraps client components that use navigation hooks
export function ClientComponentWrapper({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={null}>{children}</Suspense>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Suspense fallback={null}>
        {children}
      </Suspense>
      <Toaster richColors position="top-center" />
    </SessionProvider>
  );
}
