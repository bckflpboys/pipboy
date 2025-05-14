"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { BlogPost } from '../../types/blog';
import BlogSkeleton from './BlogSkeleton';
import BlogCard from './BlogCard';

function BlogSection() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blog');  
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Failed to fetch blogs');
        }
        const data = await response.json();
        console.log('Fetched blogs:', data);  
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  console.log('Current blogs state:', blogs);

  return (
    <div className="py-20 bg-black relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1642543492481-44e81e3914a6?q=80&w=2070&auto=format&fit=crop"
          alt="Blog Background"
          fill
          className="object-cover opacity-20"
          unoptimized
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-6">BL∅G</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Dive deep into trading knowledge with our expert analysis, strategies, and insights.
            Stay ahead of the market with our latest research and educational content.
          </p>
        </motion.div>

        {isLoading ? (
          <BlogSkeleton />
        ) : blogs.length === 0 ? (
          <div className="text-center text-gray-400">
            No blog posts available yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((post, index) => (
              <BlogCard key={post.slug} post={post} index={index} />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link href="/blog" className="inline-block px-6 py-3 text-sm font-medium text-blue-400 border border-blue-500/50 rounded-lg hover:bg-blue-500/10 transition-colors duration-300">
            VIEW ALL POSTS
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BlogSection;
