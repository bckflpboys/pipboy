"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import type { BlogPost } from '../../types/blog';

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export default function BlogCard({ post, index }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group bg-gray-900/30 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800/50 hover:border-blue-500/30 transition-all duration-300 flex flex-col h-[32rem]"
    >
      <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
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
        
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
            <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { 
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}</span>
          </div>
          <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-400 transition-colors">
            {post.title}
          </h3>
          <p className="text-gray-400 text-sm line-clamp-3 mb-4">
            {post.excerpt}
          </p>
          <div className="mt-auto flex items-center justify-between">
            <span className="text-blue-400 text-sm group-hover:text-blue-300 transition-colors">Read More</span>
            <svg className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
