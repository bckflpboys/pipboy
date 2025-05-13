"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { BlogPost } from '../../../types/blog';

export default function BlogPost() {
  const params = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [latestBlogs, setLatestBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        // Fetch main blog post using the slug
        const response = await fetch(`/api/blog/${params.id}`);
        if (!response.ok) {
          throw new Error('Blog post not found');
        }
        const data = await response.json();
        setBlog(data);

        // Fetch latest posts
        const latestResponse = await fetch('/api/blog');
        if (latestResponse.ok) {
          const allPosts = await latestResponse.json();
          const latest = allPosts
            .filter((post: BlogPost) => post.slug !== data.slug)
            .slice(0, 4);
          setLatestBlogs(latest);
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
        router.push('/blog');
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchBlog();
    }
  }, [params.id, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-400">Loading post...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-gray-400 mb-8">This blog post does not exist.</p>
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Back to Blog
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 animate-gradient"></div>
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 rotate-180"></div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-float-delayed"></div>
        </div>
      </div>

      <div className="relative z-10">
        {/* Main Blog Content */}
        <div>
          {/* Header with Cover Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative mb-12"
          >
            {/* Cover Image */}
            <div className="relative aspect-[21/9]">
              <Image
                src={blog.coverArt || '/images/default-blog-cover.jpg'}
                alt={blog.title}
                fill
                className="object-cover"
                priority
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0">
              <div className="container mx-auto px-4 h-full">
                <div className="max-w-4xl mx-auto h-full flex flex-col justify-end p-6 sm:p-8">
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300 mb-4">
                    <span className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                    <span className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {blog.readTime} min read
                    </span>
                    <span className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {blog.author}
                    </span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                    {blog.title}
                  </h1>

                  <div className="flex flex-wrap gap-2">
                    {blog.tags?.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-blue-500/20 backdrop-blur-sm text-blue-400 text-xs px-3 py-1 rounded-full border border-blue-500/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Blog Content */}
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="prose prose-invert prose-lg max-w-none prose-img:mx-auto prose-img:rounded-xl prose-img:shadow-lg prose-img:border prose-img:border-gray-800/50"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>
          </div>
        </div>

        {/* Latest Posts Section */}
        {latestBlogs.length > 0 && (
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Latest Posts</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {latestBlogs.map((post, index) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group bg-gray-900/30 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800/50 hover:border-blue-500/30 transition-all duration-300"
                >
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.coverArt || '/images/default-blog-cover.jpg'}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                      <div className="absolute bottom-4 left-4">
                        <span className="bg-blue-500/20 backdrop-blur-sm text-blue-400 text-xs px-2 py-1 rounded-full border border-blue-500/50">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                        <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { 
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}</span>
                        <span>•</span>
                        <span>{post.readTime} min read</span>
                      </div>
                      
                      <h3 className="text-lg font-semibold mb-3 group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <div className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-300 flex items-center gap-2 group-hover:gap-3">
                        Read More 
                        <svg className="w-4 h-4 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
