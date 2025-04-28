'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  PlayIcon,
  PauseIcon,
  ArrowDownTrayIcon,
  BookmarkIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  DocumentIcon,
  VideoCameraIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline';

interface Resource {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'link';
  url: string;
  size?: string;
}

interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  videoUrl: string;
  resources: Resource[];
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export default function ClassPage() {
  const { status } = useSession();
  const router = useRouter();
  const [activeModule, setActiveModule] = useState<string>('1');
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Protect the class route
  if (status === 'unauthenticated') {
    router.push('/auth/signin');
    return null;
  }

  const modules: Module[] = [
    {
      id: '1',
      title: 'Getting Started with Development',
      lessons: [
        {
          id: '1',
          title: 'Introduction to Web Development',
          duration: '10:30',
          completed: true,
          videoUrl: 'https://example.com/video1.mp4',
          resources: [
            {
              id: '1',
              title: 'Course Overview PDF',
              type: 'pdf',
              url: '/resources/overview.pdf',
              size: '2.4 MB',
            },
            {
              id: '2',
              title: 'Setup Guide',
              type: 'pdf',
              url: '/resources/setup.pdf',
              size: '1.8 MB',
            },
          ],
        },
        // Add more lessons
      ],
    },
    // Add more modules
  ];

  const handleLessonClick = (lesson: Lesson) => {
    setActiveLesson(lesson);
    setIsPlaying(true);
  };

  return (
    <div className="min-h-screen bg-black pt-16">
      <div className="relative">
        {/* Background gradient */}
        <div className="fixed inset-0 bg-gradient-to-b from-blue-900/20 via-black to-black -z-10" />

        {/* Main Content */}
        <div className="relative z-10">
          {/* Video Player Section */}
          <div className="w-full bg-black/80 backdrop-blur-lg border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {activeLesson ? (
                <div className="space-y-4">
                  <div className="aspect-video bg-gray-900 rounded-lg relative">
                    {/* Video Player Placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="p-4 rounded-full bg-blue-600 text-white hover:bg-blue-500 transition-colors"
                      >
                        {isPlaying ? (
                          <PauseIcon className="w-6 h-6" />
                        ) : (
                          <PlayIcon className="w-6 h-6" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h1 className="text-2xl font-bold text-white">
                        {activeLesson.title}
                      </h1>
                      <p className="text-gray-400">Duration: {activeLesson.duration}</p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors">
                      <BookmarkIcon className="w-5 h-5" />
                      Save for Later
                    </button>
                  </div>
                </div>
              ) : (
                <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
                  <p className="text-gray-400">Select a lesson to start learning</p>
                </div>
              )}
            </div>
          </div>

          {/* Course Content and Resources */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Course Content */}
              <div className="lg:col-span-2 space-y-6">
                <h2 className="text-xl font-bold text-white">Course Content</h2>
                <div className="space-y-4">
                  {modules.map((module) => (
                    <motion.div
                      key={module.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-black/50 backdrop-blur-lg border border-gray-800 rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() => setActiveModule(module.id)}
                        className="w-full flex items-center justify-between p-4 text-left"
                      >
                        <div className="flex items-center gap-2">
                          <AcademicCapIcon className="w-5 h-5 text-blue-500" />
                          <h3 className="text-white font-medium">{module.title}</h3>
                        </div>
                        <ChevronDownIcon
                          className={`w-5 h-5 text-gray-400 transition-transform ${
                            activeModule === module.id ? 'transform rotate-180' : ''
                          }`}
                        />
                      </button>
                      {activeModule === module.id && (
                        <div className="border-t border-gray-800">
                          {module.lessons.map((lesson) => (
                            <button
                              key={lesson.id}
                              onClick={() => handleLessonClick(lesson)}
                              className={`w-full flex items-center gap-4 p-4 text-left hover:bg-gray-900/50 transition-colors ${
                                activeLesson?.id === lesson.id
                                  ? 'bg-blue-600/10'
                                  : ''
                              }`}
                            >
                              <div className="flex-shrink-0">
                                {lesson.completed ? (
                                  <CheckCircleIcon className="w-5 h-5 text-green-500" />
                                ) : (
                                  <VideoCameraIcon className="w-5 h-5 text-gray-400" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-white truncate">{lesson.title}</p>
                                <p className="text-sm text-gray-400">
                                  {lesson.duration}
                                </p>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Resources */}
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white">Resources</h2>
                {activeLesson ? (
                  <div className="bg-black/50 backdrop-blur-lg border border-gray-800 rounded-lg p-6">
                    <div className="space-y-4">
                      {activeLesson.resources.map((resource) => (
                        <div
                          key={resource.id}
                          className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <DocumentIcon className="w-5 h-5 text-blue-500" />
                            <div>
                              <p className="text-white font-medium">
                                {resource.title}
                              </p>
                              {resource.size && (
                                <p className="text-sm text-gray-400">
                                  {resource.size}
                                </p>
                              )}
                            </div>
                          </div>
                          <a
                            href={resource.url}
                            download
                            className="p-2 text-gray-400 hover:text-white hover:bg-gray-900/50 rounded-lg transition-colors"
                          >
                            <ArrowDownTrayIcon className="w-5 h-5" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="bg-black/50 backdrop-blur-lg border border-gray-800 rounded-lg p-6">
                    <p className="text-gray-400">
                      Select a lesson to view its resources
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
