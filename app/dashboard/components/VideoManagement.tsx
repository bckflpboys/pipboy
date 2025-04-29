'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  ArrowUpTrayIcon,
  EllipsisVerticalIcon,
} from '@heroicons/react/24/outline';

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  views: number;
  createdAt: string;
}

export default function VideoManagement() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [videos] = useState<Video[]>([
    // Dummy data for demonstration
    {
      id: '1',
      title: 'Getting Started with React',
      description: 'Learn the basics of React and build your first component',
      thumbnail: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2',
      duration: '10:30',
      views: 1234,
      createdAt: '2024-04-28',
    },
    // Add more dummy videos as needed
  ]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const toggleMenu = (videoId: string) => {
    setActiveMenu(activeMenu === videoId ? null : videoId);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <h1 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-600">
          Video Management
        </h1>
        <label className="w-full sm:w-auto group relative flex justify-center rounded-lg bg-blue-600 px-3 py-2 sm:px-4 sm:py-3 text-sm font-semibold text-white hover:bg-blue-500 cursor-pointer transition-all duration-200">
          <input
            type="file"
            accept="video/*"
            className="hidden"
            onChange={handleFileUpload}
          />
          <PlusIcon className="w-5 h-5 mr-2" />
          Upload Video
        </label>
      </div>

      {isUploading && (
        <div className="bg-black/50 backdrop-blur-lg border border-gray-800 rounded-lg p-4 sm:p-6">
          <div className="flex items-center gap-4 mb-4">
            <ArrowUpTrayIcon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 animate-bounce" />
            <div className="flex-1">
              <div className="h-2 bg-gray-900/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
            <span className="text-sm text-gray-400">{uploadProgress}%</span>
          </div>
        </div>
      )}

      <div className="grid gap-4 sm:gap-6">
        {videos.map((video) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/50 backdrop-blur-lg border border-gray-800 rounded-lg p-4 sm:p-6"
          >
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              {/* Thumbnail */}
              <div className="relative w-full sm:w-48 h-48 sm:h-32 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs">
                  {video.duration}
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">{video.title}</h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {video.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-gray-400">
                      <span>{video.views.toLocaleString()} views</span>
                      <span className="hidden sm:inline">•</span>
                      <span>Uploaded on {video.createdAt}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="relative">
                    {/* Desktop actions */}
                    <div className="hidden sm:flex flex-col gap-2">
                      <button 
                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-900/50 rounded-lg transition-colors"
                        title="Edit video"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                      <button 
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-gray-900/50 rounded-lg transition-colors"
                        title="Delete video"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Mobile actions */}
                    <div className="sm:hidden">
                      <button
                        onClick={() => toggleMenu(video.id)}
                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-900/50 rounded-lg transition-colors"
                      >
                        <EllipsisVerticalIcon className="w-5 h-5" />
                      </button>

                      {activeMenu === video.id && (
                        <div className="absolute right-0 mt-2 w-48 rounded-lg bg-gray-900 shadow-lg ring-1 ring-gray-800 z-10">
                          <div className="py-1">
                            <button
                              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800"
                              onClick={() => {
                                // Handle edit
                                toggleMenu(video.id);
                              }}
                            >
                              <PencilIcon className="w-4 h-4" />
                              Edit video
                            </button>
                            <button
                              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-gray-800"
                              onClick={() => {
                                // Handle delete
                                toggleMenu(video.id);
                              }}
                            >
                              <TrashIcon className="w-4 h-4" />
                              Delete video
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
