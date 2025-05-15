"use client";


import ClientWrapper from '@/components/ClientWrapper';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
// Note: This component must be wrapped in a Suspense boundary when used

function AccessDeniedHandlerInner() {
  const searchParams = useSearchParams();
  
  useEffect(() => {
    // Check if there's an access denied message in the URL
    const message = searchParams.get('message');
    if (message) {
      // Display the message as an error toast
      toast.error(message, {
        duration: 5000,
        id: 'access-denied-toast' // Prevent duplicate toasts
      });
    }
  }, [searchParams]);

  // This component doesn't render anything visible
  return null;
}


// Export with ClientWrapper for navigation hooks
export default function AccessDeniedHandler() {
  return (
    <ClientWrapper>
      <AccessDeniedHandlerInner />
    </ClientWrapper>
  );
}
