"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import type { BlogPost } from '../../types/blog';

interface FeaturedBlogBannerProps {
  post: BlogPost;
}

export default function FeaturedBlogBanner({ post }: FeaturedBlogBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative h-[60vh] min-h-[500px] w-full overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={post.coverArt || '/images/default-blog-cover.jpg'}
          alt={post.title}
          fill
          className="object-cover"
          unoptimized
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-end">
        <div className="container mx-auto px-4 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl"
          >
            <div className="mb-6">
              <span className="bg-blue-500/20 backdrop-blur-sm text-blue-400 text-sm px-3 py-1.5 rounded-full border border-blue-500/50">
                {post.category}
              </span>
            </div>
            <Link href={`/blog/${post.slug}`}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 hover:text-blue-400 transition-colors">
                {post.title}
              </h1>
            </Link>
            <p className="text-gray-300 text-lg mb-6 line-clamp-2">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { 
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
