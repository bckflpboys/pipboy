"use client";

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

export default function AccessDeniedHandler() {
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
