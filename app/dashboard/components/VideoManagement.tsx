'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  ArrowUpTrayIcon,
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

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-600">
          Video Management
        </h1>
        <label className="group relative flex justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-500 cursor-pointer transition-all duration-200">
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
        <div className="bg-black/50 backdrop-blur-lg border border-gray-800 rounded-lg p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <ArrowUpTrayIcon className="w-6 h-6 text-blue-500 animate-bounce" />
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

      <div className="grid gap-6">
        {videos.map((video) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/50 backdrop-blur-lg border border-gray-800 rounded-lg p-6 flex gap-6"
          >
            <div className="relative w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
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
            
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-medium text-white mb-2">{video.title}</h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {video.description}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>{video.views.toLocaleString()} views</span>
                <span>•</span>
                <span>Uploaded on {video.createdAt}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-900/50 rounded-lg transition-colors">
                <PencilIcon className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-gray-900/50 rounded-lg transition-colors">
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
