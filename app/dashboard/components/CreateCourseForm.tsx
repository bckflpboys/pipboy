'use client';

import { useState } from 'react';
import type { Course, Video, Resource } from '../../models/Course';
import { motion } from 'framer-motion';
import {
  XMarkIcon,
  PhotoIcon,
  ArrowUpTrayIcon,
} from '@heroicons/react/24/outline';

interface CreateCourseFormProps {
  onClose: () => void;
  onSubmit: (course: Omit<Course, 'id' | 'chapters' | 'totalVideos' | 'totalDuration'>) => void;
  existingCourse?: Course; // Optional existing course for editing mode
}

export default function CreateCourseForm({ onClose, onSubmit, existingCourse }: CreateCourseFormProps) {
  // Determine if we're in edit mode
  const isEditMode = !!existingCourse;
  interface VideoUpload extends Omit<Video, 'id'> {
    file?: File;
  }

  interface ResourceUpload extends Omit<Resource, 'id'> {
    file?: File;
  }

  interface ChapterUpload {
    title: string;
    description: string;
    order: number;
    videos: VideoUpload[];
    resources: ResourceUpload[];
  }

  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    thumbnail: string;
    status: Course['status'];
    chapters: ChapterUpload[];
  }>({
    title: existingCourse?.title || '',
    description: existingCourse?.description || '',
    thumbnail: existingCourse?.thumbnail || '',
    status: existingCourse?.status || 'draft' as Course['status'],
    chapters: existingCourse?.chapters?.length ? existingCourse.chapters.map(chapter => ({
      title: chapter.title,
      description: chapter.description,
      order: chapter.order,
      videos: chapter.videos.map(video => ({
        title: video.title,
        description: video.description,
        url: video.url,
        thumbnail: video.thumbnail,
        duration: video.duration,
        order: video.order
      })),
      resources: chapter.resources.map(resource => ({
        title: resource.title,
        type: resource.type,
        url: resource.url,
        size: resource.size
      }))
    })) : [{
      title: 'Chapter 1',
      description: '',
      videos: [],
      resources: [],
      order: 1
    }]
  });
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setThumbnailFile(file);
    // Create a preview URL
    const previewUrl = URL.createObjectURL(file);
    setFormData(prev => ({ ...prev, thumbnail: previewUrl }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare course data
      const courseData = {
        title: formData.title,
        description: formData.description,
        status: formData.status,
        thumbnail: formData.thumbnail,
        createdAt: existingCourse?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // If we're in edit mode, we'll use the onSubmit callback directly
      // The parent component (VideoManagement) will handle the API call
      if (isEditMode) {
        await onSubmit(courseData);
        onClose();
        return;
      }

      // For new courses, we'll handle the API call here
      const form = new FormData();
      
      // Add course data with files for new course
      const newCourseData = {
        ...courseData,
        chapters: formData.chapters.map(chapter => ({
          ...chapter,
          videos: chapter.videos.map(video => ({
            title: video.title,
            description: video.description,
            duration: video.duration,
            order: video.order,
            file: video.file // This will be handled by the API
          })),
          resources: chapter.resources.map(resource => ({
            title: resource.title,
            type: resource.type,
            file: resource.file // This will be handled by the API
          }))
        })),
        createdAt: new Date().toISOString()
      };
      form.append('courseData', JSON.stringify(newCourseData));

      // Add thumbnail
      if (thumbnailFile) {
        form.append('thumbnail', thumbnailFile);
      }

      // Send to API
      const response = await fetch('/api/courses', {
        method: 'POST',
        body: form
      });

      if (!response.ok) {
        throw new Error('Failed to create course');
      }

      const { course } = await response.json();
      await onSubmit(course);

      onClose();
    } catch (error) {
      console.error(`Error ${isEditMode ? 'updating' : 'creating'} course:`, error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className="bg-gray-900 rounded-lg w-full max-w-lg overflow-hidden"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className="text-lg font-semibold text-white">{isEditMode ? 'Edit Course' : 'Create New Course'}</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-400 mb-1">
              Course Title
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter course title"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-400 mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
              placeholder="Enter course description"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Thumbnail
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-700 border-dashed rounded-lg">
              {formData.thumbnail ? (
                <div className="relative w-full aspect-video">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={formData.thumbnail}
                    alt="Course thumbnail"
                    className="rounded-lg object-cover w-full h-full"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({ ...prev, thumbnail: '' }));
                      setThumbnailFile(null);
                    }}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <XMarkIcon className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="space-y-1 text-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-400">
                    <label htmlFor="thumbnail" className="relative cursor-pointer rounded-md font-medium text-blue-500 hover:text-blue-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                      <span>Upload a file</span>
                      <input
                        id="thumbnail"
                        name="thumbnail"
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={handleThumbnailChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-400 mb-1">
              Status
            </label>
            <select
              id="status"
              value={formData.status}
              onChange={e => setFormData(prev => ({ ...prev, status: e.target.value as Course['status'] }))}
              className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <ArrowUpTrayIcon className="w-5 h-5 animate-bounce" />
                  {isEditMode ? 'Saving...' : 'Creating...'}
                </>
              ) : (
                isEditMode ? 'Save Changes' : 'Create Course'
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
