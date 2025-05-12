"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { blogPosts } from '../../data/blogPosts';

export default function BlogPost() {
  const params = useParams();
  const blogPost = blogPosts.find(post => post.id === params.id);
  
  // Add related posts excluding the current post
  const relatedPosts = blogPosts
    .filter(post => post.id !== params.id)
    .slice(0, 2);

  if (!blogPost) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-gray-400 mb-8">The blog post you’re looking for doesn’t exist.</p>
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

      {/* Hero Section */}
      <div className="relative h-[70vh] min-h-[600px] w-full">
        <Image
          src={blogPost.image}
          alt={blogPost.title}
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black"></div>
        
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <div className="flex flex-col items-center space-y-6">
                <span className="bg-blue-500/20 backdrop-blur-sm text-blue-400 text-sm px-4 py-2 rounded-full border border-blue-500/50">
                  {blogPost.category}
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                  {blogPost.title}
                </h1>
                <div className="flex items-center gap-6 text-gray-300 text-lg">
                  <span>{blogPost.date}</span>
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  <span>{blogPost.readTime}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            {/* Author Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center gap-6 mb-12 p-8 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800/50"
            >
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-lg opacity-50 animate-pulse"></div>
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-blue-500/30">
                  <Image
                    src={blogPost.author.avatar}
                    alt={blogPost.author.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-1">{blogPost.author.name}</h3>
                <p className="text-gray-400 text-lg">{blogPost.author.role}</p>
              </div>
            </motion.div>

            {/* Article Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="prose prose-invert prose-lg max-w-none mb-20 [&>h2]:text-3xl [&>h2]:font-bold [&>h2]:mt-12 [&>h2]:mb-6 [&>h3]:text-2xl [&>h3]:font-semibold [&>h3]:mt-8 [&>h3]:mb-4 [&>p]:text-gray-300 [&>p]:leading-relaxed [&>ul]:list-disc [&>ul]:pl-6 [&>ol]:list-decimal [&>ol]:pl-6 [&>li]:text-gray-300 [&>li]:mb-2"
              dangerouslySetInnerHTML={{ __html: blogPost.content }}
            />

            {/* Related Posts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="relative"
            >
              <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-lg opacity-75"></div>
              <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-gray-800/50">
                <h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  Related Posts
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {relatedPosts.map((post, index) => (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                      className="group bg-gray-900/30 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800/50 hover:border-blue-500/30 transition-all duration-300"
                    >
                      <Link href={`/blog/${post.id}`}>
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={post.image}
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
                            <span>{post.date}</span>
                            <span>•</span>
                            <span>{post.readTime}</span>
                          </div>
                          
                          <h3 className="text-lg font-semibold mb-3 group-hover:text-blue-400 transition-colors duration-300">
                            {post.title}
                          </h3>
                          
                          <p className="text-gray-400 text-sm leading-relaxed mb-6">
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
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
