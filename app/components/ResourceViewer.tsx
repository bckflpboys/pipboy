import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { XMarkIcon, ArrowDownTrayIcon, ArrowsPointingOutIcon, ArrowsPointingInIcon, MagnifyingGlassMinusIcon, MagnifyingGlassPlusIcon } from '@heroicons/react/24/solid';

// Define the supported file types
type ResourceType = 'image' | 'pdf' | 'doc' | 'unknown';

// Props interface for the ResourceViewer component
interface ResourceViewerProps {
  resourceUrl: string;
  title: string;
  onClose: () => void;
  allowDownload?: boolean;
}

export default function ResourceViewer({ resourceUrl, title, onClose, allowDownload = false }: ResourceViewerProps) {
  // State for the secure URL that hides the original source
  const [secureResourceUrl, setSecureResourceUrl] = useState<string>('');
  const [resourceType, setResourceType] = useState<ResourceType>('unknown');
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [scale, setScale] = useState(1.0);
  
  // Ref for container element and to track blob URLs for cleanup
  const containerRef = useRef<HTMLDivElement>(null);
  const blobUrlRef = useRef<string | null>(null);

  // Determine resource type based on file extension
  const getResourceType = useCallback((url: string): ResourceType => {
    const extension = url.split('.').pop()?.toLowerCase();
    
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(extension || '')) {
      return 'image';
    } else if (extension === 'pdf') {
      return 'pdf';
    } else if (['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes(extension || '')) {
      return 'doc';
    }
    
    return 'unknown';
  }, []);
  
  // Clean up any existing blob URLs
  const cleanupBlobUrl = useCallback(() => {
    if (blobUrlRef.current && blobUrlRef.current.startsWith('blob:')) {
      URL.revokeObjectURL(blobUrlRef.current);
      blobUrlRef.current = null;
    }
  }, []);
  
  // Load the resource securely
  const loadResource = useCallback(async () => {
    // Reset state
    setIsLoading(true);
    cleanupBlobUrl();
    
    // Determine resource type
    const type = getResourceType(resourceUrl);
    setResourceType(type);
    
    try {
      // Check if resource is accessible
      const response = await fetch(resourceUrl, { method: 'HEAD' });
      
      if (!response.ok) {
        console.error('Resource URL is not accessible');
        setIsLoading(false);
        return;
      }
      
      // Create blob URL for images and PDFs
      if (type === 'image' || type === 'pdf') {
        const blob = await fetch(resourceUrl).then(r => r.blob());
        const blobUrl = URL.createObjectURL(blob);
        
        // Store in ref for cleanup
        blobUrlRef.current = blobUrl;
        setSecureResourceUrl(blobUrl);
      } else {
        // For other types, use original URL
        setSecureResourceUrl(resourceUrl);
      }
    } catch (error) {
      console.error('Error loading resource:', error);
    } finally {
      setIsLoading(false);
    }
  }, [resourceUrl, getResourceType, cleanupBlobUrl]);
  
  // Load resource when component mounts or URL changes
  useEffect(() => {
    loadResource();
    
    // Cleanup when component unmounts
    return () => {
      cleanupBlobUrl();
    };
  }, [resourceUrl, loadResource, cleanupBlobUrl]);

  // Handle fullscreen mode
  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;
    
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullscreen(false);
    } else {
      container.requestFullscreen();
      setIsFullscreen(true);
    }
  };

  // Handle document download
  const handleDownload = () => {
    if (!secureResourceUrl) return;
    
    const link = document.createElement('a');
    link.href = secureResourceUrl;
    link.download = title || 'download';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };



  // Zoom in (increase scale)
  const zoomIn = () => {
    setScale(Math.min(scale + 0.2, 3.0));
  };

  // Zoom out (decrease scale)
  const zoomOut = () => {
    setScale(Math.max(scale - 0.2, 0.5));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4"
    >
      <div 
        ref={containerRef}
        className="relative bg-white rounded-lg overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col"
      >
        {/* Header with title and close button */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold truncate">{title}</h3>
          <div className="flex items-center space-x-2">
            {allowDownload && (
              <button
                onClick={handleDownload}
                className="p-1 rounded-full hover:bg-gray-100"
                title="Download"
              >
                <ArrowDownTrayIcon className="w-5 h-5 text-gray-700" />
              </button>
            )}
            <button
              onClick={toggleFullscreen}
              className="p-1 rounded-full hover:bg-gray-100"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? (
                <ArrowsPointingInIcon className="w-5 h-5 text-gray-700" />
              ) : (
                <ArrowsPointingOutIcon className="w-5 h-5 text-gray-700" />
              )}
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100"
              title="Close"
            >
              <XMarkIcon className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
        
        {/* Resource content area */}
        <div className="flex-1 overflow-auto relative">
          {isLoading ? (
            <div className="flex items-center justify-center h-full bg-gray-100">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              {resourceType === 'image' && secureResourceUrl && secureResourceUrl.length > 0 && (
                <div className="flex items-center justify-center h-full p-4">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <div 
                      style={{ transform: `scale(${scale})` }}
                      className="relative max-w-full max-h-full transition-transform duration-200"
                    >
                      <Image
                        src={secureResourceUrl}
                        alt={title || 'Resource image'}
                        width={800}
                        height={600}
                        className="max-w-full max-h-full object-contain"
                        // Prevent right-click context menu
                        onContextMenu={(e) => e.preventDefault()}
                        // Disable dragging the image
                        draggable={false}
                        unoptimized={true} // Use unoptimized for blob URLs
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {resourceType === 'pdf' && secureResourceUrl && (
                <div className="flex flex-col items-center justify-center h-full">
                  <iframe
                    src={secureResourceUrl}
                    className="w-full h-full border-0"
                    title={title}
                  />
                </div>
              )}
              
              {resourceType === 'doc' && (
                <div className="flex items-center justify-center h-full p-4">
                  <iframe
                    src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(resourceUrl)}`}
                    width="100%"
                    height="100%"
                    className="border-0"
                    title={title}
                  />
                </div>
              )}
              
              {resourceType === 'unknown' && (
                <div className="flex items-center justify-center h-full p-4">
                  <div className="text-center">
                    <p className="text-gray-600 mb-2">Unsupported file type</p>
                    {allowDownload && (
                      <button
                        onClick={handleDownload}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Download File
                      </button>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        
        {/* Controls for PDF documents */}
        {resourceType === 'pdf' && !isLoading && (
          <div className="flex items-center justify-center p-4 border-t">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">PDF Viewer</span>
            </div>
          </div>
        )}
        
        {/* Controls for images */}
        {resourceType === 'image' && !isLoading && (
          <div className="flex items-center justify-center p-4 border-t">
            <div className="flex items-center space-x-2">
              <button
                onClick={zoomOut}
                disabled={scale <= 0.5}
                className={`p-2 rounded-full ${scale <= 0.5 ? 'bg-gray-200 text-gray-500' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                title="Zoom out"
              >
                <MagnifyingGlassMinusIcon className="w-5 h-5" />
              </button>
              <span className="mx-2">{Math.round(scale * 100)}%</span>
              <button
                onClick={zoomIn}
                disabled={scale >= 3.0}
                className={`p-2 rounded-full ${scale >= 3.0 ? 'bg-gray-200 text-gray-500' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                title="Zoom in"
              >
                <MagnifyingGlassPlusIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
