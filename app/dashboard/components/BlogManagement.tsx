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
  ClockIcon,
} from '@heroicons/react/24/outline';
import { BLOG_CATEGORIES, type BlogCategory } from '../../utils/constants';
import RichTextEditor from '../../components/RichTextEditor';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  tags: string[];
  publishedAt: string;
  status: 'draft' | 'published';
  coverArt?: string;
  category: BlogCategory;
  readTime?: number;
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
      coverArt: 'https://example.com/placeholder.jpg',
      category: 'Web Development',
    },
    // Add more dummy posts as needed
  ]);

  const [coverArtUrl, setCoverArtUrl] = useState('');
  const [coverArtPreview, setCoverArtPreview] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | ''>('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  const categories = BLOG_CATEGORIES;

  const calculateReadTime = (text: string): number => {
    // Remove HTML tags and calculate words
    const words = text.replace(/<[^>]*>/g, '').split(/\s+/).length;
    // Average reading speed: 200 words per minute
    return Math.ceil(words / 200);
  };

  const toggleMenu = (postId: string) => {
    setActiveMenu(activeMenu === postId ? null : postId);
  };

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
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
              <RichTextEditor
                content={content}
                onChange={(newContent) => {
                  setContent(newContent);
                }}
                placeholder="Write your blog post content here..."
              />
              {content && (
                <div className="mt-2 flex items-center text-sm text-gray-400">
                  <ClockIcon className="w-4 h-4 mr-1" />
                  {calculateReadTime(content)} min read
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Author
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full bg-gray-900/50 border border-gray-800 rounded-lg pl-10 pr-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  placeholder="Enter author name"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <div key={index} className="bg-gray-900/50 rounded-lg px-2 py-1 text-sm text-white flex items-center gap-1">
                    <span>{tag}</span>
                    <button
                      onClick={() => removeTag(tag)}
                      className="p-1 text-gray-400 hover:text-red-500 rounded-full transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))}
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagInput}
                  className="w-full bg-gray-900/50 border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  placeholder="Enter tags separated by commas"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as BlogCategory)}
                className="w-full bg-gray-900/50 border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Cover Art
              </label>
              <div className="space-y-4">
                <input
                  type="text"
                  value={coverArtUrl}
                  onChange={(e) => {
                    setCoverArtUrl(e.target.value);
                    setCoverArtPreview(e.target.value);
                  }}
                  className="w-full bg-gray-900/50 border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  placeholder="Enter cover art URL"
                />
                <div className="flex items-center">
                  <span className="text-gray-400 text-sm mr-3">Or upload an image:</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const imageUrl = URL.createObjectURL(file);
                        setCoverArtPreview(imageUrl);
                        setCoverArtUrl('');
                      }
                    }}
                    className="block w-full text-sm text-gray-400
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-lg file:border-0
                    file:text-sm file:font-medium
                    file:bg-blue-600 file:text-white
                    hover:file:bg-blue-500
                    file:cursor-pointer cursor-pointer"
                  />
                </div>
                {coverArtPreview && (
                  <div className="relative">
                    <div className="relative w-full aspect-[16/9] overflow-hidden rounded-lg">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={coverArtPreview}
                        alt="Cover art preview"
                        className="w-full h-full object-cover"
                        onError={() => setCoverArtPreview(null)}
                      />
                    </div>
                    <button
                      onClick={() => {
                        setCoverArtPreview(null);
                        setCoverArtUrl('');
                      }}
                      className="absolute top-2 right-2 p-1 bg-black/50 hover:bg-black/70 rounded-full text-white"
                      title="Remove cover art"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
              <button
                onClick={() => {
                  setIsCreating(false);
                  setAuthor('');
                  setTags([]);
                  setTagInput('');
                  setCoverArtUrl('');
                  setCoverArtPreview(null);
                  setSelectedCategory('');
                  setContent('');
                }}
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
                  <div>
                    <h3 className="text-lg font-medium text-white">
                      {post.title}
                    </h3>
                    <span className="text-sm text-blue-400">{post.category}</span>
                  </div>
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
