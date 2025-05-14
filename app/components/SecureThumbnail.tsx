'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface SecureThumbnailProps {
  thumbnailUrl: string;
  title: string;
}

export default function SecureThumbnail({ thumbnailUrl, title }: SecureThumbnailProps) {
  const [secureThumbnailUrl, setSecureThumbnailUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  
  // Use a ref to track the blob URL for cleanup
  const blobUrlRef = useRef<string | null>(null);
  
  // Load the thumbnail securely
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setError(false);
    
    // Clean up any existing blob URL
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
      blobUrlRef.current = null;
    }
    
    // Function to fetch and create a secure blob URL
    const fetchThumbnailSecurely = async () => {
      if (!thumbnailUrl) {
        if (isMounted) {
          setIsLoading(false);
          setError(true);
        }
        return;
      }
      
      try {
        // Create a blob URL from the original URL
        const blob = await fetch(thumbnailUrl).then(r => {
          if (!r.ok) throw new Error('Failed to fetch thumbnail');
          return r.blob();
        });
        
        if (!isMounted) return;
        
        const blobUrl = URL.createObjectURL(blob);
        blobUrlRef.current = blobUrl;
        setSecureThumbnailUrl(blobUrl);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching thumbnail:', error);
        if (isMounted) {
          setError(true);
          setIsLoading(false);
        }
      }
    };
    
    fetchThumbnailSecurely();
    
    // Cleanup when component unmounts or URL changes
    return () => {
      isMounted = false;
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = null;
      }
    };
  }, [thumbnailUrl]);
  
  if (isLoading) {
    return (
      <div className="w-full h-full bg-gray-800 flex items-center justify-center">
        <div className="w-full h-full bg-gray-700"></div>
      </div>
    );
  }
  
  if (error || !secureThumbnailUrl) {
    return (
      <div className="w-full h-full bg-gray-800 flex items-center justify-center">
        <span className="text-gray-400 text-xs">No image</span>
      </div>
    );
  }
  
  return (
    <Image
      src={secureThumbnailUrl}
      alt={title || 'Video thumbnail'}
      fill
      className="object-cover"
      unoptimized={true}
      onContextMenu={(e) => e.preventDefault()}
      draggable={false}
    />
  );
}
