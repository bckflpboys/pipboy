"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import type { BlogPost } from '../../types/blog';
import BlogSkeleton from '../components/BlogSkeleton';
import BlogCard from '../components/BlogCard';
import FeaturedBlogBanner from '../components/FeaturedBlogBanner';
import FeaturedBlogBannerSkeleton from '../components/FeaturedBlogBannerSkeleton';
import BlogSearch from '../components/BlogSearch';

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [featuredBlogs, setFeaturedBlogs] = useState<BlogPost[]>([]);
  const [regularBlogs, setRegularBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBlogs = async (search: string = '', category: string = '') => {
    try {
      setIsLoading(true);
      const queryParams = new URLSearchParams();
      if (search) queryParams.append('search', search);
      if (category) queryParams.append('category', category);

      const response = await fetch(`/api/blog?${queryParams.toString()}`);
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to fetch blogs');
      }
      const data = await response.json();
      setBlogs(data);
      
      // Set featured blogs and all blogs for regular display
      const featured = data.filter((blog: BlogPost) => blog.isFeatured);
      setFeaturedBlogs(featured);
      setRegularBlogs(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <main className="min-h-screen bg-black">
      {isLoading ? (
        <>
          {/* Featured Blog Banner Skeleton */}
          <FeaturedBlogBannerSkeleton />
          
          {/* Blog Cards Skeleton */}
          <div className="container mx-auto px-4 pt-4 pb-20">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="h-10 w-48 bg-gray-800 rounded mx-auto mb-6 animate-pulse"></div>
              <div className="space-y-3 mb-8">
                <div className="h-4 w-full bg-gray-800/50 rounded animate-pulse"></div>
                <div className="h-4 w-3/4 bg-gray-800/50 rounded mx-auto animate-pulse"></div>
              </div>
              <div className="h-12 w-full bg-gray-800/30 rounded-lg animate-pulse"></div>
            </div>
            <BlogSkeleton />
          </div>
        </>
      ) : blogs.length === 0 ? (
        <div className="text-center text-gray-400 py-32">
          No blog posts available yet.
        </div>
      ) : (
        <>
          {/* Featured Blog Banner */}
          {featuredBlogs.length > 0 && (
            <FeaturedBlogBanner post={featuredBlogs[0]} />
          )}

          {/* Regular Blog Posts */}
          <div className="container mx-auto px-4 pt-4 pb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 className="text-3xl font-bold mb-6">Latest Articles</h2>
              <p className="text-gray-400 mb-8">
                Dive deep into trading knowledge with our expert analysis, strategies, and insights.
                Stay ahead of the market with our latest research and educational content.
              </p>
              <BlogSearch 
                onSearch={(search, category) => {
                  fetchBlogs(search, category);
                }}
              />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularBlogs.map((post, index) => (
                <BlogCard key={post.slug} post={post} index={index} />
              ))}
            </div>
          </div>
        </>
      )}
    </main>
  );
}
