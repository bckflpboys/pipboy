'use client';

import { useState, useCallback, useEffect } from 'react';
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
import { BlogPost } from '../../../types/blog';
import { nanoid } from 'nanoid';
import { toast } from 'sonner';

export default function BlogManagement() {
  const [isCreating, setIsCreating] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [coverArtUrl, setCoverArtUrl] = useState('');
  const [coverArtPreview, setCoverArtPreview] = useState<string | null>(null);
  const [isUrlInput, setIsUrlInput] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | ''>('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');

  const fetchBlogs = useCallback(async () => {
    try {
      const response = await fetch('/api/blog');
      const data = await response.json();
      if (response.ok) {
        setBlogs(data);
      } else {
        toast.error(data.error || 'Failed to fetch blogs');
      }
    } catch (error) {
      toast.error(`Error fetching blogs: ${error instanceof Error ? error.message : String(error)}`);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const handleImageUpload = async (file: File): Promise<string> => {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onloadend = async () => {
        try {
          const base64Data = reader.result as string;
          const response = await fetch('/api/blog', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              coverArt: base64Data,
              blogId: nanoid(),
              type: 'cover',
            }),
          });
          
          const data = await response.json();
          if (!response.ok) throw new Error(data.error);
          resolve(data.coverArt);
        } catch (error: unknown) {
          reject(error instanceof Error ? error : new Error('Unknown error'));
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  };

  const handleCoverArtChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const objectUrl = URL.createObjectURL(file);
      setCoverArtPreview(objectUrl);
      const imageUrl = await handleImageUpload(file);
      setCoverArtUrl(imageUrl);
    } catch (error: unknown) {
      toast.error(`Failed to upload image: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setCoverArtPreview(null);
    }
  };

  const handleCoverArtUrlChange = (url: string) => {
    setCoverArtUrl(url);
    setCoverArtPreview(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !selectedCategory || !author) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    try {
      const blogData: Partial<BlogPost> = {
        title,
        content,
        excerpt: excerpt || content.substring(0, 150) + '...',
        author,
        coverArt: coverArtUrl,
        category: selectedCategory as BlogCategory,
        tags,
        status: 'draft',
        readTime: calculateReadTime(content),
        publishedAt: new Date(),
      };

      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      toast.success('Blog post created successfully');
      setIsCreating(false);
      resetForm();
      fetchBlogs();
    } catch (error) {
      toast.error(`Failed to create blog post: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (blogId: string) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;

    try {
      const response = await fetch(`/api/blog/${blogId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      toast.success('Blog post deleted successfully');
      fetchBlogs();
    } catch (error) {
      toast.error(`Failed to delete blog post: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setExcerpt('');
    setAuthor('');
    setTags([]);
    setTagInput('');
    setCoverArtUrl('');
    setCoverArtPreview(null);
    setIsUrlInput(false);
    setSelectedCategory('');
  };

  const calculateReadTime = (text: string): number => {
    const words = text.replace(/<[^>]*>/g, '').split(/\s+/).length;
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

      {/* Blog Post Editor */}
      {isCreating && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/50 backdrop-blur-lg border border-gray-800 rounded-lg p-4 sm:p-6"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-gray-900/50 border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                placeholder="Enter post title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Excerpt
              </label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
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
                onChange={(newContent) => setContent(newContent)}
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
                      type="button"
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
                  placeholder="Enter tags and press Enter"
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
                {BLOG_CATEGORIES.map((category) => (
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
              <div className="space-y-3">
                <div className="flex items-center space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsUrlInput(false)}
                    className={`px-3 py-1 rounded-lg text-sm ${
                      !isUrlInput
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    Upload File
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsUrlInput(true)}
                    className={`px-3 py-1 rounded-lg text-sm ${
                      isUrlInput
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    Image URL
                  </button>
                </div>
                
                {isUrlInput ? (
                  <input
                    type="url"
                    value={coverArtUrl || ''}
                    onChange={(e) => handleCoverArtUrlChange(e.target.value)}
                    className="w-full bg-gray-900/50 border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    placeholder="Enter image URL"
                  />
                ) : (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverArtChange}
                    className="w-full bg-gray-900/50 border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500"
                  />
                )}
                
                {coverArtPreview && (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden">
                    <img
                      src={coverArtPreview}
                      alt="Cover art preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setCoverArtPreview(null);
                        setCoverArtUrl('');
                      }}
                      className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-lg hover:bg-red-500"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => {
                  setIsCreating(false);
                  resetForm();
                }}
                className="w-full sm:w-auto order-3 sm:order-1 px-4 py-2 text-sm font-medium text-gray-400 hover:text-white bg-gray-900/50 rounded-lg hover:bg-gray-800/50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto order-1 sm:order-2 px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? 'Creating...' : 'Create Post'}
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Blog Posts List */}
      <div className="grid gap-4 sm:gap-6">
        {blogs.map((blog) => (
          <motion.div
            key={blog._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/50 backdrop-blur-lg border border-gray-800 rounded-lg p-4 sm:p-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              <div className="flex-1 space-y-2 sm:space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-white">
                      {blog.title}
                    </h3>
                    <span className="text-sm text-blue-400">{blog.category}</span>
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
                      onClick={() => blog._id && handleDelete(blog._id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-gray-900/50 rounded-lg transition-colors"
                      title="Delete post"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Mobile Actions */}
                  <div className="sm:hidden">
                    <button
                      onClick={() => blog._id && toggleMenu(blog._id)}
                      className="p-2 text-gray-400 hover:text-white hover:bg-gray-900/50 rounded-lg transition-colors"
                    >
                      <EllipsisVerticalIcon className="w-5 h-5" />
                    </button>

                    {activeMenu === blog._id && (
                      <div className="absolute right-4 mt-2 w-48 rounded-lg bg-gray-900 shadow-lg ring-1 ring-gray-800 z-10">
                        <div className="py-1">
                          <button
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800"
                            onClick={() => {
                              // Handle edit
                              toggleMenu(blog._id || '');
                            }}
                          >
                            <PencilIcon className="w-4 h-4" />
                            Edit post
                          </button>
                          <button
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-gray-800"
                            onClick={() => {
                              if (blog._id) handleDelete(blog._id);
                              toggleMenu(blog._id || '');
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
                  {blog.excerpt}
                </p>

                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <UserIcon className="w-4 h-4" />
                    <span className="truncate">{blog.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="w-4 h-4" />
                    <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1 max-w-full">
                    <TagIcon className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{blog.tags.join(', ')}</span>
                  </div>
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      blog.status === 'published'
                        ? 'bg-green-500/10 text-green-500'
                        : 'bg-yellow-500/10 text-yellow-500'
                    }`}
                  >
                    {blog.status}
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