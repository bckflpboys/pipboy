"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Button from './Button';
import { blogPosts } from '../data/blogPosts';

function BlogSection() {
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
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

        <div className="text-center mt-12">
          <Link href="/blog">
            <Button variant="secondary">VIEW ALL POSTS</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BlogSection;
