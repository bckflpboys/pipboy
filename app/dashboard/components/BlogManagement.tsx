'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  TagIcon,
  CalendarIcon,
  UserIcon,
  EllipsisVerticalIcon,
} from '@heroicons/react/24/outline';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  tags: string[];
  publishedAt: string;
  status: 'draft' | 'published';
}

export default function BlogManagement() {
  const [isCreating, setIsCreating] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [posts] = useState<BlogPost[]>([
    {
      id: '1',
      title: 'Getting Started with Web Development',
      excerpt: 'Learn the fundamentals of web development and start your journey...',
      content: 'Full content here...',
      author: 'John Doe',
      tags: ['Web Development', 'Beginners'],
      publishedAt: '2024-04-28',
      status: 'published',
    },
    // Add more dummy posts as needed
  ]);

  const toggleMenu = (postId: string) => {
    setActiveMenu(activeMenu === postId ? null : postId);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <h1 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-600">
          Blog Management
        </h1>
        <button
          onClick={() => setIsCreating(true)}
          className="w-full sm:w-auto group relative flex justify-center rounded-lg bg-blue-600 px-3 py-2 sm:px-4 sm:py-3 text-sm font-semibold text-white hover:bg-blue-500 transition-all duration-200"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Create Post
        </button>
      </div>

      {/* Blog Post Editor (shown when creating/editing) */}
      {isCreating && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/50 backdrop-blur-lg border border-gray-800 rounded-lg p-4 sm:p-6"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Title
              </label>
              <input
                type="text"
                className="w-full bg-gray-900/50 border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                placeholder="Enter post title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Excerpt
              </label>
              <textarea
                className="w-full bg-gray-900/50 border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                rows={2}
                placeholder="Brief description of the post"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Content
              </label>
              <textarea
                className="w-full bg-gray-900/50 border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                rows={10}
                placeholder="Write your post content here..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tags
              </label>
              <input
                type="text"
                className="w-full bg-gray-900/50 border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                placeholder="Enter tags separated by commas"
              />
            </div>
            <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
              <button
                onClick={() => setIsCreating(false)}
                className="w-full sm:w-auto order-3 sm:order-1 px-4 py-2 text-sm font-medium text-gray-400 hover:text-white bg-gray-900/50 rounded-lg hover:bg-gray-800/50"
              >
                Cancel
              </button>
              <button className="w-full sm:w-auto order-2 px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors">
                Save as Draft
              </button>
              <button className="w-full sm:w-auto order-1 sm:order-3 px-4 py-2 text-sm font-medium bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors">
                Publish
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Blog Posts List */}
      <div className="grid gap-4 sm:gap-6">
        {posts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/50 backdrop-blur-lg border border-gray-800 rounded-lg p-4 sm:p-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              <div className="flex-1 space-y-2 sm:space-y-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-medium text-white">
                    {post.title}
                  </h3>
                  
                  {/* Desktop Actions */}
                  <div className="hidden sm:flex items-start gap-2">
                    <button 
                      className="p-2 text-gray-400 hover:text-white hover:bg-gray-900/50 rounded-lg transition-colors"
                      title="Edit post"
                    >
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button 
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-gray-900/50 rounded-lg transition-colors"
                      title="Delete post"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Mobile Actions */}
                  <div className="sm:hidden">
                    <button
                      onClick={() => toggleMenu(post.id)}
                      className="p-2 text-gray-400 hover:text-white hover:bg-gray-900/50 rounded-lg transition-colors"
                    >
                      <EllipsisVerticalIcon className="w-5 h-5" />
                    </button>

                    {activeMenu === post.id && (
                      <div className="absolute right-4 mt-2 w-48 rounded-lg bg-gray-900 shadow-lg ring-1 ring-gray-800 z-10">
                        <div className="py-1">
                          <button
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800"
                            onClick={() => {
                              // Handle edit
                              toggleMenu(post.id);
                            }}
                          >
                            <PencilIcon className="w-4 h-4" />
                            Edit post
                          </button>
                          <button
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-gray-800"
                            onClick={() => {
                              // Handle delete
                              toggleMenu(post.id);
                            }}
                          >
                            <TrashIcon className="w-4 h-4" />
                            Delete post
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-gray-400 text-sm">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <UserIcon className="w-4 h-4" />
                    <span className="truncate">{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="w-4 h-4" />
                    <span>{post.publishedAt}</span>
                  </div>
                  <div className="flex items-center gap-1 max-w-full">
                    <TagIcon className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{post.tags.join(', ')}</span>
                  </div>
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      post.status === 'published'
                        ? 'bg-green-500/10 text-green-500'
                        : 'bg-yellow-500/10 text-yellow-500'
                    }`}
                  >
                    {post.status}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
