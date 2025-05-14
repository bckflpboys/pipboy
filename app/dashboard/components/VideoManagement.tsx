'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  DocumentIcon,
  LinkIcon,
  DocumentArrowDownIcon,
  PlayCircleIcon
} from '@heroicons/react/24/outline';
import CreateCourseForm from './CreateCourseForm';
import ChapterManager from './ChapterManager';
import type { Course, Chapter, Video, Resource } from '../../models/Course';

interface CourseCardProps {
  course: Course;
  onExpand: (courseId: string) => void;
  onChapterExpand: (chapterId: string) => void;
  onManageChapters: (courseId: string) => void;
  isExpanded: boolean;
  expandedChapterId: string | null;
}

interface ChapterCardProps {
  chapter: Chapter;
  onExpand: (chapterId: string) => void;
  isExpanded: boolean;
}

function ResourceIcon({ type }: { type: Resource['type'] }) {
  switch (type) {
    case 'pdf':
      return <DocumentIcon className="w-5 h-5" />;
    case 'link':
      return <LinkIcon className="w-5 h-5" />;
    case 'file':
      return <DocumentArrowDownIcon className="w-5 h-5" />;
  }
}

function CourseCard({ course, onExpand, onChapterExpand, onManageChapters, isExpanded, expandedChapterId }: CourseCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/50 backdrop-blur-lg border border-gray-800 rounded-lg overflow-hidden"
    >
      <div className="p-4">
        <div className="flex items-start gap-4">
          <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 border border-gray-800">
            <Image
              src={course.thumbnail}
              alt={course.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-white truncate">{course.title}</h3>
            <p className="text-sm text-gray-400 line-clamp-2 mt-1">{course.description}</p>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-sm text-gray-400">{course.totalVideos} videos</span>
              <span className="text-sm text-gray-400">{course.totalDuration}</span>
              <span className={`text-sm ${course.status === 'published' ? 'text-green-500' : 'text-yellow-500'}`}>
                {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onManageChapters(course.id)}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
              title="Manage Chapters"
            >
              <PencilIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => onExpand(course.id)}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
            >
              {isExpanded ? (
                <ChevronUpIcon className="w-5 h-5" />
              ) : (
                <ChevronDownIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {isExpanded && (
        <div className="border-t border-gray-800 divide-y divide-gray-800">
          {course.chapters.map((chapter) => (
            <ChapterCard
              key={chapter.id}
              chapter={chapter}
              onExpand={onChapterExpand}
              isExpanded={expandedChapterId === chapter.id}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

function ChapterCard({ chapter, onExpand, isExpanded }: ChapterCardProps) {
  return (
    <div className="bg-gray-900/30">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-white font-medium">{chapter.title}</h4>
            <p className="text-sm text-gray-400 mt-1">{chapter.description}</p>
          </div>
          <button
            onClick={() => onExpand(chapter.id)}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-900/50 rounded-lg transition-colors"
          >
            {isExpanded ? (
              <ChevronUpIcon className="w-5 h-5" />
            ) : (
              <ChevronDownIcon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
      
      {isExpanded && (
        <div className="px-4 pb-4">
          <div className="space-y-3">
            {chapter.videos.map((video: Video) => (
              <div 
                key={video.id}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-900/30 transition-colors group"
              >
                <div className="relative w-20 h-12 rounded overflow-hidden flex-shrink-0 border border-gray-800">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                    <PlayCircleIcon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="text-sm font-medium text-white truncate">{video.title}</h5>
                  <p className="text-xs text-gray-400 mt-0.5">{video.duration}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button 
                    className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-900/50 rounded-lg transition-colors"
                    title="Edit video"
                  >
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button 
                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-gray-900/50 rounded-lg transition-colors"
                    title="Delete video"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {chapter.resources.length > 0 && (
            <div className="mt-4">
              <h5 className="text-sm font-medium text-gray-400 mb-2">Resources</h5>
              <div className="space-y-2">
                {chapter.resources.map((resource: Resource) => (
                  <div 
                    key={resource.id}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-900/30 transition-colors"
                  >
                    <div className="p-2 bg-gray-900/50 rounded-lg">
                      <ResourceIcon type={resource.type} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h6 className="text-sm font-medium text-white truncate">{resource.title}</h6>
                      {resource.size && (
                        <p className="text-xs text-gray-400 mt-0.5">{resource.size}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <button 
                        className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-900/50 rounded-lg transition-colors"
                        title="Edit resource"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-gray-900/50 rounded-lg transition-colors"
                        title="Delete resource"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function VideoManagement() {
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>(null);
  const [expandedChapterId, setExpandedChapterId] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [isChapterManagerOpen, setIsChapterManagerOpen] = useState(false);
  const [courses, setCourses] = useState<Course[]>([
    {
      id: '1',
      title: 'Complete React Developer Course',
      description: 'Master React.js from the ground up. Learn hooks, context, Redux, and more with practical projects.',
      thumbnail: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2',
      totalVideos: 45,
      totalDuration: '12h 30m',
      createdAt: '2024-04-28',
      updatedAt: '2024-05-14',
      status: 'published',
      chapters: [
        {
          id: 'ch1',
          title: 'Introduction to React',
          description: 'Get started with React fundamentals',
          order: 1,
          videos: [
            {
              id: 'v1',
              title: 'What is React?',
              description: 'Introduction to React and its core concepts',
              url: 'https://example.com/video1.mp4',
              thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
              duration: '10:30',
              order: 1
            },
            {
              id: 'v2',
              title: 'Setting Up Your Environment',
              description: 'Configure your development environment',
              url: 'https://example.com/video2.mp4',
              thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
              duration: '15:45',
              order: 2
            }
          ],
          resources: [
            {
              id: 'r1',
              title: 'React Cheat Sheet',
              type: 'pdf',
              url: 'https://example.com/react-cheatsheet.pdf',
              size: '2.5 MB'
            },
            {
              id: 'r2',
              title: 'React Documentation',
              type: 'link',
              url: 'https://react.dev'
            }
          ]
        },
        {
          id: 'ch2',
          title: 'React Hooks',
          description: 'Deep dive into React Hooks',
          order: 2,
          videos: [
            {
              id: 'v3',
              title: 'useState Hook',
              description: 'Learn about state management with useState',
              url: 'https://example.com/video3.mp4',
              thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
              duration: '20:15',
              order: 1
            }
          ],
          resources: [
            {
              id: 'r3',
              title: 'Hooks Reference Guide',
              type: 'file',
              url: 'https://example.com/hooks-guide.zip',
              size: '1.8 MB'
            }
          ]
        }
      ]
    }
  ]);

  const handleCourseExpand = (courseId: string) => {
    setExpandedCourseId(expandedCourseId === courseId ? null : courseId);
  };

  const handleChapterExpand = (chapterId: string) => {
    setExpandedChapterId(expandedChapterId === chapterId ? null : chapterId);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-600">
          Course Management
        </h2>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <PlusIcon className="w-5 h-5" />
          New Course
        </button>
      </div>

      <div className="space-y-4">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onExpand={handleCourseExpand}
            onChapterExpand={handleChapterExpand}
            onManageChapters={(courseId) => {
              setSelectedCourseId(courseId);
              setIsChapterManagerOpen(true);
            }}
            isExpanded={expandedCourseId === course.id}
            expandedChapterId={expandedChapterId}
          />
        ))}
      </div>

      {isCreateModalOpen && (
        <CreateCourseForm
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={async (courseData) => {
            // Here you would typically make an API call to create the course
            // For now, we'll just add it to the local state
            const newCourse: Course = {
              ...courseData,
              id: `course-${Date.now()}`,
              chapters: [],
              totalVideos: 0,
              totalDuration: '0h 0m'
            };
            setCourses(prev => [newCourse, ...prev]);
          }}
        />
      )}

      {isChapterManagerOpen && selectedCourseId && (
        <ChapterManager
          courseId={selectedCourseId}
          initialChapters={courses.find(c => c.id === selectedCourseId)?.chapters}
          onClose={() => {
            setIsChapterManagerOpen(false);
            setSelectedCourseId(null);
          }}
          onSave={async (chapters: Chapter[]) => {
            // Here you would typically make an API call to update the course chapters
            // For now, we'll just update the local state
            setCourses(prev => prev.map(course => 
              course.id === selectedCourseId
                ? {
                    ...course,
                    chapters,
                    totalVideos: chapters.reduce((total: number, chapter: Chapter) => total + chapter.videos.length, 0),
                    totalDuration: chapters.reduce((total: number, chapter: Chapter) => {
                      const minutes = chapter.videos.reduce((totalMins: number, video) => {
                        const [mins, secs] = video.duration.split(':').map(Number);
                        return totalMins + mins + Math.floor(secs / 60);
                      }, 0);
                      return total + minutes;
                    }, 0) + 'm'
                  }
                : course
            ));
          }}
        />
      )}
    </div>
  );
}
