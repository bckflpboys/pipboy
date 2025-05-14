'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { XMarkIcon, PlayIcon, PauseIcon, SpeakerWaveIcon, SpeakerXMarkIcon, BackwardIcon, ForwardIcon, ArrowsPointingOutIcon, WindowIcon, ArrowDownTrayIcon } from '@heroicons/react/24/solid';

// Interface for VideoPlayerProps
interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  onClose: () => void;
  allowDownload?: boolean;
}

export default function VideoPlayer({ videoUrl, title, onClose, allowDownload = false }: VideoPlayerProps) {
  // Create a secure URL that hides the original source
  const [secureVideoUrl, setSecureVideoUrl] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize the secure video URL
  useEffect(() => {
    // Reset state when video URL changes
    setIsPlaying(false);
    setSecureVideoUrl('');
    
    // Use a proxy approach to hide the original URL
    const fetchVideoSecurely = async () => {
      try {
        // Create a temporary blob URL that will fetch the video without exposing the URL
        const response = await fetch(videoUrl, { method: 'HEAD' });
        if (response.ok) {
          // Create a blob URL from the original URL
          const blob = await fetch(videoUrl).then(r => r.blob());
          const blobUrl = URL.createObjectURL(blob);
          setSecureVideoUrl(blobUrl);
        } else {
          console.error('Video URL is not accessible');
        }
      } catch (error) {
        console.error('Error fetching video:', error);
      }
    };
    
    fetchVideoSecurely();
    
    // Clean up blob URLs when component unmounts or video changes
    return () => {
      // Stop any ongoing playback
      const video = videoRef.current;
      if (video) {
        video.pause();
      }
      
      // Revoke the blob URL
      if (secureVideoUrl && secureVideoUrl.startsWith('blob:')) {
        URL.revokeObjectURL(secureVideoUrl);
      }
    };
  }, [videoUrl]);  // Remove secureVideoUrl from dependencies to prevent loops

  useEffect(() => {
    // Only set up event listeners when the secure URL is available
    if (!secureVideoUrl) return;
    
    const video = videoRef.current;
    if (!video) return;

    // Reset progress and time when video changes
    setCurrentTime(0);
    setProgress(0);
    setDuration(0);

    const handleTimeUpdate = () => {
      if (video.duration) {
        setCurrentTime(video.currentTime);
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    const handleLoadedMetadata = () => {
      console.log('Video metadata loaded, duration:', video.duration);
      setDuration(video.duration);
    };
    
    const handleEnded = () => {
      setIsPlaying(false);
    };
    
    const handlePlay = () => {
      setIsPlaying(true);
    };
    
    const handlePause = () => {
      setIsPlaying(false);
    };

    // Capture the video reference for cleanup
    const videoElement = video;

    // Add event listeners
    videoElement.addEventListener('timeupdate', handleTimeUpdate);
    videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);
    videoElement.addEventListener('loadeddata', handleLoadedMetadata); // Additional event for better compatibility
    videoElement.addEventListener('durationchange', handleLoadedMetadata); // Catch duration changes
    videoElement.addEventListener('ended', handleEnded);
    videoElement.addEventListener('play', handlePlay);
    videoElement.addEventListener('pause', handlePause);

    // Force a metadata load
    if (videoElement.readyState >= 1) {
      handleLoadedMetadata();
    }

    return () => {
      // Remove event listeners using the captured reference
      videoElement.removeEventListener('timeupdate', handleTimeUpdate);
      videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
      videoElement.removeEventListener('loadeddata', handleLoadedMetadata);
      videoElement.removeEventListener('durationchange', handleLoadedMetadata);
      videoElement.removeEventListener('ended', handleEnded);
      videoElement.removeEventListener('play', handlePlay);
      videoElement.removeEventListener('pause', handlePause);
    };
  }, [secureVideoUrl]); // Add secureVideoUrl as a dependency to reset listeners when the video changes

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video || !secureVideoUrl) return;

    try {
      if (isPlaying) {
        video.pause();
      } else {
        // Use a promise to handle play errors
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              // Playback started successfully
              setIsPlaying(true);
            })
            .catch(error => {
              // Auto-play was prevented or another error occurred
              console.error('Play error:', error);
              setIsPlaying(false);
            });
        }
        return; // Don't update state yet - wait for the promise
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error('Toggle play error:', error);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };
  
  const skipBackward = () => {
    const video = videoRef.current;
    if (!video) return;
    
    const newTime = Math.max(0, video.currentTime - 10);
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };
  
  const skipForward = () => {
    const video = videoRef.current;
    if (!video) return;
    
    const newTime = Math.min(video.duration, video.currentTime + 10);
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };
  
  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;
    
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      // Use the container instead of just the video to include our controls
      container.requestFullscreen();
    }
  };
  
  const togglePictureInPicture = async () => {
    const video = videoRef.current;
    if (!video) return;
    
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else {
        await video.requestPictureInPicture();
      }
    } catch (error) {
      console.error('Picture-in-Picture failed:', error);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video || !duration) return;

    const seekTime = (parseInt(e.target.value) / 100) * duration;
    video.currentTime = seekTime;
    setCurrentTime(seekTime);
    
    // Update progress immediately for a responsive feel
    setProgress((seekTime / duration) * 100);
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-2 sm:p-4 md:p-6"
    >
      <div ref={containerRef} className="relative w-full max-w-5xl bg-black/90 rounded-lg overflow-hidden border border-gray-800 max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-2 sm:p-4 border-b border-gray-800">
          <h3 className="text-sm sm:text-base md:text-lg font-medium text-white truncate">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 sm:p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full transition-colors"
          >
            <XMarkIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        <div className="relative aspect-video bg-black flex-grow">
          {secureVideoUrl ? (
            <video
              ref={videoRef}
              src={secureVideoUrl}
              className="w-full h-full"
              onClick={togglePlay}
              playsInline
              controlsList="nodownload"
              // Disable default controls to use our custom controls in fullscreen
              controls={false}
              // Prevent right-click context menu to disable "Save Video As..." option
              onContextMenu={(e) => e.preventDefault()}
              // Disable dragging the video to prevent drag-and-drop saving
              draggable={false}
              // Add crossOrigin attribute to prevent CORS issues with blob URLs
              crossOrigin="anonymous"
              // Add preload attribute to ensure video is ready before playing
              preload="auto"
              // Handle loading errors
              onError={(e) => console.error('Video loading error:', e)}
              // Force the video to load metadata as soon as possible
              onLoadedMetadata={(e) => {
                const video = e.currentTarget;
                if (video && video.duration) {
                  setDuration(video.duration);
                }
              }}
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-black">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}
          
          {!isPlaying && secureVideoUrl && (
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={togglePlay}
                className="p-2 sm:p-3 md:p-4 bg-blue-500/80 hover:bg-blue-600/80 rounded-full transition-colors"
              >
                <PlayIcon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
              </button>
            </div>
          )}
        </div>

        <div className="p-2 sm:p-3 md:p-4 space-y-2 sm:space-y-3">
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={skipBackward}
              className="p-1 sm:p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-full transition-colors"
              title="Back 10 seconds"
            >
              <BackwardIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            
            <button
              onClick={togglePlay}
              className="p-1 sm:p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-full transition-colors"
            >
              {isPlaying ? (
                <PauseIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <PlayIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>
            
            <button
              onClick={skipForward}
              className="p-1 sm:p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-full transition-colors"
              title="Forward 10 seconds"
            >
              <ForwardIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            
            <button
              onClick={toggleMute}
              className="p-1 sm:p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-full transition-colors"
            >
              {isMuted ? (
                <SpeakerXMarkIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <SpeakerWaveIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>
            
            <span className="text-xs text-gray-400 ml-1">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
            
            <div className="ml-auto flex items-center gap-1 sm:gap-2">
              {allowDownload && (
                <button
                  onClick={() => {
                    if (allowDownload) {
                      // For authorized downloads, use the original URL
                      // This requires server-side authentication to work properly
                      const a = document.createElement('a');
                      a.href = videoUrl;
                      a.download = title || 'video';
                      a.target = '_blank'; // Open in new tab
                      a.rel = 'noopener noreferrer';
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                    }
                  }}
                  className="p-1 sm:p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-full transition-colors"
                  title="Download video"
                >
                  <ArrowDownTrayIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              )}
              <button
                onClick={togglePictureInPicture}
                className="p-1 sm:p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-full transition-colors"
                title="Picture-in-Picture"
              >
                <WindowIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={toggleFullscreen}
                className="p-1 sm:p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-full transition-colors"
                title="Fullscreen"
              >
                <ArrowsPointingOutIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
          
          <div className="relative w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleSeek}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div
              className="h-full bg-blue-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
