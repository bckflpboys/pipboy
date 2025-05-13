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
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        // Fetch main blog post using the ID
        const response = await fetch(`/api/blog/${params.id}`);
        if (!response.ok) {
          throw new Error('Blog post not found');
        }
        const data = await response.json();
        console.log('Blog data:', data); // Debug log
        setBlog(data);

        // Fetch related posts
        const relatedResponse = await fetch('/api/blog');
        if (relatedResponse.ok) {
          const allPosts = await relatedResponse.json();
          const related = allPosts
            .filter((post: BlogPost) => post._id !== data._id)
            .slice(0, 2);
          setRelatedPosts(related);
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

      <div className="container mx-auto px-4 py-20 relative z-10">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
            <span className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
            <span>•</span>
            <span className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {blog.readTime} min read
            </span>
            <span>•</span>
            <span className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {blog.author}
            </span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
          >
            {blog.title}
          </motion.h1>

          {blog.coverArt && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-[400px] rounded-2xl overflow-hidden mb-12"
            >
              <Image
                src={blog.coverArt}
                alt={blog.title}
                fill
                className="object-cover"
                unoptimized
              />
            </motion.div>
          )}
        </div>

        {/* Content */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="prose prose-invert prose-lg max-w-4xl mx-auto mb-20"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPosts.map((post, index) => (
                <motion.article
                  key={post._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className="group bg-gray-900/30 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800/50 hover:border-blue-500/30 transition-all duration-300"
                >
                  <Link href={`/blog/${post._id}`}>
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
                      <h3 className="text-lg font-semibold mb-3 group-hover:text-blue-400 transition-colors duration-300">
                        {post.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {post.excerpt}
                      </p>
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
