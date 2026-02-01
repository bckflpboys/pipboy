"use client";

import { motion } from 'framer-motion';

export default function FeaturedBlogBannerSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative h-[60vh] min-h-[500px] w-full overflow-hidden"
    >
      {/* Background Skeleton */}
      <div className="absolute inset-0 bg-gray-900 animate-pulse">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
      </div>

      {/* Content Skeleton */}
      <div className="absolute inset-0 flex items-end">
        <div className="container mx-auto px-4 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl"
          >
            <div className="mb-6">
              <div className="h-8 w-24 bg-blue-500/20 backdrop-blur-sm rounded-full border border-blue-500/50 animate-pulse"></div>
            </div>
            <div className="h-16 md:h-20 lg:h-24 w-3/4 bg-gray-800 rounded-lg mb-6 animate-pulse"></div>
            <div className="space-y-3 mb-6">
              <div className="h-6 w-full bg-gray-800 rounded animate-pulse"></div>
              <div className="h-6 w-2/3 bg-gray-800 rounded animate-pulse"></div>
            </div>
            <div className="h-4 w-40 bg-gray-800 rounded animate-pulse"></div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
