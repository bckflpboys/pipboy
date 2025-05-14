'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  XMarkIcon,
  ArrowUpTrayIcon,
  PlusIcon,
  DocumentArrowUpIcon,
  LinkIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import type { Chapter, Resource } from '../../models/Course';

interface ChapterManagerProps {
  courseId: string;
  onClose: () => void;
  onSave: (formData: FormData) => Promise<void>;
  initialChapters?: Chapter[];
}

interface VideoUpload {
  file: File;
  previewUrl: string;
  thumbnailFile?: File;
  title: string;
  description: string;
  duration?: string;
}

interface ResourceUpload {
  file?: File;
  title: string;
  type: Resource['type'];
  url: string;
  size?: string;
}

export default function ChapterManager({ onClose, onSave, initialChapters = [] }: ChapterManagerProps) {
  const [chapters, setChapters] = useState<(Omit<Chapter, 'id'> & { id?: string })[]>(
    initialChapters.length > 0 ? initialChapters : [{ 
      title: '', 
      description: '', 
      videos: [], 
      resources: [],
      order: 1 
    }]
  );
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [videoUploads, setVideoUploads] = useState<Record<number, VideoUpload[]>>({});
  const [resourceUploads, setResourceUploads] = useState<Record<number, ResourceUpload[]>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const extractVideoDuration = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      // Create a temporary video element to get duration
      const video = document.createElement('video');
      video.preload = 'metadata';
      
      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        const duration = video.duration;
        
        // Format duration as mm:ss or hh:mm:ss
        const hours = Math.floor(duration / 3600);
        const minutes = Math.floor((duration % 3600) / 60);
        const seconds = Math.floor(duration % 60);
        
        let formattedDuration = '';
        if (hours > 0) {
          formattedDuration = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        } else {
          formattedDuration = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
        
        resolve(formattedDuration);
      };
      
      // Handle errors by providing a default duration
      video.onerror = () => {
        console.error('Error getting video duration');
        resolve('00:00');
      };
      
      video.src = URL.createObjectURL(file);
    });
  };

  const handleVideoFileChange = async (e: React.ChangeEvent<HTMLInputElement>, chapterIndex: number) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const previewUrl = URL.createObjectURL(file);
    const duration = await extractVideoDuration(file);

    const videoUpload: VideoUpload = {
      file,
      previewUrl,
      title: file.name.replace(/\.[^/.]+$/, ""), // Remove extension
      description: '',
      duration
    };

    setVideoUploads(prev => ({
      ...prev,
      [chapterIndex]: [...(prev[chapterIndex] || []), videoUpload]
    }));
  };

  const handleResourceFileChange = (e: React.ChangeEvent<HTMLInputElement>, chapterIndex: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const resourceUpload: ResourceUpload = {
      file,
      title: file.name,
      type: 'file',
      url: '',
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`
    };

    setResourceUploads(prev => ({
      ...prev,
      [chapterIndex]: [...(prev[chapterIndex] || []), resourceUpload]
    }));
  };

  const addChapter = () => {
    setChapters(prev => [
      ...prev,
      {
        title: '',
        description: '',
        videos: [],
        resources: [],
        order: prev.length + 1
      }
    ]);
  };

  const updateChapter = (index: number, data: Partial<Chapter>) => {
    setChapters(prev => prev.map((chapter, i) => 
      i === index ? { ...chapter, ...data } : chapter
    ));
  };

  const removeChapter = (index: number) => {
    setChapters(prev => prev.filter((_, i) => i !== index));
    setActiveChapterIndex(prev => Math.max(0, prev - 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      
      // Add chapter data and files
      const chaptersData = chapters.map((chapter, index) => {
        const chapterVideos = (videoUploads[index] || []).map((upload, vIndex) => {
          // Add video file to formData
          formData.append(`video_${index}_${vIndex}`, upload.file);
          
          // Add thumbnail file to formData if it exists
          if (upload.thumbnailFile) {
            formData.append(`thumbnail_${index}_${vIndex}`, upload.thumbnailFile);
          }

          return {
            id: `video-${Date.now()}-${vIndex}`,
            title: upload.title,
            description: upload.description,
            file: `video_${index}_${vIndex}`, // Reference to the file in formData
            thumbnailFile: upload.thumbnailFile ? `thumbnail_${index}_${vIndex}` : undefined,
            url: undefined, // Will be set by the API after upload
            thumbnail: upload.previewUrl, // Current preview, will be replaced by API
            duration: upload.duration || '00:00',
            order: vIndex + 1
          };
        });

        const chapterResources = (resourceUploads[index] || []).map((upload, rIndex) => {
          // Add resource file to formData if it's a file type
          if (upload.type === 'file' && upload.file instanceof File) {
            formData.append(`resource_${index}_${rIndex}`, upload.file);
          }

          return {
            id: `resource-${Date.now()}-${rIndex}`,
            title: upload.title,
            type: upload.type,
            file: upload.file ? `resource_${index}_${rIndex}` : undefined,
            url: upload.type === 'link' ? upload.url : undefined, // Only keep URL for link type
            size: upload.size
          };
        });

        return {
          id: chapter.id || `chapter-${Date.now()}-${index}`,
          title: chapter.title,
          description: chapter.description,
          videos: [...(chapter.videos || []), ...chapterVideos],
          resources: [...(chapter.resources || []), ...chapterResources],
          order: chapter.order
        };
      });

      // Add chapters data to formData
      formData.append('chaptersData', JSON.stringify(chaptersData));

      await onSave(formData);
      onClose();
    } catch (error) {
      console.error('Error saving chapters:', error);
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
        className="bg-gray-900 rounded-lg w-full max-w-4xl overflow-hidden max-h-[90vh] flex flex-col"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className="text-lg font-semibold text-white">Manage Chapters</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-hidden flex">
          {/* Chapter List Sidebar */}
          <div className="w-64 border-r border-gray-800 overflow-y-auto p-4">
            <button
              onClick={addChapter}
              className="w-full flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors mb-4"
            >
              <PlusIcon className="w-5 h-5" />
              Add Chapter
            </button>

            <div className="space-y-2">
              {chapters.map((chapter, index) => (
                <button
                  key={index}
                  onClick={() => setActiveChapterIndex(index)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    activeChapterIndex === index
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <div className="font-medium truncate">
                    {chapter.title || `Chapter ${index + 1}`}
                  </div>
                  <div className="text-sm opacity-75 truncate">
                    {(videoUploads[index]?.length || 0) + (chapter.videos?.length || 0)} videos
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chapter Content */}
          <div className="flex-1 overflow-y-auto p-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-4 flex-1">
                  <input
                    type="text"
                    value={chapters[activeChapterIndex]?.title || ''}
                    onChange={e => updateChapter(activeChapterIndex, { title: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Chapter Title"
                    required
                  />
                  <textarea
                    value={chapters[activeChapterIndex]?.description || ''}
                    onChange={e => updateChapter(activeChapterIndex, { description: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Chapter Description"
                    rows={2}
                    required
                  />
                </div>
                {chapters.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeChapter(activeChapterIndex)}
                    className="ml-4 p-2 text-red-500 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Videos Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-white">Videos</h3>
                  <label className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors cursor-pointer">
                    <ArrowUpTrayIcon className="w-5 h-5" />
                    Upload Video
                    <input
                      type="file"
                      accept="video/*"
                      className="hidden"
                      onChange={e => handleVideoFileChange(e, activeChapterIndex)}
                    />
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Existing Videos */}
                  {chapters[activeChapterIndex]?.videos?.map((video) => (
                    <div
                      key={video.id}
                      className="bg-gray-800/50 rounded-lg overflow-hidden"
                    >
                      <div className="relative aspect-video">
                        {video.thumbnail && video.thumbnail.length > 0 ? (
                          <Image
                            src={video.thumbnail}
                            alt={video.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                            <span className="text-gray-400 text-xs">No thumbnail</span>
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        <h4 className="font-medium text-white truncate">{video.title}</h4>
                        <p className="text-sm text-gray-400">{video.duration}</p>
                      </div>
                    </div>
                  ))}

                  {/* New Video Uploads */}
                  {videoUploads[activeChapterIndex]?.map((upload, index) => (
                    <div
                      key={index}
                      className="bg-gray-800/50 rounded-lg overflow-hidden"
                    >
                      <div className="relative aspect-video">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={upload.previewUrl}
                          alt={upload.title}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-3 space-y-2">
                        <input
                          type="text"
                          value={upload.title}
                          onChange={e => {
                            const newUploads = [...(videoUploads[activeChapterIndex] || [])];
                            newUploads[index] = { ...upload, title: e.target.value };
                            setVideoUploads({ ...videoUploads, [activeChapterIndex]: newUploads });
                          }}
                          className="w-full px-2 py-1 bg-gray-700 rounded text-white text-sm"
                          placeholder="Video Title"
                        />
                        <input
                          type="text"
                          value={upload.description}
                          onChange={e => {
                            const newUploads = [...(videoUploads[activeChapterIndex] || [])];
                            newUploads[index] = { ...upload, description: e.target.value };
                            setVideoUploads({ ...videoUploads, [activeChapterIndex]: newUploads });
                          }}
                          className="w-full px-2 py-1 bg-gray-700 rounded text-white text-sm"
                          placeholder="Video Description"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resources Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-white">Resources</h3>
                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors cursor-pointer">
                      <DocumentArrowUpIcon className="w-5 h-5" />
                      Upload File
                      <input
                        type="file"
                        className="hidden"
                        onChange={e => handleResourceFileChange(e, activeChapterIndex)}
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        const newResource: ResourceUpload = {
                          title: '',
                          type: 'link',
                          url: ''
                        };
                        setResourceUploads(prev => ({
                          ...prev,
                          [activeChapterIndex]: [...(prev[activeChapterIndex] || []), newResource]
                        }));
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      <LinkIcon className="w-5 h-5" />
                      Add Link
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  {/* Existing Resources */}
                  {chapters[activeChapterIndex]?.resources?.map((resource) => (
                    <div
                      key={resource.id}
                      className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg"
                    >
                      {resource.type === 'pdf' && <DocumentArrowUpIcon className="w-5 h-5 text-red-500" />}
                      {resource.type === 'link' && <LinkIcon className="w-5 h-5 text-blue-500" />}
                      {resource.type === 'file' && <DocumentArrowUpIcon className="w-5 h-5 text-gray-400" />}
                      <div className="flex-1">
                        <h4 className="font-medium text-white">{resource.title}</h4>
                        {resource.size && (
                          <p className="text-sm text-gray-400">{resource.size}</p>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* New Resource Uploads */}
                  {resourceUploads[activeChapterIndex]?.map((resource, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg"
                    >
                      {resource.type === 'pdf' && <DocumentArrowUpIcon className="w-5 h-5 text-red-500" />}
                      {resource.type === 'link' && <LinkIcon className="w-5 h-5 text-blue-500" />}
                      {resource.type === 'file' && <DocumentArrowUpIcon className="w-5 h-5 text-gray-400" />}
                      <div className="flex-1 space-y-2">
                        <input
                          type="text"
                          value={resource.title}
                          onChange={e => {
                            const newResources = [...(resourceUploads[activeChapterIndex] || [])];
                            newResources[index] = { ...resource, title: e.target.value };
                            setResourceUploads({ ...resourceUploads, [activeChapterIndex]: newResources });
                          }}
                          className="w-full px-2 py-1 bg-gray-700 rounded text-white text-sm"
                          placeholder="Resource Title"
                        />
                        {resource.type === 'link' && (
                          <input
                            type="url"
                            value={resource.url}
                            onChange={e => {
                              const newResources = [...(resourceUploads[activeChapterIndex] || [])];
                              newResources[index] = { ...resource, url: e.target.value };
                              setResourceUploads({ ...resourceUploads, [activeChapterIndex]: newResources });
                            }}
                            className="w-full px-2 py-1 bg-gray-700 rounded text-white text-sm"
                            placeholder="Resource URL"
                          />
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const newResources = (resourceUploads[activeChapterIndex] || []).filter((_, i) => i !== index);
                          setResourceUploads({ ...resourceUploads, [activeChapterIndex]: newResources });
                        }}
                        className="p-2 text-red-500 hover:text-red-400 hover:bg-gray-700 rounded transition-colors"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 p-4 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <ArrowUpTrayIcon className="w-5 h-5 animate-bounce" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
