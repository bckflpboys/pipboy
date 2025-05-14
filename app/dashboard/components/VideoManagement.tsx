'use client';

import { useState, useEffect } from 'react';
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
import VideoPlayer from '../../components/VideoPlayer';
import ResourceViewer from '../../components/ResourceViewer';
import type { Course, Chapter, Video, Resource } from '../../models/Course';

interface CourseCardProps {
  course: Course;
  onExpand: (courseId: string) => void;
  onChapterExpand: (chapterId: string) => void;
  onManageChapters: (courseId: string) => void;
  isExpanded: boolean;
  expandedChapterId: string | null;
  onVideoClick: (video: Video) => void;
  onResourceClick: (resource: Resource) => void;
}

interface ChapterCardProps {
  chapter: Chapter;
  onExpand: (chapterId: string) => void;
  isExpanded: boolean;
  onVideoClick: (video: Video) => void;
  onResourceClick: (resource: Resource) => void;
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

function CourseCard({ course, onExpand, onChapterExpand, onManageChapters, isExpanded, expandedChapterId, onVideoClick, onResourceClick }: CourseCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/50 backdrop-blur-lg border border-gray-800 rounded-lg overflow-hidden"
    >
      <div className="p-4">
        <div className="flex items-start gap-4">
          <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 border border-gray-800">
            {course.thumbnail && course.thumbnail.length > 0 ? (
              <Image
                src={course.thumbnail}
                alt={course.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                <span className="text-gray-400 text-xs">No image</span>
              </div>
            )}
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
              onVideoClick={onVideoClick}
              onResourceClick={onResourceClick}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

function ChapterCard({ chapter, onExpand, isExpanded, onVideoClick, onResourceClick }: ChapterCardProps) {
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
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-900/30 transition-colors group cursor-pointer"
                onClick={() => onVideoClick(video)}
              >
                <div className="relative w-20 h-12 rounded overflow-hidden flex-shrink-0 border border-gray-800">
                  {video.thumbnail && video.thumbnail.length > 0 ? (
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                      <span className="text-gray-400 text-xs">No image</span>
                    </div>
                  )}
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
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-900/30 transition-colors group cursor-pointer"
                  onClick={() => onResourceClick(resource)}
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
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering the parent onClick
                        // Handle edit resource
                      }}
                    >
                      <PencilIcon className="w-4 h-4" />
                    </button>
                    <button 
                      className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-gray-900/50 rounded-lg transition-colors"
                      title="Delete resource"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering the parent onClick
                        // Handle delete resource
                      }}
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
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('/api/courses');
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        const { courses: fetchedCourses } = await response.json();
        setCourses(fetchedCourses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (isLoading) {
    return (
      <div className="p-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const handleCourseExpand = (courseId: string) => {
    setExpandedCourseId(expandedCourseId === courseId ? null : courseId);
  };

  const handleChapterExpand = (chapterId: string) => {
    setExpandedChapterId(expandedChapterId === chapterId ? null : chapterId);
  };

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video);
  };

  const handleResourceClick = (resource: Resource) => {
    setSelectedResource(resource);
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
            onVideoClick={handleVideoClick}
            onResourceClick={handleResourceClick}
          />
        ))}
      </div>

      {isCreateModalOpen && (
        <CreateCourseForm
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={async (courseData) => {
            try {
              const response = await fetch('/api/courses', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(courseData),
              });

              if (!response.ok) {
                throw new Error('Failed to create course');
              }

              const newCourse = await response.json();
              setCourses(prev => [newCourse, ...prev]);
            } catch (error) {
              console.error('Error creating course:', error);
            }
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
          onSave={async (formData: FormData) => {
            try {
              const response = await fetch(`/api/courses/${selectedCourseId}/chapters`, {
                method: 'PUT',
                body: formData,
              });

              if (!response.ok) {
                throw new Error('Failed to update chapters');
              }

              const updatedCourse = await response.json();
              setCourses(prev => prev.map(course => 
                course.id === selectedCourseId ? updatedCourse : course
              ));
            } catch (error) {
              console.error('Error updating chapters:', error);
            }
          }}
        />
      )}

      {selectedVideo && (
        <VideoPlayer
          videoUrl={selectedVideo.url}
          title={selectedVideo.title}
          onClose={() => setSelectedVideo(null)}
          allowDownload={false} // Set default or add allowDownload to Video type
        />
      )}

      {selectedResource && (
        <ResourceViewer
          resourceUrl={selectedResource.url}
          title={selectedResource.title}
          onClose={() => setSelectedResource(null)}
          allowDownload={selectedResource.type === 'file'} // Allow download for file type resources
        />
      )}
    </div>
  );
}
