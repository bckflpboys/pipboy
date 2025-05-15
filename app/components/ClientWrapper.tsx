"use client";

import { Suspense, ReactNode } from 'react';

/**
 * ClientWrapper component
 * 
 * This component wraps client components that use navigation hooks like 
 * useSearchParams, useRouter, or usePathname in a Suspense boundary.
 * 
 * In Next.js 15+, these hooks must be wrapped in Suspense to avoid
 * the "missing suspense with csr-bailout" error during static generation.
 */
export default function ClientWrapper({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={null}>
      {children}
    </Suspense>
  );
}
